import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ShieldCheck, 
  MapPin, 
  Star,
  Clock,
  Calendar,
  Baby,
  Banknote,
  CheckCircle,
  Compass
} from 'lucide-react';
import { FAQSection } from './FAQSection';

export default function Fleet({ lang = 'es' }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    es: {
      seoTitle: "Nuestra Flota | Transporte Privado y VIP en Los Cabos",
      seoDesc: "Conoce nuestra flota de Vans y SUVs de lujo para transporte en Los Cabos. Servicio VIP a hoteles, AirBnBs, aeropuertos privados y más.",
      title: "Nuestra Flota y Servicios",
      subtitle: "Vehículos de Lujo para cada Necesidad",
      
      // VAN
      vanTitle: "Transporte en Van para Grupos (Hasta 10 Pasajeros)",
      vanText1: "Viajar en grupo a Los Cabos nunca ha sido tan cómodo y eficiente. Nuestras espaciosas Sprinter y Hiace Vans están diseñadas para transportar hasta 10 pasajeros con todo su equipaje sin sacrificar comodidad.",
      vanText2: "El principal beneficio de elegir una Van es que todo tu grupo familiar, amigos o equipo corporativo viaja junto, asegurando que nadie se pierda. Además, dividir el costo de una Van privada resulta mucho más económico que tomar múltiples taxis en el aeropuerto de SJD. Equipadas con aire acondicionado de doble zona y asientos ergonómicos, nuestras Vans garantizan un inicio de vacaciones refrescante.",
      vanKeywords: "Keywords: transporte para grupos Los Cabos, Van aeropuerto SJD, shuttle privado 10 personas Cabo, transporte familiar Los Cabos, Sprinter van rental Cabo.",
      
      // VIP / FBO
      vipTitle: "Servicios Privados VIP y Aeropuertos Privados (FBO)",
      vipText1: "Para aquellos que buscan la máxima exclusividad, ofrecemos nuestro Servicio Privado VIP en SUVs de lujo como Chevrolet Suburban y Cadillac Escalade. Diseñadas para ejecutivos y viajeros premium, estas unidades ofrecen un viaje sumamente silencioso y elegante.",
      vipText2: "Nos especializamos en recogidas directas en las pistas de Aeropuertos Privados (FBO) como el Aeropuerto Internacional de Cabo San Lucas (MMSL) y el SJD FBO. Nuestros choferes de etiqueta te esperarán pie de pista con bebidas de cortesía y toallas refrescantes, garantizando máxima discreción, privacidad y un tránsito inmediato hacia tu resort sin esperas en aduanas comerciales.",
      vipKeywords: "Keywords: transporte VIP Los Cabos, SJD FBO transfer, chofer privado Cabo, luxury SUV Cabo airport, Cabo San Lucas MMSL transport, executive transfer Baja.",

      // AIRBNB / VILLAS
      airbnbTitle: "Traslados a AirBnB, Villas Privadas y Residencias",
      airbnbText1: "El turismo de alquiler vacacional está en auge, y nosotros somos expertos en la logística hacia AirBnBs y Villas Privadas. A diferencia de los taxis regulares que a menudo se pierden, nuestros choferes conocen a la perfección las entradas y protocolos de seguridad de las comunidades cerradas más exclusivas como Pedregal, Palmilla, Querencia y Diamante.",
      airbnbText2: "Al elegir este servicio, obtienes el gran beneficio de poder solicitar una parada de compras (Grocery Stop) en Costco, Walmart o Fresko. Así, llegarás a tu Villa o AirBnB con la despensa llena, bebidas frías y todo listo para disfrutar sin tener que salir a buscar provisiones en tu primer día de vacaciones. Te llevamos exactamente puerta a puerta mediante rastreo GPS preciso.",
      airbnbKeywords: "Keywords: transporte a AirBnB Los Cabos, Cabo villa transfer, transporte a Pedregal, grocery stop Cabo airport, Los Cabos vacation rental transport, transfer to Palmilla villas.",

      // ALL HOTELS
      hotelsTitle: "Cobertura Total a Todos los Hoteles de Los Cabos",
      hotelsText1: "No importa dónde te hospedes, nuestro servicio de transporte privado llega a todos los rincones del destino. Proveemos traslados directos y seguros a los hoteles más prestigiosos, incluyendo Nobu Hotel, Hard Rock Hotel, Diamante, Pueblo Bonito (Sunset Beach, Pacifica), Waldorf Astoria, Grand Velas, Chileno Bay, Montage, JW Marriott, Secrets Puerto Los Cabos, y Hyatt Ziva, entre muchos otros.",
      hotelsText2: "El mayor beneficio de nuestro servicio de hotel es que tomamos la ruta de cuota (Toll Road) siempre que sea posible, pagada por nosotros, para garantizar el viaje más rápido posible. Olvídate de los shuttles compartidos que hacen paradas en 5 hoteles antes que el tuyo. Con Ballard Tours, vas directo del aeropuerto SJD al lobby de tu hotel, maximizando tu tiempo en la piscina o la playa.",
      hotelsKeywords: "Keywords: transporte a hoteles Los Cabos, SJD to Nobu, SJD to Hard Rock, resort transfers Cabo San Lucas, transporte Grand Velas Cabo, SJD to Waldorf Astoria, transfer to Chileno Bay.",

      // Secciones adjuntas
      benefitsTitle: "Beneficios de Reservar con Nosotros",
      faqTitle: "Preguntas Frecuentes",
      faqSubtitle: "Todo lo que necesitas saber sobre nuestra logística y servicios.",
      routesTitle: "Rutas Populares de Aeropuerto",
      toursTitle: "Tours y Excursiones",
      paymentTitle: "Reserva en Línea Fácil y Opciones de Pago Flexibles",
      paymentText: "Sitio web de reservación fácil en tres clics en Ballard Tours. Simplemente ingrese su destino o lugar de recogida, elija su tipo de transporte y haga clic en enviar. Al final del formulario, encontrará la sección de pago, donde puede seleccionar entre las siguientes opciones: pagar con tarjeta de crédito, optar por el pago a la llegada o usar PayPal para mayor comodidad."
    },
    en: {
      seoTitle: "Our Fleet | Private & VIP Transportation in Los Cabos",
      seoDesc: "Discover our fleet of Vans and luxury SUVs for transportation in Los Cabos. VIP service to hotels, AirBnBs, private airports, and more.",
      title: "Our Fleet & Services",
      subtitle: "Luxury Vehicles for Every Need",
      
      // VAN
      vanTitle: "Group Van Transportation (Up to 10 Passengers)",
      vanText1: "Traveling as a group to Los Cabos has never been more comfortable and efficient. Our spacious Sprinter and Hiace Vans are designed to transport up to 10 passengers with all their luggage without sacrificing comfort.",
      vanText2: "The main benefit of choosing a Van is that your entire family, group of friends, or corporate team travels together, ensuring no one gets lost. Moreover, splitting the cost of a private Van is much more cost-effective than taking multiple taxis at the SJD airport. Equipped with dual-zone air conditioning and ergonomic seating, our Vans guarantee a refreshing start to your vacation.",
      vanKeywords: "Keywords: Los Cabos group transportation, SJD airport Van, private shuttle 10 passengers Cabo, Cabo family transport, Sprinter van rental Cabo.",
      
      // VIP / FBO
      vipTitle: "VIP Private Services & Private Airports (FBO)",
      vipText1: "For those seeking maximum exclusivity, we offer our VIP Private Service in luxury SUVs such as the Chevrolet Suburban and Cadillac Escalade. Designed for executives and premium travelers, these vehicles offer an incredibly quiet and elegant ride.",
      vipText2: "We specialize in tarmac-side pickups at Private Airports (FBO) like the Cabo San Lucas International Airport (MMSL) and SJD FBO. Our sharply dressed chauffeurs will await you on the tarmac with complimentary drinks and refreshing towels, ensuring maximum discretion, privacy, and immediate transit to your resort with zero waiting in commercial customs.",
      vipKeywords: "Keywords: VIP transportation Los Cabos, SJD private FBO transfer, private chauffeur Cabo, luxury SUV airport Cabo, Cabo San Lucas MMSL transport, executive transfer Baja.",

      // AIRBNB / VILLAS
      airbnbTitle: "Transfers to AirBnB, Private Villas & Residences",
      airbnbText1: "Vacation rentals are booming, and we are experts in logistics for AirBnBs and Private Villas. Unlike regular taxis that often get lost, our drivers perfectly know the entrances and strict security protocols of exclusive gated communities like Pedregal, Palmilla, Querencia, and Diamante.",
      airbnbText2: "By choosing this service, you get the huge benefit of requesting a Grocery Stop at Costco, Walmart, or Fresko. This way, you arrive at your Villa or AirBnB with a fully stocked fridge, cold drinks, and everything ready to enjoy without having to go out foraging on your first vacation day. We take you exactly door-to-door using precise GPS tracking.",
      airbnbKeywords: "Keywords: Los Cabos AirBnB transportation, Cabo private villa transfer, Pedregal transport, SJD airport grocery stop, Los Cabos vacation rental transport, transfer to Palmilla villas.",

      // ALL HOTELS
      hotelsTitle: "Full Coverage to All Los Cabos Hotels & Resorts",
      hotelsText1: "No matter where you are staying, our private transportation service reaches every corner of the destination. We provide direct and safe transfers to the most prestigious hotels, including Nobu Hotel, Hard Rock Hotel, Diamante, Pueblo Bonito (Sunset Beach, Pacifica), Waldorf Astoria, Grand Velas, Chileno Bay, Montage, JW Marriott, Secrets Puerto Los Cabos, and Hyatt Ziva, among many others.",
      hotelsText2: "The greatest benefit of our hotel service is that we always take the Toll Road whenever possible—paid by us—to guarantee the fastest trip. Forget about shared shuttles that make stops at 5 hotels before yours. With Ballard Tours, you go straight from the SJD airport to your hotel lobby, maximizing your time at the pool or the beach.",
      hotelsKeywords: "Keywords: Los Cabos hotel transportation, SJD to Nobu, SJD to Hard Rock, Cabo resort transfers, Grand Velas transport Cabo, SJD to Waldorf Astoria, transfer to Chileno Bay.",

      // Attached sections
      benefitsTitle: "Benefits of Booking With Us",
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "Everything you need to know about our logistics and services.",
      routesTitle: "Popular Airport Routes",
      toursTitle: "Tours & Excursions",
      paymentTitle: "Easy Online Booking & Flexible Payment Options",
      paymentText: "Three-click easy reservation website at Ballard Tours. Simply enter your destination or pickup location, choose your shuttle type, and click submit. At the end of the form, you will find the payment section, where you can select from the following options: pay with a credit card, opt for payment on arrival, or use PayPal for convenience."
    }
  };

  const t = content[lang] || content.en;

  // Rutas Populares Compartidas
  const popularRoutes = [
    { name: "Airport SJD to Nobu Hotel Los Cabos", path: "/destinations/sjd-to-nobu-hotel" },
    { name: "Airport SJD to Hard Rock Hotel Los Cabos", path: "/destinations/sjd-to-hard-rock" },
    { name: "Airport SJD to Riu Palace Baja California", path: "/destinations/sjd-to-riu-palace" },
    { name: "Airport SJD to Riu Santa Fe", path: "/destinations/sjd-to-riu-santa-fe" },
    { name: "Airport SJD to Grand Velas Los Cabos", path: "/destinations/sjd-to-grand-velas" },
    { name: "Airport SJD to Waldorf Astoria Los Cabos Pedregal", path: "/destinations/sjd-to-waldorf-astoria" },
    { name: "Airport SJD to Marquis Los Cabos", path: "/destinations/sjd-to-marquis" },
    { name: "Airport SJD to Secrets Puerto Los Cabos", path: "/destinations/sjd-to-secrets-puerto-los-cabos" },
    { name: "Airport SJD to Hilton Los Cabos", path: "/destinations/sjd-to-hilton-los-cabos" },
    { name: "Airport SJD to Hyatt Ziva Los Cabos", path: "/destinations/sjd-to-hyatt-ziva" },
    { name: "Airport SJD to Dreams Los Cabos Suites Golf Resort & Spa", path: "/destinations/sjd-to-dreams-los-cabos" },
    { name: "Airport SJD to Breathless Cabo San Lucas", path: "/destinations/sjd-to-breathless" },
    { name: "Airport SJD to Pueblo Bonito Sunset Beach", path: "/destinations/sjd-to-pueblo-bonito-sunset" },
    { name: "Airport SJD to Pueblo Bonito Pacifica", path: "/destinations/sjd-to-pueblo-bonito-pacifica" }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <Helmet>
        <title>{t.seoTitle}</title>
        <meta name="description" content={t.seoDesc} />
        <link rel="canonical" href="https://www.ballardtours.com/flotas" />
      </Helmet>

      {/* HERO SECTION */}
      <div className="bg-blue-900 text-white pt-32 pb-20 px-4 text-center rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=2000')] bg-cover bg-center opacity-10"></div>
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
        
        {/* 1. VAN (hiace-airport-los-cabos-ballard.webp) */}
        <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden flex flex-col lg:flex-row items-center hover:shadow-xl transition-shadow">
          <div className="w-full lg:w-1/2 h-72 lg:h-[400px]">
            <img src={`${process.env.PUBLIC_URL}/hiace-airport-los-cabos-ballard.webp`} alt="Van Transportation up to 10 pax" className="w-full h-full object-cover" />
          </div>
          <div className="w-full lg:w-1/2 p-8 md:p-12">
            <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-6"><Users size={24} /></div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">{t.vanTitle}</h2>
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">{t.vanText1}</p>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">{t.vanText2}</p>
            <p className="text-xs text-gray-400 italic font-semibold">{t.vanKeywords}</p>
          </div>
        </div>

        {/* 2. PRIVATE VIP / FBO (suburban-airport-los-cabos-ballard.webp) */}
        <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden flex flex-col lg:flex-row-reverse items-center hover:shadow-xl transition-shadow">
          <div className="w-full lg:w-1/2 h-72 lg:h-[400px]">
            <img src={`${process.env.PUBLIC_URL}/suburban-airport-los-cabos-ballard.webp`} alt="Private VIP FBO Transportation" className="w-full h-full object-cover" />
          </div>
          <div className="w-full lg:w-1/2 p-8 md:p-12">
            <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-6"><Star size={24} /></div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">{t.vipTitle}</h2>
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">{t.vipText1}</p>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">{t.vipText2}</p>
            <p className="text-xs text-gray-400 italic font-semibold">{t.vipKeywords}</p>
          </div>
        </div>

        {/* 3. AIRBNB & VILLAS (suburban-airport-los-cabos-ballard-sjd.webp) */}
        <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden flex flex-col lg:flex-row items-center hover:shadow-xl transition-shadow">
          <div className="w-full lg:w-1/2 h-72 lg:h-[400px]">
            <img src={`${process.env.PUBLIC_URL}/suburban-airport-los-cabos-ballard-sjd.webp`} alt="AirBnB and Private Villas Transportation" className="w-full h-full object-cover" />
          </div>
          <div className="w-full lg:w-1/2 p-8 md:p-12">
            <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-6"><MapPin size={24} /></div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">{t.airbnbTitle}</h2>
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">{t.airbnbText1}</p>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">{t.airbnbText2}</p>
            <p className="text-xs text-gray-400 italic font-semibold">{t.airbnbKeywords}</p>
          </div>
        </div>

        {/* 4. ALL HOTELS (private-transportation-nobu-hotel-los-cabos.webp) */}
        <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden flex flex-col lg:flex-row-reverse items-center hover:shadow-xl transition-shadow">
          <div className="w-full lg:w-1/2 h-72 lg:h-[400px]">
            <img src={`${process.env.PUBLIC_URL}/private-transportation-nobu-hotel-los-cabos.webp`} alt="All Hotels Los Cabos Transportation" className="w-full h-full object-cover" />
          </div>
          <div className="w-full lg:w-1/2 p-8 md:p-12">
            <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-6"><ShieldCheck size={24} /></div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">{t.hotelsTitle}</h2>
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">{t.hotelsText1}</p>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">{t.hotelsText2}</p>
            <p className="text-xs text-gray-400 italic font-semibold">{t.hotelsKeywords}</p>
          </div>
        </div>

        {/* =========================================
            SECCIONES ADJUNTAS (BENEFICIOS, FAQ, RUTAS, PAGOS) 
            ========================================= */}

        {/* 1. BENEFICIOS */}
        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-lg border border-gray-100">
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
        <div className="text-center mt-12 mb-6">
          <h2 className="text-3xl font-black text-gray-900">{t.faqTitle}</h2>
          <p className="text-gray-600">{t.faqSubtitle}</p>
        </div>
        <FAQSection lang={lang} />

        {/* 3. DIRECTORIO DE RUTAS Y TOURS (Diseño de 3 Columnas) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-black text-blue-900 mb-6 flex items-center gap-3">
              <MapPin size={24} /> {lang === 'es' ? 'Traslados a Hoteles (A-M)' : 'Hotel Transfers (A-M)'}
            </h2>
            <p className="text-sm text-gray-600 mb-4">{lang === 'es' ? 'Ofrecemos servicio seguro y de puerta a puerta hacia:' : 'We offer safe door-to-door service to:'}</p>
            <ul className="space-y-3 text-sm text-gray-600">
              {popularRoutes.slice(0, 7).map((route, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <Link to={route.path} onClick={() => window.scrollTo(0, 0)} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-black text-blue-900 mb-6 flex items-center gap-3">
              <MapPin size={24} /> {lang === 'es' ? 'Traslados a Hoteles (N-Z)' : 'Hotel Transfers (N-Z)'}
            </h2>
            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              {popularRoutes.slice(7).map((route, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <Link to={route.path} onClick={() => window.scrollTo(0, 0)} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-bold text-gray-900 mb-2">{lang === 'es' ? 'Recursos de Viaje' : 'Travel Resources'}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <Link to="/blog" onClick={() => window.scrollTo(0, 0)} className="text-blue-600 font-bold hover:text-blue-800 hover:underline transition-colors">Ballard Tours Blog</Link>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-black text-orange-600 mb-6 flex items-center gap-3">
              <Compass size={24} /> {t.toursTitle}
            </h2>
            <p className="text-sm text-gray-600 mb-4">{lang === 'es' ? 'Descubre qué hacer en Cabo y explora nuestros tours:' : 'Discover what to do in Cabo and explore our tours:'}</p>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">•</span><Link to="/tours/atv-off-road-adventure-cabo" onClick={() => window.scrollTo(0, 0)} className="text-orange-600 hover:underline">ATV Off-Road Adventure</Link></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">•</span><Link to="/tours/cabo-san-lucas-snorkel-tour" onClick={() => window.scrollTo(0, 0)} className="text-orange-600 hover:underline">Cabo San Lucas Snorkel Tour</Link></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">•</span><Link to="/tours/camel-safari-tour-cabo-san-lucas" onClick={() => window.scrollTo(0, 0)} className="text-orange-600 hover:underline">Camel Safari Tour</Link></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">•</span><Link to="/tours/clear-boat-tour-cabo-san-lucas-arch" onClick={() => window.scrollTo(0, 0)} className="text-orange-600 hover:underline">Clear Boat Tour to the Arch</Link></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">•</span><Link to="/tours/espiritu-santo-island-tour-from-cabo" onClick={() => window.scrollTo(0, 0)} className="text-orange-600 hover:underline">Espiritu Santo Island Tour</Link></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">•</span><Link to="/tours/pirate-ship-sunset-tour-cabo" onClick={() => window.scrollTo(0, 0)} className="text-orange-600 hover:underline">Pirate Ship Sunset Tour</Link></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">•</span><Link to="/tours/san-jose-del-cabo-art-walk" onClick={() => window.scrollTo(0, 0)} className="text-orange-600 hover:underline">San Jose del Cabo Art Walk</Link></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">•</span><Link to="/tours/sunset-fajita-cruise-cabo" onClick={() => window.scrollTo(0, 0)} className="text-orange-600 hover:underline">Sunset Fajita Cruise</Link></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">•</span><Link to="/tours/sunset-sessions-cabo-cruise" onClick={() => window.scrollTo(0, 0)} className="text-orange-600 hover:underline">Sunset Sessions Cruise</Link></li>
              <li className="flex items-start gap-2"><span className="text-orange-500 font-bold">•</span><Link to="/tours/swim-with-whale-sharks-la-paz-cabo" onClick={() => window.scrollTo(0, 0)} className="text-orange-600 hover:underline">Swim with Whale Sharks</Link></li>
            </ul>
          </div>
        </div>

        {/* 4. MÉTODOS DE PAGO */}
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