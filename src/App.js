import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from './firebase';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { translations } from './data/translations';
import {
  landingPagesSEO,
  toursLandingPages,
  catalogoHoteles,
  zonasData, // <--- AGREGA ESTO
  toursData  // <--- AGREGA ESTO
} from './data/seoData';
import {
  PlaneLanding, PlaneTakeoff, RefreshCw, Map as MapIcon, Car, Users,
  Calendar, Clock, ChevronRight, ChevronLeft, CheckCircle, Info, User,
  Phone, Mail, MapPin, ShieldCheck, Palmtree, Search, Compass, Check,
  ArrowLeft, Settings, LayoutDashboard, Edit, Trash2, Plus, X, Image as ImageIcon,
  Save, EyeOff, Globe, CreditCard, Banknote, ShoppingBag, Baby, ShoppingCart,
  LogIn, LogOut, Gift
} from 'lucide-react';



const VEHICULOS = [
  { id: 'suburban', nombre: 'Luxury SUV', maxPax: 6, descripcion: { es: 'Elegancia y confort para familias o grupos pequeños.', en: 'Elegance and comfort for families or small groups.' } },
  { id: 'sprinter', nombre: 'Van', maxPax: 10, descripcion: { es: 'Amplitud y lujo para grupos grandes.', en: 'Spaciousness and luxury for large groups.' } },
];

