/**
 * scripts/google-indexing.mjs - Ballard Tours
 * 
 * Herramienta para enviar URLs automáticamente a la Google Indexing API.
 * Extrae las URLs desde public/sitemap.xml y gestiona lotes diarios de 200 URLs.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const KEY_FILES = [
  path.join(projectRoot, 'service_account.json'),
  path.join(projectRoot, 'google-key.json'),
  path.join(projectRoot, 'google-credentials.json')
];

function findKeyFile() {
  for (const f of KEY_FILES) {
    if (fs.existsSync(f)) return f;
  }
  return null;
}

function base64url(input) {
  const buf = typeof input === 'string' ? Buffer.from(input, 'utf8') : input;
  return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function getAccessToken(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claimSet = base64url(JSON.stringify({
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  }));

  const sign = crypto.createSign('RSA-SHA256');
  sign.update(`${header}.${claimSet}`);
  const signature = sign.sign(credentials.private_key, 'base64url');
  const jwt = `${header}.${claimSet}.${signature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Error al autenticar con Google OAuth: ${data.error_description || data.error || JSON.stringify(data)}`);
  }
  return data.access_token;
}

async function publishUrl(accessToken, targetUrl, type = 'URL_UPDATED') {
  const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      url: targetUrl,
      type: type
    })
  });

  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

async function checkUrl(accessToken, targetUrl) {
  const endpoint = `https://indexing.googleapis.com/v3/urlNotifications/metadata?url=${encodeURIComponent(targetUrl)}`;
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

function getAllSiteUrls() {
  const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ No se encontró sitemap.xml en public/sitemap.xml');
    return [];
  }
  const content = fs.readFileSync(sitemapPath, 'utf8');
  const matches = content.match(/<loc>(.*?)<\/loc>/g) || [];
  const urls = matches.map(u => u.replace(/<\/?loc>/g, '').trim()).filter(Boolean);
  return Array.from(new Set(urls));
}

function getHistory() {
  const logFile = path.join(projectRoot, 'indexing-history.json');
  if (!fs.existsSync(logFile)) return [];
  try {
    return JSON.parse(fs.readFileSync(logFile, 'utf8'));
  } catch (_) {
    return [];
  }
}

function getSuccessfulUrls() {
  const history = getHistory();
  const successful = new Set();
  for (const entry of history) {
    if (Array.isArray(entry.detalles)) {
      for (const d of entry.detalles) {
        if (d.status === 'SUCCESS') {
          successful.add(d.url);
        }
      }
    }
  }
  return successful;
}

function getTodayCallsCount() {
  const history = getHistory();
  const today = new Date().toISOString().slice(0, 10);
  let count = 0;
  for (const entry of history) {
    if (entry.date && entry.date.startsWith(today)) {
      count += (entry.total || (entry.detalles ? entry.detalles.length : 0));
    }
  }
  return count;
}

async function main() {
  console.log('\n======================================================');
  console.log('   🚀 GOOGLE INDEXING API AUTOMATION - BALLARD TOURS');
  console.log('======================================================\n');

  const keyPath = findKeyFile();
  if (!keyPath) {
    console.log('❌ Archivo de credenciales no encontrado (service_account.json).');
    process.exit(1);
  }

  const credentials = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
  console.log(`🔑 Clave cargada desde: ${path.basename(keyPath)}`);
  console.log(`👤 Cuenta de servicio: ${credentials.client_email}\n`);

  console.log('🔄 Autenticando con Google...');
  let token;
  try {
    token = await getAccessToken(credentials);
    console.log('✅ Autenticación exitosa con Google OAuth2.\n');
  } catch (err) {
    console.error('❌ Error de autenticación:', err.message);
    process.exit(1);
  }

  const args = process.argv.slice(2);

  // Modo chequeo individual
  if (args[0] === '--check') {
    const targetUrl = args[1];
    if (!targetUrl) {
      console.log('Uso: node scripts/google-indexing.mjs --check <URL>');
      process.exit(1);
    }
    console.log(`🔍 Consultando estado en Google de: ${targetUrl}`);
    const res = await checkUrl(token, targetUrl);
    console.log(JSON.stringify(res.data, null, 2));
    return;
  }

  let urlsToSend = [];
  const successfulAlready = getSuccessfulUrls();
  const todayCalls = getTodayCallsCount();
  const MAX_DAILY = 200;
  const remainingQuotaToday = Math.max(0, MAX_DAILY - todayCalls);

  console.log(`📊 Cuota de Google hoy: ${todayCalls}/${MAX_DAILY} usadas (${remainingQuotaToday} disponibles hoy).`);
  console.log(`✅ URLs ya indexadas exitosamente en historial previo: ${successfulAlready.size}\n`);

  if (args.length > 0 && args[0].startsWith('http')) {
    urlsToSend = args.filter(a => a.startsWith('http'));
    console.log(`🎯 URLs manuales recibidas: ${urlsToSend.length}\n`);
  } else {
    const allSiteUrls = getAllSiteUrls();
    const pendingUrls = allSiteUrls.filter(u => !successfulAlready.has(u));

    console.log(`🌐 Total de URLs en el sitemap: ${allSiteUrls.length}`);
    console.log(`⏳ URLs pendientes de indexar: ${pendingUrls.length}`);

    if (pendingUrls.length === 0) {
      console.log('\n🎉 ¡Todas las URLs del sitemap ya fueron enviadas a Google exitosamente!');
      return;
    }

    if (remainingQuotaToday <= 0) {
      console.log(`\n⚠️  Ya se alcanzó el límite diario de Google (${MAX_DAILY} URLs por día).`);
      console.log('   Mañana podrás correr este comando para continuar con las siguientes URLs.');
      return;
    }

    urlsToSend = pendingUrls.slice(0, remainingQuotaToday);
    console.log(`🚀 Se enviará el lote de hoy: ${urlsToSend.length} URLs (quedarán ${pendingUrls.length - urlsToSend.length} para los siguientes días).\n`);
  }

  console.log(`📤 Enviando ${urlsToSend.length} URLs a Google Indexing API...\n`);

  let exitosas = 0;
  let fallidas = 0;
  let cuotaAgotada = false;
  const resultados = [];

  for (let i = 0; i < urlsToSend.length; i++) {
    const u = urlsToSend[i];
    process.stdout.write(`[${i + 1}/${urlsToSend.length}] ${u} ... `);

    try {
      const res = await publishUrl(token, u);
      if (res.ok) {
        console.log('✅ ENVIADA');
        exitosas++;
        resultados.push({ url: u, status: 'SUCCESS', timestamp: new Date().toISOString() });
      } else {
        const errorMsg = res.data?.error?.message || JSON.stringify(res.data);
        console.log(`❌ ERROR (${res.status}): ${errorMsg}`);
        fallidas++;
        resultados.push({ url: u, status: 'FAILED', error: res.data, timestamp: new Date().toISOString() });

        if (res.status === 429 || errorMsg.toLowerCase().includes('quota')) {
          console.log('\n⚠️  Google ha indicado que la cuota diaria se ha completado.');
          cuotaAgotada = true;
          break;
        }

        if (res.status === 403) {
          console.log('\n⚠️  Error 403: No tienes permisos en Search Console para este dominio.');
          break;
        }
      }
    } catch (e) {
      console.log(`❌ EXCEPCIÓN: ${e.message}`);
      fallidas++;
      resultados.push({ url: u, status: 'ERROR', error: e.message, timestamp: new Date().toISOString() });
    }

    await new Promise(r => setTimeout(r, 200));
  }

  console.log('\n======================================================');
  console.log(`🏁 RESUMEN: ${exitosas} enviadas con éxito, ${fallidas} con error.`);
  console.log('======================================================\n');

  // Guardar log si hubo envíos
  if (resultados.length > 0) {
    const logFile = path.join(projectRoot, 'indexing-history.json');
    const history = getHistory();
    history.push({
      date: new Date().toISOString(),
      total: resultados.length,
      exitosas,
      fallidas,
      detalles: resultados
    });
    fs.writeFileSync(logFile, JSON.stringify(history, null, 2));
    console.log(`📁 Historial actualizado en: indexing-history.json\n`);
  }
}

main().catch(err => {
  console.error('\n❌ Error inesperado:', err);
  process.exit(1);
});
