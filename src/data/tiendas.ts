export const tiendas = [
  {
    slug: "gordo-burguer",
    categoria: "comidas-rapidas",
    nombre: "Gordo Burguer",
    descripcion: "Las mejores salchipapas",
    banner: "https://placehold.co/600x200/ffcc80/1b1b1b?text=Gordo+Burguer",
    logo: "https://placehold.co/100x100/ffb74d/1b1b1b?text=Gordo+Burguer",
    rating: 4.9,
    tiempo: "15-20 min",
    envio: "Gratis",
    categorias: ["Hamburguesas", "Salchipapas", "Combos"],
    productos: [
      {
        id: 1,
        categoria: "Salchipapas",
        nombre: "Salchipapa Mega",
        descripcion: "Papa + salchicha + queso",
        precio: 2000,
        imagen: "https://placehold.co/300x200/ffe0b2/1b1b1b?text=Salchipapa+Mega"
      },
      {
        id: 2,
        categoria: "Hamburguesas",
        nombre: "Hamburguesa Doble",
        descripcion: "Doble carne, queso y papas",
        precio: 1900,
        imagen: "https://placehold.co/300x200/ffccbc/1b1b1b?text=Hamburguesa+Doble"
      }
    ]
  },
  {
    slug: "comida-rapida",
    categoria: "comidas-rapidas",
    nombre: "Fast Food Express",
    descripcion: "Hamburguesas, papas y más",
    banner: "https://placehold.co/600x200/ff7043/ffffff?text=Fast+Food+Express",
    logo: "https://placehold.co/100x100/ff8a65/ffffff?text=Fast+Food+Express",
    rating: 4.5,
    tiempo: "20-30 min",
    envio: "Gratis",
    categorias: ["Hamburguesas", "Papas", "Perros"],
    productos: [
      {
        id: 1,
        categoria: "Hamburguesas",
        nombre: "Combo Hamburguesa",
        descripcion: "Hamburguesa + papas + bebida",
        precio: 15000,
        imagen: "https://placehold.co/300x200/ffab91/1b1b1b?text=Combo+Hamburguesa"
      }
    ]
  },
  {
    slug: "restaurantes",
    categoria: "restaurantes",
    nombre: "Restaurante El Buen Sabor",
    descripcion: "Comida tradicional y gourmet",
    banner: "https://placehold.co/600x200/9ccc65/1b1b1b?text=Restaurante+El+Buen+Sabor",
    logo: "https://placehold.co/100x100/aed581/1b1b1b?text=El+Buen+Sabor",
    rating: 4.8,
    tiempo: "30-40 min",
    envio: "Gratis",
    categorias: ["Almuerzos", "Especiales"],
    productos: [
      {
        id: 1,
        categoria: "Almuerzos",
        nombre: "Bandeja Especial",
        descripcion: "Carne, arroz, ensalada y bebida",
        precio: 22000,
        imagen: "https://placehold.co/300x200/c5e1a5/1b1b1b?text=Bandeja+Especial"
      }
    ]
  },
  {
    slug: "supermercados",
    categoria: "supermercados",
    nombre: "Super Mercado Express",
    descripcion: "Todo lo que necesitas",
    banner: "https://placehold.co/600x200/4db6ac/ffffff?text=Super+Mercado+Express",
    logo: "https://placehold.co/100x100/80cbc4/1b1b1b?text=Super+Mercado",
    rating: 4.6,
    tiempo: "15-25 min",
    envio: "$2.000",
    categorias: ["Abarrotes", "Bebidas", "Snacks"],
    productos: [
      {
        id: 1,
        categoria: "Snacks",
        nombre: "Pack Snacks",
        descripcion: "Papas, galletas y bebida",
        precio: 10000,
        imagen: "https://placehold.co/300x200/b2dfdb/1b1b1b?text=Pack+Snacks"
      }
    ]
  },
  {
    slug: "cebolleros",
    categoria: "comidas-rapidas",
    nombre: "Los Cebolleros",
    descripcion: "Perros calientes legendarios",
    banner: "https://placehold.co/600x200/9575cd/ffffff?text=Los+Cebolleros",
    logo: "https://placehold.co/100x100/b39ddb/1b1b1b?text=Cebolleros",
    rating: 4.7,
    tiempo: "10-15 min",
    envio: "Gratis",
    categorias: ["Perros", "Combos"],
    productos: [
      {
        id: 1,
        categoria: "Perros",
        nombre: "Perro Especial",
        descripcion: "Salchicha, cebolla, papas y salsas",
        precio: 8000,
        imagen: "https://placehold.co/300x200/d1c4e9/1b1b1b?text=Perro+Especial"
      }
    ]
  },
  {
    slug: "demoradas-dinas",
    categoria: "restaurantes",
    nombre: "Demoradas Dinámicas",
    descripcion: "Platos que valen la espera",
    banner: "https://placehold.co/600x200/90caf9/1b1b1b?text=Demoradas+Dinamicas",
    logo: "https://placehold.co/100x100/bbdefb/1b1b1b?text=Demoradas",
    rating: 4.4,
    tiempo: "45-60 min",
    envio: "$3.000",
    categorias: ["Pastas", "Carnes"],
    productos: [
      {
        id: 1,
        categoria: "Pastas",
        nombre: "Pasta Especial",
        descripcion: "Pasta en salsa cremosa",
        precio: 20000,
        imagen: "https://placehold.co/300x200/e3f2fd/1b1b1b?text=Pasta+Especial"
      }
    ]
  },
  {
    slug: "pizza-nostra",
    categoria: "restaurantes",
    nombre: "Pizza Nostra",
    descripcion: "Pizzas artesanales al horno de leña",
    banner: "https://placehold.co/600x200/ef5350/ffffff?text=Pizza+Nostra",
    logo: "https://placehold.co/100x100/e53935/ffffff?text=Pizza+Nostra",
    rating: 4.8,
    tiempo: "25-35 min",
    envio: "Gratis",
    categorias: ["Pizzas", "Pastas", "Bebidas"],
    productos: [
      {
        id: 1,
        categoria: "Pizzas",
        nombre: "Pizza Margarita",
        descripcion: "Tomate, mozzarella y albahaca",
        precio: 25000,
        imagen: "https://placehold.co/300x200/ffcdd2/1b1b1b?text=Pizza+Margarita"
      }
    ]
  },
  {
    slug: "sushi-zen",
    categoria: "restaurantes",
    nombre: "Sushi Zen",
    descripcion: "Rolls y sashimi frescos",
    banner: "https://placehold.co/600x200/26a69a/ffffff?text=Sushi+Zen",
    logo: "https://placehold.co/100x100/4db6ac/ffffff?text=Sushi+Zen",
    rating: 4.9,
    tiempo: "30-45 min",
    envio: "$2.500",
    categorias: ["Rolls", "Sashimi", "Combos"],
    productos: [
      {
        id: 1,
        categoria: "Rolls",
        nombre: "Roll California",
        descripcion: "Cangrejo, aguacate y pepino",
        precio: 28000,
        imagen: "https://placehold.co/300x200/b2dfdb/1b1b1b?text=Roll+California"
      }
    ]
  },
  {
    slug: "tacos-el-primo",
    categoria: "comidas-rapidas",
    nombre: "Tacos El Primo",
    descripcion: "Sabor mexicano auténtico",
    banner: "https://placehold.co/600x200/ffa726/1b1b1b?text=Tacos+El+Primo",
    logo: "https://placehold.co/100x100/ffb74d/1b1b1b?text=Tacos",
    rating: 4.6,
    tiempo: "15-25 min",
    envio: "Gratis",
    categorias: ["Tacos", "Burritos", "Quesadillas"],
    productos: [
      {
        id: 1,
        categoria: "Tacos",
        nombre: "Taco de Pollo",
        descripcion: "Pollo, guacamole y pico de gallo",
        precio: 9000,
        imagen: "https://placehold.co/300x200/ffe0b2/1b1b1b?text=Taco+Pollo"
      }
    ]
  },
  {
    slug: "pollo-feliz",
    categoria: "comidas-rapidas",
    nombre: "Pollo Feliz",
    descripcion: "Pollo frito crujiente y jugoso",
    banner: "https://placehold.co/600x200/ffca28/1b1b1b?text=Pollo+Feliz",
    logo: "https://placehold.co/100x100/ffd54f/1b1b1b?text=Pollo+Feliz",
    rating: 4.7,
    tiempo: "20-30 min",
    envio: "Gratis",
    categorias: ["Pollo", "Combos", "Acompañamientos"],
    productos: [
      {
        id: 1,
        categoria: "Pollo",
        nombre: "Pechuga Crispy",
        descripcion: "Pechuga apanada con papas y ensalada",
        precio: 16000,
        imagen: "https://placehold.co/300x200/fff9c4/1b1b1b?text=Pechuga+Crispy"
      }
    ]
  },
  {
    slug: "crepes-and-co",
    categoria: "comidas-rapidas",
    nombre: "Crepes & Co",
    descripcion: "Crepes dulces y salados",
    banner: "https://placehold.co/600x200/f06292/ffffff?text=Crepes+%26+Co",
    logo: "https://placehold.co/100x100/f48fb1/1b1b1b?text=Crepes",
    rating: 4.5,
    tiempo: "15-20 min",
    envio: "$1.500",
    categorias: ["Crepes Dulces", "Crepes Salados", "Bebidas"],
    productos: [
      {
        id: 1,
        categoria: "Crepes Dulces",
        nombre: "Crepe Nutella",
        descripcion: "Crepe con Nutella y fresas",
        precio: 12000,
        imagen: "https://placehold.co/300x200/fce4ec/1b1b1b?text=Crepe+Nutella"
      }
    ]
  },
  {
    slug: "mar-y-tierra",
    categoria: "restaurantes",
    nombre: "Mar y Tierra",
    descripcion: "Mariscos y carnes a la parrilla",
    banner: "https://placehold.co/600x200/1565c0/ffffff?text=Mar+y+Tierra",
    logo: "https://placehold.co/100x100/1976d2/ffffff?text=Mar+y+Tierra",
    rating: 4.8,
    tiempo: "35-50 min",
    envio: "$3.000",
    categorias: ["Mariscos", "Carnes", "Ensaladas"],
    productos: [
      {
        id: 1,
        categoria: "Mariscos",
        nombre: "Cazuela de Mariscos",
        descripcion: "Camarones, mejillones y calamares",
        precio: 35000,
        imagen: "https://placehold.co/300x200/bbdefb/1b1b1b?text=Cazuela+Mariscos"
      }
    ]
  },
  {
    slug: "veggie-world",
    categoria: "restaurantes",
    nombre: "Veggie World",
    descripcion: "Comida vegetariana y vegana",
    banner: "https://placehold.co/600x200/66bb6a/ffffff?text=Veggie+World",
    logo: "https://placehold.co/100x100/81c784/1b1b1b?text=Veggie",
    rating: 4.6,
    tiempo: "20-30 min",
    envio: "Gratis",
    categorias: ["Bowls", "Wraps", "Jugos"],
    productos: [
      {
        id: 1,
        categoria: "Bowls",
        nombre: "Bowl Proteico",
        descripcion: "Quinoa, garbanzos y vegetales asados",
        precio: 18000,
        imagen: "https://placehold.co/300x200/c8e6c9/1b1b1b?text=Bowl+Proteico"
      }
    ]
  },
  {
    slug: "dulces-momentos",
    categoria: "tiendas",
    nombre: "Dulces Momentos",
    descripcion: "Postres y tortas artesanales",
    banner: "https://placehold.co/600x200/ab47bc/ffffff?text=Dulces+Momentos",
    logo: "https://placehold.co/100x100/ce93d8/1b1b1b?text=Dulces",
    rating: 4.9,
    tiempo: "10-20 min",
    envio: "$1.000",
    categorias: ["Tortas", "Helados", "Brownies"],
    productos: [
      {
        id: 1,
        categoria: "Tortas",
        nombre: "Torta de Chocolate",
        descripcion: "Torta húmeda con ganache",
        precio: 14000,
        imagen: "https://placehold.co/300x200/e1bee7/1b1b1b?text=Torta+Chocolate"
      }
    ]
  },
  {
    slug: "arepa-king",
    categoria: "comidas-rapidas",
    nombre: "Arepa King",
    descripcion: "Arepas rellenas al estilo costeño",
    banner: "https://placehold.co/600x200/ff8f00/ffffff?text=Arepa+King",
    logo: "https://placehold.co/100x100/ffa000/ffffff?text=Arepa+King",
    rating: 4.7,
    tiempo: "10-20 min",
    envio: "Gratis",
    categorias: ["Arepas", "Combos", "Bebidas"],
    productos: [
      {
        id: 1,
        categoria: "Arepas",
        nombre: "Arepa de Huevo",
        descripcion: "Arepa frita rellena de huevo y carne",
        precio: 7000,
        imagen: "https://placehold.co/300x200/fff3e0/1b1b1b?text=Arepa+de+Huevo"
      }
    ]
  },
  {
    slug: "cafe-del-pueblo",
    categoria: "tiendas",
    nombre: "Café del Pueblo",
    descripcion: "Café colombiano y snacks",
    banner: "https://placehold.co/600x200/6d4c41/ffffff?text=Cafe+del+Pueblo",
    logo: "https://placehold.co/100x100/8d6e63/ffffff?text=Cafe",
    rating: 4.5,
    tiempo: "10-15 min",
    envio: "Gratis",
    categorias: ["Café", "Snacks", "Desayunos"],
    productos: [
      {
        id: 1,
        categoria: "Café",
        nombre: "Tinto Especial",
        descripcion: "Café de origen con galletas artesanales",
        precio: 6000,
        imagen: "https://placehold.co/300x200/d7ccc8/1b1b1b?text=Tinto+Especial"
      }
    ]
  },
];