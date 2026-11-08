import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ShieldCheck,
  Clock,
  CheckCircle,
  Car,
  Star,
  Baby,
  ShoppingBag,
  ChevronRight,
  MapPin,
  Users,
  Banknote,
  Calendar,
  Plus,
  Map
} from 'lucide-react';
import { FAQSection } from './FAQSection';
import { restaurantSEOData } from './data/restaurantSEOData';
import { catalogoHoteles } from './data/seoData';

// ============================================================================
// 1. LUXURY SUV SERVICE (/transportation/luxury-suv-service)
// ============================================================================
export function LuxurySuvPage({ lang = 'es', setServicioSeleccionado, setPaso }) {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleBook = () => {
    if (setServicioSeleccionado) setServicioSeleccionado('aeropuerto_hotel');
    if (setPaso) setPaso(2);
    navigate('/');
    window.scrollTo(0, 0);
  };

  const isEs = lang === 'es';

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <Helmet>
        <title>{isEs ? 'Servicio de Luxury SUV y Chofer VIP en Los Cabos | Ballard Tours' : 'Luxury SUV Transportation Los Cabos | VIP Chauffeur Service | Ballard Tours'}</title>
        <meta
          name="description"
          content={
            isEs
              ? 'Viaja con máxima elegancia en Los Cabos con nuestro servicio privado de Luxury SUV (Chevrolet Suburban y Cadillac Escalade), chofer bilingüe, bebidas de cortesía y acceso a FBO.'
              : 'Travel in absolute comfort with our luxury SUV service in Cabo San Lucas. Private Chevrolet Suburban & Escalade transfers, bilingual chauffeurs, SJD & MMSL FBO tarmac pickup.'
          }
        />
        <link rel="canonical" href="https://www.ballardtours.com/transportation/luxury-suv-service" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Luxury SUV Transportation Service in Los Cabos",
            "provider": { "@type": "LocalBusiness", "name": "Ballard Tours" },
            "areaServed": "Los Cabos, Baja California Sur",
            "description": "VIP Private Luxury SUV airport transfers and chauffeur services in Los Cabos."
          })}
        </script>
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative bg-blue-900 text-white pt-32 pb-24 px-4 text-center rounded-b-[3rem] shadow-2xl overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/suburban-airport-los-cabos-ballard.webp')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/70 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block bg-amber-500 text-gray-900 text-xs font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest shadow-md">
            {isEs ? 'Servicio Ejecutivo & FBO VIP' : 'VIP Chauffeur & FBO Service'}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-md">
            {isEs ? 'Transporte en Luxury SUV y Chofer VIP en Los Cabos' : 'Luxury SUV Transportation Service in Los Cabos'}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 font-medium">
            {isEs
              ? 'Traslados 100% privados en Chevrolet Suburban y Cadillac Escalade de modelo reciente desde SJD y aeropuertos privados hacia cualquier resort o villa.'
              : '100% private transfers aboard late-model Chevrolet Suburbans and luxury SUVs from SJD Airport and private FBOs to any resort or villa in Baja.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={handleBook} className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-black py-4 px-8 rounded-xl shadow-xl transition-all text-lg uppercase">
              {isEs ? 'Cotizar y Reservar SUV' : 'Quote & Book Luxury SUV'}
            </button>
            <Link to="/contact" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold py-4 px-8 rounded-xl transition-all text-lg">
              {isEs ? 'Atención Corporativa / FBO' : 'Corporate & FBO Inquiries'}
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-16 space-y-16">
        <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 h-80 lg:h-[460px]">
            <img src={`${process.env.PUBLIC_URL}/private-transportation-nobu-hotel-los-cabos.webp`} alt="Luxury SUV Cabo" className="w-full h-full object-cover" />
          </div>
          <div className="w-full lg:w-1/2 p-8 md:p-12 space-y-6">
            <h2 className="text-3xl font-black text-gray-900">
              {isEs ? 'La Experiencia de Lujo Definitiva desde que Aterrizas' : 'The Ultimate First-Class Arrival in Los Cabos'}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {isEs
                ? 'Nuestro servicio de Luxury SUV está diseñado para parejas, familias y ejecutivos que buscan privacidad absoluta, puntualidad y confort superior. Olvídate de las filas de taxis o shuttles compartidos.'
                : 'Our Luxury SUV service is crafted for couples, families, and executives who demand absolute privacy, punctuality, and superior comfort. Skip the crowded terminal lines and step straight into a climate-controlled sanctuary.'}
            </p>
            <ul className="space-y-3 text-gray-700 font-medium">
              <li className="flex items-center gap-3"><CheckCircle className="text-blue-600 shrink-0" size={20} /> {isEs ? 'Capacidad de 1 a 6 pasajeros con amplio espacio de equipaje.' : 'Accommodates 1 to 6 passengers with generous luggage capacity.'}</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-blue-600 shrink-0" size={20} /> {isEs ? 'Acceso oficial a FBOs privados (SJD FBO y Cabo San Lucas MMSL).' : 'Direct tarmac/ramp access at Private Airports (SJD FBO & Cabo San Lucas MMSL).'}</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-blue-600 shrink-0" size={20} /> {isEs ? 'Chofer privado bilingüe, bebidas frías de cortesía y autopista de cuota incluida.' : 'Bilingual private chauffeur, complimentary cold beverages, and toll road included.'}</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-blue-600 shrink-0" size={20} /> {isEs ? 'Sillas para bebé sin costo y parada opcional en supermercado (Costco/Walmart).' : 'Complimentary child safety seats and optional 1-hour grocery stop (Costco/Walmart).'}</li>
            </ul>
            <button onClick={handleBook} className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all">
              {isEs ? 'Reservar Luxury SUV Ahora' : 'Book Your Luxury SUV Now'}
            </button>
          </div>
        </div>

        {/* DESTINOS EXCLUSIVOS */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-black text-blue-900 mb-4">
            {isEs ? 'Acceso Garantizado a Resorts Ultra-Lujo y Comunidades Privadas' : 'Guaranteed Gate Access to Ultra-Luxury Resorts & Gated Enclaves'}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {isEs
              ? 'A diferencia de plataformas como Uber que tienen prohibido el ingreso a casetas de seguridad privadas, nuestras unidades cuentan con placas federales SCT y permisos completos para dejarte directamente en el lobby de tu resort o puerta de tu villa:'
              : 'Unlike rideshare apps that are restricted from entering private security gates, our federally licensed (SCT) luxury SUVs have full authorization to deliver you directly to the lobby of any 5-star resort or private villa:'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-bold">
            <Link to="/destinations/sjd-to-waldorf-astoria" className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50 text-blue-900 flex items-center justify-between border border-gray-200">
              <span>SJD to Waldorf Astoria Pedregal</span> <ChevronRight size={16} />
            </Link>
            <Link to="/destinations/sjd-to-nobu-hotel" className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50 text-blue-900 flex items-center justify-between border border-gray-200">
              <span>SJD to Nobu Hotel Los Cabos</span> <ChevronRight size={16} />
            </Link>
            <Link to="/destinations/sjd-to-one-and-only-palmilla" className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50 text-blue-900 flex items-center justify-between border border-gray-200">
              <span>SJD to One&Only Palmilla</span> <ChevronRight size={16} />
            </Link>
            <Link to="/destinations/sjd-to-las-ventanas-al-paraiso" className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50 text-blue-900 flex items-center justify-between border border-gray-200">
              <span>SJD to Las Ventanas al Paraíso</span> <ChevronRight size={16} />
            </Link>
            <Link to="/destinations/sjd-to-montage" className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50 text-blue-900 flex items-center justify-between border border-gray-200">
              <span>SJD to Montage Los Cabos</span> <ChevronRight size={16} />
            </Link>
            <Link to="/destinations/sjd-to-zadun" className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50 text-blue-900 flex items-center justify-between border border-gray-200">
              <span>SJD to Zadún Ritz-Carlton Reserve</span> <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        <FAQSection lang={lang} />
      </div>
    </div>
  );
}

// ============================================================================
// 2. GROUP SPRINTER & VAN SHUTTLE (/transportation/group-sprinter-van-shuttle)
// ============================================================================
export function GroupVanPage({ lang = 'es', setServicioSeleccionado, setPaso }) {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleBook = () => {
    if (setServicioSeleccionado) setServicioSeleccionado('aeropuerto_hotel');
    if (setPaso) setPaso(2);
    navigate('/');
    window.scrollTo(0, 0);
  };

  const isEs = lang === 'es';

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <Helmet>
        <title>{isEs ? 'Transporte en Van y Sprinter para Grupos en Los Cabos | Ballard Tours' : 'Group Sprinter & Van Transportation Los Cabos (Up to 10 Pax) | Ballard Tours'}</title>
        <meta
          name="description"
          content={
            isEs
              ? 'Reserva transporte privado en Sprinter y Hiace Van para grupos de hasta 10 pasajeros en Los Cabos. Ideal para bodas, familias, golf y viajes corporativos desde SJD.'
              : 'Book private group van and Sprinter transportation in Los Cabos for up to 10 passengers. Ideal for weddings, large families, golf trips, and corporate groups from SJD Airport.'
          }
        />
        <link rel="canonical" href="https://www.ballardtours.com/transportation/group-sprinter-van-shuttle" />
      </Helmet>

      <section className="relative bg-blue-900 text-white pt-32 pb-24 px-4 text-center rounded-b-[3rem] shadow-2xl overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/hiace-airport-los-cabos-ballard.webp')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/70 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block bg-amber-500 text-gray-900 text-xs font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest shadow-md">
            {isEs ? 'Especialistas en Grupos y Bodas' : 'Group & Wedding Specialists'}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-md">
            {isEs ? 'Transporte Privado en Van y Sprinter para Grupos' : 'Group Van & Sprinter Transportation in Los Cabos'}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 font-medium">
            {isEs
              ? 'Viajen todos juntos cómodamente (hasta 10 pasajeros por unidad) con tarifa fija por vehículo, sin cobros por persona y con amplio espacio para maletas.'
              : 'Keep your entire group together in spacious, air-conditioned vans for up to 10 passengers per vehicle—with flat per-vehicle pricing and generous luggage space.'}
          </p>
          <button onClick={handleBook} className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-black py-4 px-8 rounded-xl shadow-xl transition-all text-lg uppercase">
            {isEs ? 'Reservar Van para Grupo' : 'Book Group Van Now'}
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-16 space-y-16">
        <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 h-80 lg:h-[440px]">
            <img src={`${process.env.PUBLIC_URL}/hiace-airport-los-cabos-ballard.webp`} alt="Group Van Transportation Cabo" className="w-full h-full object-cover" />
          </div>
          <div className="w-full lg:w-1/2 p-8 md:p-12 space-y-6">
            <h2 className="text-3xl font-black text-gray-900">
              {isEs ? 'Ahorra Hasta un 50% Viajando en una Van Privada' : 'Save Up to 50% Compared to Per-Person Shuttles'}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {isEs
                ? 'Muchos shuttles compartidos cobran por persona y hacen hasta 5 paradas antes de llegar a tu hotel. Con Ballard Tours, pagas una sola tarifa fija por toda la camioneta privada y vas sin escalas del aeropuerto SJD a tu hotel o AirBnB.'
                : 'Many shared airport shuttles charge per person and stop at 5 different hotels along the highway. With Ballard Tours, you pay one flat rate for the entire private van and go non-stop from SJD Airport to your resort or villa.'}
            </p>
            <ul className="space-y-3 text-gray-700 font-medium">
              <li className="flex items-center gap-3"><CheckCircle className="text-green-600 shrink-0" size={20} /> {isEs ? 'Ideal para familias grandes, bodas, despedidas de soltero(a) y eventos corporativos.' : 'Perfect for large families, destination weddings, bachelor/bachelorette parties & corporate events.'}</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-green-600 shrink-0" size={20} /> {isEs ? 'Aire acondicionado de doble zona, techos altos y asientos reclinables.' : 'Dual-zone air conditioning, high ceilings, and comfortable ergonomic seating.'}</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-green-600 shrink-0" size={20} /> {isEs ? 'Espacio amplio para maletas grandes, carriolas y bolsas de golf.' : 'Ample cargo room for oversized suitcases, strollers, and golf club bags.'}</li>
            </ul>
            <button onClick={handleBook} className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all">
              {isEs ? 'Cotizar Van para Mi Grupo' : 'Get a Quote for Your Group'}
            </button>
          </div>
        </div>

        <FAQSection lang={lang} />
      </div>
    </div>
  );
}

