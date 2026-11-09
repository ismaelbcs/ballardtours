import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  landingPagesSEO,
  toursLandingPages,
  catalogoHoteles,
  zonasData
} from '../src/data/seoData.js';
import { restaurantSEOData } from '../src/data/restaurantSEOData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const BUILD_DIR = path.join(ROOT_DIR, 'build');
const BASE_URL = 'https://www.ballardtours.com';
const TODAY = new Date().toISOString().split('T')[0];

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// 1. Construir las 539 rutas de hoteles (unificando catalogoHoteles + landingPagesSEO + sjd-to-four-seasons)
const hotelRoutesMap = new Map();

catalogoHoteles.forEach((hotel) => {
  const existing = landingPagesSEO.find((h) => h.nombre === hotel.nombre);
  if (existing) {
    hotelRoutesMap.set(existing.slug, {
      ...existing,
      zona: existing.zona || hotel.zona || 1
    });
  } else {
    const slug = `sjd-to-${hotel.nombre.toLowerCase().replace(/[^a-z0-9áéíóúüñ]+/gi, '-')}`;
    hotelRoutesMap.set(slug, {
      ...hotel,
      slug,
      zona: hotel.zona || 1
    });
  }
});

landingPagesSEO.forEach((item) => {
  if (item && item.slug && !hotelRoutesMap.has(item.slug)) {
    hotelRoutesMap.set(item.slug, {
      ...item,
      zona: item.zona || 1
    });
  }
});

if (!hotelRoutesMap.has('sjd-to-four-seasons')) {
  hotelRoutesMap.set('sjd-to-four-seasons', {
    nombre: 'Four Seasons Resort Los Cabos',
    slug: 'sjd-to-four-seasons',
    zona: 2
  });
}

const allHotels = Array.from(hotelRoutesMap.values());

