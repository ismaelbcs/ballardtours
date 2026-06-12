import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white py-16 mt-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">

                {/* 1. Datos Visibles (NAP: Name, Address, Phone) */}
                <div>
                    <h3 className="text-3xl font-black mb-6">Ballard Tours</h3>
                    {/* ================= INFORMACIÓN DE CONTACTO (AZUL CORPORATIVO) ================= */}
                    <div className="bg-blue-900 text-white p-8 sm:p-10 rounded-lg max-w-md w-full shadow-xl">

                        <h2 className="text-3xl font-bold border-b border-blue-700 pb-3 mb-6">
                            Contact Information
                        </h2>

                        <h3 className="text-2xl font-bold mb-6">
                            Get in Touch
                        </h3>

                        <div className="space-y-4 text-lg">

                            {/* --- UBICACIÓN (Abre Google Maps) --- */}
                            <a
                                href="https://maps.app.goo.gl/1bmFeQCRgwVfs9GZ9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-4 hover:text-blue-200 transition-colors duration-300 group"
                            >
                                <svg className="w-6 h-6 text-red-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                                <span>Cabo San Lucas, Baja California Sur, Mexico.</span>
                            </a>

                            {/* --- LLAMADA TELEFÓNICA (Abre la app de teléfono) --- */}
                            <a
                                href="tel:+526241393497"
                                className="flex items-center gap-4 hover:text-blue-200 transition-colors duration-300 group"
                            >
                                <svg className="w-6 h-6 text-green-400 flex-shrink-0 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                                <span>+52 (624) 139-3497</span>
                            </a>

                            {/* --- WHATSAPP 1 (Abre chat directo) --- */}
                            <a
                                href="https://wa.me/526241393497"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 hover:text-blue-200 transition-colors duration-300 group"
                            >
                                <svg className="w-6 h-6 text-white flex-shrink-0 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.46 14.15c-.23.64-1.33 1.23-1.84 1.34-.48.11-1.12.23-3.23-.64-2.52-1.04-4.14-3.61-4.26-3.78-.13-.17-1.02-1.36-1.02-2.6 0-1.24.64-1.85.87-2.1.22-.24.48-.3.64-.3h.46c.16 0 .38-.06.59.43.23.55.77 1.88.84 2.02.06.14.11.3.02.49-.09.18-.13.3-.26.46-.13.15-.27.32-.38.44-.13.13-.26.28-.11.54.15.26.68 1.13 1.46 1.83.99.9 1.85 1.19 2.11 1.32.26.13.41.11.57-.08.15-.2.67-.78.85-1.04.18-.26.36-.22.6-.13.24.09 1.54.73 1.81.86.26.13.44.2.5.31.06.11.06.66-.17 1.3z" />
                                </svg>
                                <span>+52 (624) 139-3497</span>
                            </a>

                            {/* --- WHATSAPP 2 (Abre chat directo) --- */}
                            <a
                                href="https://wa.me/526121943286"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 hover:text-blue-200 transition-colors duration-300 group"
                            >
                                <svg className="w-6 h-6 text-white flex-shrink-0 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.46 14.15c-.23.64-1.33 1.23-1.84 1.34-.48.11-1.12.23-3.23-.64-2.52-1.04-4.14-3.61-4.26-3.78-.13-.17-1.02-1.36-1.02-2.6 0-1.24.64-1.85.87-2.1.22-.24.48-.3.64-.3h.46c.16 0 .38-.06.59.43.23.55.77 1.88.84 2.02.06.14.11.3.02.49-.09.18-.13.3-.26.46-.13.15-.27.32-.38.44-.13.13-.26.28-.11.54.15.26.68 1.13 1.46 1.83.99.9 1.85 1.19 2.11 1.32.26.13.41.11.57-.08.15-.2.67-.78.85-1.04.18-.26.36-.22.6-.13.24.09 1.54.73 1.81.86.26.13.44.2.5.31.06.11.06.66-.17 1.3z" />
                                </svg>
                                <span>+52 (612) 194-3286</span>
                            </a>

                            {/* --- CORREO ELECTRÓNICO (Abre app de correo) --- */}
                            <a
                                href="mailto:reservationballard@gmail.com"
                                className="flex items-center gap-4 hover:text-blue-200 transition-colors duration-300 group"
                            >
                                <svg className="w-6 h-6 text-white flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                <span className="truncate">reservationballard@gmail.com</span>
                            </a>

                        </div>
                    </div>
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
                    <h4 className="text-2xl font-bold text-white mb-6 border-b border-blue-700 pb-3 inline-block w-full">
                        Company
                    </h4>
                    <ul className="flex flex-col space-y-4 text-lg text-blue-100">
                        <li>
                            <Link
                                to="/about-us"
                                onClick={() => window.scrollTo(0, 0)}
                                className="inline-block hover:text-white hover:translate-x-1 transition-all duration-300"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                onClick={() => window.scrollTo(0, 0)}
                                className="inline-block hover:text-white hover:translate-x-1 transition-all duration-300"
                            >
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/flotas"
                                onClick={() => window.scrollTo(0, 0)}
                                className="inline-block hover:text-white hover:translate-x-1 transition-all duration-300 font-bold text-amber-400"
                            >
                                Flotas
                            </Link>
                        </li>
                        {/* 👇 AQUÍ ESTÁ EL NUEVO ENLACE DE TOURS 👇 */}
                        <li>
                            <Link
                                to="/tours"
                                onClick={() => window.scrollTo(0, 0)}
                                className="inline-block hover:text-white hover:translate-x-1 transition-all duration-300 font-bold text-orange-400"
                            >
                                Tours & Excursions
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* 3. Páginas Legales */}
                <div>
                    <h4 className="text-2xl font-bold text-white mb-6 border-b border-blue-700 pb-3 inline-block w-full">
                        Legal
                    </h4>
                    <ul className="flex flex-col space-y-4 text-lg text-blue-100">
                        <li>
                            <Link
                                to="/terms-and-conditions"
                                onClick={() => window.scrollTo(0, 0)}
                                className="inline-block hover:text-white hover:translate-x-1 transition-all duration-300"
                            >
                                Términos y Condiciones
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/privacy-policy"
                                onClick={() => window.scrollTo(0, 0)}
                                className="inline-block hover:text-white hover:translate-x-1 transition-all duration-300"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/politicas-de-cancelacion"
                                onClick={() => window.scrollTo(0, 0)}
                                className="inline-block hover:text-white hover:translate-x-1 transition-all duration-300"
                            >
                                Políticas de Cancelación
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Barra inferior de Copyright */}
            <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-blue-800 text-center text-blue-400 text-sm">
                <p>© {new Date().getFullYear()} Ballard Tours Los Cabos. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;