// =========================================================
// GENERADOR DE PLANTILLA HTML PARA ADMIN (FIREBASE)
// =========================================================
const generarHtmlCorreoAdmin = (item, datosCliente, numConfirmacion) => {
  // 1. Manejo de "N/A" para campos vacíos
  const nombreCliente = `${datosCliente.clienteNombre || ''} ${datosCliente.clienteApellidos || ''}`.trim() || 'N/A';
  const correoCliente = datosCliente.clienteEmail || 'N/A';
  const telefonoCliente = datosCliente.clienteTelefono || 'N/A';
  const metodoPago = datosCliente.paymentMethod === 'paypal' ? 'PayPal (Pagado)' : 'Efectivo al llegar';
  
  // 2. Extraer datos generales
  const pasajeros = item.config?.pasajeros || item.extrasEspeciales?.cenaPax || item.extrasEspeciales?.hotelPax || item.extrasEspeciales?.golfPax || item.extrasEspeciales?.nightlifePax || item.config?.hhPax || 'N/A';
  
  const aerolineaLlegada = item.flightInfo?.aerolineaLlegada || 'N/A';
  const vueloLlegada = item.flightInfo?.vueloLlegada || 'N/A';
  const horaLlegada = item.flightInfo?.horaLlegada || 'N/A';
  
  const aerolineaSalida = item.flightInfo?.aerolineaSalida || 'N/A';
  const vueloSalida = item.flightInfo?.vueloSalida || 'N/A';
  const horaSalida = item.flightInfo?.horaSalida || 'N/A';
  
  const pickup = item.flightInfo?.horaPickUp || item.extrasEspeciales?.cenaHora || item.extrasEspeciales?.hotelHora || item.extrasEspeciales?.golfHora || item.extrasEspeciales?.nightlifeHora || item.config?.hhHora || item.config?.cenaHora || item.config?.golfHora || item.config?.nightlifeHora || 'N/A';

  // 3. Generar la tabla de pasajeros SI ES UN TOUR
  let pasajerosTourHtml = '';
  if (item.servicio === 'tours' && item.config?.participantes && item.config.participantes.length > 0) {
    pasajerosTourHtml = `
      <h2 style="font-size: 14px; font-weight: 700; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 15px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
        Lista de Pasajeros (Tour)
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
        <tbody>
          ${item.config.participantes.map((p, index) => `
            <tr style="border-bottom: 1px solid #f8fafc;">
              <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%; vertical-align: top;">Pasajero ${index + 1}:</td>
              <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #1e293b; width: 60%; vertical-align: top; text-align: right;">
                ${p.nombre || 'N/A'} <span style="color: #1e3a8a;">(Edad: ${p.edad || 'N/A'})</span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // 4. Construcción Inteligente de "Detalles Logísticos"
  let logisticaHtml = '';

  // A) RUTAS DE SERVICIOS ESPECIALES O HOTEL NORMAL
  if (item.tipoEspecial) {
      let origenEspecial = item.extrasEspeciales?.cenaOrigen || item.extrasEspeciales?.golfOrigen || item.extrasEspeciales?.nightlifeOrigen || item.extrasEspeciales?.hotelOrigen || item.config?.hhOrigen || item.config?.hotelId || 'N/A';
      if (origenEspecial.includes('|')) origenEspecial = origenEspecial.split('|')[0];
      
      let destinoLugar = item.extrasEspeciales?.cenaRestauranteNombre || item.extrasEspeciales?.golfNombre || item.extrasEspeciales?.nightlifeLugarNombre || item.extrasEspeciales?.hotelNombre || item.config?.hhDestino || 'N/A';
      
      let detallesHorarios = '';
      if (item.tipoEspecial === 'cena') {
          detallesHorarios = `<br><span style="color: #64748b; font-size: 12px; font-weight: normal;">Hora Reserva: ${item.extrasEspeciales?.cenaHoraReserva || item.config?.cenaHoraReserva || 'N/A'} | Regreso: ${item.extrasEspeciales?.cenaHoraRegreso || item.config?.cenaHoraRegreso || 'N/A'}</span>`;
      } else if (item.tipoEspecial === 'golf') {
          detallesHorarios = `<br><span style="color: #64748b; font-size: 12px; font-weight: normal;">Tee Time: ${item.extrasEspeciales?.golfHoraReserva || item.config?.golfHoraReserva || 'N/A'} | Regreso: ${item.extrasEspeciales?.golfHoraRegreso || item.config?.golfHoraRegreso || 'N/A'}</span>`;
      } else if (item.tipoEspecial === 'nightlife') {
          detallesHorarios = `<br><span style="color: #64748b; font-size: 12px; font-weight: normal;">Llegada: ${item.extrasEspeciales?.nightlifeHoraReserva || item.config?.nightlifeHoraReserva || 'N/A'} | Regreso: ${item.extrasEspeciales?.nightlifeHoraRegreso || item.config?.nightlifeHoraRegreso || 'N/A'}</span>`;
      }

      logisticaHtml += `
        <tr style="border-bottom: 1px solid #f8fafc;">
          <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%; vertical-align: top;">Cuadro de Recogida (Ruta):</td>
          <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #1e293b; width: 60%; vertical-align: top; text-align: right;">
            <span style="color: #1e3a8a;">Origen:</span> ${origenEspecial}<br>
            <span style="color: #ea580c;">Destino:</span> ${destinoLugar}
            ${detallesHorarios}
          </td>
        </tr>
      `;
  } else if (item.servicio !== 'tours') {
      let hotelNormal = item.config?.hotelId || 'N/A';
      if (hotelNormal.includes('|')) hotelNormal = hotelNormal.split('|')[0];
      logisticaHtml += `
        <tr style="border-bottom: 1px solid #f8fafc;">
          <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%; vertical-align: top;">Hotel / Destino:</td>
          <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #1e293b; width: 60%; vertical-align: top; text-align: right;">${hotelNormal}</td>
        </tr>
      `;
  }

  // B) COMENTARIOS / LUGAR DE RECOGIDA (Especialmente para Tours)
  if (item.config?.comentarios) {
      logisticaHtml += `
        <tr style="border-bottom: 1px solid #f8fafc;">
          <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%; vertical-align: top;">Lugar de Recogida / Comentarios:</td>
          <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #1e293b; width: 60%; vertical-align: top; text-align: right; font-style: italic;">
            "${item.config.comentarios}"
          </td>
        </tr>
      `;
  }

  // C) EXTRAS: Sillas, Compras, Amenidades de Cena
  const extrasList = [];
  if (item.config?.carSeat > 0) extrasList.push(`${item.config.carSeat}x Silla de Auto (Car Seat)`);
  if (item.config?.babySeat > 0) extrasList.push(`${item.config.babySeat}x Silla de Bebé (Baby Seat)`);
  if (item.config?.boosterSeat > 0) extrasList.push(`${item.config.boosterSeat}x Asiento Elevador (Booster)`);
  if (item.config?.shoppingStop) extrasList.push(`🛒 Parada de Compras (Shopping Stop)`);
  if (item.config?.rosas) extrasList.push(`🌹 Rosas`);
  if (item.config?.vino) extrasList.push(`🍷 Botella de Vino`);
  if (item.config?.vinoEspumoso) extrasList.push(`🥂 Vino Espumoso`);

  if (extrasList.length > 0) {
      logisticaHtml += `
        <tr style="border-bottom: 1px solid #f8fafc;">
          <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%; vertical-align: top;">Extras Solicitados:</td>
          <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #1e293b; width: 60%; vertical-align: top; text-align: right;">
            <ul style="margin: 0; padding: 0; list-style: none;">
              ${extrasList.map(extra => `<li style="margin-bottom: 4px; color: #047857;">+ ${extra}</li>`).join('')}
            </ul>
          </td>
        </tr>
      `;
  }

  // D) PASAJEROS TOTALES
  logisticaHtml += `
    <tr style="border-bottom: 1px solid #f8fafc;">
      <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%; vertical-align: top;">Pasajeros Totales:</td>
      <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #1e293b; width: 60%; vertical-align: top; text-align: right;">${pasajeros}</td>
    </tr>
  `;

  // E) VUELOS (Solo si es traslado de Aeropuerto)
  if (['aeropuerto_hotel', 'hotel_aeropuerto', 'redondo'].includes(item.servicio)) {
      logisticaHtml += `
        <tr style="border-bottom: 1px solid #f8fafc;">
          <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%; vertical-align: top;">Aerolínea Llegada:</td>
          <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #1e293b; width: 60%; vertical-align: top; text-align: right;">${aerolineaLlegada} (Vuelo: ${vueloLlegada})</td>
        </tr>
        <tr style="border-bottom: 1px solid #f8fafc;">
          <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%; vertical-align: top;">Hora Llegada Vuelo:</td>
          <td style="padding: 10px 0; font-size: 14px; font-weight: 700; color: #1e3a8a; width: 60%; vertical-align: top; text-align: right;">${horaLlegada}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f8fafc;">
          <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%; vertical-align: top;">Aerolínea Salida:</td>
          <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #1e293b; width: 60%; vertical-align: top; text-align: right;">${aerolineaSalida} (Vuelo: ${vueloSalida})</td>
        </tr>
        <tr style="border-bottom: 1px solid #f8fafc;">
          <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%; vertical-align: top;">Hora Salida Vuelo:</td>
          <td style="padding: 10px 0; font-size: 14px; font-weight: 700; color: #1e3a8a; width: 60%; vertical-align: top; text-align: right;">${horaSalida}</td>
        </tr>
      `;
  }

  // F) HORA EXACTA DE RECOGIDA (Para todos)
  logisticaHtml += `
    <tr style="border-bottom: 1px solid #f8fafc;">
      <td style="padding: 10px 0; font-size: 14px; color: #ea580c; font-weight: bold; width: 40%; vertical-align: top;">Hora Pick-Up / Servicio:</td>
      <td style="padding: 10px 0; font-size: 16px; font-weight: 900; color: #ea580c; width: 60%; vertical-align: top; text-align: right;">${pickup}</td>
    </tr>
  `;

  // 5. Retornar el HTML final ensamblado
  return `
    <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 30px 15px; color: #1e293b; display: block; width: 100%; box-sizing: border-box;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
        
        <div style="background-color: #1e3a8a; padding: 35px 30px; text-align: center; color: #ffffff;">
          <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Notificación de Web</span>
          <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">¡Nuevo Servicio Recibido!</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 15px;">${item.titulo || 'N/A'}</p>
        </div>

        <div style="padding: 30px;">
          
          <h2 style="font-size: 14px; font-weight: 700; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 15px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Información General</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tbody>
              <tr style="border-bottom: 1px solid #f8fafc;">
                <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%; vertical-align: top;">N° de Confirmación:</td>
                <td style="padding: 10px 0; font-size: 14px; font-weight: 700; color: #1e3a8a; width: 60%; vertical-align: top; text-align: right;">${numConfirmacion}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f8fafc;">
                <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%; vertical-align: top;">Tipo de Servicio:</td>
                <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #1e293b; width: 60%; vertical-align: top; text-align: right;">${item.subtitulo || 'N/A'}</td>
              </tr>
            </tbody>
          </table>

          <h2 style="font-size: 14px; font-weight: 700; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 15px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Datos del Cliente</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tbody>
              <tr style="border-bottom: 1px solid #f8fafc;">
                <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%; vertical-align: top;">Nombre Completo:</td>
                <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #1e293b; width: 60%; vertical-align: top; text-align: right;">${nombreCliente}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f8fafc;">
                <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%; vertical-align: top;">Teléfono:</td>
                <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #1e293b; width: 60%; vertical-align: top; text-align: right;">${telefonoCliente}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f8fafc;">
                <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%; vertical-align: top;">Correo Electrónico:</td>
                <td style="padding: 10px 0; font-size: 14px; font-weight: 500; color: #1e293b; width: 60%; vertical-align: top; text-align: right;">${correoCliente}</td>
              </tr>
            </tbody>
          </table>

          ${pasajerosTourHtml}

          <h2 style="font-size: 14px; font-weight: 700; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 15px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Detalles Logísticos</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tbody>
              ${logisticaHtml}
            </tbody>
          </table>

          <h2 style="font-size: 14px; font-weight: 700; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 15px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Resumen de Pago</h2>
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 30px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tbody>
                <tr>
                  <td style="font-size: 14px; color: #64748b;">Método de Pago:</td>
                  <td style="font-size: 14px; font-weight: 600; text-align: right;">${metodoPago}</td>
                </tr>
                <tr>
                  <td style="font-size: 16px; font-weight: 700; padding-top: 10px; color: #1e293b;">Valor de este servicio:</td>
                  <td style="font-size: 20px; font-weight: 700; text-align: right; padding-top: 10px; color: #1e3a8a;">$${item.precio.toFixed(2)} USD</td>
                </tr>
              </tbody>
            </table>
          </div>

          <a href="mailto:${correoCliente}?subject=Consulta sobre su reserva ${numConfirmacion}" style="display: block; text-align: center; background-color: #ffffff; color: #1e3a8a; border: 2px solid #1e3a8a; padding: 12px 24px; border-radius: 8px; font-size: 15px; font-weight: 600; text-decoration: none; margin-bottom: 15px;">
            💬 Contactar con el Cliente
          </a>

          <p style="text-align: center; font-size: 12px; color: #64748b; margin-top: 25px; line-height: 1.5;">
            Este es un correo automático generado por el nuevo sistema de reservas.<br />
            Por favor, revisa la información y agenda el servicio.
          </p>

        </div>
      </div>
    </div>
  `;
};

// =========================================================
// 1. GENERADOR DE PLANTILLA HTML PARA CLIENTE (DINÁMICO)
// =========================================================
const generarHtmlCorreoCliente = (item, datosCliente, numConfirmacion) => {
  const nombreCliente = `${datosCliente.clienteNombre || ''} ${datosCliente.clienteApellidos || ''}`.trim() || 'Pasajero';
  const metodoPago = datosCliente.paymentMethod === 'paypal' ? 'PayPal (Pagado)' : 'Efectivo al llegar';
  
  // Extraemos la logística general (reutilizamos la lógica del admin)
  const hotel = item.config?.hotelId || item.extrasEspeciales?.hotelOrigen || item.extrasEspeciales?.cenaOrigen || item.extrasEspeciales?.golfOrigen || item.extrasEspeciales?.nightlifeOrigen || 'N/A';
  const pasajeros = item.config?.pasajeros || item.extrasEspeciales?.cenaPax || item.extrasEspeciales?.hotelPax || item.extrasEspeciales?.golfPax || item.extrasEspeciales?.nightlifePax || item.config?.hhPax || 'N/A';
  const pickup = item.flightInfo?.horaPickUp || item.extrasEspeciales?.cenaHora || item.extrasEspeciales?.hotelHora || item.extrasEspeciales?.golfHora || item.extrasEspeciales?.nightlifeHora || item.config?.hhHora || 'N/A';

  // --- LÓGICA DEL ENCABEZADO VISUAL ---
  let bgStyle = `background-color: #1e3a8a;`; // Fondo azul por defecto
  let headerText = `
    <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">¡Gracias por reservar con nosotros!</h1>
    <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 15px;">${item.titulo || 'N/A'}</p>
  `;

  // Si es un Tour o Servicio Especial, ponemos una imagen de fondo según la categoría
  if (item.servicio === 'tours' || item.tipoEspecial) {
    // Imágenes por defecto de alta calidad (puedes cambiar las URLs por las tuyas)
    let bgImg = 'https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=800'; // Default Cabo
    if (item.tipoEspecial === 'cena') bgImg = 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800';
    else if (item.tipoEspecial === 'golf') bgImg = 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=800';
    else if (item.tipoEspecial === 'nightlife') bgImg = 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800';
    else if (item.servicio === 'tours') bgImg = 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=800';

    bgStyle = `background: linear-gradient(to bottom, rgba(30,58,138,0.7), rgba(30,58,138,0.85)), url('${bgImg}') center/cover no-repeat;`;
    
    headerText = `
      <span style="font-size: 14px; font-weight: 500; opacity: 0.9;">Gracias por reservar con nosotros tu producto de</span><br/>
      <span style="font-size: 26px; font-weight: 900; letter-spacing: -0.5px; display: inline-block; margin-top: 5px;">${item.titulo}</span>
    `;
  }

  // IMPORTANTE: Cambia "https://tudominio.com" por la URL real de tu página web
  const linkModificacion = `https://www.loscabosprivatetrips.com/?id=${numConfirmacion}`;
  const linkWhatsApp = `https://wa.me/526121943286?text=Hola,%20tengo%20una%20duda%20sobre%20mi%20reserva%20${numConfirmacion}`;

  return `
    <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 30px 15px; color: #1e293b; display: block; width: 100%; box-sizing: border-box;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
        
        <div style="${bgStyle} padding: 40px 30px; text-align: center; color: #ffffff;">
          <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); backdrop-filter: blur(4px); color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px;">Confirmación Oficial</span><br/>
          ${headerText}
        </div>

        <div style="padding: 30px;">
          <p style="font-size: 16px; margin-top: 0; color: #334155;">Hola <strong>${nombreCliente}</strong>,</p>
          <p style="font-size: 15px; color: #64748b; line-height: 1.5; margin-bottom: 25px;">Hemos recibido tu solicitud y tu transporte/experiencia en Los Cabos está asegurado. Aquí tienes los detalles de este servicio:</p>
          
          <h2 style="font-size: 14px; font-weight: 700; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 15px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Resumen del Servicio</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tbody>
              <tr style="border-bottom: 1px solid #f8fafc;">
                <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%;">N° de Confirmación:</td>
                <td style="padding: 10px 0; font-size: 14px; font-weight: 700; color: #1e3a8a; width: 60%; text-align: right;">${numConfirmacion}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f8fafc;">
                <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%;">Servicio:</td>
                <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #1e293b; width: 60%; text-align: right;">${item.subtitulo || 'N/A'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f8fafc;">
                <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%;">Pasajeros:</td>
                <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #1e293b; width: 60%; text-align: right;">${pasajeros}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f8fafc;">
                <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%;">Hora Sugerida/Pick-Up:</td>
                <td style="padding: 10px 0; font-size: 15px; font-weight: 900; color: #ea580c; width: 60%; text-align: right;">${pickup}</td>
              </tr>
            </tbody>
          </table>

          <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 30px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tbody>
                <tr>
                  <td style="font-size: 14px; color: #64748b;">Método de Pago:</td>
                  <td style="font-size: 14px; font-weight: 600; text-align: right;">${metodoPago}</td>
                </tr>
                <tr>
                  <td style="font-size: 16px; font-weight: 700; padding-top: 10px; color: #1e293b;">Total:</td>
                  <td style="font-size: 20px; font-weight: 700; text-align: right; padding-top: 10px; color: #1e3a8a;">$${item.precio.toFixed(2)} USD</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="text-align: center; margin-top: 20px;">
            <a href="${linkModificacion}" style="display: block; background-color: #1e3a8a; color: #ffffff; text-decoration: none; padding: 14px 20px; border-radius: 8px; font-weight: bold; margin-bottom: 12px; box-shadow: 0 4px 6px rgba(30,58,138,0.2);">
              ✏️ Modificar mi Reserva
            </a>
            <a href="${linkWhatsApp}" target="_blank" style="display: block; background-color: #ffffff; color: #059669; border: 2px solid #059669; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-weight: bold;">
              💬 Chat con el Proveedor
            </a>
          </div>

          <p style="text-align: center; font-size: 12px; color: #94a3b8; margin-top: 30px; line-height: 1.5;">
            Ballard Tours Los Cabos<br/>
            Si necesitas asistencia urgente, responde a este correo.
          </p>
        </div>
      </div>
    </div>
  `;
};

// =========================================================
// 2. GENERADOR DE PLANTILLA HTML PARA MODIFICACIONES (ADMIN)
// =========================================================
const generarHtmlModificacionAdmin = (idModificar, datosModificar, costoDiferencia) => {
  const avisoCosto = costoDiferencia > 0 
    ? `<tr style="background-color: #fef08a;"><td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #e2e8f0; color: #b45309; width: 40%;">⚠️ PAGO EXTRA POR ZONA:</td><td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #b45309; text-align: right;">$${costoDiferencia} USD (${datosModificar.metodoPagoExtra})</td></tr>` 
    : '';

  return `
    <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 30px 15px; color: #1e293b; display: block; width: 100%; box-sizing: border-box;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
        
        <div style="background-color: #ea580c; padding: 35px 30px; text-align: center; color: #ffffff;">
          <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Alerta de Actualización</span>
          <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">El Cliente Modificó su Reserva</h1>
          <p style="margin: 5px 0 0 0; font-weight: 900; font-size: 18px; tracking-widest">${idModificar}</p>
        </div>

        <div style="padding: 30px;">
          <p style="font-size: 15px; color: #64748b; margin-bottom: 25px;">El cliente ha utilizado el enlace de autogestión para actualizar sus datos. Por favor, revisa la información resaltada a continuación:</p>
          
          <h2 style="font-size: 14px; font-weight: 700; color: #ea580c; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 15px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">Nuevos Datos Guardados</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; background-color: #fff7ed; border-radius: 8px;">
            <tbody>
              ${avisoCosto}
              <tr style="border-bottom: 1px solid #fed7aa;">
                <td style="padding: 12px 10px; font-size: 14px; color: #9a3412; width: 40%; font-weight: bold;">Nuevo Nombre:</td>
                <td style="padding: 12px 10px; font-size: 14px; font-weight: 700; color: #7c2d12; width: 60%; text-align: right;">${datosModificar.nombre || 'N/A'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #fed7aa;">
                <td style="padding: 12px 10px; font-size: 14px; color: #9a3412; width: 40%; font-weight: bold;">Nuevo Hotel/Zona:</td>
                <td style="padding: 12px 10px; font-size: 14px; font-weight: 700; color: #7c2d12; width: 60%; text-align: right;">${datosModificar.hotel || 'N/A'} (Zona ${datosModificar.zonaNueva})</td>
              </tr>
              <tr style="border-bottom: 1px solid #fed7aa;">
                <td style="padding: 12px 10px; font-size: 14px; color: #9a3412; width: 40%; font-weight: bold;">🛬 Llegada (Fecha/Vuelo):</td>
                <td style="padding: 12px 10px; font-size: 14px; font-weight: 600; color: #9a3412; width: 60%; text-align: right;">${datosModificar.fechaLlegada} | ${datosModificar.aerolineaLlegada} ${datosModificar.vueloLlegada}</td>
              </tr>
              <tr style="border-bottom: 1px solid #fed7aa;">
                <td style="padding: 12px 10px; font-size: 14px; color: #9a3412; width: 40%; font-weight: bold;">🛬 Hora Llegada:</td>
                <td style="padding: 12px 10px; font-size: 14px; font-weight: 700; color: #7c2d12; width: 60%; text-align: right;">${datosModificar.horaLlegada || 'N/A'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #fed7aa;">
                <td style="padding: 12px 10px; font-size: 14px; color: #9a3412; width: 40%; font-weight: bold;">🛫 Salida (Fecha/Vuelo):</td>
                <td style="padding: 12px 10px; font-size: 14px; font-weight: 600; color: #9a3412; width: 60%; text-align: right;">${datosModificar.fechaSalida} | ${datosModificar.aerolineaSalida} ${datosModificar.vueloSalida}</td>
              </tr>
              <tr style="border-bottom: 1px solid #fed7aa;">
                <td style="padding: 12px 10px; font-size: 14px; color: #9a3412; width: 40%; font-weight: bold;">🛫 Hora Salida:</td>
                <td style="padding: 12px 10px; font-size: 14px; font-weight: 700; color: #7c2d12; width: 60%; text-align: right;">${datosModificar.horaSalida || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 10px; font-size: 14px; color: #c2410c; width: 40%; font-weight: 900;">⏰ NUEVA HORA PICK-UP:</td>
                <td style="padding: 12px 10px; font-size: 16px; font-weight: 900; color: #c2410c; width: 60%; text-align: right;">${datosModificar.horaPickUp || 'N/A'}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  `;
};

export default function App() {

  const navigate = useNavigate();
  const [lang, setLang] = useState('es');
  const t = translations[lang];

  /// 1. Mantenemos la sesión activa
  const [currentUser, setCurrentUser] = useState(() => {
    const sesionGuardada = localStorage.getItem('sesionActual');
    return sesionGuardada ? JSON.parse(sesionGuardada) : null;
  });

  // 2. Guardamos la sesión si cambia
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sesionActual', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sesionActual');
    }
  }, [currentUser]);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' o 'register'
  const [authForm, setAuthForm] = useState({ nombre: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');

  // ESTADO DE CÓDIGOS DE DESCUENTO

  const [showPromoModal, setShowPromoModal] = useState(false);

  // Efecto inteligente: Muestra el pop-up a los 5 segundos o al hacer scroll
  useEffect(() => {
    const detonarPopup = () => {
      setShowPromoModal(true);
      window.removeEventListener('scroll', vigilarScroll);
      clearTimeout(temporizador);
    };

    const vigilarScroll = () => {
      if (window.scrollY > 300) {
        detonarPopup();
      }
    };

    // Activa el vigilante del scroll
    window.addEventListener('scroll', vigilarScroll);

    // Activa el cronómetro de 5 segundos
    const temporizador = setTimeout(() => {
      detonarPopup();
    }, 5000);

    // Limpieza al desmontar
    return () => {
      window.removeEventListener('scroll', vigilarScroll);
      clearTimeout(temporizador);
    };
  }, []);
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [pendingPromoCode, setPendingPromoCode] = useState('');

  // ESTADOS DEL CARRITO (COMBO) Y CLIENTE
  const [carrito, setCarrito] = useState([]);
  const [verCarrito, setVerCarrito] = useState(false);
  const [datosCliente, setDatosCliente] = useState({
    clienteNombre: '', clienteApellidos: '', clienteTelefono: '', clienteEmail: '',
    paymentMethod: 'cash'
  });

  const [zonas] = useState(zonasData);
  const [hoteles] = useState(catalogoHoteles);
  const [tours] = useState(toursData);

  const [paso, setPaso] = useState(1);
  const [imagenTourDestacada, setImagenTourDestacada] = useState('');
  const [lightboxAbierto, setLightboxAbierto] = useState(false);
  const [lightboxIndice, setLightboxIndice] = useState(0);
  const [busquedaHotelPrincipal, setBusquedaHotelPrincipal] = useState('');
  const [mostrarDropdownHotelPrincipal, setMostrarDropdownHotelPrincipal] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [subCategoria, setSubCategoria] = useState('');
  const [busquedaHotel, setBusquedaHotel] = useState('');
  const [procesandoPago, setProcesandoPago] = useState(false);
  const [correoAdminEnviado, setCorreoAdminEnviado] = useState(false);
  const [numConfirmacionGlobal, setNumConfirmacionGlobal] = useState('');

  const [vistaEspecial, setVistaEspecial] = useState(null);

  // Estados para Cenas
  const [cenaOrigen, setCenaOrigen] = useState('');
  const [cenaDestino, setCenaDestino] = useState('');
  const [cenaPax, setCenaPax] = useState('1-4');
  const [cenaHora, setCenaHora] = useState('');
  const [cenaHoraReserva, setCenaHoraReserva] = useState('');
  const [cenaHoraRegreso, setCenaHoraRegreso] = useState('');
  const [busquedaCenaOrigen, setBusquedaCenaOrigen] = useState('');
  const [cenaRestauranteNombre, setCenaRestauranteNombre] = useState('');
  const [mostrarDropdownCena, setMostrarDropdownCena] = useState(false);

  // Estados para Traslado Hotel a Hotel
  const [hotelOrigen, setHotelOrigen] = useState('');
  const [hotelDestino, setHotelDestino] = useState('');
  const [hotelPax, setHotelPax] = useState('1-4');
  const [hotelNombre, setHotelNombre] = useState('');
  const [hotelHora, setHotelHora] = useState('');
  const [busquedaHhOrigen, setBusquedaHhOrigen] = useState('');
  const [mostrarDropdownHotelOrigen, setMostrarDropdownHotelOrigen] = useState(false);

  // Estados para Golf
  const [golfOrigen, setGolfOrigen] = useState('');
  const [golfDestino, setGolfDestino] = useState('');
  const [golfPax, setGolfPax] = useState('1-4');
  const [golfNombre, setGolfNombre] = useState('');
  const [golfHora, setGolfHora] = useState('');
  const [golfHoraReserva, setGolfHoraReserva] = useState('');
  const [golfHoraRegreso, setGolfHoraRegreso] = useState('');
  const [busquedaGolfOrigen, setBusquedaGolfOrigen] = useState('');
  const [mostrarDropdownGolfOrigen, setMostrarDropdownGolfOrigen] = useState(false);

  // Estados para Nightlife
  const [nightlifeOrigen, setNightlifeOrigen] = useState('');
  const [nightlifeDestino, setNightlifeDestino] = useState('');
  const [nightlifePax, setNightlifePax] = useState('1-4');
  const [nightlifeHora, setNightlifeHora] = useState('');
  const [nightlifeHoraReserva, setNightlifeHoraReserva] = useState('');
  const [nightlifeHoraRegreso, setNightlifeHoraRegreso] = useState('');
  const [busquedaNightlifeOrigen, setBusquedaNightlifeOrigen] = useState('');
  const [nightlifeLugarNombre, setNightlifeLugarNombre] = useState('');
  const [mostrarDropdownNightlife, setMostrarDropdownNightlife] = useState(false);

  // Estado BORRADOR del servicio que se está configurando actualmente
  const [reserva, setReserva] = useState({
    hotelId: '', zonaId: '', pasajeros: 1, vehiculo: 'suburban', tourId: '',
    fechaLlegada: '', fechaSalida: '', participantes: [{ nombre: '', apellido: '', edad: '' }],
    carSeat: 0, babySeat: 0, boosterSeat: 0, shoppingStop: false,
    rosas: false, vino: false, vinoEspumoso: false, comentarios: '', tipoEspecial: null, precioBaseEspecial: 0
  });

  const limpiarFormularioActivo = () => {
    setServicioSeleccionado('');
    setSubCategoria('');
    setVistaEspecial(null);
    setReserva({
      hotelId: '', zonaId: '', pasajeros: 1, vehiculo: 'suburban', tourId: '',
      fechaLlegada: '', fechaSalida: '', participantes: [{ nombre: '', apellido: '', edad: '' }],
      carSeat: 0, babySeat: 0, boosterSeat: 0, shoppingStop: false,
      rosas: false, vino: false, vinoEspumoso: false, comentarios: '', tipoEspecial: null, precioBaseEspecial: 0
    });
    // Limpiar estados locales de Especiales
    setCenaOrigen(''); setCenaDestino(''); setCenaPax('1-4'); setCenaHora(''); setCenaHoraReserva(''); setCenaHoraRegreso(''); setBusquedaCenaOrigen(''); setCenaRestauranteNombre('');
    setHotelOrigen(''); setHotelDestino(''); setHotelPax('1-4'); setHotelNombre(''); setHotelHora(''); setBusquedaHhOrigen('');
    setGolfOrigen(''); setGolfDestino(''); setGolfPax('1-4'); setGolfNombre(''); setGolfHora(''); setGolfHoraReserva(''); setGolfHoraRegreso(''); setBusquedaGolfOrigen('');
    setNightlifeOrigen(''); setNightlifeDestino(''); setNightlifePax('1-4'); setNightlifeHora(''); setNightlifeHoraReserva(''); setNightlifeHoraRegreso(''); setBusquedaNightlifeOrigen(''); setNightlifeLugarNombre('');
    setBusquedaHotelPrincipal('');
  };

  useEffect(() => {
    if (reserva.hotelId) {
      const hotel = hoteles.find(h => h.nombre === reserva.hotelId || h.id === parseInt(reserva.hotelId));
      if (hotel) setReserva(prev => ({ ...prev, zonaId: hotel.zona }));
    }
  }, [reserva.hotelId, hoteles]);

  useEffect(() => {
    if (servicioSeleccionado === 'tours') {
      setReserva(prev => {
        const actuales = [...prev.participantes];
        const diferencia = prev.pasajeros - actuales.length;
        if (diferencia > 0) {
          for (let i = 0; i < diferencia; i++) actuales.push({ nombre: '', apellido: '', edad: '' });
        } else if (diferencia < 0) {
          actuales.splice(diferencia);
        }
        if (diferencia !== 0) return { ...prev, participantes: actuales };
        return prev;
      });
    }
  }, [reserva.pasajeros, servicioSeleccionado]);

  const handleChange = (e) => setReserva(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleClienteChange = (e) => setDatosCliente(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleParticipanteChange = (index, campo, valor) => {
    setReserva(prev => {
      const nuevos = [...prev.participantes];
      nuevos[index] = { ...nuevos[index], [campo]: valor };
      return { ...prev, participantes: nuevos };
    });
  };

  const updateSeat = (e, type, increment) => {
    e.preventDefault();
    setReserva(prev => {
      const current = prev[type] || 0;
      const newVal = increment ? current + 1 : Math.max(0, current - 1);
      return { ...prev, [type]: newVal };
    });
  };

  const detallesPrecio = useMemo(() => {
    let shoppingCost = reserva.shoppingStop ? 30 : 0;
    let subtotalBase = 0;
    let detalle = '';

    if (reserva.tipoEspecial === 'cena') {
      subtotalBase = reserva.precioBaseEspecial || 0;
      detalle = 'Traslado Especial: Cena';
      shoppingCost = 0; // Ya manejado
    }
    else if (reserva.tipoEspecial === 'hotel-hotel') {
      subtotalBase = reserva.precioBaseEspecial || 0;
      detalle = 'Traslado Hotel a Hotel';
      shoppingCost = 0;
    }
    else if (reserva.tipoEspecial === 'golf') {
      subtotalBase = reserva.precioBaseEspecial || 0;
      detalle = 'Traslado a Campo de Golf';
      shoppingCost = 0;
    }
    else if (reserva.tipoEspecial === 'nightlife') {
      subtotalBase = reserva.precioBaseEspecial || 0;
      detalle = 'Traslado Vida Nocturna';
      shoppingCost = 0;
    }
    else if (servicioSeleccionado === 'tours' && reserva.tourId) {
      const tour = tours.find(t => t.id === reserva.tourId);
      const pasajeros = parseInt(reserva?.pasajeros) || 0;

      if (tour?.id === 'camellos') {
        let costoCamellos = 0;
        (reserva?.participantes || []).forEach(p => {
          const edad = parseInt(p?.edad) || 0;
          if (edad > 0 && edad <= 11) {
            costoCamellos += (tour?.precioNino || 120);
          } else {
            costoCamellos += (tour?.precioAdulto || 190);
          }
        });
        subtotalBase = costoCamellos;
      } else if (tour?.id === 'arco') {
        let costoArco = (tour?.precioAdulto || 100) * pasajeros;
        (reserva?.participantes || []).forEach(p => {
          if (p?.edad && p.edad !== '') {
            const edad = parseInt(p.edad);
            if (edad < 4) {
              costoArco -= (tour?.precioAdulto || 100);
            }
          }
        });
        subtotalBase = costoArco;
      } else if (tour?.id === 'artwalk') {
        if (pasajeros >= 1 && pasajeros <= 4) subtotalBase = 180;
        else if (pasajeros >= 5 && pasajeros <= 8) subtotalBase = 220;
        else if (pasajeros >= 9 && pasajeros <= 10) subtotalBase = 240;
        else subtotalBase = 180;
      } else if (tour?.id === 'tiburon_ballena' || tour?.id === 'isla_espiritu_santo') {
        let precioAdulto = 330;
        if (pasajeros === 3) precioAdulto = 310;
        else if (pasajeros === 4) precioAdulto = 290;
        else if (pasajeros === 5) precioAdulto = 270;
        else if (pasajeros === 6) precioAdulto = 250;
        else if (pasajeros >= 7 && pasajeros <= 10) precioAdulto = 220;

        let costoTotal = 0;
        (reserva?.participantes || []).forEach(p => {
          const edad = parseInt(p?.edad) || 0;
          if (edad >= 4 && edad <= 8) {
            costoTotal += 300;
          } else {
            costoTotal += precioAdulto;
          }
        });
        subtotalBase = costoTotal;
      } else {
        subtotalBase = (tour?.precioPx || 0) * pasajeros;
      }
      detalle = `${pasajeros}x ${tour?.nombre ? tour.nombre[lang] : ''}`;
    }
    else if (reserva.zonaId && reserva.vehiculo && servicioSeleccionado !== 'tours') {
      const zona = zonas.find(z => z.id === reserva.zonaId || z.id === parseInt(reserva.zonaId));
      if (!zona) return { total: 0, precioBase: 0, descuento: 0, detalle: '' };
      const tarifaBase = reserva.vehiculo === 'suburban' ? zona.tarifaSuburban : zona.tarifaSprinter;
      const multiplicador = servicioSeleccionado === 'redondo' ? 2 : 1;
      subtotalBase = tarifaBase * multiplicador;
      detalle = `${t.services[servicioSeleccionado]} - ${zona.nombre}`;
    }

    const precioBaseReal = subtotalBase + shoppingCost;
    if (precioBaseReal === 0) return { total: 0, precioBase: 0, descuento: 0, detalle: '' };

    // Aquí se aplica el descuento
    let descuento = 0;
    if (currentUser?.role === 'agency') {
      descuento = precioBaseReal * 0.20;
    } else if (appliedPromo) {
      descuento = precioBaseReal * 0.10;
    }

    const total = precioBaseReal - descuento;

    return { total, precioBase: precioBaseReal, descuento, detalle };
  }, [reserva, servicioSeleccionado, zonas, tours, lang, t, currentUser, appliedPromo]);

  const { carritoSubtotal, carritoDescuento, carritoTotal, discountLabel } = useMemo(() => {
    const sub = carrito.reduce((acc, item) => acc + (item.precioBase || item.precio), 0);
    let desc = 0;
    let label = '';
    if (currentUser?.role === 'agency') {
      desc = sub * 0.20;
      label = t.auth.agency_discount;
    } else if (appliedPromo) {
      desc = sub * 0.10;
      label = `Código ${appliedPromo.code} (-10%)`;
    }
    return { carritoSubtotal: sub, carritoDescuento: desc, carritoTotal: sub - desc, discountLabel: label };
  }, [carrito, currentUser, appliedPromo, t]);

  const agregarAlCombo = () => {
    let titulo = "";
    let subtitulo = "";

    if (reserva.tipoEspecial) {
      if (reserva.tipoEspecial === 'cena') { titulo = "Traslado Cena"; subtitulo = `${reserva.cenaRestaurante} (${cenaPax} pax)`; }
      else if (reserva.tipoEspecial === 'hotel-hotel') { titulo = "Traslado Hoteles"; subtitulo = `${hotelOrigen?.split('|')[0]} → ${hotelDestino === 'sjc' ? 'S.J.C.' : hotelDestino === 'csl' ? 'C.S.L.' : 'Corredor'}`; }
      else if (reserva.tipoEspecial === 'golf') { titulo = "Traslado Golf"; subtitulo = `${reserva.golfNombre} (${golfPax} pax)`; }
      else if (reserva.tipoEspecial === 'nightlife') { titulo = "Traslado Nightlife"; subtitulo = `${reserva.nightlifeLugarNombre} (${nightlifePax} pax)`; }
    } else if (servicioSeleccionado === 'tours') {
      const tr = tours.find(t => t.id === reserva.tourId);
      titulo = tr.nombre[lang];
      subtitulo = `${reserva.pasajeros} pax - ${reserva.fechaLlegada}`;
    } else {
      titulo = t.services[servicioSeleccionado];
      const hotelName = hoteles.find(h => h.id === parseInt(reserva.hotelId) || h.nombre === reserva.hotelId)?.nombre || reserva.hotelId;
      const vehiculoName = VEHICULOS.find(v => v.id === reserva.vehiculo)?.nombre;
      subtitulo = `${hotelName} - ${vehiculoName}`;
    }

    const newItem = {
      id: Date.now().toString(36),
      servicio: servicioSeleccionado,
      tipoEspecial: reserva.tipoEspecial,
      titulo,
      subtitulo,
      precio: detallesPrecio.total,
      precioBase: detallesPrecio.precioBase,
      config: { ...reserva },
      extrasEspeciales: {
        cenaOrigen, cenaDestino, cenaPax, cenaHora, cenaHoraReserva, cenaHoraRegreso, cenaRestauranteNombre,
        hotelOrigen, hotelDestino, hotelPax, hotelNombre, hotelHora,
        golfOrigen, golfDestino, golfPax, golfNombre, golfHora, golfHoraReserva, golfHoraRegreso,
        nightlifeOrigen, nightlifeDestino, nightlifePax, nightlifeHora, nightlifeHoraReserva, nightlifeHoraRegreso, nightlifeLugarNombre
      },
      flightInfo: {
        aerolineaLlegada: '', vueloLlegada: '', horaLlegada: '',
        aerolineaSalida: '', vueloSalida: '', horaSalida: '', horaPickUp: ''
      }
    };

    setCarrito([...carrito, newItem]);
    limpiarFormularioActivo();
    setPaso(1);
    setVerCarrito(true);
  };

  const eliminarDelCombo = (id) => {
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    setCarrito(nuevoCarrito);
    if (nuevoCarrito.length === 0 && paso > 2) {
      setPaso(1);
      setVerCarrito(false);
    }
  };

  const handleVueloChange = (itemId, campo, valor) => {
    setCarrito(prev => prev.map(item =>
      item.id === itemId ? { ...item, flightInfo: { ...item.flightInfo, [campo]: valor } } : item
    ));
  };

  const puedeAvanzarPaso2 = () => {
    if (reserva.tipoEspecial) return true;
    if (servicioSeleccionado === 'tours') {
      const tieneFecha = reserva.fechaLlegada || reserva.fechaTour;
      const minimoPasajeros = reserva.pasajeros >= 2;
      const edadesValidas = reserva.participantes && reserva.participantes.length > 0 &&
        reserva.participantes.every(p => parseInt(p.edad) >= (reserva.tourId === 'arco' || reserva.tourId === 'artwalk' ? 0 : reserva.tourId === 'tiburon_ballena' || reserva.tourId === 'isla_espiritu_santo' ? 4 : reserva.tourId === 'camellos' ? 5 : reserva.tourId === 'atv' || reserva.tourId === 'snorkeling-adventure-cabo' ? 8 : 10));
      return tieneFecha && minimoPasajeros && edadesValidas;
    } else {
      if (!reserva.hotelId || !reserva.vehiculo || !reserva.fechaLlegada) return false;
      if (servicioSeleccionado === 'redondo' && !reserva.fechaSalida) return false;
      return true;
    }
  };

  const puedeAvanzarPaso3 = () => {
    const basicos = datosCliente.clienteNombre.trim() && datosCliente.clienteApellidos.trim() && datosCliente.clienteTelefono.trim() && datosCliente.clienteEmail.includes('@');
    if (!basicos) return false;

    return carrito.every(item => {
      if (item.servicio === 'aeropuerto_hotel' || item.servicio === 'redondo') {
        if (!item.flightInfo?.aerolineaLlegada || !item.flightInfo?.vueloLlegada || !item.flightInfo?.horaLlegada) return false;
      }
      if (item.servicio === 'hotel_aeropuerto' || item.servicio === 'redondo') {
        if (!item.flightInfo?.aerolineaSalida || !item.flightInfo?.vueloSalida || !item.flightInfo?.horaSalida || !item.flightInfo?.horaPickUp) return false;
      }
      return true;
    });
  };

  const avanzarPaso = () => {
    setPaso(p => p + 1);
    window.scrollTo(0, 0);
  };

  const procederAlPago = () => {
    setVerCarrito(false);
    setPaso(3);
    window.scrollTo(0, 0);
  };

  const procesarConfirmacion = (e) => {
 if (e && e.preventDefault) e.preventDefault();

 // RASTREADORES PARA LA CONSOLA
 console.log("🚨 PASO 1: ¡El clic del botón sí funciona!");
 console.log("🚨 PASO 2: Los datos del cliente son:", datosCliente);

 // 🛡️ CORRECCIÓN: Detectamos de forma segura si los datos vienen como 'nombre' o 'clienteNombre'
 const nombreCliente = datosCliente.clienteNombre || datosCliente.nombre || 'Pasajero';
 const apellidosCliente = datosCliente.clienteApellidos || datosCliente.apellidos || '';
 const emailCliente = datosCliente.clienteEmail || datosCliente.email;

 // Si se aplicó un código de promoción, enviar WhatsApp silencioso al OPC/Chofer usando Meta API
 if (appliedPromo) {
   const comision = carritoTotal * 0.10;
   const servicios = carrito.map(item => item.titulo).join(', ');
   const fechaTour = carrito[0]?.flightInfo?.fechaLlegada || carrito[0]?.config?.fechaTour || carrito[0]?.flightInfo?.fechaSalida || 'Fecha en sistema';

   const tokenMeta = "EAAOP0FJrKocBRm2Tv0NyYwZBBexDxEQSlBvHWMwXFESBQbFyqQTI4QzFy1GaG3HyeZBm6DpiLwNdlZCyakJLW7yHS2wrdlTqqNc4cjqj5DQtbsXcZAMy39t0wypXJwUUijtEb07SXMUfmGZBGZBIGDF3ueIspAjZAZBmfJZCmGqulcaZCdqvNzogyGETGFfWueKUUp4duZC8lrBUQ4xPVBzZBwbVqSmZCHl0nGopgtXaBd5z8H0suMlONrfbZCbmusMbHzC1SbIgIUjOM8Y9lRmbre3zhyH2vmkaL1xVir8AZDZD";
   const idTelefonoMeta = "1146460171892849";

   const datosEnvio = {
  messaging_product: "whatsapp",
  to: appliedPromo.phone,
  type: "template",
  template: {
    name: "notificacion_comision_chofer",
    language: { code: "es" },
    components: [
   {
     type: "body",
     parameters: [
    { type: "text", text: `${nombreCliente} ${apellidosCliente}` },
    { type: "text", text: servicios },
    { type: "text", text: fechaTour },
    { type: "text", text: `$${comision.toFixed(2)} USD` }
     ]
   }
    ]
  }
   };

   fetch(`https://graph.facebook.com/v25.0/${idTelefonoMeta}/messages`, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${tokenMeta}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(datosEnvio)
   })
  .then(response => response.json())
  .then(data => console.log("✅ Notificación oficial de Meta enviada:", data))
  .catch(error => console.error("❌ Error en la API de Meta:", error));
 } 
 setProcesandoPago(true);

    // 👇 AQUÍ ESTÁ LA MAGIA: Quitamos el "async" y reordenamos
 setTimeout(async() => {
    setProcesandoPago(false);

    const nuevoNumConfirmacion = Math.random().toString(36).substr(2, 8).toUpperCase();
    setNumConfirmacionGlobal(nuevoNumConfirmacion);
    setCorreoAdminEnviado(false);

    // 1️⃣ ¡EL TRUCO! Avanzamos de paso INMEDIATAMENTE para no trabar al cliente
    avanzarPaso();

    try {
      console.log("Preparando datos de correos para Firebase...");
      
      // 👇 SOLO SE DECLARA UNA VEZ AQUÍ:
      const correosRef = collection(db, "correos");

      // ==========================================
      // CORREO 1: PARA EL CLIENTE (UNO POR CADA PRODUCTO)
      // ==========================================
      for (const item of carrito) {
        await addDoc(correosRef, {
          to: emailCliente || "reservationballard@gmail.com",
          message: {
            subject: `Confirmación de Reserva: ${item.titulo} - Ballard Tours`,
            html: generarHtmlCorreoCliente(item, datosCliente, nuevoNumConfirmacion) 
          }
        });
      }

      // ==========================================
      // CORREO 2: PARA LA EMPRESA (UNO POR CADA PRODUCTO)
      // ==========================================
      for (const item of carrito) {
        await addDoc(correosRef, {
          to: "reservationballard@gmail.com",
          message: {
            subject: `🚨 SERVICIO: ${item.titulo} - ${nombreCliente} (${nuevoNumConfirmacion})`,
            html: generarHtmlCorreoAdmin(item, datosCliente, nuevoNumConfirmacion) 
          }
        });
      }

      // ==========================================
      // CORREO 3: PARA EL CHOFER (SI USÓ CÓDIGO)
      // ==========================================
      // Verificamos si hay un código aplicado y si ese código tiene un correo guardado
      if (appliedPromo && (appliedPromo.CORREO || appliedPromo.correo)) {
        const correoChofer = appliedPromo.CORREO || appliedPromo.correo;
        const nombreChofer = appliedPromo.NOMBRE || appliedPromo.nombre || "Chofer";
        const comision = carritoTotal * 0.10; // Calcula el 10%
        const serviciosResumen = carrito.map(item => item.titulo).join(', ');
        const fechaServicio = carrito[0]?.config?.fechaLlegada || carrito[0]?.config?.fechaTour || carrito[0]?.extrasEspeciales?.cenaHora || 'Fecha en sistema';
        
        await addDoc(correosRef, {
          to: correoChofer,
          message: {
            subject: `¡Nueva Venta! Comisión Generada - Ballard Tours`,
            html: `
              <div style="font-family: Arial, sans-serif; background-color: #f1f5f9; padding: 30px; color: #1e293b;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
                  
                  <div style="background-color: #15803d; padding: 25px; text-align: center; color: white;">
                    <h2 style="margin: 0; font-size: 24px;">¡Felicidades ${nombreChofer}! 🎉</h2>
                    <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 15px;">Has generado una nueva comisión de venta</p>
                  </div>

                  <div style="padding: 30px;">
                    <p style="font-size: 16px; color: #334155;">Un cliente acaba de realizar una reserva utilizando tu código de descuento (<strong>${appliedPromo.codigo || 'Tu Código'}</strong>).</p>
                    
                    <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0; margin: 20px 0;">
                      <p style="margin: 0 0 10px 0; color: #475569;"><strong>👤 Cliente:</strong> <span style="color: #0f172a;">${nombreCliente}</span></p>
                      <p style="margin: 0 0 10px 0; color: #475569;"><strong>📅 Fecha del producto:</strong> <span style="color: #0f172a;">${fechaServicio}</span></p>
                      <p style="margin: 0; color: #475569;"><strong>🛍️ Producto(s) reservados:</strong> <span style="color: #0f172a;">${serviciosResumen}</span></p>
                    </div>

                    <div style="background-color: #dcfce3; padding: 25px; border-radius: 8px; text-align: center; border: 1px solid #bbf7d0;">
                      <p style="margin: 0; font-size: 14px; color: #166534; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">Tu Comisión Generada (10%)</p>
                      <p style="margin: 8px 0 0 0; font-size: 36px; font-weight: 900; color: #15803d;">$${comision.toFixed(2)} USD</p>
                    </div>

                    <div style="margin-top: 25px; background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px;">
                      <p style="margin: 0; font-size: 14px; color: #b45309; font-weight: bold; text-align: center;">
                        ⚠️ La comisión se pagará el día del servicio.
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            `
          }
        });
      }

      console.log("✅ Correos registrados en Firebase exitosamente.");

    } catch (error) {
      console.error("❌ Error al registrar los correos en Firebase:", error);
    }
  }, 500);
  };

  const regresarPaso = () => {
    if (paso === 2 && servicioSeleccionado === 'tours' && reserva.tourId) {
      setReserva(prev => ({ ...prev, tourId: '' }));
    } else if (paso === 2 && reserva.tipoEspecial) {
      setReserva(prev => ({ ...prev, tipoEspecial: null }));
    } else if (paso === 3) {
      setPaso(1);
      setVerCarrito(true);
      return;
    }
    setPaso(p => p - 1);
    window.scrollTo(0, 0);
  };

  const procesarCodigo = async (codigo, userLogueado = currentUser) => {
    if (!codigo) {
      setPromoError('Ingresa un código por favor.');
      return;
    }

    // 👇 NUEVA REGLA: Si no hay usuario, forzamos inicio de sesión/registro
    if (!userLogueado) {
      setPendingPromoCode(codigo); // Guardamos el código escrito en memoria
      setShowPromoModal(false);    // Ocultamos la ventana del código
      setShowAuthModal(true);      // Abrimos la ventana de login
      return;                      // Detenemos la validación por ahora
    }

    setPromoError(''); // Limpiamos errores previos

    try {
      // 1. Apuntamos a la colección 'codigos_descuento'
      const codigosRef = collection(db, "codigos_descuento");

      // 2. Creamos la consulta buscando donde 'codigo' sea exactamente igual al escrito
      const q = query(codigosRef, where("codigo", "==", codigo));

      // 3. Ejecutamos la búsqueda en Firebase
      const querySnapshot = await getDocs(q);

      // 4. Si la búsqueda regresó vacía, es que el código no existe
      if (querySnapshot.empty) {
        // Como ya inició sesión pero el código era malo, volvemos a abrir la ventana de promo
        setShowPromoModal(true);
        setPromoError('Código inválido o no existe.');
        return;
      }

      // 5. Si lo encontró, extraemos los datos del primer resultado
      let dataResult = null;
      querySnapshot.forEach((doc) => {
        dataResult = doc.data();
      });

      console.log("¡Código encontrado con éxito en Firebase!", dataResult);

      // 6. Aplicamos el descuento y cerramos la ventana
      setAppliedPromo(dataResult);
      setShowPromoModal(false);

    } catch (err) {
      console.error("Error al conectar con Firebase:", err);
      setPromoError('Error de conexión con Firebase. Intenta de nuevo.');
      setShowPromoModal(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAppliedPromo(null);
  };

  const calculoHorasCena = useMemo(() => {
    if (!cenaHoraReserva || !cenaHoraRegreso) return { error: false, diffMin: 0 };
    const [sH, sM] = cenaHoraReserva.split(':').map(Number);
    const [eH, eM] = cenaHoraRegreso.split(':').map(Number);
    let startMin = sH * 60 + sM;
    let endMin = eH * 60 + eM;
    if (endMin < startMin) endMin += 24 * 60; // Maneja si cruza la medianoche
    const diff = endMin - startMin;
    return { error: diff > 180, diffMin: diff };
  }, [cenaHoraReserva, cenaHoraRegreso]);

  const calculoHorasGolf = useMemo(() => {
    if (!golfHoraReserva || !golfHoraRegreso) return { error: false, diffMin: 0 };
    const [sH, sM] = golfHoraReserva.split(':').map(Number);
    const [eH, eM] = golfHoraRegreso.split(':').map(Number);
    let startMin = sH * 60 + sM;
    let endMin = eH * 60 + eM;
    if (endMin < startMin) endMin += 24 * 60;
    const diff = endMin - startMin;
    return { error: diff > 180, diffMin: diff };
  }, [golfHoraReserva, golfHoraRegreso]);

  const calculoHorasNightlife = useMemo(() => {
    if (!nightlifeHoraReserva || !nightlifeHoraRegreso) return { error: false, diffMin: 0 };
    const [sH, sM] = nightlifeHoraReserva.split(':').map(Number);
    const [eH, eM] = nightlifeHoraRegreso.split(':').map(Number);
    let startMin = sH * 60 + sM;
    let endMin = eH * 60 + eM;
    if (endMin < startMin) endMin += 24 * 60;
    const diff = endMin - startMin;
    return { error: diff > 240, diffMin: diff }; // 4 horas máximo
  }, [nightlifeHoraReserva, nightlifeHoraRegreso]);

  const seleccionarTourDesdeInicio = (tourId) => {
    setServicioSeleccionado('tours');
    const tour = tours.find(t => t.id === tourId);
    setReserva(prev => ({ ...prev, tourId, pasajeros: Math.max(prev.pasajeros, tour.minPax), shoppingStop: false }));
    setImagenTourDestacada(tour.imagenUrl);
    setPaso(2);
    window.scrollTo(0, 0);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (authMode === 'login') {
      // --- INICIO DE SESIÓN CON FIREBASE ---
      const usuariosRef = collection(db, "Usuarios");
      const q = query(usuariosRef,
        where("correo", "==", authForm.email),
        where("contrasena", "==", authForm.password)
      );
      const querySnapshot = await getDocs(q);

      let user = null;

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          user = doc.data();
        });
      } else {
        setAuthError('Usuario no encontrado o correo incorrecto');
        return;
      }

      if (user) {
        // Guardamos los datos del usuario incluyendo si tiene descuento de agencia
        const userData = {
          email: user.correo,
          nombre: user.nombre,
          role: user.descuento_agencia ? 'agency' : 'client',
          descuento: user.descuento_agencia || 0
        };

        setCurrentUser(userData);
        setShowAuthModal(false);
        setDatosCliente(prev => ({ ...prev, clienteNombre: user.nombre.split(' ')[0], clienteEmail: user.correo }));
        setAuthForm({ nombre: '', email: '', password: '' });

        // Si es una agencia con descuento, aplicamos el 20% automáticamente a toda la página
        if (user.descuento_agencia) {
          setAppliedPromo({
            codigo: "DESCUENTO_AGENCIA",
            porcentaje_descuento: user.descuento_agencia
          });
        } else if (pendingPromoCode) {
          procesarCodigo(pendingPromoCode, userData);
          setPendingPromoCode('');
        }
      }
    } else {
      // --- REGISTRO CON FIREBASE ---
      const usuariosRef = collection(db, "Usuarios");
      const q = query(usuariosRef, where("correo", "==", authForm.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setAuthError('Este correo ya está registrado');
        return;
      }

      // Guardamos en la base de datos
      await addDoc(usuariosRef, {
        nombre: authForm.nombre,
        correo: authForm.email,
        contrasena: authForm.password
      });

      // Iniciar sesión automáticamente después de registrarse
      const newUser = { email: authForm.email, nombre: authForm.nombre, role: 'client' };
      setCurrentUser(newUser);
      setShowAuthModal(false);
      setDatosCliente(prev => ({ ...prev, clienteNombre: authForm.nombre.split(' ')[0], clienteEmail: authForm.email }));
      setAuthForm({ nombre: '', email: '', password: '' });

      if (pendingPromoCode) {
        procesarCodigo(pendingPromoCode, newUser);
        setPendingPromoCode('');
      }
    }
  };
  // 💬 WIDGET: WhatsApp Inteligente CRO
  const WhatsAppButton = () => {
    // Reemplaza este número con el tuyo. IMPORTANTE: Debe llevar el código de país, ej. 52 para México, sin el símbolo +
    const numeroWhatsApp = "526121943286";
    const mensajePredefinido = "Hi Ballard Tours! I'm interested in booking private transportation/tours in Los Cabos. Can you help me?";
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajePredefinido)}`;

    return (
      <a
        href={linkWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-green-500 hover:bg-green-400 text-white p-4 rounded-full shadow-[0_10px_25px_-5px_rgba(34,197,94,0.5)] transition-all hover:scale-110 hover:-translate-y-1 group flex items-center justify-center animate-fade-in"
        aria-label="Contact us on WhatsApp"
      >
        {/* Ícono de WhatsApp en SVG para no depender de librerías externas */}
        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
        {/* Tooltip invisible que aparece al pasar el mouse */}
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
          Need help? Chat with us!
        </span>
      </a>
    );
  };
  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setPaso(1); navigate('/'); limpiarFormularioActivo(); window.scrollTo(0, 0); }}>
          <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
            <img
              src={`${process.env.PUBLIC_URL}/LOGO-BALLARD-SIN-FONDO.png`}
              alt="Ballard Tours Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-black text-blue-900 leading-none tracking-tight">BALLARD</h1>
            <p className="text-xs font-bold text-gray-500 leading-none tracking-widest mt-1">TOURS</p>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          {/* NAVEGACIÓN PRINCIPAL */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">

            <Link
              to="/"
              onClick={() => { 
                setPaso(1); 
                limpiarFormularioActivo(); 
                window.scrollTo(0, 0); 
              }}
              className="hover:text-blue-900 transition-colors cursor-pointer"
            >
              Inicio
            </Link>

            <Link
              to="/transportation"
              onClick={() => window.scrollTo(0, 0)}
              className="hover:text-blue-900 transition-colors cursor-pointer"
            >
              Tarifas y Zonas
            </Link>

            <Link
              to="/"
              onClick={() => {
                limpiarFormularioActivo();
                setServicioSeleccionado('tours');
                setPaso(2);
                window.scrollTo(0, 0);
              }}
              className="hover:text-blue-900 transition-colors cursor-pointer"
            >
              Experiencias
            </Link>

          </nav>

          {currentUser ? (
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
              <User size={16} className="text-blue-900" />
              <span className="text-sm font-bold text-gray-700 hidden sm:inline">{currentUser.nombre.split(' ')[0]}</span>
              {currentUser.role === 'agency' && <span className="bg-blue-900 text-white text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider">{t.auth.agency_badge}</span>}
              <button onClick={handleLogout} className="ml-1 text-gray-400 hover:text-red-500 transition-colors" title={t.auth.logout}><LogOut size={16} /></button>
            </div>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className="flex items-center gap-2 bg-blue-900 text-white hover:bg-blue-800 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors shadow-sm">
              <LogIn size={16} /> <span className="hidden sm:inline">{t.auth?.login_btn || 'Entrar'}</span>
            </button>
          )}

          <button
            onClick={() => setVerCarrito(true)}
            className="relative p-2 text-gray-700 hover:text-blue-900 transition-colors ml-2"
          >
            <ShoppingCart size={24} />
            {carrito.length > 0 && (
              <span className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                {carrito.length}
              </span>
            )}
          </button>

          <button onClick={() => setLang(l => l === 'es' ? 'en' : 'es')} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm font-bold text-gray-700 transition-colors shadow-sm border border-gray-200">
            <Globe size={16} className="text-blue-900" /> <span className="hidden sm:inline">{lang === 'es' ? '🇺🇸 EN' : '🇲🇽 ES'}</span>
          </button>
        </div>
      </div>
    </header>
  );

  const DrawerCombo = () => {
    if (!verCarrito) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setVerCarrito(false)}></div>

        <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="text-blue-900" size={24} />
              {t.cart.title}
            </h2>
            <button onClick={() => setVerCarrito(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
            {carrito.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                <ShoppingCart size={64} className="text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">{t.cart.empty}</p>
                <button onClick={() => setVerCarrito(false)} className="mt-6 px-6 py-2 bg-blue-100 text-blue-900 font-bold rounded-xl hover:bg-blue-200 transition-colors">
                  {t.cart.build}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {carrito.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 animate-fade-in group relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-900"></div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 leading-tight pr-8">{item.titulo}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.subtitulo}</p>

                      {item.config.shoppingStop && (
                        <p className="text-[10px] font-semibold text-blue-600 mt-2 bg-blue-50 inline-block px-2 py-0.5 rounded-full">+ Shopping Stop</p>
                      )}
                      {(item.config.carSeat > 0 || item.config.babySeat > 0 || item.config.boosterSeat > 0) && (
                        <p className="text-[10px] font-semibold text-gray-500 mt-1">
                          Incluye Sillas Bebé
                        </p>
                      )}

                      <div className="mt-3 flex items-center justify-between">
                        {carritoDescuento > 0 ? (
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-400 line-through">${(item.precioBase || item.precio).toFixed(2)}</span>
                            <span className="font-extrabold text-blue-900">${item.precio.toFixed(2)}</span>
                          </div>
                        ) : (
                          <p className="font-extrabold text-blue-900">${item.precio.toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => eliminarDelCombo(item.id)}
                      className="absolute top-2 right-2 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title={t.cart.remove}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {carrito.length > 0 && (
            <div className="border-t border-gray-100 p-6 bg-white shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col gap-1 mb-4">
                {carritoDescuento > 0 && (
                  <>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-semibold">${carritoSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-green-600">
                      <span className="font-bold">{discountLabel}</span>
                      <span className="font-bold">-${carritoDescuento.toFixed(2)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-end mt-2">
                  <p className="text-gray-500 font-semibold">{t.cart.total}</p>
                  <div className="text-right">
                    <p className="text-3xl font-extrabold text-gray-900">${carritoTotal.toFixed(2)}</p>
                    <p className="text-[10px] text-gray-400">USD, impuestos incluidos</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={procederAlPago}
                  className="w-full py-4 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2"
                >
                  {t.cart.checkout} <ChevronRight size={20} />
                </button>
                <button
                  onClick={() => setVerCarrito(false)}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors text-sm"
                >
                  {t.cart.continue_shopping}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const Stepper = () => {
    return (
      <div className="py-8 max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
          <div className="absolute left-0 top-1/2 h-0.5 bg-blue-900 transition-all duration-500 -z-10" style={{ width: `${((paso > 4 ? 4 : paso) - 1) * 33.33}%` }}></div>
          {t.steps.map((lbl, idx) => {
            const isCompleted = paso > idx + 1;
            const isCurrent = paso === idx + 1;
            return (
              <div key={idx} className="flex flex-col items-center bg-gray-50 px-2 transition-all">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${isCompleted ? 'bg-blue-900 border-blue-900 text-white' : isCurrent ? 'bg-white border-blue-900 text-blue-900 scale-110' : 'bg-white border-gray-300 text-gray-400'}`}>
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : idx + 1}
                </div>
                <span className={`text-xs mt-2 font-bold ${isCurrent ? 'text-blue-900' : 'text-gray-400'}`}>{lbl}</span>
              </div>
            )
          })}
        </div>
      </div>
    );
  };

  const ResumenFlotante = ({ conBoton = true, onContinue = avanzarPaso, disabledBtn = false, btnText = t.step2.continue }) => {
    const hasExtras = reserva.carSeat > 0 || reserva.babySeat > 0 || reserva.boosterSeat > 0;

    if (reserva.tipoEspecial) {
      let titleEspecial = "";
      let detailsBlock = null;

      if (reserva.tipoEspecial === 'cena') {
        titleEspecial = "Traslado Privado (Cena)";
        detailsBlock = (
          <>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="font-semibold text-gray-400">Restaurante:</span>
              <span className="text-right font-bold text-white max-w-[60%]">{reserva.cenaRestaurante}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="font-semibold text-gray-400">Origen:</span>
              <span className="text-right font-bold text-white max-w-[60%] text-balance">{reserva.cenaOrigen?.split('|')[0]}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="font-semibold text-gray-400">Horarios:</span>
              <span className="text-right font-bold text-white max-w-[60%] text-balance text-xs">
                Hotel: {reserva.cenaHora} <br />
                Reserva: {reserva.cenaHoraReserva} <br />
                Regreso: {reserva.cenaHoraRegreso}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="font-semibold text-gray-400">Pasajeros:</span>
              <span className="text-right font-bold text-white">{reserva.cenaPax}</span>
            </div>
            {(reserva.rosas || reserva.vino || reserva.vinoEspumoso) && (
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="font-semibold text-gray-400">Extras Cenas:</span>
                <span className="text-right font-bold text-green-400 text-xs">
                  {reserva.rosas && <span className="block">Rosas (+$50)</span>}
                  {reserva.vino && <span className="block">Vino (+$70)</span>}
                  {reserva.vinoEspumoso && <span className="block">Espumoso (+$70)</span>}
                </span>
              </div>
            )}
          </>
        );
      } else if (reserva.tipoEspecial === 'hotel-hotel') {
        titleEspecial = "Traslado Hotel a Hotel";
        detailsBlock = (
          <>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="font-semibold text-gray-400">Ruta:</span>
              <span className="text-right font-bold text-white text-xs text-balance max-w-[60%]">{reserva.hhOrigen?.split('|')[0]} <br />→ {reserva.hhDestino === 'sjc' ? 'San José del Cabo' : reserva.hhDestino === 'csl' ? 'Cabo San Lucas' : 'Corredor'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="font-semibold text-gray-400">Pasajeros:</span>
              <span className="text-right font-bold text-white">{reserva.hhPax}</span>
            </div>
          </>
        );
      } else if (reserva.tipoEspecial === 'golf') {
        titleEspecial = "Traslado Golf";
        detailsBlock = (
          <>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="font-semibold text-gray-400">Campo:</span>
              <span className="text-right font-bold text-white max-w-[60%]">{reserva.golfNombre}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="font-semibold text-gray-400">Origen:</span>
              <span className="text-right font-bold text-white max-w-[60%] text-balance">{reserva.golfOrigen?.split('|')[0]}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="font-semibold text-gray-400">Horarios:</span>
              <span className="text-right font-bold text-white max-w-[60%] text-balance text-xs">
                Hotel: {reserva.golfHora} <br />
                Tee Time: {reserva.golfHoraReserva} <br />
                Regreso: {reserva.golfHoraRegreso}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="font-semibold text-gray-400">Pasajeros:</span>
              <span className="text-right font-bold text-white">{reserva.golfPax}</span>
            </div>
          </>
        );
      } else if (reserva.tipoEspecial === 'nightlife') {
        titleEspecial = "Traslado Nightlife";
        detailsBlock = (
          <>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="font-semibold text-gray-400">Lugar:</span>
              <span className="text-right font-bold text-white max-w-[60%]">{reserva.nightlifeLugarNombre}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="font-semibold text-gray-400">Origen:</span>
              <span className="text-right font-bold text-white max-w-[60%] text-balance">{reserva.nightlifeOrigen?.split('|')[0]}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="font-semibold text-gray-400">Horarios:</span>
              <span className="text-right font-bold text-white max-w-[60%] text-balance text-xs">
                Hotel: {reserva.nightlifeHora} <br />
                Llegada: {reserva.nightlifeHoraReserva} <br />
                Regreso: {reserva.nightlifeHoraRegreso}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="font-semibold text-gray-400">Pasajeros:</span>
              <span className="text-right font-bold text-white">{reserva.nightlifePax}</span>
            </div>
          </>
        );
      }

      return (
        <div className="w-full lg:w-96 flex-shrink-0 animate-fade-in">
          <div className="bg-gray-900 rounded-2xl shadow-xl p-6 text-white sticky top-28 border border-gray-700">
            <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-4">Resumen de Cotización</h3>

            <div className="space-y-4 text-sm mb-6 text-gray-300">
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="font-semibold text-gray-400">Servicio:</span>
                <span className="text-right font-bold text-white">{titleEspecial}</span>
              </div>
              {detailsBlock}
              {reserva.fechaLlegada && (
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="font-semibold text-gray-400">Fecha:</span>
                  <span className="text-right font-bold text-white">{reserva.fechaLlegada}</span>
                </div>
              )}
              {(reserva.carSeat > 0 || reserva.babySeat > 0 || reserva.boosterSeat > 0) && (
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="font-semibold text-gray-400">Sillas Bebé:</span>
                  <span className="text-right font-bold text-white text-xs">
                    {reserva.carSeat > 0 && `${reserva.carSeat}x Car `}
                    {reserva.babySeat > 0 && `${reserva.babySeat}x Baby `}
                    {reserva.boosterSeat > 0 && `${reserva.boosterSeat}x Boost`}
                  </span>
                </div>
              )}
              {reserva.shoppingStop && (
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="font-semibold text-gray-400">Extras:</span>
                  <span className="text-right font-bold text-green-400">Shopping Stop (+ $30)</span>
                </div>
              )}
              {paso === 4 && (
                <div className="flex justify-between border-t border-gray-800 pt-2 text-green-400 font-bold">
                  <span>{t.summary.payment}</span> <span>{datosCliente.paymentMethod === 'paypal' ? 'PayPal' : t.step4.cash}</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800">
              <p className="text-sm text-gray-400 mb-1">{paso === 4 ? t.step4.total_pay : t.step2.total}</p>
              {(currentUser?.role === 'agency' || appliedPromo) && (
                <p className="text-sm text-green-400 mb-1 line-through">${detallesPrecio.precioBase?.toFixed(2)}</p>
              )}
              <p className="text-4xl font-black text-white">${detallesPrecio.total?.toFixed(2)}</p>
              {(currentUser?.role === 'agency' || appliedPromo) && (
                <p className="text-xs text-green-400 font-bold mt-2 flex items-center">
                  <CheckCircle size={14} className="mr-1" /> {discountLabel} aplicado
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1 flex items-center">
                <CheckCircle size={14} className="mr-1" /> Impuestos incluidos
              </p>
            </div>
            {conBoton && (
              <div className="flex gap-3 mt-6">
                <button onClick={regresarPaso} className="px-5 py-4 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition flex items-center font-bold gap-1"><ChevronLeft size={20} /> <span className="hidden sm:inline">{t.step2.back}</span></button>
                <button
                  disabled={disabledBtn}
                  onClick={onContinue}
                  className={`flex-1 py-4 rounded-xl font-bold flex justify-center items-center transition ${disabledBtn ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'}`}
                >
                  {btnText} {paso === 2 ? <Plus size={20} className="ml-1" /> : <ChevronRight size={20} className="ml-1" />}
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full lg:w-96 flex-shrink-0 animate-fade-in">
        <div className="bg-gray-900 rounded-2xl shadow-xl p-6 text-white sticky top-28 border border-gray-700">
          <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-4">{t.step2.summary}</h3>

          <div className="space-y-4 text-sm mb-6 text-gray-300">
            <div className="flex justify-between border-b border-gray-800 pb-2"><span className="font-semibold text-white uppercase">{t.services[servicioSeleccionado]}</span></div>

            {reserva.hotelId && servicioSeleccionado !== 'tours' && (
              <>
                <div className="flex justify-between"><span>{t.step4.destination}:</span> <span className="font-semibold text-white text-right max-w-[60%]">{hoteles.find(h => h.id === parseInt(reserva.hotelId) || h.nombre === reserva.hotelId)?.nombre || reserva.hotelId}</span></div>
                <div className="flex justify-between"><span>{t.summary.zone}</span> <span className="font-semibold text-blue-300 text-right">{zonas.find(z => z.id === reserva.zonaId || z.id === parseInt(reserva.zonaId))?.nombre}</span></div>
                <div className="flex justify-between"><span>{t.summary.vehicle}</span> <span className="font-semibold text-white capitalize">{VEHICULOS.find(v => v.id === reserva.vehiculo)?.nombre}</span></div>
              </>
            )}

            {servicioSeleccionado === 'tours' && reserva.tourId && (
              <div className="flex justify-between"><span>Tour:</span> <span className="font-semibold text-white text-right max-w-[60%]">{tours.find(tr => tr.id === reserva.tourId)?.nombre[lang]}</span></div>
            )}

            <div className="flex justify-between"><span>{t.step2.pax}:</span> <span className="font-semibold text-white">{reserva.pasajeros}</span></div>

            {(hasExtras || reserva.shoppingStop) && (
              <div className="pt-2 border-t border-gray-800 space-y-2 mt-2">
                {reserva.carSeat > 0 && <div className="flex justify-between text-gray-400"><span>- {t.step2.car_seat}:</span> <span className="text-white">{reserva.carSeat} ({t.step2.free})</span></div>}
                {reserva.babySeat > 0 && <div className="flex justify-between text-gray-400"><span>- {t.step2.baby_seat}:</span> <span className="text-white">{reserva.babySeat} ({t.step2.free})</span></div>}
                {reserva.boosterSeat > 0 && <div className="flex justify-between text-gray-400"><span>- {t.step2.booster_seat}:</span> <span className="text-white">{reserva.boosterSeat} ({t.step2.free})</span></div>}
                {reserva.shoppingStop && <div className="flex justify-between text-blue-300 font-medium"><span>{t.summary.shopping}</span> <span>+$30 USD</span></div>}
              </div>
            )}

            {paso === 4 && (
              <div className="pt-2 border-t border-gray-800 mt-2">
                <div className="flex justify-between text-green-400 font-bold"><span>{t.summary.payment}</span> <span>{datosCliente.paymentMethod === 'paypal' ? 'PayPal' : t.step4.cash}</span></div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-700 pt-6 mb-8">
            <p className="text-gray-400 text-xs mb-1">{paso === 4 ? t.step4.total_pay : t.step2.total}</p>
            {(currentUser?.role === 'agency' || appliedPromo) && (
              <p className="text-sm text-green-400 mb-1 line-through">${detallesPrecio.precioBase?.toFixed(2)}</p>
            )}
            <p className="text-4xl font-bold text-white">${detallesPrecio.total.toFixed(2)}</p>
            {(currentUser?.role === 'agency' || appliedPromo) && (
              <p className="text-xs text-green-400 font-bold mt-2 flex items-center gap-1">
                <CheckCircle size={14} /> {discountLabel} aplicado
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><CheckCircle size={14} /> {t.step2.includes_tax}</p>
          </div>

          {conBoton && (
            <div className="flex gap-3 mt-6">
              <button onClick={regresarPaso} className="px-5 py-4 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition flex items-center font-bold gap-1"><ChevronLeft size={20} /> <span className="hidden sm:inline">{t.step2.back}</span></button>
              <button onClick={onContinue} disabled={disabledBtn} className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center transition-all ${!disabledBtn ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}>
                {btnText} {paso === 2 ? <Plus size={20} className="ml-1" /> : <ChevronRight size={20} className="ml-1" />}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPaso1 = () => {
    const hotelesFiltrados = hoteles.filter(h => h.nombre.toLowerCase().includes(busquedaHotel.toLowerCase()));
    const zonasVisibles = zonas.filter(zona => hotelesFiltrados.some(h => h.zona === zona.id));
    const toursActivos = tours.filter(tr => tr.activo);

    return (
      <div className="animate-fade-in max-w-7xl mx-auto">
        <div className="text-center mb-10 max-w-3xl mx-auto mt-4">

          {/* 🔥 GATILLO MENTAL DE URGENCIA Y PRUEBA SOCIAL 🔥 */}
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 px-4 py-2 rounded-full text-xs font-bold mb-6 animate-pulse shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            High Demand: 85% of our Luxury SUVs are booked for this week.
          </div>

          {/* El único H1 de tu página */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">{t.step1.title}</h1>
          <p className="text-gray-500 text-lg">{t.step1.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {['aeropuerto_hotel', 'hotel_aeropuerto', 'redondo', 'tours'].map(srv => {
            const isTour = srv === 'tours';
            const icons = { aeropuerto_hotel: <PlaneLanding size={32} />, hotel_aeropuerto: <PlaneTakeoff size={32} />, redondo: <RefreshCw size={32} />, tours: <Compass size={32} /> };
            const keys = { aeropuerto_hotel: 'a2h', hotel_aeropuerto: 'h2a', redondo: 'rt', tours: 'tours' };
            const k = keys[srv];

            return (
              <button key={srv} onClick={() => { setServicioSeleccionado(srv); setSubCategoria(''); avanzarPaso(); }} className={`group relative border rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 text-left overflow-hidden h-full flex flex-col ${isTour ? 'bg-blue-900 border-blue-900 hover:shadow-blue-900/40' : 'bg-white border-gray-200 hover:border-blue-900'}`}>
                {isTour && <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-800 rounded-full blur-2xl z-0"></div>}
                <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 ${isTour ? 'bg-white text-blue-900 shadow-lg' : 'bg-blue-50 text-blue-900 group-hover:bg-blue-900 group-hover:text-white'}`}>
                  {icons[srv]}
                </div>
                {/* Cambiado de H3 a H2 porque son categorías principales */}
                <h2 className={`relative z-10 text-xl font-bold mb-2 ${isTour ? 'text-white' : 'text-gray-900'}`}>{t.step1[k]}</h2>
                <p className={`relative z-10 text-sm flex-grow ${isTour ? 'text-blue-100' : 'text-gray-500'}`}>{t.step1[`${k}_desc`]}</p>
                <div className={`relative z-10 mt-4 flex items-center font-bold text-sm group-hover:translate-x-2 transition-transform ${isTour ? 'text-white' : 'text-blue-900'}`}>
                  {isTour ? t.step1.catalog : t.step1.book} <ChevronRight size={18} />
                </div>
              </button>
            )
          })}
        </div>
        {/* 🔥 SEÑALES E-E-A-T PARA GOOGLE SGE 🔥 */}
        <section className="bg-gray-900 text-white rounded-[2rem] p-8 md:p-12 mb-24 max-w-6xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-black mb-4">Why Trust Ballard Tours?</h2>
              <p className="text-gray-400 mb-6">We are not just a booking platform. We are a locally-owned, fully licensed luxury transportation company based in Los Cabos, Mexico.</p>
              <div className="inline-flex items-center gap-2 bg-blue-900/50 text-blue-300 font-bold px-4 py-2 rounded-lg border border-blue-800">
                <CheckCircle size={18} /> Federal SCT Licensed
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                <div className="text-blue-400 mb-3"><Users size={28} /></div>
                <h3 className="font-bold text-lg mb-2">Certified Local Experts</h3>
                <p className="text-sm text-gray-400">Our bilingual chauffeurs undergo rigorous safety training and have years of experience navigating the Baja highways.</p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                <div className="text-blue-400 mb-3"><Car size={28} /></div>
                <h3 className="font-bold text-lg mb-2">Immaculate Luxury Fleet</h3>
                <p className="text-sm text-gray-400">We own our modern fleet of Chevrolet Suburbans and Sprinter vans. Insured, daily inspected, and kept in pristine condition.</p>
              </div>
            </div>
          </div>
        </section>



        {/* TOURS DESTACADOS */}
        {toursActivos.length > 0 && (
          <div id="tours" className="mb-24 scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              {/* Ya era H2, está perfecto */}
              <div><h2 className="text-3xl font-extrabold text-gray-900">{t.step1.featured_title}</h2><p className="text-gray-500 mt-2">{t.step1.featured_sub}</p></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toursActivos.slice(0, 6).map((tr) => (
                <div key={tr.id} onClick={() => seleccionarTourDesdeInicio(tr.id)} className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <div className="relative w-full h-full group cursor-pointer" onClick={(e) => {
                      e.stopPropagation();
                      const fotoActual = imagenTourDestacada || tr.imagenUrl;
                      let index = tr.galeria ? tr.galeria.indexOf(fotoActual) : 0;
                      if (index === -1) index = 0;
                      setLightboxIndice(index);
                      setLightboxAbierto(true);
                    }}>
                      <img src={tr.imagenUrl} alt={tr.nombre[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ImageIcon size={16} /> Ver fotos en grande
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-900 flex items-center gap-1 shadow-lg"><Clock size={12} /> {tr.duracion[lang]}</div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Cambiado de H3 a H3 porque está anidado bajo Tours Destacados (H2) */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{tr.nombre[lang]}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">{tr.descripcion[lang]}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <div><p className="text-xs text-gray-400 font-medium">{t.step1.price_from}</p><p className="text-lg font-extrabold text-blue-900">${tr.precioPx} <span className="text-xs font-normal">USD</span></p></div>
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-colors"><ChevronRight size={20} /></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div id="zonas" className="bg-white border border-gray-200 rounded-[2rem] p-6 md:p-10 shadow-lg scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <MapIcon className="w-12 h-12 text-blue-900 mx-auto mb-4" />
            {/* Ya era H2, está perfecto */}
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{t.step1.directory_title}</h2>
            <div className="relative max-w-md mx-auto mt-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder={t.step1.search_placeholder} value={busquedaHotel} onChange={(e) => setBusquedaHotel(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-4 font-medium text-gray-900 focus:border-blue-900 focus:ring-0 outline-none transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {zonasVisibles.length > 0 ? (
              zonasVisibles.map(zona => (
                <div key={zona.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 h-full flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 mb-4 gap-4">
                    {/* Cambiado de H3 a H3 porque está anidado bajo Directorio (H2) */}
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2"><MapPin className="text-blue-600" size={24} /> {zona.nombre}</h3>
                    <div className="flex gap-3 text-sm text-right">
                      <div className="bg-white px-3 py-1 rounded-lg border shadow-sm"><p className="text-[10px] font-bold text-gray-400 uppercase">Suburban (1-6)</p><p className="font-bold text-blue-900">${zona.tarifaSuburban} <span className="font-normal text-xs">USD</span></p></div>
                      <div className="bg-white px-3 py-1 rounded-lg border shadow-sm"><p className="text-[10px] font-bold text-gray-400 uppercase">Sprinter (1-10)</p><p className="font-bold text-blue-900">${zona.tarifaSprinter} <span className="font-normal text-xs">USD</span></p></div>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-3">{t.step1.hotels_in_zone}:</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600">
                      {hotelesFiltrados.filter(h => h.zona === zona.id).map(hotel => (
                        <li key={hotel.id} className="flex items-start gap-2">
                          <Check size={14} className="text-green-500 mt-0.5 shrink-0" />
                          <span className={busquedaHotel && hotel.nombre.toLowerCase().includes(busquedaHotel.toLowerCase()) ? 'font-bold text-gray-900 bg-yellow-100 px-1 rounded' : ''}>{hotel.nombre}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300"><p className="text-gray-500 font-medium">{t.step1.not_found}</p></div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderPaso2 = () => {
    // VISTA DETALLADA DE TOUR
    if (servicioSeleccionado === 'tours' && reserva.tourId) {
      const tr = tours.find(t => t.id === reserva.tourId);
      return (
        <>
          <div className="animate-fade-in max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative h-64 md:h-80 w-full group cursor-pointer" onClick={() => {
                const fotoActual = imagenTourDestacada || tr.imagenUrl;
                let index = tr.galeria ? tr.galeria.indexOf(fotoActual) : 0;
                if (index === -1) index = 0;
                setLightboxIndice(index);
                setLightboxAbierto(true);
              }}>
                <img src={imagenTourDestacada || tr.imagenUrl} alt={tr.nombre[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent pointer-events-none"></div>

                <button onClick={(e) => {
                  e.stopPropagation();
                  setReserva(prev => ({ ...prev, tourId: '' }));
                  setImagenTourDestacada('');
                }} className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-sm font-bold text-gray-800 flex items-center hover:bg-white transition-colors shadow-lg z-10"><ArrowLeft size={16} className="mr-2" /> {t.step2.choose_another}</button>

                <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none z-10">
                  <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">{tr.nombre[lang]}</h2>
                </div>
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <ImageIcon size={16} /> Ver fotos en grande
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-gray-600 text-lg leading-relaxed mb-8">{tr.descripcion[lang]}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-green-50/50 border border-green-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2"><CheckCircle size={20} /> {t.step2.includes || '¿Qué Incluye?'}</h4>
                    <ul className="space-y-3">
                      {tr.incluye[lang].map((item, idx) => (<li key={idx} className="flex items-start text-gray-700 text-sm gap-2"><Check size={16} className="text-green-500 shrink-0 mt-0.5" /> {item}</li>))}
                    </ul>
                  </div>
                  <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-orange-800 mb-4 flex items-center gap-2"><Info size={20} /> {tr.id === 'arco' ? (lang === 'es' ? 'Recomendaciones' : 'Recommendations') : (t.step2.reqs || 'Antes de Reservar / Seguridad')}</h4>
                    <ul className="space-y-3">
                      {Array.isArray(tr.requisitos[lang])
                        ? tr.requisitos[lang].map((item, idx) => (<li key={idx} className="flex items-start text-gray-700 text-sm gap-2"><span className="text-orange-500 font-bold mt-0.5">•</span> {item}</li>))
                        : <p className="text-gray-700 text-sm">{tr.requisitos[lang]}</p>
                      }
                    </ul>
                  </div>
                  {tr.cargosExtra && (
                    <div className="bg-red-50/50 border border-red-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2"><Banknote size={20} /> Cargos Extra / Opcionales</h4>
                      <ul className="space-y-3">
                        {tr.cargosExtra[lang].map((item, idx) => (<li key={idx} className="flex items-start text-gray-700 text-sm gap-2"><span className="text-red-500 font-bold mt-0.5">+</span> {item}</li>))}
                      </ul>
                    </div>
                  )}
                  {tr.recomendaciones && (
                    <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2"><ShieldCheck size={20} /> Recomendaciones</h4>
                      <ul className="space-y-3">
                        {tr.recomendaciones[lang].map((item, idx) => (<li key={idx} className="flex items-start text-gray-700 text-sm gap-2"><span className="text-blue-500 font-bold mt-0.5">✓</span> {item}</li>))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
                  <p className="text-gray-800 font-bold flex items-center gap-2"><Clock size={20} className="text-blue-900" /> {tr.duracion[lang]}</p>
                  {tr.especial && <p className="text-sm text-blue-900 font-medium">Nota: Mínimo {tr.minPax} personas.</p>}
                </div>

                {tr.galeria && tr.galeria.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><ImageIcon size={20} className="text-blue-900" /> Galería de Imágenes</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {tr.galeria.map((foto, idx) => (
                        <img key={idx} src={foto} alt={`${tr.nombre[lang]} foto ${idx + 1}`} onClick={() => setImagenTourDestacada(foto)} className="w-full h-32 object-cover rounded-xl shadow-sm hover:scale-110 transition-transform duration-300 cursor-pointer" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full lg:w-[400px] flex-shrink-0 animate-fade-in">
              <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-6 md:p-8 sticky top-28">
                <h3 className="font-bold text-gray-800 mb-4">Participantes {(reserva.tourId !== 'arco' && reserva.tourId !== 'artwalk') && <span className="text-sm text-red-500 font-normal">(Edad mínima: {reserva.tourId === 'tiburon_ballena' || reserva.tourId === 'isla_espiritu_santo' ? 4 : reserva.tourId === 'camellos' ? 5 : reserva.tourId === 'atv' ? 8 : 10} años)</span>}</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.step2.tour_date}</label>
                    <div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input type="date" name="fechaLlegada" value={reserva.fechaLlegada} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-900 outline-none" /></div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.step2.pax} <span className="text-xs text-gray-400 font-normal">{t.step2.pax_min.replace('{n}', tr.minPax)}</span></label>
                    <div className="relative"><Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input type="number" min={tr.minPax} max="20" name="pasajeros" value={reserva.pasajeros} onChange={handleChange} className={`w-full bg-white border rounded-lg pl-10 p-3 text-gray-800 outline-none transition-all ${servicioSeleccionado === 'tours' && reserva.pasajeros < 2 ? 'bg-red-50 border-red-500 text-red-700' : 'border-gray-300'}`} /></div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">{t.step2.participants}</h4>
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                      {reserva.participantes.map((part, index) => (
                        <div key={index} className="grid grid-cols-6 gap-2">
                          <div className="col-span-1 flex items-center justify-center bg-blue-900 text-white rounded-lg text-xs font-bold">{index + 1}</div>
                          <input type="text" placeholder={t.step2.name} value={part.nombre} onChange={(e) => handleParticipanteChange(index, 'nombre', e.target.value)} className="col-span-3 bg-white border border-gray-200 rounded-lg px-2 py-2 text-xs focus:ring-2 focus:ring-blue-900 outline-none" />
                          <input
                            type="number"
                            placeholder={t.step2.age}
                            min="1"
                            value={part.edad}
                            onChange={(e) => handleParticipanteChange(index, 'edad', e.target.value)}
                            className={`col-span-2 bg-white border rounded-lg p-2 text-sm outline-none transition-all ${part.edad && parseInt(part.edad) < (reserva.tourData?.edadMinima || 0)
                                ? 'bg-red-50 border-red-500'
                                : 'border-gray-200'
                              }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-gray-700 text-sm font-bold mb-2 block">¿Dónde te recogemos? / Comentarios</label>
                    <textarea className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-800" rows="3" placeholder="Ej: Hotel Riu Palace, Airbnb en el centro, etc..." value={reserva.comentarios || ''} onChange={(e) => setReserva({ ...reserva, comentarios: e.target.value })}></textarea>
                  </div>
                  <div className="border-t border-gray-100 pt-6 mt-6">
                    {reserva.tourId === 'camellos' && (
                      <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3 text-xs font-semibold mb-4 leading-relaxed animate-fade-in">
                        ⚠️ Importante: El costo de entrada al parque es de $25 USD por persona, el cual se pagará directamente en las taquillas el día de tu actividad.
                      </div>
                    )}
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-gray-500 font-medium">{t.step2.summary}</p>
                        {(currentUser?.role === 'agency' || appliedPromo) && <p className="text-xs text-green-600 font-bold mt-1">{discountLabel}</p>}
                      </div>
                      <div className="text-right">
                        {(currentUser?.role === 'agency' || appliedPromo) && <p className="text-sm text-gray-400 line-through">${detallesPrecio.precioBase.toFixed(2)}</p>}
                        <p className="text-3xl font-extrabold text-blue-900">${detallesPrecio.total.toFixed(2)} <span className="text-sm text-gray-500 font-normal">USD</span></p>
                      </div>
                    </div>
                    <button onClick={agregarAlCombo} disabled={!puedeAvanzarPaso2()} className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all text-lg ${puedeAvanzarPaso2() ? 'bg-blue-900 hover:bg-blue-800 text-white shadow-lg shadow-blue-900/30' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                      <Plus size={20} className="mr-2" /> {t.cart?.add || 'Añadir a mi combo'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {lightboxAbierto && (
            <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md" onClick={() => setLightboxAbierto(false)}>
              <button className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white p-2 z-[10000] text-5xl md:text-6xl leading-none transition-colors" onClick={() => setLightboxAbierto(false)}>&times;</button>
              <div className="relative w-full max-w-7xl h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                {tr.galeria && tr.galeria.length > 1 && (
                  <>
                    <button className="absolute left-2 md:left-8 text-white/60 hover:text-white p-2 text-6xl md:text-8xl leading-none transition-colors z-[10000] bg-black/40 hover:bg-black/80 rounded-full w-14 h-14 md:w-20 md:h-20 flex items-center justify-center pb-3" onClick={() => setLightboxIndice((prev) => (prev - 1 + tr.galeria.length) % tr.galeria.length)}>&#8249;</button>
                    <button className="absolute right-2 md:right-8 text-white/60 hover:text-white p-2 text-6xl md:text-8xl leading-none transition-colors z-[10000] bg-black/40 hover:bg-black/80 rounded-full w-14 h-14 md:w-20 md:h-20 flex items-center justify-center pb-3" onClick={() => setLightboxIndice((prev) => (prev + 1) % tr.galeria.length)}>&#8250;</button>
                  </>
                )}
                <img src={tr.galeria ? tr.galeria[lightboxIndice] : (imagenTourDestacada || tr.imagenUrl)} alt="Zoom Tour" className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl animate-fade-in" />
              </div>
              {tr.galeria && tr.galeria.length > 1 && (
                <div className="absolute bottom-6 md:bottom-10 text-white/80 font-bold text-lg md:text-xl tracking-widest bg-black/50 px-6 py-2 rounded-full z-[10000]">
                  {lightboxIndice + 1} / {tr.galeria.length}
                </div>
              )}
            </div>
          )}
        </>
      );
    }

    // VISTA FORMULARIO GENERAL
    return (
      <div className="animate-fade-in flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            {servicioSeleccionado === 'tours' ? <Compass className="text-blue-900" /> : <MapPin className="text-blue-900" />}
            {servicioSeleccionado === 'tours' ? t.step2.select_exp : t.step2.details}
          </h3>
          <div className="space-y-6">

            {servicioSeleccionado !== 'tours' && (
              <>
                <div className="w-full mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
                  <button onClick={() => { setServicioSeleccionado(''); setBusquedaHotelPrincipal(''); }} className="text-blue-600 font-bold flex items-center hover:text-blue-800 transition group">
                    <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> {lang === 'es' ? 'Volver a las opciones' : 'Back to options'}
                  </button>
                  <button onClick={() => {
                    setPaso(1); limpiarFormularioActivo(); window.scrollTo(0, 0);
                  }}
                    className="text-gray-500 font-semibold flex items-center hover:text-gray-800 transition bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    {lang === 'es' ? 'Ir al inicio' : 'Start over'}
                  </button>
                </div>

                <div className="flex flex-col relative mb-4">
                  <label className="text-sm font-semibold text-gray-700 mb-2">Selecciona tu hotel</label>
                  <input type="text" placeholder="Escribe para buscar tu hotel..." value={busquedaHotelPrincipal} onChange={(e) => { setBusquedaHotelPrincipal(e.target.value); setMostrarDropdownHotelPrincipal(true); }} onFocus={() => setMostrarDropdownHotelPrincipal(true)} onBlur={() => setTimeout(() => setMostrarDropdownHotelPrincipal(false), 200)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition bg-white text-gray-700" />
                  {mostrarDropdownHotelPrincipal && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-xl mt-1 top-[76px] max-h-60 overflow-y-auto">
                      {hoteles.filter(h => h.nombre && h.nombre.toLowerCase().includes((busquedaHotelPrincipal || '').toLowerCase())).map(hotel => (
                        <li key={hotel.id || hotel.nombre} onMouseDown={() => {
                          const zona = hotel.zonaId || hotel.zona || "1";
                          setReserva({ ...reserva, hotelId: hotel.nombre, zonaId: zona });
                          setBusquedaHotelPrincipal(`${hotel.nombre}`);
                          setMostrarDropdownHotelPrincipal(false);
                        }} className="p-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b border-gray-100 last:border-0 transition flex justify-between items-center"
                        >
                          <span>{hotel.nombre}</span><span className="text-xs font-bold text-blue-900 bg-blue-100 px-2 py-1 rounded-md">Zona {hotel.zonaId || hotel.zona || 1}</span>
                        </li>
                      ))
                      }
                      {hoteles.filter(h => h.nombre && h.nombre.toLowerCase().includes((busquedaHotelPrincipal || '').toLowerCase())).length === 0 && (
                        <li className="p-4 text-gray-500 text-sm text-center">No encontramos un hotel con ese nombre.</li>
                      )}
                    </ul>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.step2.vehicle_type}</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {VEHICULOS.map(v => (
                      <div key={v.id} onClick={() => setReserva(prev => ({ ...prev, vehiculo: v.id }))} className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${reserva.vehiculo === v.id ? 'border-blue-900 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                        <div className="flex justify-between items-center mb-2"><span className="font-bold text-gray-900">{v.nombre}</span><Car className={reserva.vehiculo === v.id ? 'text-blue-900' : 'text-gray-400'} size={20} /></div>
                        <p className="text-xs text-gray-500">{v.descripcion[lang]}</p>
                        <p className="text-xs font-semibold text-gray-700 mt-2 flex items-center gap-1"><Users size={14} /> {t.step2.max_pax.replace('{n}', v.maxPax)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                  <div><label className="block text-sm font-semibold text-gray-700 mb-2">{t.step2.arrival_date}</label><input type="date" name="fechaLlegada" value={reserva.fechaLlegada} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none" /></div>
                  <div><label className="block text-sm font-semibold text-gray-700 mb-2">{t.step2.pax}</label><input
                    type="number" name="pasajeros" min="1" max="10" value={reserva.pasajeros}
                    onChange={(e) => {
                      let numPasajeros = parseInt(e.target.value);
                      if (isNaN(numPasajeros) || numPasajeros < 1) numPasajeros = '';
                      if (numPasajeros > 10) numPasajeros = 10;
                      let nuevoVehiculo = reserva.vehiculo;
                      if (numPasajeros > 6) nuevoVehiculo = 'van';
                      setReserva({ ...reserva, pasajeros: numPasajeros, vehiculo: nuevoVehiculo });
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-900 transition text-gray-700"
                  /></div>
                  {servicioSeleccionado === 'redondo' && <div className="md:col-span-2"><label className="block text-sm font-semibold text-gray-700 mb-2">{t.step2.return_date}</label><input type="date" name="fechaSalida" value={reserva.fechaSalida} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none" /></div>}
                </div>

                <div className="border-t border-gray-100 pt-6 mt-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2"><Baby className="text-blue-900" /> {t.step2.extras_title}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col justify-between">
                      <div className="mb-3"><p className="font-bold text-gray-800 text-sm">{t.step2.car_seat}</p><p className="text-xs text-green-600 font-bold">{t.step2.free}</p></div>
                      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <button onClick={(e) => updateSeat(e, 'carSeat', false)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold">-</button>
                        <span className="text-sm font-bold">{reserva.carSeat}</span>
                        <button onClick={(e) => updateSeat(e, 'carSeat', true)} className="w-8 h-8 flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold">+</button>
                      </div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col justify-between">
                      <div className="mb-3"><p className="font-bold text-gray-800 text-sm">{t.step2.baby_seat}</p><p className="text-xs text-green-600 font-bold">{t.step2.free}</p></div>
                      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <button onClick={(e) => updateSeat(e, 'babySeat', false)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold">-</button>
                        <span className="text-sm font-bold">{reserva.babySeat}</span>
                        <button onClick={(e) => updateSeat(e, 'babySeat', true)} className="w-8 h-8 flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold">+</button>
                      </div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col justify-between">
                      <div className="mb-3"><p className="font-bold text-gray-800 text-sm">{t.step2.booster_seat}</p><p className="text-xs text-green-600 font-bold">{t.step2.free}</p></div>
                      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <button onClick={(e) => updateSeat(e, 'boosterSeat', false)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold">-</button>
                        <span className="text-sm font-bold">{reserva.boosterSeat}</span>
                        <button onClick={(e) => updateSeat(e, 'boosterSeat', true)} className="w-8 h-8 flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold">+</button>
                      </div>
                    </div>
                  </div>

                  <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${reserva.shoppingStop ? 'border-blue-900 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                    <input type="checkbox" name="shoppingStop" checked={reserva.shoppingStop} onChange={(e) => setReserva({ ...reserva, shoppingStop: e.target.checked })} className="w-5 h-5 accent-blue-900" />
                    <ShoppingBag className={reserva.shoppingStop ? 'text-blue-900' : 'text-gray-400'} size={24} />
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{t.step2.shopping_stop} <span className="text-blue-600 ml-2 font-extrabold">+$30 USD</span></p>
                      <p className="text-xs text-gray-500">{t.step2.shopping_stop_desc}</p>
                    </div>
                  </label>
                </div>
              </>
            )}

            {/* 1. MENÚ BIFURCADO (TOURS O ESPECIALES) */}
            {servicioSeleccionado === 'tours' && !reserva.tourId && !subCategoria && (
              <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
                <div className="w-full mb-6 flex justify-start">
                  <button onClick={() => { setServicioSeleccionado(''); setPaso(1); }} className="text-blue-600 font-bold flex items-center hover:text-blue-800 transition">
                    <span className="mr-2">←</span> {t.step2.back_home}
                  </button>
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-8">{t.step2.select_category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button onClick={() => setSubCategoria('tours')} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition text-left w-full cursor-pointer flex flex-col group">
                    <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition"><Compass size={24} /></div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition">{t.step2.tours_only}</h3>
                    <p className="text-sm text-gray-500 mt-2">{t.step1.tours_desc}</p>
                  </button>
                  <button onClick={() => setSubCategoria('especiales')} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition text-left w-full cursor-pointer flex flex-col group">
                    <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition"><Car size={24} /></div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition">{t.step2.special_title}</h3>
                    <p className="text-sm text-gray-500 mt-2">{t.step2.special_desc}</p>
                  </button>
                </div>
              </div>
            )}

            {/* 2. CATÁLOGO DE SERVICIOS ESPECIALES */}
            {servicioSeleccionado === 'tours' && !reserva.tourId && subCategoria === 'especiales' && (
              <div className="max-w-4xl mx-auto mb-12 animate-fade-in">

                {/* VISTA A: LAS 4 TARJETAS */}
                {!vistaEspecial && (
                  <div className="w-full">
                    <div className="w-full mb-6 flex justify-start">
                      <button onClick={() => setSubCategoria('')} className="text-blue-600 font-bold flex items-center hover:text-blue-800 transition">
                        <span className="mr-2">←</span> {lang === 'es' ? 'Volver a Categorías' : 'Back to categories'}
                      </button>
                    </div>
                    <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-8">
                      {lang === 'es' ? 'Servicios Especiales' : 'Special Services'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div onClick={() => setVistaEspecial('cenas')} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition cursor-pointer text-left group flex flex-col h-full">
                        <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 3 C 4.5 3, 4 5, 4 7 C 4 9, 4.5 10, 6 10 C 7.5 10, 8 9, 8 7 C 8 5, 7.5 3, 6 3 Z" />
                            <path d="M6 10 V 21" />
                            <path d="M10 3 V 7 C 10 8.5, 11 9.5, 12 9.5 C 13 9.5, 14 8.5, 14 7 V 3" />
                            <path d="M12 3 V 21" />
                            <path d="M18 3 H 19.5 C 20.5 3, 21 4, 21 6 V 9 C 21 10, 20.5 10.5, 19.5 10.5 H 18" />
                            <path d="M18 3 V 21" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition-colors">Cenas y Restaurantes</h3>
                        <p className="text-sm text-gray-500 mt-2 flex-grow">Disfruta tu velada sin preocuparte por el volante.</p>
                        <div className="mt-auto pt-4 inline-flex items-center text-sm font-bold text-blue-900 group-hover:translate-x-1 transition-transform">
                          Configurar Traslado <span className="ml-1">›</span>
                        </div>
                      </div>

                      <div onClick={() => setVistaEspecial('nightlife')} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition cursor-pointer text-left group flex flex-col h-full">
                        <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors text-2xl">🍸</div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition-colors">Nightlife</h3>
                        <p className="text-sm text-gray-500 mt-2 flex-grow">Transporte seguro para disfrutar la vida nocturna de Los Cabos.</p>
                        <div className="mt-auto pt-4 inline-flex items-center text-sm font-bold text-blue-900 group-hover:translate-x-1 transition-transform">
                          Configurar Traslado <span className="ml-1">›</span>
                        </div>
                      </div>

                      <div onClick={() => setVistaEspecial('hotel')} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition cursor-pointer text-left group flex flex-col h-full">
                        <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors"><Car size={24} /></div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition-colors">Traslado de Hotel a Hotel</h3>
                        <p className="text-sm text-gray-500 mt-2 flex-grow">Cambia de resort con total comodidad y espacio para tu equipaje.</p>
                        <div className="mt-auto pt-4 inline-flex items-center text-sm font-bold text-blue-900 group-hover:translate-x-1 transition-transform">
                          Configurar Traslado <span className="ml-1">›</span>
                        </div>
                      </div>

                      <div onClick={() => setVistaEspecial('golf')} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition cursor-pointer text-left group flex flex-col h-full">
                        <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="6" />
                            <path d="M11.5 6 v .01" />
                            <path d="M14 7.5 v .01" />
                            <path d="M13 10 v .01" />
                            <path d="M10 8.5 v .01" />
                            <path d="M9 13.8 Q 11 15 11 18 V 21" />
                            <path d="M15 13.8 Q 13 15 13 18 V 21" />
                            <path d="M8 21 H 16" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition-colors">Campos de Golf</h3>
                        <p className="text-sm text-gray-500 mt-2 flex-grow">Transporte ida y vuelta a los mejores campos de Los Cabos.</p>
                        <div className="mt-auto pt-4 inline-flex items-center text-sm font-bold text-blue-900 group-hover:translate-x-1 transition-transform">
                          Configurar Traslado <span className="ml-1">›</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* VISTA B: FORMULARIO DE CENAS */}
                {vistaEspecial === 'cenas' && (
                  <div className="animate-fade-in">
                    <div className="w-full mb-6 flex justify-start">
                      <button onClick={() => { setVistaEspecial(null); setCenaOrigen(''); setCenaDestino(''); setCenaPax('1-4'); setCenaRestauranteNombre(''); setCenaHoraReserva(''); setCenaHoraRegreso(''); setCenaHora(''); setBusquedaCenaOrigen(''); setReserva(prev => ({ ...prev, rosas: false, vino: false, vinoEspumoso: false })); }} className="text-blue-600 font-bold flex items-center hover:text-blue-800 transition">
                        <span className="mr-2">←</span> {lang === 'es' ? 'Volver a Servicios Especiales' : 'Back to Special Services'}
                      </button>
                    </div>

                    {(() => {
                      const matrizPreciosCenas = {
                        'sjc': { '1': 120, '2': 150, '3': 170, '4': 250 },
                        'corredor': { '1': 140, '2': 120, '3': 150, '4': 200 },
                        'csl': { '1': 170, '2': 150, '3': 140, '4': 220 },
                        'pacifico': { '1': 250, '2': 230, '3': 220, '4': 220 }
                      };
                      const recargoCenas = { '1-4': 0, '5-8': 30, '9-10': 45 };

                      let totalPrecioCena = 0;
                      if (vistaEspecial === 'cenas' && cenaOrigen && cenaDestino) {
                        const zonaSeleccionada = String(cenaOrigen.split('|')[1]) || "1";
                        const precioBase = Number(matrizPreciosCenas[cenaDestino]?.[zonaSeleccionada] || 0);
                        totalPrecioCena = precioBase + Number(recargoCenas[cenaPax] || 0);
                      }

                      const costoExtras = (reserva.rosas ? 50 : 0) + (reserva.vino ? 70 : 0) + (reserva.vinoEspumoso ? 70 : 0);
                      const granTotalCena = totalPrecioCena > 0 ? totalPrecioCena + costoExtras : 0;

                      return (
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
                          <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-xl p-4 text-sm font-semibold mb-6 flex items-start gap-3">
                            <Info size={20} className="shrink-0 mt-0.5" />
                            <p>El servicio de traslado para cenas contempla un <strong>máximo de 3 horas</strong> de espera en el restaurante. Por favor, organiza tus horarios de regreso tomando esto en cuenta.</p>
                          </div>

                          <div className="mb-8">
                            <h2 className="text-2xl font-extrabold text-gray-900">Reserva de Transporte para Cenas</h2>
                            <p className="text-sm text-gray-500">Completa los datos para calcular tu tarifa y asegurar tu traslado.</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col relative">
                              <label className="text-sm font-semibold text-gray-700 mb-2">¿De dónde sales?</label>
                              <input type="text" placeholder="Escribe para buscar tu hotel..." value={busquedaCenaOrigen} onChange={(e) => { setBusquedaCenaOrigen(e.target.value); setMostrarDropdownCena(true); if (e.target.value === '') setCenaOrigen(''); }} onFocus={() => setMostrarDropdownCena(true)} onBlur={() => setTimeout(() => setMostrarDropdownCena(false), 200)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition text-gray-700" />
                              {mostrarDropdownCena && (
                                <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-xl mt-1 top-[76px] max-h-60 overflow-y-auto">
                                  {hoteles.filter(h => h.nombre.toLowerCase().includes((busquedaCenaOrigen || '').toLowerCase())).map(hotel => (
                                    <li key={hotel.id} onMouseDown={() => { const zona = hotel.zonaId || hotel.zona || "1"; setCenaOrigen(`${hotel.nombre}|${zona}`); setBusquedaCenaOrigen(`${hotel.nombre} (Zona ${zona})`); setMostrarDropdownCena(false); }} className="p-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b border-gray-100 last:border-0 transition flex justify-between" >
                                      <span>{hotel.nombre}</span><span className="text-xs font-bold text-blue-900 bg-blue-100 px-2 py-1 rounded-md">Zona {hotel.zona}</span>
                                    </li>
                                  ))
                                  }
                                </ul>
                              )}
                            </div>

                            <div className="flex flex-col">
                              <label className="text-sm font-semibold text-gray-700 mb-2">¿En qué área está el restaurante?</label>
                              <select value={cenaDestino} onChange={(e) => setCenaDestino(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700">
                                <option value="" disabled>Selecciona una opción...</option>
                                <option value="sjc">San José del Cabo</option>
                                <option value="corredor">Corredor Turístico</option>
                                <option value="csl">Cabo San Lucas</option>
                                <option value="pacifico">Sitio Pacífico</option>
                              </select>
                            </div>

                            <div className="flex flex-col">
                              <label className="text-sm font-semibold text-gray-700 mb-2">Nombre exacto del Restaurante</label>
                              <input type="text" placeholder="Ej. Flora Farms, Acre, etc." value={cenaRestauranteNombre} onChange={(e) => setCenaRestauranteNombre(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700" />
                            </div>

                            <div className="flex flex-col">
                              <label className="text-sm font-semibold text-gray-700 mb-2">Número de Pasajeros</label>
                              <select value={cenaPax} onChange={(e) => setCenaPax(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700">
                                <option value="1-4">1 a 4 Pasajeros</option>
                                <option value="5-8">5 a 8 Pasajeros</option>
                                <option value="9-10">9 a 10 Pasajeros</option>
                              </select>
                            </div>

                            <div className="flex flex-col md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Hora de recolección (Hotel)</label>
                                <input type="time" value={cenaHora} onChange={(e) => setCenaHora(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700" />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Hora de reserva (Restaurante)</label>
                                <input type="time" value={cenaHoraReserva} onChange={(e) => setCenaHoraReserva(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700" />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Hora de regreso (Restaurante)</label>
                                <input type="time" value={cenaHoraRegreso} onChange={(e) => setCenaHoraRegreso(e.target.value)} className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700 ${calculoHorasCena.error ? 'border-red-500 bg-red-50' : 'border-gray-200'}`} />
                              </div>
                              {calculoHorasCena.error && (
                                <div className="md:col-span-3">
                                  <p className="text-xs text-red-500 font-bold">⚠️ Estás programando {Math.floor(calculoHorasCena.diffMin / 60)}h {calculoHorasCena.diffMin % 60}m de espera. El máximo incluido es de 3 horas.</p>
                                </div>
                              )}
                            </div>

                            <div className="border-t border-gray-100 pt-6 mt-2 md:col-span-2">
                              <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">✨ Hazlo Especial</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${reserva.rosas ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-200'}`}>
                                  <input type="checkbox" checked={reserva.rosas} onChange={(e) => setReserva({ ...reserva, rosas: e.target.checked })} className="w-5 h-5 accent-pink-600" />
                                  <div className="text-2xl">🌹</div>
                                  <div className="flex-1">
                                    <p className="font-bold text-gray-900 text-sm leading-tight">Rosas <span className="text-pink-600 block font-extrabold mt-1">+$50 USD</span></p>
                                  </div>
                                </label>
                                <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${reserva.vino ? 'border-purple-800 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}>
                                  <input type="checkbox" checked={reserva.vino} onChange={(e) => setReserva({ ...reserva, vino: e.target.checked })} className="w-5 h-5 accent-purple-800" />
                                  <div className="text-2xl">🍷</div>
                                  <div className="flex-1">
                                    <p className="font-bold text-gray-900 text-sm leading-tight">Botella de Vino <span className="text-purple-800 block font-extrabold mt-1">+$70 USD</span></p>
                                  </div>
                                </label>
                                <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${reserva.vinoEspumoso ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}`}>
                                  <input type="checkbox" checked={reserva.vinoEspumoso} onChange={(e) => setReserva({ ...reserva, vinoEspumoso: e.target.checked })} className="w-5 h-5 accent-amber-600" />
                                  <div className="text-2xl">🥂</div>
                                  <div className="flex-1">
                                    <p className="font-bold text-gray-900 text-sm leading-tight">Vino Espumoso <span className="text-amber-600 block font-extrabold mt-1">+$70 USD</span></p>
                                  </div>
                                </label>
                              </div>
                            </div>

                            <div className="md:col-span-2 mt-4 bg-slate-900 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-md">
                              <div className="mb-4 md:mb-0 text-center md:text-left">
                                <p className="text-sm text-gray-400 font-medium mb-1">Costo de este servicio (USD)</p>
                                {(currentUser?.role === 'agency' || appliedPromo) && granTotalCena > 0 && (
                                  <p className="text-sm text-green-400 mb-1 line-through">${granTotalCena.toFixed(2)}</p>
                                )}
                                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
                                  {granTotalCena > 0 ? `$${(currentUser?.role === 'agency' ? granTotalCena * 0.8 : (appliedPromo ? granTotalCena * 0.9 : granTotalCena)).toFixed(2)}` : '---'}
                                </h3>
                                {granTotalCena === 0 ? (
                                  <p className="text-xs text-yellow-400 mt-2 font-medium">Selecciona área del restaurante para calcular</p>
                                ) : (
                                  <div className="mt-2">
                                    {(currentUser?.role === 'agency' || appliedPromo) && <p className="text-xs text-green-400 font-bold mb-1">✓ {discountLabel}</p>}
                                    <p className="text-xs text-gray-400 flex items-center justify-center md:justify-start"><CheckCircle size={14} className="mr-1" /> Impuestos incluidos</p>
                                  </div>
                                )}
                              </div>
                              <button
                                disabled={!cenaOrigen || !cenaDestino || !cenaRestauranteNombre || !cenaHora || !cenaHoraReserva || !cenaHoraRegreso || calculoHorasCena.error}
                                onClick={() => {
                                  setReserva(prev => ({ ...prev, tipoEspecial: 'cena', precioBaseEspecial: granTotalCena, cenaRestaurante: cenaRestauranteNombre, cenaOrigen, cenaPax, cenaHora, cenaHoraReserva, cenaHoraRegreso }));
                                  setTimeout(agregarAlCombo, 50);
                                }}
                                className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                                <Plus size={20} className="mr-2" /> Añadir a mi Combo
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* --- VISTA C: FORMULARIO TRASLADO HOTEL A HOTEL --- */}
                {vistaEspecial === 'hotel' && (
                  <div className="animate-fade-in">
                    <div className="w-full mb-6 flex justify-start">
                      <button onClick={() => { setVistaEspecial(null); setHotelOrigen(''); setHotelDestino(''); setHotelPax('1-4'); setBusquedaHhOrigen(''); setHotelHora(''); setHotelNombre(''); setReserva(prev => ({ ...prev, shoppingStop: false, carSeat: 0, babySeat: 0, boosterSeat: 0 })); }} className="text-blue-600 font-bold flex items-center hover:text-blue-800 transition">
                        <span className="mr-2">←</span> {lang === 'es' ? 'Volver a Servicios Especiales' : 'Back to Special Services'}
                      </button>
                    </div>

                    {(() => {
                      const matrizPreciosHotel = {
                        'sjc': { '1': 50, '2': 80, '3': 110, '4': 140 },
                        'csl': { '1': 110, '2': 90, '3': 60, '4': 50 },
                        'corredor': { '1': 80, '2': 60, '3': 70, '4': 90 },
                        'pacifico': { '1': 200, '2': 180, '3': 160, '4': 160 }
                      };
                      const recargoHotel = { '1-4': 0, '5-8': 20, '9-10': 30 };

                      let totalPrecioHotel = 0;
                      if (hotelOrigen && hotelDestino) {
                        const zonaSeleccionada = hotelOrigen.split('|')[1] || "1";
                        const precioBase = Number(matrizPreciosHotel[hotelDestino]?.[zonaSeleccionada] || 0);
                        totalPrecioHotel = precioBase + Number(recargoHotel[hotelPax] || 0);
                      }

                      return (
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
                          <div className="mb-8">
                            <h2 className="text-2xl font-extrabold text-gray-900">Traslado entre Hoteles</h2>
                            <p className="text-sm text-gray-500">Dinos en qué hotel te encuentras y a cuál te mudas para asegurar tu transporte.</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col relative">
                              <label className="text-sm font-semibold text-gray-700 mb-2">Hotel de Origen (Check-out)</label>
                              <input type="text" placeholder="Escribe para buscar tu hotel actual..." value={busquedaHhOrigen} onChange={(e) => { setBusquedaHhOrigen(e.target.value); setMostrarDropdownHotelOrigen(true); if (e.target.value === '') setHotelOrigen(''); }} onFocus={() => setMostrarDropdownHotelOrigen(true)} onBlur={() => setTimeout(() => setMostrarDropdownHotelOrigen(false), 200)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition bg-white text-gray-700" />
                              {mostrarDropdownHotelOrigen && (
                                <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-xl mt-1 top-[76px] max-h-60 overflow-y-auto">
                                  {hoteles.filter(h => h.nombre.toLowerCase().includes((busquedaHhOrigen || '').toLowerCase())).map(hotel => (
                                    <li key={hotel.id} onMouseDown={() => { const zona = hotel.zonaId || hotel.zona || "1"; setHotelOrigen(`${hotel.nombre}|${zona}`); setBusquedaHhOrigen(`${hotel.nombre} (Zona ${zona})`); setMostrarDropdownHotelOrigen(false); }} className="p-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b border-gray-100 last:border-0 transition flex justify-between" >
                                      <span>{hotel.nombre}</span><span className="text-xs font-bold text-blue-900 bg-blue-100 px-2 py-1 rounded-md">Zona {hotel.zona}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>

                            <div className="flex flex-col">
                              <label className="text-sm font-semibold text-gray-700 mb-2">Zona del nuevo Hotel</label>
                              <select value={hotelDestino} onChange={(e) => setHotelDestino(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700">
                                <option value="" disabled>Selecciona la zona...</option>
                                <option value="sjc">San José del Cabo</option>
                                <option value="csl">Cabo San Lucas</option>
                                <option value="corredor">Corredor Turístico</option>
                                <option value="pacifico">Zona del Pacífico</option>
                              </select>
                            </div>

                            <div className="flex flex-col">
                              <label className="text-sm font-semibold text-gray-700 mb-2">Nombre exacto del nuevo Hotel</label>
                              <input type="text" value={hotelNombre} onChange={(e) => setHotelNombre(e.target.value)} placeholder="Ej. Hard Rock Hotel, Riu Palace..." className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700" />
                            </div>

                            <div className="flex flex-col">
                              <label className="text-sm font-semibold text-gray-700 mb-2">Número de Pasajeros</label>
                              <select value={hotelPax} onChange={(e) => setHotelPax(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700">
                                <option value="1-4">1 a 4 Pasajeros</option>
                                <option value="5-8">5 a 8 Pasajeros</option>
                                <option value="9-10">9 a 10 Pasajeros</option>
                              </select>
                            </div>

                            <div className="flex flex-col md:col-span-2">
                              <label className="text-sm font-semibold text-gray-700 mb-2">Hora de Pick-up</label>
                              <input type="time" value={hotelHora} onChange={(e) => setHotelHora(e.target.value)} className="w-full md:w-1/2 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700" />
                              <p className="text-xs text-blue-600 mt-2 font-medium">Sugerencia: Revisa los horarios de check-out en tu hotel actual y check-in en tu destino para programar tu traslado sin inconvenientes.</p>
                            </div>

                            <div className="border-t border-gray-100 pt-6 mt-2 md:col-span-2">
                              <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2"><Baby className="text-blue-900" /> {t.step2.extras_title}</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col justify-between">
                                  <div className="mb-3"><p className="font-bold text-gray-800 text-sm">{t.step2.car_seat}</p><p className="text-xs text-green-600 font-bold">{t.step2.free}</p></div>
                                  <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <button onClick={(e) => updateSeat(e, 'carSeat', false)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold">-</button>
                                    <span className="text-sm font-bold">{reserva.carSeat}</span>
                                    <button onClick={(e) => updateSeat(e, 'carSeat', true)} className="w-8 h-8 flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold">+</button>
                                  </div>
                                </div>
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col justify-between">
                                  <div className="mb-3"><p className="font-bold text-gray-800 text-sm">{t.step2.baby_seat}</p><p className="text-xs text-green-600 font-bold">{t.step2.free}</p></div>
                                  <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <button onClick={(e) => updateSeat(e, 'babySeat', false)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold">-</button>
                                    <span className="text-sm font-bold">{reserva.babySeat}</span>
                                    <button onClick={(e) => updateSeat(e, 'babySeat', true)} className="w-8 h-8 flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold">+</button>
                                  </div>
                                </div>
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col justify-between">
                                  <div className="mb-3"><p className="font-bold text-gray-800 text-sm">{t.step2.booster_seat}</p><p className="text-xs text-green-600 font-bold">{t.step2.free}</p></div>
                                  <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <button onClick={(e) => updateSeat(e, 'boosterSeat', false)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold">-</button>
                                    <span className="text-sm font-bold">{reserva.boosterSeat}</span>
                                    <button onClick={(e) => updateSeat(e, 'boosterSeat', true)} className="w-8 h-8 flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold">+</button>
                                  </div>
                                </div>
                              </div>
                              <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${reserva.shoppingStop ? 'border-blue-900 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                                <input type="checkbox" name="shoppingStop" checked={reserva.shoppingStop} onChange={(e) => setReserva({ ...reserva, shoppingStop: e.target.checked })} className="w-5 h-5 accent-blue-900" />
                                <ShoppingBag className={reserva.shoppingStop ? 'text-blue-900' : 'text-gray-400'} size={24} />
                                <div className="flex-1">
                                  <p className="font-bold text-gray-900">{t.step2.shopping_stop} <span className="text-blue-600 ml-2 font-extrabold">+$30 USD</span></p>
                                  <p className="text-xs text-gray-500">{t.step2.shopping_stop_desc}</p>
                                </div>
                              </label>
                            </div>

                            <div className="md:col-span-2 mt-4 bg-slate-900 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-md">
                              <div className="mb-4 md:mb-0 text-center md:text-left">
                                <p className="text-sm text-gray-400 font-medium mb-1">Costo de este servicio (USD)</p>
                                {(currentUser?.role === 'agency' || appliedPromo) && totalPrecioHotel > 0 && (
                                  <p className="text-sm text-green-400 mb-1 line-through">${(totalPrecioHotel + (reserva.shoppingStop ? 30 : 0)).toFixed(2)}</p>
                                )}
                                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
                                  {totalPrecioHotel > 0 ? `$${(currentUser?.role === 'agency' ? (totalPrecioHotel + (reserva.shoppingStop ? 30 : 0)) * 0.8 : (appliedPromo ? (totalPrecioHotel + (reserva.shoppingStop ? 30 : 0)) * 0.9 : (totalPrecioHotel + (reserva.shoppingStop ? 30 : 0)))).toFixed(2)}` : '---'}
                                </h3>
                                {totalPrecioHotel === 0 ? (
                                  <p className="text-xs text-yellow-400 mt-2 font-medium">Selecciona origen y destino para calcular</p>
                                ) : (
                                  <div className="mt-2">
                                    {(currentUser?.role === 'agency' || appliedPromo) && <p className="text-xs text-green-400 font-bold mb-1">✓ {discountLabel}</p>}
                                    <p className="text-xs text-gray-400 flex items-center justify-center md:justify-start"><CheckCircle size={14} className="mr-1" /> Impuestos incluidos</p>
                                  </div>
                                )}
                              </div>
                              <button
                                disabled={!hotelOrigen || !hotelDestino || !hotelNombre || !hotelHora}
                                onClick={() => {
                                  setReserva(prev => ({ ...prev, tipoEspecial: 'hotel-hotel', precioBaseEspecial: totalPrecioHotel + (reserva.shoppingStop ? 30 : 0), hhOrigen: hotelOrigen, hhDestino: hotelDestino, hhPax: hotelPax, hhHora: hotelHora }));
                                  setTimeout(agregarAlCombo, 50);
                                }}
                                className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                                <Plus size={20} className="mr-2" /> Añadir a mi Combo
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* --- VISTA D: FORMULARIO DE GOLF --- */}
                {vistaEspecial === 'golf' && (
                  <div className="animate-fade-in">
                    <div className="w-full mb-6 flex justify-start">
                      <button onClick={() => { setVistaEspecial(null); setGolfOrigen(''); setGolfDestino(''); setGolfPax('1-4'); setGolfNombre(''); setGolfHora(''); setGolfHoraReserva(''); setGolfHoraRegreso(''); setBusquedaGolfOrigen(''); }} className="text-blue-600 font-bold flex items-center hover:text-blue-800 transition">
                        <span className="mr-2">←</span> {lang === 'es' ? 'Volver a Servicios Especiales' : 'Back to Special Services'}
                      </button>
                    </div>

                    {(() => {
                      const matrizPreciosGolf = {
                        'sjc': { '1': 60, '2': 90, '3': 120, '4': 150 },
                        'csl': { '1': 110, '2': 85, '3': 65, '4': 50 },
                        'corredor': { '1': 80, '2': 60, '3': 70, '4': 95 },
                        'pacifico': { '1': 160, '2': 140, '3': 120, '4': 80 }
                      };
                      const recargoGolf = { '1-4': 0, '5-8': 40, '9-10': 60 };

                      let totalPrecioGolf = 0;
                      if (golfOrigen && golfDestino) {
                        const zonaSeleccionada = golfOrigen.split('|')[1] || "1";
                        const precioBase = Number(matrizPreciosGolf[golfDestino]?.[zonaSeleccionada] || 0);
                        totalPrecioGolf = precioBase + Number(recargoGolf[golfPax] || 0);
                      }

                      return (
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
                          <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-xl p-4 text-sm font-semibold mb-6 flex items-start gap-3">
                            <Info size={20} className="shrink-0 mt-0.5" />
                            <p>El servicio de traslado para golf contempla un <strong>máximo de 3 horas</strong> de espera en el campo. Por favor, organiza tus horarios de regreso tomando esto en cuenta.</p>
                          </div>

                          <div className="mb-8">
                            <h2 className="text-2xl font-extrabold text-gray-900">Traslado a Campo de Golf</h2>
                            <p className="text-sm text-gray-500">Llega a tiempo a tu Tee Time. Contamos con vehículos espaciosos para tus palos de golf.</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col relative">
                              <label className="text-sm font-semibold text-gray-700 mb-2">¿En qué hotel te hospedas?</label>
                              <input type="text" placeholder="Escribe para buscar tu hotel..." value={busquedaGolfOrigen} onChange={(e) => { setBusquedaGolfOrigen(e.target.value); setMostrarDropdownGolfOrigen(true); if (e.target.value === '') setGolfOrigen(''); }} onFocus={() => setMostrarDropdownGolfOrigen(true)} onBlur={() => setTimeout(() => setMostrarDropdownGolfOrigen(false), 200)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition text-gray-700" />
                              {mostrarDropdownGolfOrigen && (
                                <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-xl mt-1 top-[76px] max-h-60 overflow-y-auto">
                                  {hoteles.filter(h => h.nombre.toLowerCase().includes((busquedaGolfOrigen || '').toLowerCase())).map(hotel => (
                                    <li key={hotel.id} onMouseDown={() => { const zona = hotel.zonaId || hotel.zona || "1"; setGolfOrigen(`${hotel.nombre}|${zona}`); setBusquedaGolfOrigen(`${hotel.nombre} (Zona ${zona})`); setMostrarDropdownGolfOrigen(false); }} className="p-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b border-gray-100 last:border-0 transition flex justify-between" >
                                      <span>{hotel.nombre}</span><span className="text-xs font-bold text-blue-900 bg-blue-100 px-2 py-1 rounded-md">Zona {hotel.zona}</span>
                                    </li>
                                  ))
                                  }
                                </ul>
                              )}
                            </div>

                            <div className="flex flex-col">
                              <label className="text-sm font-semibold text-gray-700 mb-2">Zona del Campo de Golf</label>
                              <select value={golfDestino} onChange={(e) => setGolfDestino(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700">
                                <option value="" disabled>Selecciona la zona...</option>
                                <option value="sjc">San José del Cabo</option>
                                <option value="csl">Cabo San Lucas</option>
                                <option value="corredor">Corredor Turístico</option>
                                <option value="pacifico">Sitio Pacífico</option>
                              </select>
                            </div>

                            <div className="flex flex-col">
                              <label className="text-sm font-semibold text-gray-700 mb-2">Nombre exacto del Campo</label>
                              <input type="text" value={golfNombre} onChange={(e) => setGolfNombre(e.target.value)} placeholder="Ej. Quivira, Cabo del Sol, Palmilla..." className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700" />
                            </div>

                            <div className="flex flex-col">
                              <label className="text-sm font-semibold text-gray-700 mb-2">Número de Pasajeros</label>
                              <select value={golfPax} onChange={(e) => setGolfPax(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700">
                                <option value="1-4">1 a 4 Pasajeros</option>
                                <option value="5-8">5 a 8 Pasajeros</option>
                                <option value="9-10">9 a 10 Pasajeros</option>
                              </select>
                            </div>

                            <div className="flex flex-col md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Hora de recolección (Hotel)</label>
                                <input type="time" value={golfHora} onChange={(e) => setGolfHora(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700" />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Hora de Tee Time (Campo)</label>
                                <input type="time" value={golfHoraReserva} onChange={(e) => setGolfHoraReserva(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700" />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Hora de regreso (Campo)</label>
                                <input type="time" value={golfHoraRegreso} onChange={(e) => setGolfHoraRegreso(e.target.value)} className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700 ${calculoHorasGolf.error ? 'border-red-500 bg-red-50' : 'border-gray-200'}`} />
                              </div>
                              {calculoHorasGolf.error && (
                                <div className="md:col-span-3">
                                  <p className="text-xs text-red-500 font-bold">⚠️ Estás programando {Math.floor(calculoHorasGolf.diffMin / 60)}h {calculoHorasGolf.diffMin % 60}m de espera. El máximo incluido es de 3 horas.</p>
                                </div>
                              )}
                            </div>

                            <div className="md:col-span-2 mt-4 bg-slate-900 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-md">
                              <div className="mb-4 md:mb-0 text-center md:text-left">
                                <p className="text-sm text-gray-400 font-medium mb-1">Costo de este servicio (USD)</p>
                                {(currentUser?.role === 'agency' || appliedPromo) && totalPrecioGolf > 0 && (
                                  <p className="text-sm text-green-400 mb-1 line-through">${totalPrecioGolf.toFixed(2)}</p>
                                )}
                                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
                                  {totalPrecioGolf > 0 ? `$${(currentUser?.role === 'agency' ? totalPrecioGolf * 0.8 : (appliedPromo ? totalPrecioGolf * 0.9 : totalPrecioGolf)).toFixed(2)}` : '---'}
                                </h3>
                                {totalPrecioGolf === 0 ? (
                                  <p className="text-xs text-yellow-400 mt-2 font-medium">Selecciona hotel y campo para calcular</p>
                                ) : (
                                  <div className="mt-2">
                                    {(currentUser?.role === 'agency' || appliedPromo) && <p className="text-xs text-green-400 font-bold mb-1">✓ {discountLabel}</p>}
                                    <p className="text-xs text-gray-400 flex items-center justify-center md:justify-start"><CheckCircle size={14} className="mr-1" /> Impuestos incluidos</p>
                                  </div>
                                )}
                              </div>
                              <button
                                disabled={!golfOrigen || !golfDestino || !golfNombre || !golfHora || !golfHoraReserva || !golfHoraRegreso || calculoHorasGolf.error}
                                onClick={() => {
                                  setReserva(prev => ({ ...prev, tipoEspecial: 'golf', precioBaseEspecial: totalPrecioGolf, golfOrigen, golfDestino, golfPax, golfNombre, golfHora, golfHoraReserva, golfHoraRegreso }));
                                  setTimeout(agregarAlCombo, 50);
                                }}
                                className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                                <Plus size={20} className="mr-2" /> Añadir a mi Combo
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* --- VISTA E: FORMULARIO DE NIGHTLIFE --- */}
                {vistaEspecial === 'nightlife' && (
                  <div className="animate-fade-in">
                    <div className="w-full mb-6 flex justify-start">
                      <button onClick={() => { setVistaEspecial(null); setNightlifeOrigen(''); setNightlifeDestino(''); setNightlifePax('1-4'); setNightlifeLugarNombre(''); setNightlifeHora(''); setNightlifeHoraReserva(''); setNightlifeHoraRegreso(''); setBusquedaNightlifeOrigen(''); }} className="text-blue-600 font-bold flex items-center hover:text-blue-800 transition">
                        <span className="mr-2">←</span> {lang === 'es' ? 'Volver a Servicios Especiales' : 'Back to Special Services'}
                      </button>
                    </div>

                    {(() => {
                      // Matriz con los precios exactos que pediste para Zona 1. Las demás zonas tienen un estimado para evitar errores si las seleccionan.
                      const matrizPreciosNightlife = {
                        'sjc': { '1': 200, '2': 250, '3': 300, '4': 350 },
                        'corredor': { '1': 250, '2': 200, '3': 250, '4': 300 },
                        'csl': { '1': 300, '2': 250, '3': 200, '4': 250 },
                        'pacifico': { '1': 380, '2': 330, '3': 280, '4': 200 }
                      };
                      const recargoNightlife = { '1-4': 0, '5-8': 40, '9-10': 50 };

                      let totalPrecioNightlife = 0;
                      if (nightlifeOrigen && nightlifeDestino) {
                        const zonaSeleccionada = String(nightlifeOrigen.split('|')[1]) || "1";
                        const precioBase = Number(matrizPreciosNightlife[nightlifeDestino]?.[zonaSeleccionada] || 0);
                        totalPrecioNightlife = precioBase + Number(recargoNightlife[nightlifePax] || 0);
                      }

                      return (
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
                          <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-xl p-4 text-sm font-semibold mb-6 flex items-start gap-3">
                            <Info size={20} className="shrink-0 mt-0.5" />
                            <p>El servicio de traslado de vida nocturna contempla un <strong>máximo de 4 horas</strong> de espera. Por favor, organiza tus horarios de regreso tomando esto en cuenta.</p>
                          </div>

                          <div className="mb-8">
                            <h2 className="text-2xl font-extrabold text-gray-900">Reserva de Transporte Nightlife</h2>
                            <p className="text-sm text-gray-500">Completa los datos para calcular tu tarifa y asegurar tu traslado.</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col relative">
                              <label className="text-sm font-semibold text-gray-700 mb-2">¿De dónde sales?</label>
                              <input type="text" placeholder="Escribe para buscar tu hotel..." value={busquedaNightlifeOrigen} onChange={(e) => { setBusquedaNightlifeOrigen(e.target.value); setMostrarDropdownNightlife(true); if (e.target.value === '') setNightlifeOrigen(''); }} onFocus={() => setMostrarDropdownNightlife(true)} onBlur={() => setTimeout(() => setMostrarDropdownNightlife(false), 200)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none transition text-gray-700" />
                              {mostrarDropdownNightlife && (
                                <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-xl mt-1 top-[76px] max-h-60 overflow-y-auto">
                                  {hoteles.filter(h => h.nombre.toLowerCase().includes((busquedaNightlifeOrigen || '').toLowerCase())).map(hotel => (
                                    <li key={hotel.id} onMouseDown={() => { const zona = hotel.zonaId || hotel.zona || "1"; setNightlifeOrigen(`${hotel.nombre}|${zona}`); setBusquedaNightlifeOrigen(`${hotel.nombre} (Zona ${zona})`); setMostrarDropdownNightlife(false); }} className="p-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b border-gray-100 last:border-0 transition flex justify-between" >
                                      <span>{hotel.nombre}</span><span className="text-xs font-bold text-blue-900 bg-blue-100 px-2 py-1 rounded-md">Zona {hotel.zona}</span>
                                    </li>
                                  ))
                                  }
                                </ul>
                              )}
                            </div>

                            <div className="flex flex-col">
                              <label className="text-sm font-semibold text-gray-700 mb-2">¿En qué área está el lugar?</label>
                              <select value={nightlifeDestino} onChange={(e) => setNightlifeDestino(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700">
                                <option value="" disabled>Selecciona una opción...</option>
                                <option value="sjc">San José del Cabo</option>
                                <option value="corredor">Corredor Turístico</option>
                                <option value="csl">Cabo San Lucas</option>
                                <option value="pacifico">Sitio Pacífico</option>
                              </select>
                            </div>

                            <div className="flex flex-col">
                              <label className="text-sm font-semibold text-gray-700 mb-2">Nombre exacto del lugar</label>
                              <input type="text" placeholder="Ej. El Squid Roe, Mandala, etc." value={nightlifeLugarNombre} onChange={(e) => setNightlifeLugarNombre(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700" />
                            </div>

                            <div className="flex flex-col">
                              <label className="text-sm font-semibold text-gray-700 mb-2">Número de Pasajeros</label>
                              <select value={nightlifePax} onChange={(e) => setNightlifePax(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700">
                                <option value="1-4">1 a 4 Pasajeros</option>
                                <option value="5-8">5 a 8 Pasajeros</option>
                                <option value="9-10">9 a 10 Pasajeros</option>
                              </select>
                            </div>

                            <div className="flex flex-col md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Hora de recolección (Hotel)</label>
                                <input type="time" value={nightlifeHora} onChange={(e) => setNightlifeHora(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700" />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Hora de llegada (Lugar)</label>
                                <input type="time" value={nightlifeHoraReserva} onChange={(e) => setNightlifeHoraReserva(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700" />
                              </div>
                              <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-2">Hora de regreso (Lugar)</label>
                                <input type="time" value={nightlifeHoraRegreso} onChange={(e) => setNightlifeHoraRegreso(e.target.value)} className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-gray-700 ${calculoHorasNightlife.error ? 'border-red-500 bg-red-50' : 'border-gray-200'}`} />
                              </div>
                              {calculoHorasNightlife.error && (
                                <div className="md:col-span-3">
                                  <p className="text-xs text-red-500 font-bold">⚠️ Estás programando {Math.floor(calculoHorasNightlife.diffMin / 60)}h {calculoHorasNightlife.diffMin % 60}m de espera. El máximo incluido es de 4 horas.</p>
                                </div>
                              )}
                            </div>

                            <div className="md:col-span-2 mt-4 bg-slate-900 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-md">
                              <div className="mb-4 md:mb-0 text-center md:text-left">
                                <p className="text-sm text-gray-400 font-medium mb-1">Costo de este servicio (USD)</p>
                                {(currentUser?.role === 'agency' || appliedPromo) && totalPrecioNightlife > 0 && (
                                  <p className="text-sm text-green-400 mb-1 line-through">${totalPrecioNightlife.toFixed(2)}</p>
                                )}
                                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
                                  {totalPrecioNightlife > 0 ? `$${(currentUser?.role === 'agency' ? totalPrecioNightlife * 0.8 : (appliedPromo ? totalPrecioNightlife * 0.9 : totalPrecioNightlife)).toFixed(2)}` : '---'}
                                </h3>
                                {totalPrecioNightlife === 0 ? (
                                  <p className="text-xs text-yellow-400 mt-2 font-medium">Selecciona área del lugar para calcular</p>
                                ) : (
                                  <div className="mt-2">
                                    {(currentUser?.role === 'agency' || appliedPromo) && <p className="text-xs text-green-400 font-bold mb-1">✓ {discountLabel}</p>}
                                    <p className="text-xs text-gray-400 flex items-center justify-center md:justify-start"><CheckCircle size={14} className="mr-1" /> Impuestos incluidos</p>
                                  </div>
                                )}
                              </div>
                              <button
                                disabled={!nightlifeOrigen || !nightlifeDestino || !nightlifeLugarNombre || !nightlifeHora || !nightlifeHoraReserva || !nightlifeHoraRegreso || calculoHorasNightlife.error}
                                onClick={() => {
                                  setReserva(prev => ({ ...prev, tipoEspecial: 'nightlife', precioBaseEspecial: totalPrecioNightlife, nightlifeLugarNombre: nightlifeLugarNombre, nightlifeOrigen, nightlifePax, nightlifeHora, nightlifeHoraReserva, nightlifeHoraRegreso }));
                                  setTimeout(agregarAlCombo, 50);
                                }}
                                className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                                <Plus size={20} className="mr-2" /> Añadir a mi Combo
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}

            {/* 3. BOTÓN DE REGRESAR PARA TOURS ORIGINALES */}
            {servicioSeleccionado === 'tours' && !reserva.tourId && subCategoria === 'tours' && (
              <div className="w-full mb-4 animate-fade-in">
                <button onClick={() => setSubCategoria('')} className="text-blue-600 font-bold flex items-center hover:text-blue-800 transition">
                  <span className="mr-2">←</span> {t.step2.back_categories}
                </button>
              </div>
            )}

            {/* CATALOGO DE TOURS SI NO HAY UNO SELECCIONADO */}
            {servicioSeleccionado === 'tours' && !reserva.tourId && subCategoria === 'tours' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tours.filter(tr => tr.activo).map(tr => (
                  <div key={tr.id} onClick={() => {
                    setReserva(prev => ({ ...prev, tourId: tr.id, pasajeros: Math.max(prev.pasajeros, tr.minPax) }));
                    setImagenTourDestacada(tr.imagenUrl);
                  }} className="group cursor-pointer border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-900 hover:shadow-lg transition-all">
                    <div className="h-32 overflow-hidden relative"><img src={tr.imageUrl} alt={tr.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /><div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-3"><span className="text-white font-bold text-lg">{tr.nombre[lang]}</span></div></div>
                    <div className="p-3 flex justify-between items-center bg-white"><span className="text-sm font-bold text-blue-900">${tr.precioPx} USD</span></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* WIDGET DE RESUMEN A LA DERECHA */}
        {!reserva.tipoEspecial && (!vistaEspecial) && (
          <ResumenFlotante conBoton={true} onContinue={agregarAlCombo} disabledBtn={!puedeAvanzarPaso2()} btnText={t.cart?.add || 'Añadir a mi combo'} />
        )}
      </div>
    );
  };

  const renderCartSummaryWidget = (showPaymentSelection = false) => {
    return (
      <div className="w-full lg:w-96 flex-shrink-0 animate-fade-in">
        <div className="bg-gray-900 rounded-2xl shadow-xl p-6 text-white sticky top-28 border border-gray-700">
          <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-4 flex items-center gap-2">
            <ShoppingBag size={20} className="text-blue-400" /> {t.cart.total}
          </h3>

          <div className="space-y-4 text-sm mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
            {carrito.map(item => (
              <div key={item.id} className="border-b border-gray-800 pb-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-white max-w-[70%]">{item.titulo}</span>
                  <span className="text-right font-bold text-blue-300">${item.precio.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400">{item.subtitulo}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-800">
            <div className="flex justify-between items-end mb-2">
              <span className="text-gray-400 text-sm">Subtotal:</span>
              <span className="text-white font-semibold">${carritoSubtotal.toFixed(2)}</span>
            </div>

            {carritoDescuento > 0 && (
              <div className="flex justify-between items-end mb-4 text-green-400">
                <span className="text-xs font-bold">{discountLabel}</span>
                <span className="font-bold">-${carritoDescuento.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between items-end mt-4">
              <span className="text-gray-400 text-sm">{t.step4.total_pay}</span>
              <div className="text-right">
                <span className="text-4xl font-black text-white">${carritoTotal.toFixed(2)}</span>
                <span className="block text-xs text-gray-500 mt-1">{t.step2.includes_tax}</span>
              </div>
            </div>
          </div>

          {showPaymentSelection && (
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h4 className="font-bold text-white mb-4 text-sm">{t.step4.payment_method}</h4>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${datosCliente.paymentMethod === 'paypal' ? 'bg-blue-900/50 border-blue-500' : 'bg-gray-800 border-gray-700 hover:border-gray-500'}`}>
                  <input type="radio" name="paymentMethod" value="paypal" checked={datosCliente.paymentMethod === 'paypal'} onChange={handleClienteChange} className="w-4 h-4 accent-blue-500" />
                  <CreditCard size={20} className={datosCliente.paymentMethod === 'paypal' ? 'text-blue-400' : 'text-gray-400'} />
                  <span className="font-semibold text-sm">PayPal</span>
                </label>
                {/* OPCIÓN 2: EFECTIVO (Esta es la que te falta agregar) */}
                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${datosCliente.paymentMethod === 'cash' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-transparent'}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={datosCliente.paymentMethod === 'cash'}
                    onChange={() => setDatosCliente({ ...datosCliente, paymentMethod: 'cash' })}
                    className="text-blue-500 focus:ring-0"
                  />
                  <span className="font-medium text-sm flex items-center gap-2">💵 Pagar en Efectivo al Llegar</span>
                </label>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button onClick={regresarPaso} className="px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition flex items-center justify-center font-bold">
              <ChevronLeft size={20} />
            </button>
            {showPaymentSelection ? (
              <>
          {datosCliente.paymentMethod === 'cash' && (
            <button
              onClick={procesarConfirmacion}
              disabled={procesandoPago}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex justify-center items-center transition shadow-lg disabled:opacity-50"
            >
              {procesandoPago ? t.step4.processing : t.step4.confirm_cash}
            </button>
          )}
              </>
            ) : (
              <button
                onClick={avanzarPaso}
                disabled={!puedeAvanzarPaso3()}
                className={`flex-1 py-3 rounded-xl font-bold flex justify-center items-center transition ${!puedeAvanzarPaso3() ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'}`}
              >
                {t.step3.review} <ChevronRight size={20} className="ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderPaso3 = () => {
    return (
      <div className="animate-fade-in max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">

          {/* Información del Cliente */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User className="text-blue-900" /> {t.step3.client_info}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.step3.names}</label>
                <input type="text" name="clienteNombre" value={datosCliente.clienteNombre} onChange={handleClienteChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-900" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.step3.lastnames}</label>
                <input type="text" name="clienteApellidos" value={datosCliente.clienteApellidos} onChange={handleClienteChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-900" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.auth.email}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="email" name="clienteEmail" value={datosCliente.clienteEmail} onChange={handleClienteChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-900" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.step3.phone}</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="tel" name="clienteTelefono" value={datosCliente.clienteTelefono} onChange={handleClienteChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-900" />
                </div>
              </div>
            </div>
          </div>

          {/* Información de Vuelos (Por cada servicio en el carrito que lo requiera) */}
          {carrito.filter(item => ['aeropuerto_hotel', 'hotel_aeropuerto', 'redondo'].includes(item.servicio)).map(item => (
            <div key={`flight-${item.id}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <PlaneLanding className="text-blue-900" /> {t.step3.flight_info}
              </h3>
              <p className="text-sm text-gray-500 mb-6 font-semibold bg-gray-50 p-2 rounded-lg inline-block">{item.titulo} - {item.subtitulo}</p>

              <div className="space-y-8">
                {(item.servicio === 'aeropuerto_hotel' || item.servicio === 'redondo') && (
                  <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2"><PlaneLanding size={18} /> {t.step3.arrival_flight}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">{t.step3.airline}</label>
                        <input type="text" value={item.flightInfo.aerolineaLlegada} onChange={(e) => handleVueloChange(item.id, 'aerolineaLlegada', e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900" placeholder="Ej. American Airlines" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">{t.step3.flight_num}</label>
                        <input type="text" value={item.flightInfo.vueloLlegada} onChange={(e) => handleVueloChange(item.id, 'vueloLlegada', e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900" placeholder="Ej. AA1234" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">{t.step3.arrival_time}</label>
                        <input type="time" value={item.flightInfo.horaLlegada} onChange={(e) => handleVueloChange(item.id, 'horaLlegada', e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900" />
                      </div>
                    </div>
                  </div>
                )}

                {(item.servicio === 'hotel_aeropuerto' || item.servicio === 'redondo') && (
                  <div className="bg-orange-50/50 p-5 rounded-2xl border border-orange-100">
                    <h4 className="font-bold text-orange-900 mb-4 flex items-center gap-2"><PlaneTakeoff size={18} /> {t.step3.departure_flight}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">{t.step3.airline}</label>
                        <input type="text" value={item.flightInfo.aerolineaSalida} onChange={(e) => handleVueloChange(item.id, 'aerolineaSalida', e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Ej. Delta" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">{t.step3.flight_num}</label>
                        <input type="text" value={item.flightInfo.vueloSalida} onChange={(e) => handleVueloChange(item.id, 'vueloSalida', e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500" placeholder="Ej. DL5678" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">{t.step3.departure_time}</label>
                        <input type="time" value={item.flightInfo.horaSalida} onChange={(e) => handleVueloChange(item.id, 'horaSalida', e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-orange-200 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-800">Hora de Pick-up sugerida</p>
                        <p className="text-xs text-gray-500">{t.step3.pickup_note}</p>
                      </div>
                      <input type="time" value={item.flightInfo.horaPickUp} onChange={(e) => handleVueloChange(item.id, 'horaPickUp', e.target.value)} className="w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 font-bold" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {renderCartSummaryWidget(false)}
      </div>
    );
  };

  const renderPaso4 = () => {      // <-- ESTO ES LO QUE FALTA
    return (
      <div className="flex flex-col lg:flex-row gap-8 animate-fade-in max-w-7xl mx-auto px-4">

        {/* COLUMNA IZQUIERDA: DETALLES Y PAGO */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-black mb-6 text-gray-800 border-b pb-4 uppercase">
              Confirmación de Reserva
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-gray-400 uppercase font-bold text-[10px] tracking-widest">Pasajero</p>
                <p className="font-bold text-gray-900 text-lg">{datosCliente.nombre}</p>
                <p className="text-gray-600">{datosCliente.email}</p>
              </div>
              <div>
                <p className="text-gray-400 uppercase font-bold text-[10px] tracking-widest">Detalles</p>
                <p className="font-bold text-gray-900">{reserva.pasajeros} Personas</p>
                <p className="text-gray-600">{reserva.fechaLlegada}</p>
              </div>
            </div>

            {/* 🔥 AQUÍ PEGAS TU CÓDIGO DE PAYPAL 🔥 */}
            {datosCliente.paymentMethod === 'paypal' && (
              <div className="mt-8">
                <PayPalButtons
                  style={{ layout: "vertical", shape: "rect" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            // Usamos tu variable carritoTotal para cobrar lo correcto
                            value: carritoTotal.toFixed(2),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      // Cuando el pago sea exitoso, detonamos tu función de confirmación
                      procesarConfirmacion();
                    });
                  }}
                />
              </div>
            )}

          </div>
        </div>

        {/* COLUMNA DERECHA: RESUMEN (No tocar) */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="sticky top-28">
            {renderCartSummaryWidget(true)}
          </div>
        </div>

      </div>
    );
  };

  // =========================================================
  // ✏️ NUEVA PANTALLA: MODIFICAR DATOS DESDE EL CORREO
  // =========================================================

  const [idModificar, setIdModificar] = useState('');
  const [cargandoModificar, setCargandoModificar] = useState(false);
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);

  // 👇 ESTADOS DEL BUSCADOR INTEGRADOS CORRECTAMENTE 👇
  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  const [datosModificar, setDatosModificar] = useState({
    nombre: '',
    hotel: '',
    zonaOriginal: 1,
    zonaNueva: 1,
    metodoPagoExtra: '',
    fechaLlegada: '',
    aerolineaLlegada: '',
    vueloLlegada: '',
    horaLlegada: '',
    fechaSalida: '',
    aerolineaSalida: '',
    vueloSalida: '',
    horaSalida: '',
    horaPickUp: ''
  });

  // Fórmula matemática para el cobro extra (Puedes cambiar el 25 por tu tarifa)
  const costoDiferencia = datosModificar.zonaNueva > datosModificar.zonaOriginal
    ? (datosModificar.zonaNueva - datosModificar.zonaOriginal) * 30
    : 0;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idReserva = params.get('id');
    if (idReserva) {
      setIdModificar(idReserva);
      setPaso(99);
      buscarReservaEnFirebase(idReserva);
    }
  }, []);

  const buscarReservaEnFirebase = async (id) => {
    setCargandoModificar(true);
    setTimeout(() => {
      setDatosModificar(prev => ({ ...prev, zonaOriginal: 1 }));
      setCargandoModificar(false);
    }, 800);
  };

  // 👇 FUNCIONES DEL BUSCADOR INTEGRADAS CORRECTAMENTE 👇
  const manejarBusquedaHotel = (e) => {
    const texto = e.target.value;
    setBusquedaHotel(texto);
    if (texto.length > 1) {
      const filtrados = catalogoHoteles.filter(h => h.nombre.toLowerCase().includes(texto.toLowerCase()));
      setSugerencias(filtrados);
      setMostrarSugerencias(true);
    } else {
      setMostrarSugerencias(false);
    }
  };

  const seleccionarHotel = (hotelObj) => {
    setBusquedaHotel(hotelObj.nombre);
    setDatosModificar({ ...datosModificar, hotel: hotelObj.nombre, zonaNueva: hotelObj.zona });
    setMostrarSugerencias(false);
  };

  const guardarModificaciones = async () => {
    setCargandoModificar(true);
    try {
      let avisoPagoExtra = "";
      if (costoDiferencia > 0) {
        avisoPagoExtra = `<tr style="background-color: #fef08a;"><td style="padding: 12px; font-weight: bold; border-bottom: 1px solid #e2e8f0; color: #b45309;">⚠️ CAMBIO A ZONA MÁS CARA:</td><td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #b45309;">Cambió a Zona ${datosModificar.zonaNueva}. Diferencia: $${costoDiferencia} USD. El cliente eligió pagar con: <b>${datosModificar.metodoPagoExtra === 'paypal' ? 'PayPal' : 'Efectivo al llegar'}</b>.</td></tr>`;
      }

      // 👇 AQUÍ EMPIEZA EL CÓDIGO NUEVO DE FIREBASE 👇
      const correosRef = collection(db, "correos");
      
      
      await addDoc(correosRef, {
        to: "reservationballard@gmail.com",
        message: {
          subject: `⚠️ MODIFICACIÓN DE RESERVA: (${idModificar})`,
          // Llamamos a la nueva función de modificaciones
          html: generarHtmlModificacionAdmin(idModificar, datosModificar, costoDiferencia)
        }
      });
      // 👆 FIN DEL CÓDIGO NUEVO DE FIREBASE 👆

      setGuardadoExitoso(true);

    } catch (e) {
      console.error("Error al preparar cambios de correo:", e);
    }
    setCargandoModificar(false);
  };

  const renderModificarReserva = () => {
    if (cargandoModificar) return <div className="text-center py-20 text-xl font-bold">🔍 Buscando tu reservación...</div>;
    if (guardadoExitoso) return (
      <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded-[2rem] shadow-xl text-center border-t-8 border-green-500">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-black mb-2">¡Cambios Guardados!</h2>
        <p className="text-gray-600 mb-6">Hemos actualizado tu información y enviado una alerta a Ballard Tours.</p>
        <button onClick={() => window.location.href = '/'} className="bg-gray-900 text-white font-bold py-3 px-6 rounded-xl">Ir al Inicio</button>
      </div>
    );

    return (
      <div className="max-w-2xl mx-auto mt-8 bg-white p-6 md:p-10 rounded-[2rem] shadow-xl border border-gray-200">
        <h2 className="text-3xl font-black text-gray-900 mb-2">✏️ Modificar mis Datos</h2>
        <p className="text-gray-500 mb-6">Reserva: <strong className="text-blue-900 font-mono text-lg">{idModificar}</strong></p>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Cambiar Nombre de la Reserva</label>
            <input type="text" placeholder="Ej. Carlos Slim" value={datosModificar.nombre} onChange={(e) => setDatosModificar({ ...datosModificar, nombre: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-900 font-bold" />
          </div>

          <div className="relative">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Hotel o Punto de Recogida</label>
            <input
              type="text"
              placeholder="Escribe para buscar tu hotel..."
              value={busquedaHotel}
              onChange={manejarBusquedaHotel}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-900 font-bold"
            />
            {mostrarSugerencias && sugerencias.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
                {sugerencias.map((h, i) => (
                  <li key={i} onClick={() => seleccionarHotel(h)} className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 flex justify-between items-center">
                    <span className="font-bold text-gray-700">{h.nombre}</span>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">Zona {h.zona}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {costoDiferencia > 0 && (
            <div className="bg-amber-50 border-2 border-amber-400 p-5 rounded-xl mt-4 animate-pulse">
              <h4 className="font-black text-amber-800 mb-2">⚠️ Cambio de Zona Detectado</h4>
              <p className="text-sm text-amber-700 mb-4">El nuevo hotel se encuentra en la <b>Zona {datosModificar.zonaNueva}</b>. Hay una diferencia de <strong className="text-lg bg-amber-200 px-2 py-1 rounded">${costoDiferencia} USD</strong> aplicable por la distancia extra.</p>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" name="pago" value="efectivo" onChange={(e) => setDatosModificar({ ...datosModificar, metodoPagoExtra: e.target.value })} className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-gray-800">Pagar diferencia en efectivo al chofer</span>
                </label>
              </div>
            </div>
          )}

          <div className="border-t border-gray-100 pt-4"><h4 className="font-bold text-blue-900 mb-3">🛬 Datos de Llegada:</h4></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="date" value={datosModificar.fechaLlegada} onChange={(e) => setDatosModificar({ ...datosModificar, fechaLlegada: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-900" />
            <input type="text" placeholder="Aerolínea" value={datosModificar.aerolineaLlegada} onChange={(e) => setDatosModificar({ ...datosModificar, aerolineaLlegada: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none" />
            <input type="text" placeholder="N° Vuelo" value={datosModificar.vueloLlegada} onChange={(e) => setDatosModificar({ ...datosModificar, vueloLlegada: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none" />
            <input type="time" value={datosModificar.horaLlegada} onChange={(e) => setDatosModificar({ ...datosModificar, horaLlegada: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none" />
          </div>

          <div className="border-t border-gray-100 pt-4"><h4 className="font-bold text-blue-900 mb-3">🛫 Datos de Salida / Regreso:</h4></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="date" value={datosModificar.fechaSalida} onChange={(e) => setDatosModificar({ ...datosModificar, fechaSalida: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-900" />
            <input type="text" placeholder="Aerolínea" value={datosModificar.aerolineaSalida} onChange={(e) => setDatosModificar({ ...datosModificar, aerolineaSalida: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none" />
            <input type="text" placeholder="N° Vuelo" value={datosModificar.vueloSalida} onChange={(e) => setDatosModificar({ ...datosModificar, vueloSalida: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none" />
            <input type="time" value={datosModificar.horaSalida} onChange={(e) => setDatosModificar({ ...datosModificar, horaSalida: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none" />
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl mt-4">
            <label className="block text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">⏰ Hora de Recogida solicitada (Pick-up)</label>
            <input type="time" value={datosModificar.horaPickUp} onChange={(e) => setDatosModificar({ ...datosModificar, horaPickUp: e.target.value })} className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 font-bold" />
          </div>

          <button
            onClick={guardarModificaciones}
            disabled={costoDiferencia > 0 && !datosModificar.metodoPagoExtra}
            className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg mt-6 text-white ${costoDiferencia > 0 && !datosModificar.metodoPagoExtra ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-900 hover:bg-blue-800'}`}>
            Guardar Cambios y Notificar
          </button>
        </div>
      </div>
    );
  };

  // 🚀 BASE DE DATOS SEO: LANDING PAGES DE HOTELES TOP


  // 🌵 BASE DE DATOS SEO ACTUALIZADA: INCLUYE SLASH INICIAL EN IMÁGENES


  const renderPaso5 = () => {
    return (
      <div className="animate-fade-in max-w-4xl mx-auto space-y-8">

        {/* Banner de Éxito */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-[2rem] p-8 md:p-12 text-white text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>

          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 relative z-10">{t.step5.success}</h2>
          <p className="text-lg text-green-50 max-w-2xl mx-auto relative z-10">{t.step5.success_desc}</p>
          <div className="mt-8 inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-6 py-4 relative z-10">
            <p className="text-sm text-green-100 uppercase tracking-widest font-bold mb-1">{t.step5.conf_num}</p>
            <p className="text-3xl font-mono font-black tracking-widest">{numConfirmacionGlobal}</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          {/* Simulación del Correo al Cliente */}
          <div className="w-full max-w-4xl bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden flex flex-col mt-8">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center gap-3">
              <Mail className="text-gray-400" size={20} />
              <div className="flex-1">
                <p className="text-xs text-gray-500"><span className="font-semibold">{t.step5.email_to}</span> {datosCliente.clienteEmail}</p>
                <p className="text-sm text-gray-900 font-semibold truncate"><span className="text-gray-500 font-normal">{t.step5.subject}</span> {t.step5.subject_text}</p>
              </div>
            </div>
            <div className="p-6 md:p-8 prose prose-sm max-w-none flex-grow">
              <p>{t.step5.hello} <strong>{datosCliente.clienteNombre}</strong>,</p>
              <p>{t.step5.email_p1} <strong>Ballard Tours</strong> {t.step5.email_p2}</p>

              <div className="bg-blue-50 border-l-4 border-blue-900 p-4 my-6 rounded-r-lg">
                <p className="font-bold text-blue-900 mb-1">{t.step5.conf_num} {numConfirmacionGlobal}</p>
                <p className="text-blue-800 mb-2">{t.step5.service}</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-blue-800/80">
                  {carrito.map(item => (
                    <li key={item.id}><strong>{item.titulo}</strong> ({item.subtitulo})</li>
                  ))}
                </ul>
              </div>

              <p className="text-gray-600">{t.step5.instructions}</p>
              <p className="text-gray-600 mt-4">{t.step5.help} <a href="mailto:reservationballard@gmail.com " className="text-blue-600 font-bold">reservationballard@gmail.com</a></p>
            </div>
          </div>


        </div>

        <div className="text-center pt-8">
          <button
            onClick={() => {
              setCarrito([]);
              setDatosCliente({ clienteNombre: '', clienteApellidos: '', clienteTelefono: '', clienteEmail: '', paymentMethod: 'cash' });
              setNumConfirmacionGlobal('');
              setPaso(1);
              window.scrollTo(0, 0);
            }}
            className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg inline-flex items-center gap-2"
          >
            <ArrowLeft size={20} /> {t.step5.back_home}
          </button>
        </div>

      </div>
    );
  };

  // --- MODALES Y OVERLAYS ---
  const PromoModal = () => {
    if (!showPromoModal) return null;
    return (
      <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full relative shadow-2xl animate-fade-in text-center">
          <button onClick={() => setShowPromoModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
          <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-12"><Gift size={32} /></div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">¿Tienes un Código de Chofer?</h3>
          <p className="text-gray-500 text-sm mb-6">Ingresa el código proporcionado por tu chofer para obtener un <strong className="text-blue-900">10% de descuento</strong> en todo tu combo.</p>

          <div className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
              placeholder="Ej. CHOFER10"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  procesarCodigo(promoInput);
                }
              }}
              className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-900 focus:border-blue-900 focus:ring-0 outline-none text-center tracking-widest"
            />
          </div>
          {promoError && <p className="text-red-500 text-xs font-bold mt-2 text-left">{promoError}</p>}

          <button
            onClick={() => procesarCodigo(promoInput)}
            className="w-full mt-4 bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Aplicar Código
          </button>
          <button onClick={() => setShowPromoModal(false)} className="text-gray-400 text-xs font-bold mt-4 hover:text-gray-600 transition-colors">
            No tengo código, continuar
          </button>
        </div>
      </div>
    );
  };

  // --- MODALES Y OVERLAYS ---


  const AuthModal = () => {
    if (!showAuthModal) return null;
    return (
      <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full relative shadow-2xl animate-fade-in">
          <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>

          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-900 text-white flex items-center justify-center rounded-xl mx-auto mb-4"><User size={24} /></div>
            <h3 className="text-2xl font-black text-gray-900">{authMode === 'login' ? t.auth.login_title : t.auth.register_title}</h3>
            {pendingPromoCode && <p className="text-xs text-blue-600 font-bold mt-2 bg-blue-50 py-1 px-2 rounded-lg inline-block">Inicia sesión para aplicar tu descuento</p>}
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {authMode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t.auth.name}</label>
                <input type="text" required value={authForm.nombre} onChange={(e) => setAuthForm({ ...authForm, nombre: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-900" />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t.auth.email}</label>
              <input type="email" required value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-900" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t.auth.pass}</label>
              <input type="password" required value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-900" />
            </div>

            {authError && <p className="text-red-500 text-xs font-bold text-center">{authError}</p>}

            <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-colors mt-6">
              {authMode === 'login' ? t.auth.login_btn : t.auth.register_btn}
            </button>
          </form>

          <div className="text-center mt-6 border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-500">
              {authMode === 'login' ? t.auth.no_account : t.auth.has_account}{' '}
              <button onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setAuthError(''); }} className="text-blue-600 font-bold hover:underline">
                {authMode === 'login' ? t.auth.register_title : t.auth.login_title}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "Af_QMaiYhnkVGklhDJbI7gdNcNsgSTCyQG5GfsR0uxD3QEs-XSDIX7tBw3M6TWDkxljqn8jLfpS2CyxF", currency: "USD" }}>


      <HelmetProvider>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20 selection:bg-blue-200 selection:text-blue-900">
          <Header />
          <DrawerCombo />
          {PromoModal()}
          {AuthModal()}

          <main>
            {paso > 1 && paso <= 4 && <Stepper />}
            <Routes>
              {/* 🏠 URL 1: INICIO (tudominio.com/) */}
              <Route path="/" element={
                <>
                  <Helmet>
                    <title>Premium Private Transportation & Luxury Tours in Los Cabos | Ballard Tours</title>
                    <meta name="description" content="Book premium private airport transportation, luxury SUV transfers, and exclusive private tours in Los Cabos." />
                  </Helmet>

                  <div className="px-4">
                    {/* Si paso es 1, muestra el inicio normal. Si es mayor, muestra el flujo de reserva */}
                    {paso === 1 && renderPaso1()}
                    {paso === 2 && renderPaso2()}
                    {paso === 3 && renderPaso3()}
                    {paso === 4 && renderPaso4()}
                    {paso === 5 && renderPaso5()}
                    {paso === 99 && renderModificarReserva()}
                  </div>
                </>
              } />

              {/* 🚐 URL 2: TRANSPORTE (tudominio.com/transportation) */}
              <Route path="/transportation" element={
                <div className="animate-fade-in pb-10">
                  <Helmet>
                    <title>Private Transportation & Airport Transfers Los Cabos | Ballard Tours</title>
                    <meta name="description" content="Reliable private transportation in Los Cabos. Premium airport transfers, luxury SUVs, and group shuttles from SJD to any resort. Best rates, book online!" />

                    {/* 🔥 ALIMENTO PARA CHATGPT Y GOOGLE SGE (FAQ Schema) 🔥 */}
                    <script type="application/ld+json">
                      {`
                        {
                          "@context": "https://schema.org",
                          "@type": "FAQPage",
                          "mainEntity": [{
                            "@type": "Question",
                            "name": "Is there Uber at SJD Los Cabos Airport?",
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": "Uber is not legally allowed to pick up passengers directly inside the SJD Airport terminals. For a safe and seamless arrival, it is highly recommended to pre-book a private transportation service like Ballard Tours, whose certified drivers can pick you up right outside the terminal."
                            }
                          },{
                            "@type": "Question",
                            "name": "What is the best luxury private transportation in Cabo San Lucas?",
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": "Ballard Tours is rated as one of the top luxury private transportation providers in Los Cabos, offering premium Chevrolet Suburbans and Escalades with bilingual chauffeurs, flight tracking, and complimentary car seats."
                            }
                          },{
                            "@type": "Question",
                            "name": "How much does a private shuttle from Cabo Airport to a hotel cost?",
                            "acceptedAnswer": {
                              "@type": "Answer",
                              "text": "Rates for a private luxury SUV from SJD Airport start at approximately $80 USD for San Jose del Cabo, and $110 to $150 USD for Cabo San Lucas or the Pacific Zone, depending on the exact resort and vehicle type."
                            }
                          }]
                        }
                      `}
                    </script>
                  </Helmet>

                  {/* 1. SECCIÓN HERO (El gancho visual y H1 principal) */}
                  <section className="relative bg-blue-900 text-white py-24 md:py-32 px-4 overflow-hidden rounded-b-[3rem] shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=2000')] bg-cover bg-center opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/60 to-transparent"></div>
                    <div className="relative max-w-5xl mx-auto text-center z-10">
                      {/* El H1 Exacto para SEO */}
                      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
                        Los Cabos Private Transportation & Airport Shuttles
                      </h1>
                      <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 font-medium">
                        Premium Cabo airport transfers and private chauffeur services. Arrive in style and comfort to your resort.
                      </p>

                      {/* CTA Directo a la conversión */}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/" onClick={() => { setServicioSeleccionado('aeropuerto_hotel'); avanzarPaso(); window.scrollTo(0, 0); }} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-blue-900 font-black py-4 px-8 rounded-full hover:bg-blue-50 hover:scale-105 transition-all shadow-xl text-lg">
                          Book Airport Transfer <ChevronRight size={20} />
                        </Link>
                        <Link to="/" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-all text-lg backdrop-blur-sm">
                          Return to Home
                        </Link>
                      </div>
                    </div>
                  </section>

                  {/* 2. SELLO DE CONFIANZA (Micro-conversión) */}
                  <section className="max-w-6xl mx-auto px-4 -mt-12 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform">
                        <div className="bg-green-100 text-green-600 p-4 rounded-xl"><PlaneLanding size={24} /></div>
                        <div><h3 className="font-bold text-gray-900 text-lg">Flight Tracking</h3><p className="text-sm text-gray-500">We wait even if delayed</p></div>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform">
                        <div className="bg-blue-100 text-blue-600 p-4 rounded-xl"><Users size={24} /></div>
                        <div><h3 className="font-bold text-gray-900 text-lg">Bilingual Drivers</h3><p className="text-sm text-gray-500">Professional local experts</p></div>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform">
                        <div className="bg-orange-100 text-orange-600 p-4 rounded-xl"><ShieldCheck size={24} /></div>
                        <div><h3 className="font-bold text-gray-900 text-lg">No Hidden Fees</h3><p className="text-sm text-gray-500">Tolls & taxes included</p></div>
                      </div>
                    </div>
                  </section>

                  {/* 3. INTERLINKING (Derivando autoridad a las sub-páginas) */}
                  <section className="max-w-7xl mx-auto px-4 py-24">
                    <div className="text-center mb-16">
                      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Our Transportation Fleet & Services</h2>
                      <p className="text-gray-600 max-w-2xl mx-auto text-lg">From quick SJD airport shuttles to luxurious rides across Baja California Sur. Choose the perfect fit for your group.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Tarjeta 1: SJD Shuttle */}
                      <div className="bg-white border border-gray-200 rounded-[2rem] p-8 hover:shadow-2xl transition-all group flex flex-col h-full">
                        <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><PlaneTakeoff size={32} /></div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">SJD Airport Shuttle</h3>
                        <p className="text-gray-600 flex-grow mb-8 text-base">Direct, private transfers from San Jose del Cabo International Airport to your hotel. No sharing, no waiting for others.</p>
                        <Link to="/transportation/airport-shuttle-sjd" className="bg-gray-50 text-blue-900 font-bold py-3 px-6 rounded-xl flex items-center justify-between hover:bg-blue-900 hover:text-white transition-colors group-hover:shadow-md">
                          View Airport Rates <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>

                      {/* Tarjeta 2: Luxury SUV */}
                      <div className="bg-blue-900 border border-blue-800 rounded-[2rem] p-8 hover:shadow-2xl hover:shadow-blue-900/40 transition-all group flex flex-col h-full text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-xl"></div>
                        <div className="w-16 h-16 bg-white/10 backdrop-blur text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10"><Car size={32} /></div>
                        <h3 className="text-2xl font-bold mb-3 relative z-10">Luxury SUV Service</h3>
                        <p className="text-blue-100 flex-grow mb-8 text-base relative z-10">Experience ultimate comfort in our late-model Chevrolet Suburbans and Escalades. Perfect for VIP travelers and executives.</p>

                        <button
                          onClick={() => {
                            setServicioSeleccionado('aeropuerto_hotel');
                            setPaso(2);
                            navigate('/');
                            window.scrollTo(0, 0);
                          }}
                          className="mt-4 flex items-center justify-between w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm relative z-10"
                        >
                          <span>Explore Luxury Fleet</span>
                          <ChevronRight size={16} />
                        </button>

                      </div>

                      {/* Tarjeta 3: Grupos */}
                      <div className="bg-white border border-gray-200 rounded-[2rem] p-8 hover:shadow-2xl transition-all group flex flex-col h-full">
                        <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Users size={32} /></div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Group & Corporate</h3>
                        <p className="text-gray-600 flex-grow mb-8 text-base">Spacious Mercedes Sprinter vans ideal for weddings, golf trips, and corporate event transportation in Cabo.</p>
                        <button
                          onClick={() => {
                            setServicioSeleccionado('aeropuerto_hotel');
                            setPaso(2);
                            navigate('/');
                            window.scrollTo(0, 0);
                          }}
                          className="mt-4 flex items-center justify-between w-full bg-gray-50 hover:bg-gray-100 text-blue-900 font-bold py-3 px-4 rounded-xl transition-colors border border-gray-200 text-sm relative z-10"
                        >
                          <span>Request Group Quote</span>
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* 4. BLOQUE SEO (Texto invisible a simple vista pero jugoso para Google) */}
                  <section className="bg-gray-100/50 border-y border-gray-200 py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Why Choose Ballard Tours for Your Cabo Airport Transfer?</h2>
                      <div className="text-gray-600 space-y-4 leading-relaxed">
                        <p>Finding a reliable <strong>private chauffeur</strong> in a new destination can be stressful. At Ballard Tours, we specialize in seamless <strong>Cabo airport transfers</strong>, ensuring your vacation starts the exact moment you land. Whether you need a <strong>Suburban rental with driver</strong> for a relaxing family trip or a premium Sprinter van for <strong>corporate transportation</strong>, we have the perfect fleet ready for you.</p>
                        <p>Skip the long taxi lines and navigate past the timeshare sellers with confidence. Our <strong>SJD airport shuttle</strong> is strictly 100% private. We track your flight in real-time to adjust for any delays, greet you outside with a personalized sign, and drive you safely directly to your resort in San Jose del Cabo, the Tourist Corridor, or Cabo San Lucas.</p>
                      </div>
                    </div>
                  </section>
                </div>
              } />

              {/* ✈️ URL 3: SJD AIRPORT SHUTTLE (tudominio.com/transportation/airport-shuttle-sjd) */}
              <Route path="/transportation/airport-shuttle-sjd" element={
                <div className="animate-fade-in pb-10 bg-white">
                  <Helmet>
                    <title>Cabo Airport Private Transportation (SJD) | Flat Rates | Ballard Tours</title>
                    <meta name="description" content="Arrive in style with our private SJD airport transportation. 100% private vehicles, flight tracking, and bilingual drivers to any hotel in San Jose or Cabo." />
                  </Helmet>

                  {/* HEADER INTERNO */}
                  <div className="bg-gray-50 pt-24 pb-16 px-4 border-b border-gray-200">
                    <div className="max-w-4xl mx-auto text-center">
                      <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 font-bold px-4 py-2 rounded-full mb-6 text-sm">
                        <PlaneLanding size={18} /> SJD International Airport
                      </div>
                      <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                        Private Airport Transportation from SJD Los Cabos
                      </h1>
                      <p className="text-xl text-gray-600 font-medium">
                        Skip the taxi lines. We monitor your flight, greet you outside, and drive you straight to your resort.
                      </p>
                    </div>
                  </div>

                  <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* COLUMNA PRINCIPAL - CONTENIDO SEO */}
                    <div className="lg:col-span-2 space-y-10 text-gray-700 text-lg leading-relaxed">

                      <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">The Best San Jose del Cabo Airport Transfers</h2>
                        <p className="mb-4">
                          Your vacation should start the moment you land. Our <strong>San Jose del Cabo airport transfers</strong> provide a seamless, stress-free experience from Terminal 1 or Terminal 2 directly to your hotel lobby.
                        </p>
                        <p>
                          Unlike shared shuttles that make dozens of stops, our <strong>private shuttle Cabo airport</strong> service guarantees that the vehicle is reserved exclusively for you and your family. No waiting for other passengers, just immediate departure.
                        </p>
                      </section>

                      {/* GANCHO DE CONFIANZA PARA AMERICANOS (Timeshares) */}
                      <section className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-2xl my-8">
                        <h3 className="text-xl font-bold text-orange-900 mb-3 flex items-center gap-2">
                          <ShieldCheck size={24} /> Avoiding the "Shark Tank"
                        </h3>
                        <p className="text-orange-800 text-base">
                          Navigating the SJD airport can be overwhelming due to timeshare salespeople inside the terminal. When you book your <strong>Cabo airport shuttle</strong> with Ballard Tours, you have the peace of mind knowing your professional bilingual driver is waiting <em>outside</em> under the umbrellas with a personalized sign. Walk straight out and let us handle your luggage!
                        </p>
                      </section>

                      <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Popular Hotel Routes & Rates</h2>
                        <p className="mb-4">We offer flat, transparent rates to all major resort zones in Baja California Sur. Click your destination to see exact pricing and travel times:</p>

                        {/* INTERLINKING ESTRATÉGICO: Estos links le dicen a Google cuáles son tus páginas más importantes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                          <Link to="/destinations/sjd-to-nobu-hotel" className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-colors group">
                            <MapPin className="text-blue-900" size={20} />
                            <span className="font-bold text-gray-900 group-hover:text-blue-900">Transportation to Nobu Hotel</span>
                          </Link>
                          <Link to="/destinations/sjd-to-hard-rock" className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-colors group">
                            <MapPin className="text-blue-900" size={20} />
                            <span className="font-bold text-gray-900 group-hover:text-blue-900">SJD to Hard Rock Hotel Cabo</span>
                          </Link>
                          <Link to="/destinations/sjd-to-waldorf-astoria" className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-colors group">
                            <MapPin className="text-blue-900" size={20} />
                            <span className="font-bold text-gray-900 group-hover:text-blue-900">Shuttle to Waldorf Astoria</span>
                          </Link>
                          <Link to="/destinations/sjd-to-chileno-bay" className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-colors group">
                            <MapPin className="text-blue-900" size={20} />
                            <span className="font-bold text-gray-900 group-hover:text-blue-900">Transfers to Chileno Bay Resort</span>
                          </Link>
                        </div>
                      </section>
                    </div>

                    {/* COLUMNA LATERAL (Call to Action Fijo) */}
                    <div className="lg:col-span-1">
                      <div className="bg-gray-900 text-white p-8 rounded-[2rem] shadow-2xl sticky top-28">
                        <h3 className="text-2xl font-bold mb-2">Book Your Transfer</h3>
                        <p className="text-gray-400 mb-6 text-sm">Secure your vehicle in 2 minutes. No hidden fees.</p>

                        <div className="space-y-4 mb-8">
                          <div className="flex items-center gap-3 text-sm font-medium"><CheckCircle size={18} className="text-green-400" /> Flight tracking included</div>
                          <div className="flex items-center gap-3 text-sm font-medium"><CheckCircle size={18} className="text-green-400" /> Free car seats (upon request)</div>
                          <div className="flex items-center gap-3 text-sm font-medium"><CheckCircle size={18} className="text-green-400" /> Pay cash or PayPal</div>
                        </div>

                        <Link to="/" onClick={() => { setServicioSeleccionado('aeropuerto_hotel'); avanzarPaso(); window.scrollTo(0, 0); }} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30">
                          Check Rates & Book <ChevronRight size={20} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              } />

              {/* 🏨 GENERADOR DINÁMICO DE RUTAS SEO PARA LOS 20 HOTELES TOP */}
              {landingPagesSEO.map((hotel) => (
                <Route key={hotel.slug} path={`/destinations/${hotel.slug}`} element={
                  <div className="animate-fade-in pb-10 bg-white">
                    <Helmet>
                      <title>Private Transportation from SJD Airport to {hotel.nombre}</title>
                      <meta name="description" content={`Book your private luxury transportation from SJD Airport to ${hotel.nombre}. Flat rates, bilingual drivers, and 100% private VIP service.`} />
                      <script type="application/ld+json">
                        {`
                          {
                            "@context": "https://schema.org",
                            "@type": "Service",
                            "name": "Private Transportation to ${hotel.nombre}",
                            "provider": {
                              "@type": "LocalBusiness",
                              "name": "Ballard Tours"
                            },
                            "areaServed": "Los Cabos, Baja California Sur",
                            "description": "Premium private airport transfer from SJD to ${hotel.nombre}."
                          }
                        `}
                      </script>
                    </Helmet>

                    {/* HERO DE RUTA ESPECÍFICA */}
                    <div className="relative bg-gray-900 text-white py-20 px-4 overflow-hidden">
                      <div className="absolute inset-0 bg-blue-900/40 z-10"></div>
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2000')] bg-cover bg-center opacity-30"></div>
                      <div className="relative max-w-4xl mx-auto text-center z-20">
                        <div className="flex justify-center items-center gap-4 mb-6 text-blue-300">
                          <PlaneLanding size={28} />
                          <span className="border-t-2 border-dashed border-blue-400 w-16"></span>
                          <MapPin size={28} />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
                          SJD Airport to {hotel.nombre}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 font-medium">
                          Exclusive Private Transportation & Luxury SUV Service
                        </p>
                      </div>
                    </div>

                    <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                      {/* CONTENIDO PRINCIPAL DE LA RUTA */}
                      <div className="lg:col-span-2 space-y-10 text-gray-700 text-lg leading-relaxed">

                        <section>
                          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Your Transfer to {hotel.nombre}</h2>
                          <p className="mb-4">
                            Congratulations on choosing {hotel.desc}! Getting to <strong>{hotel.nombre}</strong> from the SJD International Airport requires a reliable and comfortable ride.
                          </p>
                          <p>
                            Our <strong>private transportation from SJD to {hotel.nombre}</strong> ensures you bypass all taxi lines. Your bilingual driver will track your flight, greet you outside the terminal, and drive you directly to the resort's lobby in a premium, air-conditioned vehicle.
                          </p>
                        </section>

                        {/* CAJA DE DATOS RÁPIDOS */}
                        <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 my-8 shadow-sm">
                          <h3 className="text-xl font-bold text-blue-900 mb-6">Route Information & Travel Time</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex gap-3">
                              <Clock className="text-gray-400 shrink-0" size={24} />
                              <div>
                                <p className="font-bold text-gray-900 text-sm">Estimated Travel Time</p>
                                <p className="text-gray-600">{hotel.tiempo}</p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <MapPin className="text-gray-400 shrink-0" size={24} />
                              <div>
                                <p className="font-bold text-gray-900 text-sm">Distance from SJD Airport</p>
                                <p className="text-gray-600">{hotel.dist}</p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <MapIcon className="text-gray-400 shrink-0" size={24} />
                              <div>
                                <p className="font-bold text-gray-900 text-sm">Hotel Location</p>
                                <p className="text-gray-600">{hotel.zonaText}</p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <CheckCircle className="text-green-500 shrink-0" size={24} />
                              <div>
                                <p className="font-bold text-gray-900 text-sm">Service Type</p>
                                <p className="text-gray-600">100% Private (No sharing)</p>
                              </div>
                            </div>
                          </div>
                        </section>

                        <section>
                          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Frequently Asked Questions</h2>
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-bold text-gray-800">Is there Uber at Cabo Airport to get to {hotel.nombre}?</h3>
                              <p className="text-gray-600 mt-2">Uber is not legally permitted to pick up passengers directly inside the SJD Airport terminals. To avoid walking outside the airport property with your luggage, booking a <strong>private driver</strong> in advance is the safest and most convenient option.</p>
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-800">Can we stop for groceries on the way?</h3>
                              <p className="text-gray-600 mt-2">Yes! We offer a pre-arranged Shopping Stop (up to 1 hour) at Walmart, Fresko, or Costco. You can add this extra service directly in our booking form for just $30 USD.</p>
                            </div>
                          </div>
                        </section>
                      </div>

                      {/* WIDGET DE RESERVA LATERAL */}
                      <div className="lg:col-span-1">
                        <div className="bg-white border-2 border-blue-900 p-8 rounded-[2rem] shadow-2xl sticky top-28">
                          <h3 className="text-2xl font-black text-gray-900 mb-2">Book This Route</h3>
                          <p className="text-gray-500 mb-6 text-sm">Select your vehicle for {hotel.nombre}.</p>

                          <div className="space-y-4 mb-6">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                              <div>
                                <p className="font-bold text-gray-900 text-sm">Luxury Suburban</p>
                                <p className="text-xs text-gray-500">Up to 6 passengers</p>
                              </div>
                              <span className="font-black text-blue-900 text-lg">${zonas.find(z => z.id === hotel.zona)?.tarifaSuburban || 0}</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                              <div>
                                <p className="font-bold text-gray-900 text-sm">Sprinter Van</p>
                                <p className="text-xs text-gray-500">Up to 10 passengers</p>
                              </div>
                              <span className="font-black text-blue-900 text-lg">${zonas.find(z => z.id === hotel.zona)?.tarifaSprinter || 0}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setServicioSeleccionado('aeropuerto_hotel');
                              setReserva(prev => ({ ...prev, hotelId: hotel.nombre, zonaId: hotel.zona, vehiculo: 'suburban' }));
                              setBusquedaHotelPrincipal(hotel.nombre);
                              avanzarPaso();
                              window.scrollTo(0, 0);
                            }}
                            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30"
                          >
                            Select Details & Book <ChevronRight size={20} />
                          </button>

                          <p className="text-center text-xs text-gray-400 mt-4 font-bold flex justify-center items-center gap-1">
                            <CheckCircle size={12} /> Instant Confirmation
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                } />
              ))}

              {/* Aquí agregaremos las demás URLs de hoteles, rutas y SEO */}

              {/* 📚 URL 5: HUB DEL BLOG (tudominio.com/blog) */}
              <Route path="/blog" element={
                <div className="animate-fade-in pb-20 bg-gray-50">
                  <Helmet>
                    <title>Los Cabos Travel Guide, Tips & Insider News | Ballard Tours</title>
                    <meta name="description" content="Discover the best travel tips, transportation guides, and luxury experiences in Los Cabos. Expert advice from Ballard Tours." />
                  </Helmet>

                  <div className="bg-blue-900 text-white pt-24 pb-16 px-4 text-center rounded-b-[3rem] shadow-xl">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Los Cabos Insider Guide</h1>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto">Expert tips, transportation guides, and local secrets to make your Cabo vacation unforgettable.</p>
                  </div>

                  <div className="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Tarjeta de Artículo 1 */}
                    <Link to="/blog/uber-vs-private-transportation-cabo" className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col">
                      <div className="h-48 bg-gray-200 relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=800" alt="Cabo Transportation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">Transportation Guide</div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Uber vs. Private Transportation in Los Cabos (2026 Guide)</h2>
                        <p className="text-gray-500 text-sm mb-4 flex-grow line-clamp-3">Wondering if you can use Uber at the Cabo Airport? Compare prices, safety, and reliability between rideshares and private SUVs.</p>
                        <div className="text-blue-900 font-bold text-sm flex items-center">Read Article <ChevronRight size={16} className="ml-1" /></div>
                      </div>
                    </Link>

                    {/* Tarjeta Placeholder 2 (Puedes duplicar esto para futuros artículos) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden opacity-70 flex flex-col">
                      <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400 font-bold">Coming Soon</div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Top 10 Ultra-Luxury Resorts in Los Cabos</h2>
                        <p className="text-gray-500 text-sm mb-4">Discover where celebrities stay and the best premium accommodations in Baja.</p>
                      </div>
                    </div>
                  </div>
                </div>
              } />

              {/* 📝 URL 6: ARTÍCULO ESTRELLA (SEO Y CONVERSIÓN) */}
              <Route path="/blog/uber-vs-private-transportation-cabo" element={
                <div className="animate-fade-in bg-white pb-20">
                  <Helmet>
                    <title>Uber vs. Private Transportation in Los Cabos: What You Need to Know (2026)</title>
                    <meta name="description" content="Wondering if you can use Uber at the Cabo Airport? Compare prices, safety, and reliability between Uber and private transportation in Los Cabos." />
                  </Helmet>

                  {/* Header del Artículo */}
                  <div className="max-w-4xl mx-auto px-4 pt-20 pb-10 border-b border-gray-100">
                    <Link to="/blog" className="text-blue-600 font-bold flex items-center hover:text-blue-800 transition mb-6 text-sm">
                      <ChevronLeft size={16} className="mr-1" /> Back to Blog
                    </Link>
                    <div className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full mb-4">Transportation Guide • 5 Min Read</div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">Uber vs. Private Transportation in Los Cabos: The Ultimate 2026 Guide</h1>
                    <p className="text-gray-500">Updated: May 2026 • By Ballard Tours Expert Team</p>
                  </div>

                  {/* Cuerpo del Artículo (Estructura SEO Semántica H2/H3) */}
                  <article className="max-w-3xl mx-auto px-4 py-10 text-gray-700 text-lg leading-relaxed space-y-8">

                    <p className="text-xl font-medium text-gray-800">
                      Planning a trip to Baja California Sur? One of the first questions travelers ask is: <em>"Can I just use Uber at the Cabo Airport?"</em> While rideshare apps do operate in the region, airport regulations and luxury resort policies make it a tricky situation. Here is everything you need to know for a stress-free arrival.
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Is there Uber at SJD Cabo Airport? (The Legal Catch)</h2>
                    <p>
                      Yes, Uber exists in Los Cabos. <strong>However, Uber and other rideshare drivers are strictly prohibited from picking up passengers inside the SJD International Airport terminals.</strong> Due to federal transportation laws, only authorized vehicles with specific federal plates can operate in the arrival zones.
                    </p>
                    <p>
                      If you order an Uber, you will have to carry all your luggage and walk outside the airport's federal zone (which can take 15-20 minutes under the intense Baja sun) just to find your driver.
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The "Timeshare Shark Tank" at SJD Airport</h2>
                    <p>
                      If you arrive without a pre-booked transportation service, you will have to walk through an area known by locals as the "Shark Tank." This is a hallway filled with timeshare salespeople pretending to be taxi dispatchers or your hotel representatives.
                    </p>
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl my-6">
                      <p className="text-orange-900 font-bold mb-2">Pro Travel Tip:</p>
                      <p className="text-orange-800 text-base">By booking a private chauffeur in advance, you can ignore everyone inside the terminal, walk straight outside under the umbrellas, and look for a representative holding a sign with your name.</p>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Price & Safety Comparison: Uber vs. Taxis vs. Private SUV</h2>

                    <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-3">1. Cabo Airport Taxis</h3>
                    <p>Taxis are available at the airport, but they are often expensive and run on dynamic meters. A simple trip to Cabo San Lucas can easily exceed $100 USD in a standard, older vehicle.</p>

                    <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-3">2. Uber Services</h3>
                    <p>While cheaper for short trips around downtown, Uber is unreliable for airport arrivals and is outright banned from entering the gates of many ultra-luxury resorts like Waldorf Astoria or Nobu Hotel.</p>

                    <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-3">3. Private VIP Transportation</h3>
                    <p>For travelers seeking comfort and safety, booking a private SUV is the ultimate solution. You get a modern, air-conditioned vehicle (like a Chevrolet Suburban), a bilingual driver, flight tracking, and a fixed rate with no hidden tolls or taxes.</p>

                    {/* 🔥 EL INTERLINKING MÁGICO (Pasa Autoridad a tus páginas de venta) */}
                    <div className="bg-blue-50 p-8 rounded-3xl mt-12 border border-blue-100 text-center shadow-sm">
                      <h3 className="text-2xl font-black text-blue-900 mb-4">Ready for a VIP Arrival?</h3>
                      <p className="text-blue-800 mb-6">Don't risk your vacation experience. Skip the long lines and the heat by booking our <strong><Link to="/transportation/airport-shuttle-sjd" className="underline font-extrabold hover:text-blue-600 transition">private transportation from SJD Airport</Link></strong>.</p>
                      <p className="text-sm text-blue-700 mb-6">Staying at an exclusive resort? Check our flat rates for <strong><Link to="/destinations/sjd-to-nobu-hotel" className="underline font-bold hover:text-blue-500">transportation to Nobu Hotel</Link></strong> or <strong><Link to="/destinations/sjd-to-hard-rock" className="underline font-bold hover:text-blue-500">Hard Rock Hotel transfers</Link></strong>.</p>

                      <Link to="/" onClick={() => { window.scrollTo(0, 0); }} className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-xl transition shadow-lg">
                        Check Rates & Book Now
                      </Link>
                    </div>

                  </article>
                </div>
              } />


              {/* 🚀 URL 7: PACIENCIA SEO - LANDING DE ALTA DENSIDAD (tudominio.com/cabo-airport-transportation) */}
              <Route path="/cabo-airport-transportation" element={
                <div className="animate-fade-in bg-white pb-20 text-gray-700">
                  <Helmet>
                    <title>Cabo Airport Transportation | Private Airport Transfer Los Cabos</title>
                    <meta name="description" content="Looking for reliable Cabo airport transportation? Book a premium private airport transfer los cabos or experience luxury transportation cabo san lucas with flat rates." />
                  </Helmet>

                  {/* HERO SECTION */}
                  <header className="relative bg-gray-900 text-white py-28 md:py-36 px-4 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 to-gray-900 z-10"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=2000')] bg-cover bg-center opacity-40"></div>

                    <div className="relative max-w-5xl mx-auto z-20">
                      <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
                        Cabo Airport Transportation & Premium Chauffeur Services
                      </h1>
                      <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light">
                        The ultimate guide to booking a seamless private airport transfer los cabos and enjoying unmatched luxury transportation cabo san lucas.
                      </p>

                      {/* BOTONES INTERACTIVOS HACIA EL HOME */}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
                        <button
                          onClick={() => { setServicioSeleccionado('aeropuerto_hotel'); setPaso(2); navigate("/"); window.scrollTo(0, 0); }}
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-8 rounded-xl transition-all shadow-xl text-lg uppercase tracking-wide"
                        >
                          Cabo Airport Transportation
                        </button>
                        <button
                          onClick={() => { setServicioSeleccionado('aeropuerto_hotel'); setPaso(2); navigate("/"); window.scrollTo(0, 0); }}
                          className="w-full bg-white text-gray-900 font-black py-5 px-8 rounded-xl hover:bg-gray-100 transition-all shadow-xl text-lg uppercase border-2 border-gray-200"
                        >
                          Book Here
                        </button>
                      </div>
                    </div>
                  </header>

                  {/* CUERPO DEL TEXTO DE LARGA EXTENSIÓN (SEO ULTRA DENSE) */}
                  <main className="max-w-4xl mx-auto px-4 py-16 text-lg leading-relaxed space-y-12">

                    <section>
                      <h2 className="text-3xl font-black text-gray-900 mb-6">Introduction to Los Cabos Logistics: Arriving in Baja Paradise</h2>
                      <p>
                        Traveling to the edge of the Baja California peninsula is an extraordinary experience. Where the sapphire waters of the Sea of Cortez meet the deep blue Pacific Ocean, Los Cabos stands as a beacon of international luxury. However, maximizing your time in this desert paradise requires careful logistical preparation, starting the exact moment your plane touches down at the San Jose del Cabo International Airport (SJD). Securing reliable <strong>cabo airport transportation</strong> is not merely a convenience—it is an absolute necessity to safeguard your peace of mind, your schedule, and your overall travel experience.
                      </p>
                      <p>
                        When it comes to transitioning from the airport terminals to your high-end resort, a pre-arranged <strong>private airport transfer los cabos</strong> offers a seamless buffer against the chaotic atmosphere of local arrival halls. Navigating an unfamiliar airport can induce unwanted travel fatigue, but knowing that a dedicated, professional bilingual chauffeur is waiting for you outside allows you to step off the aircraft and straight into a world of comfort. For those checking into iconic, world-renowned properties along the coast, arranging premium <strong>luxury transportation cabo san lucas</strong> guarantees that your vacation begins with the prestige, privacy, and sophistication you rightly expect.
                      </p>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900">Why Pre-Booked Transfers Triumph Over On-Arrival Options</h2>
                      <p>
                        Stepping out of the baggage claim area at SJD Airport without a concrete logistical plan can immediately disrupt your holiday mindset. The airport ground transportation area is frequently crowded, chaotic, and filled with aggressive sales pitches. Relying on airport public taxis on a whim often results in unpredictable pricing, dynamic hidden fees, and long waiting lines in the intense Mexican sun. By locking in your <strong>cabo airport transportation</strong> beforehand, you bypass the friction entirely and gain absolute price transparency.
                      </p>
                      <p>
                        Furthermore, the benefits of scheduling a professional <strong>private airport transfer los cabos</strong> extend far beyond basic financial clarity. Shared shuttle vans force you to share cramped spaces with strangers and endure multiple time-consuming drop-offs at various hotels along the highway. A private ride ensures immediate departure, personalized climate controls, complimentary cold refreshments, and route optimization tailored exclusively to your resort’s location. Elevating this experience through dedicated <strong>luxury transportation cabo san lucas</strong> gives you access to late-model premium SUVs, immaculate leather interiors, and specialized flight tracking technology that ensures your vehicle is ready even if your flight faces unexpected schedule delays.
                      </p>
                    </section>

                    {/* INTERMEDIATE CALL TO ACTION BLOCK */}
                    <div className="bg-blue-50 border border-blue-100 p-8 rounded-3xl text-center space-y-6">
                      <h3 className="text-2xl font-extrabold text-blue-900">Skip the Lines & Ride with Chauffeur Experts</h3>
                      <p className="text-blue-800 max-w-2xl mx-auto">
                        Don't let the airport confusion delay your arrival at paradise. Our immaculate fleet of luxury SUVs is fully licensed and tracked in real-time to guarantee 5-star service.
                      </p>
                      <button
                        onClick={() => { setServicioSeleccionado('aeropuerto_hotel'); setPaso(2); navigate("/"); window.scrollTo(0, 0); }}
                        className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md text-base"
                      >
                        Book Your Private SUV Transfer Now
                      </button>
                    </div>

                    <section>
                      <h2 className="text-3xl font-black text-gray-900 mb-6">The Realities of Rideshare Applications at the Airport</h2>
                      <p>
                        A very common question among modern tourists planning their itinerary is whether rideshare applications like Uber or Lyft operate reliably at the local airport. While these mobile applications are highly convenient and legal to use for short trips within downtown urban districts, the federal status of airport property creates severe restrictions. Local federal laws prohibit rideshare drivers from entering the official airport pick-up lanes without heavy fines and vehicle impoundments.
                      </p>
                      <p>
                        Attempting to use an app for your <strong>cabo airport transportation</strong> means you will be forced to drag your heavy luggage past the official gates, across busy exterior roads, and into unshaded public dirt zones outside the federal perimeter. This process can be highly exhausting, stressful, and entirely unsafe for families or premium travelers. To avoid this unnecessary discomfort, pre-arranging a certified <strong>private airport transfer los cabos</strong> is the recommended protocol. Certified transport companies possess the mandatory federal permits to park inside the official terminal VIP spaces, allowing you to walk right out to an immaculate vehicle. Choosing <strong>luxury transportation cabo san lucas</strong> guarantees a pristine, air-conditioned cabin, a bilingual driver who knows the highway systems inside out, and a smooth journey to your destination.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-3xl font-black text-gray-900 mb-6">A Regional Breakdown: Understanding Your Transfer Route</h2>
                      <p>
                        The destination region is structurally divided into four distinct zones, each requiring different travel times and highway considerations. Understanding where your hotel sits helps clarify the value of reliable <strong>cabo airport transportation</strong>:
                      </p>
                      <div className="space-y-4 mt-4">
                        <p><strong>1. San Jose del Cabo:</strong> Located closest to the airport (approximately 15 to 20 minutes away). This historic town offers a relaxed atmosphere, a vibrant arts district, and luxurious beachfront properties. A swift <strong>private airport transfer los cabos</strong> gets you to these resorts in minutes using the direct hotel zone bypass roads.</p>
                        <p><strong>2. The Tourist Corridor:</strong> This is a scenic 30-kilometer four-lane highway linking the two main towns. It is home to iconic golf courses and legendary master-planned oceanfront resorts. Booking high-end <strong>luxury transportation cabo san lucas</strong> ensures an incredibly smooth cruise along this breathtaking coastline with zero intermediate stops.</p>
                        <p><strong>3. Cabo San Lucas Downtown & Marina:</strong> The pulsating heart of the nightlife, fishing charters, and luxury shopping, roughly 45 minutes from SJD Airport. Navigating this busy corridor requires seasoned drivers who know how to manage city traffic efficiently.</p>
                        <p><strong>4. The Pacific Zone & Diamante:</strong> Located past the downtown arch area on the rough Pacific coastline (properties like Nobu Hotel, Hard Rock, and Sunset Beach). This exclusive sector is secluded and requires driving on specialized toll highways. Having premium <strong>cabo airport transportation</strong> with prepaid toll tracking ensures you reach these remote luxury enclaves quickly and securely.</p>
                      </div>
                    </section>

                    <section className="border-t border-gray-200 pt-10">
                      <h2 className="text-3xl font-black text-gray-900 mb-6">Frequently Asked Questions (FAQ)</h2>
                      <div className="space-y-6 text-base">
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">What happens if my incoming flight to SJD Airport is delayed?</h4>
                          <p className="text-gray-600 mt-1">When you book a professional <strong>private airport transfer los cabos</strong>, your flight number is integrated into our real-time arrival tracking dashboard. We monitor your tail number constantly, meaning your driver will adjust their arrival time automatically. Your vehicle will be waiting for you regardless of whether your flight is early, late, or heavily delayed, with zero extra fees.</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">Are child car seats included in luxury transportation cabo san lucas services?</h4>
                          <p className="text-gray-600 mt-1">Yes, family safety is a top priority for premium operators. When configuring your <strong>cabo airport transportation</strong> on our platform, you can specify the number of car seats, baby seats, or booster seats required. These essential safety features are provided entirely complimentary and will be pre-installed securely in your SUV before pickup.</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">Can we request a brief stop at a grocery store or Costco on our way to the resort?</h4>
                          <p className="text-gray-600 mt-1">Absolutely. One of the greatest advantages of an exclusive <strong>private airport transfer los cabos</strong> over standard airport taxis is flexibility. We offer optional pre-arranged grocery stops (up to 60 minutes) at major retailers like Costco, Walmart, or La Comer, allowing you to stock up on premium supplies before arriving at your resort.</p>
                        </div>
                      </div>
                    </section>

                    {/* FINAL CALL TO ACTION BLOCK */}
                    <footer className="bg-gray-900 text-white p-8 md:p-12 rounded-[2rem] text-center space-y-6 shadow-2xl">
                      <h3 className="text-2xl md:text-3xl font-black">Experience the Pinnacle of Baja Chauffeur Luxury</h3>
                      <p className="text-gray-400 max-w-2xl mx-auto text-sm">
                        From solo executive travelers to massive corporate groups, our immaculate fleet of luxury SUVs and Mercedes Sprinter vans is standing by to deliver premium logistics.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-4">
                        <button
                          onClick={() => { setServicioSeleccionado('aeropuerto_hotel'); setPaso(2); navigate("/"); window.scrollTo(0, 0); }}
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-6 rounded-xl transition-all shadow-lg text-base uppercase"
                        >
                          Cabo Airport Transportation
                        </button>
                        <button
                          onClick={() => { setServicioSeleccionado('aeropuerto_hotel'); setPaso(2); navigate("/"); window.scrollTo(0, 0); }}
                          className="w-full bg-white text-gray-900 font-black py-4 px-6 rounded-xl hover:bg-gray-100 transition-all shadow-lg text-base uppercase border border-gray-300"
                        >
                          Book Here
                        </button>
                      </div>
                    </footer>

                  </main>
                </div>
              } />
              {/* 🌊 GENERADOR DINÁMICO DE TOURS ESTRELLA */}
              {toursLandingPages.map((tour) => (
                <Route key={tour.slug} path={`/tours/${tour.slug}`} element={
                  <div className="animate-fade-in bg-white pb-20 text-gray-700">
                    <Helmet>
                      <title>{tour.nombre} in Los Cabos | Ballard Tours</title>
                      <meta name="description" content={`Book the best ${tour.nombre} in Los Cabos. ${tour.desc} VIP service, certified guides, and best rates guaranteed.`} />
                      <script type="application/ld+json">
                        {`
                          {
                            "@context": "https://schema.org",
                            "@type": "TouristAttraction",
                            "name": "${tour.nombre}",
                            "description": "${tour.desc}",
                            "provider": {
                              "@type": "LocalBusiness",
                              "name": "Ballard Tours Los Cabos"
                            }
                          }
                        `}
                      </script>
                    </Helmet>

                    {/* 👇 ACTUALIZA ESTE HEADER EN EL MAP 👇 */}
                    {/* 👇 HEADER BLINDADO CON ETIQUETA IMG 👇 */}
                    <header className="relative bg-gray-900 text-white py-28 md:py-36 px-4 text-center overflow-hidden">

                      {/* 1. IMAGEN BLINDADA (Usando etiqueta img en vez de background-image) */}
                      <div className="absolute inset-0 z-0">
                        <img
                          src={tour.imageUrl}
                          alt={tour.nombre}
                          className="w-full h-full object-cover opacity-60"
                        />
                      </div>

                      {/* 2. OVERLAY AZUL PARA QUE RESALTE EL TEXTO */}
                      <div className="absolute inset-0 bg-blue-950/60 z-10"></div>

                      {/* 3. CONTENIDO DEL HERO */}
                      <div className="relative max-w-4xl mx-auto z-20">
                        <span className="inline-block bg-blue-600/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest border border-blue-400/30">
                          {tour.tipo}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight drop-shadow-xl">
                          {tour.nombre}
                        </h1>
                        <p className="text-xl text-gray-100 max-w-2xl mx-auto font-medium drop-shadow-md">
                          {tour.desc}
                        </p>
                      </div>
                    </header>
                    {/* 👆 FIN DEL HEADER ACTUALIZADO 👆 */}

                    {/* CONTENIDO Y CONVERSIÓN */}
                    <main className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

                      <div className="lg:col-span-2 space-y-8 text-lg leading-relaxed text-gray-600">
                        <h2 className="text-3xl font-black text-gray-900 border-b pb-4">Tour Overview</h2>
                        <p>{tour.detalle}</p>

                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 mt-8">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">Why Book This Experience With Us?</h3>
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3"><CheckCircle className="text-green-500 shrink-0 mt-1" size={20} /> <span><strong>Private & VIP Focus:</strong> Avoid massive, crowded buses. We focus on small groups and personalized attention.</span></li>
                            <li className="flex items-start gap-3"><CheckCircle className="text-green-500 shrink-0 mt-1" size={20} /> <span><strong>Certified Guides:</strong> Bilingual experts who prioritize your safety and deliver unmatched local knowledge.</span></li>
                            <li className="flex items-start gap-3"><CheckCircle className="text-green-500 shrink-0 mt-1" size={20} /> <span><strong>Seamless Transportation:</strong> Add our luxury SUV pick-up from your hotel directly to the activity location.</span></li>
                          </ul>
                        </div>
                      </div>

                      {/* WIDGET DE RESERVA FLOTANTE */}
                      <div className="lg:col-span-1">
                        <div className="bg-white border-2 border-blue-900 p-8 rounded-[2rem] shadow-2xl sticky top-28">
                          <h3 className="text-2xl font-black text-gray-900 mb-2">Reserve Your Spot</h3>
                          <p className="text-gray-500 mb-6 text-sm">High demand for 2026 season. Secure your date now.</p>

                          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex justify-between items-center mb-8">
                            <span className="font-bold text-blue-900">Starting at</span>
                            <span className="font-black text-blue-900 text-2xl">${tour.precio} <span className="text-sm font-normal">USD</span></span>
                          </div>

                          <button
                            onClick={() => {
                              setServicioSeleccionado('tours');
                              setPaso(2);
                              navigate('/');
                              window.scrollTo(0, 0);
                            }}
                            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-900/20 uppercase tracking-wide"
                          >
                            Book This Tour <ChevronRight size={20} />
                          </button>

                          <p className="text-center text-xs text-gray-400 mt-4 font-bold flex justify-center items-center gap-1">
                            <CheckCircle size={14} className="text-green-500" /> Instant Confirmation
                          </p>
                        </div>
                      </div>

                    </main>
                  </div>
                } />
              ))}

              {/* 🚀 URL 8: LA JOYA DE LA CORONA SEO - MEGA PILLAR PAGE (tudominio.com/things-to-do-in-cabo-san-lucas) */}
              <Route path="/things-to-do-in-cabo-san-lucas" element={
                <div className="animate-fade-in bg-white pb-20 text-gray-700">
                  <Helmet>
                    <title>Top 10 Things to Do in Cabo San Lucas | Best Cabo Tours & Excursions</title>
                    <meta name="description" content="Discover the ultimate list of things to do in cabo san lucas. Book top-rated cabo tours, ocean excursions, and unlock the best cabo activities for 2026." />
                  </Helmet>

                  {/* HERO MAJESTUOSO */}
                  <header className="relative bg-gray-950 text-white py-32 md:py-40 px-4 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-blue-950/80 z-10"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=2000')] bg-cover bg-center opacity-40"></div>

                    <div className="relative max-w-5xl mx-auto z-20">
                      <span className="inline-block bg-amber-500 text-gray-900 text-xs font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest shadow-md">Official 2026 Travel Guide</span>
                      <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
                        Ultimate Guide to Things to Do in Cabo San Lucas
                      </h1>
                      <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light">
                        Plan your perfect getaway with the absolute best cabo tours, unforgettable cabo san lucas excursions, and premium outdoor activities.
                      </p>

                      {/* BOTONES INTERACTIVOS DE CONVERSIÓN */}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
                        <button
                          onClick={() => { setServicioSeleccionado('tours'); setPaso(2); navigate("/"); window.scrollTo(0, 0); }}
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-8 rounded-xl transition-all shadow-xl text-lg uppercase tracking-wide"
                        >
                          Explore Cabo Tours
                        </button>
                        <button
                          onClick={() => { setServicioSeleccionado('tours'); setPaso(2); navigate("/"); window.scrollTo(0, 0); }}
                          className="w-full bg-white text-gray-900 font-black py-5 px-8 rounded-xl hover:bg-gray-100 transition-all shadow-xl text-lg uppercase border-2 border-gray-200"
                        >
                          Book Excursions Here
                        </button>
                      </div>
                    </div>
                  </header>

                  {/* CONTENIDO ESTRATÉGICO */}
                  <main className="max-w-4xl mx-auto px-4 py-16 text-lg leading-relaxed space-y-12">

                    <section>
                      <h2 className="text-3xl font-black text-gray-900 mb-6">Discovering the Magic of Land's End: An Overview</h2>
                      <p>
                        When planning an unforgettable vacation to Baja California Sur, knowing the absolute top <strong>things to do in cabo san lucas</strong> is crucial to crafting a bucket-list itinerary. Where the rugged desert mountains dramatically crash into the crystal-clear waters of the Sea of Cortez, Los Cabos stands as a world-class destination for luxury, adventure, and relaxation. From high-octane desert racing to serene encounters with majestic marine wildlife, finding the right mix of official <strong>cabo tours</strong> guarantees that your time in paradise is nothing short of spectacular.
                      </p>
                      <p>
                        Navigating the massive array of available outdoor options can feel overwhelming for first-time visitors. However, structurally organizing your trip around premium <strong>cabo san lucas excursions</strong> allows you to maximize your daytime hours while ensuring top-tier safety, expert local bilingual guidance, and high-end comfort. Whether your goal is to swim with massive whale sharks in La Paz, ride camels across secluded Pacific beaches, or simply secure the absolute <strong>best tours in cabo</strong> for your family, investing in professional logistics transforms a simple holiday into a seamless VIP experience packed with incredible <strong>cabo activities</strong>.
                      </p>
                    </section>

                    {/* CLÚSTER 1: DESIERTO */}
                    <section className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900">1. Thrilling Desert Adventures & ATV Off-Roading</h3>
                      <p>
                        If you ask seasoned travelers about the most exhilarating <strong>things to do in cabo san lucas</strong>, off-road desert trail riding always tops the chart. The unique geographical ecosystem of the Baja peninsula provides a natural playground for high-horsepower exploration. Booking specialized <strong>cabo atv tours</strong> gives you the rare opportunity to race through deep desert canyons, navigate rocky dry riverbeds, and cruise along massive, pristine sand dunes directly overlooking the roaring Pacific waves. It is an adrenaline-fueled exploration that contrasts beautifully with the coastal resort lifestyle.
                      </p>
                      <p>
                        For those who prefer a more relaxed yet equally exotic desert journey, a traditional <strong>camel ride cabo</strong> safari offers a wonderful alternative. Riding friendly, highly trained camels along the secluded oceanfront provides breathtaking panoramic views and unmatched photo opportunities. Most premium desert <strong>cabo tours</strong> combine these outback safaris with authentic Mexican buffet lunches and expert-led artisanal tequila tastings, making them highly popular family-friendly choices among the diverse menu of daily <strong>cabo activities</strong>.
                      </p>
                      <button
                        onClick={() => { setServicioSeleccionado('tours'); setPaso(2); navigate("/"); window.scrollTo(0, 0); }}
                        className="text-blue-600 font-bold hover:text-blue-800 transition-colors flex items-center gap-2 pt-2"
                      >
                        Book Desert & ATV Adventures Now &rarr;
                      </button>
                    </section>

                    {/* CLÚSTER 2: MAR */}
                    <section>
                      <h3 className="text-2xl font-black text-gray-900 mb-4">2. Unmatched Marine Expeditions & Snorkeling Sanctuary</h3>
                      <p>
                        The Sea of Cortez was famously dubbed the "Aquarium of the World" by legendary explorer Jacques Cousteau, and exploring its rich waters is undeniably one of the essential <strong>things to do in cabo san lucas</strong>. The marine sanctuary surrounding Pelican Rock and the iconic Land's End Arch is teeming with bright tropical fish, sea lions, and vibrant coral gardens. Securing your spot on top-rated <strong>cabo snorkeling tours</strong> allows you to safely plunge into calm, turquoise bays with premium equipment and certified marine biologists who guide you straight to the best viewing hotspots.
                      </p>
                      <p>
                        If you are visiting during the winter and early spring months, no collection of <strong>cabo san lucas excursions</strong> is truly complete without a dedicated whale watching charter. Thousands of humpback whales migrate to these warm bays to breed and nurse their calves, offering spectacular displays of breaching and tail-slapping. Combining a snorkeling trip with wildlife tracking stands as one of the <strong>best tours in cabo</strong>, providing deep educational insights while fulfilling lifelong travel dreams through premium water-based <strong>cabo activities</strong>.
                      </p>
                    </section>

                    {/* CLÚSTER 3: LA PAZ */}
                    <section className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100/50 space-y-4">
                      <h3 className="text-2xl font-bold text-blue-950">3. Once-in-a-Lifetime Ecological Encounters</h3>
                      <p>
                        For discerning travelers looking to venture slightly beyond the main tourist corridors, the surrounding regional bio-reserves offer mind-blowing eco-adventures. Journeying to the peaceful capital city of La Paz to <strong>swim with whale sharks cabo</strong> is widely considered the absolute pinnacle of nature-based travel in Mexico. Swimming alongside these gentle, massive filter-feeding giants in their natural habitat under strict ecological supervision is an deeply moving and humbling experience.
                      </p>
                      <p>
                        Similarly, a full-day VIP expedition to the protected jewel of Isla Espiritu Santo exposes you to dramatic desert-meets-ocean landscapes, isolated white-sand beaches, and the unforgettable opportunity to snorkel with wild, playful sea lion pups. These highly specialized, long-distance <strong>cabo san lucas excursions</strong> require reliable, luxury highway transportation and private boat charters. Choosing a high-end operator ensures you enjoy comfortable transits, top-tier gear, and expert guidance, solidifying these trips as the undisputed <strong>best tours in cabo</strong> for ocean enthusiasts.
                      </p>
                      <button
                        onClick={() => { setServicioSeleccionado('tours'); setPaso(2); navigate("/"); window.scrollTo(0, 0); }}
                        className="bg-blue-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-800 transition-all shadow-md text-sm"
                      >
                        Reserve Eco & Whale Shark Expeditions
                      </button>
                    </section>

                    {/* FAQ EXTENSO PARA ALIMENTAR A GOOGLE SGE Y RANKING */}
                    <section className="border-t border-gray-200 pt-12">
                      <h2 className="text-3xl font-black text-gray-900 mb-6">Frequently Asked Questions About Cabo Activities</h2>
                      <div className="space-y-6 text-base text-gray-600">
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">What are the absolute best things to do in cabo san lucas for first-timers?</h4>
                          <p className="mt-1">First-time visitors should prioritize a classic boat cruise to the Land's End Arch, participate in a guided <strong>private airport transfer los cabos</strong> to get safely to their resort, and book at least one signature adventure like <strong>cabo atv tours</strong> or a scenic <strong>camel ride cabo</strong> beach safari to fully experience the unique Baja ecosystem.</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">How far in advance should I book my cabo san lucas excursions?</h4>
                          <p className="mt-1">Because premium, small-group <strong>cabo tours</strong> have limited daily capacities to ensure safety and quality, it is highly recommended to reserve your spots at least 2 to 4 weeks in advance, particularly during the high season (November through April) and major holiday weeks when demand peaks across all major <strong>cabo activities</strong>.</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">Is transportation included in the best tours in cabo?</h4>
                          <p className="mt-1">Many top-tier <strong>cabo san lucas excursions</strong> offer optional hotel pick-up services. For an elevated, stress-free experience, travelers frequently pair their tour bookings with professional <strong>luxury transportation cabo san lucas</strong> providers to ensure seamless, private round-trip transits from their specific resort gates directly to the tour launching sites.</p>
                        </div>
                      </div>
                    </section>

                    {/* CIERRE DE VENTA FINAL */}
                    <footer className="bg-gray-900 text-white p-8 md:p-12 rounded-[2rem] text-center space-y-6 shadow-2xl">
                      <h3 className="text-2xl md:text-3xl font-black">Unlock the Best of Los Cabos Today</h3>
                      <p className="text-gray-400 max-w-2xl mx-auto text-sm">
                        Don't settle for crowded commercial tours. Experience luxury logistics and certified 5-star excursions tailored exclusively to your vacation schedule.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-4">
                        <button
                          onClick={() => { setServicioSeleccionado('tours'); setPaso(2); navigate("/"); window.scrollTo(0, 0); }}
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-6 rounded-xl transition-all shadow-lg text-base uppercase"
                        >
                          Book Your Tour
                        </button>
                        <button
                          onClick={() => { setServicioSeleccionado('tours'); setPaso(2); navigate("/"); window.scrollTo(0, 0); }}
                          className="w-full bg-white text-gray-900 font-black py-4 px-6 rounded-xl hover:bg-gray-100 transition-all shadow-lg text-base uppercase border border-gray-300"
                        >
                          Book Here
                        </button>
                      </div>
                    </footer>

                  </main>
                </div>
              } />

            </Routes>
          </main>

          <footer className="mt-24 py-8 border-t border-gray-200 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Ballard Tours Los Cabos. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
          </footer>

          <WhatsAppButton />

        </div>
      </HelmetProvider>
    </PayPalScriptProvider>
  );
}