// 2. Páginas estáticas y hubs estratégicos
const staticPages = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
    title: 'Cabo Airport Transportation | Private Transfers Los Cabos | Ballard Tours',
    description:
      'Book premium Los Cabos private transportation, luxury airport transfers, and the best Cabo San Lucas tours. VIP service to Nobu, Hard Rock & Cabo resorts.'
  },
  {
    path: '/transportation',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Los Cabos Private Transportation & SJD Airport Transfers | Ballard Tours',
    description:
      'Premier private transportation in Los Cabos. Luxury SUVs and Sprinter vans from SJD Airport to all resorts in Cabo San Lucas and San Jose del Cabo.'
  },
  {
    path: '/transportation/airport-shuttle-sjd',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Cabo Airport Transportation | Private Transfers Los Cabos | Ballard Tours',
    description:
      'Exclusive reporter guide to Cabo airport transportation. Best private airport to hotel taxi & shuttles to Hyatt Ziva, Hard Rock, Cabo Azul, Paradisus & more.'
  },
  {
    path: '/transportation/luxury-suv-service',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Luxury SUV Service Cabo San Lucas | Private Suburban Chauffeur | Ballard Tours',
    description:
      'Book our VIP Luxury SUV service in Los Cabos. Late-model Chevrolet Suburban & GMC Yukon private transfers from SJD Airport with bilingual chauffeur & cold drinks.'
  },
  {
    path: '/transportation/group-sprinter-van-shuttle',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Group Sprinter & Van Shuttle Los Cabos | Wedding & Corporate Transfers | Ballard Tours',
    description:
      'Private Mercedes-Benz Sprinter and Toyota Hiace vans for groups up to 16 passengers per vehicle in Los Cabos. Ideal for weddings, golf groups, and family reunions from SJD Airport.'
  },
  {
    path: '/transportation/dinner-and-restaurants',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Private Dinner & Restaurant Transfers in Los Cabos | Flora Farms, Acre & Sunset Monalisa | Ballard Tours',
    description:
      'Book round-trip private chauffeur service to the best restaurants in Los Cabos: Flora Farms, Acre, Sunset Monalisa, El Farallon, Nobu, and Manta. Safe door-to-door service.'
  },
  {
    path: '/transportation/golf-course-transfers',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Los Cabos Golf Course Transfers | Private SUV & Van Golf Shuttle | Ballard Tours',
    description:
      'Private round-trip golf transportation in Los Cabos to Quivira, Diamante, Cabo del Sol, Puerto Los Cabos, and Palmilla. Spacious SUVs and Sprinters for golfers and club bags.'
  },
  {
    path: '/transportation/hotel-to-hotel-transfers',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Hotel to Hotel Private Transfers in Los Cabos | Resort & Villa Relocation | Ballard Tours',
    description:
      'Switching resorts or moving to a private villa in Los Cabos? Book direct door-to-door hotel-to-hotel private transportation between San Jose del Cabo, the Corridor, and Cabo San Lucas.'
  },
  {
    path: '/transportation/nightlife-private-driver',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Cabo San Lucas Nightlife Private Driver | Safe Evening Chauffeur | Ballard Tours',
    description:
      'Enjoy Cabo San Lucas nightlife safely with a private round-trip driver. Direct pickup at your resort to Squid Roe, Mandala, Mango Deck, and Downtown Cabo with guaranteed return.'
  },
  {
    path: '/cabo-airport-transportation',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Cabo Airport Transportation | Private Airport Transfer Los Cabos',
    description:
      'Looking for reliable Cabo airport transportation? Book a premium private airport transfer los cabos or experience luxury transportation cabo san lucas with flat rates.'
  },
  {
    path: '/destinations',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Los Cabos Airport to Hotel Transfers | Resort Directory',
    description:
      'Find premium private transportation to the most visited destinations and resorts in Los Cabos, Mexico. Direct airport shuttles.'
  },
  {
    path: '/tours',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Best Tours & Private Excursions in Los Cabos | Ballard Tours',
    description:
      'Explore the best private tours in Cabo San Lucas and San Jose del Cabo: Clear Boat to the Arch, Camel Safari, ATV Off-Road, Whale Sharks in La Paz, and Sunset Cruises.'
  },
  {
    path: '/things-to-do-in-cabo-san-lucas',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Top 10 Things to Do in Cabo San Lucas | Best Cabo Tours & Excursions',
    description:
      'Discover the ultimate list of things to do in cabo san lucas. Book top-rated cabo tours, ocean excursions, and unlock the best cabo activities for 2026.'
  },
  {
    path: '/flotas',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Our Luxury Fleet in Los Cabos | Suburban & Sprinter Vans | Ballard Tours',
    description:
      'Discover our fleet of late-model Chevrolet Suburbans, GMC Yukons, Toyota Hiace, and Mercedes-Benz Sprinters for private airport transfers in Los Cabos.'
  },
  {
    path: '/about-us',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'About Ballard Tours | Trusted Private Transportation in Los Cabos',
    description:
      'Learn about Ballard Tours, a locally owned luxury ground transportation and excursion operator in Los Cabos with certified bilingual chauffeurs.'
  },
  {
    path: '/contact',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Contact Ballard Tours | 24/7 Cabo Airport Transportation Support',
    description:
      'Contact Ballard Tours for quotes, custom group logistics, or reservation assistance in Los Cabos via WhatsApp, phone, or email.'
  },
  {
    path: '/faqs',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Frequently Asked Questions (FAQs) | Cabo Airport Transportation | Ballard Tours',
    description:
      'Find answers to the most common questions about SJD Airport private transportation, terminal pickup points, flight delays, grocery stops, car seats, and cancellation policies.'
  },
  {
    path: '/blog',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Los Cabos Travel Blog & Guides | Ballard Tours',
    description:
      'Discover the best tips, transportation guides, and luxury excursions in Los Cabos. Read our latest articles and plan your perfect vacation.'
  },
  {
    path: '/blog/uber-vs-private-transportation-cabo',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Uber vs. Private Transportation in Los Cabos: What You Need to Know (2026)',
    description:
      'Wondering if you can use Uber at the Cabo Airport? Compare prices, safety, and reliability between Uber and private transportation in Los Cabos.'
  },
  {
    path: '/blog/cabo-airport-transportation-prices',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Cabo Airport Transportation Prices & Rates (2026 Guide)',
    description:
      'Discover exact Cabo airport transportation prices for 2026. Compare private shuttles, luxury SUVs, and taxis to find the best rates without hidden fees.'
  },
  {
    path: '/blog/how-to-get-from-sjd-airport-to-cabo-san-lucas',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'How to Get from SJD Airport to Cabo San Lucas (Best Options)',
    description:
      'Discover the best ways to get from SJD Airport to Cabo San Lucas. Compare distance, travel times, shuttles, and private transportation options.'
  },
  {
    path: '/terms-and-conditions',
    priority: '0.4',
    changefreq: 'yearly',
    title: 'Terms and Conditions | Ballard Tours Los Cabos',
    description:
      'Read the official terms and conditions for private airport transportation and tour reservations with Ballard Tours in Los Cabos.'
  },
  {
    path: '/privacy-policy',
    priority: '0.4',
    changefreq: 'yearly',
    title: 'Privacy Policy | Ballard Tours Los Cabos',
    description:
      'Read the official Privacy Policy of Ballard Tours Los Cabos. Learn how we protect your personal data, flight details, and online reservation information.'
  },
  {
    path: '/politicas-de-cancelacion',
    priority: '0.5',
    changefreq: 'yearly',
    title: 'Cancellation & Refund Policy | Ballard Tours Los Cabos',
    description:
      'Flexible cancellation and refund policies for private transportation and tours in Los Cabos with Ballard Tours.'
  },
  {
    path: '/yachts',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Private Yacht Charters Cabo San Lucas | Luxury Fleet & Superyachts | Ballard Tours',
    description:
      'Book private yacht charters in Cabo San Lucas: 30ft Baja Therapy, 57ft La Dolce Vita, 80ft Papillon 9, 85ft Contessa, 108ft Neoprene, 110ft Aquaholic, 116ft Capella & 130ft Sovereign.'
  },
  {
    path: '/yachts/baja-therapy',
    priority: '0.9',
    changefreq: 'weekly',
    title: '30 Ft Baja Therapy Double-Deck Pontoon Charter Cabo San Lucas | Ballard Tours',
    description:
      'Charter the 30ft Baja Therapy luxury double-deck pontoon in Cabo San Lucas. Up to 20 guests, water slide, open bar, snorkel gear, and sunset cruises from $1,560 USD.'
  },
  {
    path: '/yachts/la-dolce-vita',
    priority: '0.9',
    changefreq: 'weekly',
    title: '57ft Yacht La Dolce Vita Private Charter Cabo San Lucas | Ballard Tours',
    description:
      'Private 57ft La Dolce Vita motor yacht charter in Cabo San Lucas for up to 12 guests. Includes captain, fuel, snorkel gear & paddleboards from $1,999 USD.'
  },
  {
    path: '/yachts/papillon-9',
    priority: '0.9',
    changefreq: 'weekly',
    title: '80ft Ferretti Papillon 9 Private Yacht Charter Cabo San Lucas | Ballard Tours',
    description:
      'All-inclusive 80ft Ferretti Papillon 9 yacht charter in Cabo San Lucas with private chef, open bar, 4 staterooms, and water toys.'
  },
  {
    path: '/yachts/contessa',
    priority: '0.9',
    changefreq: 'weekly',
    title: '85ft Azimut Contessa Superyacht Charter Cabo San Lucas | Ballard Tours',
    description:
      'Charter the 85ft Azimut Contessa superyacht in Cabo San Lucas. Includes private chef, unlimited open bar, 4 staterooms, and water toys.'
  },
  {
    path: '/yachts/neoprene',
    priority: '0.9',
    changefreq: 'weekly',
    title: '108ft Mangusta Neoprene Matte-Black Superyacht Cabo San Lucas | Ballard Tours',
    description:
      'Charter the iconic 108ft matte-black Mangusta superyacht Neoprene in Cabo San Lucas. Private Chef Christian, personal bartender, Seabob & beach club for up to 30 guests.'
  },
  {
    path: '/yachts/aquaholic',
    priority: '0.9',
    changefreq: 'weekly',
    title: '110ft Horizon Aquaholic Superyacht Charter Cabo San Lucas | Ballard Tours',
    description:
      'All-inclusive 110ft Horizon Aquaholic superyacht charter in Cabo San Lucas featuring flybridge Jacuzzi, 5 staterooms, private chef, and open bar.'
  },
  {
    path: '/yachts/capella',
    priority: '0.9',
    changefreq: 'weekly',
    title: '116ft Azimut Grande Capella Superyacht Charter Cabo San Lucas | Ballard Tours',
    description:
      'Flagship 116ft Azimut Grande Capella superyacht charter in Cabo San Lucas with flybridge Jacuzzi, executive chef, open bar, and 5 marble staterooms.'
  },
  {
    path: '/yachts/sovereign',
    priority: '0.9',
    changefreq: 'weekly',
    title: '130ft Westport Sovereign Tri-Deck Megayacht Cabo San Lucas | Ballard Tours',
    description:
      'Charter the 130ft tri-deck Westport megayacht Sovereign in Cabo San Lucas for up to 40 guests. Executive chef, sky lounge Jacuzzi, and white-glove crew.'
  },
  {
    path: '/cabo-yacht-charters',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Cabo Yacht Charters | Private Luxury Yachts & Boats | Ballard Tours',
    description: 'Compare and book private luxury yacht charters in Cabo San Lucas with optional private SUV hotel transfers.'
  },
  {
    path: '/cabo-yacht-charters-baja-therapy',
    priority: '0.8',
    changefreq: 'weekly',
    title: '30 Ft Baja Therapy Party Boat & Sunset Charter Cabo | Ballard Tours',
    description: 'Book the 30ft Baja Therapy double-deck pontoon in Cabo San Lucas with open bar and water slide.'
  },
  {
    path: '/luxury-yacht-charter-cabo-san-lucas-baja-therapy',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Luxury Pontoon Charter Cabo San Lucas - 30ft Baja Therapy | Ballard Tours',
    description: 'Private 30ft Baja Therapy double-deck yacht pontoon charter in Cabo San Lucas for up to 20 passengers.'
  },
  {
    path: '/cabo-yacht-charters-la-dolce-vita',
    priority: '0.8',
    changefreq: 'weekly',
    title: '57ft La Dolce Vita Yacht Charter Cabo San Lucas | Ballard Tours',
    description: 'VIP 57-foot private motor yacht La Dolce Vita in Cabo San Lucas for up to 12 passengers.'
  },
  {
    path: '/luxury-yacht-charter-cabo-san-lucas-la-dolce-vita',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Luxury 57ft Yacht Rental Cabo San Lucas - La Dolce Vita | Ballard Tours',
    description: 'Book the 57ft La Dolce Vita private yacht in Cabo San Lucas with captain, fuel, and snorkel gear included.'
  },
  {
    path: '/cabo-yacht-charters-neoprene',
    priority: '0.8',
    changefreq: 'weekly',
    title: '108ft Neoprene Mangusta Yacht Charter Cabo San Lucas | Ballard Tours',
    description: 'All-inclusive 108ft matte-black Mangusta superyacht Neoprene in Cabo San Lucas with Private Chef Christian.'
  },
  {
    path: '/luxury-yacht-charter-cabo-san-lucas-neoprene',
    priority: '0.8',
    changefreq: 'weekly',
    title: '108ft Matte-Black Mangusta Neoprene Superyacht Cabo | Ballard Tours',
    description: 'Charter the flagship 108ft Neoprene superyacht in Cabo San Lucas for up to 30 day guests.'
  },
  {
    path: '/cabo-yacht-charters-papillon-9',
    priority: '0.8',
    changefreq: 'weekly',
    title: '80ft Papillon 9 Ferretti Yacht Charter Cabo San Lucas | Ballard Tours',
    description: 'Private 80ft Ferretti Papillon 9 yacht rental in Cabo San Lucas with chef and open bar.'
  },
  {
    path: '/cabo-yacht-charters-contessa',
    priority: '0.8',
    changefreq: 'weekly',
    title: '85ft Contessa Azimut Yacht Charter Cabo San Lucas | Ballard Tours',
    description: 'Private 85ft Azimut Contessa superyacht charter in Cabo San Lucas with chef and open bar.'
  },
  {
    path: '/cabo-yacht-charters-aquaholic',
    priority: '0.8',
    changefreq: 'weekly',
    title: '110ft Aquaholic Horizon Superyacht Charter Cabo | Ballard Tours',
    description: 'Private 110ft Horizon Aquaholic superyacht charter in Cabo San Lucas with flybridge Jacuzzi.'
  },
  {
    path: '/cabo-yacht-charters-sovereign',
    priority: '0.8',
    changefreq: 'weekly',
    title: '130ft Sovereign Tri-Deck Megayacht Charter Cabo | Ballard Tours',
    description: 'Private 130ft Westport Sovereign tri-deck megayacht charter in Cabo San Lucas for up to 40 guests.'
  }
];

