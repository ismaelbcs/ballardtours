import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  ChevronRight, 
  MessageCircle, 
  Phone, 
  Mail,
  Calendar,
  Baby,
  Banknote,
  Users,
  Star,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { FAQSection } from './FAQSection';

export default function ToursPage({ lang = 'es' }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    es: {
      seoTitle: "Tours y Excursiones en Los Cabos | Ballard Tours",
      seoDesc: "Descubre los mejores tours en Cabo San Lucas. Reserva paseos en camello, ATVs, bote transparente al arco, snorkel, nado con tiburón ballena y más.",
      title: "Explora Los Cabos",
      subtitle: "Nuestros Mejores Tours y Actividades",
      introTitle: "La Aventura Te Espera en Baja California Sur",
      introText1: "Los Cabos es mucho más que hermosas playas y hoteles de lujo; es un paraíso de aventuras inigualables. En Ballard Tours, hemos seleccionado cuidadosamente las mejores experiencias y excursiones para que aproveches al máximo tu visita.",
      introText2: "Descubre la magia de Baja California Sur con nuestro catálogo completo. Siente la adrenalina en nuestro Safari en Camellos o la Aventura en ATVs. Explora el océano en el Bote Transparente al Arco, el Snorkel VIP con Scooters, o el Tour de Snorkel en la Bahía. Para experiencias únicas, embárcate en el Nado con Tiburón Ballena o visita la Isla Espíritu Santo. Si prefieres relajarte al atardecer, disfruta del Crucero Sunset con Fajitas, el Crucero Sunset Sessions, o diviértete en el Show Pirata Yo Ho Ho. Y para una inmersión cultural, no te pierdas el San José Art Walk.",
      priceFrom: "Precio desde",
      contactTitle: "Atención y Reservas Rápidas",
      contactSubtitle: "¿Tienes dudas sobre un tour o prefieres reservar por teléfono? Nuestro equipo está listo para ayudarte en tiempo real.",
      
      // Textos de Flota
      fleetTitle: "Nuestra Flota de Transporte",
      fleetSubtitle: "Completa tu viaje con nuestro servicio de traslado",
      vanTitle: "Transporte en Van para Grupos (Hasta 10 Pasajeros)",
      vanText1: "Viajar en grupo a Los Cabos nunca ha sido tan cómodo y eficiente. Nuestras espaciosas Sprinter y Hiace Vans están diseñadas para transportar hasta 10 pasajeros con todo su equipaje sin sacrificar comodidad.",
      vanText2: "El principal beneficio de elegir una Van es que todo tu grupo viaja junto. Además, dividir el costo de una Van privada resulta mucho más económico. Equipadas con aire acondicionado de doble zona y asientos ergonómicos.",
      vipTitle: "Servicios Privados VIP y Aeropuertos Privados (FBO)",
      vipText1: "Para aquellos que buscan la máxima exclusividad, ofrecemos nuestro Servicio Privado VIP en SUVs de lujo como Chevrolet Suburban y Cadillac Escalade. Un viaje sumamente silencioso y elegante.",
      vipText2: "Nos especializamos en recogidas directas en las pistas de Aeropuertos Privados (MMSL y SJD FBO). Nuestros choferes de etiqueta te esperarán a pie de pista con bebidas de cortesía y toallas refrescantes.",
      airbnbTitle: "Traslados a AirBnB, Villas Privadas y Residencias",
      airbnbText1: "Somos expertos en la logística hacia AirBnBs y Villas Privadas. Nuestros choferes conocen a la perfección las entradas y protocolos de seguridad de comunidades cerradas como Pedregal, Palmilla, y Diamante.",
      airbnbText2: "Al elegir este servicio, puedes solicitar una parada de compras (Grocery Stop) en Costco o Walmart. Llegarás a tu Villa con la despensa llena y bebidas frías, listo para disfrutar tu primer día.",
      hotelsTitle: "Cobertura Total a Todos los Hoteles de Los Cabos",
      hotelsText1: "Proveemos traslados directos y seguros a los hoteles más prestigiosos: Nobu Hotel, Hard Rock Hotel, Diamante, Pueblo Bonito, Waldorf Astoria, Grand Velas, JW Marriott, y muchos más.",
      hotelsText2: "El mayor beneficio es que tomamos la ruta de cuota (Toll Road) pagada por nosotros, para garantizar el viaje más rápido posible. Vas directo del aeropuerto SJD al lobby de tu hotel.",

      benefitsTitle: "Beneficios de Reservar con Nosotros",
      faqTitle: "Preguntas Frecuentes",
      faqSubtitle: "Todo lo que necesitas saber sobre nuestra logística y servicios.",
      paymentTitle: "Reserva en Línea Fácil y Opciones de Pago Flexibles",
      paymentText: "Sitio web de reservación fácil en tres clics en Ballard Tours. Seleccione su destino, elija su transporte y haga clic en enviar. Puede pagar con tarjeta de crédito, optar por el pago a la llegada o usar PayPal."
    },
    en: {
      seoTitle: "Best Cabo Tours & Excursions | Ballard Tours",
      seoDesc: "Discover the best tours in Cabo San Lucas. Book camel rides, ATVs, clear boat to the arch, snorkeling, whale shark swims, and more.",
      title: "Explore Los Cabos",
      subtitle: "Our Top Rated Tours & Activities",
      introTitle: "Adventure Awaits in Baja California Sur",
      introText1: "Los Cabos is much more than beautiful beaches and luxury resorts; it is a paradise of unparalleled adventures. At Ballard Tours, we have carefully selected the absolute best experiences and excursions so you can make the most of your visit.",
      introText2: "Discover the magic of Baja California Sur with our complete catalog. Feel the adrenaline on our Camel Safari or the ATV Adventure. Explore the ocean on the Clear Boat to the Arch, the VIP Snorkel with Scooters, or the Bay Snorkel Tour. For unique experiences, embark on the Whale Shark Swim or visit Espíritu Santo Island. If you prefer to relax at sunset, enjoy the Sunset Fajita Cruise, the Sunset Sessions Cruise, or have fun on the Yo Ho Ho Pirate Show. And for a cultural immersion, don't miss the San José Art Walk.",
      priceFrom: "Price from",
      contactTitle: "Quick Support & Reservations",
      contactSubtitle: "Have questions about a tour or prefer to book over the phone? Our team is ready to help you in real-time.",
      
      // Fleet Texts
      fleetTitle: "Our Transportation Fleet",
      fleetSubtitle: "Complete your trip with our transfer service",
      vanTitle: "Group Van Transportation (Up to 10 Passengers)",
      vanText1: "Traveling as a group to Los Cabos has never been more comfortable and efficient. Our spacious Sprinter and Hiace Vans are designed to transport up to 10 passengers with all their luggage without sacrificing comfort.",
      vanText2: "The main benefit of choosing a Van is that your entire group travels together. Moreover, splitting the cost of a private Van is much more cost-effective. Equipped with dual-zone AC and ergonomic seating.",
      vipTitle: "VIP Private Services & Private Airports (FBO)",
      vipText1: "For those seeking maximum exclusivity, we offer our VIP Private Service in luxury SUVs such as the Chevrolet Suburban and Cadillac Escalade. An incredibly quiet and elegant ride.",
      vipText2: "We specialize in tarmac-side pickups at Private Airports (MMSL and SJD FBO). Our sharply dressed chauffeurs will await you on the tarmac with complimentary drinks and refreshing towels.",
      airbnbTitle: "Transfers to AirBnB, Private Villas & Residences",
      airbnbText1: "We are experts in logistics for AirBnBs and Private Villas. Our drivers perfectly know the entrances and strict security protocols of exclusive gated communities like Pedregal, Palmilla, and Diamante.",
      airbnbText2: "By choosing this service, you get the huge benefit of requesting a Grocery Stop at Costco or Walmart. You arrive at your Villa with a fully stocked fridge and cold drinks, ready to enjoy.",
      hotelsTitle: "Full Coverage to All Los Cabos Hotels & Resorts",
      hotelsText1: "We provide direct and safe transfers to the most prestigious hotels: Nobu Hotel, Hard Rock Hotel, Diamante, Pueblo Bonito, Waldorf Astoria, Grand Velas, JW Marriott, and many more.",
      hotelsText2: "The greatest benefit is that we always take the Toll Road—paid by us—to guarantee the fastest trip. You go straight from the SJD airport to your hotel lobby, maximizing your vacation time.",

      benefitsTitle: "Benefits of Booking With Us",
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "Everything you need to know about our logistics and services.",
      paymentTitle: "Easy Online Booking & Flexible Payment Options",
      paymentText: "Three-click easy reservation website at Ballard Tours. Select your destination, choose your shuttle type, and click submit. You can pay with a credit card, opt for payment on arrival, or use PayPal."
    }
  };

  const t = content[lang] || content.en;

  // Catálogo completo y exacto de Tours proporcionado
  const toursList = [
    {
      id: 'camellos',
      slug: 'camel-safari-tour-cabo-san-lucas',
      image: 'camello4.webp',
      duration: { es: '2 horas', en: '2 hours' },
      title: { es: 'Safari en Camellos', en: 'Camel Safari' },
      desc: { 
        es: 'Descubre un paseo único en camellos en nuestro Centro de Conservación de Fauna Silvestre. Tu guía te llevará en un safari por el desierto...', 
        en: 'Discover a unique camel ride at our Wildlife Conservation Center. Your guide will take you on a desert safari to our sanctuary...' 
      },
      price: 190
    },
    {
      id: 'atv',
      slug: 'atv-off-road-adventure-cabo',
      image: '2.webp',
      duration: { es: '3 horas', en: '3 hours' },
      title: { es: 'Aventura en ATVs', en: 'ATV Adventure' },
      desc: { 
        es: 'Siente la adrenalina pura recorriendo cañones, arroyos secos y hermosas playas en vehículos todo terreno.', 
        en: 'Feel pure adrenaline exploring canyons, dry streams, and beautiful beaches on all-terrain vehicles.' 
      },
      price: 190
    },
    {
      id: 'arco',
      slug: 'clear-boat-tour-cabo-arch',
      image: 'B7.webp',
      duration: { es: '45 minutos', en: '45 minutes' },
      title: { es: 'Bote Transparente al Arco', en: 'Clear Boat al Arco' },
      desc: { 
        es: 'Navega hacia el icónico Arco, la Playa del Amor y la colonia de leones marinos en nuestra famosa embarcación transparente.', 
        en: 'Sail to the iconic Arch, Lover\'s Beach, and the sea lion colony in our famous clear boat.' 
      },
      price: 100
    },
    {
      id: 'snorkeling-adventure-cabo',
      slug: 'vip-snorkeling-sea-scooter-cabo-san-lucas',
      image: 'snorkeling-trip-cabo-san-lucas.webp', // Quitamos el slash inicial para el helper de abajo
      duration: { es: '3 horas', en: '3 hours' },
      title: { es: 'Snorkel VIP con Scooters Submarinos', en: 'VIP Snorkeling with Sea Scooters' },
      desc: { 
        es: '¡Haz snorkel en la costa de Baja en Cabo como un profesional! Deslízate junto a tortugas marinas, peces cirujanos y mantarrayas.', 
        en: 'Snorkel the Baja coast like a pro! Glide alongside sea turtles, surgeonfish, and manta rays in Chileno Bay.' 
      },
      price: 180
    },
    {
      id: 'artwalk',
      slug: 'san-jose-del-cabo-art-walk-tour',
      image: 'downtown-san-jose-del-cabo-art-walk-los-cabos.webp',
      duration: { es: '3 horas', en: '3 hours' },
      title: { es: 'San José Art Walk', en: 'San José Art Walk' },
      desc: { 
        es: 'Sumérgete en la magia y el encanto de las calles empedradas de San José del Cabo admirando impresionantes galerías de arte.', 
        en: 'Immerse yourself in the magic and charm of the cobblestone streets of San José del Cabo admiring stunning art galleries.' 
      },
      price: 180
    },
    {
      id: 'tiburon_ballena',
      slug: 'swim-with-whale-sharks-la-paz-cabo',
      image: 'swimming-whale-shark-la-paz.webp',
      duration: { es: '2.5 horas', en: '2.5 hours' },
      title: { es: 'Nado con Tiburón Ballena', en: 'Whale Shark Swim' },
      desc: { 
        es: 'Vive una de las experiencias más conmovedoras de la naturaleza nadando junto al gentil gigante del océano en La Paz.', 
        en: 'Live one of nature\'s most moving experiences swimming alongside the gentle giant of the ocean in La Paz.' 
      },
      price: 330
    },
    {
      id: 'isla_espiritu_santo',
      slug: 'espiritu-santo-island-tour-from-la-paz',
      image: 'espiritu-santo-island-tour-la-paz-baja.webp',
      duration: { es: '5 horas', en: '5 hours' },
      title: { es: 'Isla Espíritu Santo', en: 'Espíritu Santo Island' },
      desc: { 
        es: 'Descubre la joya del Mar de Cortés. Disfrutarás de paisajes prístinos, aguas turquesa y nado con lobos marinos.', 
        en: 'Discover the jewel of the Sea of Cortez. Enjoy pristine landscapes, turquoise waters, and swimming with sea lions.' 
      },
      price: 330
    },
    {
      id: 'sunset_fajita_cruise',
      slug: 'sunset-fajita-cruise-cabo',
      image: 'Sunset-Fajitas-1.webp',
      duration: { es: '2 Horas', en: '2 Hours' },
      title: { es: 'Crucero Sunset con Fajitas', en: 'Sunset Fajita Cruise' },
      desc: { 
        es: 'Zarpa a bordo de Cabo Escape para una animada experiencia al atardecer. Disfruta de fajitas recién hechas y barra libre.', 
        en: 'Set sail aboard Cabo Escape for a lively sunset experience. Enjoy freshly prepared fajitas and a bottomless open bar.' 
      },
      price: 150
    },
    {
      id: 'sunset_sessions',
      slug: 'sunset-sessions-cabo-cruise',
      image: 'Sunset-Sessions-5.webp',
      duration: { es: '2 Horas', en: '2 Hours' },
      title: { es: 'Crucero Sunset Sessions', en: 'Sunset Sessions Cruise' },
      desc: { 
        es: 'Saborea un buffet mexicano, cócteles internacionales y música en vivo mientras el cielo se transforma sobre el Fin de la Tierra.', 
        en: 'Savor a Mexican buffet, international cocktails, and live music as the sky transforms over Land’s End.' 
      },
      price: 150
    },
    {
      id: 'pirate_show_cruise',
      slug: 'pirate-ship-sunset-tour-cabo',
      image: 'Yo-Ho-Ho-Sunset-Dinner-&-Pirate-Show-Cruise-4.webp',
      duration: { es: '2 Horas', en: '2 Hours' },
      title: { es: 'Crucero y Show Pirata', en: 'Yo Ho Ho Pirate Show' },
      desc: { 
        es: '¡Zarpa en el Buccaneer Queen! Disfruta de una cena BBQ antes de que el barco se transforme en un espectacular Show Pirata.', 
        en: 'Set sail on the Buccaneer Queen! Enjoy a BBQ dinner before the ship transforms into an immersive Pirate Show.' 
      },
      price: 150
    },
    {
      id: 'snorkeling_cabo_bay',
      slug: 'cabo-san-lucas-snorkel-tour',
      image: 'Cabo-San-Lucas-Snorkel-Tour-2.webp',
      duration: { es: '3.5 Horas', en: '3.5 Hours' },
      title: { es: 'Tour de Snorkel en Cabo', en: 'Cabo Snorkel Tour' },
      desc: { 
        es: 'Disfruta de snorkel guiado en aguas cristalinas, seguido de tacos ilimitados de fajitas y barra libre fría.', 
        en: 'Enjoy guided snorkeling in crystal-clear waters, followed by unlimited fajitas and an ice-cold open bar.' 
      },
      price: 140
    }
  ];

  // Helper para procesar las imágenes sin dobles barras (ej. si traen un / extra)
  const getImageUrl = (img) => {
    const cleanImg = img.startsWith('/') ? img.substring(1) : img;
    return `${process.env.PUBLIC_URL}/${cleanImg}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <Helmet>
        <title>{t.seoTitle}</title>
        <meta name="description" content={t.seoDesc} />
        <link rel="canonical" href="https://www.ballardtours.com/tours" />
      </Helmet>

      {/* HERO SECTION */}
      <div className="bg-blue-900 text-white pt-32 pb-20 px-4 text-center rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/1.webp')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-80"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block bg-amber-500 text-gray-900 text-xs font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest shadow-md">
            {t.subtitle}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-md">
            {t.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 space-y-16">
        
        {/* TEXTO SEO BILINGÜE MENCIONANDO TODOS LOS TOURS */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-12 text-center max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">{t.introTitle}</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            {t.introText1}
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            {t.introText2}
          </p>
        </div>

        {/* =========================================
            CATÁLOGO DE TOURS (Diseño de Tarjetas estilo Airbnb)
            ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toursList.map((tour) => (
            <Link 
              key={tour.id} 
              to={`/tours/${tour.slug}`} 
              onClick={() => window.scrollTo(0, 0)}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
            >
              {/* Contenedor de Imagen y Badge de Tiempo */}
              <div className="relative h-60 overflow-hidden bg-gray-200">
                <img 
                  src={getImageUrl(tour.image)} 
                  alt={tour.title[lang]} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute bottom-4 left-4 bg-white text-blue-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <Clock size={14} /> {tour.duration[lang]}
                </div>
              </div>
              
              {/* Contenido de la Tarjeta */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {tour.title[lang]}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-grow leading-relaxed">
                  {tour.desc[lang]}
                </p>
                
                {/* Footer de Tarjeta: Precio y Flecha */}
                <div className="flex justify-between items-center mt-auto">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">{t.priceFrom}</p>
                    <p className="text-2xl font-black text-blue-900 leading-none">
                      ${tour.price} <span className="text-xs font-bold text-gray-500">USD</span>
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-colors duration-300">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* =========================================
            BOTONES DE CONTACTO (Diseño Minimalista)
            ========================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {/* WhatsApp Reservations */}
          <a href="https://wa.me/526241393497" target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-100 rounded-3xl p-5 flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
              <MessageCircle size={28} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">WhatsApp (Reservations)</h4>
              <p className="text-gray-500 text-xs mt-0.5">+52 (624) 139-3497</p>
              <p className="text-green-600 text-xs font-bold mt-1.5 group-hover:translate-x-1 transition-transform">Click to chat →</p>
            </div>
          </a>

          {/* WhatsApp Support */}
          <a href="https://wa.me/526121943286" target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-100 rounded-3xl p-5 flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
              <MessageCircle size={28} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">WhatsApp (Support)</h4>
              <p className="text-gray-500 text-xs mt-0.5">+52 (612) 194-3286</p>
              <p className="text-green-600 text-xs font-bold mt-1.5 group-hover:translate-x-1 transition-transform">Click to chat →</p>
            </div>
          </a>

          {/* Call Us */}
          <a href="tel:+526241393497" className="bg-white border border-gray-100 rounded-3xl p-5 flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <Phone size={28} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Call Us Directly</h4>
              <p className="text-gray-500 text-xs mt-0.5">+52 (624) 139-3497</p>
              <p className="text-blue-600 text-xs font-bold mt-1.5 group-hover:translate-x-1 transition-transform">Click to call →</p>
            </div>
          </a>

          {/* Email Us */}
          <a href="mailto:reservationballard@gmail.com" className="bg-white border border-gray-100 rounded-3xl p-5 flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 bg-gray-50 text-gray-600 rounded-2xl flex items-center justify-center shrink-0">
              <Mail size={28} />
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-gray-900 text-sm">Email Us</h4>
              <p className="text-gray-500 text-xs mt-0.5 truncate">reservationballard@gmail.com</p>
              <p className="text-gray-600 text-xs font-bold mt-1.5 group-hover:translate-x-1 transition-transform">Click to email →</p>
            </div>
          </a>
        </div>

        {/* =========================================
            SECCIÓN DE FLOTAS (Integrada al estilo visual)
            ========================================= */}
        <div className="pt-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">{t.fleetTitle}</h2>
            <p className="text-gray-600">{t.fleetSubtitle}</p>
          </div>
          
          <div className="space-y-12">
            {/* 1. VAN */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row items-center hover:shadow-md transition-shadow">
              <div className="w-full lg:w-1/2 h-64 lg:h-[350px]">
                <img src={`${process.env.PUBLIC_URL}/hiace-airport-los-cabos-ballard.webp`} alt="Van Transportation up to 10 pax" className="w-full h-full object-cover" />
              </div>
              <div className="w-full lg:w-1/2 p-8 md:p-12">
                <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-6"><Users size={24} /></div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{t.vanTitle}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{t.vanText1}</p>
                <p className="text-gray-600 leading-relaxed">{t.vanText2}</p>
              </div>
            </div>

            {/* 2. PRIVATE VIP / FBO */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row-reverse items-center hover:shadow-md transition-shadow">
              <div className="w-full lg:w-1/2 h-64 lg:h-[350px]">
                <img src={`${process.env.PUBLIC_URL}/suburban-airport-los-cabos-ballard.webp`} alt="Private VIP FBO Transportation" className="w-full h-full object-cover" />
              </div>
              <div className="w-full lg:w-1/2 p-8 md:p-12">
                <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-6"><Star size={24} /></div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{t.vipTitle}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{t.vipText1}</p>
                <p className="text-gray-600 leading-relaxed">{t.vipText2}</p>
              </div>
            </div>

            {/* 3. AIRBNB & VILLAS */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row items-center hover:shadow-md transition-shadow">
              <div className="w-full lg:w-1/2 h-64 lg:h-[350px]">
                <img src={`${process.env.PUBLIC_URL}/suburban-airport-los-cabos-ballard-sjd.webp`} alt="AirBnB and Private Villas Transportation" className="w-full h-full object-cover" />
              </div>
              <div className="w-full lg:w-1/2 p-8 md:p-12">
                <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-6"><MapPin size={24} /></div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{t.airbnbTitle}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{t.airbnbText1}</p>
                <p className="text-gray-600 leading-relaxed">{t.airbnbText2}</p>
              </div>
            </div>

            {/* 4. ALL HOTELS */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row-reverse items-center hover:shadow-md transition-shadow">
              <div className="w-full lg:w-1/2 h-64 lg:h-[350px]">
                <img src={`${process.env.PUBLIC_URL}/private-transportation-nobu-hotel-los-cabos.webp`} alt="All Hotels Los Cabos Transportation" className="w-full h-full object-cover" />
              </div>
              <div className="w-full lg:w-1/2 p-8 md:p-12">
                <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-6"><ShieldCheck size={24} /></div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{t.hotelsTitle}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{t.hotelsText1}</p>
                <p className="text-gray-600 leading-relaxed">{t.hotelsText2}</p>
              </div>
            </div>
            
            <div className="text-center pt-4">
              <Link to="/flotas" onClick={() => window.scrollTo(0, 0)} className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all">
                {lang === 'es' ? 'Ver Detalles de la Flota' : 'View Full Fleet Details'}
              </Link>
            </div>
          </div>
        </div>

        {/* =========================================
            SECCIONES FINALES (BENEFICIOS, FAQ, PAGOS) 
            ========================================= */}

        {/* 1. BENEFICIOS */}
        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100 mt-16">
          <div className="space-y-8 md:space-y-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-blue-50 rounded-full flex items-center justify-center shadow-inner border border-blue-100"><Clock size={32} className="text-blue-900" /></div>
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-2">{lang === 'es' ? 'Soporte en Línea 24/7' : '24 / 7 Online Support'}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{lang === 'es' ? 'Nos esforzamos por responder lo más rápido posible. Contáctanos por WhatsApp al +52 624 139 3497 en cualquier momento.' : 'We strive to respond as quickly as possible. Reach out via WhatsApp at +52 624 139 3497 anytime for immediate assistance.'}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-blue-50 rounded-full flex items-center justify-center shadow-inner border border-blue-100"><Calendar size={32} className="text-blue-900" /></div>
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-2">{lang === 'es' ? 'Asistencia de Itinerario Personalizada' : 'Personalized Itinerary Assistance'}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{lang === 'es' ? 'Si necesitas ajustar un horario o hacer una cancelación, nuestro equipo local te asistirá de inmediato.' : 'We have personalized assistance because sometimes you need to move a schedule or make a cancellation, our team will assist you.'}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-blue-50 rounded-full flex items-center justify-center shadow-inner border border-blue-100"><Baby size={32} className="text-blue-900" /></div>
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-2">{lang === 'es' ? 'Sillas de Seguridad Disponibles' : 'Child Safety Seats Available'}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{lang === 'es' ? 'La seguridad de tu familia es nuestra prioridad. Proveemos sillas para bebés y asientos elevados sin costo adicional al reservar.' : 'Family safety is our priority. We provide infant car seats and booster seats completely free of charge upon request.'}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-blue-50 rounded-full flex items-center justify-center shadow-inner border border-blue-100"><Banknote size={32} className="text-blue-900" /></div>
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-2">{lang === 'es' ? 'Tarifas Accesibles y Transparentes' : 'Affordable Rates on Airport Transfers'}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{lang === 'es' ? 'Ofrecemos tarifas fijas y claras. Reserva con confianza sin preocuparte de cargos ocultos de última hora.' : 'With our efficient logistics, we offer transparent flat-rate pricing without any unexpected fees or hidden charges.'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. FAQ */}
        <div className="text-center mt-16 mb-6">
          <h2 className="text-3xl font-black text-gray-900">{t.faqTitle}</h2>
          <p className="text-gray-600">{t.faqSubtitle}</p>
        </div>
        <FAQSection lang={lang} />

        {/* 3. MÉTODOS DE PAGO */}
        <div className="w-full flex flex-col items-center pt-16 pb-8 px-4 text-center">
          <img src={`${process.env.PUBLIC_URL}/pago-tarjetas.png`} alt="Métodos de Pago" className="h-10 md:h-16 object-contain opacity-80 hover:opacity-100 transition-opacity mb-6" />
          <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-4">
            {t.paymentTitle}
          </h3>
          <p className="text-base text-gray-500 leading-relaxed max-w-4xl mx-auto">
            {t.paymentText}
          </p>
        </div>

      </div>
    </div>
  );
}