/* ============================================================
   IMPÉRIO LANCHES — Menu Digital v3.0
   ============================================================ */

"use strict";

// ── Categorias ──────────────────────────────────────────────
const CATEGORIES = [
  { id: "todos",                  name: "Todos",            icon: "🏠" },
  { id: "massas",                 name: "Massas",           icon: "🌾" },
  { id: "pasteis-salgados",       name: "Pastéis Salgados", icon: "🥟" },
  { id: "pasteis-doces",          name: "Pastéis Doces",    icon: "🍫" },
  { id: "hamburgueres",           name: "Hambúrgueres",     icon: "🍔" },
  { id: "hamburgueres-artesanal", name: "Artesanal",        icon: "🔥" },
  { id: "tapioca",                name: "Tapioca",          icon: "🫓" },
  { id: "cuscuz",                 name: "Cuscuz",           icon: "🌽" },
  { id: "cachorro-quente",        name: "Cachorro-Quente",  icon: "🌭" },
  { id: "petiscos",               name: "Petiscos",         icon: "🍟" },
  { id: "pizzas",                 name: "Pizzas Salgadas",  icon: "🍕" },
  { id: "pizzas-doces",           name: "Pizzas Doces",     icon: "🍰" },
  { id: "milkshake",              name: "Milk Shake",       icon: "🥤" },
  { id: "sorvete",                name: "Sorvete",          icon: "🍦" },
  { id: "acai",                   name: "Açaí",             icon: "🫐" },
  { id: "bebidas",                name: "Bebidas",          icon: "🧃" },
  { id: "sucos",                  name: "Sucos",            icon: "🍊" },
  { id: "adicionais",             name: "Adicionais",       icon: "➕" },
];

// ── Modificadores reutilizáveis ─────────────────────────────
const PIZZA_SIZES = [
  { name: "Média",   price: 0  },
  { name: "Grande",  price: 10 },
  { name: "Gigante", price: 20 },
];

/** @param {number} qtd - Quantidade de acompanhamentos */
function acaiModifiers(qtd) {
  return [
    {
      name: "Creme",
      required: true,
      multiple: false,
      options: [
        { name: "Açaí",            price: 0 },
        { name: "Avelã",           price: 0 },
        { name: "Cupuaçu",         price: 0 },
        { name: "Ninho",           price: 0 },
        { name: "Açaí com Banana", price: 0 },
        { name: "Ninho Trufado",   price: 0 },
        { name: "Oreo",            price: 0 },
        { name: "Ovomaltine",      price: 0 },
        { name: "Tapioca",         price: 0 },
      ],
    },
    {
      name: "Acompanhamentos",
      required: true,
      multiple: true,
      minSelect: qtd,
      maxSelect: qtd,
      description: `Escolha ${qtd} acompanhamento${qtd > 1 ? "s" : ""}`,
      options: [
        { name: "Amendoim",           price: 0 },
        { name: "Chocobol",           price: 0 },
        { name: "Chocopower",         price: 0 },
        { name: "Confetes",           price: 0 },
        { name: "Farinha Láctea",     price: 0 },
        { name: "Gotas de Chocolate", price: 0 },
        { name: "Granola",            price: 0 },
        { name: "Granulado",          price: 0 },
        { name: "Jujuba",             price: 0 },
        { name: "Leite em Pó",        price: 0 },
        { name: "Ovomaltine",         price: 0 },
        { name: "Paçoca",             price: 0 },
      ],
    },
    {
      name: "Cobertura",
      required: true,
      multiple: false,
      options: [
        { name: "Leite Condensado", price: 0 },
        { name: "Chocolate",        price: 0 },
        { name: "Morango",          price: 0 },
      ],
    },
    {
      name: "Adicionais",
      required: false,
      multiple: true,
      minSelect: 0,
      maxSelect: 4,
      options: [
        { name: "Cobertura Fini de Dentadura", price: 1 },
        { name: "Cobertura Fini de Banana",    price: 1 },
        { name: "Cobertura Fini de Beijos",    price: 1 },
        { name: "Nutela",                      price: 3 },
      ],
    },
  ];
}

const pizzaModifier = {
  name: "Tamanho", required: true, multiple: false, options: PIZZA_SIZES,
};

const queijoCheddarModifier = {
  name: "Escolha o queijo", required: true, multiple: false,
  options: [
    { name: "Catupiry", price: 0 },
    { name: "Cheddar",  price: 0 },
  ],
};

const saborPastelSalgadoModifier = {
  name: "Sabor", required: true, multiple: false,
  options: [
    { name: "Três Queijos",         price: 0 },
    { name: "Frango com Queijo",    price: 1 },
    { name: "Pizza",                price: 1 },
    { name: "Frango com Catupiry",  price: 2 },
    { name: "Frango com Cheddar",   price: 2 },
    { name: "Frango com Bacon",     price: 2 },
    { name: "Carne com Catupiry",   price: 3 },
    { name: "Carne com Cheddar",    price: 3 },
    { name: "Calabresa",            price: 3 },
    { name: "Carne com Queijo",     price: 3 },
    { name: "Carne de Sol na Nata", price: 5 },
    { name: "Moda da Casa",         price: 6 },
    { name: "Sertanejo",            price: 6 },
  ],
};

const saborPastelDoceModifier = {
  name: "Sabor", required: true, multiple: false,
  options: [
    { name: "Chocolate ao Leite",             price: 0 },
    { name: "Chocolate ao Leite + Queijo",    price: 0 },
    { name: "Chocolate Meio Amargo",          price: 0 },
    { name: "Chocolate Meio Amargo + Queijo", price: 0 },
    { name: "Romeu e Julieta",                price: 0 },
    { name: "Churros",                        price: 0 },
  ],
};

const recheioTapiocaModifier = {
  name: "Recheio", required: true, multiple: false,
  options: [
    { name: "Carne de Sol com Catupiry", price: 0 },
    { name: "Carne de Sol com Queijo",   price: 0 },
    { name: "Frango com Catupiry",       price: 0 },
    { name: "Frango com Queijo",         price: 0 },
    { name: "Carne de Sol na Nata",      price: 1 },
    { name: "Sertaneja",                 price: 1 },
  ],
};

const recheiosCuscuzModifier = {
  name: "Recheio", required: true, multiple: false,
  options: [
    { name: "Carne de Sol com Queijo", price: 0 },
    { name: "Frango com Queijo",       price: 0 },
    { name: "Calabresa",               price: 0 },
    { name: "Carne de Sol na Nata",    price: 1 },
  ],
};

const adicionaisCuscuzETapiocaModifier = {
  name: "Adicionais",
  required: false,
  multiple: true,
  minSelect: 0,
  maxSelect: 7,
  options: [
    { name: "Vinagrete",            price: 2 },
    { name: "Ovo",                  price: 2 },
    { name: "Catupiry (requeijão)", price: 2 },
    { name: "Cheddar (requeijão)",  price: 2 },
    { name: "Queijo Coalho",        price: 3 },
    { name: "Catupiry (original)",  price: 4 },
    { name: "Cheddar (original)",   price: 4 },
  ],
};

const saborMassaModifier = {
  name: "Sabor", required: true, multiple: false,
  options: [
    { name: "Cebola e Salsa", price: 0 },
    { name: "Bacon",          price: 0 },
    { name: "Queijo",         price: 0 },
  ],
};