// 3. Páginas de Tours (11 canónicas + 3 alias para pre-renderizado)
const tourPages = toursLandingPages.map((tour) => ({
  path: `/tours/${tour.slug}`,
  canonicalPath: `/tours/${tour.slug}`,
  includeInSitemap: true,
  priority: '0.8',
  changefreq: 'weekly',
  title: `${tour.nombre} in Los Cabos | Ballard Tours`,
  description: `Book the best ${tour.nombre} in Los Cabos. ${tour.desc} VIP service, certified guides, and best rates guaranteed.`
}));

const tourAliases = [
  { from: 'clear-boat-tour-cabo-arch', alias: 'clear-boat-tour-cabo-san-lucas-arch' },
  { from: 'espiritu-santo-island-tour-from-la-paz', alias: 'espiritu-santo-island-tour-from-cabo' },
  { from: 'san-jose-del-cabo-art-walk-tour', alias: 'san-jose-del-cabo-art-walk' }
]
  .map(({ from, alias }) => {
    const base = toursLandingPages.find((t) => t.slug === from);
    if (!base) return null;
    return {
      path: `/tours/${alias}`,
      canonicalPath: `/tours/${base.slug}`,
      includeInSitemap: false,
      priority: '0.7',
      changefreq: 'weekly',
      title: `${base.nombre} in Los Cabos | Ballard Tours`,
      description: `Book the best ${base.nombre} in Los Cabos. ${base.desc} VIP service, certified guides, and best rates guaranteed.`
    };
  })
  .filter(Boolean);

