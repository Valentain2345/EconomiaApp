export const brand = {
  name: 'Wavechat',
  tagline: 'Tu musica, sincronizada con tu gente',
  subtitle:
    'Crea salas, escucha al mismo tiempo y conversa como si estuvieran en la misma habitacion.',
  micro: 'Disponible en iOS y Android - Beta privada en junio',
};

export const navLinks = [
  { label: 'Producto', href: '#producto' },
  { label: 'Salas', href: '#salas' },
  { label: 'Chat', href: '#chat' },
  { label: 'FAQ', href: '#faq' },
];

export const stats = [
  { label: 'Personas en lista de espera', value: '2.8k' },
  { label: 'Salas activas por dia', value: '38' },
  { label: 'Promedio por sesion', value: '42 min' },
  { label: 'Mensajes por sala', value: '120+' },
];

export const features = [
  {
    title: 'Escucha sincronizada',
    description: 'Todos escuchan el mismo track sin desfase ni cortes.',
    icon: 'wave',
  },
  {
    title: 'Chat en tiempo real',
    description: 'Roles visibles, reacciones y respuestas instantaneas.',
    icon: 'chat',
  },
  {
    title: 'Playlists compartidas',
    description: 'La sala decide el orden. El host modera.',
    icon: 'playlist',
  },
  {
    title: 'Mini reproductor persistente',
    description: 'Nunca pierdes el ritmo mientras exploras.',
    icon: 'player',
  },
];

export const howItWorks = [
  {
    step: '01',
    title: 'Entra a una sala',
    description: 'Busca por genero, host o energia del momento.',
  },
  {
    step: '02',
    title: 'Conecta tu ritmo',
    description: 'La musica se sincroniza en segundos para todos.',
  },
  {
    step: '03',
    title: 'Habla y descubre',
    description: 'Chatea, reacciona y guarda salas favoritas.',
  },
];

export const rooms = [
  {
    name: 'Chill Vibes',
    host: 'DJ Luna',
    listeners: 24,
    genre: 'Lo-Fi',
    track: 'Snowman - Lofi Girl',
  },
  {
    name: 'Late Night Drive',
    host: 'WaveRider',
    listeners: 18,
    genre: 'Synthwave',
    track: 'Los Angeles - The Midnight',
  },
  {
    name: 'EDM Arena',
    host: 'BassKing',
    listeners: 56,
    genre: 'Electronic',
    track: 'High on Life - Martin Garrix',
  },
];

export const chatMessages = [
  {
    user: 'DJ Luna',
    text: 'Bienvenidos al set. Suban el volumen.',
    time: '10:01',
    role: 'host',
  },
  {
    user: 'You',
    text: 'Esta transicion esta perfecta.',
    time: '10:02',
    role: 'self',
  },
  {
    user: 'Nico',
    text: 'El groove esta increible hoy.',
    time: '10:03',
    role: 'guest',
  },
  {
    user: 'DJ Luna',
    text: 'Se viene un cambio de energia.',
    time: '10:04',
    role: 'host',
  },
];

export const testimonials = [
  {
    name: 'Camila R.',
    role: 'Product Designer',
    quote: 'Se siente como escuchar con amigos en vivo.',
  },
  {
    name: 'Nico M.',
    role: 'Music Curator',
    quote: 'La energia del chat hace que la sala cobre vida.',
  },
  {
    name: 'Vale P.',
    role: 'iOS Dev',
    quote: 'Interfaz limpia, oscura y muy fluida.',
  },
];

export const faqs = [
  {
    question: 'Necesito Spotify para usarlo?',
    answer: 'No. La sala reproduce desde el host y sincroniza a todos.',
  },
  {
    question: 'Las salas pueden ser privadas?',
    answer: 'Si, puedes crear salas publicas o privadas con invitacion.',
  },
  {
    question: 'Habra version web?',
    answer: 'Si, esta en el roadmap despues de la beta.',
  },
];

export const cta = {
  title: 'Se parte del primer release',
  description: 'Acceso anticipado para quienes se sumen hoy.',
  button: 'Reservar mi lugar',
};

export const footerLinks = [
  { label: 'Producto', href: '#producto' },
  { label: 'Comunidad', href: '#chat' },
  { label: 'Privacidad', href: '#faq' },
  { label: 'Contacto', href: 'mailto:hello@wavechat.app' },
];
