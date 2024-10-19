const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

// Flujo secundario personalizado para servicios adicionales de sitios web básicos
const flowSitiosBasicosSecundario = addKeyword(['1', 'detalles', 'info', 'más info', 'extra', 'información extra'])
    .addAnswer([
        '📋 Nuestros sitios web básicos incluyen:',
        '- Hasta 3 páginas estáticas (inicio, contacto, servicios).',
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
        '📋 Los sitios avanzados incluyen:',
        '- Hasta 6 páginas personalizadas.',
        '- Integración con redes sociales (OpenGraph, botones de compartir).',
        '- Animaciones modernas.',
        '- Tiempo de entrega: 10 días hábiles.',
        '\nEscribe *3* si deseas información sobre sitios con backend o *cotización* si deseas avanzar.',
    ]);

// Flujo para sitios web avanzados
const flowSitiosAvanzados = addKeyword(['2', 'avanzado', 'sitio avanzado', '6475'])
    .addAnswer([
        '🌐 Nuestros sitios avanzados incluyen un diseño profesional con SEO optimizado.',
        'Precio: *$6,475 MXN*.',
        '\nEscribe *mas detalles* para más información o *cotización* para contratar.',
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
        '🛒 Nuestros sitios con backend incluyen e-commerce avanzado.',
        'Precio: *$15,000 MXN en adelante*.',
        '\nEscribe *plataformas integradas* para ver las integraciones disponibles o *cotización* para contratar.',
    ], null, null, [flowSitiosBackendSecundario]);

// Flujo secundario para SEO
const flowSEOSecundario = addKeyword(['4', 'estrategias', 'mas detalles', 'más info SEO'])
    .addAnswer([
        '🔍 Nuestras estrategias SEO incluyen:',
        '- Auditoría del sitio web actual.',
        '- Optimización on-page y off-page.',
        '- Monitoreo de resultados y ajustes mensuales.',
        '\nEscribe *cotización* si deseas avanzar.',
    ]);

// Flujo para posicionamiento web (SEO)
const flowSEO = addKeyword(['4', 'seo', 'posicionamiento'])
    .addAnswer([
        '🔍 El SEO mejora la visibilidad de tu página en buscadores.',
        '\nEscribe *estrategias* para más detalles o *cotización* para contratar.',
    ], null, null, [flowSEOSecundario]);

// Flujo secundario para marketing y redes sociales
const flowMarketingSecundario = addKeyword(['5', 'estrategias sociales', 'detalles marketing', 'más info marketing'])
    .addAnswer([
        '📱 Ofrecemos servicios de marketing como:',
        '- Creación de campañas publicitarias en Facebook y Google.',
        '- Optimización de perfiles sociales.',
        '- Automatización de publicaciones.',
        '\nEscribe *cotización* para recibir más detalles sobre estos servicios.',
    ]);

// Flujo para marketing digital y control de redes sociales
const flowMarketing = addKeyword(['5', 'marketing', 'redes sociales', 'facebook', 'instagram', 'whatsapp', 'discord', 'telegram'])
    .addAnswer([
        '📱 Ofrecemos manejo completo de redes sociales y marketing digital.',
        '\nEscribe *estrategias sociales* para más detalles o *cotización* para contratar.',
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
        '🤖 Ofrecemos bots personalizados para redes sociales.',
        '\nEscribe *tipos de bots* para más detalles o *cotización* para contratar.',
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
