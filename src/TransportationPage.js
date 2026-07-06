import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Calendar, Baby, Banknote, CheckCircle, MapPin, ShieldCheck } from 'lucide-react';
import { FAQSection } from './FAQSection';

export default function TransportationPage({ lang = 'es', setServicioSeleccionado, setPaso }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    es: {
      seoTitle: "Transporte Privado y Traslados de Aeropuerto en Los Cabos | Ballard Tours",
      seoDesc: "Reserva transporte privado confiable en Los Cabos. Traslados de aeropuerto premium, SUVs de lujo y shuttles para grupos desde SJD a cualquier resort.",
      heroTitle: "Transporte Privado y Shuttles en Los Cabos",
      heroSubtitle: "Traslados premium de aeropuerto y servicio de chofer privado. Llega con estilo y comodidad a tu resort.",
      
      typesTitle: "Tipos de Transporte Terrestre en Cabo",
      typesSubtitle: "Navegar por el aeropuerto puede ser muy sencillo con la información correcta. Ya sea que busques una opción económica o un servicio altamente personalizado, tenemos la opción perfecta para ti.",
      vanTitle: "Cabo Shuttle Services",
      vanText: "Un servicio de transporte rentable ideal para viajeros y grupos que desean llegar a su destino sin gastar de más. Al compartir los costos, ahorras dinero mientras disfrutas de comodidad.",
      vanCheck1: "Ahorra entre 40% y 50% vs taxis.",
      vanCheck2: "Más espacio, asientos y lugar para equipaje.",
      vanCheck3: "Ideal para Viajes Grupales (Spring Breakers, Bodas).",
      vanBtn: "Reservar Shuttle / Van",
      
      vipTitle: "Cabo Airport Transportation (Private VIP)",
      vipText: "Nuestro servicio insignia ofrece una experiencia de transporte personalizada y conveniente, con rutas directas desde la terminal hasta el lobby de tu resort.",
      vipCheck1: "Cero Esperas: Salta las filas y ve directo a tu resort.",
      vipCheck2: "Parada de Compras: Permitidas con reserva previa.",
      vipCheck3: "Lujo Exclusivo: Chofer bilingüe y bebidas de bienvenida.",
      vipBtn: "Reservar Transporte VIP",

      taxiTitle: "¿Necesitas un Taxi en el Aeropuerto SJD? Conoce tus Opciones",
      taxiText1: "Al llegar a Los Cabos, muchos viajeros buscan un \"taxi de aeropuerto en SJD\" (SJD airport taxi) para llegar rápidamente a su hotel. Aunque los taxis locales están disponibles afuera de la terminal, optar por un traslado privado pre-reservado desde el aeropuerto ofrece ventajas incomparables tanto en costo como en seguridad.",
      taxiText2: "A diferencia de un taxi regular, nuestros servicios garantizan una tarifa fija sin taxímetros sorpresa, vehículos de lujo totalmente climatizados y un chofer esperándote directamente en tu llegada. Evita las largas filas bajo el sol, el estrés de negociar precios y asegura tu transporte privado con Ballard Tours hoy mismo.",

      routesTitle: "Rutas Populares de Aeropuerto",
      whyUsTitle: "¿Por qué elegir Ballard Tour Services?",
      whyUsList: [
        "Operando con excelencia desde 2005.",
        "Empresa de transporte con licencia (SCT) y asegurada.",
        "Transporte privado disponible 24/7.",
        "Choferes profesionales y bilingües.",
        "Rastreo de vuelos en vivo para llegadas al aeropuerto.",
        "Transporte para individuos, familias y grupos corporativos.",
        "Tours y actividades disponibles en todo Los Cabos.",
        "Servicio confiable, seguro y siempre puntual.",
        "Miles de visitantes satisfechos cada año."
      ],

      seoTextTitle: "La Importancia de un Traslado Seguro de Aeropuerto a Hotel en Los Cabos",
      seoTextP1: "El transporte desde el Aeropuerto Internacional de Los Cabos (SJD) hasta tu hotel es el primer y más importante paso de tus vacaciones. Reservar con anticipación tus traslados de aeropuerto a hotel garantiza un inicio sin estrés, alejándote del caos y las multitudes que suelen aglomerarse en las terminales de llegada. En Ballard Tours, entendemos que después de un largo vuelo, lo único que deseas es llegar a tu destino para relajarte. Por ello, ofrecemos un servicio de transporte privado y VIP que te recoge a pie de terminal y te lleva directamente a las puertas de tu resort o villa privada.",
      seoTextP2: "Evitar los taxis públicos o las aplicaciones de transporte compartido no reguladas dentro del aeropuerto es crucial. Nuestras unidades cuentan con placas federales que nos permiten el acceso exclusivo y seguro a las áreas de abordaje oficiales. Ya sea que necesites una SUV de lujo (como Suburban o Escalade) para un viaje en pareja o ejecutivo, o una espaciosa Sprinter Van para acomodar a toda la familia y su equipaje, nuestra flota está meticulosamente mantenida para ofrecer la mayor comodidad. Además, todos nuestros choferes son bilingües y expertos locales, capacitados para brindarte la mejor ruta, evitando el tráfico innecesario.",
      seoTextP3: "Al elegir nuestro servicio de traslado de aeropuerto a hotel, también disfrutas de tarifas fijas transparentes. Olvídate de los taxímetros dinámicos o los cobros ocultos por equipaje extra o peajes. El precio que reservas es el precio final. Incluimos monitoreo de vuelos en tiempo real, lo que significa que si tu avión se retrasa o se adelanta, nuestro equipo ajustará la logística automáticamente sin cargos adicionales. Comienza tu experiencia en Los Cabos con bebidas refrescantes a bordo, asientos de seguridad para niños si los necesitas, y la tranquilidad de saber que estás en manos de profesionales con más de dos décadas de experiencia en Baja California Sur.",

      faqTitle: "Preguntas Frecuentes",
      faqSubtitle: "Todo lo que necesitas saber sobre nuestra logística y servicios.",
      paymentTitle: "Reserva en Línea Fácil y Opciones de Pago Flexibles",
      paymentText: "Sitio web de reservación fácil en tres clics en Ballard Tours. Simplemente ingrese su destino o lugar de recogida, elija su tipo de transporte y haga clic en enviar. Al final del formulario, encontrará la sección de pago, donde puede seleccionar entre las siguientes opciones: pagar con tarjeta de crédito, optar por el pago a la llegada o usar PayPal para mayor comodidad."
    },
    en: {
      seoTitle: "Private Transportation & Airport Transfers Los Cabos | Ballard Tours",
      seoDesc: "Reliable private transportation in Los Cabos. Premium airport transfers, luxury SUVs, and group shuttles from SJD to any resort. Best rates, book online!",
      heroTitle: "Los Cabos Private Transportation & Airport Shuttles",
      heroSubtitle: "Premium Cabo airport transfers and private chauffeur services. Arrive in style and comfort to your resort.",
      
      typesTitle: "Types of Cabo Ground Transportation",
      typesSubtitle: "Navigating Cabo Airport transportation can be a breeze with the right information. Whether you’re seeking a budget-friendly option or a highly personalized service, we have the perfect fit.",
      vanTitle: "Cabo Shuttle Services",
      vanText: "A cost-effective transportation option for travelers and groups who want to get to their destination without breaking the bank. By sharing costs, you save money while enjoying comfort.",
      vanCheck1: "Save between 40% and 50% vs taxis.",
      vanCheck2: "More space, seats, and luggage capacity.",
      vanCheck3: "Ideal for Group Travel (Spring Breakers, Weddings).",
      vanBtn: "Book Shuttle / Van",
      
      vipTitle: "Cabo Airport Transportation (Private VIP)",
      vipText: "Our flagship service offers a personalized and convenient transportation experience with direct routes from the terminal to your hotel lobby.",
      vipCheck1: "No Waiting: Skip the lines and go direct to your resort.",
      vipCheck2: "Grocery Stop: Permitted with advance reservation.",
      vipCheck3: "Exclusive Luxury: Bilingual chauffeur & welcome beverages.",
      vipBtn: "Book VIP Transportation",

      taxiTitle: "Looking for an SJD Airport Taxi? Know Your Options",
      taxiText1: "Upon arriving in Los Cabos, many travelers look for an \"SJD airport taxi\" to quickly reach their hotel. While local taxis are available right outside the terminal, choosing a pre-booked private airport transfer offers unmatched advantages in both cost and safety.",
      taxiText2: "Unlike a regular taxi, our services guarantee a flat rate with no hidden meter fees, fully air-conditioned luxury vehicles, and a chauffeur waiting for you directly at arrivals. Skip the long lines in the sun, avoid the stress of haggling prices, and secure your private transportation with Ballard Tours today.",

      routesTitle: "Popular Airport Routes",
      whyUsTitle: "Why Choose Ballard Tour Services?",
      whyUsList: [
        "Operating with excellence since 2005.",
        "Federally licensed (SCT) and fully insured.",
        "Private transportation available 24/7.",
        "Professional and bilingual chauffeurs.",
        "Live flight tracking for airport arrivals.",
        "Transportation for individuals, families & groups.",
        "Tours and activities across all Los Cabos.",
        "Reliable, safe, and always punctual service.",
        "Thousands of satisfied visitors every year."
      ],

      seoTextTitle: "The Importance of Safe Airport to Hotel Transfers in Los Cabos",
      seoTextP1: "Transportation from Los Cabos International Airport (SJD) to your hotel is the first and most crucial step of your vacation. Pre-booking your airport to hotel transfers ensures a stress-free start, taking you away from the chaos and crowds that typically gather in the arrival terminals. At Ballard Tours, we understand that after a long flight, all you want is to reach your destination to relax. That's why we offer a private and VIP transportation service that picks you up right outside the terminal and takes you directly to the doors of your resort or private villa.",
      seoTextP2: "Avoiding public taxis or unregulated rideshare apps inside the airport is crucial. Our vehicles have federal plates that grant us exclusive and safe access to official boarding areas. Whether you need a luxury SUV (like a Suburban or Escalade) for a couples or executive trip, or a spacious Sprinter Van to accommodate the whole family and their luggage, our fleet is meticulously maintained to offer the utmost comfort. Furthermore, all our drivers are bilingual local experts, trained to take the best route and avoid unnecessary traffic.",
      seoTextP3: "By choosing our airport to hotel transfer service, you also enjoy transparent flat rates. Forget about dynamic taximeters or hidden charges for extra luggage or toll roads. The price you book is the final price. We include real-time flight monitoring, meaning if your plane is delayed or arrives early, our team will automatically adjust the logistics at no extra charge. Begin your Los Cabos experience with refreshing drinks on board, child safety seats if needed, and the peace of mind knowing you are in the hands of professionals with over two decades of experience in Baja California Sur.",

      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "Everything you need to know about our logistics and services.",
      paymentTitle: "Easy Online Booking & Flexible Payment Options",
      paymentText: "Three-click easy reservation website at Ballard Tours. Simply enter your destination or pickup location, choose your shuttle type, and click submit. At the end of the form, you will find the payment section, where you can select from the following options: pay with a credit card, opt for payment on arrival, or use PayPal for convenience."
    }
  };

  const t = content[lang] || content.en;

  const popularRoutes = [
    { name: "Airport SJD to Nobu Hotel Los Cabos", path: "/destinations/sjd-to-nobu-hotel" },
    { name: "Airport SJD to Riu Palace Baja California", path: "/destinations/sjd-to-riu-palace-baja-california" },
    { name: "Airport SJD to Grand Velas Los Cabos", path: "/destinations/sjd-to-grand-velas" },
    { name: "Airport SJD to Marquis Los Cabos", path: "/destinations/sjd-to-marquis" },
    { name: "Airport SJD to Hilton Los Cabos", path: "/destinations/sjd-to-hilton-los-cabos" },
    { name: "Airport SJD to Dreams Los Cabos Suites Golf Resort & Spa", path: "/destinations/sjd-to-dreams-los-cabos" },
    { name: "Airport SJD to Pueblo Bonito Sunset Beach", path: "/destinations/sjd-to-pueblo-bonito-sunset" },
    { name: "Airport SJD to Garza Blanca Los Cabos", path: "/destinations/sjd-to-garza-blanca" },
    { name: "Airport SJD to Solaz Resort Los Cabos", path: "/destinations/sjd-to-solaz-resort" },
    { name: "Airport SJD to One&Only Palmilla", path: "/destinations/sjd-to-one-and-only-palmilla" },
    { name: "Airport SJD to JW Marriott Los Cabos", path: "/destinations/sjd-to-jw-marriott" },
    { name: "Airport SJD to Villa del Palmar", path: "/destinations/sjd-to-villa-del-palmar" },
    { name: "Airport SJD to Sandos Finisterra", path: "/destinations/sjd-to-sandos-finisterra-los-cabos" },
    { name: "Airport SJD to Hard Rock Hotel Los Cabos", path: "/destinations/sjd-to-hard-rock" },
    { name: "Airport SJD to Riu Santa Fe", path: "/destinations/sjd-to-riu-santa-fe" },
    { name: "Airport SJD to Waldorf Astoria Los Cabos Pedregal", path: "/destinations/sjd-to-waldorf-astoria" },
    { name: "Airport SJD to Secrets Puerto Los Cabos", path: "/destinations/sjd-to-secrets-puerto-los-cabos" },
    { name: "Airport SJD to Hyatt Ziva Los Cabos", path: "/destinations/sjd-to-hyatt-ziva" },
    { name: "Airport SJD to Breathless Cabo San Lucas", path: "/destinations/sjd-to-breathless" },
    { name: "Airport SJD to Pueblo Bonito Pacifica", path: "/destinations/sjd-to-pueblo-bonito-pacifica-towers" },
    { name: "Airport SJD to Le Blanc Spa Resort Los Cabos", path: "/destinations/sjd-to-le-blanc" },
    { name: "Airport SJD to Four Seasons Cabo Del Sol", path: "/destinations/sjd-to-four-seasons" },
    { name: "Airport SJD to Zadún Ritz-Carlton Reserve", path: "/destinations/sjd-to-zadun" },
    { name: "Airport SJD to The Cape Hotel", path: "/destinations/sjd-to-the-cape" },
    { name: "Airport SJD to Villa La Valencia", path: "/destinations/sjd-to-villa-la-valencia-resort" }
  ];

  const handleBookTransport = (vehicleType) => {
    setServicioSeleccionado('aeropuerto_hotel');
    setPaso(2);
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <Helmet>
        <title>{t.seoTitle}</title>
        <meta name="description" content={t.seoDesc} />
        <link rel="canonical" href="https://www.ballardtours.com/transportation" />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative bg-blue-900 text-white py-24 md:py-32 px-4 overflow-hidden rounded-b-[3rem] shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/private-transportation-sjd-airport-los-cabos-luxury.webp')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/60 to-transparent"></div>
        <div className="relative max-w-5xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 font-medium">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-16 space-y-16">
        
        {/* 1. TIPOS DE TRANSPORTE (Imagen image_2730ff.jpg) */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{t.typesTitle}</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">{t.typesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
            <div className="h-64 overflow-hidden relative">
              <img src={`${process.env.PUBLIC_URL}/suburban-airport-los-cabos-ballard-sjd.webp`} alt="Cabo Shuttle Services" className="w-full h-full object-cover" />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.vanTitle}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{t.vanText}</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium"><CheckCircle className="text-green-500" size={18} /> {t.vanCheck1}</li>
                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium"><CheckCircle className="text-green-500" size={18} /> {t.vanCheck2}</li>
                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium"><CheckCircle className="text-green-500" size={18} /> {t.vanCheck3}</li>
              </ul>
              <button onClick={() => handleBookTransport('van')} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-colors">
                {t.vanBtn}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
            <div className="h-64 overflow-hidden relative">
              <img src={`${process.env.PUBLIC_URL}/private-transportation-nobu-hotel-los-cabos.webp`} alt="Private VIP Transfers" className="w-full h-full object-cover" />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.vipTitle}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{t.vipText}</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium"><CheckCircle className="text-blue-600" size={18} /> {t.vipCheck1}</li>
                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium"><CheckCircle className="text-blue-600" size={18} /> {t.vipCheck2}</li>
                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium"><CheckCircle className="text-blue-600" size={18} /> {t.vipCheck3}</li>
              </ul>
              <button onClick={() => handleBookTransport('suburban')} className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-colors">
                {t.vipBtn}
              </button>
            </div>
          </div>
        </div>

        {/* 2. ¿NECESITAS UN TAXI? (Imagen image_2730dd.png) */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-12 text-center md:text-left">
          <h2 className="text-3xl font-black text-gray-900 mb-6">{t.taxiTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600 leading-relaxed text-base">
            <p>{t.taxiText1}</p>
            <p>{t.taxiText2}</p>
          </div>
        </div>

        {/* 3. RUTAS POPULARES Y POR QUÉ ELEGIRNOS (Imagen image_2730bc.png) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-10">
            <h2 className="text-2xl font-black text-blue-900 mb-6 flex items-center gap-3">
              <MapPin size={28} /> {t.routesTitle}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-y-4 gap-x-6 text-sm text-gray-600">
              {popularRoutes.map((route, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <Link to={route.path} onClick={() => window.scrollTo(0, 0)} className="text-gray-700 hover:text-blue-600 hover:underline transition-colors">
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1 bg-blue-50 rounded-[2rem] border border-blue-100 p-8">
            <h2 className="text-xl font-black text-blue-900 mb-6">{t.whyUsTitle}</h2>
            <ul className="space-y-4 text-sm text-gray-700">
              {t.whyUsList.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <ShieldCheck size={18} className="text-blue-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* TEXTO SEO 500 PALABRAS INYECTADO */}
        <div className="bg-gray-50 p-8 md:p-12 rounded-[2rem] border border-gray-200">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">{t.seoTextTitle}</h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>{t.seoTextP1}</p>
            <p>{t.seoTextP2}</p>
            <p>{t.seoTextP3}</p>
          </div>
        </div>

        {/* 4. BENEFICIOS (Imagen image_273082.png) */}
        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100">
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

        {/* 5. PREGUNTAS FRECUENTES (Imagen image_273064.png) */}
        <div className="text-center mt-16 mb-6">
          <h2 className="text-3xl font-black text-gray-900">{t.faqTitle}</h2>
          <p className="text-gray-600">{t.faqSubtitle}</p>
        </div>
        <FAQSection lang={lang} />

        {/* 6. MÉTODOS DE PAGO (Imagen image_27305f.png) */}
        <div className="w-full flex flex-col items-center pt-8 pb-8 px-4 text-center">
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