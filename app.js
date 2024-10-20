const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

// Flujo secundario personalizado para servicios adicionales de sitios web básicos
const flowSitiosBasicosSecundario = addKeyword(['1', 'detalles', 'info', 'más info', 'extra', 'información extra'])
    .addAnswer([
        '📋 Nuestros sitios web básicos incluyen:',
        '- Hasta 2 páginas estáticas (inicio, contacto, servicios).',
        '- Tiempo de entrega: 5 días hábiles.',
        '- Soporte básico para cambios menores.',
        '\nEscribe *2* si deseas más detalles sobre sitios avanzados o *cotización* si deseas contratar.',
    ]);

// Flujo para sitios web básicos
const flowSitiosBasicos = addKeyword(['1', 'basico', '1800', 'sitio basico'])
    .addAnswer([
        '🌐 Nuestros sitios web básicos incluyen SEO básico y diseño responsivo.',
        'Precio: *$1,800 MXN*.',
        '\nEscribe *detalles* para más información sobre este servicio, o *cotización* si deseas contratar.',
    ], null, null, [flowSitiosBasicosSecundario]);

// Flujo secundario para sitios web avanzados
const flowSitiosAvanzadosSecundario = addKeyword(['2', 'avanzado', 'mas detalles', 'características avanzadas', 'más info'])
    .addAnswer([
        '📋 *Características de Nuestros Sitios Web Avanzados*:',
        '',
        '🔹 *Diseño Personalizado*: Hasta 6 páginas completamente personalizadas que reflejan la esencia de tu marca.',
        '🔹 *Integración con Redes Sociales*: Aumenta tu visibilidad con integración de OpenGraph y botones de compartir en tus redes sociales.',
        '🔹 *Animaciones Modernas*: Añade un toque dinámico y atractivo a tu sitio con animaciones modernas que capturan la atención de tus visitantes.',
        '🔹 *Entrega Rápida*: Tu sitio estará listo en *solo 10 días hábiles*, para que puedas comenzar a captar clientes rápidamente.',
        '',
        '💬 *¿Listo para dar el siguiente paso?* Escribe *3* si quieres información sobre nuestros sitios con backend. ¡Estamos aquí para ayudarte a llevar tu negocio al siguiente nivel!',
    ]);

// Flujo para sitios web avanzados
const flowSitiosAvanzados = addKeyword(['2', 'avanzado', 'sitio avanzado', '6475'])
    .addAnswer([
        '🌐 *Desarrollo de Sitios Web Avanzados*:',
        '',
        'Te ofrecemos un sitio web profesional que no solo destaca por su diseño atractivo, sino que también está optimizado para SEO, garantizando una mejor visibilidad en los motores de búsqueda.',
        '',
        '💎 *¿Por qué elegir nuestro servicio?*',
        '✔️ *Diseño Personalizado*: Creamos un sitio que refleja la identidad de tu marca, alineado con las últimas tendencias y necesidades del mercado.',
        '✔️ *Optimización SEO Integral*: Aumenta tu tráfico web con técnicas de SEO que mejoran tu posicionamiento y atraen más visitantes interesados en tus productos o servicios.',
        '✔️ *Soporte Técnico Incluido*: No estarás solo. Te brindamos apoyo continuo para garantizar que tu sitio funcione de manera óptima en todo momento.',
        '',
        '💰 *Precio*: A partir de *$6,475 MXN*, una inversión que potenciará tu presencia online y atraerá a más clientes.',
        '',
        '🤔 *Escribe* *mas detalles* para conocer más sobre nuestros servicios, o *cotización* si estás listo para contratar y dar el siguiente paso hacia el éxito digital. ¡Estamos aquí para ayudarte a brillar!',
    ], null, null, [flowSitiosAvanzadosSecundario]);