// 4. Páginas de Hoteles (539 canónicas)
const hotelPages = allHotels.map((hotel) => {
  const zonaObj = zonasData.find((z) => z.id === hotel.zona) || { tarifaSuburban: 80, nombre: 'Los Cabos' };
  return {
    path: `/destinations/${hotel.slug}`,
    canonicalPath: `/destinations/${hotel.slug}`,
    includeInSitemap: true,
    priority: '0.8',
    changefreq: 'monthly',
    title: `Private Transportation from SJD Airport to ${hotel.nombre}`,
    description: `Book your private luxury transportation from SJD Airport to ${hotel.nombre}. Flat rates starting at $${zonaObj.tarifaSuburban || 80} USD, bilingual drivers, and 100% private VIP service.`
  };
});

const restaurantPages = restaurantSEOData.map((rest) => ({
  path: `/restaurants/${rest.slug}`,
  canonicalPath: `/restaurants/${rest.slug}`,
  includeInSitemap: true,
  priority: '0.8',
  changefreq: 'monthly',
  title: `Private Transportation to ${rest.nombre} (${rest.zonaText}) | Ballard Tours`,
  description: `Book luxury private round-trip dinner transportation to ${rest.nombre} in ${rest.zonaText}. Punctual private chauffeur service and up to 3 hours of waiting time.`
}));

