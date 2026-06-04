import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const DestinationsHub = ({ hoteles }) => {
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
        <p className="text-xl text-gray-600 mb-12">
          Select your resort to view specific private transfer rates from SJD Airport.
        </p>

        {/* Cuadrícula de Hoteles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hoteles.map((hotel) => (
            <Link 
              key={hotel.slug} 
              to={`/destinations/${hotel.slug}`}
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="h-48 overflow-hidden relative">
                {/* Asumiendo que tienes una imagen por hotel */}
                <img src={hotel.imagen} alt={hotel.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{hotel.nombre}</h2>
                <p className="text-sm text-blue-600 font-semibold flex items-center gap-1">
                  View Transfer Rates &rarr;
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default DestinationsHub;