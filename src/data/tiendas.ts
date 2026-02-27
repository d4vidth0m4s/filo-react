export const tiendas = [
  {
    //el slug lo haremos desde el backend
    slug: "gordo-burguer",
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
        categoria: "Hamburguesas",
        id: 1,
        nombre: "Combo Hamburguesa",
        descripcion: "Hamburguesa + papas + bebida",
        precio: 15000,
        imagen: "https://placehold.co/300x200/ffab91/1b1b1b?text=Combo+Hamburguesa"
      }
    ]
  },

  {
    slug: "restaurantes",
    
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
        categoria: "Almuerzos",
        id: 1,
        nombre: "Bandeja Especial",
        descripcion: "Carne, arroz, ensalada y bebida",
        precio: 22000,
        imagen: "https://placehold.co/300x200/c5e1a5/1b1b1b?text=Bandeja+Especial"
      }
    ]
  },

  {
    slug: "supermercados",
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
  }
];