// ============================================================================
// 3. DINNER & RESTAURANTS TRANSFERS (/transportation/dinner-and-restaurants)
// ============================================================================
export function DinnerTransfersPage({ lang = 'es', setServicioSeleccionado, setSubCategoria, setVistaEspecial, setPaso }) {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleBookDinner = () => {
    if (setServicioSeleccionado) setServicioSeleccionado('tours');
    if (setSubCategoria) setSubCategoria('especiales');
    if (setVistaEspecial) setVistaEspecial('cenas');
    if (setPaso) setPaso(2);
    navigate('/');
    window.scrollTo(0, 0);
  };

  const isEs = lang === 'es';

  const topRestaurants = [
    { name: 'Flora Farms', zone: 'San José del Cabo' },
    { name: 'Acre Restaurant & Cocktail Bar', zone: 'San José del Cabo' },
    { name: 'Sunset Monalisa', zone: 'Cabo San Lucas' },
    { name: 'El Farallón (Waldorf Astoria)', zone: 'Cabo San Lucas' },
    { name: "Edith's Restaurante", zone: 'Cabo San Lucas' },
    { name: 'RosaNegra Los Cabos', zone: 'Cabo San Lucas' },
    { name: 'Bagatelle Los Cabos', zone: 'Cabo San Lucas' },
    { name: 'Toro Latin Kitchen & Bar', zone: 'Tourist Corridor' },
    { name: 'Cocina del Mar (Esperanza)', zone: 'Tourist Corridor' },
    { name: 'Manta at The Cape', zone: 'Cabo San Lucas' },
    { name: 'Comal at Chileno Bay', zone: 'Tourist Corridor' },
    { name: 'Nobu Los Cabos Restaurant', zone: 'Pacific Zone' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <Helmet>
        <title>{isEs ? 'Transporte Privado para Cenas y Restaurantes en Los Cabos | Ballard Tours' : 'Private Dinner & Restaurant Transportation in Los Cabos | Ballard Tours'}</title>
        <meta
          name="description"
          content={
            isEs
              ? 'Reserva transporte privado ida y vuelta para tus cenas en los mejores restaurantes de Los Cabos (Flora Farms, Acre, Sunset Monalisa, El Farallón). Incluye hasta 3 horas de espera.'
              : 'Book private round-trip chauffeur transportation to top Los Cabos restaurants (Flora Farms, Acre, Sunset Monalisa, El Farallon). Includes up to 3 hours of waiting time.'
          }
        />
        <link rel="canonical" href="https://www.ballardtours.com/transportation/dinner-and-restaurants" />
      </Helmet>

      <section className="relative bg-blue-900 text-white pt-32 pb-24 px-4 text-center rounded-b-[3rem] shadow-2xl overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/private-transportation-sjd-airport-los-cabos-luxury.webp')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/70 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block bg-amber-500 text-gray-900 text-xs font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest shadow-md">
            {isEs ? 'Veladas Gastronómicas Sin Preocupaciones' : 'Fine Dining Chauffeur Service'}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-md">
            {isEs ? 'Transporte Privado para Cenas y Restaurantes en Los Cabos' : 'Private Dinner & Restaurant Transportation in Los Cabos'}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 font-medium">
            {isEs
              ? 'Disfruta tu velada y brinda con tranquilidad. Tu chofer privado te lleva desde tu hotel o villa al restaurante, te espera hasta 3 horas y te regresa seguro.'
              : 'Enjoy your evening and toast worry-free. Your private chauffeur picks you up at your resort, waits up to 3 hours at the restaurant, and brings you safely back.'}
          </p>
          <button onClick={handleBookDinner} className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-black py-4 px-8 rounded-xl shadow-xl transition-all text-lg uppercase">
            {isEs ? 'Cotizar Traslado para Cena' : 'Book Dinner Transfer Now'}
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-4"><Clock size={24} /></div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{isEs ? '3 Horas de Espera Incluidas' : '3 Hours Wait Time Included'}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {isEs
                ? 'Tu chofer permanece disponible afuera del restaurante hasta por 3 horas para que disfrutes tu cena, cocteles y postre sin prisas.'
                : 'Your chauffeur remains on standby outside the venue for up to 3 hours so you can savor your multi-course dinner and cocktails at your own pace.'}
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-4"><Star size={24} /></div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{isEs ? 'Detalles Románticos Opcionales' : 'Romantic Upgrades Available'}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {isEs
                ? 'Sorprende a tu pareja agregando un ramo de rosas frescas, una botella de vino tinto o vino espumoso frío esperando dentro de la camioneta.'
                : 'Surprise your partner by adding a fresh bouquet of roses, a bottle of red wine, or chilled sparkling wine waiting inside your private SUV.'}
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-4"><ShieldCheck size={24} /></div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{isEs ? 'Acceso a Caminos como Flora Farms & Acre' : 'Easy Access to Flora Farms & Acre'}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {isEs
                ? 'Muchos restaurantes campestres en Ánimas Bajas tienen caminos sin pavimentar donde es difícil conseguir taxi de regreso en la noche. Con nosotros tu regreso está 100% asegurado.'
                : 'Many farm-to-table restaurants in San José del Cabo are located on secluded roads where finding a late-night return taxi is difficult. With us, your ride back is waiting.'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-black text-blue-900 mb-6">
            {isEs ? 'Restaurantes Más Solicitados en Los Cabos' : 'Most Requested Fine Dining Destinations in Los Cabos'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurantSEOData.map((r) => (
              <Link
                key={r.slug}
                to={`/restaurants/${r.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-900/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={`/${r.imageDiners || r.image}`}
                    alt={`Transfer to ${r.nombre}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = '/suburban-airport-los-cabos-ballard.webp';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-950/80 backdrop-blur-md text-white border border-white/10">
                      {r.zonaText}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base group-hover:text-blue-900 transition-colors line-clamp-1 mb-2">
                      {r.nombre}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mb-4">
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-gray-400" /> {isEs ? '3 hrs espera incl.' : '3 hrs wait incl.'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-gray-400" /> {r.zonaText}
                      </span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-blue-900">
                    <span>{isEs ? 'Ver información y tarifas' : 'View rates & transfer'}</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <FAQSection lang={lang} />
      </div>
    </div>
  );
}

// ============================================================================
// 4. GOLF COURSE TRANSFERS (/transportation/golf-course-transfers)
// ============================================================================
export function GolfTransfersPage({ lang = 'es', setServicioSeleccionado, setSubCategoria, setVistaEspecial, setPaso }) {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleBookGolf = () => {
    if (setServicioSeleccionado) setServicioSeleccionado('tours');
    if (setSubCategoria) setSubCategoria('especiales');
    if (setVistaEspecial) setVistaEspecial('golf');
    if (setPaso) setPaso(2);
    navigate('/');
    window.scrollTo(0, 0);
  };

  const isEs = lang === 'es';

  const golfCourses = [
    { name: 'Quivira Golf Club', zone: 'Pacific / Cabo San Lucas' },
    { name: 'Diamante Cabo San Lucas (Dunes & El Cardonal)', zone: 'Pacific / Cabo San Lucas' },
    { name: 'Cabo del Sol (Cove Club & Desert Course)', zone: 'Tourist Corridor' },
    { name: 'Palmilla Golf Club', zone: 'Tourist Corridor' },
    { name: 'Puerto Los Cabos Golf Club', zone: 'San José del Cabo' },
    { name: 'Cabo Real Golf Club', zone: 'Tourist Corridor' },
    { name: 'Club Campestre San José', zone: 'San José del Cabo' },
    { name: 'Solmar Golf Links (Rancho San Lucas)', zone: 'Pacific / Cabo San Lucas' },
    { name: 'Twin Dolphin Club', zone: 'Tourist Corridor' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <Helmet>
        <title>{isEs ? 'Transporte Privado a Campos de Golf en Los Cabos | Ballard Tours' : 'Los Cabos Golf Course Private Transportation & Transfers | Ballard Tours'}</title>
        <meta
          name="description"
          content={
            isEs
              ? 'Transporte privado ida y vuelta a todos los campos de golf de Los Cabos (Quivira, Diamante, Cabo del Sol, Palmilla, Puerto Los Cabos). SUVs y Vans con espacio para bastones.'
              : 'Book round-trip private golf course transportation in Los Cabos (Quivira, Diamante, Cabo del Sol, Palmilla, Puerto Los Cabos). Spacious SUVs and Vans for golf bags.'
          }
        />
        <link rel="canonical" href="https://www.ballardtours.com/transportation/golf-course-transfers" />
      </Helmet>

      <section className="relative bg-blue-900 text-white pt-32 pb-24 px-4 text-center rounded-b-[3rem] shadow-2xl overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/cabo-real-golf-los-cabos-transportation-airport-shuttle-taxi-uber.webp')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/70 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block bg-amber-500 text-gray-900 text-xs font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest shadow-md">
            {isEs ? 'Puntualidad para tu Tee Time' : 'Punctual Tee-Time Logistics'}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-md">
            {isEs ? 'Transporte Privado a Campos de Golf en Los Cabos' : 'Los Cabos Golf Course Private Transportation'}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 font-medium">
            {isEs
              ? 'Traslados privados ida y vuelta con amplio espacio para tus bolsas de palos de golf. Llega puntual a tu Tee Time en cualquier campo de Los Cabos.'
              : 'Round-trip private SUVs and Sprinter Vans with ample room for golf club bags. Arrive relaxed and right on schedule for your morning or afternoon tee time.'}
          </p>
          <button onClick={handleBookGolf} className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-black py-4 px-8 rounded-xl shadow-xl transition-all text-lg uppercase">
            {isEs ? 'Cotizar Transporte de Golf' : 'Book Golf Transfer Now'}
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-16 space-y-16">
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-black text-blue-900 mb-6">
            {isEs ? 'Cobertura a Todos los Campos de Golf de Clase Mundial' : 'Direct Service to All Championship Golf Courses in Los Cabos'}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {isEs
              ? 'Nuestro servicio de golf incluye recolección puntual en tu hotel o villa, traslado directo a la casa club y regreso programado al terminar tus 18 hoyos (hasta 6 horas de espera incluidas).'
              : 'Our golf transfer service includes punctual pickup at your resort or villa, direct drop-off at the clubhouse bag drop, and scheduled return pickup after your 18 holes (up to 6 hours included).'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {golfCourses.map((course, idx) => (
              <div key={idx} onClick={handleBookGolf} className="cursor-pointer p-5 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-gray-200 transition flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">{course.name}</p>
                  <p className="text-xs text-gray-500">{course.zone}</p>
                </div>
                <span className="text-xs font-bold text-blue-600">{isEs ? 'Cotizar →' : 'Quote →'}</span>
              </div>
            ))}
          </div>
        </div>

        <FAQSection lang={lang} />
      </div>
    </div>
  );
}

// ============================================================================
// 5. HOTEL-TO-HOTEL TRANSFERS (/transportation/hotel-to-hotel-transfers)
// ============================================================================
export function HotelToHotelPage({ lang = 'es', setServicioSeleccionado, setSubCategoria, setVistaEspecial, setPaso }) {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleBookHotelTransfer = () => {
    if (setServicioSeleccionado) setServicioSeleccionado('tours');
    if (setSubCategoria) setSubCategoria('especiales');
    if (setVistaEspecial) setVistaEspecial('hotel');
    if (setPaso) setPaso(2);
    navigate('/');
    window.scrollTo(0, 0);
  };

  const isEs = lang === 'es';

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <Helmet>
        <title>{isEs ? 'Traslados Privados de Hotel a Hotel en Los Cabos | Ballard Tours' : 'Hotel-to-Hotel & Villa Private Transfers in Los Cabos | Ballard Tours'}</title>
        <meta
          name="description"
          content={
            isEs
              ? '¿Cambias de hotel o te mudas a un AirBnB en Los Cabos? Reserva tu traslado privado de hotel a hotel con tarifas fijas, sillas para niños gratis y parada opcional en supermercado.'
              : 'Switching resorts or moving to a private villa in Los Cabos? Book a seamless private hotel-to-hotel transfer with flat rates, free child seats, and optional grocery stop.'
          }
        />
        <link rel="canonical" href="https://www.ballardtours.com/transportation/hotel-to-hotel-transfers" />
      </Helmet>

      <section className="relative bg-blue-900 text-white pt-32 pb-24 px-4 text-center rounded-b-[3rem] shadow-2xl overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/suburban-airport-los-cabos-ballard-sjd.webp')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/70 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block bg-amber-500 text-gray-900 text-xs font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest shadow-md">
            {isEs ? 'Cambio de Resort o Villa Sin Estrés' : 'Seamless Resort-to-Resort Transfers'}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-md">
            {isEs ? 'Traslados Privados de Hotel a Hotel en Los Cabos' : 'Hotel-to-Hotel & Villa Private Transfers in Los Cabos'}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 font-medium">
            {isEs
              ? 'Múdate de resort o pasa de tu hotel a una villa privada con total comodidad para todo tu equipaje, tarifas fijas por zona y parada opcional de compras.'
              : 'Moving from San José del Cabo to Cabo San Lucas or transitioning from a resort to a private AirBnB villa? Travel comfortably with all your luggage at flat zone rates.'}
          </p>
          <button onClick={handleBookHotelTransfer} className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-black py-4 px-8 rounded-xl shadow-xl transition-all text-lg uppercase">
            {isEs ? 'Cotizar Traslado Entre Hoteles' : 'Book Hotel-to-Hotel Transfer'}
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-16 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-4"><Car size={24} /></div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{isEs ? 'Del Check-Out al Check-In' : 'Check-Out to Check-In Convenience'}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {isEs
                ? 'Te recogemos exactamente a tu hora de salida en el lobby de tu hotel actual y te llevamos directo a tu nuevo resort o residencia privada.'
                : 'We pick you up right at your scheduled check-out time in the lobby of your current hotel and take you directly to your new resort or gated residence.'}
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-4"><ShoppingBag size={24} /></div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{isEs ? 'Parada en Supermercado (+$30 USD)' : 'Optional Grocery Stop (+$30 USD)'}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {isEs
                ? '¿Te mudas a una villa o condominio? Añade 1 hora de parada en Costco, Walmart o Fresko en el camino hacia tu nuevo alojamiento.'
                : 'Moving into a private villa or condo? Add a 1-hour stop at Costco, Walmart, or Fresko along the route to stock up on groceries and beverages.'}
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-4"><Baby size={24} /></div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{isEs ? 'Sillas para Niños Gratis' : 'Free Child Safety Seats'}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {isEs
                ? 'Solicita sillas para bebé, car seats o boosters sin ningún cargo adicional al configurar tu traslado entre hoteles.'
                : 'Request infant carriers, convertible car seats, or booster seats at zero extra charge when configuring your hotel-to-hotel transfer.'}
            </p>
          </div>
        </div>

        <FAQSection lang={lang} />
      </div>
    </div>
  );
}

// ============================================================================
// 6. NIGHTLIFE PRIVATE DRIVER (/transportation/nightlife-private-driver)
// ============================================================================
export function NightlifeTransfersPage({ lang = 'es', setServicioSeleccionado, setSubCategoria, setVistaEspecial, setPaso }) {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleBookNightlife = () => {
    if (setServicioSeleccionado) setServicioSeleccionado('tours');
    if (setSubCategoria) setSubCategoria('especiales');
    if (setVistaEspecial) setVistaEspecial('nightlife');
    if (setPaso) setPaso(2);
    navigate('/');
    window.scrollTo(0, 0);
  };

  const isEs = lang === 'es';

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <Helmet>
        <title>{isEs ? 'Transporte Privado para Vida Nocturna (Nightlife) en Cabo San Lucas | Ballard Tours' : 'Cabo San Lucas Nightlife Private Driver & Safe Round-Trip Transfers | Ballard Tours'}</title>
        <meta
          name="description"
          content={
            isEs
              ? 'Sal de fiesta en Cabo San Lucas con seguridad total. Servicio privado ida y vuelta con hasta 4 horas de espera hacia El Squid Roe, Mandala, Mango Deck y el centro.'
              : 'Enjoy Cabo San Lucas nightlife safely with a private round-trip chauffeur and up to 4 hours of wait time. Direct service to El Squid Roe, Mandala, La Vaquita & downtown.'
          }
        />
        <link rel="canonical" href="https://www.ballardtours.com/transportation/nightlife-private-driver" />
      </Helmet>

      <section className="relative bg-blue-900 text-white pt-32 pb-24 px-4 text-center rounded-b-[3rem] shadow-2xl overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/Sunset-Sessions-5.webp')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/70 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block bg-amber-500 text-gray-900 text-xs font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest shadow-md">
            {isEs ? 'Conductor Designado Privado VIP' : 'Safe VIP Nightlife Chauffeur'}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-md">
            {isEs ? 'Transporte Privado para Nightlife en Cabo San Lucas' : 'Cabo San Lucas Nightlife Private Driver & Transfers'}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 font-medium">
            {isEs
              ? 'Diviértete en el centro y la Marina de Cabo San Lucas con la tranquilidad de tener tu camioneta privada esperándote hasta por 4 horas para regresarte seguro a tu hotel.'
              : 'Party in downtown Cabo San Lucas and the Marina knowing your dedicated private SUV or Van is standing by for up to 4 hours to bring your group safely back to your resort.'}
          </p>
          <button onClick={handleBookNightlife} className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-black py-4 px-8 rounded-xl shadow-xl transition-all text-lg uppercase">
            {isEs ? 'Reservar Transporte Nightlife' : 'Book Nightlife Driver Now'}
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-16 space-y-16">
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-black text-blue-900 mb-4">
            {isEs ? 'Seguridad y Comodidad para Tu Grupo en la Noche' : 'Why Pre-Book a Private Chauffeur for Cabo Nightlife?'}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {isEs
              ? 'Encontrar transporte seguro para grupos grandes al salir de los bares de Cabo San Lucas a medianoche puede ser complicado y costoso. Con Ballard Tours, tu mismo chofer certificado te recoge en tu hotel, te deja en la zona de clubes (El Squid Roe, Mandala, La Vaquita, Pink Kitty, Jungle Bar, Rooftop 360) y permanece pendiente de tu mensaje por WhatsApp (hasta 4 horas incluidas) para llevarte de vuelta.'
              : 'Finding reliable late-night transportation for your group outside downtown Cabo clubs can be stressful and expensive. With Ballard Tours, your certified bilingual chauffeur picks you up at your resort, drops you off right at the nightlife district (El Squid Roe, Mandala, La Vaquita, Mango Deck, Rooftop 360), and stays on standby via WhatsApp for up to 4 hours to bring everyone safely back.'}
          </p>
          <button onClick={handleBookNightlife} className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all">
            {isEs ? 'Configurar Traslado Nocturno' : 'Configure Nightlife Transfer'}
          </button>
        </div>

        <FAQSection lang={lang} />
      </div>
    </div>
  );
}

