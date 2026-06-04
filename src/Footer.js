import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* 1. Datos Visibles (NAP: Name, Address, Phone) */}
        <div>
          <h3 className="text-3xl font-black mb-6">Ballard Tours</h3>
          <p className="text-blue-200 mb-3">
            <strong>Address:</strong> Cabo San Lucas, Baja California Sur, Mexico
          </p>
          <p className="text-blue-200 mb-3">
            {/* Recuerda cambiar este número por el tuyo si es diferente */}
            <strong>Phone / WhatsApp:</strong> <a href="tel:+526121943286" className="hover:text-white transition-colors">+52 612 194 3286</a>
          </p>
          <p className="text-blue-300 text-sm mt-6">
            Premium private transportation and luxury tours in Los Cabos. Reliable, comfortable, and always on time.
          </p>
        </div>

        {/* 2. Páginas de Confianza */}
        <div>
          <h4 className="text-xl font-bold mb-6 border-b border-blue-800 pb-2 inline-block">Company</h4>
          <ul className="space-y-3">
            <li>
              <Link to="/about-us" className="text-blue-200 hover:text-white hover:underline transition-all">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="text-blue-200 hover:text-white hover:underline transition-all">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* 3. Páginas Legales */}
        <div>
          <h4 className="text-xl font-bold mb-6 border-b border-blue-800 pb-2 inline-block">Legal</h4>
          <ul className="space-y-3">
            <li>
              <Link to="/terms-and-conditions" className="text-blue-200 hover:text-white hover:underline transition-all">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="text-blue-200 hover:text-white hover:underline transition-all">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/cancellation-policy" className="text-blue-200 hover:text-white hover:underline transition-all">Cancellation Policy</Link>
            </li>
          </ul>
        </div>

      </div>
      
      {/* Barra inferior de Copyright */}
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-blue-800 text-center text-blue-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Ballard Tours Los Cabos. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;