// Flujo secundario para sitios web con backend
const flowSitiosBackendSecundario = addKeyword(['3', 'plataformas integradas', 'integraciones', 'más info backend'])
    .addAnswer([
        '🔗 Nuestros sitios con backend incluyen integraciones como:',
        '- Amazon, Shopify, MercadoLibre.',
        '- Sistemas de pago (PayPal, Stripe).',
        '- Gestión automática de inventarios y ventas.',
        '\nEscribe *cotización* si deseas contratar o recibir más información.',
    ]);

// Flujo para sitios web con backend y e-commerce
const flowSitiosBackend = addKeyword(['3', 'backend', 'e-commerce', 'sitio backend', '15000'])
    .addAnswer([
        '🛒 *Desarrollo de Sitios Web con Backend Avanzado y E-commerce*:',
        '',
        'Ofrecemos soluciones integrales para sitios web con backend robusto, diseñados para optimizar la experiencia de tus usuarios y potenciar tu negocio digital. Si buscas una plataforma de e-commerce eficiente y escalable, nuestro equipo está listo para crearla a medida.',
        '',
        '💡 *¿Qué incluye nuestro servicio?*',
        '✔️ Desarrollo personalizado de la plataforma backend, adaptado a tus necesidades específicas.',
        '✔️ Funcionalidades avanzadas de e-commerce: gestión de productos, pagos seguros, carrito de compras, y más.',
        '✔️ Integraciones con sistemas de CRM, ERP, y otras herramientas empresariales clave para optimizar tus procesos internos.',
        '',
        '💰 *Precio*: A partir de *$15,000 MXN*, dependiendo de los requerimientos y la complejidad del proyecto.',
        '',
        'Escribe *plataformas integradas* para conocer las soluciones compatibles que podemos implementar, cómo podemos llevar tu negocio al siguiente nivel.',
    ], null, null, [flowSitiosBackendSecundario]);

// Flujo secundario para SEO
const flowSEOSecundario = addKeyword(['4', 'estrategias', 'mas detalles', 'más info SEO'])
    .addAnswer([
        '💖 *Queremos lo mejor para ti y tu negocio* 💖',
        '',
        'Sabemos lo importante que es para ti que tu página web alcance su máximo potencial. Por eso, nuestras estrategias de SEO están diseñadas para brindarte los mejores resultados, paso a paso.',
        '',
        '🔍 *Nuestras estrategias SEO incluyen*: ',
        '🌟 *Auditoría completa de tu sitio*: Analizamos todos los aspectos clave para asegurarnos de que cada detalle esté optimizado.',
        '🌟 *Optimización On-Page y Off-Page*: Te ayudamos a mejorar no solo el contenido dentro de tu sitio, sino también la autoridad que necesitas fuera de él.',
        '🌟 *Monitoreo y Ajustes Continuos*: No nos detenemos; mes a mes, ajustamos y mejoramos para que tu visibilidad siga creciendo.',
        '',
        '✨ *Imagínate apareciendo entre los primeros resultados de Google y recibiendo más visitas cada día.* ¡Sabemos que lo mereces y queremos ayudarte a llegar allí!',
        '',
        '🤗 *Escribe* *cotización* si estás listo para dar el siguiente paso hacia el éxito. ¡Estamos aquí para acompañarte en cada momento!',
    ]);

