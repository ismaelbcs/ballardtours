import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function AboutUs() {
  return (
    <>
      <Helmet>
        <title>About Us | Ballard Tour Services Los Cabos</title>
        <meta name="description" content="Trusted Airport Transportation, Private Transfers, Tours & Activities in Los Cabos Since 2005. Learn more about Ballard Tour Services." />
        <link rel="canonical" href="https://www.ballardtours.com/about-us" />
      </Helmet>

      <section className="max-w-4xl mx-auto px-4 py-16 mt-20 text-gray-800 bg-white">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">
            About Ballard Tour Services
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Trusted Airport Transportation, Private Transfers,
            Tours & Activities in Los Cabos Since 2005
          </p>
        </div>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            Ballard Tour Services is a professional transportation and tourism
            company based in Los Cabos, Baja California Sur, Mexico.
            Since our foundation in 2005, we have proudly provided reliable,
            safe, and comfortable transportation services for thousands of
            visitors traveling to Los Cabos every year.
          </p>

          <p>
            For more than 20 years, our mission has been simple:
            deliver exceptional customer service, punctual airport
            transportation, professional drivers, and unforgettable
            travel experiences throughout Los Cabos.
          </p>

          <p>
            We specialize in private airport transportation from
            Los Cabos International Airport (SJD) to hotels,
            resorts, vacation rentals, villas, residences, weddings,
            restaurants, marinas, golf courses, and tourist attractions
            across Cabo San Lucas, San José del Cabo, the Tourist Corridor,
            Puerto Los Cabos, Diamante, East Cape, Todos Santos,
            La Paz, Cabo Pulmo, and surrounding destinations.
          </p>

          <p>
            Our transportation services include airport transfers,
            hotel transportation, private charters, wedding transportation,
            corporate transportation, group transportation,
            hourly transportation services, dinner transportation,
            and customized transportation solutions for families,
            couples, and large groups.
          </p>

          <p>
            In addition to transportation, Ballard Tour Services
            offers a wide variety of tours and activities in Los Cabos,
            helping visitors discover the best experiences Baja California Sur
            has to offer. Whether you are looking for a luxury yacht,
            snorkeling adventure, whale watching tour, camel ride,
            ATV excursion, glass-bottom boat tour, sunset cruise,
            fishing charter, tequila tasting experience,
            or a private city tour, our team can help you create
            the perfect vacation.
          </p>

          <p>
            We are fully committed to operating legally and professionally.
            Ballard Tour Services maintains all permits, licenses,
            registrations, insurance policies, and operational requirements
            required by Mexican authorities for tourist transportation
            services in Baja California Sur.
          </p>

          <p>
            Our experienced drivers are knowledgeable about the region,
            bilingual, customer-focused, and dedicated to providing
            a smooth and stress-free experience from the moment
            you arrive at Los Cabos Airport until you reach your destination.
          </p>

          <h2 className="text-2xl font-bold text-blue-900 mt-10 mb-4 border-b pb-2">
            Popular Airport Transportation Routes
          </h2>

          <ul className="grid md:grid-cols-2 gap-3 list-disc pl-6 text-sm">
            <li>Airport SJD to Nobu Hotel Los Cabos</li>
            <li>Airport SJD to Hard Rock Hotel Los Cabos</li>
            <li>Airport SJD to Riu Palace Baja California</li>
            <li>Airport SJD to Riu Santa Fe</li>
            <li>Airport SJD to Grand Velas Los Cabos</li>
            <li>Airport SJD to Waldorf Astoria Los Cabos Pedregal</li>
            <li>Airport SJD to Marquis Los Cabos</li>
            <li>Airport SJD to Secrets Puerto Los Cabos</li>
            <li>Airport SJD to Hilton Los Cabos</li>
            <li>Airport SJD to Hyatt Ziva Los Cabos</li>
            <li>Airport SJD to Dreams Los Cabos Suites Golf Resort & Spa</li>
            <li>Airport SJD to Breathless Cabo San Lucas</li>
            <li>Airport SJD to Pueblo Bonito Sunset Beach</li>
            <li>Airport SJD to Pueblo Bonito Pacifica</li>
            <li>Airport SJD to Garza Blanca Los Cabos</li>
            <li>Airport SJD to Le Blanc Spa Resort Los Cabos</li>
            <li>Airport SJD to Solaz Resort Los Cabos</li>
            <li>Airport SJD to Four Seasons Cabo Del Sol</li>
            <li>Airport SJD to One&Only Palmilla</li>
            <li>Airport SJD to Zadún Ritz-Carlton Reserve</li>
            <li>Airport SJD to JW Marriott Los Cabos</li>
            <li>Airport SJD to The Cape Hotel</li>
            <li>Airport SJD to Villa del Palmar</li>
            <li>Airport SJD to Villa La Valencia</li>
            <li>Airport SJD to Sandos Finisterra</li>
          </ul>

          <h2 className="text-2xl font-bold text-blue-900 mt-10 mb-4 border-b pb-2">
            Why Choose Ballard Tour Services?
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Operating since 2005.</li>
            <li>Licensed and insured transportation company.</li>
            <li>Private transportation available 24/7.</li>
            <li>Professional bilingual drivers.</li>
            <li>Flight tracking for airport arrivals.</li>
            <li>Transportation for individuals, families, and groups.</li>
            <li>Tours and activities available throughout Los Cabos.</li>
            <li>Reliable, safe, and punctual service.</li>
            <li>Thousands of satisfied visitors.</li>
          </ul>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-12 text-center">
            <h3 className="text-xl font-bold text-blue-900 mb-3">
              Ballard Tour Services
            </h3>
            <p className="text-sm font-semibold text-gray-600 mb-4">
              Airport Transportation • Private Transfers • Tours & Activities
            </p>
            <div className="text-sm text-gray-700 space-y-1">
              <p>Los Cabos, Baja California Sur, Mexico</p>
              <p>Phone: +52 624 139 3497</p>
              <p>Email: <a href="mailto:reservationballard@gmail.com" className="text-blue-600 hover:underline">reservationballard@gmail.com</a></p>
              <p>Website: <a href="https://www.ballardtours.com" className="text-blue-600 hover:underline">www.ballardtours.com</a></p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}