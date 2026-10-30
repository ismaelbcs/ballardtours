// src/utils/sendEmail.js

const FALLBACK_API_URL = 'https://www.caboprivateairporttransfers.com/api/send-email';

/**
 * Envía correos mediante la API Serverless local (/api/send-email) y cuenta con
 * respaldo automático hacia el servidor de caboprivateairporttransfers.com.
 * @param {Object} options
 * @param {string} options.to - Destinatario
 * @param {string} options.subject - Asunto
 * @param {string} options.html - Contenido en HTML
 * @param {string} [options.text] - Contenido en texto plano opcional
 */
export async function sendEmail({ to, subject, html, text }) {
  const payload = JSON.stringify({ to, subject, html, text });

  // 1. Intento directo en el propio dominio (/api/send-email en Vercel)
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    });

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (data && data.success) {
        return { success: true, messageId: data.messageId };
      }
    }
  } catch (localErr) {
    console.warn('Reintentando envío por servidor de respaldo:', localErr.message);
  }

  // 2. Respaldo automático hacia el endpoint activo de caboprivateairporttransfers.com
  try {
    const fallbackRes = await fetch(FALLBACK_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    });

    const data = await fallbackRes.json();
    if (!fallbackRes.ok) {
      console.error('Error al enviar correo en servidor de respaldo:', data);
      return { success: false, error: data.error || 'Error desconocido' };
    }

    return { success: true, messageId: data.messageId };
  } catch (error) {
    console.error('Error de red al enviar correo:', error);
    return { success: false, error: error.message };
  }
}