// Flujo para posicionamiento web (SEO)
const flowSEO = addKeyword(['4', 'seo', 'posicionamiento'])
    .addAnswer([
        '🔍 *Servicios de SEO Profesional*:',
        '',
        'El SEO (Search Engine Optimization) es esencial para mejorar la visibilidad de tu sitio web en los principales motores de búsqueda como Google, Bing y Yahoo, lo que te ayudará a atraer más tráfico orgánico y aumentar las oportunidades de ventas.',
        '',
        '🌟 *¿Qué incluye nuestro servicio de SEO?*',
        '1️⃣ *Optimización On-Page*: Mejora de contenido, velocidad de carga, optimización de etiquetas y estructura del sitio para cumplir con las mejores prácticas de SEO.',
        '2️⃣ *SEO Off-Page*: Generación de backlinks de calidad, estrategias de link building y gestión de reputación online.',
        '3️⃣ *SEO Técnico*: Optimización avanzada de la arquitectura del sitio, mapas XML, análisis de errores y configuración para garantizar un rastreo e indexación efectivos.',
        '4️⃣ *Investigación de Palabras Clave*: Análisis y selección de las mejores palabras clave para posicionar tu sitio en las búsquedas más relevantes de tu sector.',
        '',
        '💼 **Planes de SEO A Partir de:**',
        '🔸 *Plan Básico*: $200 USD/mes - Optimización básica de hasta 5 páginas con recomendaciones mensuales.',
        '🔸 *Plan Intermedio*: $400 USD/mes - Estrategia avanzada con optimización continua de hasta 10 páginas y reportes mensuales.',
        '🔸 *Plan Avanzado*: $800 USD/mes - Optimización completa del sitio, análisis competitivo y gestión de backlinks, con reportes detallados y soporte continuo.',
        '',
        'Escribe *estrategias* para conocer más detalles sobre nuestras técnicas SEO, o *cotización* para recibir una propuesta personalizada para tu negocio.',
    ], null, null, [flowSEOSecundario]);

// Flujo secundario para marketing y redes sociales
const flowMarketingSecundario = addKeyword(['5', 'estrategias sociales', 'detalles marketing', 'más info marketing'])
    .addAnswer([
        '📱 *Servicios de Marketing Digital*: Ofrecemos soluciones personalizadas para mejorar la presencia de tu negocio en redes sociales:',
        '',
        '🔹 *Campañas Publicitarias*: Creación y gestión de anuncios en Facebook, Instagram y Google Ads, orientadas a generar más leads y ventas.',
        '🔹 *Optimización de Perfiles*: Mejora de la estética, contenido y configuración de tus perfiles en redes sociales para captar la atención de tu audiencia.',
        '🔹 *Automatización de Publicaciones*: Publicaciones programadas para mantener una comunicación constante con tus seguidores, sin esfuerzo manual.',
        '',
        '💼 **Precios A Partir de:**',
        '🔸 *Plan Básico*: $150 USD/mes - Gestión de una red social con contenido básico y publicidad ligera.',
        '🔸 *Plan Intermedio*: $300 USD/mes - Optimización completa de dos redes sociales con campañas publicitarias personalizadas.',
        '🔸 *Plan Avanzado*: $500 USD/mes - Estrategia integral en varias plataformas con análisis detallado de resultados y automatización.',
        '',
        'Escribe *cotización* para obtener más detalles y una propuesta personalizada para tu negocio.',
    ]);

