import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, MessageCircle, Send, User, BookOpen, CheckCircle, Mail } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // Asegúrate de que la ruta a tu archivo firebase.js sea correcta
import { FAQSection } from './FAQSection'; // <-- AQUÍ IMPORTAMOS LAS PREGUNTAS FRECUENTES

export default function Contact({ lang = 'es' }) { // <-- Agregamos 'lang' por defecto para el idioma
  const [formData, setFormData] = useState({
    nombre: '',
    asunto: '',
    comentario: ''
  });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const maxLength = 600;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    try {
      // Reutilizamos tu lógica de Firebase para enviar correos
      await addDoc(collection(db, "correos"), {
        to: "reservationballard@gmail.com",
        message: {
          subject: `NUEVO MENSAJE WEB: ${formData.asunto} - ${formData.nombre}`,
          html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; padding: 30px; color: #1e293b;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 30px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <h2 style="color: #1e3a8a; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Nuevo Mensaje de Contacto</h2>
                <p style="font-size: 16px;"><strong>👤 Cliente:</strong> ${formData.nombre}</p>
                <p style="font-size: 16px;"><strong>📌 Asunto:</strong> ${formData.asunto}</p>
                <h3 style="color: #64748b; font-size: 14px; text-transform: uppercase; margin-top: 25px;">Mensaje:</h3>
                <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
                  ${formData.comentario}
                </div>
              </div>
            </div>
          `
        }
      });
      setEnviado(true);
      setFormData({ nombre: '', asunto: '', comentario: '' });
      
      // Regresamos el formulario a la normalidad después de 5 segundos
      setTimeout(() => setEnviado(false), 5000);
    } catch (error) {
      console.error("Error al enviar el mensaje: ", error);
      alert("Hubo un error al conectar con el servidor. Por favor, intenta contactarnos por WhatsApp.");
    }
    
    setEnviando(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Evitar que escriban más del límite de caracteres
    if (name === 'comentario' && value.length > maxLength) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Ballard Tour Services</title>
        <meta name="description" content="Get in touch with Ballard Tours in Los Cabos. Call us, send a WhatsApp message, or email us directly for your private transportation needs." />
        <link rel="canonical" href="https://www.ballardtours.com/contact" />
      </Helmet>

      <section className="bg-gray-50 min-h-screen">
        {/* HERO SECTION */}
        <div className="bg-blue-900 text-white pt-32 pb-24 px-4 text-center rounded-b-[3rem] shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=2000')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Get in Touch</h1>
            <p className="text-lg md:text-xl text-blue-100 font-medium max-w-2xl mx-auto">
              We are here to help you plan the perfect Los Cabos experience. Reach out to our local experts 24/7.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 -mt-12 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
          
          {/* COLUMNA IZQUIERDA: TARJETAS DE CONTACTO DIRECTO */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* WhatsApp 1 */}
            <a href="https://wa.me/526241393497" target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex items-start gap-4 hover:-translate-y-1 hover:border-green-400 transition-all group">
              <div className="bg-green-100 text-green-600 p-3 rounded-xl group-hover:bg-green-500 group-hover:text-white transition-colors">
                <MessageCircle size={28} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">WhatsApp (Reservations)</h3>
                <p className="text-gray-500 mb-1">+52 (624) 139-3497</p>
                <span className="text-xs font-bold text-green-600">Click to chat &rarr;</span>
              </div>
            </a>

            {/* WhatsApp 2 */}
            <a href="https://wa.me/526121943286" target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex items-start gap-4 hover:-translate-y-1 hover:border-green-400 transition-all group">
              <div className="bg-green-100 text-green-600 p-3 rounded-xl group-hover:bg-green-500 group-hover:text-white transition-colors">
                <MessageCircle size={28} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">WhatsApp (Support)</h3>
                <p className="text-gray-500 mb-1">+52 (612) 194-3286</p>
                <span className="text-xs font-bold text-green-600">Click to chat &rarr;</span>
              </div>
            </a>

            {/* Teléfono */}
            <a href="tel:+526241393497" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex items-start gap-4 hover:-translate-y-1 hover:border-blue-400 transition-all group">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Call Us Directly</h3>
                <p className="text-gray-500 mb-1">+52 (624) 139-3497</p>
                <span className="text-xs font-bold text-blue-600">Click to call &rarr;</span>
              </div>
            </a>

            {/* Correo */}
            <a href="mailto:reservationballard@gmail.com" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex items-start gap-4 hover:-translate-y-1 hover:border-blue-400 transition-all group">
              <div className="bg-gray-100 text-gray-600 p-3 rounded-xl group-hover:bg-gray-800 group-hover:text-white transition-colors">
                <Mail size={28} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Email Us</h3>
                <p className="text-gray-500 text-sm mb-1 break-all">reservationballard@gmail.com</p>
                <span className="text-xs font-bold text-gray-600">Click to email &rarr;</span>
              </div>
            </a>

          </div>

          {/* COLUMNA DERECHA: FORMULARIO DE CORREO */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl border border-gray-100 h-full">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-900 mb-2">Send us a message</h2>
                <p className="text-gray-500">Fill out the form below and our team will get back to you shortly.</p>
              </div>

              {enviado ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-10 text-center flex flex-col items-center justify-center h-[300px] animate-fade-in">
                  <CheckCircle size={64} className="text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-green-600">Hemos recibido tu correo. Te contactaremos muy pronto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Tu Nombre</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input 
                        type="text" 
                        name="nombre" 
                        required 
                        value={formData.nombre} 
                        onChange={handleChange} 
                        placeholder="Ej. John Doe"
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-gray-800 focus:border-blue-900 focus:ring-0 outline-none transition-colors font-medium" 
                      />
                    </div>
                  </div>

                  {/* Asunto */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Asunto</label>
                    <div className="relative">
                      <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input 
                        type="text" 
                        name="asunto" 
                        required 
                        value={formData.asunto} 
                        onChange={handleChange} 
                        placeholder="Ej. Cotización para grupo de 15 personas"
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-gray-800 focus:border-blue-900 focus:ring-0 outline-none transition-colors font-medium" 
                      />
                    </div>
                  </div>

                  {/* Comentario */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Comentario</label>
                      <span className={`text-xs font-bold ${formData.comentario.length >= maxLength ? 'text-red-500' : 'text-gray-400'}`}>
                        {formData.comentario.length} / {maxLength}
                      </span>
                    </div>
                    <textarea 
                      name="comentario" 
                      required 
                      rows="5"
                      value={formData.comentario} 
                      onChange={handleChange} 
                      placeholder="Escribe aquí tu duda o requerimiento..."
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-gray-800 focus:border-blue-900 focus:ring-0 outline-none transition-colors font-medium resize-none" 
                    ></textarea>
                  </div>

                  {/* Botón Enviar */}
                  <button 
                    type="submit" 
                    disabled={enviando}
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white font-black py-4 px-8 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wide"
                  >
                    {enviando ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Mensaje <Send size={20} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 🔥 AQUÍ INYECTAMOS LAS PREGUNTAS FRECUENTES (SEO) 🔥 */}
        <div className="bg-white border-t border-gray-200 pt-8 pb-16">
          <FAQSection lang={lang} />
        </div>

      </section>
    </>
  );
}