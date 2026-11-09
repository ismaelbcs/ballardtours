import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Anchor, CheckCircle2, MessageCircle, ChevronLeft, ChevronRight, X,
  Star, Car, Calendar, ArrowRight
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { sendEmail } from './utils/sendEmail';
import { HeroReviewsBadge } from './HeroReviewsBadge';

export const YACHTS_CATALOG = {
  'baja-therapy': {
    slug: 'baja-therapy',
    name: '30 Ft Baja Therapy',
    subtitleEn: 'Luxury Double-Deck Pontoon · Cabo Party Boat, Sunset & Arch Tours',
    subtitleEs: 'Pontón de Lujo de Dos Pisos · Party Boat, Atardecer y Tour al Arco',
    badgeEn: '30 FT DOUBLE-DECK PONTOON · CABO SAN LUCAS',
    badgeEs: 'PONTÓN DE DOS PISOS DE 30 PIES · CABO SAN LUCAS',
    length: '30 Feet (Double-Deck)',
    builder: 'Custom Double-Deck Pontoon',
    year: '2023',
    maxGuests: 20,
    includedGuests: 10,
    extraGuestPrice: 130,
    extraHourPrice: 290,
    cabins: '2 Levels (Upper Lounge & Main Deck)',
    bathrooms: '1 Onboard Restroom',
    crew: 'Bilingual Captain & Bartender/Crew',
    startingPrice: 1560,
    startingLabelEn: '3 Hours · Up to 10 Guests',
    startingLabelEs: '3 Horas · Hasta 10 Pasajeros',
    coverImage: '/yachts/Baja Therapy/cover.Bzegnl3K_1cRkvD.webp',
    gallery: [
      { src: '/yachts/Baja Therapy/cover.Bzegnl3K_1cRkvD.webp', titleEn: '30 Ft Baja Therapy at El Arco', titleEs: '30 Ft Baja Therapy en El Arco' },
      { src: '/yachts/Baja Therapy/4.CCpvPTJP_ZcyhUS.webp', titleEn: 'Sunset Cruise Past Land\'s End', titleEs: 'Crucero al Atardecer en Finisterra' },
      { src: '/yachts/Baja Therapy/1.5MxG9lIe_wdbkQ.webp', titleEn: 'Plush Main Deck Wrap-Around Lounge', titleEs: 'Sala Principal con Asientos de Lujo' },
      { src: '/yachts/Baja Therapy/2.CHNNoIqn_Z1VPJSD.webp', titleEn: 'Captain\'s Club Seating & Cocktail Table', titleEs: 'Asientos Club y Mesa de Cócteles' },
      { src: '/yachts/Baja Therapy/3.D2bq6Z5Q_Z139WxH.webp', titleEn: 'Upper Deck Water Slide into Turquoise Bay', titleEs: 'Tobogán Acuático desde el Segundo Piso' }
    ],
    descriptionEn: [
      'Step aboard 30 Ft Baja Therapy, a luxury double-deck pontoon designed for unforgettable private charters in Los Cabos. Perfect for birthdays, bachelor and bachelorette parties, sunset toasts, or group celebrations, this custom double-decker delivers the ideal blend of comfort, fun, and style.',
      'Cruise past Cabo San Lucas’ most iconic landmarks—including El Arco, Lover’s Beach, Pelican Rock, and the Sea Lion Colony—while enjoying panoramic views from the spacious upper deck and water slide. Anchor in a calm turquoise cove to swim, snorkel, paddleboard, or relax on the floating mat with an open bar, premium Bluetooth sound system, and dedicated crew.'
    ],
    descriptionEs: [
      'Sube a bordo de 30 Ft Baja Therapy, un pontón de lujo de dos pisos diseñado para charters privados inolvidables en Los Cabos. Perfecto para cumpleaños, despedidas de soltero(a), atardeceres o celebraciones en grupo, combinando comodidad, fiesta y estilo.',
      'Navega frente a los íconos de Cabo San Lucas—El Arco, Playa del Amor, Roca Pelícano y la Colonia de Lobos Marinos—con vistas panorámicas desde la terraza superior con tobogán acuático. Fondea en una bahía tranquila para nadar, hacer snorkel, paddleboard o relajarte en el tapete flotante con barra libre, sonido Bluetooth premium y tripulación profesional.'
    ],
    packages: [
      { id: '3h-sunset', nameEn: '3-Hour Sunset Cruise & Arch Tour', nameEs: 'Crucero al Atardecer y Arco (3 Horas)', hours: 3, price: 1560, noteEn: 'Up to 10 guests · Open bar & Arch sightseeing', noteEs: 'Hasta 10 pasajeros · Barra libre y paseo al Arco' },
      { id: '3h-party', nameEn: '3-Hour Signature Party, Snorkel or Whale Charter', nameEs: 'Charter Fiesta, Snorkel o Ballenas (3 Horas)', hours: 3, price: 1950, popular: true, noteEn: 'Up to 10 guests · Open bar, water slide, snorkel & mat', noteEs: 'Hasta 10 pasajeros · Barra libre, tobogán, snorkel y tapete' },
      { id: '4h', nameEn: '4-Hour Extended Bay & Snorkel Party', nameEs: 'Charter Extendido de Bahía y Snorkel (4 Horas)', hours: 4, price: 1850, noteEn: 'Up to 10 guests · Extra bay time at Pelican Rock / Medano', noteEs: 'Hasta 10 pasajeros · Tiempo extra de nado y fiesta' },
      { id: '6h', nameEn: '6-Hour Santa Maria / Chileno Cove Charter', nameEs: 'Charter de Medio Día a Chileno / Santa María (6 Horas)', hours: 6, price: 2430, noteEn: 'Up to 10 guests · Full coastal & snorkeling expedition', noteEs: 'Hasta 10 pasajeros · Expedición completa de costa y snorkel' }
    ],
    includedEn: [
      'Private 30ft Double-Deck Custom Pontoon (up to 10 guests included; max 20)',
      'Upper deck panoramic lounge, shaded seating & custom water slide',
      'Open bar (beer, cocktails, mixers, sodas, bottled water & ice)',
      'Bilingual captain & attentive deckhand/bartender',
      'Premium Bluetooth sound system',
      'Snorkeling gear, stand-up paddleboard & floating lily pad mat',
      'Private tour of El Arco, Lover\'s Beach & Sea Lion Colony'
    ],
    includedEs: [
      'Pontón privado de 30 pies de dos pisos (incluye 10 pasajeros; máx. 20)',
      'Terraza superior panorámica, sala con sombra y tobogán acuático',
      'Barra libre a bordo (cerveza, cócteles, refrescos, agua embotellada y hielo)',
      'Capitán bilingüe y marinero/bartender de servicio',
      'Sistema de sonido Bluetooth premium',
      'Equipo de snorkel, tabla de paddleboard y tapete acuático flotante',
      'Recorrido privado por El Arco, Playa del Amor y Lobos Marinos'
    ]
  },

  'la-dolce-vita': {
    slug: 'la-dolce-vita',
    name: '57ft Yacht La Dolce Vita',
    subtitleEn: 'VIP Private Flybridge Motor Yacht · Open Bar, Snorkel & Paddleboards',
    subtitleEs: 'Yate Privado VIP de 57 Pies · Barra Libre, Snorkel y Paddleboards',
    badgeEn: '57 FT MOTOR YACHT · UP TO 12 GUESTS',
    badgeEs: 'YATE A MOTOR DE 57 PIES · HASTA 12 PASAJEROS',
    length: '57 Feet',
    builder: 'Sea Ray / Custom Build',
    year: '2020 Refit',
    maxGuests: 12,
    includedGuests: 12,
    extraGuestPrice: 0,
    extraHourPrice: 910,
    cabins: '1 Cabin (Air-Conditioned Salon)',
    bathrooms: '1 Full Bathroom',
    crew: 'Captain & First Mate (Fuel Included)',
    startingPrice: 1999,
    startingLabelEn: '2 Hours · Up to 12 Guests',
    startingLabelEs: '2 Horas · Hasta 12 Pasajeros',
    coverImage: '/yachts/LA DOLCE VITA/Luen-1.avif',
    gallery: [
      { src: '/yachts/LA DOLCE VITA/Luen-1.avif', titleEn: '57ft La Dolce Vita Cruising Cabo San Lucas', titleEs: 'Yate 57 pies La Dolce Vita en Cabo San Lucas' },
      { src: '/yachts/LA DOLCE VITA/Luen-17.avif', titleEn: 'Bow Sunpads & Panoramic Flybridge', titleEs: 'Asoleaderos de Proa y Flybridge Panorámico' },
      { src: '/yachts/LA DOLCE VITA/Luen-781.avif', titleEn: 'Docked at Cabo San Lucas Marina with Water Toys', titleEs: 'En Marina Cabo San Lucas con Juguetes Acuáticos' },
      { src: '/yachts/LA DOLCE VITA/Luen-20.avif', titleEn: 'Cruising Past Land\'s End Rock Formations', titleEs: 'Navegando frente a las Rocas del Fin de la Tierra' },
      { src: '/yachts/LA DOLCE VITA/Luen-54.avif', titleEn: 'Spacious Swim Platform & Aft Cockpit', titleEs: 'Amplia Plataforma de Nado y Popa' },
      { src: '/yachts/LA DOLCE VITA/Luend-3.avif', titleEn: 'Interior Air-Conditioned Lounge & Salon', titleEs: 'Salón Interior Climatizado' },
      { src: '/yachts/LA DOLCE VITA/Luend-7.avif', titleEn: 'Galley & Indoor Dining Comfort', titleEs: 'Cocina y Comedor Interior' }
    ],
    descriptionEn: [
      'Enjoy a VIP experience aboard a 57-foot motor yacht designed for both elegance and comfort. This private charter offers an intimate way to explore Cabo’s iconic coastline with personalized service and onboard amenities including snorkeling gear, floating mat, and paddleboards.',
      'Cruise past natural landmarks including El Arco and Lover’s Beach while relaxing on the foredeck sun pads or shaded flybridge. With a dedicated bilingual crew, fuel included, and space for up to 12 guests at one flat charter rate, La Dolce Vita is ideal for romantic getaways, birthdays, or family celebrations.'
    ],
    descriptionEs: [
      'Disfruta de una experiencia VIP a bordo del yate de 57 pies La Dolce Vita, diseñado para combinar elegancia y confort. Este charter privado ofrece una forma íntima de explorar la icónica costa de Los Cabos con servicio personalizado, equipo de snorkel y tablas de paddleboard.',
      'Navega frente a monumentos naturales como El Arco y Playa del Amor mientras te relajas en los camastros de proa o en el flybridge con sombra. Con tripulación dedicada, combustible incluido y capacidad para hasta 12 pasajeros incluidos en la tarifa, es ideal para escapadas románticas, cumpleaños o celebraciones en grupo.'
    ],
    packages: [
      { id: '2h', nameEn: '2-Hour Express Arch & Coastline Charter', nameEs: 'Charter Express por El Arco y Bahía (2 Horas)', hours: 2, price: 1999, noteEn: 'Up to 12 guests included · Arch sightseeing & coastal cruise', noteEs: 'Hasta 12 pasajeros incluidos · Paseo al Arco y bahía' },
      { id: '4h', nameEn: '4-Hour Half-Day Snorkel & Bay Charter', nameEs: 'Charter de Medio Día y Snorkel (4 Horas)', hours: 4, price: 4260, popular: true, noteEn: 'Up to 12 guests included · Arch, Pelican Rock / Chileno Bay snorkel', noteEs: 'Hasta 12 pasajeros incluidos · El Arco y snorkel en bahía' },
      { id: '8h', nameEn: '8-Hour Full-Day VIP Coastal Expedition', nameEs: 'Expedición VIP de Día Completo (8 Horas)', hours: 8, price: 7500, noteEn: 'Up to 12 guests included · Full day exploring Cabo bays & sunset', noteEs: 'Hasta 12 pasajeros incluidos · Día completo por las bahías' }
    ],
    includedEn: [
      'Private use of 57-foot La Dolce Vita yacht (all 12 guests included in base rate)',
      'Licensed Captain, crew & all fuel included',
      'Snorkeling equipment, paddleboards & floating mat',
      'Bottled water, assorted Coca-Cola sodas & ice',
      'Shaded flybridge lounge & foredeck sun pads',
      'Air-conditioned cabin salon & private restroom',
      'Life jackets, first aid kit & harbor taxes'
    ],
    includedEs: [
      'Uso privado del yate de 57 pies La Dolce Vita (hasta 12 pasajeros incluidos)',
      'Capitán con licencia, marinero y todo el combustible incluido',
      'Equipo de snorkel, tablas de paddleboard y tapete flotante',
      'Agua embotellada, refrescos de la familia Coca-Cola y hielo',
      'Flybridge techado con sala y asoleaderos en proa',
      'Salón interior con aire acondicionado y baño privado',
      'Chalecos salvavidas, botiquín y permisos portuarios'
    ]
  },

  'papillon-9': {
    slug: 'papillon-9',
    name: '80ft Ferretti Papillon 9',
    subtitleEn: 'Italian Flybridge Motor Yacht · All-Inclusive Chef & Open Bar',
    subtitleEs: 'Yate Italiano Ferretti de 80 Pies · Todo Incluido con Chef y Barra Libre',
    badgeEn: '80 FT FERRETTI YACHT · CABO SAN LUCAS',
    badgeEs: 'YATE FERRETTI DE 80 PIES · CABO SAN LUCAS',
    length: '80 Feet',
    builder: 'Ferretti Yachts (Italy)',
    year: '2019 Refit',
    maxGuests: 20,
    includedGuests: 10,
    extraGuestPrice: 200,
    extraHourPrice: 1200,
    cabins: '4 Luxury Staterooms',
    bathrooms: '4 Full Bathrooms',
    crew: 'Captain, Private Chef, Bartender & Deckhands',
    startingPrice: 4300,
    startingLabelEn: '3 Hours · Up to 10 Guests',
    startingLabelEs: '3 Horas · Hasta 10 Pasajeros',
    coverImage: '/yachts/papillon-9/papillon-1.avif',
    gallery: [
      { src: '/yachts/papillon-9/papillon-1.avif', titleEn: '80ft Ferretti Papillon 9 Profile', titleEs: 'Perfil del Ferretti 80 pies Papillon 9' },
      { src: '/yachts/papillon-9/papillon-2.avif', titleEn: 'Cruising Past El Arco at Land\'s End', titleEs: 'Navegando frente a El Arco de Cabo San Lucas' },
      { src: '/yachts/papillon-9/papillon-5.avif', titleEn: 'Expansive Flybridge Lounge & Dining', titleEs: 'Amplio Flybridge y Comedor Exterior' },
      { src: '/yachts/papillon-9/papillon-8.avif', titleEn: 'Foredeck Sunpads & Coastal Views', titleEs: 'Asoleaderos de Proa y Vistas Costeras' },
      { src: '/yachts/papillon-9/papillon-12.avif', titleEn: 'Main Salon with Panoramic Windows', titleEs: 'Salón Principal con Ventanales Panorámicos' },
      { src: '/yachts/papillon-9/papillon-16.avif', titleEn: 'Master Stateroom Suite', titleEs: 'Camarote Principal de Lujo' }
    ],
    descriptionEn: [
      'Experience Italian pedigree aboard the 80ft Ferretti Papillon 9. Featuring four staterooms, an expansive flybridge, teak aft dining deck, and plush foredeck sun pads, Papillon 9 delivers an effortless luxury yachting experience along the Los Cabos corridor.',
      'Every charter includes a dedicated private chef, open bar, snorkeling gear, paddleboards, and floating mat—ideal for family charters, corporate hospitality, and milestone celebrations.'
    ],
    descriptionEs: [
      'Experimenta la elegancia italiana a bordo del Ferretti de 80 pies Papillon 9. Con cuatro camarotes, amplio flybridge, comedor en popa de teca y asoleaderos en proa, ofrece una experiencia náutica inigualable en Los Cabos.',
      'Cada charter incluye chef privado a bordo, barra libre premium, equipo de snorkel, tablas de paddleboard y tapete flotante.'
    ],
    packages: [
      { id: '3h', nameEn: '3-Hour Sunset & Arch All-Inclusive', nameEs: 'Charter 3 Horas Atardecer y Arco Todo Incluido', hours: 3, price: 4300, noteEn: 'Up to 10 guests · Chef menu & open bar included', noteEs: 'Hasta 10 pasajeros · Menú de chef y barra libre' },
      { id: '4h', nameEn: '4-Hour Half-Day Chileno / Santa Maria Bay', nameEs: 'Charter 4 Horas Bahía Chileno / Santa María', hours: 4, price: 5400, popular: true, noteEn: 'Up to 10 guests · Full meal, open bar & snorkel cove', noteEs: 'Hasta 10 pasajeros · Comida completa, barra libre y snorkel' },
      { id: '6h', nameEn: '6-Hour Extended Luxury Coastline Charter', nameEs: 'Charter Extendido de Lujo (6 Horas)', hours: 6, price: 7600, noteEn: 'Up to 10 guests · Multiple bays, chef dining & sunset', noteEs: 'Hasta 10 pasajeros · Múltiples bahías y atardecer' },
      { id: '8h', nameEn: '8-Hour Full-Day Superyacht Experience', nameEs: 'Experiencia de Día Completo (8 Horas)', hours: 8, price: 9800, noteEn: 'Up to 10 guests · Ultimate full-day Los Cabos charter', noteEs: 'Hasta 10 pasajeros · Día completo en Los Cabos' }
    ],
    includedEn: [
      'Private 80ft Ferretti Yacht with Captain, Chef & Crew',
      'Freshly prepared chef menu & gourmet appetizers',
      'Premium open bar (tequila, vodka, rum, whiskey, beer, wine & mixers)',
      '4 luxury staterooms & air-conditioned salon',
      'Snorkeling gear, stand-up paddleboards & floating mat',
      'Bluetooth sound system, towels & fuel'
    ],
    includedEs: [
      'Yate privado Ferretti de 80 pies con Capitán, Chef y Tripulación',
      'Menú preparado al momento por el chef y bocadillos gourmet',
      'Barra libre premium (tequila, vodka, ron, whisky, cerveza, vino y mezcladores)',
      '4 camarotes de lujo y salón climatizado',
      'Equipo de snorkel, paddleboards y tapete flotante',
      'Sistema de sonido Bluetooth, toallas y combustible'
    ]
  },

  'contessa': {
    slug: 'contessa',
    name: '85ft Azimut Contessa',
    subtitleEn: 'Italian Flybridge Superyacht · Jacuzzi, Chef & Premium Open Bar',
    subtitleEs: 'Superyate Italiano Azimut de 85 Pies · Jacuzzi, Chef y Barra Libre',
    badgeEn: '85 FT AZIMUT SUPERYACHT · CABO SAN LUCAS',
    badgeEs: 'SUPERYATE AZIMUT DE 85 PIES · CABO SAN LUCAS',
    length: '85 Feet',
    builder: 'Azimut Yachts (Italy)',
    year: '2020 Refit',
    maxGuests: 25,
    includedGuests: 12,
    extraGuestPrice: 200,
    extraHourPrice: 1400,
    cabins: '4 En-Suite Staterooms',
    bathrooms: '4 Bathrooms',
    crew: 'Captain, Private Chef, Stewardess & Deckhands',
    startingPrice: 5200,
    startingLabelEn: '3 Hours · Up to 12 Guests',
    startingLabelEs: '3 Horas · Hasta 12 Pasajeros',
    coverImage: '/yachts/contessa/contessa-1.jpg',
    gallery: [
      { src: '/yachts/contessa/contessa-1.jpg', titleEn: '85ft Azimut Contessa Cruising Cabo', titleEs: 'Azimut 85 pies Contessa Navegando en Cabo' },
      { src: '/yachts/contessa/contessa-2.jpg', titleEn: 'Aerial View & Expansive Sun Decks', titleEs: 'Vista Aérea y Amplias Cubiertas' },
      { src: '/yachts/contessa/contessa-5.jpg', titleEn: 'Flybridge Lounge & Al Fresco Dining', titleEs: 'Sala en Flybridge y Comedor Exterior' },
      { src: '/yachts/contessa/contessa-10.jpg', titleEn: 'Luxury Main Salon & Bar', titleEs: 'Salón Principal de Lujo y Bar' },
      { src: '/yachts/contessa/contessa-15.jpg', titleEn: 'Foredeck Sunbathing Terrace', titleEs: 'Terraza Asoleadero en Proa' },
      { src: '/yachts/contessa/contessa-20.jpg', titleEn: 'Master Stateroom Suite', titleEs: 'Suite Principal' }
    ],
    descriptionEn: [
      'The 85ft Azimut Contessa blends sleek Italian styling with expansive entertaining spaces across three decks. Featuring four en-suite staterooms, a panoramic flybridge lounge, and a hydraulic swim platform, Contessa is built for unforgettable days on the water.',
      'Enjoy chef-crafted dining, an unlimited top-shelf open bar, and full water toys while cruising past El Arco to the turquoise waters of Santa Maria or Chileno Bay.'
    ],
    descriptionEs: [
      'El Azimut de 85 pies Contessa combina el diseño italiano con amplias áreas sociales en tres niveles. Con cuatro camarotes con baño propio, flybridge panorámico y plataforma de nado hidráulica, es ideal para grupos exigentes.',
      'Disfruta de gastronomía preparada por chef privado, barra libre premium ilimitada y juguetes acuáticos mientras navegas por El Arco hacia Bahía Chileno o Santa María.'
    ],
    packages: [
      { id: '3h', nameEn: '3-Hour Sunset & Arch Superyacht Charter', nameEs: 'Charter 3 Horas Atardecer y Arco', hours: 3, price: 5200, noteEn: 'Up to 12 guests · Chef dining & premium open bar', noteEs: 'Hasta 12 pasajeros · Chef privado y barra libre' },
      { id: '4h', nameEn: '4-Hour Half-Day Bay & Snorkel Charter', nameEs: 'Charter 4 Horas Bahía y Snorkel', hours: 4, price: 6500, popular: true, noteEn: 'Up to 12 guests · Chileno / Santa Maria Bay anchor', noteEs: 'Hasta 12 pasajeros · Anclaje en Bahía Chileno / Santa María' },
      { id: '6h', nameEn: '6-Hour Extended Coastline & Sunset Charter', nameEs: 'Charter Extendido de Costa y Atardecer (6 Horas)', hours: 6, price: 9100, noteEn: 'Up to 12 guests · Full dining service & water toys', noteEs: 'Hasta 12 pasajeros · Menú completo y juguetes acuáticos' },
      { id: '8h', nameEn: '8-Hour Full-Day Azimut VIP Charter', nameEs: 'Charter VIP de Día Completo (8 Horas)', hours: 8, price: 11700, noteEn: 'Up to 12 guests · Complete Los Cabos yachting day', noteEs: 'Hasta 12 pasajeros · Día completo en Los Cabos' }
    ],
    includedEn: [
      'Private 85ft Azimut Superyacht with Captain, Chef & Stewardess',
      'Gourmet chef-prepared menu & snacks',
      'Unlimited premium open bar',
      '4 en-suite staterooms & luxury indoor salon',
      'Paddleboards, kayaks, snorkel gear & floating island',
      'Towels, WiFi, premium sound system & fuel'
    ],
    includedEs: [
      'Superyate privado Azimut de 85 pies con Capitán, Chef y Azafata',
      'Menú gourmet preparado por chef y botanas frescas',
      'Barra libre premium ilimitada',
      '4 camarotes con baño privado y salón interior de lujo',
      'Paddleboards, kayaks, equipo de snorkel e isla flotante',
      'Toallas, WiFi, sonido premium y combustible'
    ]
  },

  'neoprene': {
    slug: 'neoprene',
    name: '108ft Mangusta Neoprene',
    subtitleEn: 'Matte-Black Mangusta 108 Flagship Superyacht · Chef Christian, Open Bar & Seabob',
    subtitleEs: 'Superyate Insignia Mangusta 108 Negro Mate · Chef Christian, Barra Libre y Seabob',
    badgeEn: '108 FT MANGUSTA FLAGSHIP · UP TO 30 DAY GUESTS',
    badgeEs: 'MANGUSTA 108 PIES INSIGNIA · HASTA 30 PASAJEROS',
    length: '108 Feet (Mangusta 108)',
    builder: 'Overmarine Mangusta (Italy)',
    year: 'Custom Matte-Black Refit',
    maxGuests: 30,
    includedGuests: 10,
    extraGuestPrice: 200,
    extraHourPrice: 2000,
    cabins: '4 Staterooms + Master Suite (Sleeps 10)',
    bathrooms: '5 Full Bathrooms',
    crew: 'Captain, Chef Christian, Personal Bartender & Professional Staff',
    startingPrice: 6700,
    startingLabelEn: '3 Hours · Up to 10 Guests',
    startingLabelEs: '3 Horas · Hasta 10 Pasajeros',
    coverImage: '/yachts/neopreno/DSC03705.jpg',
    gallery: [
      { src: '/yachts/neopreno/DSC03705.jpg', titleEn: '108ft Matte-Black Mangusta Neoprene Underway', titleEs: 'Mangusta 108 Pies Negro Mate Neoprene Navegando' },
      { src: '/yachts/neopreno/neoprene-gallery-01.jpg', titleEn: 'Sleek Matte-Black Profile in Cabo San Lucas', titleEs: 'Perfil Negro Mate en Cabo San Lucas' },
      { src: '/yachts/neopreno/neoprene-gallery-02.jpg', titleEn: 'Foredeck Sun Pads with Optional Canopy', titleEs: 'Asoleaderos de Proa con Toldo Opcional' },
      { src: '/yachts/neopreno/neoprene-gallery-03.jpg', titleEn: 'Al Fresco Deck Dining & Aft Lounge', titleEs: 'Comedor Al Fresco en Cubierta y Sala de Popa' },
      { src: '/yachts/neopreno/neoprene-gallery-04.jpg', titleEn: 'Onboard Beach Club & Swim Platform', titleEs: 'Beach Club a Bordo y Plataforma de Nado' },
      { src: '/yachts/neopreno/neoprene-gallery-05.jpg', titleEn: 'Brightly Lit Saloon & Indoor Dining Area', titleEs: 'Salón Iluminado y Comedor Interior' },
      { src: '/yachts/neopreno/neoprene-gallery-06.jpg', titleEn: 'Chef Christian\'s Fresh Onboard Cuisine', titleEs: 'Alta Cocina Fresca del Chef Christian a Bordo' },
      { src: '/yachts/neopreno/neoprene-gallery-07.jpg', titleEn: 'Personal Bartender & Top-Shelf Open Bar', titleEs: 'Bartender Personal y Barra Libre Top-Shelf' },
      { src: '/yachts/neopreno/neoprene-gallery-08.jpg', titleEn: 'Spacious Master Suite & Staterooms', titleEs: 'Amplia Master Suite y Camarotes' },
      { src: '/yachts/neopreno/neoprene-gallery-09.jpg', titleEn: 'Seabob, Kayaks, Paddleboards & Water Toys', titleEs: 'Seabob, Kayaks, Paddleboards y Juguetes Acuáticos' },
      { src: '/yachts/neopreno/neoprene-gallery-11.jpg', titleEn: 'Sunset Cruising Past Land\'s End', titleEs: 'Atardecer frente a El Arco' }
    ],
    descriptionEn: [
      'The matte-black Mangusta 108 Neoprene is the most distinctive vessel on the water in Cabo—she doesn’t just arrive, she makes an entrance. Featuring four staterooms and a spacious master suite, a brightly lit saloon and dining area, and more outdoor living space than any yacht in the bay.',
      'Enjoy sun pads on the foredeck under an optional canopy, al fresco dining on deck, and a swimming platform with an onboard beach club. A dedicated professional staff elevates every minute: personal bartender with a top-shelf open bar (Don Julio 1942/Clase Azul upgrades available, craft cocktails, wines) and Private Chef Christian preparing your tailored menu fresh on board.'
    ],
    descriptionEs: [
      'El Mangusta 108 negro mate Neoprene es la embarcación más imponente de Los Cabos: no solo llega, hace una entrada inolvidable. Cuenta con cuatro camarotes y una espaciosa master suite, salón principal iluminado y más espacio exterior que cualquier otro yate en la bahía.',
      'Disfruta de camastros en proa con toldo opcional, comedor al aire libre en cubierta y plataforma de nado tipo beach club. Su tripulación profesional eleva cada minuto: bartender personal con barra libre top-shelf y el Chef Privado Christian cocinando tu menú personalizado al momento.'
    ],
    packages: [
      { id: '3h', nameEn: '3-Hour Flagship Charter (Minimum)', nameEs: 'Charter Insignia de 3 Horas (Mínimo)', hours: 3, price: 6700, noteEn: 'Up to 10 guests · Chef Christian, top-shelf bar & Seabob', noteEs: 'Hasta 10 pasajeros · Chef Christian, barra top-shelf y Seabob' },
      { id: '4h', nameEn: '4-Hour Half-Day Superyacht Charter', nameEs: 'Charter de Medio Día (4 Horas)', hours: 4, price: 8700, popular: true, noteEn: 'Up to 10 guests · Arch, Chileno Bay beach club & full meal', noteEs: 'Hasta 10 pasajeros · El Arco, Bahía Chileno y menú completo' },
      { id: '6h', nameEn: '6-Hour Extended Coastline & Sunset Charter', nameEs: 'Charter Extendido de Costa y Atardecer (6 Horas)', hours: 6, price: 12700, noteEn: 'Up to 10 guests · Multi-course dining, water toys & golden hour', noteEs: 'Hasta 10 pasajeros · Menú de varios tiempos y atardecer' },
      { id: '8h', nameEn: '8-Hour Full-Day Mangusta 108 Experience', nameEs: 'Experiencia de Día Completo Mangusta 108 (8 Horas)', hours: 8, price: 16700, noteEn: 'Up to 10 guests · Complete VIP day charter (up to 30 pax max)', noteEs: 'Hasta 10 pasajeros · Día VIP completo (capacidad hasta 30 pax)' }
    ],
    includedEn: [
      'Private 108ft Matte-Black Mangusta Superyacht (3-hour minimum · up to 10 guests included; up to 30 day guests)',
      'Private Chef Christian — custom fresh menu tailored to your group',
      'Personal bartender & top-shelf open bar included',
      '4 staterooms & master suite + onboard beach club & swim platform',
      'Seabob, kayaks, paddleboards, lily pad & snorkel gear',
      'Foredeck sun pads with optional canopy & al fresco dining deck',
      'Cabo San Lucas Marina dock & departure fees included'
    ],
    includedEs: [
      'Superyate privado Mangusta 108 Negro Mate (mínimo 3 horas · incluye 10 pasajeros; hasta 30 pasajeros de día)',
      'Chef privado Christian — menú fresco personalizado para tu grupo',
      'Bartender personal y barra libre top-shelf incluida',
      '4 camarotes y master suite + beach club a bordo y plataforma de nado',
      'Seabob, kayaks, tablas de paddleboard, lily pad y equipo de snorkel',
      'Asoleaderos en proa con toldo opcional y comedor al aire libre',
      'Impuestos de muelle saliendo de la Marina de Cabo San Lucas incluidos'
    ]
  },

  'aquaholic': {
    slug: 'aquaholic',
    name: '110ft Horizon Aquaholic',
    subtitleEn: 'Tri-Deck Luxury Superyacht · Flybridge Jacuzzi, Chef & Open Bar',
    subtitleEs: 'Superyate Horizon de 110 Pies · Jacuzzi en Flybridge, Chef y Barra Libre',
    badgeEn: '110 FT HORIZON SUPERYACHT · CABO SAN LUCAS',
    badgeEs: 'SUPERYATE HORIZON DE 110 PIES · CABO SAN LUCAS',
    length: '110 Feet',
    builder: 'Horizon Yachts',
    year: '2021 Refit',
    maxGuests: 30,
    includedGuests: 12,
    extraGuestPrice: 225,
    extraHourPrice: 1900,
    cabins: '5 Luxury Staterooms',
    bathrooms: '6 Bathrooms',
    crew: 'Captain, Private Chef, Bartender, Stewardesses & Deckhands',
    startingPrice: 7000,
    startingLabelEn: '4 Hours · Up to 12 Guests',
    startingLabelEs: '4 Horas · Hasta 12 Pasajeros',
    coverImage: '/HORIZON/yate-acuaholic-horizon-110-cabo-san-lucas-hero.webp',
    gallery: [
      { src: '/HORIZON/yate-acuaholic-horizon-110-cabo-san-lucas-hero.webp', titleEn: '110ft Horizon Aquaholic Superyacht', titleEs: 'Superyate Horizon 110 Pies Aquaholic' },
      { src: '/HORIZON/yate-acuaholic-horizon-110-cabo-san-lucas-2.webp', titleEn: 'Flybridge Jacuzzi & Sky Bar', titleEs: 'Jacuzzi en Flybridge y Sky Bar' },
      { src: '/HORIZON/yate-acuaholic-horizon-110-cabo-san-lucas-3.webp', titleEn: 'Aft Al Fresco Dining Deck', titleEs: 'Comedor Al Aire Libre en Popa' },
      { src: '/HORIZON/yate-acuaholic-horizon-110-cabo-san-lucas-4.webp', titleEn: 'Main Salon & Piano Lounge', titleEs: 'Salón Principal de Lujo' },
      { src: '/HORIZON/yate-acuaholic-horizon-110-cabo-san-lucas-5.webp', titleEn: 'Full-Beam Master Suite', titleEs: 'Suite Principal de Manga Completa' },
      { src: '/HORIZON/yate-acuaholic-horizon-110-cabo-san-lucas-6.webp', titleEn: 'Foredeck Sunbathing Lounge', titleEs: 'Asoleadero Panorámico en Proa' }
    ],
    descriptionEn: [
      'Aboard the 110ft Horizon superyacht Aquaholic, every charter feels like a private five-star resort at sea. Boasting five staterooms, a flybridge Jacuzzi, wet bar, and expansive aft dining terrace, Aquaholic is one of Los Cabos’ premier megayachts.',
      'Ideal for corporate events, wedding welcome parties, and family vacations, complete with five-star chef cuisine and unlimited premium open bar.'
    ],
    descriptionEs: [
      'A bordo del superyate Horizon de 110 pies Aquaholic, cada charter se vive como un resort privado de cinco estrellas en el mar. Con cinco camarotes, jacuzzi en el flybridge, bar húmedo y amplia terraza comedor en popa.',
      'Ideal para eventos corporativos, bodas y vacaciones familiares de lujo, con alta cocina de chef privado y barra libre premium ilimitada.'
    ],
    packages: [
      { id: '4h', nameEn: '4-Hour Half-Day Megayacht Charter', nameEs: 'Charter Megayate de Medio Día (4 Horas)', hours: 4, price: 7000, popular: true, noteEn: 'Up to 12 guests · Chef dining, open bar & Jacuzzi', noteEs: 'Hasta 12 pasajeros · Chef, barra libre y Jacuzzi' },
      { id: '6h', nameEn: '6-Hour Extended Coastline & Sunset Charter', nameEs: 'Charter Extendido de Costa y Atardecer (6 Horas)', hours: 6, price: 10200, noteEn: 'Up to 12 guests · Chileno Bay + Sunset at El Arco', noteEs: 'Hasta 12 pasajeros · Bahía Chileno + Atardecer en El Arco' },
      { id: '8h', nameEn: '8-Hour Full-Day Horizon 110ft Charter', nameEs: 'Charter de Día Completo (8 Horas)', hours: 8, price: 13400, noteEn: 'Up to 12 guests · Ultimate full-day luxury expedition', noteEs: 'Hasta 12 pasajeros · Expedición de lujo de día completo' }
    ],
    includedEn: [
      'Private 110ft Horizon Superyacht with Full White-Glove Crew',
      'Private chef multi-course menu & gourmet hors d\'oeuvres',
      'Unlimited top-shelf open bar',
      'Flybridge Jacuzzi, wet bar & 5 luxury staterooms',
      'Kayaks, paddleboards, snorkel gear & floating island',
      'Towels, WiFi, state-of-the-art sound system & fuel'
    ],
    includedEs: [
      'Superyate privado Horizon de 110 pies con tripulación de guante blanco',
      'Menú de varios tiempos por chef privado y canapés gourmet',
      'Barra libre premium ilimitada',
      'Jacuzzi en flybridge, bar y 5 camarotes de lujo',
      'Kayaks, paddleboards, equipo de snorkel e isla flotante',
      'Toallas, WiFi, sistema de sonido de última generación y combustible'
    ]
  },

  'capella': {
    slug: 'capella',
    name: '116ft Azimut Grande Capella',
    subtitleEn: 'Flagship Tri-Deck Superyacht · Dual Jacuzzis, Private Chef & White-Glove Crew',
    subtitleEs: 'Superyate Insignia Azimut Grande de 116 Pies · Jacuzzi, Chef Privado y Tripulación VIP',
    badgeEn: '116 FT AZIMUT GRANDE · CABO SAN LUCAS',
    badgeEs: 'AZIMUT GRANDE DE 116 PIES · CABO SAN LUCAS',
    length: '116 Feet',
    builder: 'Azimut Benetti Group (Italy)',
    year: '2022 Refit',
    maxGuests: 35,
    includedGuests: 12,
    extraGuestPrice: 250,
    extraHourPrice: 2100,
    cabins: '5 En-Suite Staterooms',
    bathrooms: '6 Marble Bathrooms',
    crew: 'Captain, Executive Chef, Chief Stewardess & 4 Crew',
    startingPrice: 7800,
    startingLabelEn: '4 Hours · Up to 12 Guests',
    startingLabelEs: '4 Horas · Hasta 12 Pasajeros',
    coverImage: '/yachts/capella-arch.jpg',
    gallery: [
      { src: '/yachts/capella-arch.jpg', titleEn: '116ft Capella Superyacht at El Arco', titleEs: 'Superyate Capella de 116 pies en El Arco' },
      { src: '/yachts/capella-aerial-overview.jpg', titleEn: 'Aerial View of 116ft Azimut Grande Capella', titleEs: 'Vista Aérea del Azimut Grande 116 Capella' },
      { src: '/yachts/capella-flybridge-jacuzzi.jpg', titleEn: 'Flybridge Jacuzzi & Sun Deck', titleEs: 'Jacuzzi en el Flybridge y Asoleadero' },
      { src: '/yachts/capella-bow-lounge-terrace.jpg', titleEn: 'Bow Lounge Terrace & Sunpads', titleEs: 'Terraza Lounge en Proa' },
      { src: '/yachts/capella-aft-deck-dining.jpg', titleEn: 'Aft Deck Al Fresco Dining', titleEs: 'Comedor Al Fresco en Popa' },
      { src: '/yachts/capella-main-salon.jpg', titleEn: 'Main Salon & Formal Dining Room', titleEs: 'Salón Principal y Comedor Formal' },
      { src: '/yachts/capella-master-stateroom.jpg', titleEn: 'Master Stateroom Suite', titleEs: 'Camarote Principal Master Suite' },
      { src: '/yachts/capella-master-marble-bath.jpg', titleEn: 'En-Suite Italian Marble Bathroom', titleEs: 'Baño en Mármol Italiano' }
    ],
    descriptionEn: [
      'Commanding the waters of Cabo San Lucas, the 116ft Azimut Grande Capella is an icon of Italian superyacht engineering. With five marble-appointed staterooms, a panoramic sky lounge with Jacuzzi, and an expansive bow terrace, Capella sets the gold standard for private yacht charters in Mexico.',
      'Your charter includes an executive private chef, premium open bar, wave runners / water toys, and white-glove crew service.'
    ],
    descriptionEs: [
      'Dominando las aguas de Cabo San Lucas, el Azimut Grande de 116 pies Capella es un ícono de la ingeniería italiana de superyates. Con cinco camarotes revestidos en mármol, sky lounge panorámico con jacuzzi y terraza en proa, marca el estándar de oro en charters privados en México.',
      'Tu charter incluye chef ejecutivo privado, barra libre premium, juguetes acuáticos y servicio de guante blanco.'
    ],
    packages: [
      { id: '4h', nameEn: '4-Hour Half-Day Superyacht Charter', nameEs: 'Charter de Medio Día (4 Horas)', hours: 4, price: 7800, popular: true, noteEn: 'Up to 12 guests · Executive chef, open bar & Jacuzzi', noteEs: 'Hasta 12 pasajeros · Chef ejecutivo, barra libre y Jacuzzi' },
      { id: '6h', nameEn: '6-Hour Extended Coastline & Sunset Charter', nameEs: 'Charter Extendido de Costa y Atardecer (6 Horas)', hours: 6, price: 11400, noteEn: 'Up to 12 guests · Chileno Bay & Sunset at Land\'s End', noteEs: 'Hasta 12 pasajeros · Bahía Chileno y Atardecer en El Arco' },
      { id: '8h', nameEn: '8-Hour Full-Day Flagship Charter', nameEs: 'Charter Insignia de Día Completo (8 Horas)', hours: 8, price: 15000, noteEn: 'Up to 12 guests · Full-day luxury voyage in Los Cabos', noteEs: 'Hasta 12 pasajeros · Día completo de lujo en Los Cabos' }
    ],
    includedEn: [
      'Private 116ft Azimut Grande Superyacht with 7-person crew',
      'Executive Chef gourmet dining & custom tasting menu',
      'Unlimited top-shelf open bar',
      'Flybridge Jacuzzi, bow lounge terrace & 5 staterooms',
      'Paddleboards, kayaks, snorkel gear & floating island',
      'Towels, Starlink WiFi, premium sound system & fuel'
    ],
    includedEs: [
      'Superyate privado Azimut Grande de 116 pies con 7 tripulantes',
      'Gastronomía gourmet por Chef Ejecutivo y menú personalizado',
      'Barra libre top-shelf ilimitada',
      'Jacuzzi en flybridge, terraza en proa y 5 camarotes',
      'Paddleboards, kayaks, equipo de snorkel e isla flotante',
      'Toallas, WiFi Starlink, sonido premium y combustible'
    ]
  },

  'sovereign': {
    slug: 'sovereign',
    name: '130ft Westport Sovereign',
    subtitleEn: 'Tri-Deck Megayacht · Up to 40 Guests, Sky Lounge Jacuzzi & Executive Chef',
    subtitleEs: 'Megayate Tri-Deck de 130 Pies · Hasta 40 Pasajeros, Jacuzzi y Chef Ejecutivo',
    badgeEn: '130 FT TRI-DECK MEGAYACHT · CABO SAN LUCAS',
    badgeEs: 'MEGAYATE TRI-DECK DE 130 PIES · CABO SAN LUCAS',
    length: '130 Feet (Tri-Deck)',
    builder: 'Westport Yachts',
    year: '2022 Refit',
    maxGuests: 40,
    includedGuests: 12,
    extraGuestPrice: 275,
    extraHourPrice: 2600,
    cabins: '5 Palatial Staterooms',
    bathrooms: '7 Bathrooms',
    crew: 'Captain, Executive Chef, Bartenders, Stewardesses & Deck Crew',
    startingPrice: 10500,
    startingLabelEn: '4 Hours · Up to 12 Guests',
    startingLabelEs: '4 Horas · Hasta 12 Pasajeros',
    coverImage: '/yachts/sovereign/sovereign-1.jpg',
    gallery: [
      { src: '/yachts/sovereign/sovereign-1.jpg', titleEn: '130ft Tri-Deck Megayacht Sovereign', titleEs: 'Megayate Tri-Deck de 130 Pies Sovereign' },
      { src: '/yachts/sovereign/sovereign-2.jpg', titleEn: 'Expansive Tri-Deck Profile at Anchor', titleEs: 'Perfil de Tres Cubiertas Anclado en la Bahía' },
      { src: '/yachts/sovereign/sovereign-4.jpg', titleEn: 'Sun Deck Jacuzzi & Sky Lounge', titleEs: 'Jacuzzi en Cubierta Superior y Sky Lounge' },
      { src: '/yachts/sovereign/sovereign-6.jpg', titleEn: 'Formal Al Fresco Dining on Bridge Deck', titleEs: 'Comedor Al Aire Libre en Cubierta Superior' },
      { src: '/yachts/sovereign/sovereign-9.jpg', titleEn: 'Grand Main Salon & Lounge', titleEs: 'Gran Salón Principal' },
      { src: '/yachts/sovereign/sovereign-12.jpg', titleEn: 'On-Deck Master Suite', titleEs: 'Master Suite en Cubierta Principal' }
    ],
    descriptionEn: [
      'At 130 feet across three expansive decks, the Westport Megayacht Sovereign is the pinnacle of private yachting in Los Cabos. Accommodating up to 40 day guests in palatial comfort, Sovereign features a sky lounge, sun deck Jacuzzi, formal dining room, and five world-class staterooms.',
      'Tailored for high-profile gatherings, weddings, corporate retreats, and ultra-VIP family charters with an executive chef and full superyacht crew.'
    ],
    descriptionEs: [
      'Con 130 pies distribuidos en tres imponentes cubiertas, el Megayate Westport Sovereign es la cúspide de la navegación privada en Los Cabos. Con capacidad para hasta 40 invitados de día, cuenta con sky lounge, jacuzzi en terraza superior, comedor formal y cinco camarotes palaciegos.',
      'Diseñado para eventos de alto perfil, bodas, retiros corporativos y charters familiares ultra-VIP con chef ejecutivo y tripulación completa de superyate.'
    ],
    packages: [
      { id: '4h', nameEn: '4-Hour Half-Day Megayacht Charter', nameEs: 'Charter Megayate de Medio Día (4 Horas)', hours: 4, price: 10500, popular: true, noteEn: 'Up to 12 guests · Tri-deck megayacht, chef & open bar', noteEs: 'Hasta 12 pasajeros · Megayate de 3 pisos, chef y barra libre' },
      { id: '6h', nameEn: '6-Hour Extended Coastline & Sunset Charter', nameEs: 'Charter Extendido de Costa y Atardecer (6 Horas)', hours: 6, price: 15200, noteEn: 'Up to 12 guests · Chileno Bay & golden hour at El Arco', noteEs: 'Hasta 12 pasajeros · Bahía Chileno y atardecer en El Arco' },
      { id: '8h', nameEn: '8-Hour Full-Day 130ft Sovereign Charter', nameEs: 'Charter de Día Completo 130ft Sovereign (8 Horas)', hours: 8, price: 19900, noteEn: 'Up to 12 guests · Complete ultra-VIP Sea of Cortez voyage', noteEs: 'Hasta 12 pasajeros · Travesía ultra-VIP de día completo' }
    ],
    includedEn: [
      'Private 130ft Tri-Deck Westport Megayacht with full crew',
      'Bespoke multi-course culinary experience by Executive Chef',
      'Unlimited luxury open bar & sommelier selections',
      'Sun deck Jacuzzi, sky lounge, formal dining & 5 staterooms',
      'Full fleet of water toys, paddleboards, kayaks & snorkel gear',
      'Towels, Starlink WiFi, state-of-the-art AV system & fuel'
    ],
    includedEs: [
      'Megayate privado Westport de 130 pies y 3 cubiertas con tripulación completa',
      'Experiencia culinaria de varios tiempos por Chef Ejecutivo',
      'Barra libre de lujo ilimitada y selección de vinos',
      'Jacuzzi en terraza superior, sky lounge, comedor formal y 5 camarotes',
      'Flota completa de juguetes acuáticos, kayaks, paddleboards y snorkel',
      'Toallas, WiFi Starlink, sistema audiovisual y combustible'
    ]
  }
};