// Flujo para marketing digital y control de redes sociales
const flowMarketing = addKeyword(['5', 'marketing', 'redes sociales', 'facebook', 'instagram', 'whatsapp', 'discord', 'telegram'])
    .addAnswer([
        '📱 *Estrategias de Marketing Digital y Gestión de Redes Sociales*',
        '',
        'En un mundo cada vez más digital, es esencial contar con una estrategia sólida de marketing en redes sociales. Nuestro equipo de expertos te ayudará a gestionar y optimizar tu presencia en las principales plataformas sociales, brindándote un servicio integral adaptado a las necesidades de tu negocio. Ofrecemos manejo completo para las siguientes plataformas:',
        '',
        '🔹 *Facebook*: Gestión de contenido, campañas publicitarias, interacción con la audiencia y análisis de métricas para maximizar tu alcance.',
        '🔹 *Instagram*: Estrategias visuales efectivas, creación de contenido atractivo, gestión de historias, reels y publicidad para aumentar la visibilidad de tu marca.',
        '🔹 *WhatsApp Business*: Automatización de mensajes, creación de catálogos de productos y atención al cliente personalizada para mantener una comunicación fluida y directa con tus clientes.',
        '🔹 *Discord*: Gestión de servidores para comunidades, con creación de canales temáticos y estrategias de interacción para mejorar el engagement y la fidelización de tus usuarios.',
        '🔹 *Telegram*: Automatización y creación de canales o grupos, ideal para negocios que buscan difundir información o promociones de manera rápida y directa.',
        '',
        '✨ **¿Qué Incluye Nuestro Servicio de Marketing Digital?**',
        '1️⃣ *Estrategia Personalizada*: Analizamos tu mercado y competencia para desarrollar una estrategia única que impulse tu negocio en redes sociales.',
        '2️⃣ *Gestión de Contenido*: Nos encargamos de la creación, programación y publicación de contenido relevante y atractivo para captar la atención de tu audiencia.',
        '3️⃣ *Análisis de Resultados*: Medimos el impacto de nuestras acciones mediante métricas clave como el engagement, el alcance y el retorno de inversión (ROI), optimizando cada paso del proceso.',
        '4️⃣ *Campañas Publicitarias*: Creamos campañas publicitarias en redes sociales para generar leads y aumentar las ventas, ajustando el presupuesto a tus necesidades y objetivos.',
        '5️⃣ *Automatización y Bots*: Si deseas optimizar tu atención al cliente, implementamos bots personalizados para responder a preguntas frecuentes, gestionar consultas y aumentar la satisfacción del cliente.',
        '',
        '💼 **Planes y Precios**:',
        'Contamos con distintos planes de marketing según el tamaño y las necesidades de tu negocio:',
        '🔹 *Plan Básico*: Ideal para pequeñas empresas que buscan establecer su presencia digital inicial.',
        '🔹 *Plan Intermedio*: Incluye estrategias de crecimiento y campañas publicitarias para aumentar tu visibilidad y engagement.',
        '🔹 *Plan Avanzado*: Gestión integral de redes sociales, publicidad y automatización para empresas que desean un enfoque completo y profesional.',
        '',
        'Escribe *"Estrategias Sociales"* para obtener más detalles sobre cómo podemos ayudar a tu negocio a crecer en redes sociales, o *"Cotización"* para recibir una oferta personalizada.',
    ], null, null, [flowMarketingSecundario]);

// Flujo secundario para bots y automatización
const flowBotsSecundario = addKeyword(['6', 'tipos de bots', 'automatización avanzada', 'más info bots'])
    .addAnswer([
        '🤖 Ofrecemos bots para:',
        '- Atención al cliente automática.',
        '- Manejo de ventas.',
        '- Integración con CRM y sistemas externos.',
        '\nEscribe *cotización* si deseas más información.',
    ]);

// Flujo para creación de bots y sistemas automatizados
const flowBots = addKeyword(['6', 'bots', 'automatización', 'crm'])
    .addAnswer([
        '🤖 *Automatiza tu negocio con nuestros Bots Personalizados para Redes Sociales*',
        '',
        'Ofrecemos una amplia variedad de bots diseñados para mejorar la interacción con tus clientes y aumentar la eficiencia de tu negocio. Nuestros bots están disponibles para las siguientes plataformas:',
        '',
        '🔹 *Facebook Messenger*',
        '🔹 *WhatsApp*',
        '🔹 *Telegram*',
        '🔹 *Discord*',
        '🔹 *Instagram*',
        '',
        '✨ **Tipos de Bots que ofrecemos:**',
        '1️⃣ *Bots de Atención al Cliente*: Responden automáticamente a preguntas frecuentes y guían a los usuarios.',
        '2️⃣ *Bots de Ventas*: Automatizan el proceso de ventas, ayudando a gestionar pedidos y pagos.',
        '3️⃣ *Bots de CRM*: Integración completa con CRM para gestionar y rastrear interacciones con clientes.',
        '4️⃣ *Bots de Reservas*: Gestionan automáticamente reservas de citas o servicios.',
        '5️⃣ *Bots Multicanal*: Funcionalidad cruzada en varias plataformas para un control centralizado.',
        '',
        '💼 **Planes y Precios**:',
        'Contamos con varios tipos de precios según las necesidades de tu negocio:',
        '🔹 *Plan Básico*: Ideal para pequeñas empresas que buscan automatización inicial en una sola plataforma.',
        '🔹 *Plan Avanzado*: Incluye automatización en múltiples plataformas, ideal para empresas medianas.',
        '🔹 *Plan Corporativo*: Automatización avanzada con integración CRM y funcionalidades personalizadas para grandes empresas.',
        '',
        'Escribe *"Tipos de Bots"* para más detalles sobre cada tipo de bot, o *"Cotización"* para recibir una oferta personalizada de acuerdo a tus necesidades.',
    ], null, null, [flowBotsSecundario]);