// ── Cardápio completo ───────────────────────────────────────
const MENU = [
  // MASSAS
  {
    id: 1, category: "massas", name: "Massa Gourmet",
    description: "Sabores: Cebola e Salsa, Bacon e Queijo",
    price: 3, image: "imagem/massas.jpg", badge: null,
    modifiers: [saborMassaModifier],
  },

  // PASTÉIS SALGADOS
  {
    id: 4, category: "pasteis-salgados", name: "Pastel Salgado",
    description: "Sabores: Três Queijos, Frango com Queijo, Pizza, Frango com Catupiry, Frango com Cheddar, Frango com Bacon, Carne com Catupiry, Carne com Cheddar, Calabresa, Carne com Queijo, Carne de Sol na Nata, Moda da Casa, Sertanejo",
    price: 7, image: "imagem/pastel.jpg", badge: "MAIS PEDIDO",
    modifiers: [saborPastelSalgadoModifier],
  },

  // PASTÉIS DOCES
  {
    id: 15, category: "pasteis-doces", name: "Pastel Doce",
    description: "Sabores: Chocolate ao Leite, Chocolate Meio Amargo, Romeu e Julieta, Churros",
    price: 10, image: "imagem/pastel.jpg", badge: "DOCE",
    modifiers: [saborPastelDoceModifier],
  },

  // HAMBÚRGUERES
  {
    id: 19, category: "hamburgueres", name: "X-Burg",
    description: "Pão, hambúrguer, queijo e presunto",
    price: 7, image: "imagem/xburguer.jpg", badge: null, modifiers: [],
  },
  {
    id: 20, category: "hamburgueres", name: "Bauru",
    description: "Pão, hambúrguer, alface, tomate, ovo, queijo e presunto",
    price: 8, image: "imagem/bauru.jpg", badge: null, modifiers: [],
  },
  {
    id: 21, category: "hamburgueres", name: "X-Bacon",
    description: "Pão, bacon, hambúrguer, ovo, queijo, presunto, alface e tomate",
    price: 10, image: "imagem/xbacon.jpg", badge: "MAIS PEDIDO", modifiers: [],
  },
  {
    id: 22, category: "hamburgueres", name: "X-Calabresa",
    description: "Pão, calabresa acebolada, hambúrguer, queijo mussarela, alface e tomate",
    price: 10,
    image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=400&q=80",
    badge: null, modifiers: [],
  },
  {
    id: 23, category: "hamburgueres", name: "X-Tudo",
    description: "Pão, hambúrguer, ovo, bacon, salsicha, frango, presunto, queijo, alface e tomate",
    price: 12, image: "imagem/xtudo.png", badge: "FAVORITO", modifiers: [],
  },
  {
    id: 24, category: "hamburgueres", name: "X-Frango com Catupiry",
    description: "Pão, frango, catupiry, ovo, alface e tomate",
    price: 12,
    image: "https://images.unsplash.com/photo-1596956470007-2bf6095e7e16?w=400&q=80",
    badge: null, modifiers: [],
  },
  {
    id: 25, category: "hamburgueres", name: "X-Carne de Sol",
    description: "Pão, carne de sol na nata, ovo, queijo, alface e tomate",
    price: 13, image: "imagem/xcarnesol.jpg", badge: "ESPECIAL", modifiers: [],
  },
  {
    id: 26, category: "hamburgueres", name: "Hamburguer Moda da Casa",
    description: "Pão, hambúrguer duplo, ovo, presunto duplo, queijo duplo, bacon, frango, salsicha, catupiry, alface e tomate",
    price: 15,
    image: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400&q=80",
    badge: "PREMIUM", modifiers: [],
  },

  // ARTESANAL
  {
    id: 27, category: "hamburgueres-artesanal", name: "X-Cheddar",
    description: "Pão brioche, hambúrguer artesanal (100g), cheddar, bacon, cebola roxa e molho especial",
    price: 18, image: "imagem/xchedar.webp", badge: "ARTESANAL", modifiers: [],
  },
  {
    id: 28, category: "hamburgueres-artesanal", name: "Hamburguer Duplo Cheddar",
    description: "Pão brioche, dois hambúrgueres artesanais (100g cada), cheddar, bacon, cebola roxa e molho especial",
    price: 22, image: "imagem/duplochedar.jpg", badge: "PREMIUM", modifiers: [],
  },

  // TAPIOCA
  {
    id: 29, category: "tapioca", name: "Tapioca",
    description: "Recheios: Carne de Sol com Catupiry, Carne de Sol com Queijo, Frango com Catupiry, Frango com Queijo, Carne de Sol na Nata, Sertaneja",
    price: 8, image: "imagem/tapioca.avif", badge: null,
    modifiers: [recheioTapiocaModifier, adicionaisCuscuzETapiocaModifier],
  },

  // CUSCUZ
  {
    id: 35, category: "cuscuz", name: "Cuscuz",
    description: "Recheios: Carne de Sol com Queijo, Frango com Queijo, Calabresa, Carne de Sol na Nata",
    price: 8, image: "imagem/cuscuzcalabresa.jpg", badge: null,
    modifiers: [recheiosCuscuzModifier, adicionaisCuscuzETapiocaModifier],
  },

  // CACHORRO-QUENTE
  {
    id: 39, category: "cachorro-quente", name: "Cachorro-Quente Tradicional",
    description: "Pão, carne moída, salsicha, frango, batata palha, milho, ervilha e queijo ralado",
    price: 7, image: "imagem/hotdog.webp", badge: null, modifiers: [],
  },
  {
    id: 40, category: "cachorro-quente", name: "Carne na Nata",
    description: "Pão, carne de sol na nata, salsicha, milho, ervilha, batata palha e queijo ralado",
    price: 9, image: "imagem/Cachorro-quente-nata.jpg", badge: "ESPECIAL", modifiers: [],
  },

  // PETISCOS
  {
    id: 41, category: "petiscos", name: "Batata Frita P",
    description: "Porção pequena de batata frita crocante",
    price: 10, image: "imagem/batata.jpg", badge: null, modifiers: [],
  },
  {
    id: 42, category: "petiscos", name: "Batata Frita G",
    description: "Porção grande de batata frita crocante",
    price: 14, image: "imagem/batata.jpg", badge: null, modifiers: [],
  },
  {
    id: 43, category: "petiscos", name: "Batata Frita com Bacon e Cheddar",
    description: "Batata frita com bacon crocante e cheddar cremoso",
    price: 20, image: "imagem/batata-bacon-chadar.jpg", badge: "MAIS PEDIDA", modifiers: [],
  },
  {
    id: 44, category: "petiscos", name: "Batata Frita com Calabresa e Cheddar",
    description: "Batata frita com calabresa acebolada e cheddar cremoso",
    price: 20, image: "imagem/batata-calabresa-chadar.jpg", badge: null, modifiers: [],
  },

  // MILK SHAKE
  {
    id: 45, category: "milkshake", name: "Milk Shake 300ml",
    description: "Milk shake cremoso 300ml com chantilly",
    price: 13,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80",
    badge: "FAVORITO",
    modifiers: [{
      name: "Sabor", required: true, multiple: false,
      options: [
        { name: "Morango",     price: 0 },
        { name: "Chocolate",   price: 0 },
        { name: "Ovomaltine",  price: 0 },
        { name: "Chocomenta",  price: 0 },
      ],
    }],
  },

  // SORVETE
  {
    id: 46, category: "sorvete", name: "Sorvete 1 Bola",
    description: "Sorvete 1 bola",
    price: 3,
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&q=80",
    badge: null,
    modifiers: [{
      name: "Sabor", required: true, multiple: false,
      options: [
        { name: "Morango",    price: 0 },
        { name: "Chocolate",  price: 0 },
        { name: "Chocomenta", price: 0 },
      ],
    }],
  },

  // PIZZAS SALGADAS
  {
    id: 47, category: "pizzas", name: "Pizza Calabresa",
    description: "Calabresa, cebola, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 30, image: "imagem/pizzacalabresa.jpg", badge: null,
    modifiers: [pizzaModifier],
  },
  {
    id: 48, category: "pizzas", name: "Pizza Frango com Bacon",
    description: "Frango desfiado, cebola, bacon, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 30, image: "imagem/pizza-de-frango-com-bacon.png", badge: null,
    modifiers: [pizzaModifier],
  },
  {
    id: 49, category: "pizzas", name: "Pizza Frango com Milho",
    description: "Frango desfiado, cebola, milho verde, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 30, image: "imagem/pizza-de-frangomilho.jpg", badge: null,
    modifiers: [pizzaModifier],
  },
  {
    id: 50, category: "pizzas", name: "Pizza Frango com Catupiry",
    description: "Frango desfiado, catupiry, cebola, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 30, image: "imagem/pizza-de-frango-com-catupiry.webp", badge: null,
    modifiers: [pizzaModifier],
  },
  {
    id: 51, category: "pizzas", name: "Pizza Frango com Cheddar",
    description: "Frango desfiado, cheddar, cebola, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 30, image: "imagem/pizzafrangochedar.jpg", badge: null,
    modifiers: [pizzaModifier],
  },
  {
    id: 52, category: "pizzas", name: "Pizza Frango com Queijo",
    description: "Frango desfiado, cebola, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 30, image: "imagem/pizza-de-frango-queijo.webp", badge: null,
    modifiers: [pizzaModifier],
  },
  {
    id: 53, category: "pizzas", name: "Pizza Moda da Casa",
    description: "Carne de sol desfiada, frango, calabresa, cebola, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 40, image: "imagem/pizzamodadacasa.jpg", badge: "ESPECIAL",
    modifiers: [pizzaModifier],
  },
  {
    id: 54, category: "pizzas", name: "Pizza Carne com Catupiry",
    description: "Carne desfiada, catupiry, cebola, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 35, image: "imagem/pizzacarnedesolcatupiry.webp", badge: null,
    modifiers: [pizzaModifier],
  },
  {
    id: 55, category: "pizzas", name: "Pizza Carne de Sol",
    description: "Carne de sol desfiada, cebola, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 35, image: "imagem/pizzacarnesol.jpg", badge: null,
    modifiers: [pizzaModifier],
  },
  {
    id: 56, category: "pizzas", name: "Pizza Carne com Cheddar",
    description: "Carne desfiada, cheddar, cebola, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 35, image: "imagem/pizza-carne-chedar.webp", badge: null,
    modifiers: [pizzaModifier],
  },
  {
    id: 57, category: "pizzas", name: "Pizza Sertaneja",
    description: "Carne de sol desfiada, cebola, queijo coalho, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 35, image: "imagem/pizza-sertaneja.jpg", badge: null,
    modifiers: [pizzaModifier],
  },

  // PIZZAS DOCES
  {
    id: 58, category: "pizzas-doces", name: "Pizza Chocolate com Confetes",
    description: "Chocolate ao leite e confetes",
    price: 30, image: "imagem/pizzachocolatecf.jpg", badge: null,
    modifiers: [pizzaModifier],
  },
  {
    id: 59, category: "pizzas-doces", name: "Pizza Chocolate com Amendoim",
    description: "Chocolate ao leite com amendoim triturado",
    price: 30, image: "imagem/pizzachocolateam.jpg", badge: null,
    modifiers: [pizzaModifier],
  },
  {
    id: 60, category: "pizzas-doces", name: "Pizza Dois Amores",
    description: "Chocolate ao leite e chocolate branco",
    price: 30, image: "imagem/pizzadoisamores.jpg", badge: null,
    modifiers: [pizzaModifier],
  },
  {
    id: 61, category: "pizzas-doces", name: "Pizza Churros",
    description: "Doce de leite, canela e açúcar",
    price: 30, image: "imagem/pizzachurros.jpg", badge: null,
    modifiers: [pizzaModifier],
  },

  // AÇAÍ
  {
    id: 62, category: "acai", name: "Açaí 250ml",
    description: "Escolha 1 creme, 5 acompanhamentos, 1 cobertura e adicionais opcionais.",
    price: 10, image: "imagem/açai.jpg", badge: null,
    modifiers: acaiModifiers(5),
  },
  {
    id: 63, category: "acai", name: "Açaí 350ml",
    description: "Escolha 1 creme, 6 acompanhamentos, 1 cobertura e adicionais opcionais.",
    price: 12, image: "imagem/açai.jpg", badge: null,
    modifiers: acaiModifiers(6),
  },
  {
    id: 64, category: "acai", name: "Açaí 500ml",
    description: "Escolha 1 creme, 8 acompanhamentos, 1 cobertura e adicionais opcionais.",
    price: 16, image: "imagem/açai.jpg", badge: null,
    modifiers: acaiModifiers(8),
  },
  {
    id: 65, category: "acai", name: "Açaí 1 Litro",
    description: "Escolha 1 creme, 10 acompanhamentos, 1 cobertura e adicionais opcionais.",
    price: 28, image: "imagem/açai.jpg", badge: "FAMÍLIA",
    modifiers: acaiModifiers(10),
  },

  // BEBIDAS
  {
    id: 66, category: "bebidas", name: "Água Mineral",
    description: "Água mineral sem gás 500ml",
    price: 2, image: "imagem/aguamineral.webp", badge: null, modifiers: [],
  },
  {
    id: 67, category: "bebidas", name: "Água com Gás",
    description: "Água mineral com gás 500ml",
    price: 3, image: "imagem/aguacomgas.webp", badge: null, modifiers: [],
  },
  {
    id: 68, category: "bebidas", name: "Refrigerante Mini",
    description: "Refrigerante mini",
    price: 2.5, image: "imagem/minirefri.jpg", badge: null, modifiers: [],
  },
  {
    id: 69, category: "bebidas", name: "Cerveja",
    description: "Cerveja long neck",
    price: 5,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&q=80",
    badge: null, modifiers: [],
  },
  {
    id: 70, category: "bebidas", name: "Guaraná Lata",
    description: "Guaraná em lata 350ml",
    price: 5, image: "imagem/guaranalata.jpg", badge: null, modifiers: [],
  },
  {
    id: 71, category: "bebidas", name: "Fanta Laranja Lata",
    description: "Fanta laranja em lata 350ml",
    price: 5, image: "imagem/fantalaranjalata.webp", badge: null, modifiers: [],
  },
  {
    id: 72, category: "bebidas", name: "Fanta Uva Lata",
    description: "Fanta uva em lata 350ml",
    price: 5, image: "imagem/fantauva.webp", badge: null, modifiers: [],
  },
  {
    id: 73, category: "bebidas", name: "Pepsi Lata",
    description: "Pepsi em lata 350ml",
    price: 5, image: "imagem/pepsilata.webp", badge: null, modifiers: [],
  },
  {
    id: 74, category: "bebidas", name: "Coca-Cola Lata",
    description: "Coca-Cola em lata 350ml",
    price: 5,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80",
    badge: null,
    modifiers: [{
      name: "Opção", required: true, multiple: false,
      options: [
        { name: "Original", price: 0 },
        { name: "Zero",     price: 0 },
      ],
    }],
  },
  {
    id: 75, category: "bebidas", name: "Fanta Laranja 1L",
    description: "Fanta laranja 1 litro",
    price: 8, image: "imagem/fantalaranja.webp", badge: null, modifiers: [],
  },
  {
    id: 76, category: "bebidas", name: "Pepsi 1L",
    description: "Pepsi 1 litro",
    price: 8, image: "imagem/pepsi.jpg", badge: null, modifiers: [],
  },
  {
    id: 77, category: "bebidas", name: "Guaraná 1L",
    description: "Guaraná 1 litro",
    price: 8, image: "imagem/guarana.webp", badge: null, modifiers: [],
  },
  {
    id: 78, category: "bebidas", name: "Coca-Cola Original 1L",
    description: "Coca-Cola original 1 litro",
    price: 10, image: "imagem/cocacola.webp", badge: null, modifiers: [],
  },
  {
    id: 79, category: "bebidas", name: "Energético",
    description: "Energético",
    price: 12,
    image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=400&q=80",
    badge: null, modifiers: [],
  },

  // SUCOS
  {
    id: 80, category: "sucos", name: "Suco Natural",
    description: "Sabores: Goiaba, Acerola, Cajá, Caju, Maracujá, Mangaba, Uva, Graviola, Morango, Abacaxi com hortelã",
    price: 4, image: "imagem/suco.jpg", badge: null,
    modifiers: [
      {
        name: "Base", required: true, multiple: false,
        options: [
          { name: "Água",            price: 0  },
          { name: "Leite",           price: 1  },
          { name: "Litro na água",   price: 11 },
          { name: "Litro no leite",  price: 16 },
        ],
      },
      {
        name: "Sabor", required: true, multiple: false,
        options: [
          "Goiaba", "Acerola", "Cajá", "Caju", "Maracujá",
          "Mangaba", "Uva", "Graviola", "Morango", "Abacaxi com hortelã",
        ].map(n => ({ name: n, price: 0 })),
      },
    ],
  },
];

