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
                    {/* ================= REDES SOCIALES ================= */}
                    <div className="flex flex-col items-center mt-10 mb-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 tracking-wide">
                            Follow Us on Social Media
                        </h3>

                        <div className="flex space-x-6">

                            {/* --- FACEBOOK --- */}
                            <a
                                href="https://www.facebook.com/ballardtourservices"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-[#1877F2] transition-colors duration-300 transform hover:scale-110"
                                aria-label="Facebook"
                            >
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>

                            {/* --- INSTAGRAM --- */}
                            <a
                                href="https://www.instagram.com/ballardtours/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-[#E4405F] transition-colors duration-300 transform hover:scale-110"
                                aria-label="Instagram"
                            >
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>

                            {/* --- TIKTOK --- */}
                            <a
                                href="https://www.tiktok.com/@ballardtours"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-black transition-colors duration-300 transform hover:scale-110"
                                aria-label="TikTok"
                            >
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.39-3.16-3.8-5.46-.4-2.08-.04-4.28 1.09-6.09 1.54-2.52 4.54-3.81 7.42-3.15v4.06c-1.57-.46-3.32-.01-4.45 1.13-1.04 1.08-1.37 2.69-1.04 4.16.32 1.44 1.45 2.62 2.87 3.02 1.34.37 2.8-.02 3.8-1.01.88-.86 1.32-2.12 1.28-3.37.04-4.49.02-8.98.02-13.47.01-1.93.01-3.86.02-5.79z" clipRule="evenodd" />
                                </svg>
                            </a>

                        </div>
                    </div>
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
                            <Link to="/terms-and-conditions" className="text-sm text-gray-500 hover:text-blue-600 hover:underline transition-colors">
                                Términos y Condiciones
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy-policy" className="text-blue-200 hover:text-white hover:underline transition-all">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="/politicas-de-cancelacion" className="text-sm text-gray-500 hover:text-blue-600 hover:underline transition-colors">
                                Políticas de Cancelación
                            </Link>
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