// Flujo para cotización de servicios
const flowCotizacion = addKeyword(['cotización', 'precio', 'costos', 'presupuesto', 'valor', 'tarifa', 'cuánto cuesta', 'cuanto sale', 'valoración', 'detalles de precio', 'tarifas', 'valor estimado', 'qué precios manejan', 'cuáles son sus precios', 'quiero saber sus precios', 'cuánto me cuesta', 'precios actualizados', 'me interesa el costo', 'presupuesto estimado', 'necesito cotización', 'solicitar precio', 'quiero saber el costo', '¿cuánto es?', 'precio final', 'tarifas actuales'])
    .addAnswer([
        '📝 Por favor, indícanos qué servicio te interesa recibir:',
        '👉 *1* para un sitio web básico.',
        '👉 *2* para un sitio web con características avanzadas.',
        '👉 *3* para un sitio con backend y e-commerce.',
        '👉 *4* para posicionamiento en buscadores (SEO).',
        '👉 *5* para marketing digital y redes sociales.',
        '👉 *6* para automatización y bots.',
        '\nRecibirás una cotización detallada según el servicio seleccionado.',
    ])
    .addAnswer('🔔 Si necesitas más información, vuelve al menú principal escribiendo *Menú*. ¡Gracias por tu interés!')
    .addAnswer('Escribe el número del servicio que te interese.', null, null, [
        flowSitiosBasicos,
        flowSitiosAvanzados,
        flowSitiosBackend,
        flowSEO,
        flowMarketing,
        flowBots,
    ]);

// Flujo principal con saludos extendidos y simplificación de palabras clave
const flowPrincipal = addKeyword([
    'hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'alo', 'hey', 'holi', 'holis', 
    'que tal', 'saludos', 'buenas', 'hello', 'hi', 'qué onda', 'qué pasa', 'cómo estás',
    'buen día', 'qué tal', 'saludos', 'un saludo', 'qué hay', 'hola qué tal', 'holaaaa',
    'holaaa', 'holaa', 'menu', 'menú', 'buenas noches', 'saludos cordiales'
])
.addAnswer('🙌 ¡Hola! Bienvenido a *Level Up Tijuana*. Aquí te ayudaremos a mejorar tu presencia digital.')
.addAnswer([
    'Ofrecemos los siguientes servicios:',
    '👉 *1* para sitios web básicos.',
    '👉 *2* para sitios web avanzados.',
    '👉 *3* para sitios con backend y e-commerce.',
    '👉 *4* para SEO (posicionamiento en Google).',
    '👉 *5* para marketing digital y redes sociales.',
    '👉 *6* para bots y automatización.',
    '\nEscribe el número del servicio que te interese.',
], null, null, [
    flowSitiosBasicos,
    flowSitiosAvanzados,
    flowSitiosBackend,
    flowSEO,
    flowMarketing,
    flowBots,
    flowCotizacion,
]);

// Función principal que inicializa el bot
const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal, flowCotizacion]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb(); // Genera el código QR para conectar a WhatsApp Web
};

main();