// ── Configuração ─────────────────────────────────────────────
const CONFIG = Object.freeze({
  whatsapp: "5584994994919",
  pix:      "84994994919",
  pixName:  "EMANUEL",
  pixCity:  "NATAL",
  delivery: 0.0,
  storeName: "Império Lanches",
  maxCartItemQty: 99,
  toastDuration: 3200,
  searchDebounceMs: 220,
  scrollRevealDelay: 40,
  scrollRevealMaxDelay: 300,
  cartStorageKey: "imperio_cart_v3",
});

const HORARIO = Object.freeze({
  abertura:   "00:00",
  fechamento: "24:00",
  fechadoDomingo: false,
});

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80";

const PAYMENT_LABELS = Object.freeze({
  pix:      "PIX ✅",
  cartao:   "Cartão 💳",
  dinheiro: "Dinheiro 💵",
});

// ============================================================
// ESTADO (objeto único — evita variáveis soltas)
// ============================================================
const State = {
  cart:              [],
  currentCategory:   "todos",
  modal: {
    product:   null,
    qty:       1,
    modifiers: {},  // { [modIndex]: [{ oi, name, price }] }
  },
  checkoutStep:      1,
  lojaAberta:        true,
  lastFocused:       null,
  timers: {
    search:  null,
    toast:   null,
    horario: null,
  },
  observers: {
    reveal: null,
  },
  _menuIndex: null,   // índice por id para O(1) lookup
};

/** Constrói/retorna o índice do menu por ID */
function getMenuIndex() {
  if (!State._menuIndex) {
    State._menuIndex = new Map(MENU.map(p => [p.id, p]));
  }
  return State._menuIndex;
}

/** Busca produto por ID em O(1) */
function findProduct(id) {
  return getMenuIndex().get(id) ?? null;
}

// ============================================================
// ATALHOS DOM — com cache e verificação de nulo
// ============================================================
const _domCache = new Map();

function $(id) {
  if (_domCache.has(id)) return _domCache.get(id);
  const el = document.getElementById(id);
  if (el) _domCache.set(id, el);
  return el;
}

/** Limpa o cache do DOM (necessário após re-renders parciais) */
function _clearDomCache(...ids) {
  ids.forEach(id => _domCache.delete(id));
}

function setText(id, val) {
  const el = $(id);
  if (el) el.textContent = val;
}

function setHTML(id, val) {
  const el = $(id);
  if (el) el.innerHTML = val;
}

// ============================================================
// UTILITÁRIOS
// ============================================================

/** Formata valor monetário */
const fmt = (v) => `R$ ${Number(v).toFixed(2).replace(".", ",")}`;

