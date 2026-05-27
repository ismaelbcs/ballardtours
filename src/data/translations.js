// src/data/translations.js

export const translations = {
 es: {
    nav: { home: 'Inicio', zones: 'Tarifas y Zonas', tours: 'Experiencias' },
    auth: { login_title: 'Iniciar Sesión', register_title: 'Crear Cuenta', email: 'Correo Electrónico', pass: 'Contraseña', name: 'Nombre Completo', login_btn: 'Entrar', register_btn: 'Registrarme', no_account: '¿No tienes cuenta?', has_account: '¿Ya tienes cuenta?', logout: 'Cerrar sesión', agency_badge: 'AGENCIA', agency_discount: 'Descuento de Agencia (20%)' },
    steps: ['Servicio', 'Detalles', 'Información', 'Confirmación'],
    hero: { title: 'Experiencias Premium en Los Cabos', subtitle: 'Transporte privado de lujo y tours inolvidables con el mejor servicio garantizado.' },
    cart: {
      title: 'Mi Combo',
      empty: 'Tu combo está vacío. ¡Añade algunos servicios!',
      add: 'Añadir a mi combo',
      added: '¡Añadido al combo!',
      remove: 'Quitar',
      checkout: 'Proceder al Checkout',
      continue_shopping: 'Seguir armando mi combo',
      total: 'Total del Combo',
      build: 'Arma tu Combo'
    },
    step1: {
      title: 'Reserva tu Transporte', subtitle: 'Selecciona el tipo de servicio para comenzar con tu reserva segura y rápida.',
      a2h: 'Aeropuerto → Hotel', a2h_desc: 'Te recibimos a tu llegada y te llevamos directo a tu resort.',
      h2a: 'Hotel → Aeropuerto', h2a_desc: 'Llega a tiempo y sin estrés para tu vuelo de regreso a casa.',
      rt: 'Viaje Redondo', rt_desc: 'La opción más inteligente. Cubrimos tu llegada y tu salida.',
      tours: 'Tours y Servicios Especiales', tours_desc: 'Explora Los Cabos con nuestras expediciones guiadas de primer nivel.',
      book: 'Reservar', catalog: 'Ver Catálogo',
      featured_title: 'Experiencias Inolvidables', featured_sub: 'Selecciona un tour para ver detalles y reservar al instante.',
      price_from: 'Precio desde',
      directory_title: 'Directorio de Zonas y Tarifas', search_placeholder: 'Escribe el nombre de tu hotel...',
      hotels_in_zone: 'Hoteles en esta zona', not_found: 'No se encontraron hoteles.'
    },
    step2: {
      select_exp: 'Selecciona una Experiencia', details: 'Detalles de tu Reserva', back_home: 'Volver al inicio',
      select_category: 'Selecciona una categoría', tours_only: 'Tours', special_title: 'Servicios Especiales',
      special_desc: 'Transporte a tu medida para Cenas, Campos de Golf y traslados de Hotel a Hotel.',
      back_categories: 'Volver a Categorías', select_hotel: 'Selecciona tu Hotel', search_hotel: 'Buscar hotel...', zone: 'Zona:',
      vehicle_type: 'Tipo de Vehículo', max_pax: 'Máx {n} pasajeros', arrival_date: 'Fecha de Llegada', pax: 'Pasajeros', return_date: 'Fecha de Regreso',
      tour_date: 'Fecha del Tour', pax_min: '(Mín. {n})', participants: 'Participantes', name: 'Nombre', age: 'Edad',
      summary: 'Resumen de Cotización', total: 'Subtotal del Servicio (USD)', includes_tax: 'Impuestos incluidos',
      back: 'Atrás', continue: 'Continuar', choose_another: 'Elegir otro tour', includes: '¿Qué incluye?', duration: 'Duración Estimada', reqs: 'Requisitos',
      book_spot: 'Reserva tu lugar', special_note: 'Nota: Mínimo {n} personas. Revisa políticas especiales.',
      extras_title: 'Opciones Adicionales', car_seat: 'Car Seat', baby_seat: 'Baby Seat', booster_seat: 'Booster Seat', free: 'Gratis',
      shopping_stop: 'Parada de Compras (Shopping Stop)', shopping_stop_desc: '1 hora en supermercado para compras.', shopping_added: 'Parada de Compras Añadida'
    },
    step3: {
      client_info: 'Información del Titular', names: 'Nombre(s)', lastnames: 'Apellidos', phone: 'Teléfono',
      flight_info: 'Información de Vuelos', arrival_flight: 'Vuelo de Llegada al Aeropuerto (SJD)', airline: 'Aerolínea', flight_num: 'No. de Vuelo', arrival_time: 'Hora de Aterrizaje',
      departure_flight: 'Vuelo de Salida (Regreso a casa)', departure_time: 'Hora de Despegue',
      pickup_note: 'Nota: El pick-up en su hotel será programado 3 horas antes de su vuelo.', review: 'Revisar Combo y Pagar'
    },
    step4: {
      confirm_title: 'Método de Pago y Confirmación', confirm_sub: 'Revisa tu combo completo, selecciona cómo deseas pagar y confirma.',
      holder: 'Titular de la Reserva', total_pay: 'Total a Pagar', pay_arrival: 'Reserva segura',
      service_details: 'Detalles del Combo', type: 'Servicio', destination: 'Destino',
      tour_selected: 'Tour', pax_qty: 'Pasajeros', vehicle_req: 'Vehículo', main_date: 'Fecha',
      modify: 'Modificar Datos', confirm_btn: 'Confirmar Reserva', payment_method: 'Selecciona un Método de Pago',
      cash: 'Pago en Efectivo', cash_desc: 'El pago se realiza directamente al chofer al momento del servicio.',
      paypal: 'Pago Seguro con PayPal', paypal_desc: 'Serás redirigido a PayPal para completar tu pago de forma segura.',
      pay_with_paypal: 'Pagar con PayPal', confirm_cash: 'Confirmar y Pagar al Llegar', processing: 'Procesando pago seguro...',
      extras: 'Extras', shopping: 'Parada de Compras'
    },
    step5: {
      success: '¡Tu Combo está Confirmado!', success_desc: 'Hemos enviado la confirmación a tu correo electrónico y notificado a la administración.',
      back_home: 'Volver al Inicio', email_to: 'Para:', subject: 'Asunto:', subject_text: 'Confirmación de Reserva - Ballard Tours',
      hello: '¡Hola', email_p1: 'Gracias por elegir', email_p2: 'para tu experiencia en Los Cabos. Tu reserva de combo está confirmada.',
      conf_num: 'Nº de Confirmación:', service: 'Servicios del Combo:',
      instructions: 'Instrucciones: Nuestro representante te estará esperando a tu llegada según los horarios establecidos. Si agregaste tours, por favor preséntate 10 minutos antes en el lobby.', help: 'Asistencia:',
      modify_res: 'Gestionar / Modificar Reserva', modify_desc: '¿Tus vuelos cambiaron o necesitas ajustar algo? Puedes modificar tu itinerario en cualquier momento antes de tu llegada.',
      admin_demo_title: '🛠️ Panel de Administración (Demo)',
      admin_btn: 'Aprobar Reserva y Notificar al Cliente',
      admin_subject_text: '¡Tu Reserva está Confirmada Oficialmente! - Ballard Tours',
      admin_email_p1: 'Nos complace informarte que la administración de Ballard Tours ha',
      admin_email_p2: 'revisado y aprobado oficialmente',
      admin_email_p3: 'tu itinerario. ¡Todo está listo para tu llegada a Los Cabos!',
      admin_approved_tag: 'RESERVA APROBADA'
    },
    summary: { vehicle: 'Vehículo:', zone: 'Zona:', extras: 'Extras:', shopping: 'Shopping Stop:', payment: 'Pago:' },
    services: { aeropuerto_hotel: 'Aeropuerto → Hotel', hotel_aeropuerto: 'Hotel → Aeropuerto', redondo: 'Viaje Redondo', tours: 'Tours / Especiales' }
  },
  en: {
    nav: { home: 'Home', zones: 'Rates & Zones', tours: 'Experiences' },
    auth: { login_title: 'Login', register_title: 'Create Account', email: 'Email Address', pass: 'Password', name: 'Full Name', login_btn: 'Sign In', register_btn: 'Register', no_account: 'No account?', has_account: 'Already have an account?', logout: 'Logout', agency_badge: 'AGENCY', agency_discount: 'Agency Discount (20%)' },
    steps: ['Service', 'Details', 'Information', 'Confirmation'],
    hero: { title: 'Premium Experiences in Los Cabos', subtitle: 'Private luxury transportation and unforgettable tours with the best guaranteed service.' },
    cart: {
      title: 'My Combo',
      empty: 'Your combo is empty. Add some services!',
      add: 'Add to my combo',
      added: 'Added to combo!',
      remove: 'Remove',
      checkout: 'Proceed to Checkout',
      continue_shopping: 'Keep building my combo',
      total: 'Combo Total',
      build: 'Build your Combo'
    },
    step1: {
      title: 'Book Your Transportation', subtitle: 'Select the type of service to start your secure and fast booking.',
      a2h: 'Airport → Hotel', a2h_desc: 'We welcome you upon arrival and take you straight to your resort.',
      h2a: 'Hotel → Airport', h2a_desc: 'Arrive on time and stress-free for your flight back home.',
      rt: 'Round Trip', rt_desc: 'The smartest choice. We cover both your arrival and departure.',
      tours: 'Tours & Special Services', tours_desc: 'Explore Los Cabos with our top-tier guided expeditions.',
      book: 'Book Now', catalog: 'View Catalog', featured_title: 'Unforgettable Experiences', featured_sub: 'Select a tour to view details and book instantly.',
      price_from: 'Price from', directory_title: 'Zones & Rates Directory', search_placeholder: 'Type your hotel name...',
      hotels_in_zone: 'Hotels in this zone', not_found: 'No hotels found.'
    },
    step2: {
      select_exp: 'Select an Experience', details: 'Booking Details', back_home: 'Back to start',
      select_category: 'Select a category', tours_only: 'Tours', special_title: 'Special Services',
      special_desc: 'Tailored transportation for Dinners, Golf Courses, and Hotel-to-Hotel transfers.',
      back_categories: 'Back to categories', select_hotel: 'Select your Hotel', search_hotel: 'Search hotel...', zone: 'Zone:',
      vehicle_type: 'Vehicle Type', max_pax: 'Max {n} passengers', arrival_date: 'Arrival Date', pax: 'Passengers', return_date: 'Return Date',
      tour_date: 'Tour Date', pax_min: '(Min. {n})', participants: 'Participants', name: 'First Name', age: 'Age',
      summary: 'Quote Summary', total: 'Service Subtotal (USD)', includes_tax: 'Taxes included',
      back: 'Back', continue: 'Continue', choose_another: 'Choose another tour', includes: 'What is included?', duration: 'Estimated Duration', reqs: 'Requirements',
      book_spot: 'Reserve your spot', special_note: 'Note: Minimum {n} people. Please review special policies.',
      extras_title: 'Extra Options', car_seat: 'Car Seat', baby_seat: 'Baby Seat', booster_seat: 'Booster Seat', free: 'Free',
      shopping_stop: 'Shopping Stop', shopping_stop_desc: '1 hour stop at a supermarket.', shopping_added: 'Shopping Stop Added'
    },
    step3: {
      client_info: 'Cardholder Information', names: 'First Name(s)', lastnames: 'Last Name', phone: 'Phone Number',
      flight_info: 'Flight Information', arrival_flight: 'Arrival Flight at Airport (SJD)', airline: 'Airline', flight_num: 'Flight No.', arrival_time: 'Landing Time',
      departure_flight: 'Departure Flight (Return home)', departure_time: 'Takeoff Time',
      pickup_note: 'Note: Pick-up at your hotel will be scheduled 3 hours before your flight.', review: 'Review Combo & Pay'
    },
    step4: {
      confirm_title: 'Payment & Confirmation', confirm_sub: 'Review your full combo, select how you want to pay and confirm.',
      holder: 'Reservation Holder', total_pay: 'Total to Pay', pay_arrival: 'Secure booking',
      service_details: 'Combo Details', type: 'Service', destination: 'Destination',
      tour_selected: 'Tour', pax_qty: 'Passengers', vehicle_req: 'Vehicle', main_date: 'Date',
      modify: 'Modify Data', confirm_btn: 'Confirm Booking', payment_method: 'Select a Payment Method',
      cash: 'Pay with Cash', cash_desc: 'Payment is made directly to the driver at the time of service.',
      paypal: 'Secure Payment via PayPal', paypal_desc: 'You will be redirected securely to PayPal to complete your payment.',
      pay_with_paypal: 'Pay with PayPal', confirm_cash: 'Confirm & Pay on Arrival', processing: 'Processing secure payment...',
      extras: 'Extras', shopping: 'Shopping Stop'
    },
    step5: {
      success: 'Combo Booking Successful!', success_desc: 'We have sent the confirmation to your email and notified our administration.',
      back_home: 'Back to Home', email_to: 'To:', subject: 'Subject:', subject_text: 'Combo Booking Confirmation - Ballard Tours',
      hello: 'Hello', email_p1: 'Thank you for choosing', email_p2: 'for your Los Cabos experience. Your combo booking is confirmed.',
      conf_num: 'Confirmation Nº:', service: 'Combo Services:',
      instructions: 'Instructions: Our representative will be waiting for you upon arrival according to schedules. If it is a tour, please be at your hotel lobby 10 minutes prior.', help: 'Assistance:',
      modify_res: 'Manage / Modify Reservation', modify_desc: 'Did your flights change or do you need to adjust something? You can modify your itinerary anytime before your arrival.',
      admin_demo_title: '🛠️ Administration Panel (Demo)',
      admin_btn: 'Approve Booking & Notify Client',
      admin_subject_text: 'Your Booking is Officially Confirmed! - Ballard Tours',
      admin_email_p1: 'We are pleased to inform you that Ballard Tours administration has',
      admin_email_p2: 'officially reviewed and approved',
      admin_email_p3: 'your itinerary. Everything is set for your arrival in Los Cabos!',
      admin_approved_tag: 'BOOKING APPROVED'
    },
    summary: { vehicle: 'Vehicle:', zone: 'Zone:', extras: 'Extras:', shopping: 'Shopping Stop:', payment: 'Payment:' },
    services: { aeropuerto_hotel: 'Airport → Hotel', hotel_aeropuerto: 'Hotel → Airport', redondo: 'Round Trip', tours: 'Tours / Specials' }
  }
};