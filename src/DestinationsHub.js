import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const DestinationsHub = ({ hoteles }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHoteles = hoteles.filter(hotel => 
    hotel.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Los Cabos Airport to Hotel Transfers | Resort Directory</title>
        <meta name="description" content="Find premium private transportation to the most visited destinations and resorts in Los Cabos, Mexico. Direct airport shuttles." />
        <link rel="canonical" href="https://www.ballardtours.com/destinations" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-16 mt-20">
        <h1 className="text-4xl md:text-5xl font-black text-blue-900 mb-6">
          Most Visited Los Cabos Destinations
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Select your resort to view specific private transfer rates from SJD Airport.
        </p>

        {/* Buscador */}
        <div className="mb-10 max-w-2xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for your hotel or resort..."
              className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-lg transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Cuadrícula de Hoteles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHoteles.length > 0 ? (
            filteredHoteles.map((hotel) => (
              <Link 
                key={hotel.slug} 
                to={`/destinations/${hotel.slug}`}
                className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={hotel.imagen} alt={hotel.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{hotel.nombre}</h2>
                  <p className="text-sm text-blue-600 font-semibold flex items-center gap-1">
                    View Transfer Rates &rarr;
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              <p className="text-lg">No resorts found matching "{searchTerm}"</p>
              <button 
                onClick={() => setSearchTerm('')} 
                className="mt-4 text-blue-600 font-medium hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DestinationsHub;