/** Escapa HTML para evitar XSS */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Normaliza string para busca (remove acentos, caixa) */
function normalizeSearch(str) {
  return String(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/** Clamp numérico */
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/** Subtotal do carrinho */
function getSubtotal() {
  return State.cart.reduce(
    (sum, item) => sum + (item.price + item.modifiersTotal) * item.quantity,
    0,
  );
}

/** Total com entrega */
function getTotal() {
  return getSubtotal() + CONFIG.delivery;
}

/** Handler de erro de imagem com fallback único */
function handleImgError(img) {
  if (img.src !== FALLBACK_IMG && !img.dataset.retried) {
    img.dataset.retried = "1";
    img.src = FALLBACK_IMG;
  }
}

/** Chave única de item no carrinho */
function cartItemKey(productId, modifiers) {
  return `${productId}||${modifiers.join(",")}`;
}

/** Plural simples */
function plural(n, singular, plural) {
  return `${n} ${n === 1 ? singular : plural}`;
}

// ============================================================
// HORÁRIO DE FUNCIONAMENTO
// ============================================================
function verificarHorario() {
  const now    = new Date();
  const dia    = now.getDay();
  const minNow = now.getHours() * 60 + now.getMinutes();

  const [hA, mA] = HORARIO.abertura.split(":").map(Number);
  const [hF, mF] = HORARIO.fechamento.split(":").map(Number);

  let aberto = minNow >= hA * 60 + mA && minNow < hF * 60 + mF;
  if (HORARIO.fechadoDomingo && dia === 0) aberto = false;

  State.lojaAberta = aberto;

  const badge = $("status-loja");
  if (!badge) return;

  badge.className = `status-badge ${aberto ? "aberto" : "fechado"}`;
  badge.setAttribute("aria-label", aberto ? "Loja aberta agora" : "Loja fechada");

  const label = badge.querySelector("#status-label");
  if (label) label.textContent = aberto ? "Aberto agora" : "Fechado";

  document.body.classList.toggle("loja-fechada", !aberto);
}

// ============================================================
// PRELOADER
// ============================================================
window.addEventListener("load", () => {
  const preloader = $("preloader");
  if (!preloader) return;
  setTimeout(() => {
    preloader.classList.add("hide");
    preloader.addEventListener(
      "transitionend",
      () => preloader.remove(),
      { once: true },
    );
  }, 1400);
});

// ============================================================
// SCROLL REVEAL — IntersectionObserver otimizado
// ============================================================
function initScrollReveal() {
  if (State.observers.reveal) {
    State.observers.reveal.disconnect();
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".product-card:not(.revealed)")
      .forEach(c => c.classList.add("revealed"));
    return;
  }

  State.observers.reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        const grid = card.closest(".products-grid");
        let delay  = 0;

        if (grid) {
          const idx = Array.from(grid.children).indexOf(card);
          delay = clamp(idx * CONFIG.scrollRevealDelay, 0, CONFIG.scrollRevealMaxDelay);
        }

        if (delay > 0) {
          setTimeout(() => card.classList.add("revealed"), delay);
        } else {
          card.classList.add("revealed");
        }

        State.observers.reveal.unobserve(card);
      });
    },
    { threshold: 0.03, rootMargin: "0px 0px 40px 0px" },
  );

  document.querySelectorAll(".product-card:not(.revealed)")
    .forEach(c => State.observers.reveal.observe(c));
}

// ============================================================
// SCROLL — Header + Botão voltar ao topo
// ============================================================
function handleScroll() {
  const scrollY  = window.scrollY;
  const header   = $("header");
  const btt      = $("backToTop");

  header?.classList.toggle("scrolled", scrollY > 50);
  btt?.classList.toggle("visible",     scrollY > 400);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  verificarHorario();
  State.timers.horario = setInterval(verificarHorario, 60_000);

  renderCategories();
  renderMenu();
  loadCart();

  _setupEventListeners();

  requestAnimationFrame(() => requestAnimationFrame(initScrollReveal));
});

/** Centraliza todos os addEventListener */
function _setupEventListeners() {
  // Scroll
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Máscara de telefone
  const phoneInput = $("customerPhone");
  if (phoneInput) {
    phoneInput.addEventListener("input", _maskPhone);
  }

  // Limpa erros ao digitar em qualquer input do step1
  document.querySelectorAll("#step1 input").forEach(input => {
    input.addEventListener("input", () => clearInputError(input));
  });

  // Acessibilidade: cartBar via teclado
  const cartBar = $("cartBar");
  if (cartBar) {
    cartBar.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleCart();
      }
    });
  }

  // Escape fecha qualquer modal aberto
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });

  // Delegação de eventos para checkboxes de modificadores
  const modalModifiers = $("modalModifiers");
  if (modalModifiers) {
    modalModifiers.addEventListener("change", _onModifierChange);
  }
}

// ============================================================
// MÁSCARA DE TELEFONE
// ============================================================
function _maskPhone() {
  let v = this.value.replace(/\D/g, "").slice(0, 11);

  if (v.length > 10) {
    // Celular: (XX) XXXXX-XXXX
    v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  } else if (v.length > 6) {
    // Fixo:    (XX) XXXX-XXXX
    v = `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
  } else if (v.length > 2) {
    v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
  } else if (v.length > 0) {
    v = `(${v}`;
  }

  this.value = v;
  clearInputError(this);
}

// ============================================================
// HANDLER DE CHECKBOXES (delegado)
// ============================================================
function _onModifierChange(e) {
  const input = e.target;
  if (input.type !== "checkbox" || !input.dataset.modifierIndex) return;

  const modIndex  = parseInt(input.dataset.modifierIndex, 10);
  const maxSelect = parseInt(input.dataset.maxSelect || "0", 10);

  if (maxSelect > 0 && input.checked) {
    const checked = document.querySelectorAll(
      `#modalModifiers input[type="checkbox"][data-modifier-index="${modIndex}"]:checked`
    );

    if (checked.length > maxSelect) {
      input.checked = false;
      showToast(
        "Limite atingido ⚠️",
        `Máximo de ${plural(maxSelect, "opção", "opções")} neste grupo.`,
        "warn",
      );
      return;
    }
  }

  syncCheckboxModifier(modIndex);
  updateModalPrice();
}

// ============================================================
// CATEGORIAS — Render
// ============================================================
function renderCategories() {
  const nav = $("categoryNav");
  if (!nav) return;

  const fragment = document.createDocumentFragment();

  CATEGORIES.forEach(cat => {
    const btn = document.createElement("button");
    btn.className   = `cat-link${cat.id === State.currentCategory ? " active" : ""}`;
    btn.dataset.cat  = cat.id;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", String(cat.id === State.currentCategory));
    btn.innerHTML   = `${cat.icon} ${escapeHTML(cat.name)}`;
    btn.addEventListener("click", () => filterCategory(cat.id, btn));
    fragment.appendChild(btn);
  });

  nav.innerHTML = "";
  nav.appendChild(fragment);
}

