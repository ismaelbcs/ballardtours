import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Términos y Condiciones | Ballard Tour Services</title>
        <meta name="description" content="Términos y condiciones de servicio para la transportación turística privada de Ballard Tour Services en Los Cabos, Baja California Sur." />
        <link rel="canonical" href="https://www.ballardtours.com/terms-and-conditions" />
      </Helmet>

      <section className="max-w-4xl mx-auto px-4 py-16 mt-20 text-gray-800 bg-white">
        <h1 className="text-4xl md:text-5xl font-black text-blue-900 mb-8 text-center">
          Términos y Condiciones de Servicio
        </h1>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-10 text-center">
          <p className="text-lg text-gray-700">
            <strong>Ballard Tour Services</strong><br />
            Transportación Turística Privada<br />
            Los Cabos, Baja California Sur, México<br />
            <span className="text-sm text-gray-500 mt-2 block">Versión 2025 - Última actualización: Junio 2025</span>
          </p>
        </div>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">1. Información General</h2>
        <p className="mb-4 leading-relaxed">
          Los presentes Términos y Condiciones regulan la relación entre Ballard Tour Services
          y cualquier persona física o moral que reserve, contrate o utilice nuestros servicios
          de transportación turística privada.
        </p>
        <p className="mb-4 leading-relaxed">
          Al realizar una reservación por teléfono, WhatsApp, correo electrónico,
          sitio web o cualquier otro medio, el cliente acepta íntegramente estos términos.
        </p>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">2. Servicios Ofrecidos</h2>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li>Traslados aeropuerto-hotel-aeropuerto.</li>
          <li>Transportación privada en Los Cabos.</li>
          <li>Traslados para bodas y eventos.</li>
          <li>Transportación corporativa.</li>
          <li>Excursiones y tours privados.</li>
          <li>Traslados a La Paz, Todos Santos, Cabo Pulmo y otras localidades.</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">3. Reservaciones</h2>
        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Canales Oficiales</h3>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li>Sitio web: <a href="https://www.ballardtours.com" className="text-blue-600 hover:underline">https://www.ballardtours.com</a></li>
          <li>WhatsApp: +52 624 139 3497</li>
          <li>Correo electrónico: <a href="mailto:reservationballard@gmail.com" className="text-blue-600 hover:underline">reservationballard@gmail.com</a></li>
          <li>Teléfono: +52 624 139 3497</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Información requerida</h3>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li>Nombre completo.</li>
          <li>Número de pasajeros.</li>
          <li>Fecha y hora del servicio.</li>
          <li>Origen y destino.</li>
          <li>Número de vuelo (si aplica).</li>
          <li>Cantidad de equipaje.</li>
          <li>Requerimientos especiales.</li>
          <li>Correo electrónico y teléfono de contacto.</li>
        </ul>
        <p className="mb-4 leading-relaxed bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
          Ballard Tour Services no será responsable por inconvenientes derivados de información
          incorrecta o incompleta proporcionada por el cliente.
        </p>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">4. Tarifas y Pagos</h2>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li>Los precios pueden variar según temporada, disponibilidad y tipo de vehículo.</li>
          <li>La tarifa válida será la confirmada por escrito al cliente.</li>
          <li>Se aceptan pagos en MXN, USD, tarjetas bancarias y plataformas digitales autorizadas.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Cargos Adicionales</h3>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li>Esperas superiores al tiempo incluido.</li>
          <li>Exceso de equipaje.</li>
          <li>Paradas no programadas.</li>
          <li>Cambios de ruta o destino.</li>
          <li>Servicios nocturnos entre 22:00 y 06:00 hrs.</li>
          <li>Limpieza extraordinaria por daños ocasionados por pasajeros.</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">5. Política de Cancelaciones y Modificaciones</h2>
        
        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Servicios Individuales</h3>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li><strong>Más de 48 horas antes:</strong> Reembolso del 100%.</li>
          <li><strong>Entre 24 y 48 horas antes:</strong> Reembolso del 50%.</li>
          <li><strong>Menos de 24 horas antes:</strong> Sin reembolso.</li>
          <li><strong>No Show:</strong> Sin reembolso.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Grupos y Eventos</h3>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li><strong>Más de 15 días antes:</strong> Reembolso del 100% del anticipo.</li>
          <li><strong>Entre 8 y 15 días antes:</strong> Reembolso del 50% del anticipo.</li>
          <li><strong>Entre 3 y 7 días antes:</strong> Reembolso del 25% del anticipo.</li>
          <li><strong>Menos de 72 horas antes:</strong> Sin reembolso.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Traslados Aeroportuarios</h3>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li><strong>Más de 48 horas antes:</strong> Reembolso completo.</li>
          <li><strong>Entre 12 y 48 horas antes:</strong> Cargo del 30% sobre la tarifa.</li>
          <li><strong>Menos de 12 horas antes o No Show:</strong> Sin reembolso.</li>
          <li><strong>Cancelaciones de vuelo documentadas:</strong> Reprogramación sin costo, sujeta a disponibilidad.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Modificaciones</h3>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li>Cambios con más de 48 horas de anticipación: Sin cargo.</li>
          <li>Cambios de vehículo o ruta pueden generar diferencias tarifarias.</li>
          <li>La reducción de pasajeros o equipaje no genera reembolso.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Proceso de Reembolso</h3>
        <p className="mb-4 leading-relaxed">
          Los reembolsos aprobados serán procesados en un plazo de 5 a 10 días hábiles.
          Las comisiones bancarias y de procesamiento no son reembolsables.
        </p>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">6. Condiciones para Traslados Aeroportuarios</h2>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li>Monitoreamos los vuelos proporcionados por el cliente.</li>
          <li>Retrasos de hasta 2 horas no generan cargos adicionales.</li>
          <li>El conductor esperará hasta 60 minutos después del aterrizaje.</li>
          <li>Después de 60 minutos sin contacto se considerará No Show.</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">7. Obligaciones del Cliente</h2>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li>Proporcionar información veraz.</li>
          <li>Presentarse puntualmente.</li>
          <li>Respetar al conductor y al personal.</li>
          <li>Seguir las indicaciones de seguridad.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Conductas Prohibidas</h3>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li>Consumo de drogas ilegales.</li>
          <li>Comportamientos agresivos.</li>
          <li>Dañar el vehículo.</li>
          <li>Fumar dentro de la unidad.</li>
          <li>Poner en riesgo la seguridad de otros pasajeros.</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">8. Equipaje</h2>
        <p className="mb-4 leading-relaxed">
          El equipaje permitido dependerá de la capacidad del vehículo reservado.
          El cliente deberá informar la cantidad de equipaje al momento de reservar.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Objetos Prohibidos</h3>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li>Armas de fuego.</li>
          <li>Explosivos.</li>
          <li>Sustancias peligrosas.</li>
          <li>Drogas ilegales.</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">9. Menores de Edad</h2>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 ml-4">
          <li>Todo menor deberá viajar acompañado por un adulto.</li>
          <li>Los menores de 4 años deberán utilizar silla infantil.</li>
          <li>No se transportarán menores sin acompañante.</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">10. Limitación de Responsabilidad</h2>
        <p className="mb-4 leading-relaxed">
          Ballard Tour Services no será responsable por retrasos causados por tráfico,
          accidentes de terceros, manifestaciones, fenómenos naturales o cualquier
          circunstancia fuera de su control razonable.
        </p>
        <p className="mb-4 leading-relaxed">
          La responsabilidad máxima de Ballard Tour Services por cualquier reclamación
          relacionada con un servicio no excederá el monto pagado por dicho servicio.
        </p>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">11. Fuerza Mayor</h2>
        <p className="mb-4 leading-relaxed">
          La empresa podrá cancelar o modificar servicios por huracanes, tormentas,
          fenómenos naturales, cierres carreteros, pandemias, órdenes gubernamentales
          u otros eventos fuera de su control.
        </p>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">12. Seguro</h2>
        <p className="mb-4 leading-relaxed">
          Todos nuestros vehículos cuentan con los seguros exigidos por la legislación
          aplicable para servicios de transportación turística.
        </p>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">13. Protección de Datos</h2>
        <p className="mb-4 leading-relaxed">
          Los datos personales serán utilizados únicamente para la prestación del servicio,
          comunicación con el cliente, facturación y cumplimiento de obligaciones legales.
        </p>
        <p className="mb-4 leading-relaxed">
          Para ejercer derechos ARCO puede contactar a:{' '}
          <a href="mailto:reservationballard@gmail.com" className="text-blue-600 hover:underline">reservationballard@gmail.com</a>
        </p>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">14. Disputas Bancarias (Chargebacks)</h2>
        <p className="mb-4 leading-relaxed">
          El cliente reconoce que toda reservación realizada y confirmada constituye una
          contratación legítima del servicio y acepta no iniciar disputas bancarias
          improcedentes o fraudulentas.
        </p>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">15. Reclamaciones</h2>
        <p className="mb-4 leading-relaxed">
          Toda reclamación deberá enviarse por escrito dentro de los 5 días naturales
          posteriores al servicio al correo:{' '}
          <a href="mailto:reservationballard@gmail.com" className="text-blue-600 hover:underline">reservationballard@gmail.com</a>
        </p>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">16. Jurisdicción</h2>
        <p className="mb-4 leading-relaxed">
          Estos términos se regirán por las leyes de los Estados Unidos Mexicanos.
          Para cualquier controversia, las partes se someten a la jurisdicción de los
          tribunales competentes de Los Cabos, Baja California Sur.
        </p>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">17. Contacto</h2>
        <p className="mb-4 leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-200">
          <strong>Ballard Tour Services</strong><br />
          Sitio web: <a href="https://www.ballardtours.com" className="text-blue-600 hover:underline">https://www.ballardtours.com</a><br />
          Correo: <a href="mailto:reservationballard@gmail.com" className="text-blue-600 hover:underline">reservationballard@gmail.com</a><br />
          Teléfono: +52 624 139 3497
        </p>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">18. Aceptación</h2>
        <p className="mb-4 leading-relaxed font-semibold text-gray-800">
          Al reservar cualquier servicio con Ballard Tour Services, el cliente declara haber leído,
          comprendido y aceptado íntegramente estos Términos y Condiciones.
        </p>
      </section>
    </>
  );
};

export default TermsAndConditions;