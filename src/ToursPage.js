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
  Banknote
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
      introText2: "Ya sea que busques sentir la adrenalina en nuestra Aventura en ATVs Off-Road, disfrutar de la tranquilidad del desierto con un Safari en Camellos, o maravillarte con la vida marina a bordo del Bote Transparente al Arco. También ofrecemos expediciones únicas como el Tour de Snorkel en Cabo San Lucas, cruceros al atardecer (Pirate Ship, Fajita Cruise, Sunset Sessions), inmersión cultural en el Art Walk de San José del Cabo, e increíbles viajes de un día para nadar con el Tiburón Ballena o explorar la Isla Espíritu Santo. ¡Reserva hoy y asegura tu lugar en estas experiencias inolvidables!",
      priceFrom: "Precio desde",
      contactTitle: "Atención y Reservas Rápidas",
      contactSubtitle: "¿Tienes dudas sobre un tour o prefieres reservar por teléfono? Nuestro equipo está listo para ayudarte en tiempo real.",
      benefitsTitle: "Beneficios de Reservar con Nosotros",
      faqTitle: "Preguntas Frecuentes",
      faqSubtitle: "Todo lo que necesitas saber sobre nuestra logística y servicios.",
      paymentTitle: "Reserva en Línea Fácil y Opciones de Pago Flexibles",
      paymentText: "Sitio web de reservación fácil en tres clics en Ballard Tours. Simplemente ingrese su destino o lugar de recogida, elija su tipo de transporte y haga clic en enviar. Al final del formulario, encontrará la sección de pago, donde puede seleccionar entre las siguientes opciones: pagar con tarjeta de crédito, optar por el pago a la llegada o usar PayPal para mayor comodidad."
    },
    en: {
      seoTitle: "Best Cabo Tours & Excursions | Ballard Tours",
      seoDesc: "Discover the best tours in Cabo San Lucas. Book camel rides, ATVs, clear boat to the arch, snorkeling, whale shark swims, and more.",
      title: "Explore Los Cabos",
      subtitle: "Our Top Rated Tours & Activities",
      introTitle: "Adventure Awaits in Baja California Sur",
      introText1: "Los Cabos is much more than beautiful beaches and luxury resorts; it is a paradise of unparalleled adventures. At Ballard Tours, we have carefully selected the absolute best experiences and excursions so you can make the most of your visit.",
      introText2: "Whether you're looking for adrenaline on our ATV Off-Road Adventure, the tranquility of the desert on a Camel Safari, or marveling at marine life aboard the Clear Boat to the Arch. We also offer unique expeditions like the Cabo San Lucas Snorkel Tour, sunset cruises (Pirate Ship, Fajita Cruise, Sunset Sessions), cultural immersion at the San Jose del Cabo Art Walk, and incredible day trips to Swim with Whale Sharks or explore Espiritu Santo Island. Book today and secure your spot on these unforgettable experiences!",
      priceFrom: "Price from",
      contactTitle: "Quick Support & Reservations",
      contactSubtitle: "Have questions about a tour or prefer to book over the phone? Our team is ready to help you in real-time.",
      benefitsTitle: "Benefits of Booking With Us",
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "Everything you need to know about our logistics and services.",
      paymentTitle: "Easy Online Booking & Flexible Payment Options",
      paymentText: "Three-click easy reservation website at Ballard Tours. Simply enter your destination or pickup location, choose your shuttle type, and click submit. At the end of the form, you will find the payment section, where you can select from the following options: pay with a credit card, opt for payment on arrival, or use PayPal for convenience."
    }
  };

  const t = content[lang] || content.en;

  // Catálogo de Tours
  const toursList = [
    {
      id: "camel-safari",
      slug: "camel-safari-tour-cabo-san-lucas",
      image: "https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=800", // Cambia por tu imagen real
      duration: "2 horas",
      title: { es: "Safari en Camellos", en: "Camel Safari Tour" },
      desc: { 
        es: "Descubre un paseo único en camellos en nuestro Centro de Conservación frente al Océano Pacífico.", 
        en: "Discover a unique camel ride at our Oceanfront Conservation Center on the Pacific." 
      },
      price: 190
    },
    {
      id: "atv-offroad",
      slug: "atv-off-road-adventure-cabo",
      image: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=800", // Cambia por tu imagen real
      duration: "3 horas",
      title: { es: "Aventura en ATVs", en: "ATV Off-Road Adventure" },
      desc: { 
        es: "Siente la adrenalina pura recorriendo cañones, arroyos secos y hermosas playas en vehículos todo terreno.", 
        en: "Feel pure adrenaline riding through canyons, dry riverbeds, and beautiful beaches on ATVs." 
      },
      price: 190
    },
    {
      id: "clear-boat",
      slug: "clear-boat-tour-cabo-san-lucas-arch",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800", // Cambia por tu imagen real
      duration: "45 minutos",
      title: { es: "Bote Transparente al Arco", en: "Clear Boat to the Arch" },
      desc: { 
        es: "Navega hacia el icónico Arco, la Playa del Amor y la colonia de leones marinos en nuestra famosa lancha transparente.", 
        en: "Sail to the iconic Arch, Lover's Beach, and sea lion colony in our famous fully transparent boat." 
      },
      price: 100
    },
    {
      id: "whale-shark",
      slug: "swim-with-whale-sharks-la-paz-cabo",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800", // Cambia por tu imagen real
      duration: "2.5 horas",
      title: { es: "Nado con Tiburón Ballena", en: "Swim with Whale Sharks" },
      desc: { 
        es: "Una expedición de un día entero para nadar junto al pez más grande del océano en las aguas de La Paz.", 
        en: "A full-day expedition to swim alongside the largest fish in the ocean in the waters of La Paz." 
      },
      price: 250
    },
    {
      id: "snorkel-tour",
      slug: "cabo-san-lucas-snorkel-tour",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800", // Cambia por tu imagen real
      duration: "3 horas",
      title: { es: "Tour de Snorkel VIP", en: "VIP Snorkel Tour" },
      desc: { 
        es: "Explora los arrecifes cristalinos y la rica vida marina del Mar de Cortés en las bahías de Santa María y Chileno.", 
        en: "Explore the crystal-clear reefs and rich marine life of the Sea of Cortez in Santa Maria & Chileno bays." 
      },
      price: 120
    },
    {
      id: "art-walk",
      slug: "san-jose-del-cabo-art-walk",
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800", // Cambia por tu imagen real
      duration: "4 horas",
      title: { es: "San José Art Walk", en: "San Jose Art Walk" },
      desc: { 
        es: "Sumérgete en la cultura, el arte y la gastronomía paseando por el distrito histórico de galerías.", 
        en: "Immerse yourself in culture, art, and gastronomy strolling through the historic gallery district." 
      },
      price: 85
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <Helmet>
        <title>{t.seoTitle}</title>
        <meta name="description" content={t.seoDesc} />
        <link rel="canonical" href="https://www.ballardtours.com/tours" />
      </Helmet>

      {/* HERO SECTION */}
      <div className="bg-blue-900 text-white pt-32 pb-20 px-4 text-center rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=2000')] bg-cover bg-center opacity-20"></div>
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
            CATÁLOGO DE TOURS (Diseño de Tarjetas) 
            ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toursList.map((tour) => (
            <Link 
              key={tour.id} 
              to={`/tours/${tour.slug}`} 
              onClick={() => window.scrollTo(0, 0)}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
            >
              {/* Contenedor de Imagen y Badge de Tiempo */}
              <div className="relative h-56 overflow-hidden bg-gray-200">
                <img 
                  src={tour.image} 
                  alt={tour.title[lang]} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute bottom-4 left-4 bg-white text-blue-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <Clock size={14} /> {tour.duration}
                </div>
              </div>
              
              {/* Contenido de la Tarjeta */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {tour.title[lang]}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-3 mb-6 flex-grow leading-relaxed">
                  {tour.desc[lang]}
                </p>
                
                {/* Footer de Tarjeta: Precio y Flecha */}
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{t.priceFrom}</p>
                    <p className="text-2xl font-black text-blue-900">
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
            BOTONES DE CONTACTO (Estilo acorde al sitio)
            ========================================= */}
        <div className="bg-blue-900 rounded-[2rem] p-8 md:p-12 shadow-xl text-white">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-4">{t.contactTitle}</h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">{t.contactSubtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* WhatsApp Reservations */}
            <a href="https://wa.me/526241393497" target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl p-4 flex items-center gap-4 hover:scale-105 transition-transform duration-300 shadow-md group">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                <MessageCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">WhatsApp (Reservations)</h4>
                <p className="text-gray-500 text-xs mt-0.5">+52 (624) 139-3497</p>
                <p className="text-green-600 text-xs font-bold mt-1 group-hover:translate-x-1 transition-transform">Click to chat →</p>
              </div>
            </a>

            {/* WhatsApp Support */}
            <a href="https://wa.me/526121943286" target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl p-4 flex items-center gap-4 hover:scale-105 transition-transform duration-300 shadow-md group">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                <MessageCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">WhatsApp (Support)</h4>
                <p className="text-gray-500 text-xs mt-0.5">+52 (612) 194-3286</p>
                <p className="text-green-600 text-xs font-bold mt-1 group-hover:translate-x-1 transition-transform">Click to chat →</p>
              </div>
            </a>

            {/* Call Us */}
            <a href="tel:+526241393497" className="bg-white rounded-2xl p-4 flex items-center gap-4 hover:scale-105 transition-transform duration-300 shadow-md group">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Call Us Directly</h4>
                <p className="text-gray-500 text-xs mt-0.5">+52 (624) 139-3497</p>
                <p className="text-blue-600 text-xs font-bold mt-1 group-hover:translate-x-1 transition-transform">Click to call →</p>
              </div>
            </a>

            {/* Email Us */}
            <a href="mailto:reservationballard@gmail.com" className="bg-white rounded-2xl p-4 flex items-center gap-4 hover:scale-105 transition-transform duration-300 shadow-md group">
              <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div className="overflow-hidden">
                <h4 className="font-bold text-gray-900 text-sm">Email Us</h4>
                <p className="text-gray-500 text-xs mt-0.5 truncate">reservationballard@gmail.com</p>
                <p className="text-gray-600 text-xs font-bold mt-1 group-hover:translate-x-1 transition-transform">Click to email →</p>
              </div>
            </a>

          </div>
        </div>

        {/* =========================================
            SECCIONES ADJUNTAS (BENEFICIOS, FAQ, PAGOS) 
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