function filterCategory(id, el) {
  State.currentCategory = id;

  document.querySelectorAll(".cat-link").forEach(b => {
    b.classList.remove("active");
    b.setAttribute("aria-selected", "false");
  });

  if (el) {
    el.classList.add("active");
    el.setAttribute("aria-selected", "true");
    // Scroll horizontal do nav para o botão ativo
    el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  // Limpa busca ao trocar categoria
  const inp = $("searchInput");
  if (inp?.value) {
    inp.value = "";
    $("searchClear")?.classList.remove("visible");
  }

  renderMenu();

  if (id !== "todos") {
    requestAnimationFrame(() => {
      const target  = $(`cat-${id}`);
      if (!target) return;
      const headerH = $("header")?.offsetHeight ?? 175;
      const y = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  }
}

// ============================================================
// RENDERIZAÇÃO DO MENU — DocumentFragment para performance
// ============================================================
const ORDERED_CATS = CATEGORIES.map(c => c.id).filter(id => id !== "todos");

function groupItems(items) {
  const grouped = /** @type {Record<string, typeof MENU>} */ ({});
  for (const item of items) {
    (grouped[item.category] ??= []).push(item);
  }
  return grouped;
}

function renderMenu() {
  const container = $("menuContainer");
  if (!container) return;

  const items = State.currentCategory === "todos"
    ? MENU
    : MENU.filter(i => i.category === State.currentCategory);

  if (!items.length) {
    container.innerHTML = _emptySearchHTML("Nenhum item nesta categoria");
    return;
  }

  const grouped  = groupItems(items);
  const fragment = document.createDocumentFragment();

  ORDERED_CATS
    .filter(id => grouped[id])
    .forEach(catId => {
      const cat     = CATEGORIES.find(c => c.id === catId);
      const section = document.createElement("section");
      section.className = "category-section";
      section.id        = `cat-${catId}`;

      section.innerHTML = `
        <div class="section-header">
          <div class="section-icon" aria-hidden="true">${cat?.icon ?? "🍽️"}</div>
          <h2 class="section-title">${escapeHTML(cat?.name ?? catId)}</h2>
        </div>
        <div class="products-grid">
          ${grouped[catId].map(renderCard).join("")}
        </div>`;

      fragment.appendChild(section);
    });

  container.innerHTML = "";
  container.appendChild(fragment);

  requestAnimationFrame(initScrollReveal);
}

/** Gera HTML de um card de produto */
function renderCard(p) {
  const hasRequired = p.modifiers?.some(m => m.required);
  const priceStr    = fmt(p.price);

  // Garante que o action chame openProductModal se tiver modificadores obrigatórios
  const quickAddAction = hasRequired
    ? `openProductModal(${p.id})`
    : `quickAdd(${p.id})`;

  const quickAddIcon  = hasRequired ? "fa-sliders-h" : "fa-plus";
  const quickAddLabel = hasRequired ? `Personalizar ${escapeHTML(p.name)}` : `Adicionar ${escapeHTML(p.name)}`;

  return `
    <article class="product-card"
             role="button"
             tabindex="0"
             aria-label="${escapeHTML(p.name)} — ${priceStr}"
             onclick="openProductModal(${p.id})"
             onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openProductModal(${p.id})}">
      <div class="product-image">
        <img src="${escapeHTML(p.image)}"
             alt="${escapeHTML(p.name)}"
             loading="lazy"
             decoding="async"
             onerror="handleImgError(this)">
        ${p.badge ? `<div class="product-badge" aria-label="Destaque: ${escapeHTML(p.badge)}">${escapeHTML(p.badge)}</div>` : ""}
      </div>
      <div class="product-info">
        <h3 class="product-name">${escapeHTML(p.name)}</h3>
        <p class="product-desc">${escapeHTML(p.description)}</p>
        <div class="product-footer">
          <span class="product-price" aria-label="Preço: ${priceStr}">${priceStr}</span>
          <button class="btn-add-quick"
                  aria-label="${quickAddLabel}"
                  onclick="event.stopPropagation(); ${quickAddAction}">
            <i class="fas ${quickAddIcon}" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </article>`;
}

function _emptySearchHTML(msg = "Nenhum resultado encontrado", query = "") {
  return `
    <div class="empty-search" role="status" aria-live="polite">
      <div class="empty-search-icon" aria-hidden="true">🔍</div>
      <h3>${escapeHTML(msg)}</h3>
      ${query ? `<p>Tente buscar por outro termo.</p>` : ""}
    </div>`;
}

// ============================================================
// BUSCA — Debounce + normalização + busca em modificadores
// ============================================================
function searchMenu() {
  clearTimeout(State.timers.search);
  State.timers.search = setTimeout(doSearch, CONFIG.searchDebounceMs);
}

function doSearch() {
  const rawQuery = $("searchInput")?.value ?? "";
  const query    = normalizeSearch(rawQuery);
  const clearBtn = $("searchClear");

  if (clearBtn) clearBtn.classList.toggle("visible", query.length > 0);

  const container = $("menuContainer");
  if (!container) return;

  if (!query) {
    renderMenu();
    return;
  }

  const filtered = MENU.filter(item => {
    if (normalizeSearch(item.name).includes(query))        return true;
    if (normalizeSearch(item.description).includes(query)) return true;
    // Busca também nos modificadores
    if (item.modifiers?.some(mod =>
      mod.options?.some(opt => normalizeSearch(opt.name).includes(query))
    )) return true;
    return false;
  });

  if (!filtered.length) {
    container.innerHTML = _emptySearchHTML(
      `Nenhum resultado para "${escapeHTML(rawQuery)}"`,
      rawQuery,
    );
    return;
  }

  const grouped  = groupItems(filtered);
  const fragment = document.createDocumentFragment();

  ORDERED_CATS
    .filter(id => grouped[id])
    .forEach(catId => {
      const cat     = CATEGORIES.find(c => c.id === catId);
      const section = document.createElement("section");
      section.className = "category-section";
      section.id        = `cat-${catId}`;
      section.innerHTML = `
        <div class="section-header">
          <div class="section-icon" aria-hidden="true">${cat?.icon ?? "🍽️"}</div>
          <h2 class="section-title">${escapeHTML(cat?.name ?? catId)}</h2>
        </div>
        <div class="products-grid">
          ${grouped[catId].map(renderCard).join("")}
        </div>`;
      fragment.appendChild(section);
    });

  container.innerHTML = "";
  container.appendChild(fragment);

  requestAnimationFrame(initScrollReveal);
}

function clearSearch() {
  const input = $("searchInput");
  if (input) input.value = "";
  $("searchClear")?.classList.remove("visible");
  renderMenu();
  input?.focus();
}

// ============================================================
// LOJA FECHADA — Guard
// ============================================================
function isClosed() {
  if (!State.lojaAberta) {
    showToast(
      "Fechado 🔒",
      "Estamos fechados no momento. Volte em breve!",
      "warn",
    );
    return true;
  }
  return false;
}

// ============================================================
// MODAL DO PRODUTO — Abertura e Fechamento
// ============================================================
function openProductModal(productId) {
  if (isClosed()) return;

  const p = findProduct(productId);
  if (!p) return;

  State.lastFocused      = document.activeElement;
  State.modal.product    = p;
  State.modal.qty        = 1;
  State.modal.modifiers  = {};

  const modal = $("productModal");
  if (!modal) return;

  // Imagem
  const img    = $("modalImg");
  img.alt      = p.name;
  img.src      = "";              // força reset do cache
  img.onerror  = () => handleImgError(img);
  img.src      = p.image;

  // Badge
  const badge = $("modalBadge");
  if (badge) {
    badge.textContent   = p.badge ?? "";
    badge.style.display = p.badge ? "block" : "none";
  }

  // Textos
  const cat = CATEGORIES.find(c => c.id === p.category);
  setText("modalCategory",    cat?.name ?? "");
  setText("modalTitle",       p.name);
  setText("modalDescription", p.description);
  setText("modalQty",         State.modal.qty);

  renderModifiers(p);
  updateModalPrice();
  _resetModifierProgress(p);

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  $("overlay")?.classList.add("active");
  document.body.style.overflow = "hidden";

  // Foca o botão de fechar para acessibilidade
  requestAnimationFrame(() => {
    modal.querySelector(".modal-close")?.focus();
  });
}

function closeProductModal() {
  const modal = $("productModal");
  if (!modal?.classList.contains("active")) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  tryCloseOverlay();
  document.body.style.overflow = "";
  State.lastFocused?.focus();
  State.lastFocused = null;
}

// ============================================================
// PROGRESSO DE PREENCHIMENTO DOS MODIFICADORES
// ============================================================
function _resetModifierProgress(p) {
  // Reseta qualquer indicador visual de progresso nos grupos
  const groups = document.querySelectorAll(".modifier-group");
  groups.forEach(g => g.classList.remove("filled", "error"));
}

/** Atualiza estado visual de preenchimento do grupo */
function _updateGroupProgress(mi) {
  const group = $(`modGroup-${mi}`);
  if (!group) return;

  const mod      = State.modal.product?.modifiers[mi];
  if (!mod) return;

  const selected = State.modal.modifiers[mi] ?? [];
  const count    = selected.length;

  if (!mod.required) {
    group.classList.toggle("filled", count > 0);
    return;
  }

  const min = mod.multiple ? (mod.minSelect ?? 1) : 1;
  group.classList.toggle("filled", count >= min);
  group.classList.remove("error"); // limpa erro ao selecionar
}

// ============================================================
// RENDERIZAÇÃO DOS MODIFICADORES — radio + checkbox
// ============================================================
function renderModifiers(p) {
  const container = $("modalModifiers");
  if (!container) return;

  if (!p.modifiers?.length) {
    container.innerHTML = "";
    return;
  }

  const fragment = document.createDocumentFragment();

  p.modifiers.forEach((mod, mi) => {
    const isMultiple = !!mod.multiple;
    const title      = mod.description || mod.name;

    const group = document.createElement("div");
    group.className = "modifier-group";
    group.id        = `modGroup-${mi}`;

    // Cabeçalho
    const titleEl = document.createElement("div");
    titleEl.className = "modifier-title";
    titleEl.setAttribute("id", `modTitle-${mi}`);

    const reqMark = mod.required
      ? `<i class="fas fa-asterisk" aria-hidden="true" style="color:var(--primary);font-size:8px;vertical-align:middle"></i> `
      : "";
    const reqLabel = mod.required
      ? `<span class="mod-req-label">(obrigatório)</span>`
      : "";
    const limitLabel = isMultiple && mod.maxSelect
      ? `<span class="mod-limit-label"> — escolha ${mod.maxSelect === mod.minSelect
          ? plural(mod.maxSelect, "opção", "opções")
          : `até ${plural(mod.maxSelect, "opção", "opções")}`
        }</span>`
      : "";

    titleEl.innerHTML = `${reqMark}${escapeHTML(title)}${reqLabel}${limitLabel}`;

    // Contador para múltiplos
    let counterEl = null;
    if (isMultiple && mod.maxSelect) {
      counterEl = document.createElement("div");
      counterEl.className = "mod-counter";
      counterEl.id        = `modCounter-${mi}`;
      counterEl.setAttribute("aria-live", "polite");
      counterEl.textContent = `0 / ${mod.maxSelect}`;
    }

    // Opções
    const optionsContainer = document.createElement("div");
    optionsContainer.className = "modifier-options";
    optionsContainer.setAttribute("role", isMultiple ? "group" : "radiogroup");
    optionsContainer.setAttribute("aria-labelledby", `modTitle-${mi}`);

    mod.options.forEach((opt, oi) => {
      const label = document.createElement("label");
      label.className = "modifier-option";

      const input = document.createElement("input");
      input.name  = `mod-${mi}`;
      input.value = String(oi);
      input.dataset.modifierIndex = String(mi);
      input.dataset.optionIndex   = String(oi);

      if (isMultiple) {
        input.type               = "checkbox";
        input.dataset.maxSelect  = String(mod.maxSelect ?? 0);
      } else {
        input.type = "radio";
        input.addEventListener("change", () => {
          selectModifier(mi, oi, opt.name, opt.price ?? 0);
        });
      }

      const content = document.createElement("div");
      content.className = "option-content";
      content.innerHTML = `
        <span class="option-name">${escapeHTML(opt.name)}</span>
        ${opt.price > 0
          ? `<span class="option-price" aria-label="acréscimo de ${fmt(opt.price)}">+${fmt(opt.price)}</span>`
          : ""}`;

      label.appendChild(input);
      label.appendChild(content);
      optionsContainer.appendChild(label);
    });

    group.appendChild(titleEl);
    if (counterEl) group.appendChild(counterEl);
    group.appendChild(optionsContainer);
    fragment.appendChild(group);
  });

  container.innerHTML = "";
  container.appendChild(fragment);
}

// ── Radio: seleciona um modificador ─────────────────────────
function selectModifier(mi, oi, name, price) {
  State.modal.modifiers[mi] = [{ oi, name, price }];

  document.querySelectorAll(`input[name="mod-${mi}"]`).forEach((inp, idx) => {
    inp.closest(".modifier-option")?.classList.toggle("selected", idx === oi);
  });

  _updateGroupProgress(mi);
  updateModalPrice();
}

// ── Checkbox: sincroniza estado ──────────────────────────────
function syncCheckboxModifier(mi) {
  const mod = State.modal.product?.modifiers[mi];
  if (!mod) return;

  const checked = document.querySelectorAll(
    `#modalModifiers input[type="checkbox"][data-modifier-index="${mi}"]:checked`
  );

  State.modal.modifiers[mi] = Array.from(checked).map(inp => {
    const oi  = parseInt(inp.dataset.optionIndex, 10);
    const opt = mod.options[oi];
    return { oi, name: opt.name, price: opt.price ?? 0 };
  });

  // Atualiza visual de seleção
  document.querySelectorAll(`#modalModifiers input[data-modifier-index="${mi}"]`)
    .forEach(inp => {
      inp.closest(".modifier-option")?.classList.toggle("selected", inp.checked);
    });

  // Atualiza contador
  const counter = $(`modCounter-${mi}`);
  if (counter) {
    const count = State.modal.modifiers[mi]?.length ?? 0;
    counter.textContent = `${count} / ${mod.maxSelect}`;
    counter.classList.toggle("counter-full", mod.maxSelect > 0 && count >= mod.maxSelect);
  }

  _updateGroupProgress(mi);
}

// ── Quantidade no modal ──────────────────────────────────────
function updateModalQty(delta) {
  State.modal.qty = clamp(State.modal.qty + delta, 1, CONFIG.maxCartItemQty);
  setText("modalQty", State.modal.qty);
  updateModalPrice();
}

// ── Preço total no modal ─────────────────────────────────────
function updateModalPrice() {
  if (!State.modal.product) return;

  const modTotal = _calcModsTotal();
  const unit     = State.modal.product.price + modTotal;
  const total    = unit * State.modal.qty;

  setText("modalPrice", fmt(unit));
  setText("modalTotal", fmt(total));
}

function _calcModsTotal() {
  return Object.values(State.modal.modifiers)
    .flat()
    .reduce((sum, m) => sum + (m.price ?? 0), 0);
}

// ============================================================
// ADICIONAR AO CARRINHO — via modal
// ============================================================
function addToCartFromModal() {
  const p = State.modal.product;
  if (!p) return;

  // Valida todos os modificadores obrigatórios
  for (let mi = 0; mi < p.modifiers.length; mi++) {
    const mod      = p.modifiers[mi];
    const selected = State.modal.modifiers[mi] ?? [];

    if (!mod.required) continue;

    if (mod.multiple) {
      const need = mod.minSelect ?? 1;
      if (selected.length < need) {
        _highlightGroupError(mi);
        showToast(
          "Atenção ⚠️",
          `Escolha ${plural(need, "opção", "opções")} em: ${mod.name}`,
          "warn",
        );
        return;
      }
    } else {
      if (!selected.length) {
        _highlightGroupError(mi);
        showToast("Atenção ⚠️", `Selecione uma opção em: ${mod.name}`, "warn");
        return;
      }
    }
  }

  const modsList  = Object.values(State.modal.modifiers).flat().map(m => m.name);
  const modsTotal = _calcModsTotal();
  const key       = cartItemKey(p.id, modsList);
  const existing  = State.cart.find(
    i => cartItemKey(i.productId, i.modifiers) === key
  );

  if (existing) {
    existing.quantity = clamp(
      existing.quantity + State.modal.qty,
      1,
      CONFIG.maxCartItemQty,
    );
  } else {
    State.cart.push({
      productId:      p.id,
      name:           p.name,
      price:          p.price,
      image:          p.image,
      quantity:       State.modal.qty,
      modifiers:      modsList,
      modifiersTotal: modsTotal,
    });
  }

  saveCart();
  updateCartUI();
  closeProductModal();
  showToast("Adicionado! 🎉", `${p.name} adicionado à sacola`);
}

/** Destaca grupo com erro e faz scroll até ele */
function _highlightGroupError(mi) {
  const group = $(`modGroup-${mi}`);
  if (!group) return;
  group.classList.add("error");
  group.scrollIntoView({ behavior: "smooth", block: "nearest" });
  group.addEventListener("change", () => group.classList.remove("error"), { once: true });
}

// ============================================================
// ADIÇÃO RÁPIDA — sem modificadores obrigatórios
// ============================================================
function quickAdd(productId) {
  if (isClosed()) return;

  const p = findProduct(productId);
  if (!p) return;

  if (p.modifiers?.some(m => m.required)) {
    openProductModal(productId);
    return;
  }

  const key      = cartItemKey(p.id, []);
  const existing = State.cart.find(i => cartItemKey(i.productId, i.modifiers) === key);

  if (existing) {
    existing.quantity = clamp(existing.quantity + 1, 1, CONFIG.maxCartItemQty);
  } else {
    State.cart.push({
      productId:      p.id,
      name:           p.name,
      price:          p.price,
      image:          p.image,
      quantity:       1,
      modifiers:      [],
      modifiersTotal: 0,
    });
  }

  saveCart();
  updateCartUI();
  showToast("Adicionado! 🎉", `${p.name} adicionado à sacola`);
}

// ============================================================
// CARRINHO — UI
// ============================================================
function updateCartUI() {
  const totalQty = State.cart.reduce((s, i) => s + i.quantity, 0);
  const subtotal = getSubtotal();
  const total    = getTotal();

  // Badge animado
  const badge = $("cartBadge");
  if (badge) {
    badge.textContent = totalQty;
    badge.setAttribute("aria-label", `${plural(totalQty, "item", "itens")} na sacola`);
    badge.classList.remove("pop");
    void badge.offsetWidth;  // reflow para re-trigger da animação
    badge.classList.add("pop");
  }

  setText("cartBarQty",   totalQty);
  setText("cartBarTotal", fmt(total));

  const bar = $("cartBar");
  if (bar) {
    bar.style.display = totalQty > 0 ? "flex" : "none";
    bar.setAttribute("aria-hidden", String(totalQty === 0));
  }

  // Conteúdo da sidebar
  const empty  = $("cartEmpty");
  const items  = $("cartItems");
  const footer = $("cartFooter");

  if (!State.cart.length) {
    if (empty)  empty.style.display  = "block";
    if (items)  items.innerHTML      = "";
    if (footer) footer.style.display = "none";
  } else {
    if (empty)  empty.style.display  = "none";
    if (items)  items.innerHTML      = State.cart.map(renderCartItem).join("");
    if (footer) footer.style.display = "block";
  }

  setText("cartSubtotal", fmt(subtotal));
  setText("cartDelivery", CONFIG.delivery > 0 ? fmt(CONFIG.delivery) : "Grátis");
  setText("cartTotal",    fmt(total));
}

function renderCartItem(item, idx) {
  const unitPrice  = item.price + item.modifiersTotal;
  const totalPrice = unitPrice * item.quantity;
  const modsHTML   = item.modifiers.length
    ? `<div class="cart-item-modifiers">${escapeHTML(item.modifiers.join(", "))}</div>`
    : "";

  return `
    <div class="cart-item" data-idx="${idx}">
      <img src="${escapeHTML(item.image)}"
           alt="${escapeHTML(item.name)}"
           class="cart-item-image"
           loading="lazy"
           decoding="async"
           onerror="handleImgError(this)">
      <div class="cart-item-info">
        <div class="cart-item-name">${escapeHTML(item.name)}</div>
        ${modsHTML}
        <div class="cart-item-price" aria-label="Total: ${fmt(totalPrice)}">${fmt(totalPrice)}</div>
        <div class="cart-item-controls" role="group" aria-label="Quantidade de ${escapeHTML(item.name)}">
          <button class="qty-btn"
                  aria-label="Diminuir quantidade"
                  onclick="changeQty(${idx}, -1)">
            <i class="fas fa-minus" aria-hidden="true"></i>
          </button>
          <span class="cart-item-qty" aria-label="${plural(item.quantity, "unidade", "unidades")}">${item.quantity}</span>
          <button class="qty-btn"
                  aria-label="Aumentar quantidade"
                  onclick="changeQty(${idx}, 1)">
            <i class="fas fa-plus" aria-hidden="true"></i>
          </button>
          <button class="cart-item-remove"
                  aria-label="Remover ${escapeHTML(item.name)}"
                  onclick="removeItem(${idx})">
            <i class="fas fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>`;
}

function changeQty(idx, delta) {
  const item = State.cart[idx];
  if (!item) return;

  item.quantity = clamp(item.quantity + delta, 0, CONFIG.maxCartItemQty);

  if (item.quantity === 0) {
    State.cart.splice(idx, 1);
  }

  saveCart();
  updateCartUI();
}

function removeItem(idx) {
  const item = State.cart[idx];
  if (!item) return;

  const name = item.name;
  State.cart.splice(idx, 1);
  saveCart();
  updateCartUI();
  showToast("Removido 🗑️", `${name} removido da sacola`);
}

function clearCart() {
  if (!State.cart.length) return;
  if (!confirm("Deseja limpar todos os itens da sacola?")) return;
  State.cart = [];
  saveCart();
  updateCartUI();
  showToast("Sacola limpa 🗑️", "Todos os itens foram removidos");
}

// ============================================================
// CARRINHO — Persistência (localStorage)
// ============================================================
function saveCart() {
  try {
    localStorage.setItem(CONFIG.cartStorageKey, JSON.stringify(State.cart));
  } catch {
    // Storage cheio ou privado — silencioso
  }
}

function loadCart() {
  try {
    const raw = localStorage.getItem(CONFIG.cartStorageKey);
    if (!raw) return;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;

    State.cart = parsed.filter(item =>
      item &&
      typeof item.productId      === "number" &&
      typeof item.quantity       === "number" &&
      item.quantity > 0          &&
      findProduct(item.productId) !== null     // remove itens de produtos que não existem mais
    );
  } catch {
    State.cart = [];
  } finally {
    updateCartUI();
  }
}

// ============================================================
// CARRINHO — Toggle sidebar
// ============================================================
function toggleCart() {
  const sidebar = $("cartSidebar");
  const overlay = $("overlay");
  if (!sidebar) return;

  const isOpen = sidebar.classList.contains("active");

  if (isOpen) {
    sidebar.classList.remove("active");
    sidebar.setAttribute("aria-hidden", "true");
    overlay?.classList.remove("active");
    document.body.style.overflow = "";
    State.lastFocused?.focus();
    State.lastFocused = null;
  } else {
    State.lastFocused = document.activeElement;
    sidebar.classList.add("active");
    sidebar.setAttribute("aria-hidden", "false");
    overlay?.classList.add("active");
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      sidebar.querySelector(".btn-close")?.focus();
    });
  }
}

// ============================================================
// CHECKOUT
// ============================================================
function openCheckout() {
  if (!State.cart.length) {
    showToast("Sacola vazia 🛒", "Adicione itens antes de finalizar", "warn");
    return;
  }
  if (isClosed()) return;

  // Fecha a sidebar antes
  const sidebar = $("cartSidebar");
  sidebar?.classList.remove("active");
  sidebar?.setAttribute("aria-hidden", "true");

  State.checkoutStep = 1;
  syncSteps();

  const modal = $("checkoutModal");
  modal?.classList.add("active");
  modal?.setAttribute("aria-hidden", "false");
  $("overlay")?.classList.add("active");
  document.body.style.overflow = "hidden";

  requestAnimationFrame(() => {
    setTimeout(() => $("customerName")?.focus(), 200);
  });
}

function closeCheckout() {
  const modal = $("checkoutModal");
  if (!modal?.classList.contains("active")) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  tryCloseOverlay();
  document.body.style.overflow = "";
  State.lastFocused?.focus();
  State.lastFocused = null;
}

function goToStep(step) {
  // Validação ao avançar
  if (step > State.checkoutStep) {
    if (State.checkoutStep === 1 && !validateStep1()) return;
  }

  State.checkoutStep = step;
  syncSteps();

  // Ações específicas por step
  if (step === 2) {
    updatePaymentValues();
    togglePaymentView();
    generatePix();
  }
  if (step === 3) {
    buildReview();
  }

  // Scroll para o topo do checkout
  const body = document.querySelector(".checkout-body");
  if (body) body.scrollTop = 0;
}

function syncSteps() {
  document.querySelectorAll(".checkout-steps .step").forEach((el, i) => {
    const num = i + 1;
    el.classList.toggle("active",    num === State.checkoutStep);
    el.classList.toggle("completed", num <  State.checkoutStep);
    el.setAttribute("aria-current", num === State.checkoutStep ? "step" : "false");
  });

  document.querySelectorAll(".step-line").forEach((el, i) => {
    el.classList.toggle("completed", i + 1 < State.checkoutStep);
  });

  document.querySelectorAll(".checkout-step").forEach((el, i) => {
    const active = i + 1 === State.checkoutStep;
    el.classList.toggle("active", active);
    el.setAttribute("aria-hidden", String(!active));
  });
}

// ============================================================
// VALIDAÇÃO — Step 1
// ============================================================
function getInputVal(id) {
  return $(id)?.value?.trim() ?? "";
}

function markInputError(id, msg) {
  const input = $(id);
  if (!input) return;
  input.classList.add("input-error");
  input.setAttribute("aria-invalid", "true");
  input.setAttribute("aria-describedby", `${id}-error`);

  // Mensagem de erro inline
  let errorEl = document.getElementById(`${id}-error`);
  if (!errorEl) {
    errorEl = document.createElement("span");
    errorEl.id        = `${id}-error`;
    errorEl.className = "input-error-msg";
    errorEl.setAttribute("role", "alert");
    input.parentNode?.appendChild(errorEl);
  }
  errorEl.textContent = msg ?? "Campo obrigatório";
  input.focus();
}

function clearInputError(input) {
  if (!input) return;
  input.classList.remove("input-error");
  input.removeAttribute("aria-invalid");
  input.removeAttribute("aria-describedby");
  const errorEl = document.getElementById(`${input.id}-error`);
  if (errorEl) errorEl.textContent = "";
}

function validateStep1() {
  // Limpa erros anteriores
  document.querySelectorAll("#step1 .input-error")
    .forEach(el => clearInputError(el));

  const name  = getInputVal("customerName");
  const phone = getInputVal("customerPhone").replace(/\D/g, "");
  const str   = getInputVal("customerStreet");
  const num   = getInputVal("customerNumber");
  const neigh = getInputVal("customerNeighborhood");

  if (!name) {
    markInputError("customerName", "Informe seu nome completo");
    showToast("Campo obrigatório ⚠️", "Informe seu nome completo", "warn");
    return false;
  }
  if (name.trim().split(/\s+/).length < 2) {
    markInputError("customerName", "Informe nome e sobrenome");
    showToast("Nome inválido ⚠️", "Informe nome e sobrenome", "warn");
    return false;
  }
  if (phone.length < 10 || phone.length > 11) {
    markInputError("customerPhone", "WhatsApp com DDD (ex: 84 99999-9999)");
    showToast("Telefone inválido ⚠️", "Informe um WhatsApp válido com DDD", "warn");
    return false;
  }
  if (!str) {
    markInputError("customerStreet", "Informe o nome da rua");
    showToast("Endereço incompleto ⚠️", "Informe o nome da rua", "warn");
    return false;
  }
  if (!num) {
    markInputError("customerNumber", "Informe o número");
    showToast("Endereço incompleto ⚠️", "Informe o número", "warn");
    return false;
  }
  if (!neigh) {
    markInputError("customerNeighborhood", "Informe o bairro");
    showToast("Endereço incompleto ⚠️", "Informe o bairro", "warn");
    return false;
  }

  return true;
}

// ============================================================
// PAGAMENTO — Step 2
// ============================================================
function getSelectedPayment() {
  return document.querySelector('input[name="payment"]:checked')?.value ?? "pix";
}

function togglePaymentView() {
  const type    = getSelectedPayment();
  const pixSec  = $("pixSection");
  const cashSec = $("cashSection");
  if (pixSec)  pixSec.style.display  = type === "pix"      ? "block" : "none";
  if (cashSec) cashSec.style.display = type === "dinheiro" ? "block" : "none";
}

function toggleChangeField() {
  const val      = document.querySelector('input[name="change"]:checked')?.value;
  const field    = $("changeField");
  if (field) field.style.display = val === "yes" ? "block" : "none";
}

function updatePaymentValues() {
  const v = fmt(getTotal());
  ["paymentTotalDisplay", "pixCardValue", "cartaoCardValue", "dinheiroCardValue"]
    .forEach(id => setText(id, v));
}

// ============================================================
// PIX — Geração de payload e QR Code
// ============================================================
function generatePix() {
  const total = getTotal();
  const fmtV  = fmt(total);

  setText("pixAmount",   fmtV);
  setText("pixKeyValue", fmtV);

  const payload = _buildPixPayload(CONFIG.pix, CONFIG.pixName, CONFIG.pixCity, total);
  const codeEl  = $("pixCode");
  if (codeEl) codeEl.value = payload;

  const qrImg   = $("pixQR");
  const loading = $("pixLoading");
  if (!qrImg || !loading) return;

  loading.style.display = "flex";
  loading.innerHTML     = `<div class="spinner" aria-label="Gerando QR Code..."></div><span>Gerando código...</span>`;
  qrImg.style.display   = "none";
  qrImg.removeAttribute("src");

  const encoded  = encodeURIComponent(payload);
  const primary  = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&ecc=M&margin=8&data=${encoded}`;
  const fallback = `https://quickchart.io/qr?size=200&margin=2&text=${encoded}`;

  let tried = 0;
  qrImg.onload  = () => {
    loading.style.display = "none";
    qrImg.style.display   = "block";
  };
  qrImg.onerror = () => {
    if (tried === 0) {
      tried++;
      qrImg.src = fallback;
    } else {
      loading.innerHTML = `
        <span style="color:var(--text-muted);font-size:11px;text-align:center">
          Use o código Copia e Cola abaixo
        </span>`;
    }
  };
  qrImg.src = primary;
}

function _buildPixPayload(chave, nome, cidade, valor) {
  // Formata chave como telefone E.164
  let key = chave.replace(/\D/g, "");
  if (!key.startsWith("55")) key = "55" + key;
  key = "+" + key;

  const clean = (s) =>
    String(s)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .toUpperCase()
      .trim()
      .slice(0, 25);

  const tlv = (id, val) =>
    String(id).padStart(2, "0") +
    String(val.length).padStart(2, "0") +
    val;

  const mai = tlv("00", "br.gov.bcb.pix") + tlv("01", key);

  const payload =
    tlv("00", "01") +
    tlv("01", "12") +
    tlv("26", mai) +
    tlv("52", "0000") +
    tlv("53", "986") +
    tlv("54", valor.toFixed(2)) +
    tlv("58", "BR") +
    tlv("59", clean(nome)) +
    tlv("60", clean(cidade)) +
    tlv("62", tlv("05", "***")) +
    "6304";

  return payload + _crc16ccitt(payload);
}

function _crc16ccitt(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
      crc &= 0xFFFF;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

// ============================================================
// CLIPBOARD — Copiar código PIX / chave
// ============================================================
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback para browsers sem API moderna
    const ta = document.createElement("textarea");
    ta.value     = text;
    ta.style.cssText = "position:fixed;opacity:0;pointer-events:none;left:-9999px;top:-9999px";
    document.body.appendChild(ta);
    ta.select();
    try   { return document.execCommand("copy"); }
    catch { return false; }
    finally { ta.remove(); }
  }
}

