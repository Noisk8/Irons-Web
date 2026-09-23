export type DemoProduct = {
  id: string; slug: string; name: string; category: string; categorySlug: string;
  description: string; price: number; compareAtPrice?: number; image: string;
  material: string; finish: string; color: string; dimensions: string; usage: string;
  productionTime: string; stock: number; customizable: boolean; requiresQuote: boolean; featured?: boolean;
  type?: string; design?: string; sheetThickness?: string; installedDepth?: string;
  lighting?: string; colorTemperature?: string; power?: string; control?: string; installation?: string;
  lightingOptions?: string[]; customizations?: string[]; recommendedUses?: string[]; care?: string;
  imageOrientation?: 'portrait' | 'landscape';
};

export const products: DemoProduct[] = [
  { id:'p1', slug:'repisa-dispensadora-mural', name:'Repisa dispensadora mural', category:'Muebles y soportes', categorySlug:'muebles-soportes', description:'Repisa metálica de líneas limpias para organizar dispensadores y accesorios en baños contemporáneos.', price:185000, compareAtPrice:220000, image:'/productos/repisa-dispensadora-mural.png', material:'Acero', finish:'Pintura electrostática', color:'Negro mate', dimensions:'45 × 12 × 10 cm', usage:'Interior', productionTime:'5 a 8 días hábiles', stock:12, customizable:true, requiresQuote:false, featured:true },
  { id:'p2', slug:'panel-arbol-de-luz', name:'Panel decorativo Árbol de Luz', category:'Decoración interior', categorySlug:'decoracion-interior', description:'Panel calado con silueta orgánica y retroiluminación cálida para crear un punto focal sereno.', price:0, image:'/productos/panel-decorativo-arbol-de-luz.png', material:'Acero', finish:'Negro mate', color:'Negro y luz cálida', dimensions:'A medida', usage:'Interior', productionTime:'15 a 25 días hábiles', stock:0, customizable:true, requiresQuote:true, featured:true },
  { id:'p3', slug:'lampara-mural-geometrica', name:'Lámpara mural geométrica', category:'Iluminación', categorySlug:'iluminacion', description:'Aplique escultórico de geometría precisa que proyecta una luz ambiental cálida.', price:350000, image:'/productos/lampara-mural-geometrica.png', material:'Acero', finish:'Pintura electrostática', color:'Negro', dimensions:'32 × 28 × 12 cm', usage:'Interior', productionTime:'8 a 12 días hábiles', stock:7, customizable:true, requiresQuote:false, featured:true },
  { id:'p4', slug:'mesa-auxiliar-vinyl-stand', name:'Mesa auxiliar Vinyl Stand', category:'Muebles y soportes', categorySlug:'muebles-soportes', description:'Mesa auxiliar con espacio para discos, concebida para rincones de música y lectura.', price:490000, image:'/productos/mesa-auxiliar-vinyl-stand.png', material:'Acero y madera', finish:'Negro mate', color:'Negro y madera natural', dimensions:'55 × 40 × 65 cm', usage:'Interior', productionTime:'12 a 18 días hábiles', stock:3, customizable:true, requiresQuote:false },
  { id:'p5', slug:'organizador-jardin', name:'Organizador mural para jardín', category:'Decoración exterior', categorySlug:'decoracion-exterior', description:'Sistema mural resistente para mantener herramientas de jardín ordenadas y visibles.', price:245000, image:'/productos/organizador-mural-jardin.png', material:'Acero galvanizado', finish:'Pintura para exterior', color:'Negro', dimensions:'80 × 35 × 12 cm', usage:'Exterior', productionTime:'8 a 12 días hábiles', stock:5, customizable:true, requiresQuote:false },
  { id:'p6', slug:'soporte-mural-toallas', name:'Soporte mural para toallas', category:'Accesorios', categorySlug:'accesorios', description:'Soporte minimalista para baño, fabricado localmente y terminado a mano.', price:125000, image:'/productos/soporte-mural-toallas.png', material:'Acero', finish:'Pintura electrostática', color:'Negro mate', dimensions:'60 × 8 × 6 cm', usage:'Interior', productionTime:'4 a 6 días hábiles', stock:18, customizable:false, requiresQuote:false, featured:true },
  {
    id: 'p7', slug: 'panel-luz-de-hoja', name: 'Panel Botánico Luz de Hoja', category: 'Paneles', categorySlug: 'paneles',
    description: 'Panel decorativo de acero cortado con láser y retroiluminación LED cálida. Su diseño botánico aporta profundidad, textura y una atmósfera acogedora a cualquier espacio.',
    price: 0, image: '/productos/panel-luz-de-hoja.png', material: 'Acero o hierro laminado', finish: 'Pintura electrostática negro mate', color: 'Negro mate',
    dimensions: '80 × 180 cm', usage: 'Interior; exterior bajo especificación técnica', productionTime: 'Fabricación bajo pedido', stock: 0, customizable: true, requiresQuote: true, featured: true,
    type: 'Panel decorativo mural retroiluminado', design: 'Hojas y ramas orgánicas', sheetThickness: '1,5 a 3 mm', installedDepth: 'Aproximadamente 4 a 7 cm',
    lighting: 'LED posterior', colorTemperature: '2700 K, luz cálida', power: '110–120 V o adaptador según instalación', control: 'Interruptor, dimmer o sistema inteligente opcional', installation: 'Sistema de anclaje mural incluido o disponible',
    lightingOptions: ['2700 K — cálida y acogedora para dormitorios, salas y restaurantes.', '3000 K — cálida neutra para espacios residenciales y hoteles.', '4000 K — blanca neutra para oficinas, recibidores y comercios.', 'RGB o RGBW — opción especial para proyectos comerciales y ambientes variables.'],
    customizations: ['Dimensiones: 60 × 120 cm, 100 × 200 cm o fabricación a medida.', 'Adaptación del patrón con hojas, árboles, ramas, flores o formas abstractas.', 'Inclusión de logotipo.', 'Colores negro, blanco, dorado, bronce o acabado oxidado.', 'Luz cálida, neutra, fría, RGB o RGBW.', 'Interruptor, dimmer o control inteligente.'],
    recommendedUses: ['Sala', 'Recibidor', 'Cabecera de cama', 'Restaurante', 'Hotel', 'Oficina', 'Lobby', 'Terraza cubierta', 'Tienda o espacio comercial'],
    care: 'Limpiar con un paño suave y seco. No utilizar productos abrasivos ni exponer directamente a humedad permanente si el panel no cuenta con protección anticorrosiva para exteriores.',
  },
  {
    id: 'p8', slug: 'panel-geometrico-arco', name: 'Panel Geométrico Arco', category: 'Paneles', categorySlug: 'paneles',
    description: 'Panel decorativo de acero cortado con láser, inspirado en la geometría Art Déco y equipado con iluminación LED posterior. Una pieza arquitectónica para transformar paredes interiores.',
    price: 0, image: '/productos/panel-geometrico-arco.png', material: 'Acero o hierro laminado', finish: 'Pintura electrostática negro mate', color: 'Negro mate',
    dimensions: '80 × 180 cm', usage: 'Interior; exterior bajo especificación técnica', productionTime: 'Fabricación bajo pedido', stock: 0, customizable: true, requiresQuote: true, featured: true,
    type: 'Panel decorativo mural retroiluminado', design: 'Geométrico Art Déco', sheetThickness: '1,5 a 3 mm', installedDepth: 'Aproximadamente 4 a 7 cm',
    lighting: 'LED posterior', colorTemperature: '4000 K, luz blanca neutra', power: '110–120 V o adaptador según instalación', control: 'Interruptor, dimmer o sistema inteligente opcional', installation: 'Sistema de anclaje mural',
    lightingOptions: ['2700 K — ambiente cálido y elegante.', '3000 K — cálida neutra para hogares y hoteles.', '4000 K — luz blanca neutra, recomendada para este modelo.', '5000 K — luz fría para espacios comerciales o contemporáneos.', 'RGB o RGBW — opción especial para proyectos de ambientación.'],
    customizations: ['Modificación de las líneas y arcos.', 'Cambio de dimensiones y proporciones: 60 × 120 cm, 100 × 200 cm o medida especial.', 'Creación de diseños simétricos personalizados.', 'Adaptación a una pared específica.', 'Cambio de color del metal.', 'Luz cálida, neutra, fría, RGB o RGBW.', 'Inclusión de logotipo o patrón corporativo.', 'Sistema de regulación de intensidad.'],
    recommendedUses: ['Recibidor', 'Sala', 'Restaurante', 'Hotel', 'Oficina', 'Local comercial', 'Lobby', 'Pasillo', 'Cabecero decorativo'],
    care: 'Limpiar con un paño suave y seco. Evitar productos abrasivos y el contacto constante con humedad si el panel no está tratado para exteriores.',
  },
  {
    id: 'p9', slug: 'panel-ondas-flujo', name: 'Panel Ondas Flujo', category: 'Paneles', categorySlug: 'paneles',
    description: 'Panel decorativo de metal cortado con láser, inspirado en el movimiento del agua. Sus líneas fluidas y su luz LED fría crean una composición contemporánea y elegante.',
    price: 0, image: '/productos/panel-ondas-flujo.png', imageOrientation: 'landscape', material: 'Acero o hierro laminado', finish: 'Pintura electrostática negro mate', color: 'Negro mate',
    dimensions: '180 × 80 cm', usage: 'Interior; exterior bajo especificación técnica', productionTime: 'Fabricación bajo pedido', stock: 0, customizable: true, requiresQuote: true, featured: true,
    type: 'Panel decorativo mural retroiluminado', design: 'Ondas y líneas fluidas', sheetThickness: '1,5 a 3 mm', installedDepth: 'Aproximadamente 4 a 7 cm',
    lighting: 'LED posterior', colorTemperature: '5000 K, luz blanca fría', power: '110–120 V o adaptador según instalación', control: 'Interruptor, dimmer o sistema inteligente opcional', installation: 'Sistema de anclaje mural',
    lightingOptions: ['2700 K — efecto cálido y decorativo.', '3000 K — ambiente elegante y acogedor.', '4000 K — luz neutra para oficinas y comercios.', '5000 K — luz fría, limpia y contemporánea, recomendada para este modelo.', 'RGB o RGBW — opción para hoteles, bares y proyectos especiales.'],
    customizations: ['Ondas suaves o de movimiento más dinámico.', 'Líneas horizontales, diagonales o circulares.', 'Formas inspiradas en agua, viento o topografía.', 'Orientación horizontal o vertical.', 'Dimensiones: 120 × 60 cm, 200 × 100 cm o fabricación a medida.', 'Colores negro, blanco, dorado, bronce o acero natural.', 'Cambio de temperatura y regulación de intensidad de luz.', 'Integración de logotipo o patrón corporativo.'],
    recommendedUses: ['Sala', 'Oficina', 'Recepción', 'Hotel', 'Restaurante', 'Bar', 'Local comercial', 'Salón de eventos', 'Pasillo amplio', 'Proyecto arquitectónico'],
    care: 'Limpiar con un paño seco o ligeramente húmedo. No utilizar solventes ni productos abrasivos. Para instalaciones exteriores se recomienda protección anticorrosiva e iluminación con protección adecuada contra humedad.',
  },
  {
    id: 'p10', slug: 'panel-montanas-cumbre', name: 'Panel Montañas Cumbre', category: 'Paneles', categorySlug: 'paneles',
    description: 'Panel decorativo de metal cortado con láser, inspirado en la majestuosidad de las montañas y las líneas topográficas. Su iluminación cálida crea profundidad y una atmósfera envolvente.',
    price: 0, image: '/productos/panel-montanas-cumbre.png', imageOrientation: 'landscape', material: 'Acero o hierro laminado', finish: 'Pintura electrostática negro mate', color: 'Negro mate',
    dimensions: '180 × 80 cm', usage: 'Interior; exterior bajo especificación técnica', productionTime: 'Fabricación bajo pedido', stock: 0, customizable: true, requiresQuote: true, featured: true,
    type: 'Panel decorativo mural retroiluminado', design: 'Montañas y líneas topográficas', sheetThickness: '1,5 a 3 mm', installedDepth: 'Aproximadamente 4 a 7 cm',
    lighting: 'LED posterior', colorTemperature: '3500 K, luz cálida neutra', power: '110–120 V o adaptador según instalación', control: 'Interruptor, dimmer o sistema inteligente opcional', installation: 'Sistema de anclaje mural',
    lightingOptions: ['2700 K — ambiente cálido e íntimo.', '3000 K — iluminación cálida y elegante.', '3500 K — equilibrio entre calidez y claridad; opción recomendada.', '4000 K — luz neutra para oficinas y espacios comerciales.', 'RGB o RGBW — opción para proyectos especiales.'],
    customizations: ['Paisaje montañoso personalizado.', 'Silueta de una cordillera específica.', 'Inclusión de árboles, ríos, lagos o edificios.', 'Diseño basado en una fotografía o mapa topográfico.', 'Orientación horizontal o vertical.', 'Dimensiones: 120 × 60 cm, 200 × 100 cm o fabricación a medida.', 'Acabados negro, blanco, dorado, bronce o acero natural.', 'Regulación de intensidad luminosa.', 'Inclusión de logotipo o elemento corporativo.'],
    recommendedUses: ['Sala', 'Dormitorio', 'Estudio', 'Oficina', 'Hotel', 'Restaurante', 'Lobby', 'Casa campestre', 'Cabaña', 'Proyecto arquitectónico'],
    care: 'Limpiar con un paño suave y seco. No utilizar productos abrasivos. Para exteriores se recomienda protección anticorrosiva y componentes eléctricos adecuados para ambientes húmedos.',
  },
];

export const categories = ['Todos', 'Paneles', 'Decoración interior', 'Decoración exterior', 'Iluminación', 'Muebles y soportes', 'Accesorios'];
export const findProduct = (slug: string) => products.find((product) => product.slug === slug);
