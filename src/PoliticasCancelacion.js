import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function PoliticasCancelacion() {
  return (
    <>
      <Helmet>
        <title>Políticas de Cancelación | Ballard Tour Services</title>
        <meta name="description" content="Políticas de cancelación, reembolsos y modificaciones para los servicios de transportación turística privada de Ballard Tour Services en Los Cabos." />
        <link rel="canonical" href="https://www.ballardtours.com/politicas-de-cancelacion" />
      </Helmet>

      <section className="max-w-4xl mx-auto px-4 py-16 mt-20 text-gray-800 bg-white">
        <h1 className="text-4xl md:text-5xl font-black text-blue-900 mb-8 text-center">
          Políticas de Cancelación
        </h1>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-10 text-center">
          <p className="text-lg text-gray-700">
            <strong>Ballard Tour Services</strong><br />
            Transportación Turística Privada<br />
            Los Cabos, Baja California Sur, México
          </p>
        </div>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">
          Disposiciones Generales
        </h2>
        <p className="mb-4 leading-relaxed">
          Las presentes Políticas de Cancelación forman parte integral de los
          Términos y Condiciones de Ballard Tour Services y aplican a todos los
          servicios contratados.
        </p>
        <p className="mb-4 leading-relaxed">
          Una vez confirmada una reservación mediante voucher o código de
          confirmación, estas políticas entran en vigor de manera inmediata.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8 rounded-r-lg shadow-sm">
          <h3 className="font-bold text-yellow-800 mb-2">Canales oficiales para cancelaciones:</h3>
          <ul className="list-disc ml-6 space-y-1 text-yellow-900">
            <li>WhatsApp: +52 624 139 3497</li>
            <li>Correo: <a href="mailto:reservationballard@gmail.com" className="hover:underline">reservationballard@gmail.com</a></li>
            <li>Llamada telefónica con confirmación escrita</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">
          Traslados Individuales
        </h2>
        <div className="overflow-x-auto mb-8 shadow-sm rounded-lg border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-4 border-b font-semibold">Anticipación</th>
                <th className="p-4 border-b font-semibold">Reembolso</th>
                <th className="p-4 border-b font-semibold">Penalidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="p-4">Más de 72 horas</td>
                <td className="p-4 text-green-600 font-medium">100%</td>
                <td className="p-4">Sin cargo</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-4">48 a 72 horas</td>
                <td className="p-4 text-green-600 font-medium">75%</td>
                <td className="p-4 text-red-500">25%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-4">24 a 48 horas</td>
                <td className="p-4 text-yellow-600 font-medium">50%</td>
                <td className="p-4 text-red-500">50%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-4">Menos de 24 horas</td>
                <td className="p-4 text-red-600 font-medium">Sin reembolso</td>
                <td className="p-4 text-red-500">100%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-red-50">
                <td className="p-4 font-semibold">No Show</td>
                <td className="p-4 text-red-600 font-medium">Sin reembolso</td>
                <td className="p-4 text-red-600 font-semibold">100%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">
          Traslados Grupales (5 a 15 pasajeros)
        </h2>
        <div className="overflow-x-auto mb-8 shadow-sm rounded-lg border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-4 border-b font-semibold">Anticipación</th>
                <th className="p-4 border-b font-semibold">Reembolso</th>
                <th className="p-4 border-b font-semibold">Penalidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="p-4">Más de 15 días</td>
                <td className="p-4 text-green-600 font-medium">100%</td>
                <td className="p-4">Sin cargo</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-4">8 a 15 días</td>
                <td className="p-4 text-yellow-600 font-medium">60%</td>
                <td className="p-4 text-red-500">40%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-4">5 a 7 días</td>
                <td className="p-4 text-yellow-600 font-medium">30%</td>
                <td className="p-4 text-red-500">70%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-red-50">
                <td className="p-4">72 horas a 5 días</td>
                <td className="p-4 text-red-600 font-medium">Sin reembolso</td>
                <td className="p-4 text-red-600 font-semibold">100%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">
          Eventos, Bodas y Convenciones
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li><strong>Más de 30 días:</strong> 80% de reembolso del anticipo.</li>
          <li><strong>15 a 30 días:</strong> 50% de reembolso del anticipo.</li>
          <li><strong>7 a 14 días:</strong> 20% de reembolso del anticipo.</li>
          <li><strong>Menos de 7 días:</strong> Sin reembolso.</li>
          <li><strong>No Show:</strong> Saldo total exigible.</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">
          Servicios por Horas (Charter Privado)
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li><strong>Más de 48 horas:</strong> Reembolso completo.</li>
          <li><strong>24 a 48 horas:</strong> Reembolso del 50%.</li>
          <li><strong>Menos de 24 horas:</strong> Sin reembolso.</li>
          <li><strong>Cancelación durante el servicio:</strong> Se cobra el total pactado.</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">
          Traslados de Larga Distancia
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li><strong>Más de 72 horas:</strong> Reembolso completo.</li>
          <li><strong>48 a 72 horas:</strong> Reembolso del 50%.</li>
          <li><strong>Menos de 48 horas:</strong> Sin reembolso.</li>
          <li><strong>No Show:</strong> Sin reembolso.</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">
          Condiciones Especiales
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Vuelos cancelados o retrasados podrán reprogramarse sin penalidad, sujeta a disponibilidad.</li>
          <li>Debe presentarse documentación oficial de la aerolínea.</li>
          <li>Alertas oficiales de huracán o ciclón permiten cancelación sin penalidad.</li>
          <li>Lluvia normal o tráfico no generan derecho a reembolso.</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">
          Llegadas Tardías
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li><strong>Hasta 15 minutos:</strong> Sin cargo.</li>
          <li><strong>15 a 30 minutos:</strong> Cargo por espera.</li>
          <li><strong>30 a 60 minutos:</strong> Cargo por hora de espera.</li>
          <li><strong>Más de 60 minutos sin comunicación:</strong> Considerado como No Show.</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">
          Proceso de Reembolsos
        </h2>
        <p className="mb-4 leading-relaxed">
          Los reembolsos aprobados serán procesados entre <strong>5 y 10 días hábiles</strong>,
          dependiendo del método de pago utilizado.
        </p>
        <p className="mb-4 leading-relaxed text-red-600 font-semibold">
          No son reembolsables las comisiones de Stripe, PayPal, Mercado Pago,
          cargos bancarios ni diferencias cambiarias.
        </p>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">
          Casos de No Reembolso
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>No Show.</li>
          <li>Llegadas tardías fuera de los límites establecidos.</li>
          <li>Cancelaciones fuera de los plazos permitidos.</li>
          <li>Información incorrecta proporcionada por el cliente.</li>
          <li>Conducta inapropiada o estado inconveniente del pasajero.</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-4 border-b pb-2">
          Temporada Alta
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>15 de diciembre al 5 de enero.</li>
          <li>Semana Santa y Pascua.</li>
          <li>15 de julio al 15 de agosto.</li>
          <li>Puentes y eventos especiales de Los Cabos.</li>
        </ul>
        <p className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-red-900 font-medium">
          Durante temporada alta se requiere un anticipo mínimo del 50% y las
          cancelaciones con menos de 72 horas no son reembolsables.
        </p>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-12">
          <h3 className="text-xl font-bold text-blue-900 mb-3">Contacto</h3>
          <p className="text-gray-700 leading-relaxed">
            <strong>Ballard Tour Services</strong><br />
            Sitio web: <a href="https://www.ballardtours.com" className="text-blue-600 hover:underline">https://www.ballardtours.com</a><br />
            Correo: <a href="mailto:reservationballard@gmail.com" className="text-blue-600 hover:underline">reservationballard@gmail.com</a><br />
            Teléfono: +52 624 139 3497
          </p>
        </div>
      </section>
    </>
  );
}