async function copyPixCode() {
  const val = $("pixCode")?.value;
  if (!val) return;
  const ok = await copyToClipboard(val);
  showToast(
    ok ? "Copiado! ✅"    : "Erro ao copiar ❌",
    ok ? "Código PIX copiado com sucesso" : "Não foi possível copiar. Copie manualmente.",
    ok ? "success" : "warn",
  );
}

async function copyPixKey() {
  const val = $("pixKey")?.value;
  if (!val) return;
  const ok = await copyToClipboard(val);
  showToast(
    ok ? "Copiado! ✅"   : "Erro ao copiar ❌",
    ok ? "Chave PIX copiada" : "Não foi possível copiar.",
    ok ? "success" : "warn",
  );
}

// ============================================================
// REVISÃO DO PEDIDO — Step 3
// ============================================================
function buildReview() {
  const subtotal = getSubtotal();
  const total    = getTotal();

  // Itens
  const itemsHTML = State.cart.map(i => {
    const lineTotal = (i.price + i.modifiersTotal) * i.quantity;
    const modsStr   = i.modifiers.length
      ? ` <em class="review-mods">(${escapeHTML(i.modifiers.join(", "))})</em>`
      : "";
    return `
      <div class="review-item">
        <span>${i.quantity}× ${escapeHTML(i.name)}${modsStr}</span>
        <span>${fmt(lineTotal)}</span>
      </div>`;
  }).join("");

  setHTML("reviewItems", itemsHTML);

  // Cliente
  setHTML("reviewCustomer",
    `${escapeHTML(getInputVal("customerName"))}<br>
     <small>${escapeHTML(getInputVal("customerPhone"))}</small>`
  );

  // Endereço
  const addr = [
    `${escapeHTML(getInputVal("customerStreet"))}, ${escapeHTML(getInputVal("customerNumber"))}`,
    escapeHTML(getInputVal("customerNeighborhood")),
  ].join(" — ");
  const comp = getInputVal("customerComplement");
  setHTML("reviewAddress", addr + (comp ? `<br><small>${escapeHTML(comp)}</small>` : ""));

  // Pagamento
  const pay = getSelectedPayment();
  setText("reviewPayment", PAYMENT_LABELS[pay] ?? pay);

  // Valores
  setText("reviewSubtotal", fmt(subtotal));
  setText("reviewDelivery", CONFIG.delivery > 0 ? fmt(CONFIG.delivery) : "Grátis");
  setText("reviewTotal",    fmt(total));
}

