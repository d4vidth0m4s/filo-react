import { api } from './Api';

type ComercioResponseItem = Record<string, unknown>;

export type ComercioCard = {
  id: string;
  slug: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  banner: string;
  logo: string;
  rating: number;
  tiempo: string;
  envio: string;
};

const DEFAULT_BANNER =
  'https://placehold.co/600x200/e8f5e9/1b1b1b?text=Comercio';
const DEFAULT_LOGO = 'https://placehold.co/100x100/c8e6c9/1b1b1b?text=Logo';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const toText = (value: unknown, fallback = ''): string => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  return fallback;
};

const toNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(',', '.'));
    return Number.isNaN(parsed) ? fallback : parsed;
  }
  return fallback;
};

const getFirst = (record: Record<string, unknown>, keys: string[]): unknown => {
  for (const key of keys) {
    if (key in record) return record[key];
  }
  return undefined;
};

const toSlug = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const extractItems = (payload: unknown): ComercioResponseItem[] => {
  if (Array.isArray(payload)) {
    return payload.filter(isRecord);
  }

  if (!isRecord(payload)) return [];

  const listCandidates = [
    'items',
    'data',
    'resultados',
    'comercios',
    'contenido',
    'content',
  ];

  for (const key of listCandidates) {
    const value = payload[key];
    if (Array.isArray(value)) return value.filter(isRecord);
  }

  const nestedData = payload.data;
  if (isRecord(nestedData)) {
    for (const key of listCandidates) {
      const value = nestedData[key];
      if (Array.isArray(value)) return value.filter(isRecord);
    }
  }

  return [];
};

const mapComercio = (
  item: ComercioResponseItem,
  index: number
): ComercioCard => {
  const idRaw = getFirst(item, ['id', 'comercioId', 'Id']);
  const nombre = toText(
    getFirst(item, ['nombre', 'name', 'Nombre']),
    `Comercio ${index + 1}`
  );
  const slugFromApi = toText(getFirst(item, ['slug', 'Slug']));
  const slug = slugFromApi || toSlug(nombre) || `comercio-${index + 1}`;
  const categoria = toText(getFirst(item, ['categoria', 'Categoria']), 'otros');

  return {
    id: toText(idRaw, `comercio-${index + 1}`),
    slug,
    nombre,
    categoria,
    descripcion: toText(
      getFirst(item, ['descripcion', 'description', 'Descripcion']),
      'Sin descripcion'
    ),
    banner: toText(
      getFirst(item, [
        'banner',
        'bannerUrl',
        'imagenBanner',
        'imageUrl',
        'ImagenBanner',
      ]),
      DEFAULT_BANNER
    ),
    logo: toText(
      getFirst(item, ['logo', 'logoUrl', 'imagenLogo', 'LogoUrl']),
      DEFAULT_LOGO
    ),
    rating: toNumber(
      getFirst(item, ['rating', 'calificacion', 'Calificacion'])
    ),
    tiempo: toText(
      getFirst(item, ['tiempo', 'tiempoEntrega', 'TiempoEntrega']),
      'Sin tiempo'
    ),
    envio: toText(
      getFirst(item, ['envio', 'costoEnvio', 'CostoEnvio']),
      'Sin envio'
    ),
  };
};

const getComercios = async (
  params: Record<string, string | number>
): Promise<ComercioCard[]> => {
  const response = await api.get('/Comercios', { params });
  const items = extractItems(response.data);
  return items.map(mapComercio);
};

export const ComerciosApi = {
  getPopulares: async () =>
    getComercios({
      pagina: 1,
      limite: 6,
      Calificacion: '>4',
    }),
  getTodos: async (pagina = 1, limite = 20) =>
    getComercios({
      pagina,
      limite,
    }),
};
