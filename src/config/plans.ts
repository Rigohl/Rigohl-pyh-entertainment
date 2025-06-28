
export type Plan = {
  value: 'creator' | 'artist' | 'master';
  label: string;
  price: number;
  features: string[];
  isRecommended?: boolean;
};

export type SongTypeConfig = {
  emotional: Plan[];
  corrido: Plan[];
};

export const planDetails: SongTypeConfig = {
  emotional: [
    {
      value: 'creator',
      label: 'Creador',
      price: 199,
      features: [
        'Canción completa y emotiva',
        'Letra 100% personalizada',
        '1 Revisión de letra incluida',
        'Calidad profesional MP3',
      ],
    },
    {
      value: 'artist',
      label: 'Artista',
      price: 399,
      features: [
        'Todo lo del Plan Creador +',
        '2 Revisiones de letra y melodía',
        'Control de Composición (Instrumentos, Tempo)',
        'Carátula de Álbum Digital con IA',
      ],
      isRecommended: true,
    },
    {
      value: 'master',
      label: 'Maestro',
      price: 799,
      features: [
        'Todo lo del Plan Artista +',
        '3 Revisiones de letra y melodía',
        'Archivo de audio WAV (Calidad Estudio)',
        'Pista instrumental (backing track)',
        'Géneros Musicales Personalizados y Exóticos',
        'Estilo Inspiracional',
      ],
    },
  ],
  corrido: [
    {
      value: 'creator',
      label: 'El Relato',
      price: 249,
      features: [
        'Corrido completo (Bélico, Tumbado, etc)',
        'Letra que narra tu hazaña',
        '1 Revisión de la letra',
        'Calidad de audio profesional MP3',
      ],
    },
    {
      value: 'artist',
      label: 'La Leyenda',
      price: 499,
      features: [
        'Todo lo de El Relato +',
        '2 Revisiones de letra y arreglos',
        'Control de Composición Avanzado',
        'Carátula de Álbum Digital con IA',
      ],
      isRecommended: true,
    },
    {
      value: 'master',
      label: 'El Patriarca',
      price: 999,
      features: [
        'Todo lo de La Leyenda +',
        '3 Revisiones completas',
        'Archivo de audio WAV (Calidad Estudio)',
        'Pista instrumental para tus eventos',
        'Géneros y Fusiones personalizadas',
        'Estilo Inspiracional',
      ],
    },
  ],
};

export const revisionCounts = {
    creator: 1,
    artist: 2,
    master: 3,
};