// ============================================================
// ENVIAR PEDIDO VIA WHATSAPP
// ============================================================
function sendToWhatsApp() {
  if (!validateStep1()) {
    goToStep(1);
    return;
  }

  const name      = getInputVal("customerName");
  const phone     = getInputVal("customerPhone");
  const street    = getInputVal("customerStreet");
  const number    = getInputVal("customerNumber");
  const neigh     = getInputVal("customerNeighborhood");
  const comp      = getInputVal("customerComplement");
  const pay       = getSelectedPayment();
  const changeOpt = document.querySelector('input[name="change"]:checked')?.value ?? "no";
  const changeAmt = getInputVal("changeAmount");

  const subtotal = getSubtotal();
  const total    = getTotal();
  const now      = new Date().toLocaleString("pt-BR", {
    dateStyle: "short", timeStyle: "short",
  });

  let msg = `👑 *${CONFIG.storeName.toUpperCase()}*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🛒 *NOVO PEDIDO*\n\n`;
  msg += `*📦 ITENS:*\n`;

  State.cart.forEach(i => {
    const lineTotal = (i.price + i.modifiersTotal) * i.quantity;
    msg += `  • ${i.quantity}× ${i.name}`;
    if (i.modifiers.length) msg += ` _(${i.modifiers.join(", ")})_`;
    msg += ` — ${fmt(lineTotal)}\n`;
  });

  msg += `\n━━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 Subtotal: ${fmt(subtotal)}\n`;
  msg += `🛵 Entrega:  ${CONFIG.delivery > 0 ? fmt(CONFIG.delivery) : "Grátis"}\n`;
  msg += `*💵 TOTAL:   ${fmt(total)}*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  msg += `*👤 CLIENTE:*\n  ${name}\n  ${phone}\n\n`;

  msg += `*📍 ENDEREÇO:*\n  ${street}, ${number} — ${neigh}\n`;
  if (comp) msg += `  Complemento: ${comp}\n`;

  const payLabel = PAYMENT_LABELS[pay]?.replace(/[✅💳💵]/g, "").trim() ?? pay;
  msg += `\n*💳 PAGAMENTO:* ${payLabel}\n`;

  if (pay === "dinheiro" && changeOpt === "yes" && changeAmt) {
    msg += `  Troco para: ${changeAmt}\n`;
  }
  if (pay === "pix") {
    msg += `  _Chave PIX: ${CONFIG.pix}_\n`;
    msg += `  _Valor: ${fmt(total)}_\n`;
  }

  msg += `\n━━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `_Pedido realizado em: ${now}_`;

  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener,noreferrer");

  // Limpa estado pós-pedido
  State.cart = [];
  saveCart();
  updateCartUI();
  closeCheckout();
  showToast("Pedido enviado! 🎉", "Aguarde a confirmação pelo WhatsApp", "success");
}