export const YACHT_ORDER = [
  'baja-therapy',
  'la-dolce-vita',
  'papillon-9',
  'contessa',
  'neoprene',
  'aquaholic',
  'capella',
  'sovereign'
];

const GROUND_TRANSPORT_OPTIONS = [
  { id: 'none', nameEn: 'No Ground Transfer (Meet at Cabo San Lucas Marina)', nameEs: 'Sin Transporte Terrestre (Llegada directa a Marina CSL)', price: 0 },
  { id: 'suv-csl', nameEn: 'Round-Trip Private Luxury SUV · Cabo San Lucas / Corridor (1–6 pax)', nameEs: 'SUV de Lujo Privada Redonda · Cabo San Lucas / Corredor (1–6 pax)', price: 170 },
  { id: 'suv-sjd', nameEn: 'Round-Trip Private Luxury SUV · San José del Cabo / Puerto Los Cabos (1–6 pax)', nameEs: 'SUV de Lujo Privada Redonda · San José del Cabo / Puerto Los Cabos (1–6 pax)', price: 210 },
  { id: 'van-csl', nameEn: 'Round-Trip Private Sprinter / Van · Cabo San Lucas / Corridor (7–14 pax)', nameEs: 'Van / Sprinter Privada Redonda · Cabo San Lucas / Corredor (7–14 pax)', price: 240 },
  { id: 'van-sjd', nameEn: 'Round-Trip Private Sprinter / Van · San José del Cabo / Diamante (7–14 pax)', nameEs: 'Van / Sprinter Privada Redonda · San José del Cabo / Diamante (7–14 pax)', price: 290 }
];

