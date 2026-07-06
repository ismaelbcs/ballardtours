import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Clock,
  Briefcase,
  HeartHandshake,
  Star,
  Armchair,
  Users,
  Smile,
  Target,
  Compass,
  CheckCircle,
  MapPin
} from 'lucide-react';

export default function AboutUs({ lang = 'es' }) {
  // Asegurarnos de que la página cargue desde arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    es: {
      seoTitle: "Sobre Nosotros | Ballard Tour Services Los Cabos",
      seoDesc: "Transporte de aeropuerto confiable, traslados privados, tours y actividades en Los Cabos desde 2005. Conoce más sobre Ballard Tour Services.",
      title: "Sobre Ballard Tour Services",
      subtitle: "Conoce Nuestra Historia",
      motto1: "Tu viaje comienza con excelencia.",
      motto2: "Traslados Privados. Servicio Profesional. Experiencia Inolvidable.",
      motto3: "Del aeropuerto al paraíso.",

      // Historia Original Traducida
      historyTitle: "Nuestra Historia",
      historyIntro: "Transporte de Aeropuerto de Confianza, Traslados Privados, Tours y Actividades en Los Cabos Desde 2005.",
      historyText: [
        "Ballard Tour Services es una empresa profesional de transporte y turismo con sede en Los Cabos, Baja California Sur, México. Desde nuestra fundación en 2005, hemos brindado con orgullo servicios de transporte confiables, seguros y cómodos para miles de visitantes que viajan a Los Cabos cada año.",
        "Durante más de 20 años, nuestra misión ha sido simple: brindar un servicio al cliente excepcional, transporte puntual en el aeropuerto, conductores profesionales y experiencias de viaje inolvidables en Los Cabos.",
        "Nos especializamos en transporte privado desde el Aeropuerto Internacional de Los Cabos (SJD) a hoteles, resorts, alquileres vacacionales, villas, residencias, bodas, restaurantes, marinas, campos de golf y atracciones turísticas en Cabo San Lucas, San José del Cabo, el Corredor Turístico, Puerto Los Cabos, Diamante, East Cape, Todos Santos, La Paz, Cabo Pulmo y destinos aledaños.",
        "Nuestros servicios incluyen traslados al aeropuerto, transporte a hoteles, servicios privados por horas, transporte para bodas, transporte corporativo, para grupos, traslados a cenas y soluciones personalizadas para familias, parejas y grupos grandes.",
        "Además del transporte, Ballard Tour Services ofrece una amplia variedad de tours y actividades, ayudando a los visitantes a descubrir las mejores experiencias que Baja California Sur tiene para ofrecer. Ya sea que busques un yate de lujo, aventura de snorkel, avistamiento de ballenas, paseo en camello, excursión en cuatrimoto (ATV), barco con fondo de cristal, crucero al atardecer, pesca deportiva, degustación de tequila o un recorrido privado por la ciudad, nuestro equipo puede ayudarte a crear las vacaciones perfectas.",
        "Estamos totalmente comprometidos a operar de manera legal y profesional. Ballard Tour Services mantiene todos los permisos, licencias, registros, pólizas de seguro y requisitos operativos exigidos por las autoridades mexicanas (SCT) para los servicios de transporte turístico en Baja California Sur.",
        "Nuestros experimentados choferes conocen a fondo la región, son bilingües, orientados al cliente y dedicados a brindar una experiencia fluida y sin estrés desde el momento en que llegas al aeropuerto hasta tu destino final."
      ],

      // Nueva Misión, Visión, Propósito
      mission: {
        title: "Nuestra Misión",
        text: "En Ballard Tours, nuestra misión es brindar servicios de transporte turístico privado seguros, puntuales y de alta calidad en Los Cabos, ofreciendo una experiencia cómoda y libre de estrés desde el momento en que nuestros clientes llegan al aeropuerto hasta su destino final. Nos comprometemos a superar expectativas mediante un servicio personalizado, vehículos impecables y atención excepcional."
      },
      vision: {
        title: "Nuestra Visión",
        text: "Ser la empresa líder de transporte turístico privado en Los Cabos, reconocida por la excelencia en el servicio, la confianza de nuestros clientes y la innovación constante. Aspiramos a convertirnos en la primera opción para viajeros nacionales e internacionales que buscan comodidad, seguridad y una experiencia premium durante su estancia en el destino."
      },
      purpose: {
        title: "Nuestro Propósito",
        text: "Conectar a los visitantes con lo mejor de Los Cabos a través de un transporte confiable, cómodo y seguro, convirtiendo cada traslado en el inicio de una experiencia inolvidable."
      },

      // Valores
      valuesTitle: "Nuestros Valores",
      values: [
        { title: "Seguridad", text: "La seguridad de nuestros pasajeros es nuestra máxima prioridad. Mantenemos altos estándares en nuestros vehículos y operaciones para garantizar viajes confiables.", icon: <ShieldCheck size={28} /> },
        { title: "Puntualidad", text: "Entendemos el valor del tiempo de nuestros clientes. Nos esforzamos por ofrecer traslados puntuales y eficientes en cada servicio.", icon: <Clock size={28} /> },
        { title: "Profesionalismo", text: "Nuestro equipo está comprometido con brindar una atención amable, respetuosa y profesional en todo momento.", icon: <Briefcase size={28} /> },
        { title: "Honestidad", text: "Actuamos con transparencia en nuestros precios, procesos y comunicación con nuestros clientes.", icon: <HeartHandshake size={28} /> },
        { title: "Excelencia", text: "Buscamos superar las expectativas en cada traslado, cuidando cada detalle para ofrecer una experiencia memorable.", icon: <Star size={28} /> },
        { title: "Comodidad", text: "Nuestros vehículos están equipados para proporcionar viajes cómodos, agradables y relajantes.", icon: <Armchair size={28} /> },
        { title: "Compromiso", text: "Escuchamos las necesidades de cada pasajero para ofrecer soluciones personalizadas y un servicio excepcional.", icon: <Users size={28} /> },
        { title: "Hospitalidad", text: "Representamos la calidez y hospitalidad que caracteriza a Los Cabos, haciendo que cada visitante se sienta bienvenido desde su llegada.", icon: <Smile size={28} /> }
      ],

      // Rutas y Por qué elegirnos
      routesTitle: "Rutas Populares de Aeropuerto",
      whyChooseUsTitle: "¿Por qué elegir Ballard Tour Services?",
      whyChooseUsList: [
        "Operando con excelencia desde 2005.",
        "Empresa de transporte con licencia (SCT) y asegurada.",
        "Transporte privado disponible 24/7.",
        "Choferes profesionales y bilingües.",
        "Rastreo de vuelos en vivo para llegadas al aeropuerto.",
        "Transporte para individuos, familias y grupos corporativos.",
        "Tours y actividades disponibles en todo Los Cabos.",
        "Servicio confiable, seguro y siempre puntual.",
        "Miles de visitantes satisfechos cada año."
      ]
    },
    en: {
      seoTitle: "About Us | Ballard Tour Services Los Cabos",
      seoDesc: "Trusted Airport Transportation, Private Transfers, Tours & Activities in Los Cabos Since 2005. Learn more about Ballard Tour Services.",
      title: "About Ballard Tour Services",
      subtitle: "Discover Our History",
      motto1: "Your Journey Begins with Excellence.",
      motto2: "Private Transfers. Professional Service. Unforgettable Experience.",
      motto3: "From Airport to Paradise.",

      // Original History
      historyTitle: "Our History",
      historyIntro: "Trusted Airport Transportation, Private Transfers, Tours & Activities in Los Cabos Since 2005.",
      historyText: [
        "Ballard Tour Services is a professional transportation and tourism company based in Los Cabos, Baja California Sur, Mexico. Since our foundation in 2005, we have proudly provided reliable, safe, and comfortable transportation services for thousands of visitors traveling to Los Cabos every year.",
        "For more than 20 years, our mission has been simple: deliver exceptional customer service, punctual airport transportation, professional drivers, and unforgettable travel experiences throughout Los Cabos.",
        "We specialize in private airport transportation from Los Cabos International Airport (SJD) to hotels, resorts, vacation rentals, villas, residences, weddings, restaurants, marinas, golf courses, and tourist attractions across Cabo San Lucas, San José del Cabo, the Tourist Corridor, Puerto Los Cabos, Diamante, East Cape, Todos Santos, La Paz, Cabo Pulmo, and surrounding destinations.",
        "Our transportation services include airport transfers, hotel transportation, private charters, wedding transportation, corporate transportation, group transportation, hourly transportation services, dinner transportation, and customized transportation solutions for families, couples, and large groups.",
        "In addition to transportation, Ballard Tour Services offers a wide variety of tours and activities in Los Cabos, helping visitors discover the best experiences Baja California Sur has to offer. Whether you are looking for a luxury yacht, snorkeling adventure, whale watching tour, camel ride, ATV excursion, glass-bottom boat tour, sunset cruise, fishing charter, tequila tasting experience, or a private city tour, our team can help you create the perfect vacation.",
        "We are fully committed to operating legally and professionally. Ballard Tour Services maintains all permits, licenses, registrations, insurance policies, and operational requirements required by Mexican authorities for tourist transportation services in Baja California Sur.",
        "Our experienced drivers are knowledgeable about the region, bilingual, customer-focused, and dedicated to providing a smooth and stress-free experience from the moment you arrive at Los Cabos Airport until you reach your destination."
      ],

      // Mission, Vision, Purpose
      mission: {
        title: "Our Mission",
        text: "At Ballard Tours, our mission is to provide safe, punctual, and high-quality private tourist transportation services in Los Cabos, offering a comfortable and stress-free experience from the moment our clients arrive at the airport to their final destination. We are committed to exceeding expectations through personalized service, impeccable vehicles, and exceptional attention."
      },
      vision: {
        title: "Our Vision",
        text: "To be the leading private tourist transportation company in Los Cabos, recognized for excellence in service, the trust of our clients, and constant innovation. We aspire to become the first choice for domestic and international travelers seeking comfort, safety, and a premium experience during their stay in the destination."
      },
      purpose: {
        title: "Our Purpose",
        text: "To connect visitors with the best of Los Cabos through reliable, comfortable, and safe transportation, turning every transfer into the beginning of an unforgettable experience."
      },

      // Values
      valuesTitle: "Our Core Values",
      values: [
        { title: "Safety", text: "The safety of our passengers is our top priority. We maintain high standards in our vehicles and operations to ensure reliable trips.", icon: <ShieldCheck size={28} /> },
        { title: "Punctuality", text: "We understand the value of our clients' time. We strive to provide punctual and efficient transfers in every service.", icon: <Clock size={28} /> },
        { title: "Professionalism", text: "Our team is committed to providing friendly, respectful, and professional attention at all times.", icon: <Briefcase size={28} /> },
        { title: "Honesty", text: "We act with transparency in our pricing, processes, and communication with our clients.", icon: <HeartHandshake size={28} /> },
        { title: "Excellence", text: "We aim to exceed expectations in every transfer, taking care of every detail to offer a memorable experience.", icon: <Star size={28} /> },
        { title: "Comfort", text: "Our vehicles are equipped to provide comfortable, pleasant, and relaxing trips.", icon: <Armchair size={28} /> },
        { title: "Commitment", text: "We listen to the needs of each passenger to offer personalized solutions and exceptional service.", icon: <Users size={28} /> },
        { title: "Hospitality", text: "We represent the warmth and hospitality that characterizes Los Cabos, making every visitor feel welcome from the moment they arrive.", icon: <Smile size={28} /> }
      ],

      // Routes and Why Choose Us
      routesTitle: "Popular Airport Transportation Routes",
      whyChooseUsTitle: "Why Choose Ballard Tour Services?",
      whyChooseUsList: [
        "Operating with excellence since 2005.",
        "Fully licensed and insured transportation company.",
        "Private transportation available 24/7.",
        "Professional bilingual drivers.",
        "Live flight tracking for airport arrivals.",
        "Transportation for individuals, families, and corporate groups.",
        "Tours and activities available throughout Los Cabos.",
        "Reliable, safe, and always punctual service.",
        "Thousands of satisfied visitors every year."
      ]
    }
  };

  const t = content[lang] || content.en;

  // Lista de rutas SEO compartida para ambos idiomas
  // Lista de rutas SEO compartida para ambos idiomas
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

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <Helmet>
        <title>{t.seoTitle}</title>
        <meta name="description" content={t.seoDesc} />
        <link rel="canonical" href="https://www.ballardtours.com/about-us" />
      </Helmet>

      {/* HERO SECTION */}
      <div className="bg-blue-900 text-white pt-24 pb-20 px-4 text-center rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=2000')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-80"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block bg-amber-500 text-gray-900 text-xs font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest shadow-md">
            {t.subtitle}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-md">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-medium max-w-2xl mx-auto italic drop-shadow-sm">
            "{t.motto1}"
          </p>
          <p className="text-sm md:text-base text-blue-200 mt-3 font-light tracking-wide">
            {t.motto2} • {t.motto3}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">

        {/* NUESTRA HISTORIA ORIGINAL */}
        <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-8 md:p-12 mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{t.historyTitle}</h2>
            <p className="text-lg text-blue-600 font-bold max-w-3xl mx-auto">
              {t.historyIntro}
            </p>
          </div>

          <div className="space-y-6 text-gray-600 leading-relaxed md:columns-2 gap-10">
            {t.historyText.map((paragraph, index) => (
              <p key={index} className="break-inside-avoid-column mb-6">{paragraph}</p>
            ))}
          </div>
        </div>

        {/* MISSION & VISION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-8 md:p-12 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mb-6">
              <Target size={32} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-4">{t.mission.title}</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t.mission.text}
            </p>
          </div>

          <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-8 md:p-12 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mb-6">
              <Compass size={32} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-4">{t.vision.title}</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t.vision.text}
            </p>
          </div>
        </div>

        {/* PURPOSE BANNER */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-[2rem] shadow-xl p-8 md:p-12 mb-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
          <h2 className="text-3xl font-black mb-4">{t.purpose.title}</h2>
          <p className="text-xl text-blue-100 font-medium max-w-3xl mx-auto leading-relaxed">
            {t.purpose.text}
          </p>
        </div>

        {/* CORE VALUES */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{t.valuesTitle}</h2>
          <div className="w-24 h-1.5 bg-blue-900 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {t.values.map((val, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gray-50 group-hover:bg-blue-900 text-blue-900 group-hover:text-white rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{val.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {val.text}
              </p>
            </div>
          ))}
        </div>

        {/* ROUTES AND WHY CHOOSE US */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-10">
            <h2 className="text-2xl font-black text-blue-900 mb-6 flex items-center gap-3">
              <MapPin size={28} />
              {t.routesTitle}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-600">
              {popularRoutes.map((route, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <Link
                    to={route.path}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-gray-600 hover:text-blue-600 hover:underline transition-colors"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <div className="bg-blue-50 rounded-[2rem] border border-blue-100 p-8">
              <h2 className="text-xl font-black text-blue-900 mb-6">
                {t.whyChooseUsTitle}
              </h2>
              <ul className="space-y-4 text-sm text-gray-700">
                {t.whyChooseUsList.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <ShieldCheck size={18} className="text-blue-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT FOOTER */}
            <div className="bg-gray-900 text-white p-8 rounded-[2rem] text-center shadow-lg">
              <h3 className="text-xl font-black mb-3">
                Ballard Tour Services
              </h3>
              <p className="text-sm font-semibold text-gray-400 mb-6 uppercase tracking-wider">
                Airport Transportation • Private Transfers • Tours & Activities
              </p>
              <div className="text-sm text-gray-300 space-y-3">
                <p>Los Cabos, Baja California Sur, Mexico</p>
                <p className="font-bold text-white text-lg">Phone: +52 624 139 3497</p>
                <p>Email: <a href="mailto:reservationballard@gmail.com" className="text-blue-400 hover:underline">reservationballard@gmail.com</a></p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}