// ============================================================
// TOAST — Sistema de notificações
// ============================================================
const TOAST_ICONS = {
  success: "fa-check-circle",
  warn:    "fa-exclamation-circle",
  error:   "fa-times-circle",
  info:    "fa-info-circle",
};

function showToast(title, message, type = "success") {
  const toast = $("toast");
  if (!toast) return;

  const icon = toast.querySelector(".toast-icon");
  if (icon) {
    icon.className = `toast-icon ${type}`;
    icon.innerHTML = `<i class="fas ${TOAST_ICONS[type] ?? TOAST_ICONS.success}" aria-hidden="true"></i>`;
  }

  setText("toastTitle",   title);
  setText("toastMessage", message);

  toast.setAttribute("role",        "alert");
  toast.setAttribute("aria-live",   "assertive");
  toast.setAttribute("aria-atomic", "true");
  toast.setAttribute("aria-hidden", "false");

  toast.classList.remove("show");
  void toast.offsetWidth;  // reflow para re-trigger
  toast.classList.add("show");

  clearTimeout(State.timers.toast);
  State.timers.toast = setTimeout(() => {
    toast.classList.remove("show");
    toast.setAttribute("aria-hidden", "true");
  }, CONFIG.toastDuration);
}

function closeToast() {
  const toast = $("toast");
  if (!toast) return;
  clearTimeout(State.timers.toast);
  toast.classList.remove("show");
  toast.setAttribute("aria-hidden", "true");
}

// ============================================================
// OVERLAY — Gerenciamento centralizado
// ============================================================
function tryCloseOverlay() {
  const anyOpen =
    $("productModal")?.classList.contains("active")  ||
    $("checkoutModal")?.classList.contains("active") ||
    $("cartSidebar")?.classList.contains("active");

  if (!anyOpen) {
    $("overlay")?.classList.remove("active");
  }
}

function closeAll() {
  if ($("productModal")?.classList.contains("active"))  { closeProductModal(); return; }
  if ($("checkoutModal")?.classList.contains("active")) { closeCheckout();     return; }
  if ($("cartSidebar")?.classList.contains("active"))   { toggleCart();        return; }
  $("overlay")?.classList.remove("active");
}