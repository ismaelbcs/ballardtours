import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown } from 'lucide-react';

export const FAQSection = ({ lang }) => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      q: { 
        es: "¿Cómo encuentro a mi chofer en el Aeropuerto de Los Cabos (SJD)?", 
        en: "How do I find my driver at SJD Los Cabos Airport?" 
      },
      a: { 
        es: "Después de recoger su equipaje y pasar aduana, por favor ignore a los representantes de tiempo compartido dentro de la terminal. Salga directamente del edificio; su chofer bilingüe lo estará esperando afuera con un letrero personalizado con su nombre.", 
        en: "Once you clear customs and grab your luggage, please ignore the timeshare representatives inside the terminal. Walk straight outside to the designated transportation area; your bilingual driver will be waiting holding a personalized sign with your name." 
      }
    },
    {
      q: { 
        es: "¿A qué áreas de Los Cabos ofrecen servicio de transporte?", 
        en: "What areas do you provide transportation to in Los Cabos?" 
      },
      a: { 
        es: "Ofrecemos transporte privado a todos los resorts y destinos de Baja California Sur. Nuestras rutas principales incluyen San José del Cabo, el Corredor Turístico, Cabo San Lucas y la Zona del Pacífico (Diamante, Nobu, Hard Rock).", 
        en: "We offer private transportation across the entire Baja California Sur peninsula. Our main routes include San Jose del Cabo, the Tourist Corridor, Cabo San Lucas, and the Pacific Zone (Diamante, Nobu, Hard Rock)." 
      }
    },
    {
      q: { 
        es: "¿El servicio de transporte de aeropuerto es compartido o privado?", 
        en: "Are your airport transfer services shared or private?" 
      },
      a: { 
        es: "Todos los traslados de Ballard Tours son 100% privados. Nunca compartirá su SUV de lujo o van Sprinter con desconocidos, garantizando un viaje directo y sin paradas hacia su hotel.", 
        en: "All Ballard Tours airport shuttles and transfers are 100% private. You will never share your luxury SUV or Sprinter van with strangers, ensuring a direct, non-stop ride to your resort." 
      }
    },
    {
      q: { 
        es: "¿Proporcionan sillas de bebé o asientos elevados (boosters)?", 
        en: "Do you provide child car seats or boosters?" 
      },
      a: { 
        es: "Sí, la seguridad de su familia es nuestra prioridad. Ofrecemos sillas para bebés y asientos elevados sin costo adicional. Solo tiene que solicitarlos durante su reserva y estarán instalados en su vehículo.", 
        en: "Yes, family safety is our top priority. We provide infant car seats, baby seats, and booster seats absolutely free of charge. Simply request them during your booking process, and they will be pre-installed in your vehicle." 
      }
    },
    {
      q: { 
        es: "¿Podemos hacer una parada para comprar despensa en el camino al hotel?", 
        en: "Can we stop for groceries or drinks on the way to our hotel?" 
      },
      a: { 
        es: "¡Por supuesto! Ofrecemos una parada de compras pre-programada (hasta por 1 hora) en tiendas populares como Costco, Walmart o Fresko por una pequeña tarifa adicional de $30 USD. Puede seleccionar esta opción al reservar.", 
        en: "Absolutely! We offer a pre-arranged shopping stop (up to 1 hour) at popular stores like Costco, Walmart, or Fresko for a small additional fee of $30 USD. Just select the 'Shopping Stop' option when booking online." 
      }
    },
    {
      q: { 
        es: "¿Qué sucede si mi vuelo de llegada se retrasa?", 
        en: "What happens if my incoming flight is delayed?" 
      },
      a: { 
        es: "Incluimos monitoreo de vuelos en tiempo real sin costo. Si su vuelo se retrasa o llega antes, nuestro equipo ajusta el horario de su chofer automáticamente. Estaremos allí cuando aterrice, sin cargos extra.", 
        en: "We include complimentary real-time flight tracking with all our airport transfers. If your flight is delayed or arrives early, our dispatch team adjusts your driver's schedule automatically. We will be there when you land, at no extra cost." 
      }
    },
    {
      q: { 
        es: "¿Qué tipo de vehículos utilizan para los traslados?", 
        en: "What type of vehicles do you use for your transportation services?" 
      },
      a: { 
        es: "Nuestra flota premium consiste en vehículos de modelo reciente con clima controlado. Utilizamos SUV de Lujo (como Chevrolet Suburban) para hasta 6 pasajeros, y amplias Vanes Mercedes Benz Sprinter para grupos de hasta 10 pasajeros.", 
        en: "Our premium fleet consists of late-model, climate-controlled vehicles. We use Luxury SUVs (like Chevrolet Suburbans) for up to 6 passengers, and spacious Mercedes Benz Sprinter Vans for larger groups of up to 10 passengers." 
      }
    },
    {
      q: { 
        es: "¿Sus precios incluyen impuestos y cuotas de autopista?", 
        en: "Do your prices include taxes and toll roads?" 
      },
      a: { 
        es: "Sí, nuestras tarifas fijas son con todo incluido. El precio que ve en la página cubre impuestos federales de aeropuerto, casetas de cobro y seguro del vehículo. No hay tarifas ocultas al llegar.", 
        en: "Yes, our flat-rate pricing is all-inclusive. The price you see covers federal airport taxes, toll roads, and vehicle insurance. There are no hidden fees upon arrival." 
      }
    }
  ];

  // Generador dinámico de Schema Markup para Google
  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q[lang],
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a[lang]
      }
    }))
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaFAQ)}
        </script>
      </Helmet>
      
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
          {lang === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
        </h2>
        <p className="text-gray-600 text-lg">
          {lang === 'es' ? 'Todo lo que necesitas saber sobre nuestra logística y servicios.' : 'Everything you need to know about our transportation logistics and services.'}
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`border ${openFAQ === index ? 'border-blue-900 bg-blue-50/30' : 'border-gray-200 bg-white'} rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md`}
          >
            <button
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
            >
              <span className={`font-bold text-lg ${openFAQ === index ? 'text-blue-900' : 'text-gray-800'}`}>
                {faq.q[lang]}
              </span>
              <ChevronDown 
                className={`transform transition-transform duration-300 text-blue-600 shrink-0 ml-4 ${openFAQ === index ? 'rotate-180' : 'rotate-0'}`} 
                size={24} 
              />
            </button>
            <div 
              className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFAQ === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                {faq.a[lang]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};