const allPages = [
  ...staticPages.map((p) => ({ ...p, canonicalPath: p.path, includeInSitemap: true })),
  ...tourPages,
  ...tourAliases,
  ...hotelPages,
  ...restaurantPages
];

// 5. Generar Sitemap XML (solo rutas canónicas únicas)
const sitemapPages = allPages.filter((p) => p.includeInSitemap);
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPages
  .map((page) => {
    const loc = page.path === '/' ? `${BASE_URL}/` : `${BASE_URL}${page.path}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`✅ public/sitemap.xml generado con ${sitemapPages.length} URLs canónicas.`);

if (fs.existsSync(BUILD_DIR)) {
  fs.writeFileSync(path.join(BUILD_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
  const templateHtmlPath = path.join(BUILD_DIR, 'index.html');
  if (fs.existsSync(templateHtmlPath)) {
    const baseHtml = fs.readFileSync(templateHtmlPath, 'utf8');
    let generatedCount = 0;

    for (const page of allPages) {
      const canonicalUrl =
        page.canonicalPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${page.canonicalPath}`;
      const safeTitle = escapeHtml(page.title);
      const safeDesc = escapeHtml(page.description);

      let pageHtml = baseHtml
        .replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`)
        .replace(
          /<meta\s+name="description"[^>]*>/i,
          `<meta name="description" data-rh="true" content="${safeDesc}" />`
        )
        .replace(
          /<link\s+rel="canonical"[^>]*>/i,
          `<link rel="canonical" data-rh="true" href="${canonicalUrl}" />`
        )
        .replace(
          /<meta\s+property="og:title"[^>]*>/i,
          `<meta property="og:title" data-rh="true" content="${safeTitle}" />`
        )
        .replace(
          /<meta\s+property="og:description"[^>]*>/i,
          `<meta property="og:description" data-rh="true" content="${safeDesc}" />`
        )
        .replace(
          /<meta\s+property="og:url"[^>]*>/i,
          `<meta property="og:url" data-rh="true" content="${canonicalUrl}" />`
        );

      const outFile =
        page.path === '/'
          ? path.join(BUILD_DIR, 'index.html')
          : path.join(BUILD_DIR, page.path.replace(/^\//, ''), 'index.html');

      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, pageHtml, 'utf8');
      generatedCount++;
    }

    console.log(`✅ Pre-renderizado SEO estático completado para ${generatedCount} rutas en build/.`);
  }
}