// ============================================================================
// 7. FAQS PAGE (/faqs)
// ============================================================================
export function FaqsPage({ lang = 'es' }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const isEs = lang === 'es';

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <Helmet>
        <title>{isEs ? 'Preguntas Frecuentes sobre Transporte y Tours en Los Cabos | Ballard Tours' : 'Los Cabos Transportation & Tours Frequently Asked Questions | Ballard Tours'}</title>
        <meta
          name="description"
          content={
            isEs
              ? 'Resuelve todas tus dudas sobre traslados privados en el Aeropuerto de Los Cabos (SJD), punto de encuentro, rastreo de vuelos, sillas de bebé, paradas en supermercado y métodos de pago.'
              : 'Find answers to frequently asked questions about SJD Cabo Airport private transportation, meeting points, flight tracking, baby seats, grocery stops, and payment options.'
          }
        />
        <link rel="canonical" href="https://www.ballardtours.com/faqs" />
      </Helmet>

      <section className="relative bg-blue-900 text-white pt-32 pb-20 px-4 text-center rounded-b-[3rem] shadow-xl overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block bg-amber-500 text-gray-900 text-xs font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest shadow-md">
            {isEs ? 'Centro de Ayuda al Viajero' : 'Traveler Help Center'}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            {isEs ? 'Preguntas Frecuentes: Viajes y Logística en Cabo' : 'Frequently Asked Questions: Cabo Travel & Logistics'}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            {isEs
              ? 'Todo lo que necesitas saber sobre tu llegada al Aeropuerto SJD, nuestros vehículos privados y cómo reservar.'
              : 'Everything you need to know about arriving at SJD Airport, our private luxury fleet, and how to book.'}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 mt-12 space-y-12">
        <FAQSection lang={lang} />

        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
            {isEs ? '¿Tienes alguna otra pregunta?' : 'Still have questions?'}
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {isEs
              ? 'Nuestro equipo local está disponible 24/7 por WhatsApp, teléfono o correo electrónico para ayudarte a planificar tu traslado o excursión.'
              : 'Our local team is available 24/7 via WhatsApp, phone, or email to help you customize your transfer or excursion.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://wa.me/526121943286" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-xl shadow-md transition">
              WhatsApp: +52 (612) 194-3286
            </a>
            <Link to="/contact" className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-xl shadow-md transition">
              {isEs ? 'Ir a Contacto' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 8. PRIVACY POLICY (/privacy-policy)
// ============================================================================
export function PrivacyPolicyPage({ lang = 'es' }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const isEs = lang === 'es';

  return (
    <>
      <Helmet>
        <title>{isEs ? 'Aviso de Privacidad | Ballard Tour Services Los Cabos' : 'Privacy Policy | Ballard Tour Services Los Cabos'}</title>
        <meta
          name="description"
          content={
            isEs
              ? 'Aviso de privacidad y política de protección de datos personales de Ballard Tour Services en Los Cabos, Baja California Sur, México.'
              : 'Privacy policy and personal data protection guidelines for Ballard Tour Services in Los Cabos, Baja California Sur, Mexico.'
          }
        />
        <link rel="canonical" href="https://www.ballardtours.com/privacy-policy" />
      </Helmet>

      <section className="max-w-4xl mx-auto px-4 py-16 mt-20 text-gray-800 bg-white">
        <h1 className="text-4xl md:text-5xl font-black text-blue-900 mb-8 text-center">
          {isEs ? 'Aviso de Privacidad y Protección de Datos' : 'Privacy Policy & Data Protection'}
        </h1>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-10 text-center">
          <p className="text-lg text-gray-700">
            <strong>Ballard Tour Services</strong><br />
            {isEs ? 'Transportación Turística Privada y Excursiones' : 'Private Tourist Transportation & Excursions'}<br />
            Cabo San Lucas, Baja California Sur, México<br />
            <span className="text-sm text-gray-500 mt-2 block">
              {isEs ? 'Última actualización: 2026' : 'Last updated: 2026'}
            </span>
          </p>
        </div>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">
          {isEs ? '1. Responsable de los Datos Personales' : '1. Data Controller'}
        </h2>
        <p className="mb-4 leading-relaxed">
          {isEs
            ? 'Ballard Tour Services ("Ballard Tours"), con domicilio operativo en Cabo San Lucas, Baja California Sur, México, es responsable del tratamiento y protección de los datos personales que usted nos proporciona a través de https://www.ballardtours.com, WhatsApp (+52 612 194 3286) o correo electrónico (reservationballard@gmail.com).'
            : 'Ballard Tour Services ("Ballard Tours"), operating in Cabo San Lucas, Baja California Sur, Mexico, is responsible for collecting, processing, and protecting the personal information you provide through https://www.ballardtours.com, WhatsApp (+52 612 194 3286), or email (reservationballard@gmail.com).'}
        </p>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">
          {isEs ? '2. Datos que Recopilamos' : '2. Information We Collect'}
        </h2>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li>{isEs ? 'Nombre completo y apellidos del pasajero titular.' : 'Full name of the lead passenger.'}</li>
          <li>{isEs ? 'Correo electrónico y número de teléfono / WhatsApp de contacto.' : 'Email address and contact phone / WhatsApp number.'}</li>
          <li>{isEs ? 'Detalles de vuelo (aerolínea, número de vuelo, horarios de llegada y salida).' : 'Flight details (airline, flight number, arrival and departure times).'}</li>
          <li>{isEs ? 'Hotel, villa o domicilio de origen y destino en Los Cabos.' : 'Pickup and drop-off hotel, resort, or private villa in Los Cabos.'}</li>
          <li>{isEs ? 'Confirmaciones de pago procesadas de forma segura mediante PayPal (no almacenamos números de tarjetas bancarias en nuestros servidores).' : 'Payment confirmations processed securely via PayPal (we do not store credit card numbers on our servers).'}</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">
          {isEs ? '3. Finalidad del Uso de sus Datos' : '3. How We Use Your Information'}
        </h2>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li>{isEs ? 'Coordinar y ejecutar puntualmente sus servicios de transporte privado y excursiones.' : 'Coordinate and fulfill your private airport transfers and tour reservations.'}</li>
          <li>{isEs ? 'Enviar su confirmación de reserva, código de seguimiento y recibo por correo electrónico.' : 'Send your booking confirmation, reservation code, and receipt via email.'}</li>
          <li>{isEs ? 'Monitorear su vuelo en tiempo real para ajustar horarios en caso de demoras.' : 'Monitor your flight in real time to adjust pickup schedules in case of delays.'}</li>
          <li>{isEs ? 'Contactarle vía WhatsApp o teléfono para coordinar el punto de encuentro en el aeropuerto o lobby del hotel.' : 'Contact you via WhatsApp or phone to coordinate airport or hotel lobby meet-and-greet.'}</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">
          {isEs ? '4. Protección y No Venta de Datos' : '4. Data Security & Non-Disclosure'}
        </h2>
        <p className="mb-4 leading-relaxed">
          {isEs
            ? 'Ballard Tour Services nunca vende, alquila ni comparte su información personal con terceros con fines publicitarios. Sus datos únicamente son compartidos internamente con el chofer certificado u operador turístico asignado a su reservación.'
            : 'Ballard Tour Services never sells, rents, or shares your personal information with third parties for marketing purposes. Your details are shared strictly with the certified chauffeur or tour coordinator assigned to your booking.'}
        </p>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">
          {isEs ? '5. Derechos ARCO y Contacto' : '5. Your Privacy Rights & Contact'}
        </h2>
        <p className="mb-4 leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-200">
          {isEs
            ? 'Usted puede solicitar el acceso, rectificación, cancelación u oposición al uso de sus datos personales en cualquier momento escribiendo a: '
            : 'You may request access, correction, or deletion of your personal data at any time by contacting us at: '}
          <a href="mailto:reservationballard@gmail.com" className="text-blue-600 font-bold hover:underline">reservationballard@gmail.com</a>
          <br />
          WhatsApp / Tel: +52 (612) 194-3286
        </p>
      </section>
    </>
  );
}

// ============================================================================
// 8. RESTAURANT SEO LANDING PAGES (/restaurants/:slug)
// ============================================================================
export function RestaurantSeoPage({
  lang = 'en',
  setServicioSeleccionado,
  setSubCategoria,
  setVistaEspecial,
  setPaso,
  setReserva,
  agregarAlCombo
}) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const seoData = restaurantSEOData.find((item) => item.slug === slug);

  const [cenaOrigen, setCenaOrigen] = useState('');
  const [busquedaCenaOrigen, setBusquedaCenaOrigen] = useState('');
  const [mostrarDropdownCena, setMostrarDropdownCena] = useState(false);
  const [cenaRestauranteNombre, setCenaRestauranteNombre] = useState(seoData ? seoData.nombre : '');
  const [cenaDestino, setCenaDestino] = useState(
    seoData ? (seoData.zona === 1 ? 'sjc' : seoData.zona === 2 ? 'corredor' : seoData.zona === 3 ? 'csl' : 'pacifico') : ''
  );
  const [cenaFecha, setCenaFecha] = useState('');
  const [cenaPax, setCenaPax] = useState('1-4');
  const [cenaHora, setCenaHora] = useState('');
  const [cenaHoraRegreso, setCenaHoraRegreso] = useState('');
  const [reservaLocal, setReservaLocal] = useState({
    rosas: false,
    vino: false,
    vinoEspumoso: false
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (seoData) {
      setCenaRestauranteNombre(seoData.nombre);
      setCenaDestino(seoData.zona === 1 ? 'sjc' : seoData.zona === 2 ? 'corredor' : seoData.zona === 3 ? 'csl' : 'pacifico');
    }
  }, [slug, seoData]);

  if (!seoData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {lang === 'es' ? 'Restaurante no encontrado' : 'Restaurant not found'}
          </h1>
          <Link to="/transportation/dinner-and-restaurants" className="text-blue-600 hover:underline font-bold">
            {lang === 'es' ? 'Ver todos los restaurantes' : 'View all restaurants'}
          </Link>
        </div>
      </div>
    );
  }

  const matrizPreciosCenas = {
    sjc: { '1': 120, '2': 140, '3': 170, '4': 250, '5': 300, '6': 400 },
    corredor: { '1': 140, '2': 120, '3': 140, '4': 220, '5': 300, '6': 400 },
    csl: { '1': 170, '2': 140, '3': 120, '4': 220, '5': 300, '6': 400 },
    pacifico: { '1': 250, '2': 220, '3': 220, '4': 180, '5': 300, '6': 400 }
  };
  const recargoCenas = { '1-4': 0, '5-8': 30, '9-10': 45 };

  let totalPrecioCena = 0;
  if (cenaOrigen && cenaDestino) {
    const zonaSeleccionada = String(cenaOrigen.split('|')[1]) || '1';
    const precioBase = Number(matrizPreciosCenas[cenaDestino]?.[zonaSeleccionada] || 0);
    totalPrecioCena = precioBase + Number(recargoCenas[cenaPax] || 0);
  }

  const costoExtras = (reservaLocal.rosas ? 50 : 0) + (reservaLocal.vino ? 70 : 0) + (reservaLocal.vinoEspumoso ? 70 : 0);
  const granTotalCena = totalPrecioCena > 0 ? totalPrecioCena + costoExtras : 0;

  const isEs = lang === 'es';
  const t = {
    title: isEs ? `Traslados Privados a ${seoData.nombre}` : `Private Transfers to ${seoData.nombre}`,
    subtitle: isEs
      ? `Reserva transporte de lujo, seguro y confiable a ${seoData.nombre} en ${seoData.zonaText}. Evita Ubers y taxis. ¡Reserva en línea!`
      : `Book safe, reliable luxury transportation to ${seoData.nombre} in ${seoData.zonaText}. Avoid Ubers and taxis. Book online!`,
    keyPointTitle: isEs ? 'Puntos Clave' : 'Key Takeaways',
    keyPointDesc: isEs
      ? `Disfruta de ${seoData.desc} en ${seoData.nombre} sin preocuparte por el viaje. Nuestro transporte privado en Cabo te lleva directamente desde tu resort o villa, asegurando una velada perfecta de principio a fin.`
      : `Enjoy ${seoData.desc} at ${seoData.nombre} without worrying about the ride. Our Cabo private transfers take you directly from your resort or villa, ensuring a perfect evening from start to finish.`,
    ratesTitle: isEs ? 'Tarifas y Beneficios Exclusivos' : 'Exclusive Rates and Benefits',
    ratesDesc: isEs
      ? `Ofrecemos tarifas fijas para traslados privados a ${seoData.nombre}. A diferencia de los taxis o Uber en Cabo que pueden cambiar sus precios, nosotros garantizamos el mejor transporte de lujo en Los Cabos.`
      : `We offer flat rates for private transfers to ${seoData.nombre}. Unlike Cabo taxis or Uber which might change pricing, we guarantee the finest luxury transportation in Los Cabos.`,
    routeTitle: isEs ? 'Ruta de Viaje y Logística' : 'Route and Logistics',
    routeDesc: isEs
      ? `Viajar a ${seoData.zonaText} es cómodo y escénico. Nuestros chóferes conocen la ruta perfecta hacia ${seoData.nombre} y te estarán esperando hasta 3 horas para regresarte con la misma comodidad.`
      : `Traveling to ${seoData.zonaText} is comfortable and scenic. Our chauffeurs know the perfect route to ${seoData.nombre} and will wait up to 3 hours to take you back in complete comfort.`,
    compareTitle: isEs ? 'Comparando Opciones en Cabo' : 'Comparing Options in Cabo',
    compareDesc: isEs
      ? `Los taxis regulares en Cabo suelen ser costosos y los Ubers no siempre pueden ingresar a ciertas áreas como ${seoData.nombre}. Nuestros traslados privados en Los Cabos son la opción confiable y lujosa para que disfrutes sin preocupaciones.`
      : `Regular Cabo taxis are often overpriced, and Ubers face restrictions entering exclusive areas like ${seoData.nombre}. Our private transfers in Cabo San Jose and Cabo San Lucas are the reliable, luxury choice for a worry-free experience.`,
    tipsTitle: isEs ? 'Consejos para Reservar y Reseñas de Viajeros' : 'Booking Tips & Traveler Reviews',
    tipsDesc: isEs
      ? `Reserva tu transporte a ${seoData.nombre} con anticipación. Miles de viajeros recomiendan Ballard Tours por encima de los shuttles tradicionales por nuestra puntualidad y vehículos premium.`
      : `Book your transportation to ${seoData.nombre} in advance. Thousands of travelers recommend Ballard Tours over traditional shuttles due to our punctuality and premium vehicles.`,
    bookingTitle: isEs ? 'Reserva en Línea Fácil' : 'Easy Online Booking',
    bookingDesc: isEs
      ? `Utiliza nuestro formulario para asegurar tu traslado de lujo a ${seoData.nombre}. Aceptamos opciones de pago flexibles.`
      : `Use our form to secure your luxury transfer to ${seoData.nombre}. We accept flexible payment options.`
  };

  return (
    <div className="animate-fade-in pb-10 bg-white font-sans">
      <Helmet>
        <title>
          {isEs
            ? `Transporte Privado a Restaurante ${seoData.nombre} (${seoData.zonaText}) | Ballard Tours`
            : `Private Transportation to ${seoData.nombre} (${seoData.zonaText}) | Ballard Tours`}
        </title>
        <meta
          name="description"
          content={
            isEs
              ? `Reserva transporte privado y seguro de ida y vuelta para tu cena en ${seoData.nombre} (${seoData.zonaText}). Chofer bilingüe y hasta 3 horas de espera incluidas.`
              : `Book luxury private round-trip dinner transportation to ${seoData.nombre} in ${seoData.zonaText}. Punctual private chauffeur service and up to 3 hours of waiting time.`
          }
        />
        <link rel="canonical" href={`https://www.ballardtours.com/restaurants/${seoData.slug}`} />
      </Helmet>

      {/* 1. HERO SECTION CON FOTO DE PORTADA DEL RESTAURANTE */}
      <div className="relative bg-blue-950 text-white py-28 md:py-36 px-4 overflow-hidden shadow-xl rounded-b-[2.5rem] mb-12 border-b border-blue-900">
        <div className="absolute inset-0 z-0">
          <img
            src={`/${seoData.image}`}
            alt={seoData.nombre}
            className="w-full h-full object-cover opacity-55"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/50 to-blue-950/30 z-10"></div>

        <div className="relative max-w-4xl mx-auto text-center z-20">
          <div className="flex justify-center items-center gap-4 mb-6 text-blue-300">
            <Car size={28} />
            <span className="border-t border-dashed border-blue-400 w-16"></span>
            <MapPin size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight leading-tight text-white drop-shadow-md">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 font-medium mt-4">
            {isEs ? 'Servicio Exclusivo en Luxury SUV y Sprinter' : 'Exclusive Private Transportation & Luxury SUV Service'}
          </p>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT: SEO CONTENT */}
        <div className="lg:col-span-2 space-y-12 text-gray-700 text-lg leading-relaxed order-2 lg:order-1">
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-blue-900 mb-6 border-b border-gray-100 pb-4 tracking-tight">
              {isEs ? `Traslados VIP hacia ${seoData.nombre}` : `VIP Transportation to ${seoData.nombre}`}
            </h2>
            <p className="mb-4 text-gray-600 text-base md:text-lg">{t.subtitle}</p>
            <p className="mb-4 text-gray-600 text-base md:text-lg">{t.keyPointDesc}</p>
          </section>

          <section className="bg-blue-50 border-l-4 border-blue-900 p-8 rounded-r-3xl my-10 shadow-sm">
            <h3 className="text-xl font-bold text-blue-900 mb-6 tracking-tight">{t.keyPointTitle}</h3>
            <ul className="space-y-4 text-blue-900 text-sm md:text-base font-medium">
              <li className="flex items-start gap-3">
                <CheckCircle size={20} className="shrink-0 mt-0.5 text-blue-600" />
                <span>
                  {isEs
                    ? `El servicio directo ofrece viajes 100% privados hacia ${seoData.nombre}.`
                    : `Service offers 100% private, direct rides to ${seoData.nombre}.`}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={20} className="shrink-0 mt-0.5 text-blue-600" />
                <span>
                  {isEs
                    ? 'Reservar con anticipación en Ballard Tours garantiza puntualidad, bebidas de cortesía y cero tiempos de espera.'
                    : 'Pre-booking at Ballard Tours guarantees timely service, complimentary beverages, and zero wait times.'}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={20} className="shrink-0 mt-0.5 text-blue-600" />
                <span>
                  {isEs
                    ? 'La flota incluye SUVs de Lujo y Sprinter Vans para asegurar la máxima comodidad VIP.'
                    : 'Transportation options focus on Private Transfers, including Luxury SUVs and Sprinter Vans, catering to comfort and VIP needs.'}
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 border-b border-gray-100 pb-4 tracking-tight">
              {t.ratesTitle}
            </h2>
            <ul className="list-disc pl-5 space-y-3 mb-8 text-gray-700 text-sm md:text-base">
              <li>
                {isEs
                  ? `Traslado exclusivo y directo hacia ${seoData.nombre} servicio puerta a puerta profesional.`
                  : `Exclusive, non-stop transfer directly to ${seoData.nombre} door to door professional service.`}
              </li>
              <li>{isEs ? 'Salida flexible—tu horario, tu traslado.' : 'Flexible departure—your schedule, your transfer.'}</li>
              <li>
                {isEs
                  ? 'Vehículos modernos con choferes bilingües y bebidas de cortesía incluidas.'
                  : 'Modern, comfortable vehicles with licensed bilingual drivers, beverages included.'}
              </li>
              <li>
                {isEs
                  ? 'Viaja en vehículos lujosos, espaciosos y desinfectados.'
                  : 'Travel in spacious, sanitized, and air-conditioned luxury vehicles.'}
              </li>
              <li>
                {isEs
                  ? 'Precio garantizado—sin tarifas ocultas ni tarifas dinámicas.'
                  : 'Guaranteed pricing—no hidden fees or surge rates.'}
              </li>
            </ul>

            <div className="my-10 rounded-[2rem] overflow-hidden shadow-xl border border-gray-100">
              <img
                src="/hard-rock-lobby-van.webp"
                alt="Luxury Cabo Transportation"
                className="w-full h-auto object-cover max-h-[400px]"
              />
            </div>

            <p className="mb-4 text-gray-600 text-sm md:text-base">{t.ratesDesc}</p>
          </section>

          <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm my-10">
            <h3 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">{t.routeTitle}</h3>
            <div className="w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-inner border border-gray-200 bg-gray-200">
              {navigator.userAgent !== 'ReactSnap' ? (
                <iframe
                  title="Mapa de ubicación"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?saddr=${encodeURIComponent('Aeropuerto Internacional de Los Cabos')}&daddr=${encodeURIComponent(seoData.nombre + ' Los Cabos')}&output=embed`}
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">Mapa Interactivo</div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-gray-100 flex flex-col items-center justify-center">
                <Clock className="text-blue-900 mb-2" size={20} />
                <p className="font-bold text-gray-400 text-[10px] uppercase tracking-widest">{isEs ? 'Tiempo' : 'Time'}</p>
                <p className="text-gray-800 font-semibold text-sm">{isEs ? '3h Espera Incl.' : '3h Wait Incl.'}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-gray-100 flex flex-col items-center justify-center">
                <MapPin className="text-blue-900 mb-2" size={20} />
                <p className="font-bold text-gray-400 text-[10px] uppercase tracking-widest">{isEs ? 'Distancia' : 'Distance'}</p>
                <p className="text-gray-800 font-semibold text-sm">{isEs ? 'Ruta Directa' : 'Direct Route'}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-gray-100 flex flex-col items-center justify-center">
                <Map className="text-blue-900 mb-2" size={20} />
                <p className="font-bold text-gray-400 text-[10px] uppercase tracking-widest">{isEs ? 'Zona' : 'Zone'}</p>
                <p className="text-gray-800 font-semibold text-sm text-center leading-tight">{seoData.zonaText}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-gray-100 flex flex-col items-center justify-center">
                <ShieldCheck className="text-green-600 mb-2" size={20} />
                <p className="font-bold text-gray-400 text-[10px] uppercase tracking-widest">{isEs ? 'Servicio' : 'Service'}</p>
                <p className="text-gray-800 font-semibold text-sm">{isEs ? '100% Privado' : '100% Private'}</p>
              </div>
            </div>

            <p className="mt-6 text-gray-600 text-sm md:text-base">{t.routeDesc}</p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 border-b border-gray-100 pb-4 tracking-tight">
              {t.compareTitle}
            </h2>
            <p className="mb-6 text-gray-600 text-sm md:text-base">{t.compareDesc}</p>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border-2 border-blue-900 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-900 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                  {isEs ? 'Recomendado' : 'Recommended'}
                </div>
                <h4 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-2">
                  <Car size={20} /> {isEs ? 'Traslados Privados VIP' : 'Private VIP Transfers'}
                </h4>
                <p className="text-sm text-gray-600 font-medium">
                  {isEs
                    ? 'Servicio directo y personalizado hasta el lobby del restaurante. Sin esperas, privacidad total, y chofer esperándote.'
                    : 'Direct, personalized service to the restaurant. No wait times, total privacy, and chauffeur waiting for you.'}
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <h4 className="text-lg font-bold text-gray-700 flex items-center gap-2 mb-2">
                  <Users size={20} className="text-gray-400" /> {isEs ? 'Shuttles Compartidos' : 'Shared Shuttles'}
                </h4>
                <p className="text-sm text-gray-600 font-medium">
                  {isEs
                    ? 'No suelen ofrecer servicios de cena a restaurantes específicos, o limitan mucho los horarios.'
                    : 'Do not usually offer specific restaurant dinner services, or heavily limit schedules.'}
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <h4 className="text-lg font-bold text-gray-700 flex items-center gap-2 mb-2">
                  <Banknote size={20} className="text-gray-400" /> {isEs ? 'Taxis y Uber' : 'Taxis and Uber'}
                </h4>
                <p className="text-sm text-gray-600 font-medium">
                  {isEs
                    ? 'Disponibles al momento, pero las tarifas son impredecibles. Los Ubers frecuentemente no tienen acceso a comunidades cerradas donde se encuentran restaurantes exclusivos.'
                    : 'Readily available, but fares can be unpredictable. Ubers frequently face restrictions entering gated resort communities where exclusive restaurants are located.'}
                </p>
              </div>
            </div>
          </section>

          {/* BOOKING TIPS & TRAVELER REVIEWS CON LA FOTO DEL RESTAURANTE */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 border-b border-gray-100 pb-4 mt-12 tracking-tight">
              {t.tipsTitle}
            </h2>
            <p className="mb-6 text-sm md:text-base text-gray-600">{t.tipsDesc}</p>

            <div className="my-8 rounded-[2rem] overflow-hidden shadow-xl border border-gray-100">
              <img
                src={`/${seoData.imageDiners}`}
                alt={`Diners at ${seoData.nombre}`}
                className="w-full h-auto object-cover max-h-[400px]"
              />
            </div>
          </section>
        </div>

        {/* RIGHT: FORMULARIO LATERAL DE RESERVA */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <div className="sticky top-24 bg-white border border-gray-200 rounded-[2rem] shadow-xl p-6 md:p-8">
            <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-xl p-3.5 text-xs font-semibold mb-6">
              {isEs
                ? 'Incluye hasta 3 horas de espera en el restaurante con chofer privado bilingüe.'
                : 'Includes up to 3 hours of waiting time at the restaurant with a private bilingual chauffeur.'}
            </div>

            <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight">
              {isEs ? 'Cotiza tu Traslado Redondo' : 'Quote Round-Trip Transfer'}
            </h3>

            <div className="space-y-4">
              <div className="relative">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {isEs ? '¿De qué hotel sales?' : 'Departure Hotel'}
                </label>
                <input
                  type="text"
                  placeholder={isEs ? 'Busca tu hotel o villa...' : 'Search your hotel or villa...'}
                  value={busquedaCenaOrigen}
                  onChange={(e) => {
                    setBusquedaCenaOrigen(e.target.value);
                    setMostrarDropdownCena(true);
                    if (e.target.value === '') setCenaOrigen('');
                  }}
                  onFocus={() => setMostrarDropdownCena(true)}
                  onBlur={() => setTimeout(() => setMostrarDropdownCena(false), 200)}
                  className="w-full border border-gray-200 rounded-xl p-3.5 text-gray-700 bg-white font-medium focus:outline-none focus:border-blue-900 text-sm"
                />
                {mostrarDropdownCena && (
                  <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl shadow-2xl mt-1 max-h-56 overflow-y-auto">
                    {catalogoHoteles
                      .filter((h) =>
                        (busquedaCenaOrigen || '')
                          .toLowerCase()
                          .split(' ')
                          .every((w) =>
                            h.nombre
                              .normalize('NFD')
                              .replace(/[\u0300-\u036f]/g, '')
                              .toLowerCase()
                              .includes(w.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
                          )
                      )
                      .slice(0, 30)
                      .map((hotel, idx) => (
                        <li
                          key={`${hotel.id}-${idx}`}
                          onMouseDown={() => {
                            const zona = hotel.zonaId || hotel.zona || '1';
                            setCenaOrigen(`${hotel.nombre}|${zona}`);
                            setBusquedaCenaOrigen(`${hotel.nombre} (Zona ${zona})`);
                            setMostrarDropdownCena(false);
                          }}
                          className="p-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b border-gray-100 last:border-0 transition flex justify-between items-center text-xs"
                        >
                          <span className="font-semibold">{hotel.nombre}</span>
                          <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded-md">
                            {isEs ? 'Zona' : 'Zone'} {hotel.zonaId || hotel.zona || 1}
                          </span>
                        </li>
                      ))}
                  </ul>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {isEs ? 'Restaurante Destino' : 'Destination Restaurant'}
                </label>
                <input
                  type="text"
                  value={cenaRestauranteNombre}
                  onChange={(e) => setCenaRestauranteNombre(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3.5 text-gray-700 bg-gray-50 font-bold text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    {isEs ? 'Fecha' : 'Date'}
                  </label>
                  <input
                    type="date"
                    value={cenaFecha}
                    onChange={(e) => setCenaFecha(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3.5 text-gray-700 bg-white font-medium text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    {isEs ? 'Pasajeros' : 'Passengers'}
                  </label>
                  <select
                    value={cenaPax}
                    onChange={(e) => setCenaPax(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3.5 text-gray-700 bg-white font-medium text-sm"
                  >
                    <option value="1-4">1 - 4 Pax</option>
                    <option value="5-8">5 - 8 Pax</option>
                    <option value="9-10">9 - 10 Pax</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    {isEs ? 'Recogida Hotel' : 'Hotel Pickup'}
                  </label>
                  <input
                    type="time"
                    value={cenaHora}
                    onChange={(e) => setCenaHora(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3.5 text-gray-700 bg-white font-medium text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    {isEs ? 'Regreso' : 'Return Time'}
                  </label>
                  <input
                    type="time"
                    value={cenaHoraRegreso}
                    onChange={(e) => setCenaHoraRegreso(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3.5 text-gray-700 bg-white font-medium text-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-4 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                      {isEs ? 'Viaje Redondo Privado' : 'Private Round-Trip Rate'}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {totalPrecioCena > 0
                        ? isEs
                          ? 'Impuestos y espera incluidos'
                          : 'Taxes & 3h wait time included'
                        : isEs
                          ? 'Selecciona tu hotel para cotizar'
                          : 'Select your hotel for exact rate'}
                    </span>
                  </div>
                  <div className="text-right">
                    {totalPrecioCena > 0 ? (
                      <span className="text-2xl font-black text-gray-900">
                        ${granTotalCena} <span className="text-xs font-bold text-gray-500">USD</span>
                      </span>
                    ) : (
                      <span className="text-sm font-black text-blue-900 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 inline-block">
                        {isEs ? 'Desde $120 USD' : 'From $120 USD'}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (setServicioSeleccionado) setServicioSeleccionado('tours');
                    if (setSubCategoria) setSubCategoria('especiales');
                    if (setVistaEspecial) setVistaEspecial('cenas');
                    if (setReserva && cenaOrigen) {
                      setReserva((prev) => ({
                        ...prev,
                        tipoEspecial: 'cena',
                        precioBaseEspecial: granTotalCena || 120,
                        cenaRestaurante: cenaRestauranteNombre,
                        cenaOrigen,
                        cenaPax,
                        cenaHora,
                        cenaHoraRegreso
                      }));
                    }
                    if (setPaso) setPaso(2);
                    navigate('/');
                    window.scrollTo(0, 0);
                  }}
                  className="w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all text-base bg-blue-900 hover:bg-blue-800 text-white shadow-lg"
                >
                  <Plus size={18} className="mr-2" /> {isEs ? 'Reservar Traslado Redondo' : 'Book Round-Trip Transfer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* SECCIÓN FINAL: OTROS RESTAURANTES POPULARES EN LOS CABOS */}
      {/* ========================================= */}
      <div className="max-w-6xl mx-auto px-4 pb-16 mt-10">
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold text-blue-900 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
                {isEs ? 'Gastronomía en Los Cabos' : 'Fine Dining Destinations'}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                {isEs ? 'Otros Restaurantes Populares en Los Cabos' : 'Other Popular Restaurants in Los Cabos'}
              </h2>
              <p className="text-gray-500 text-sm mt-1 max-w-2xl font-medium">
                {isEs
                  ? 'Descubre opciones de transporte privado redondo con chofer bilingüe y hasta 3 horas de espera incluida en los mejores restaurantes de Los Cabos.'
                  : 'Discover private round-trip dinner transfer options with bilingual chauffeurs and up to 3 hours of waiting time included at top restaurants in Los Cabos.'}
              </p>
            </div>
            <Link
              to="/transportation/dinner-and-restaurants"
              className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 shrink-0 group self-start md:self-auto"
            >
              <span>{isEs ? 'Ver todos los restaurantes' : 'View all restaurants'}</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurantSEOData
              .filter((r) => r.slug !== slug)
              .sort((a, b) => (a.zona === seoData.zona ? -1 : 1) - (b.zona === seoData.zona ? -1 : 1))
              .map((item) => (
                <Link
                  key={item.slug}
                  to={`/restaurants/${item.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-900/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={`/${item.imageDiners || item.image || 'diners-sjc.webp'}`}
                      alt={`Transfer to ${item.nombre}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = '/suburban-airport-los-cabos-ballard.webp';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-950/80 backdrop-blur-md text-white border border-white/10">
                        {item.zonaText}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base group-hover:text-blue-900 transition-colors line-clamp-1 mb-2">
                        {item.nombre}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mb-4">
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-gray-400" /> {isEs ? '3 hrs espera incl.' : '3 hrs wait incl.'}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={13} className="text-gray-400" /> {item.zonaText}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-blue-900">
                      <span>{isEs ? 'Ver información y tarifas' : 'View rates & transfer'}</span>
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <FAQSection lang={lang} />
      </div>
    </div>
  );
}