export function YachtCharterPage({ lang = 'en', yachtSlug }) {
  const params = useParams();
  const resolvedSlug = yachtSlug || params.slug || 'capella';
  const yacht = YACHTS_CATALOG[resolvedSlug] || YACHTS_CATALOG['capella'];
  const isEs = lang === 'es';

  const [selectedPkgId, setSelectedPkgId] = useState(yacht.packages[0]?.id || '');
  const [guestCount, setGuestCount] = useState(yacht.includedGuests);
  const [extraHours, setExtraHours] = useState(0);
  const [transportId, setTransportId] = useState('none');
  const [hotelName, setHotelName] = useState('');
  const [charterDate, setCharterDate] = useState('');
  const [departureTime, setDepartureTime] = useState('10:00 AM');

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const defaultPkg = yacht.packages.find(p => p.popular) || yacht.packages[0];
    setSelectedPkgId(defaultPkg ? defaultPkg.id : '');
    setGuestCount(yacht.includedGuests);
    setExtraHours(0);
    setLightboxIndex(null);
    window.scrollTo(0, 0);
  }, [resolvedSlug, yacht]);

  const selectedPkg = useMemo(() => {
    return yacht.packages.find(p => p.id === selectedPkgId) || yacht.packages[0];
  }, [yacht, selectedPkgId]);

  const selectedTransport = useMemo(() => {
    return GROUND_TRANSPORT_OPTIONS.find(t => t.id === transportId) || GROUND_TRANSPORT_OPTIONS[0];
  }, [transportId]);

  const extraGuestsCount = Math.max(0, guestCount - yacht.includedGuests);
  const extraGuestsTotal = extraGuestsCount * (yacht.extraGuestPrice || 0);
  const extraHoursTotal = extraHours * (yacht.extraHourPrice || 0);
  const transportTotal = selectedTransport.price || 0;
  const totalEstimated = (selectedPkg?.price || 0) + extraGuestsTotal + extraHoursTotal + transportTotal;

  const similarYachts = useMemo(() => {
    return YACHT_ORDER.filter(slug => slug !== yacht.slug).map(slug => YACHTS_CATALOG[slug]);
  }, [yacht.slug]);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) return;
    setIsSubmitting(true);

    const pkgName = isEs ? selectedPkg.nameEs : selectedPkg.nameEn;
    const transportName = isEs ? selectedTransport.nameEs : selectedTransport.nameEn;

    try {
      await addDoc(collection(db, 'yacht_inquiries'), {
        site: 'ballardtours.com',
        yachtSlug: yacht.slug,
        yachtName: yacht.name,
        packageSelected: pkgName,
        basePrice: selectedPkg.price,
        guestCount,
        extraGuestsCount,
        extraGuestsTotal,
        extraHours,
        extraHoursTotal,
        groundTransport: transportName,
        groundTransportPrice: transportTotal,
        hotelName: hotelName || 'N/A',
        totalEstimated,
        charterDate: charterDate || 'Flexible',
        departureTime,
        clientName,
        clientEmail,
        clientPhone,
        specialRequests: specialRequests || 'None',
        lang,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.warn('Firestore save warning:', err);
    }

    const htmlSummary = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
        <div style="background: #0f172a; color: #ffffff; padding: 24px;">
          <p style="margin: 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #fbbf24;">Ballard Tours · Private Yacht Charter Inquiry</p>
          <h1 style="margin: 8px 0 0; font-size: 24px;">${yacht.name}</h1>
        </div>
        <div style="padding: 24px; background: #ffffff; color: #1e293b;">
          <h3 style="margin-top: 0; color: #1e3a8a;">Client Details</h3>
          <p><strong>Name:</strong> ${clientName}<br/>
          <strong>Email:</strong> ${clientEmail}<br/>
          <strong>Phone / WhatsApp:</strong> ${clientPhone}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <h3 style="color: #1e3a8a;">Charter Configuration</h3>
          <p><strong>Yacht:</strong> ${yacht.name} (${yacht.length})<br/>
          <strong>Selected Package:</strong> ${pkgName} ($${selectedPkg.price.toLocaleString()} USD)<br/>
          <strong>Preferred Date:</strong> ${charterDate || 'To be confirmed'} at ${departureTime}<br/>
          <strong>Total Guests:</strong> ${guestCount} (${extraGuestsCount > 0 ? `+${extraGuestsCount} extra guests = $${extraGuestsTotal.toLocaleString()} USD` : 'Included in base rate'})<br/>
          <strong>Extra Hours:</strong> ${extraHours > 0 ? `+${extraHours} hr ($${extraHoursTotal.toLocaleString()} USD)` : 'None'}<br/>
          <strong>Ground Transportation:</strong> ${transportName} (${transportTotal > 0 ? `$${transportTotal} USD` : 'Included / Own arrival'})<br/>
          <strong>Hotel / Resort Pick-Up:</strong> ${hotelName || 'N/A'}</p>
          <div style="background: #f8fafc; padding: 16px; border-radius: 12px; margin-top: 16px;">
            <p style="margin: 0; font-size: 18px; font-weight: bold; color: #0f172a;">Total Estimated Charter: $${totalEstimated.toLocaleString()} USD</p>
          </div>
          ${specialRequests ? `<p style="margin-top: 16px;"><strong>Special Requests / Menu Notes:</strong><br/>${specialRequests}</p>` : ''}
        </div>
      </div>
    `;

    try {
      await sendEmail({
        to: 'reservationballard@gmail.com',
        subject: `🛥️ New Yacht Inquiry: ${yacht.name} - ${clientName} (${charterDate || 'Date TBD'})`,
        html: htmlSummary
      });
      await sendEmail({
        to: clientEmail,
        subject: isEs
          ? `Confirmación de Solicitud de Yate: ${yacht.name} | Ballard Tours`
          : `Yacht Charter Inquiry Received: ${yacht.name} | Ballard Tours`,
        html: htmlSummary
      });
    } catch (emailErr) {
      console.warn('Email notification warning:', emailErr);
    }

    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  const whatsappMessage = encodeURIComponent(
    isEs
      ? `Hola Ballard Tours! Me interesa reservar el yate *${yacht.name}*.\n• Paquete: ${selectedPkg.nameEs} ($${selectedPkg.price.toLocaleString()} USD)\n• Fecha: ${charterDate || 'Por confirmar'} (${departureTime})\n• Pasajeros: ${guestCount}\n• Transporte terrestre: ${selectedTransport.nameEs}\n• Total estimado: $${totalEstimated.toLocaleString()} USD`
      : `Hello Ballard Tours! I would like to inquire about chartering *${yacht.name}*.\n• Package: ${selectedPkg.nameEn} ($${selectedPkg.price.toLocaleString()} USD)\n• Date: ${charterDate || 'Flexible'} (${departureTime})\n• Guests: ${guestCount}\n• Ground Transfer: ${selectedTransport.nameEn}\n• Total Estimate: $${totalEstimated.toLocaleString()} USD`
  );

  const canonicalUrl = `https://www.ballardtours.com/yachts/${yacht.slug}`;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>{`${yacht.name} | Private Yacht Charter Cabo San Lucas | Ballard Tours`}</title>
        <meta
          name="description"
          content={`${isEs ? yacht.subtitleEs : yacht.subtitleEn}. From $${yacht.startingPrice.toLocaleString()} USD (${isEs ? yacht.startingLabelEs : yacht.startingLabelEn}). Private crew, open bar, water toys & optional hotel SUV transfer in Los Cabos.`}
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* HERO PORTADA CON BADGE DE COMENTARIOS */}
      <section className="relative min-h-[72vh] flex items-end pb-14 pt-32 overflow-hidden">
        <img
          src={yacht.coverImage}
          alt={yacht.name}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/35" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-amber-400 text-slate-950 shadow-lg">
              <Anchor className="w-3.5 h-3.5" />
              {isEs ? yacht.badgeEs : yacht.badgeEn}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md text-amber-300 border border-white/15">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              5.0 VIP Cabo Yacht Fleet
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-lg">
            {yacht.name}
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-200 max-w-3xl font-medium">
            {isEs ? yacht.subtitleEs : yacht.subtitleEn}
          </p>

          <HeroReviewsBadge lang={lang} />

          {/* QUICK SPECS BAR */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl">
            <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <p className="text-xs uppercase tracking-wider text-slate-400">{isEs ? 'Eslora / Tipo' : 'Length / Builder'}</p>
              <p className="text-base font-black text-white mt-0.5">{yacht.length}</p>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <p className="text-xs uppercase tracking-wider text-slate-400">{isEs ? 'Capacidad Máx.' : 'Max Capacity'}</p>
              <p className="text-base font-black text-white mt-0.5">
                {yacht.maxGuests} {isEs ? 'Pasajeros' : 'Guests'} ({yacht.includedGuests} {isEs ? 'incl.' : 'incl.'})
              </p>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <p className="text-xs uppercase tracking-wider text-slate-400">{isEs ? 'Camarotes / Baños' : 'Cabins / Baths'}</p>
              <p className="text-base font-black text-white mt-0.5">{yacht.cabins}</p>
            </div>
            <div className="bg-amber-400/15 backdrop-blur-md border border-amber-400/40 rounded-2xl p-4">
              <p className="text-xs uppercase tracking-wider text-amber-300">{isEs ? 'Tarifa Desde' : 'Starting At'}</p>
              <p className="text-xl font-black text-amber-400 mt-0.5">${yacht.startingPrice.toLocaleString()} USD</p>
              <p className="text-[11px] text-slate-300">{isEs ? yacht.startingLabelEs : yacht.startingLabelEn}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FLEET QUICK SWITCHER BAR */}
      <div className="bg-slate-900/90 border-y border-white/10 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 shrink-0 mr-2">
            {isEs ? 'Nuestra Flota:' : 'Our Fleet:'}
          </span>
          {YACHT_ORDER.map(slug => {
            const item = YACHTS_CATALOG[slug];
            const active = slug === yacht.slug;
            return (
              <Link
                key={slug}
                to={`/yachts/${slug}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                  active
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* PHOTO GALLERY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {isEs ? `Galería Oficial — ${yacht.name}` : `Official Photo Gallery — ${yacht.name}`}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {isEs ? 'Haz clic en cualquier fotografía para verla en pantalla completa' : 'Click any photo to view full screen'}
            </p>
          </div>
          <button
            onClick={() => setLightboxIndex(0)}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-amber-300 border border-white/15 transition"
          >
            {isEs ? `Ver ${yacht.gallery.length} Fotos` : `View All ${yacht.gallery.length} Photos`}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {yacht.gallery.slice(0, 8).map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-slate-900 ${
                idx === 0 ? 'col-span-2 row-span-2 aspect-[16/11]' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={img.src}
                alt={isEs ? img.titleEs : img.titleEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-xs font-semibold text-white">
                  {isEs ? img.titleEs : img.titleEn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT + LIVE CHARTER CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT COLUMN: DESCRIPTION, PACKAGES & INCLUSIONS */}
        <div className="lg:col-span-7 space-y-10">
          <div className="bg-slate-900/70 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-black text-amber-400">
              {isEs ? `Acerca de ${yacht.name}` : `About ${yacht.name}`}
            </h2>
            {(isEs ? yacht.descriptionEs : yacht.descriptionEn).map((p, i) => (
              <p key={i} className="text-slate-300 leading-relaxed text-base">
                {p}
              </p>
            ))}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-sm">
              <div>
                <span className="text-slate-400 block text-xs">{isEs ? 'Constructor' : 'Builder'}</span>
                <strong className="text-white">{yacht.builder}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">{isEs ? 'Año / Refit' : 'Year / Refit'}</span>
                <strong className="text-white">{yacht.year}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">{isEs ? 'Tripulación' : 'Crew'}</span>
                <strong className="text-white">{yacht.crew}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">{isEs ? 'Pasajeros Incluidos' : 'Guests Included'}</span>
                <strong className="text-white">{yacht.includedGuests} pax (Max {yacht.maxGuests})</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">{isEs ? 'Pasajero Adicional' : 'Extra Guest'}</span>
                <strong className="text-amber-400">
                  {yacht.extraGuestPrice > 0 ? `+$${yacht.extraGuestPrice} USD / pax` : (isEs ? 'Incluido (hasta 12)' : 'Included (up to 12)')}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">{isEs ? 'Hora Extra' : 'Extra Hour'}</span>
                <strong className="text-amber-400">+${yacht.extraHourPrice.toLocaleString()} USD / hr</strong>
              </div>
            </div>
          </div>

          {/* PACKAGES LIST */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white">
              {isEs ? 'Paquetes y Tarifas de Charter Privado' : 'Private Charter Packages & Transparent Rates'}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {yacht.packages.map(pkg => {
                const isSelected = pkg.id === selectedPkg?.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPkgId(pkg.id)}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-amber-400/15 border-amber-400 shadow-lg'
                        : 'bg-slate-900/60 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-lg text-white">
                          {isEs ? pkg.nameEs : pkg.nameEn}
                        </span>
                        {pkg.popular && (
                          <span className="px-2.5 py-0.5 text-[10px] font-black uppercase bg-amber-400 text-slate-950 rounded-full">
                            {isEs ? 'Más Popular' : 'Most Popular'}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-300 mt-1">
                        {isEs ? pkg.noteEs : pkg.noteEn}
                      </p>
                    </div>
                    <div className="sm:text-right shrink-0">
                      <span className="text-2xl font-black text-amber-400">
                        ${pkg.price.toLocaleString()} USD
                      </span>
                      <span className="block text-xs text-slate-400">
                        {pkg.hours} {isEs ? 'Horas · Yate Privado' : 'Hours · Private Charter'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* WHAT'S INCLUDED */}
          <div className="bg-slate-900/70 border border-white/10 rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              {isEs ? '¿Qué Incluye Tu Charter Privado?' : 'What’s Included With Every Charter'}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(isEs ? yacht.includedEs : yacht.includedEn).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE CHARTER & TRANSFER CALCULATOR */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 bg-slate-900 border border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {isEs ? 'Cotizador Instantáneo' : 'Instant Charter Calculator'}
                </span>
                <h3 className="text-xl font-black text-white">{yacht.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">{isEs ? 'Total Estimado' : 'Estimated Total'}</span>
                <span className="text-2xl font-black text-amber-400">${totalEstimated.toLocaleString()} USD</span>
              </div>
            </div>

            {/* 1. PACKAGE SELECTOR */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                1. {isEs ? 'Selecciona Duración / Experiencia' : 'Select Charter Package'}
              </label>
              <select
                value={selectedPkg?.id || ''}
                onChange={e => setSelectedPkgId(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-white/15 px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
              >
                {yacht.packages.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>
                    {(isEs ? pkg.nameEs : pkg.nameEn)} — ${pkg.price.toLocaleString()} USD
                  </option>
                ))}
              </select>
            </div>

            {/* 2. GUESTS & EXTRA HOURS */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  2. {isEs ? `Pasajeros (Máx ${yacht.maxGuests})` : `Guests (Max ${yacht.maxGuests})`}
                </label>
                <div className="flex items-center justify-between bg-slate-950 border border-white/15 rounded-xl px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-white"
                  >
                    -
                  </button>
                  <span className="font-black text-base text-white">{guestCount}</span>
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.min(yacht.maxGuests, guestCount + 1))}
                    className="w-8 h-8 rounded-lg bg-amber-400 hover:bg-amber-300 font-bold text-slate-950"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  3. {isEs ? 'Horas Extra' : 'Extra Hours'} (+${yacht.extraHourPrice}/hr)
                </label>
                <div className="flex items-center justify-between bg-slate-950 border border-white/15 rounded-xl px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setExtraHours(Math.max(0, extraHours - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold text-white"
                  >
                    -
                  </button>
                  <span className="font-black text-base text-white">{extraHours}h</span>
                  <button
                    type="button"
                    onClick={() => setExtraHours(Math.min(6, extraHours + 1))}
                    className="w-8 h-8 rounded-lg bg-amber-400 hover:bg-amber-300 font-bold text-slate-950"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* 3. DATE & TIME */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  {isEs ? 'Fecha Deseada' : 'Preferred Date'}
                </label>
                <input
                  type="date"
                  value={charterDate}
                  onChange={e => setCharterDate(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-white/15 px-3 py-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  {isEs ? 'Hora de Salida' : 'Departure Time'}
                </label>
                <select
                  value={departureTime}
                  onChange={e => setDepartureTime(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-white/15 px-3 py-2.5 text-sm text-white"
                >
                  <option value="09:00 AM">09:00 AM (Morning Snorkel)</option>
                  <option value="10:00 AM">10:00 AM (Day Charter)</option>
                  <option value="01:00 PM">01:00 PM (Afternoon & Sunset)</option>
                  <option value="04:00 PM">04:00 PM (Golden Hour Sunset)</option>
                </select>
              </div>
            </div>

            {/* 4. PRIVATE HOTEL-TO-MARINA ROUND-TRIP TRANSFER */}
            <div className="pt-2 border-t border-white/10">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                <Car className="w-4 h-4" />
                {isEs ? 'Transporte Privado Redondo Hotel ↔ Marina (Opcional)' : 'Add Private Hotel ↔ Marina Transfer (Optional)'}
              </label>
              <select
                value={transportId}
                onChange={e => setTransportId(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-white/15 px-3 py-2.5 text-xs sm:text-sm text-white"
              >
                {GROUND_TRANSPORT_OPTIONS.map(opt => (
                  <option key={opt.id} value={opt.id}>
                    {isEs ? opt.nameEs : opt.nameEn} {opt.price > 0 ? `(+$${opt.price} USD)` : ''}
                  </option>
                ))}
              </select>
              {transportId !== 'none' && (
                <input
                  type="text"
                  placeholder={isEs ? 'Nombre de tu Hotel o Villa en Los Cabos...' : 'Your Hotel or Villa Name in Los Cabos...'}
                  value={hotelName}
                  onChange={e => setHotelName(e.target.value)}
                  className="mt-2 w-full rounded-xl bg-slate-950 border border-white/15 px-3 py-2 text-sm text-white placeholder-slate-500"
                />
              )}
            </div>

            {/* PRICE BREAKDOWN */}
            <div className="bg-slate-950/90 rounded-2xl p-4 space-y-2 text-sm border border-white/10">
              <div className="flex justify-between text-slate-300">
                <span>{isEs ? selectedPkg?.nameEs : selectedPkg?.nameEn}</span>
                <span className="font-bold text-white">${selectedPkg?.price.toLocaleString()} USD</span>
              </div>
              {extraGuestsCount > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>{extraGuestsCount} {isEs ? 'Pasajeros adicionales' : 'Extra guests'}</span>
                  <span className="font-bold text-amber-400">+${extraGuestsTotal.toLocaleString()} USD</span>
                </div>
              )}
              {extraHours > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>{extraHours} {isEs ? 'Hora(s) extra' : 'Extra hour(s)'}</span>
                  <span className="font-bold text-amber-400">+${extraHoursTotal.toLocaleString()} USD</span>
                </div>
              )}
              {transportTotal > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>{isEs ? 'Traslado Privado Redondo a Marina' : 'Private Round-Trip Marina Transfer'}</span>
                  <span className="font-bold text-emerald-400">+${transportTotal} USD</span>
                </div>
              )}
              <div className="border-t border-white/10 pt-2 flex justify-between items-center text-base font-black">
                <span className="text-white">{isEs ? 'Total Estimado' : 'Estimated Total'}</span>
                <span className="text-amber-400 text-xl">${totalEstimated.toLocaleString()} USD</span>
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => { setSubmitSuccess(false); setIsModalOpen(true); }}
                className="w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black uppercase tracking-wider text-sm shadow-lg transition flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                {isEs ? 'Solicitar Disponibilidad y Reservar' : 'Check Availability & Request Charter'}
              </button>

              <a
                href={`https://wa.me/526121943286?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {isEs ? 'Cotizar por WhatsApp Concierge' : 'Instant Quote via WhatsApp'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SIMILAR BOATS / BARCOS SIMILARES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">
              {isEs ? 'Explora Más Opciones en Cabo San Lucas' : 'Explore More Vessels in Cabo San Lucas'}
            </span>
            <h2 className="text-3xl font-black text-white mt-1">
              {isEs ? 'Barcos y Yates Similares en Nuestra Flota' : 'Similar Yachts & Boats in Our Cabo Fleet'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarYachts.map(item => (
            <Link
              key={item.slug}
              to={`/yachts/${item.slug}`}
              className="group bg-slate-900 border border-white/10 rounded-3xl overflow-hidden hover:border-amber-400/60 transition-all flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
                <img
                  src={item.coverImage}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-slate-950/80 text-amber-400 border border-amber-400/30">
                  {item.length}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {isEs ? item.subtitleEs : item.subtitleEn}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">
                      {isEs ? 'Desde' : 'Starting at'}
                    </span>
                    <span className="text-base font-black text-amber-400">
                      ${item.startingPrice.toLocaleString()} USD
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                    {isEs ? 'Ver Yate' : 'View Yacht'} <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="w-7 h-7" />
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex - 1 + yacht.gallery.length) % yacht.gallery.length);
            }}
            className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img
              src={yacht.gallery[lightboxIndex]?.src}
              alt={yacht.name}
              className="max-h-[78vh] w-auto object-contain rounded-xl"
            />
            <p className="mt-3 text-sm text-slate-300 font-medium">
              {isEs ? yacht.gallery[lightboxIndex]?.titleEs : yacht.gallery[lightboxIndex]?.titleEn} ({lightboxIndex + 1} / {yacht.gallery.length})
            </p>
          </div>
          <button
            onClick={e => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % yacht.gallery.length);
            }}
            className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>
      )}

      {/* INQUIRY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-white/15 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative text-white shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {submitSuccess ? (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-black">
                  {isEs ? '¡Solicitud Recibida!' : 'Charter Inquiry Received!'}
                </h3>
                <p className="text-slate-300 text-sm">
                  {isEs
                    ? `Nuestro concierge náutico de Ballard Tours revisará la disponibilidad de ${yacht.name} y te contactará en breve.`
                    : `Our Ballard Tours Yacht Concierge has received your request for ${yacht.name} and will confirm availability shortly.`}
                </p>
                <a
                  href={`https://wa.me/526121943286?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  {isEs ? 'Confirmar ahora por WhatsApp' : 'Fast-Track via WhatsApp'}
                </a>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {yacht.name}
                  </span>
                  <h3 className="text-2xl font-black mt-0.5">
                    {isEs ? 'Reservar / Consultar Disponibilidad' : 'Request Charter Availability'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {(isEs ? selectedPkg?.nameEs : selectedPkg?.nameEn)} · {guestCount} {isEs ? 'pasajeros' : 'guests'} · Total Est: ${totalEstimated.toLocaleString()} USD
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                    {isEs ? 'Nombre Completo *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-white/15 px-3.5 py-2.5 text-sm text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-white/15 px-3.5 py-2.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                      {isEs ? 'Teléfono / WhatsApp *' : 'Phone / WhatsApp *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-white/15 px-3.5 py-2.5 text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                    {isEs ? 'Preferencias de Menú, Bebidas o Celebración' : 'Menu Preferences, Drinks or Celebration Notes'}
                  </label>
                  <textarea
                    rows={3}
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                    placeholder={isEs ? 'Cumpleaños, alergias alimentarias, bebidas favoritas...' : 'Birthday celebration, dietary notes, favorite spirits...'}
                    className="w-full rounded-xl bg-slate-950 border border-white/15 px-3.5 py-2 text-sm text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black uppercase tracking-wider text-sm transition"
                >
                  {isSubmitting
                    ? (isEs ? 'Enviando...' : 'Sending Inquiry...')
                    : (isEs ? 'Enviar Solicitud de Charter' : 'Send Charter Inquiry')}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
