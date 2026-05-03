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
  { name: "Média", price: 0 },
  { name: "Grande", price: 10 },
  { name: "Gigante", price: 20 },
];

function acaiModifiers(qtd) {
  return [
    {
      name: "Creme", required: true, multiple: false,
      options: [
        { name: "Açaí", price: 0 }, { name: "Avelã", price: 0 },
        { name: "Cupuaçu", price: 0 }, { name: "Ninho", price: 0 },
        { name: "Açaí com Banana", price: 0 }, { name: "Ninho Trufado", price: 0 },
        { name: "Oreo", price: 0 }, { name: "Ovomaltine", price: 0 },
        { name: "Tapioca", price: 0 },
      ],
    },
    {
      name: "Acompanhamentos", required: true, multiple: true,
      minSelect: qtd, maxSelect: qtd,
      description: `Escolha ${qtd} acompanhamento${qtd > 1 ? "s" : ""}`,
      options: [
        { name: "Amendoim", price: 0 }, { name: "Chocobol", price: 0 },
        { name: "Chocopower", price: 0 }, { name: "Confetes", price: 0 },
        { name: "Farinha Láctea", price: 0 }, { name: "Gotas de Chocolate", price: 0 },
        { name: "Granola", price: 0 }, { name: "Granulado", price: 0 },
        { name: "Jujuba", price: 0 }, { name: "Leite em Pó", price: 0 },
        { name: "Ovomaltine", price: 0 }, { name: "Paçoca", price: 0 },
      ],
    },
    {
      name: "Cobertura", required: true, multiple: false,
      options: [
        { name: "Leite Condensado", price: 0 },
        { name: "Chocolate", price: 0 },
        { name: "Morango", price: 0 },
      ],
    },
    {
      name: "Adicionais", required: false, multiple: true, minSelect: 0, maxSelect: 4,
      options: [
        { name: "Cobertura Fini de Dentadura", price: 1 },
        { name: "Cobertura Fini de Banana", price: 1 },
        { name: "Cobertura Fini de Beijos", price: 1 },
        { name: "Nutela", price: 3 },
      ],
    },
  ];
}

const pizzaModifier = { name: "Tamanho", required: true, multiple: false, options: PIZZA_SIZES };

const saborPastelSalgadoModifier = {
  name: "Sabor", required: true, multiple: false,
  options: [
    { name: "Três Queijos", price: 0 }, { name: "Frango com Queijo", price: 1 },
    { name: "Pizza", price: 1 }, { name: "Frango com Catupiry", price: 2 },
    { name: "Frango com Cheddar", price: 2 }, { name: "Frango com Bacon", price: 2 },
    { name: "Carne com Catupiry", price: 3 }, { name: "Carne com Cheddar", price: 3 },
    { name: "Calabresa", price: 3 }, { name: "Carne com Queijo", price: 3 },
    { name: "Carne de Sol na Nata", price: 5 }, { name: "Moda da Casa", price: 6 },
    { name: "Sertanejo", price: 6 },
  ],
};

const saborPastelDoceModifier = {
  name: "Sabor", required: true, multiple: false,
  options: [
    { name: "Chocolate ao Leite", price: 0 },
    { name: "Chocolate ao Leite + Queijo", price: 0 },
    { name: "Chocolate Meio Amargo", price: 0 },
    { name: "Chocolate Meio Amargo + Queijo", price: 0 },
    { name: "Romeu e Julieta", price: 0 },
    { name: "Churros", price: 0 },
  ],
};

const recheioTapiocaModifier = {
  name: "Recheio", required: true, multiple: false,
  options: [
    { name: "Carne de Sol com Catupiry", price: 0 },
    { name: "Carne de Sol com Queijo", price: 0 },
    { name: "Frango com Catupiry", price: 0 },
    { name: "Frango com Queijo", price: 0 },
    { name: "Carne de Sol na Nata", price: 1 },
    { name: "Sertaneja", price: 1 },
  ],
};

const recheiosCuscuzModifier = {
  name: "Recheio", required: true, multiple: false,
  options: [
    { name: "Carne de Sol com Queijo", price: 0 },
    { name: "Frango com Queijo", price: 0 },
    { name: "Calabresa", price: 0 },
    { name: "Carne de Sol na Nata", price: 1 },
  ],
};

const adicionaisCuscuzETapiocaModifier = {
  name: "Adicionais", required: false, multiple: true, minSelect: 0, maxSelect: 7,
  options: [
    { name: "Vinagrete", price: 2 }, { name: "Ovo", price: 2 },
    { name: "Catupiry (requeijão)", price: 2 }, { name: "Cheddar (requeijão)", price: 2 },
    { name: "Queijo Coalho", price: 3 }, { name: "Catupiry (original)", price: 4 },
    { name: "Cheddar (original)", price: 4 },
  ],
};

const saborMassaModifier = {
  name: "Sabor", required: true, multiple: false,
  options: [
    { name: "Cebola e Salsa", price: 0 },
    { name: "Bacon", price: 0 },
    { name: "Queijo", price: 0 },
  ],
};

// ── Cardápio completo ───────────────────────────────────────
const MENU = [
  { id: 1, category: "massas", name: "Massa Gourmet",
    description: "Sabores: Cebola e Salsa, Bacon e Queijo",
    price: 3, image: "imagem/massas.jpg", badge: null, modifiers: [saborMassaModifier] },
  { id: 4, category: "pasteis-salgados", name: "Pastel Salgado",
    description: "Sabores: Três Queijos, Frango com Queijo, Pizza, Frango com Catupiry, Frango com Cheddar, Frango com Bacon, Carne com Catupiry, Carne com Cheddar, Calabresa, Carne com Queijo, Carne de Sol na Nata, Moda da Casa, Sertanejo",
    price: 7, image: "imagem/pastel.jpg", badge: "MAIS PEDIDO", modifiers: [saborPastelSalgadoModifier] },
  { id: 15, category: "pasteis-doces", name: "Pastel Doce",
    description: "Sabores: Chocolate ao Leite, Chocolate Meio Amargo, Romeu e Julieta, Churros",
    price: 10, image: "imagem/pastel.jpg", badge: "DOCE", modifiers: [saborPastelDoceModifier] },
  { id: 19, category: "hamburgueres", name: "X-Burg",
    description: "Pão, hambúrguer, queijo e presunto",
    price: 7, image: "imagem/xburguer.jpg", badge: null, modifiers: [] },
  { id: 20, category: "hamburgueres", name: "Bauru",
    description: "Pão, hambúrguer, alface, tomate, ovo, queijo e presunto",
    price: 8, image: "imagem/bauru.jpg", badge: null, modifiers: [] },
  { id: 21, category: "hamburgueres", name: "X-Bacon",
    description: "Pão, bacon, hambúrguer, ovo, queijo, presunto, alface e tomate",
    price: 10, image: "imagem/xbacon.jpg", badge: "MAIS PEDIDO", modifiers: [] },
  { id: 22, category: "hamburgueres", name: "X-Calabresa",
    description: "Pão, calabresa acebolada, hambúrguer, queijo mussarela, alface e tomate",
    price: 10, image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=400&q=80",
    badge: null, modifiers: [] },
  { id: 23, category: "hamburgueres", name: "X-Tudo",
    description: "Pão, hambúrguer, ovo, bacon, salsicha, frango, presunto, queijo, alface e tomate",
    price: 12, image: "imagem/xtudo.png", badge: "FAVORITO", modifiers: [] },
  { id: 24, category: "hamburgueres", name: "X-Frango com Catupiry",
    description: "Pão, frango, catupiry, ovo, alface e tomate",
    price: 12, image: "https://images.unsplash.com/photo-1596956470007-2bf6095e7e16?w=400&q=80",
    badge: null, modifiers: [] },
  { id: 25, category: "hamburgueres", name: "X-Carne de Sol",
    description: "Pão, carne de sol na nata, ovo, queijo, alface e tomate",
    price: 13, image: "imagem/xcarnesol.jpg", badge: "ESPECIAL", modifiers: [] },
  { id: 26, category: "hamburgueres", name: "Moda da Casa",
    description: "Pão, hambúrguer duplo, ovo, presunto duplo, queijo duplo, bacon, frango, salsicha, catupiry, alface e tomate",
    price: 15, image: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400&q=80",
    badge: "PREMIUM", modifiers: [] },
  { id: 27, category: "hamburgueres-artesanal", name: "X-Cheddar",
    description: "Pão brioche, hambúrguer artesanal (100g), cheddar, bacon, cebola roxa e molho especial",
    price: 18, image: "imagem/xchedar.webp", badge: "ARTESANAL", modifiers: [] },
  { id: 28, category: "hamburgueres-artesanal", name: "Duplo Cheddar",
    description: "Pão brioche, dois hambúrgueres artesanais (100g cada), cheddar, bacon, cebola roxa e molho especial",
    price: 22, image: "imagem/duplochedar.jpg", badge: "PREMIUM", modifiers: [] },
  { id: 29, category: "tapioca", name: "Tapioca",
    description: "Recheios: Carne de Sol com Catupiry, Carne de Sol com Queijo, Frango com Catupiry, Frango com Queijo, Carne de Sol na Nata, Sertaneja",
    price: 8, image: "imagem/tapioca.avif", badge: null,
    modifiers: [recheioTapiocaModifier, adicionaisCuscuzETapiocaModifier] },
  { id: 35, category: "cuscuz", name: "Cuscuz",
    description: "Recheios: Carne de Sol com Queijo, Frango com Queijo, Calabresa, Carne de Sol na Nata",
    price: 8, image: "imagem/cuscuzcalabresa.jpg", badge: null,
    modifiers: [recheiosCuscuzModifier, adicionaisCuscuzETapiocaModifier] },
  { id: 39, category: "cachorro-quente", name: "Tradicional",
    description: "Pão, carne moída, salsicha, frango, batata palha, milho, ervilha e queijo ralado",
    price: 7, image: "imagem/hotdog.webp", badge: null, modifiers: [] },
  { id: 40, category: "cachorro-quente", name: "Carne na Nata",
    description: "Pão, carne de sol na nata, salsicha, milho, ervilha, batata palha e queijo ralado",
    price: 9, image: "imagem/Cachorro-quente-nata.jpg", badge: "ESPECIAL", modifiers: [] },
  { id: 41, category: "petiscos", name: "Batata Frita P",
    description: "Porção pequena de batata frita crocante",
    price: 10, image: "imagem/batata.jpg", badge: null, modifiers: [] },
  { id: 42, category: "petiscos", name: "Batata Frita G",
    description: "Porção grande de batata frita crocante",
    price: 14, image: "imagem/batata.jpg", badge: null, modifiers: [] },
  { id: 43, category: "petiscos", name: "Batata Frita com Bacon e Cheddar",
    description: "Batata frita com bacon crocante e cheddar cremoso",
    price: 20, image: "imagem/batata-bacon-chadar.jpg", badge: "MAIS PEDIDA", modifiers: [] },
  { id: 44, category: "petiscos", name: "Batata Frita com Calabresa e Cheddar",
    description: "Batata frita com calabresa acebolada e cheddar cremoso",
    price: 20, image: "imagem/batata-calabresa-chadar.jpg", badge: null, modifiers: [] },
  { id: 45, category: "milkshake", name: "Milk Shake 300ml",
    description: "Milk shake cremoso 300ml com chantilly",
    price: 13, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80",
    badge: "FAVORITO",
    modifiers: [{ name: "Sabor", required: true, multiple: false, options: [
      { name: "Morango", price: 0 }, { name: "Chocolate", price: 0 },
      { name: "Ovomaltine", price: 0 }, { name: "Chocomenta", price: 0 },
    ]}] },
  { id: 46, category: "sorvete", name: "Sorvete 1 Bola", description: "Sorvete 1 bola",
    price: 3, image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&q=80",
    badge: null, modifiers: [{ name: "Sabor", required: true, multiple: false, options: [
      { name: "Morango", price: 0 }, { name: "Chocolate", price: 0 }, { name: "Chocomenta", price: 0 },
    ]}] },
  { id: 47, category: "pizzas", name: "Pizza Calabresa",
    description: "Calabresa, cebola, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 30, image: "imagem/pizzacalabresa.jpg", badge: null, modifiers: [pizzaModifier] },
  { id: 48, category: "pizzas", name: "Pizza Frango com Bacon",
    description: "Frango desfiado, cebola, bacon, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 30, image: "imagem/pizza-de-frango-com-bacon.png", badge: null, modifiers: [pizzaModifier] },
  { id: 49, category: "pizzas", name: "Pizza Frango com Milho",
    description: "Frango desfiado, cebola, milho verde, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 30, image: "imagem/pizza-de-frangomilho.jpg", badge: null, modifiers: [pizzaModifier] },
  { id: 50, category: "pizzas", name: "Pizza Frango com Catupiry",
    description: "Frango desfiado, catupiry, cebola, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 30, image: "imagem/pizza-de-frango-com-catupiry.webp", badge: null, modifiers: [pizzaModifier] },
  { id: 51, category: "pizzas", name: "Pizza Frango com Cheddar",
    description: "Frango desfiado, cheddar, cebola, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 30, image: "imagem/pizzafrangochedar.jpg", badge: null, modifiers: [pizzaModifier] },
  { id: 52, category: "pizzas", name: "Pizza Frango com Queijo",
    description: "Frango desfiado, cebola, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 30, image: "imagem/pizza-de-frango-queijo.webp", badge: null, modifiers: [pizzaModifier] },
  { id: 53, category: "pizzas", name: "Pizza Moda da Casa",
    description: "Carne de sol desfiada, frango, calabresa, cebola, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 40, image: "imagem/pizzamodadacasa.jpg", badge: "ESPECIAL", modifiers: [pizzaModifier] },
  { id: 54, category: "pizzas", name: "Pizza Carne com Catupiry",
    description: "Carne desfiada, catupiry, cebola, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 35, image: "imagem/pizzacarnedesolcatupiry.webp", badge: null, modifiers: [pizzaModifier] },
  { id: 55, category: "pizzas", name: "Pizza Carne de Sol",
    description: "Carne de sol desfiada, cebola, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 35, image: "imagem/pizzacarnesol.jpg", badge: null, modifiers: [pizzaModifier] },
  { id: 56, category: "pizzas", name: "Pizza Carne com Cheddar",
    description: "Carne desfiada, cheddar, cebola, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 35, image: "imagem/pizza-carne-chedar.webp", badge: null, modifiers: [pizzaModifier] },
  { id: 57, category: "pizzas", name: "Pizza Sertaneja",
    description: "Carne de sol desfiada, cebola, queijo coalho, queijo mussarela, orégano, azeitona e molho de tomate",
    price: 35, image: "imagem/pizza-sertaneja.jpg", badge: null, modifiers: [pizzaModifier] },
  { id: 58, category: "pizzas-doces", name: "Pizza Chocolate com Confetes",
    description: "Chocolate ao leite e confetes",
    price: 30, image: "imagem/pizzachocolatecf.jpg", badge: null, modifiers: [pizzaModifier] },
  { id: 59, category: "pizzas-doces", name: "Pizza Chocolate com Amendoim",
    description: "Chocolate ao leite com amendoim triturado",
    price: 30, image: "imagem/pizzachocolateam.jpg", badge: null, modifiers: [pizzaModifier] },
  { id: 60, category: "pizzas-doces", name: "Pizza Dois Amores",
    description: "Chocolate ao leite e chocolate branco",
    price: 30, image: "imagem/pizzadoisamores.jpg", badge: null, modifiers: [pizzaModifier] },
  { id: 61, category: "pizzas-doces", name: "Pizza Churros",
    description: "Doce de leite, canela e açúcar",
    price: 30, image: "imagem/pizzachurros.jpg", badge: null, modifiers: [pizzaModifier] },
  { id: 62, category: "acai", name: "Açaí 250ml",
    description: "Escolha 1 creme, 5 acompanhamentos, 1 cobertura e adicionais opcionais.",
    price: 10, image: "imagem/açai.jpg", badge: null, modifiers: acaiModifiers(5) },
  { id: 63, category: "acai", name: "Açaí 350ml",
    description: "Escolha 1 creme, 6 acompanhamentos, 1 cobertura e adicionais opcionais.",
    price: 12, image: "imagem/açai.jpg", badge: null, modifiers: acaiModifiers(6) },
  { id: 64, category: "acai", name: "Açaí 500ml",
    description: "Escolha 1 creme, 8 acompanhamentos, 1 cobertura e adicionais opcionais.",
    price: 16, image: "imagem/açai.jpg", badge: null, modifiers: acaiModifiers(8) },
  { id: 65, category: "acai", name: "Açaí 1 Litro",
    description: "Escolha 1 creme, 10 acompanhamentos, 1 cobertura e adicionais opcionais.",
    price: 28, image: "imagem/açai.jpg", badge: "FAMÍLIA", modifiers: acaiModifiers(10) },
  { id: 66, category: "bebidas", name: "Água Mineral",
    description: "Água mineral sem gás 500ml",
    price: 2, image: "imagem/aguamineral.webp", badge: null, modifiers: [] },
  { id: 67, category: "bebidas", name: "Água com Gás",
    description: "Água mineral com gás 500ml",
    price: 3, image: "imagem/aguacomgas.webp", badge: null, modifiers: [] },
  { id: 68, category: "bebidas", name: "Refrigerante Mini",
    description: "Refrigerante mini", price: 2.5, image: "imagem/minirefri.jpg", badge: null, modifiers: [] },
  { id: 69, category: "bebidas", name: "Cerveja", description: "Cerveja long neck",
    price: 5, image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&q=80", badge: null, modifiers: [] },
  { id: 70, category: "bebidas", name: "Guaraná Lata", description: "Guaraná em lata 350ml",
    price: 5, image: "imagem/guaranalata.jpg", badge: null, modifiers: [] },
  { id: 71, category: "bebidas", name: "Fanta Laranja Lata", description: "Fanta laranja em lata 350ml",
    price: 5, image: "imagem/fantalaranjalata.webp", badge: null, modifiers: [] },
  { id: 72, category: "bebidas", name: "Fanta Uva Lata", description: "Fanta uva em lata 350ml",
    price: 5, image: "imagem/fantauva.webp", badge: null, modifiers: [] },
  { id: 73, category: "bebidas", name: "Pepsi Lata", description: "Pepsi em lata 350ml",
    price: 5, image: "imagem/pepsilata.webp", badge: null, modifiers: [] },
  { id: 74, category: "bebidas", name: "Coca-Cola Lata", description: "Coca-Cola em lata 350ml",
    price: 5, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80", badge: null,
    modifiers: [{ name: "Opção", required: true, multiple: false, options: [
      { name: "Original", price: 0 }, { name: "Zero", price: 0 },
    ]}] },
  { id: 75, category: "bebidas", name: "Fanta Laranja 1L", description: "Fanta laranja 1 litro",
    price: 8, image: "imagem/fantalaranja.webp", badge: null, modifiers: [] },
  { id: 76, category: "bebidas", name: "Pepsi 1L", description: "Pepsi 1 litro",
    price: 8, image: "imagem/pepsi.jpg", badge: null, modifiers: [] },
  { id: 77, category: "bebidas", name: "Guaraná 1L", description: "Guaraná 1 litro",
    price: 8, image: "imagem/guarana.webp", badge: null, modifiers: [] },
  { id: 78, category: "bebidas", name: "Coca-Cola Original 1L", description: "Coca-Cola original 1 litro",
    price: 10, image: "imagem/cocacola.webp", badge: null, modifiers: [] },
  { id: 79, category: "bebidas", name: "Energético", description: "Energético",
    price: 12, image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=400&q=80", badge: null, modifiers: [] },
  { id: 80, category: "sucos", name: "Suco Natural",
    description: "Sabores: Goiaba, Acerola, Cajá, Caju, Maracujá, Mangaba, Uva, Graviola, Morango, Abacaxi com hortelã",
    price: 4, image: "imagem/suco.jpg", badge: null,
    modifiers: [
      { name: "Base", required: true, multiple: false, options: [
        { name: "Água", price: 0 }, { name: "Leite", price: 1 },
        { name: "Litro na água", price: 11 }, { name: "Litro no leite", price: 16 },
      ]},
      { name: "Sabor", required: true, multiple: false,
        options: ["Goiaba","Acerola","Cajá","Caju","Maracujá","Mangaba","Uva","Graviola","Morango","Abacaxi com hortelã"]
          .map(n => ({ name: n, price: 0 })) },
    ] },
];

// ============================================================
// CONFIGURAÇÕES
// ============================================================
const CONFIG = Object.freeze({
  whatsapp: "5584994994919", pix: "84994994919",
  pixName: "EMANUEL", pixCity: "NATAL",
  delivery: 0.0, storeName: "Império Lanches",
  maxCartItemQty: 99, toastDuration: 3200,
  searchDebounceMs: 220, scrollRevealDelay: 40,
  scrollRevealMaxDelay: 300, cartStorageKey: "imperio_cart_v3",
});

const HORARIO = Object.freeze({
  abertura: "00:00", fechamento: "24:00", fechadoDomingo: false,
});

const FALLBACK_IMG = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80";

const PAYMENT_LABELS = Object.freeze({
  pix: "PIX ✅", cartao: "Cartão 💳", dinheiro: "Dinheiro 💵",
});

const ADMIN_CONFIG = Object.freeze({
  storageKey: "imperio_admin_orders_v3",
  stockKey: "imperio_stock_v4",
  password: "imperio2024",
  maxDaysHistory: 90,
});

// ── GitHub Sync Config ───────────────────────────────────────
// O token NUNCA fica aqui — é digitado pelo admin no painel
const GITHUB_CONFIG = {
  repo: "https://github.com/victor-manel/imperio-estoque/blob/main/estoque.json", // ALTERE AQUI
  branch: "main",
  file: "estoque.json",
  pollInterval: 15000,
  token: "", // Preenchido pelo admin no painel — não altere
  get rawUrl() {
    return `https://raw.githubusercontent.com/${this.repo}/${this.branch}/${this.file}?nocache=${Date.now()}`;
  },
  get apiUrl() {
    return `https://api.github.com/repos/${this.repo}/contents/${this.file}`;
  },
};

// ============================================================
// ESTADO PRINCIPAL
// ============================================================
const State = {
  cart: [], currentCategory: "todos",
  modal: { product: null, qty: 1, modifiers: {} },
  checkoutStep: 1, lojaAberta: true, lastFocused: null,
  timers: { search: null, toast: null, horario: null },
  observers: { reveal: null }, _menuIndex: null,
};

const AdminState = {
  orders: [], isAuthenticated: false,
  currentView: "today", selectedDate: null,
  outProducts: new Set(),
  outOptions: new Map(),
};

// ============================================================
// ESTOQUE — Sistema granular
// ============================================================
function loadStock() {
  try {
    const raw = localStorage.getItem(ADMIN_CONFIG.stockKey);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data.products && Array.isArray(data.products)) {
      AdminState.outProducts = new Set(data.products);
    }
    if (data.options && Array.isArray(data.options)) {
      AdminState.outOptions = new Map(data.options.map(k => [k, true]));
    }
  } catch {
    AdminState.outProducts = new Set();
    AdminState.outOptions = new Map();
  }
}

function saveStock() {
  try {
    const data = {
      products: [...AdminState.outProducts],
      options: [...AdminState.outOptions.keys()],
    };
    localStorage.setItem(ADMIN_CONFIG.stockKey, JSON.stringify(data));
  } catch {}
}

function isProductOut(productId) {
  return AdminState.outProducts.has(productId);
}

function optionKey(productId, modIdx, optIdx) {
  return `${productId}:${modIdx}:${optIdx}`;
}

function isOptionOut(productId, modIdx, optIdx) {
  return AdminState.outOptions.has(optionKey(productId, modIdx, optIdx));
}

function isProductEffectivelyOut(productId) {
  if (AdminState.outProducts.has(productId)) return true;
  const p = findProduct(productId);
  if (!p || !p.modifiers?.length) return false;
  for (let mi = 0; mi < p.modifiers.length; mi++) {
    const mod = p.modifiers[mi];
    if (!mod.required) continue;
    const allOut = mod.options.every((_, oi) => isOptionOut(productId, mi, oi));
    if (allOut && mod.options.length > 0) return true;
  }
  return false;
}

function countOutOfStock() {
  return AdminState.outProducts.size + AdminState.outOptions.size;
}

function toggleProductStock(productId) {
  if (AdminState.outProducts.has(productId)) {
    AdminState.outProducts.delete(productId);
  } else {
    AdminState.outProducts.add(productId);
    for (const key of AdminState.outOptions.keys()) {
      if (key.startsWith(`${productId}:`)) AdminState.outOptions.delete(key);
    }
  }
}

function toggleOptionStock(productId, modIdx, optIdx) {
  const key = optionKey(productId, modIdx, optIdx);
  if (AdminState.outOptions.has(key)) {
    AdminState.outOptions.delete(key);
  } else {
    AdminState.outOptions.set(key, true);
  }
}

// ============================================================
// GITHUB SYNC — Sincroniza estoque com todos os usuários
// ============================================================
let _githubPollTimer = null;
let _lastGithubData = "";
let _isSyncing = false;

/** Carrega configuração salva do admin */
function loadGithubConfig() {
  try {
    const saved = JSON.parse(localStorage.getItem("imperio_gh_cfg") || "{}");
    if (saved.repo)  GITHUB_CONFIG.repo  = saved.repo;
    if (saved.token) GITHUB_CONFIG.token = saved.token;
  } catch {}
}

/** Salva configuração do admin */
function saveGithubConfig() {
  try {
    localStorage.setItem("imperio_gh_cfg", JSON.stringify({
      repo:  GITHUB_CONFIG.repo,
      token: GITHUB_CONFIG.token,
    }));
  } catch {}
}

/** Aplica dados do GitHub no estado local */
function applyGithubStock(data) {
  const newProducts = new Set(data.products || []);
  const newOptions  = new Set(data.options  || []);

  const pChanged = JSON.stringify([...AdminState.outProducts].sort()) !==
                   JSON.stringify([...newProducts].sort());
  const oChanged = JSON.stringify([...AdminState.outOptions.keys()].sort()) !==
                   JSON.stringify([...newOptions].sort());

  if (!pChanged && !oChanged) return false; // nada mudou

  AdminState.outProducts = newProducts;
  AdminState.outOptions  = new Map();
  newOptions.forEach(k => AdminState.outOptions.set(k, true));

  // Salva no localStorage local também
  saveStock();
  return true;
}

/** Busca estoque do GitHub (apenas leitura — sem token) */
async function fetchStockFromGithub() {
  if (_isSyncing) return;
  _isSyncing = true;

  try {
    const res = await fetch(GITHUB_CONFIG.rawUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const text = await res.text();
    if (text === _lastGithubData) {
      _isSyncing = false;
      return; // Sem mudanças
    }

    _lastGithubData = text;
    const data = JSON.parse(text);
    const changed = applyGithubStock(data);

    if (changed) {
      console.log("[GitHub] Estoque atualizado remotamente");
      purgeOutOfStockFromCart();
      renderMenu();

      const adminModal = document.getElementById("adminModal");
      if (adminModal?.classList.contains("active") && AdminState.currentView === "stock") {
        renderAdminDashboard();
      }
    }

  } catch (err) {
    console.warn("[GitHub] Falha ao buscar estoque:", err.message);
  } finally {
    _isSyncing = false;
  }
}

/** Envia estoque atualizado para o GitHub */
async function pushStockToGithub() {
  if (!GITHUB_CONFIG.token) {
    showToast("Token não configurado ⚠️", "Configure o token GitHub no painel admin", "warn");
    return false;
  }

  try {
    // 1. Busca SHA atual do arquivo
    const getRes = await fetch(GITHUB_CONFIG.apiUrl, {
      headers: {
        "Authorization": `token ${GITHUB_CONFIG.token}`,
        "Accept": "application/vnd.github.v3+json",
      },
    });
    if (!getRes.ok) throw new Error(`Erro ao buscar SHA: ${getRes.status}`);
    const fileInfo = await getRes.json();
    const sha = fileInfo.sha;

    // 2. Prepara conteúdo
    const content = {
      products:    [...AdminState.outProducts],
      options:     [...AdminState.outOptions.keys()],
      updated_at:  new Date().toISOString(),
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2))));

    // 3. Envia
    const putRes = await fetch(GITHUB_CONFIG.apiUrl, {
      method: "PUT",
      headers: {
        "Authorization": `token ${GITHUB_CONFIG.token}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `estoque: ${new Date().toLocaleString("pt-BR")}`,
        content: encoded,
        sha: sha,
        branch: GITHUB_CONFIG.branch,
      }),
    });

    if (!putRes.ok) throw new Error(`Erro ao salvar: ${putRes.status}`);

    _lastGithubData = JSON.stringify(content);
    console.log("[GitHub] Estoque salvo com sucesso!");
    return true;

  } catch (err) {
    console.error("[GitHub] Erro ao salvar:", err);
    showToast("Erro ao salvar ❌", err.message, "warn");
    return false;
  }
}

/** Inicia polling do GitHub */
function startGithubPolling() {
  stopGithubPolling();
  fetchStockFromGithub();
  _githubPollTimer = setInterval(fetchStockFromGithub, GITHUB_CONFIG.pollInterval);
  console.log(`[GitHub] Polling ativo — a cada ${GITHUB_CONFIG.pollInterval / 1000}s`);
}

function stopGithubPolling() {
  if (_githubPollTimer) { clearInterval(_githubPollTimer); _githubPollTimer = null; }
}

// ============================================================
// ÍNDICE DO MENU
// ============================================================
function getMenuIndex() {
  if (!State._menuIndex) State._menuIndex = new Map(MENU.map(p => [p.id, p]));
  return State._menuIndex;
}
function findProduct(id) { return getMenuIndex().get(id) ?? null; }

// ============================================================
// ATALHOS DOM
// ============================================================
const _domCache = new Map();
function $(id) {
  if (_domCache.has(id)) return _domCache.get(id);
  const el = document.getElementById(id);
  if (el) _domCache.set(id, el);
  return el;
}
function setText(id, val) { const el = $(id); if (el) el.textContent = val; }
function setHTML(id, val) { const el = $(id); if (el) el.innerHTML = val; }

// ============================================================
// UTILITÁRIOS
// ============================================================
const fmt = v => `R$ ${Number(v).toFixed(2).replace(".", ",")}`;

function escapeHTML(s) {
  return String(s)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#039;");
}

function normalizeSearch(s) {
  return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
}

const clamp = (v, mn, mx) => Math.min(Math.max(v, mn), mx);
function getSubtotal() { return State.cart.reduce((s,i) => s + (i.price + i.modifiersTotal) * i.quantity, 0); }
function getTotal() { return getSubtotal() + CONFIG.delivery; }
function handleImgError(img) { if (img.src !== FALLBACK_IMG && !img.dataset.retried) { img.dataset.retried = "1"; img.src = FALLBACK_IMG; } }
function cartItemKey(pid, mods) { return `${pid}||${mods.join(",")}`; }
function plural(n, s, p) { return `${n} ${n === 1 ? s : p}`; }
function _dateKey(d) { const dt = d instanceof Date ? d : new Date(d); return dt.toISOString().slice(0,10); }
function _formatDate(s) { const [y,m,d] = s.split("-"); return `${d}/${m}/${y}`; }
function _weekDay(s) { return new Date(s + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "long" }); }

// ============================================================
// HORÁRIO
// ============================================================
function verificarHorario() {
  const now = new Date(), dia = now.getDay();
  const minNow = now.getHours() * 60 + now.getMinutes();
  const [hA,mA] = HORARIO.abertura.split(":").map(Number);
  const [hF,mF] = HORARIO.fechamento.split(":").map(Number);
  let aberto = minNow >= hA*60+mA && minNow < hF*60+mF;
  if (HORARIO.fechadoDomingo && dia === 0) aberto = false;
  State.lojaAberta = aberto;
  const badge = $("status-loja"); if (!badge) return;
  badge.className = `status-badge ${aberto ? "aberto" : "fechado"}`;
  const label = badge.querySelector("#status-label");
  if (label) label.textContent = aberto ? "Aberto agora" : "Fechado";
  document.body.classList.toggle("loja-fechada", !aberto);
}

// ============================================================
// PRELOADER
// ============================================================
window.addEventListener("load", () => {
  const p = $("preloader"); if (!p) return;
  setTimeout(() => {
    p.classList.add("hide");
    p.addEventListener("transitionend", () => p.remove(), { once: true });
  }, 1400);
});

// ============================================================
// SCROLL REVEAL
// ============================================================
function initScrollReveal() {
  if (State.observers.reveal) State.observers.reveal.disconnect();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".product-card:not(.revealed)").forEach(c => c.classList.add("revealed"));
    return;
  }
  State.observers.reveal = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const c = e.target, g = c.closest(".products-grid");
      let d = 0;
      if (g) d = clamp(Array.from(g.children).indexOf(c) * CONFIG.scrollRevealDelay, 0, CONFIG.scrollRevealMaxDelay);
      if (d > 0) setTimeout(() => c.classList.add("revealed"), d);
      else c.classList.add("revealed");
      State.observers.reveal.unobserve(c);
    });
  }, { threshold: 0.03, rootMargin: "0px 0px 40px 0px" });
  document.querySelectorAll(".product-card:not(.revealed)").forEach(c => State.observers.reveal.observe(c));
}

// ============================================================
// SCROLL
// ============================================================
function handleScroll() {
  const y = window.scrollY;
  $("header")?.classList.toggle("scrolled", y > 50);
  $("backToTop")?.classList.toggle("visible", y > 400);
}
function scrollToTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  verificarHorario();
  State.timers.horario = setInterval(verificarHorario, 60_000);

  loadGithubConfig();
  loadStock();
  purgeOutOfStockFromCart();
  renderCategories();
  renderMenu();
  loadCart();
  _setupEventListeners();
  _createAdminFooter();
  startGithubPolling();

  requestAnimationFrame(() => requestAnimationFrame(initScrollReveal));
});

// ============================================================
// EVENT LISTENERS
// ============================================================
function _setupEventListeners() {
  window.addEventListener("scroll", handleScroll, { passive: true });
  const pi = $("customerPhone"); if (pi) pi.addEventListener("input", _maskPhone);
  document.querySelectorAll("#step1 input").forEach(i => i.addEventListener("input", () => clearInputError(i)));
  const cb = $("cartBar");
  if (cb) cb.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCart(); } });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeAll(); });
  const mm = $("modalModifiers"); if (mm) mm.addEventListener("change", _onModifierChange);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") fetchStockFromGithub(); });
  window.addEventListener("focus", fetchStockFromGithub);
}

// ============================================================
// MÁSCARA TELEFONE
// ============================================================
function _maskPhone() {
  let v = this.value.replace(/\D/g, "").slice(0, 11);
  if (v.length > 10) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
  else if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,6)}-${v.slice(6)}`;
  else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
  else if (v.length > 0) v = `(${v}`;
  this.value = v; clearInputError(this);
}

// ============================================================
// CHECKBOXES
// ============================================================
function _onModifierChange(e) {
  const input = e.target;
  if (input.type !== "checkbox" || !input.dataset.modifierIndex) return;
  const mi = parseInt(input.dataset.modifierIndex, 10);
  const max = parseInt(input.dataset.maxSelect || "0", 10);
  if (max > 0 && input.checked) {
    const checked = document.querySelectorAll(`#modalModifiers input[type="checkbox"][data-modifier-index="${mi}"]:checked`);
    if (checked.length > max) {
      input.checked = false;
      showToast("Limite atingido ⚠️", `Máximo de ${plural(max, "opção", "opções")} neste grupo.`, "warn");
      return;
    }
  }
  syncCheckboxModifier(mi); updateModalPrice();
}

// ============================================================
// CATEGORIAS
// ============================================================
function renderCategories() {
  const nav = $("categoryNav"); if (!nav) return;
  const f = document.createDocumentFragment();
  CATEGORIES.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `cat-link${cat.id === State.currentCategory ? " active" : ""}`;
    btn.dataset.cat = cat.id;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", String(cat.id === State.currentCategory));
    btn.innerHTML = `${cat.icon} ${escapeHTML(cat.name)}`;
    btn.addEventListener("click", () => filterCategory(cat.id, btn));
    f.appendChild(btn);
  });
  nav.innerHTML = ""; nav.appendChild(f);
}

function filterCategory(id, el) {
  State.currentCategory = id;
  document.querySelectorAll(".cat-link").forEach(b => { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
  if (el) { el.classList.add("active"); el.setAttribute("aria-selected", "true"); el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }); }
  const inp = $("searchInput"); if (inp?.value) { inp.value = ""; $("searchClear")?.classList.remove("visible"); }
  renderMenu();
  if (id !== "todos") requestAnimationFrame(() => {
    const t = $(`cat-${id}`); if (!t) return;
    const hH = $("header")?.offsetHeight ?? 175;
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - hH - 8, behavior: "smooth" });
  });
}

// ============================================================
// MENU
// ============================================================
const ORDERED_CATS = CATEGORIES.map(c => c.id).filter(id => id !== "todos");
function groupItems(items) { const g = {}; for (const i of items) (g[i.category] ??= []).push(i); return g; }

function renderMenu() {
  const container = $("menuContainer"); if (!container) return;
  const items = State.currentCategory === "todos" ? MENU : MENU.filter(i => i.category === State.currentCategory);
  if (!items.length) { container.innerHTML = _emptySearchHTML("Nenhum item nesta categoria"); return; }
  const grouped = groupItems(items), f = document.createDocumentFragment();
  ORDERED_CATS.filter(id => grouped[id]).forEach(catId => {
    const cat = CATEGORIES.find(c => c.id === catId);
    const s = document.createElement("section");
    s.className = "category-section"; s.id = `cat-${catId}`;
    s.innerHTML = `<div class="section-header"><div class="section-icon">${cat?.icon ?? "🍽️"}</div><h2 class="section-title">${escapeHTML(cat?.name ?? catId)}</h2></div><div class="products-grid">${grouped[catId].map(renderCard).join("")}</div>`;
    f.appendChild(s);
  });
  container.innerHTML = ""; container.appendChild(f);
  requestAnimationFrame(initScrollReveal);
}

function renderCard(p) {
  const outFull = isProductEffectivelyOut(p.id);
  const hasRequired = p.modifiers?.some(m => m.required);
  const priceStr = fmt(p.price);
  let optOutCount = 0;
  if (!outFull && p.modifiers?.length) {
    p.modifiers.forEach((mod, mi) => mod.options.forEach((_, oi) => { if (isOptionOut(p.id, mi, oi)) optOutCount++; }));
  }
  const quickAddAction = hasRequired ? `openProductModal(${p.id})` : `quickAdd(${p.id})`;
  const quickAddIcon = hasRequired ? "fa-sliders-h" : "fa-plus";
  const cardClass = `product-card${outFull ? " out-of-stock" : ""}`;
  const onclickCard = outFull ? `showToast('Indisponível 😔','${escapeHTML(p.name)} está esgotado','warn')` : `openProductModal(${p.id})`;
  const onclickBtn = outFull ? `event.stopPropagation();showToast('Indisponível 😔','${escapeHTML(p.name)} está esgotado','warn')` : `event.stopPropagation();${quickAddAction}`;
  let badgeHTML = "";
  if (outFull) badgeHTML = `<div class="product-badge badge-out-of-stock">ESGOTADO</div>`;
  else if (optOutCount > 0) badgeHTML = `<div class="product-badge badge-partial-out">${optOutCount} em falta</div>`;
  else if (p.badge) badgeHTML = `<div class="product-badge">${escapeHTML(p.badge)}</div>`;
  return `<article class="${cardClass}" role="button" tabindex="0" onclick="${onclickCard}" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();${onclickCard}}"><div class="product-image"><img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy" decoding="async" onerror="handleImgError(this)">${badgeHTML}${outFull ? `<div class="out-of-stock-overlay"><i class="fas fa-ban"></i></div>` : ""}</div><div class="product-info"><h3 class="product-name">${escapeHTML(p.name)}</h3><p class="product-desc">${escapeHTML(p.description)}</p><div class="product-footer"><span class="product-price">${priceStr}</span><button class="btn-add-quick${outFull ? " btn-disabled" : ""}" onclick="${onclickBtn}" ${outFull ? 'aria-disabled="true"' : ""}><i class="fas ${outFull ? "fa-ban" : quickAddIcon}"></i></button></div></div></article>`;
}

function _emptySearchHTML(msg = "Nenhum resultado", q = "") {
  return `<div class="empty-search" role="status"><div class="empty-search-icon">🔍</div><h3>${escapeHTML(msg)}</h3>${q ? `<p>Tente outro termo.</p>` : ""}</div>`;
}

// ============================================================
// BUSCA
// ============================================================
function searchMenu() { clearTimeout(State.timers.search); State.timers.search = setTimeout(doSearch, CONFIG.searchDebounceMs); }

function doSearch() {
  const rq = $("searchInput")?.value ?? "", q = normalizeSearch(rq);
  const cb = $("searchClear"); if (cb) cb.classList.toggle("visible", q.length > 0);
  const c = $("menuContainer"); if (!c) return;
  if (!q) { renderMenu(); return; }
  const filtered = MENU.filter(i => normalizeSearch(i.name).includes(q) || normalizeSearch(i.description).includes(q) || i.modifiers?.some(m => m.options?.some(o => normalizeSearch(o.name).includes(q))));
  if (!filtered.length) { c.innerHTML = _emptySearchHTML(`Nenhum resultado para "${escapeHTML(rq)}"`, rq); return; }
  const grouped = groupItems(filtered), f = document.createDocumentFragment();
  ORDERED_CATS.filter(id => grouped[id]).forEach(catId => {
    const cat = CATEGORIES.find(cc => cc.id === catId);
    const s = document.createElement("section"); s.className = "category-section"; s.id = `cat-${catId}`;
    s.innerHTML = `<div class="section-header"><div class="section-icon">${cat?.icon ?? "🍽️"}</div><h2 class="section-title">${escapeHTML(cat?.name ?? catId)}</h2></div><div class="products-grid">${grouped[catId].map(renderCard).join("")}</div>`;
    f.appendChild(s);
  });
  c.innerHTML = ""; c.appendChild(f); requestAnimationFrame(initScrollReveal);
}

function clearSearch() { const i = $("searchInput"); if (i) i.value = ""; $("searchClear")?.classList.remove("visible"); renderMenu(); i?.focus(); }

function isClosed() {
  if (!State.lojaAberta) { showToast("Fechado 🔒", "Estamos fechados. Volte em breve!", "warn"); return true; }
  return false;
}

// ============================================================
// MODAL DO PRODUTO
// ============================================================
function openProductModal(productId) {
  if (isClosed()) return;
  if (isProductEffectivelyOut(productId)) {
    const p = findProduct(productId);
    showToast("Indisponível 😔", `${p?.name ?? "Produto"} está esgotado`, "warn");
    return;
  }
  const p = findProduct(productId); if (!p) return;
  State.lastFocused = document.activeElement;
  State.modal.product = p; State.modal.qty = 1; State.modal.modifiers = {};
  const modal = $("productModal"); if (!modal) return;
  const img = $("modalImg"); img.alt = p.name; img.src = ""; img.onerror = () => handleImgError(img); img.src = p.image;
  const badge = $("modalBadge"); if (badge) { badge.textContent = p.badge ?? ""; badge.style.display = p.badge ? "block" : "none"; }
  const cat = CATEGORIES.find(c => c.id === p.category);
  setText("modalCategory", cat?.name ?? ""); setText("modalTitle", p.name);
  setText("modalDescription", p.description); setText("modalQty", State.modal.qty);
  renderModifiers(p); updateModalPrice();
  document.querySelectorAll(".modifier-group").forEach(g => g.classList.remove("filled", "error"));
  modal.classList.add("active"); modal.setAttribute("aria-hidden", "false");
  $("overlay")?.classList.add("active"); document.body.style.overflow = "hidden";
  requestAnimationFrame(() => modal.querySelector(".modal-close")?.focus());
}

function closeProductModal() {
  const modal = $("productModal"); if (!modal?.classList.contains("active")) return;
  modal.classList.remove("active"); modal.setAttribute("aria-hidden", "true");
  tryCloseOverlay(); document.body.style.overflow = "";
  State.lastFocused?.focus(); State.lastFocused = null;
}

function _updateGroupProgress(mi) {
  const group = $(`modGroup-${mi}`); if (!group) return;
  const mod = State.modal.product?.modifiers[mi]; if (!mod) return;
  const selected = State.modal.modifiers[mi] ?? [], count = selected.length;
  if (!mod.required) { group.classList.toggle("filled", count > 0); return; }
  const min = mod.multiple ? (mod.minSelect ?? 1) : 1;
  group.classList.toggle("filled", count >= min); group.classList.remove("error");
}

function renderModifiers(p) {
  const container = $("modalModifiers"); if (!container) return;
  if (!p.modifiers?.length) { container.innerHTML = ""; return; }
  const f = document.createDocumentFragment();
  p.modifiers.forEach((mod, mi) => {
    const isMultiple = !!mod.multiple, title = mod.description || mod.name;
    const group = document.createElement("div"); group.className = "modifier-group"; group.id = `modGroup-${mi}`;
    const titleEl = document.createElement("div"); titleEl.className = "modifier-title"; titleEl.id = `modTitle-${mi}`;
    const reqMark = mod.required ? `<i class="fas fa-asterisk" style="color:var(--primary);font-size:8px;vertical-align:middle"></i> ` : "";
    const reqLabel = mod.required ? `<span class="mod-req-label">(obrigatório)</span>` : "";
    const limitLabel = isMultiple && mod.maxSelect ? `<span class="mod-limit-label"> — escolha ${mod.maxSelect === mod.minSelect ? plural(mod.maxSelect, "opção", "opções") : `até ${plural(mod.maxSelect, "opção", "opções")}`}</span>` : "";
    titleEl.innerHTML = `${reqMark}${escapeHTML(title)}${reqLabel}${limitLabel}`;
    let counterEl = null;
    if (isMultiple && mod.maxSelect) { counterEl = document.createElement("div"); counterEl.className = "mod-counter"; counterEl.id = `modCounter-${mi}`; counterEl.textContent = `0 / ${mod.maxSelect}`; }
    const optC = document.createElement("div"); optC.className = "modifier-options"; optC.setAttribute("role", isMultiple ? "group" : "radiogroup"); optC.setAttribute("aria-labelledby", `modTitle-${mi}`);
    mod.options.forEach((opt, oi) => {
      const optOut = isOptionOut(p.id, mi, oi);
      const label = document.createElement("label"); label.className = `modifier-option${optOut ? " option-out-of-stock" : ""}`;
      const input = document.createElement("input"); input.name = `mod-${mi}`; input.value = String(oi);
      input.dataset.modifierIndex = String(mi); input.dataset.optionIndex = String(oi);
      if (optOut) { input.disabled = true; label.setAttribute("title", "Indisponível no momento"); }
      if (isMultiple) { input.type = "checkbox"; input.dataset.maxSelect = String(mod.maxSelect ?? 0); }
      else { input.type = "radio"; if (!optOut) input.addEventListener("change", () => selectModifier(mi, oi, opt.name, opt.price ?? 0)); }
      const content = document.createElement("div"); content.className = "option-content";
      content.innerHTML = `<span class="option-name">${escapeHTML(opt.name)}${optOut ? ` <span class="option-out-tag">Em falta</span>` : ""}</span>${opt.price > 0 && !optOut ? `<span class="option-price">+${fmt(opt.price)}</span>` : ""}`;
      label.appendChild(input); label.appendChild(content); optC.appendChild(label);
    });
    group.appendChild(titleEl); if (counterEl) group.appendChild(counterEl); group.appendChild(optC); f.appendChild(group);
  });
  container.innerHTML = ""; container.appendChild(f);
}

function selectModifier(mi, oi, name, price) {
  State.modal.modifiers[mi] = [{ oi, name, price }];
  document.querySelectorAll(`input[name="mod-${mi}"]`).forEach((inp, idx) => inp.closest(".modifier-option")?.classList.toggle("selected", idx === oi));
  _updateGroupProgress(mi); updateModalPrice();
}

function syncCheckboxModifier(mi) {
  const mod = State.modal.product?.modifiers[mi]; if (!mod) return;
  const checked = document.querySelectorAll(`#modalModifiers input[type="checkbox"][data-modifier-index="${mi}"]:checked`);
  State.modal.modifiers[mi] = Array.from(checked).map(inp => { const oi = parseInt(inp.dataset.optionIndex, 10); const opt = mod.options[oi]; return { oi, name: opt.name, price: opt.price ?? 0 }; });
  document.querySelectorAll(`#modalModifiers input[data-modifier-index="${mi}"]`).forEach(inp => inp.closest(".modifier-option")?.classList.toggle("selected", inp.checked));
  const counter = $(`modCounter-${mi}`);
  if (counter) { const c = State.modal.modifiers[mi]?.length ?? 0; counter.textContent = `${c} / ${mod.maxSelect}`; counter.classList.toggle("counter-full", mod.maxSelect > 0 && c >= mod.maxSelect); }
  _updateGroupProgress(mi);
}

function updateModalQty(delta) { State.modal.qty = clamp(State.modal.qty + delta, 1, CONFIG.maxCartItemQty); setText("modalQty", State.modal.qty); updateModalPrice(); }
function updateModalPrice() {
  if (!State.modal.product) return;
  const mt = Object.values(State.modal.modifiers).flat().reduce((s, m) => s + (m.price ?? 0), 0);
  const unit = State.modal.product.price + mt;
  setText("modalPrice", fmt(unit)); setText("modalTotal", fmt(unit * State.modal.qty));
}
function _calcModsTotal() { return Object.values(State.modal.modifiers).flat().reduce((s, m) => s + (m.price ?? 0), 0); }

// ============================================================
// ADICIONAR AO CARRINHO
// ============================================================
function addToCartFromModal() {
  const p = State.modal.product; if (!p) return;
  for (let mi = 0; mi < p.modifiers.length; mi++) {
    const mod = p.modifiers[mi], sel = State.modal.modifiers[mi] ?? [];
    if (!mod.required) continue;
    if (mod.multiple) { const need = mod.minSelect ?? 1; if (sel.length < need) { _highlightGroupError(mi); showToast("Atenção ⚠️", `Escolha ${plural(need, "opção", "opções")} em: ${mod.name}`, "warn"); return; } }
    else { if (!sel.length) { _highlightGroupError(mi); showToast("Atenção ⚠️", `Selecione uma opção em: ${mod.name}`, "warn"); return; } }
  }
  const modsList = Object.values(State.modal.modifiers).flat().map(m => m.name);
  const modsTotal = _calcModsTotal(), key = cartItemKey(p.id, modsList);
  const existing = State.cart.find(i => cartItemKey(i.productId, i.modifiers) === key);
  if (existing) existing.quantity = clamp(existing.quantity + State.modal.qty, 1, CONFIG.maxCartItemQty);
  else State.cart.push({ productId: p.id, name: p.name, price: p.price, image: p.image, quantity: State.modal.qty, modifiers: modsList, modifiersTotal: modsTotal });
  saveCart(); updateCartUI(); closeProductModal();
  showToast("Adicionado! 🎉", `${p.name} adicionado à sacola`);
}

function _highlightGroupError(mi) {
  const g = $(`modGroup-${mi}`); if (!g) return;
  g.classList.add("error"); g.scrollIntoView({ behavior: "smooth", block: "nearest" });
  g.addEventListener("change", () => g.classList.remove("error"), { once: true });
}

function quickAdd(productId) {
  if (isClosed()) return;
  if (isProductEffectivelyOut(productId)) { const p = findProduct(productId); showToast("Indisponível 😔", `${p?.name ?? "Produto"} está esgotado`, "warn"); return; }
  const p = findProduct(productId); if (!p) return;
  if (p.modifiers?.some(m => m.required)) { openProductModal(productId); return; }
  const key = cartItemKey(p.id, []), existing = State.cart.find(i => cartItemKey(i.productId, i.modifiers) === key);
  if (existing) existing.quantity = clamp(existing.quantity + 1, 1, CONFIG.maxCartItemQty);
  else State.cart.push({ productId: p.id, name: p.name, price: p.price, image: p.image, quantity: 1, modifiers: [], modifiersTotal: 0 });
  saveCart(); updateCartUI(); showToast("Adicionado! 🎉", `${p.name} adicionado à sacola`);
}

// ============================================================
// CARRINHO
// ============================================================
function updateCartUI() {
  const tq = State.cart.reduce((s, i) => s + i.quantity, 0);
  const sub = getSubtotal(), total = getTotal();
  const badge = $("cartBadge");
  if (badge) { badge.textContent = tq; badge.classList.remove("pop"); void badge.offsetWidth; badge.classList.add("pop"); }
  setText("cartBarQty", tq); setText("cartBarTotal", fmt(total));
  const bar = $("cartBar"); if (bar) bar.style.display = tq > 0 ? "flex" : "none";
  const empty = $("cartEmpty"), items = $("cartItems"), footer = $("cartFooter");
  if (!State.cart.length) { if (empty) empty.style.display = "block"; if (items) items.innerHTML = ""; if (footer) footer.style.display = "none"; }
  else { if (empty) empty.style.display = "none"; if (items) items.innerHTML = State.cart.map(renderCartItem).join(""); if (footer) footer.style.display = "block"; }
  setText("cartSubtotal", fmt(sub)); setText("cartDelivery", CONFIG.delivery > 0 ? fmt(CONFIG.delivery) : "Grátis"); setText("cartTotal", fmt(total));
}

function renderCartItem(item, idx) {
  const up = item.price + item.modifiersTotal, tp = up * item.quantity;
  const mh = item.modifiers.length ? `<div class="cart-item-modifiers">${escapeHTML(item.modifiers.join(", "))}</div>` : "";
  return `<div class="cart-item"><img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" class="cart-item-image" loading="lazy" onerror="handleImgError(this)"><div class="cart-item-info"><div class="cart-item-name">${escapeHTML(item.name)}</div>${mh}<div class="cart-item-price">${fmt(tp)}</div><div class="cart-item-controls"><button class="qty-btn" onclick="changeQty(${idx},-1)"><i class="fas fa-minus"></i></button><span class="cart-item-qty">${item.quantity}</span><button class="qty-btn" onclick="changeQty(${idx},1)"><i class="fas fa-plus"></i></button><button class="cart-item-remove" onclick="removeItem(${idx})"><i class="fas fa-trash"></i></button></div></div></div>`;
}

function changeQty(idx, delta) { const i = State.cart[idx]; if (!i) return; i.quantity = clamp(i.quantity + delta, 0, CONFIG.maxCartItemQty); if (i.quantity === 0) State.cart.splice(idx, 1); saveCart(); updateCartUI(); }
function removeItem(idx) { const i = State.cart[idx]; if (!i) return; const n = i.name; State.cart.splice(idx, 1); saveCart(); updateCartUI(); showToast("Removido 🗑️", `${n} removido da sacola`); }
function clearCart() { if (!State.cart.length) return; if (!confirm("Deseja limpar todos os itens?")) return; State.cart = []; saveCart(); updateCartUI(); showToast("Sacola limpa 🗑️", "Todos os itens foram removidos"); }
function saveCart() { try { localStorage.setItem(CONFIG.cartStorageKey, JSON.stringify(State.cart)); } catch {} }
function loadCart() { try { const raw = localStorage.getItem(CONFIG.cartStorageKey); if (!raw) return; const parsed = JSON.parse(raw); if (!Array.isArray(parsed)) return; State.cart = parsed.filter(i => i && typeof i.productId === "number" && i.quantity > 0 && findProduct(i.productId)); } catch { State.cart = []; } finally { updateCartUI(); } }

function toggleCart() {
  const s = $("cartSidebar"), o = $("overlay"); if (!s) return;
  const isOpen = s.classList.contains("active");
  if (isOpen) { s.classList.remove("active"); s.setAttribute("aria-hidden", "true"); o?.classList.remove("active"); document.body.style.overflow = ""; State.lastFocused?.focus(); State.lastFocused = null; }
  else { State.lastFocused = document.activeElement; s.classList.add("active"); s.setAttribute("aria-hidden", "false"); o?.classList.add("active"); document.body.style.overflow = "hidden"; requestAnimationFrame(() => s.querySelector(".btn-close")?.focus()); }
}

// ============================================================
// LIMPEZA DO CARRINHO — remove itens em falta
// ============================================================
function isCartItemOutOfStock(cartItem) {
  const product = findProduct(cartItem.productId);
  if (!product) return true;
  if (isProductOut(cartItem.productId)) return true;
  if (isProductEffectivelyOut(cartItem.productId)) return true;
  if (!cartItem.modifiers?.length || !product.modifiers?.length) return false;
  for (let mi = 0; mi < product.modifiers.length; mi++) {
    const mod = product.modifiers[mi];
    for (let oi = 0; oi < mod.options.length; oi++) {
      if (cartItem.modifiers.includes(mod.options[oi].name) && isOptionOut(cartItem.productId, mi, oi)) return true;
    }
  }
  return false;
}

function purgeOutOfStockFromCart() {
  if (!State.cart.length) return;
  const removed = [];
  State.cart = State.cart.filter(item => {
    if (isCartItemOutOfStock(item)) {
      let name = item.name;
      if (item.modifiers?.length) name += " (" + item.modifiers.join(", ") + ")";
      removed.push(name); return false;
    }
    return true;
  });
  if (!removed.length) return;
  saveCart(); updateCartUI();
  if (!State.cart.length) {
    const sb = document.getElementById("cartSidebar"); if (sb?.classList.contains("active")) toggleCart();
    const ck = document.getElementById("checkoutModal"); if (ck?.classList.contains("active")) closeCheckout();
  }
  if (removed.length === 1) showToast("Item removido 🚫", removed[0] + " ficou indisponível", "warn");
  else showToast(`${removed.length} itens removidos 🚫`, removed.slice(0, 2).join(", ") + (removed.length > 2 ? ` e mais ${removed.length - 2}` : "") + " — indisponíveis", "warn");
  console.log("[Cart] Removidos:", removed);
}

// ============================================================
// CHECKOUT
// ============================================================
function openCheckout() {
  loadStock(); purgeOutOfStockFromCart();
  if (!State.cart.length) { showToast("Sacola vazia 🛒", "Adicione itens antes de finalizar", "warn"); return; }
  if (isClosed()) return;
  $("cartSidebar")?.classList.remove("active"); $("cartSidebar")?.setAttribute("aria-hidden", "true");
  State.checkoutStep = 1; syncSteps();
  const m = $("checkoutModal"); m?.classList.add("active"); m?.setAttribute("aria-hidden", "false");
  $("overlay")?.classList.add("active"); document.body.style.overflow = "hidden";
  requestAnimationFrame(() => setTimeout(() => $("customerName")?.focus(), 200));
}

function closeCheckout() {
  const m = $("checkoutModal"); if (!m?.classList.contains("active")) return;
  m.classList.remove("active"); m.setAttribute("aria-hidden", "true");
  tryCloseOverlay(); document.body.style.overflow = "";
}

function goToStep(step) {
  if (step > State.checkoutStep && State.checkoutStep === 1 && !validateStep1()) return;
  State.checkoutStep = step; syncSteps();
  if (step === 2) { updatePaymentValues(); togglePaymentView(); generatePix(); }
  if (step === 3) buildReview();
  document.querySelector(".checkout-body")?.scrollTo(0, 0);
}

function syncSteps() {
  document.querySelectorAll(".checkout-steps .step").forEach((el, i) => { const n = i + 1; el.classList.toggle("active", n === State.checkoutStep); el.classList.toggle("completed", n < State.checkoutStep); });
  document.querySelectorAll(".step-line").forEach((el, i) => el.classList.toggle("completed", i + 1 < State.checkoutStep));
  document.querySelectorAll(".checkout-step").forEach((el, i) => { el.classList.toggle("active", i + 1 === State.checkoutStep); el.setAttribute("aria-hidden", String(i + 1 !== State.checkoutStep)); });
}

function getInputVal(id) { return $(id)?.value?.trim() ?? ""; }
function markInputError(id, msg) { const i = $(id); if (!i) return; i.classList.add("input-error"); let e = document.getElementById(`${id}-error`); if (!e) { e = document.createElement("span"); e.id = `${id}-error`; e.className = "input-error-msg"; e.setAttribute("role", "alert"); i.parentNode?.appendChild(e); } e.textContent = msg ?? "Obrigatório"; i.focus(); }
function clearInputError(i) { if (!i) return; i.classList.remove("input-error"); const e = document.getElementById(`${i.id}-error`); if (e) e.textContent = ""; }

function validateStep1() {
  document.querySelectorAll("#step1 .input-error").forEach(el => clearInputError(el));
  const name = getInputVal("customerName"), phone = getInputVal("customerPhone").replace(/\D/g, ""), str = getInputVal("customerStreet"), num = getInputVal("customerNumber"), neigh = getInputVal("customerNeighborhood");
  if (!name) { markInputError("customerName", "Informe seu nome"); showToast("Obrigatório ⚠️", "Informe seu nome", "warn"); return false; }
  if (name.trim().split(/\s+/).length < 2) { markInputError("customerName", "Nome e sobrenome"); showToast("Inválido ⚠️", "Nome e sobrenome", "warn"); return false; }
  if (phone.length < 10 || phone.length > 11) { markInputError("customerPhone", "WhatsApp com DDD"); showToast("Inválido ⚠️", "WhatsApp válido com DDD", "warn"); return false; }
  if (!str) { markInputError("customerStreet", "Informe a rua"); showToast("Obrigatório ⚠️", "Informe a rua", "warn"); return false; }
  if (!num) { markInputError("customerNumber", "Informe o número"); showToast("Obrigatório ⚠️", "Número", "warn"); return false; }
  if (!neigh) { markInputError("customerNeighborhood", "Informe o bairro"); showToast("Obrigatório ⚠️", "Bairro", "warn"); return false; }
  return true;
}

function getSelectedPayment() { return document.querySelector('input[name="payment"]:checked')?.value ?? "pix"; }
function togglePaymentView() { const t = getSelectedPayment(), p = $("pixSection"), c = $("cashSection"); if (p) p.style.display = t === "pix" ? "block" : "none"; if (c) c.style.display = t === "dinheiro" ? "block" : "none"; }
function toggleChangeField() { const v = document.querySelector('input[name="change"]:checked')?.value; const f = $("changeField"); if (f) f.style.display = v === "yes" ? "block" : "none"; }
function updatePaymentValues() { const v = fmt(getTotal()); ["paymentTotalDisplay","pixCardValue","cartaoCardValue","dinheiroCardValue"].forEach(id => setText(id, v)); }

function generatePix() {
  const total = getTotal(), fv = fmt(total);
  setText("pixAmount", fv); setText("pixKeyValue", fv);
  const payload = _buildPixPayload(CONFIG.pix, CONFIG.pixName, CONFIG.pixCity, total);
  const ce = $("pixCode"); if (ce) ce.value = payload;
  const qi = $("pixQR"), ld = $("pixLoading"); if (!qi || !ld) return;
  ld.style.display = "flex"; ld.innerHTML = `<div class="spinner"></div><span>Gerando...</span>`; qi.style.display = "none"; qi.removeAttribute("src");
  const enc = encodeURIComponent(payload);
  let tried = 0;
  qi.onload = () => { ld.style.display = "none"; qi.style.display = "block"; };
  qi.onerror = () => { if (tried === 0) { tried++; qi.src = `https://quickchart.io/qr?size=200&margin=2&text=${enc}`; } else ld.innerHTML = `<span style="color:var(--text-muted);font-size:11px">Use o código abaixo</span>`; };
  qi.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&ecc=M&margin=8&data=${enc}`;
}

function _buildPixPayload(ch, nm, ci, val) {
  let k = ch.replace(/\D/g, ""); if (!k.startsWith("55")) k = "55" + k; k = "+" + k;
  const cl = s => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9 ]/g,"").toUpperCase().trim().slice(0, 25);
  const tlv = (id, v) => String(id).padStart(2,"0") + String(v.length).padStart(2,"0") + v;
  const mai = tlv("00","br.gov.bcb.pix") + tlv("01", k);
  const p = tlv("00","01") + tlv("01","12") + tlv("26",mai) + tlv("52","0000") + tlv("53","986") + tlv("54",val.toFixed(2)) + tlv("58","BR") + tlv("59",cl(nm)) + tlv("60",cl(ci)) + tlv("62",tlv("05","***")) + "6304";
  return p + _crc16ccitt(p);
}

function _crc16ccitt(s) { let c = 0xFFFF; for (let i = 0; i < s.length; i++) { c ^= s.charCodeAt(i) << 8; for (let j = 0; j < 8; j++) c = (c & 0x8000) ? ((c << 1) ^ 0x1021) : (c << 1); c &= 0xFFFF; } return c.toString(16).toUpperCase().padStart(4, "0"); }

async function copyToClipboard(t) { try { await navigator.clipboard.writeText(t); return true; } catch { const ta = document.createElement("textarea"); ta.value = t; ta.style.cssText = "position:fixed;opacity:0;left:-9999px"; document.body.appendChild(ta); ta.select(); try { return document.execCommand("copy"); } catch { return false; } finally { ta.remove(); } } }
async function copyPixCode() { const v = $("pixCode")?.value; if (!v) return; const ok = await copyToClipboard(v); showToast(ok ? "Copiado! ✅" : "Erro ❌", ok ? "Código PIX copiado" : "Copie manualmente", ok ? "success" : "warn"); }
async function copyPixKey() { const v = $("pixKey")?.value; if (!v) return; const ok = await copyToClipboard(v); showToast(ok ? "Copiado! ✅" : "Erro ❌", ok ? "Chave PIX copiada" : "Copie manualmente", ok ? "success" : "warn"); }

function buildReview() {
  const sub = getSubtotal(), total = getTotal();
  setHTML("reviewItems", State.cart.map(i => { const lt = (i.price + i.modifiersTotal) * i.quantity; const ms = i.modifiers.length ? ` <em>(${escapeHTML(i.modifiers.join(", "))})</em>` : ""; return `<div class="review-item"><span>${i.quantity}× ${escapeHTML(i.name)}${ms}</span><span>${fmt(lt)}</span></div>`; }).join(""));
  setHTML("reviewCustomer", `${escapeHTML(getInputVal("customerName"))}<br><small>${escapeHTML(getInputVal("customerPhone"))}</small>`);
  const addr = `${escapeHTML(getInputVal("customerStreet"))}, ${escapeHTML(getInputVal("customerNumber"))} — ${escapeHTML(getInputVal("customerNeighborhood"))}`;
  const comp = getInputVal("customerComplement");
  setHTML("reviewAddress", addr + (comp ? `<br><small>${escapeHTML(comp)}</small>` : ""));
  setText("reviewPayment", PAYMENT_LABELS[getSelectedPayment()]);
  setText("reviewSubtotal", fmt(sub)); setText("reviewDelivery", CONFIG.delivery > 0 ? fmt(CONFIG.delivery) : "Grátis"); setText("reviewTotal", fmt(total));
}

// ============================================================
// ENVIAR PEDIDO — com registro e verificação final
// ============================================================
function sendToWhatsApp() {
  loadStock(); purgeOutOfStockFromCart();
  if (!State.cart.length) { showToast("Sacola vazia 🛒", "Itens ficaram indisponíveis", "warn"); closeCheckout(); return; }
  if (!validateStep1()) { goToStep(1); return; }

  const name = getInputVal("customerName"), phone = getInputVal("customerPhone"),
        street = getInputVal("customerStreet"), number = getInputVal("customerNumber"),
        neigh = getInputVal("customerNeighborhood"), comp = getInputVal("customerComplement"),
        pay = getSelectedPayment(), chOpt = document.querySelector('input[name="change"]:checked')?.value ?? "no",
        chAmt = getInputVal("changeAmount");
  const sub = getSubtotal(), total = getTotal(), now = new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });

  loadOrders(); registerOrder({ name, phone, street, number, neighborhood: neigh, complement: comp, items: [...State.cart], payment: pay, subtotal: sub, delivery: CONFIG.delivery, total });

  let msg = `👑 *${CONFIG.storeName.toUpperCase()}*\n━━━━━━━━━━━━━━━━━━━━━━━\n🛒 *NOVO PEDIDO*\n\n*📦 ITENS:*\n`;
  State.cart.forEach(i => { const lt = (i.price + i.modifiersTotal) * i.quantity; msg += `  • ${i.quantity}× ${i.name}`; if (i.modifiers.length) msg += ` _(${i.modifiers.join(", ")})_`; msg += ` — ${fmt(lt)}\n`; });
  msg += `\n━━━━━━━━━━━━━━━━━━━━━━━\n💰 Subtotal: ${fmt(sub)}\n🛵 Entrega: ${CONFIG.delivery > 0 ? fmt(CONFIG.delivery) : "Grátis"}\n*💵 TOTAL: ${fmt(total)}*\n━━━━━━━━━━━━━━━━━━━━━━━\n\n*👤 CLIENTE:*\n  ${name}\n  ${phone}\n\n*📍 ENDEREÇO:*\n  ${street}, ${number} — ${neigh}\n`;
  if (comp) msg += `  Complemento: ${comp}\n`;
  msg += `\n*💳 PAGAMENTO:* ${PAYMENT_LABELS[pay]?.replace(/[✅💳💵]/g,"").trim() ?? pay}\n`;
  if (pay === "dinheiro" && chOpt === "yes" && chAmt) msg += `  Troco para: ${chAmt}\n`;
  if (pay === "pix") msg += `  _Chave PIX: ${CONFIG.pix}_\n  _Valor: ${fmt(total)}_\n`;
  msg += `\n━━━━━━━━━━━━━━━━━━━━━━━\n_Pedido realizado em: ${now}_`;

  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  State.cart = []; saveCart(); updateCartUI(); closeCheckout();
  showToast("Pedido enviado! 🎉", "Aguarde a confirmação pelo WhatsApp", "success");
}

// ============================================================
// TOAST
// ============================================================
const TOAST_ICONS = { success: "fa-check-circle", warn: "fa-exclamation-circle", error: "fa-times-circle", info: "fa-info-circle" };
function showToast(title, message, type = "success") {
  const t = $("toast"); if (!t) return;
  const icon = t.querySelector(".toast-icon"); if (icon) { icon.className = `toast-icon ${type}`; icon.innerHTML = `<i class="fas ${TOAST_ICONS[type] || TOAST_ICONS.success}"></i>`; }
  setText("toastTitle", title); setText("toastMessage", message);
  t.setAttribute("aria-hidden", "false"); t.classList.remove("show"); void t.offsetWidth; t.classList.add("show");
  clearTimeout(State.timers.toast); State.timers.toast = setTimeout(() => { t.classList.remove("show"); t.setAttribute("aria-hidden", "true"); }, CONFIG.toastDuration);
}
function closeToast() { const t = $("toast"); if (!t) return; clearTimeout(State.timers.toast); t.classList.remove("show"); t.setAttribute("aria-hidden", "true"); }

function tryCloseOverlay() {
  const any = $("productModal")?.classList.contains("active") || $("checkoutModal")?.classList.contains("active") || $("cartSidebar")?.classList.contains("active") || document.getElementById("adminModal")?.classList.contains("active");
  if (!any) $("overlay")?.classList.remove("active");
}
function closeAll() {
  if ($("productModal")?.classList.contains("active")) { closeProductModal(); return; }
  if ($("checkoutModal")?.classList.contains("active")) { closeCheckout(); return; }
  if ($("cartSidebar")?.classList.contains("active")) { toggleCart(); return; }
  if (document.getElementById("adminModal")?.classList.contains("active")) { closeAdmin(); return; }
  $("overlay")?.classList.remove("active");
}

// ============================================================
//           MÓDULO ADMIN
// ============================================================
function loadOrders() { try { const r = localStorage.getItem(ADMIN_CONFIG.storageKey); if (!r) return; const p = JSON.parse(r); if (Array.isArray(p)) AdminState.orders = p; } catch { AdminState.orders = []; } }
function saveOrders() { try { const c = new Date(); c.setDate(c.getDate() - ADMIN_CONFIG.maxDaysHistory); const cs = _dateKey(c); AdminState.orders = AdminState.orders.filter(o => o.date >= cs); localStorage.setItem(ADMIN_CONFIG.storageKey, JSON.stringify(AdminState.orders)); } catch {} }
function registerOrder(d) { const now = new Date(); const o = { id: `PED-${Date.now()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`, date: _dateKey(now), time: now.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}), timestamp: now.getTime(), customer: {name:d.name||"N/A",phone:d.phone||"N/A"}, address: {street:d.street||"",number:d.number||"",neighborhood:d.neighborhood||"",complement:d.complement||""}, items: d.items.map(i => ({name:i.name,quantity:i.quantity,price:i.price,modifiers:i.modifiers||[],modifiersTotal:i.modifiersTotal||0,lineTotal:(i.price+(i.modifiersTotal||0))*i.quantity})), payment:d.payment||"pix",subtotal:d.subtotal,delivery:d.delivery,total:d.total,status:"confirmado" }; AdminState.orders.push(o); saveOrders(); return o; }

function getOrdersByDate() { const g = {}; AdminState.orders.forEach(o => { if (!g[o.date]) g[o.date] = {date:o.date,orders:[],totalRevenue:0,totalOrders:0}; g[o.date].orders.push(o); g[o.date].totalRevenue += o.total; g[o.date].totalOrders++; }); return g; }
function getTodayData() { const today = _dateKey(new Date()), to = AdminState.orders.filter(o => o.date === today); const tr = to.reduce((s,o) => s+o.total,0), ti = to.reduce((s,o) => s+o.items.reduce((si,i) => si+i.quantity,0),0); const avg = to.length > 0 ? tr/to.length : 0; const pb = {pix:0,cartao:0,dinheiro:0}; to.forEach(o => { if (pb[o.payment] !== undefined) pb[o.payment]++; }); const pc = {}; to.forEach(o => o.items.forEach(i => { pc[i.name] = (pc[i.name]||0) + i.quantity; })); const tp = Object.entries(pc).sort((a,b) => b[1]-a[1]).slice(0,5); const hd = {}; to.forEach(o => { const h = o.time?.split(":")[0]||"00"; hd[h] = (hd[h]||0)+1; }); return {orders:to,totalRevenue:tr,totalOrders:to.length,totalItems:ti,avgTicket:avg,paymentBreakdown:pb,topProducts:tp,hourlyData:hd}; }
function getWeekData() { const n = new Date(), wa = new Date(n); wa.setDate(wa.getDate()-7); const wk = _dateKey(wa); const wo = AdminState.orders.filter(o => o.date >= wk); return {totalRevenue:wo.reduce((s,o) => s+o.total,0),totalOrders:wo.length}; }
function getMonthData() { const n = new Date(), ms = _dateKey(new Date(n.getFullYear(),n.getMonth(),1)); const mo = AdminState.orders.filter(o => o.date >= ms); return {totalRevenue:mo.reduce((s,o) => s+o.total,0),totalOrders:mo.length}; }

// ── Autenticação ────────────────────────────────────────────
function openAdmin() { if (AdminState.isAuthenticated) { loadOrders(); loadStock(); showAdminPanel(); return; } showAdminLogin(); }
function showAdminLogin() { const m = _getOrCreateAdminModal(); m.innerHTML = _adminLoginHTML(); m.classList.add("active"); m.setAttribute("aria-hidden","false"); $("overlay")?.classList.add("active"); document.body.style.overflow = "hidden"; requestAnimationFrame(() => document.getElementById("adminPassword")?.focus()); }
function authenticateAdmin() { const pwd = document.getElementById("adminPassword")?.value ?? ""; if (pwd === ADMIN_CONFIG.password) { AdminState.isAuthenticated = true; loadOrders(); loadStock(); showAdminPanel(); showToast("Acesso liberado! 🔓","Bem-vindo ao painel"); } else { const i = document.getElementById("adminPassword"); if (i) { i.classList.add("input-error"); i.value = ""; i.focus(); } showToast("Senha incorreta ❌","Tente novamente","warn"); } }
function adminLoginKeydown(e) { if (e.key === "Enter") { e.preventDefault(); authenticateAdmin(); } }
function showAdminPanel() { const m = _getOrCreateAdminModal(); AdminState.currentView = "today"; m.innerHTML = _adminDashboardHTML(); m.classList.add("active"); m.setAttribute("aria-hidden","false"); $("overlay")?.classList.add("active"); document.body.style.overflow = "hidden"; renderAdminDashboard(); }
function closeAdmin() { const m = document.getElementById("adminModal"); if (!m) return; m.classList.remove("active"); m.setAttribute("aria-hidden","true"); tryCloseOverlay(); document.body.style.overflow = ""; }
function logoutAdmin() { AdminState.isAuthenticated = false; closeAdmin(); showToast("Desconectado 🔒","Sessão encerrada"); }

// ── Dashboard ───────────────────────────────────────────────
function renderAdminDashboard() {
  const c = document.getElementById("adminContent"); if (!c) return;
  switch (AdminState.currentView) {
    case "today":   c.innerHTML = _renderTodayView(); _animateCounters(); break;
    case "history": c.innerHTML = _renderHistoryView(); break;
    case "details": c.innerHTML = _renderDateDetails(AdminState.selectedDate); break;
    case "stock":   c.innerHTML = _renderStockView(); break;
    case "config":  c.innerHTML = _renderGithubConfigView(); break;
  }
}

function switchAdminView(v) { AdminState.currentView = v; document.querySelectorAll(".admin-nav-btn").forEach(b => b.classList.toggle("active", b.dataset.view === v)); renderAdminDashboard(); }
function viewDateDetails(d) { AdminState.selectedDate = d; AdminState.currentView = "details"; renderAdminDashboard(); }

// ── View: Hoje ──────────────────────────────────────────────
function _renderTodayView() {
  const d = getTodayData(), w = getWeekData(), mo = getMonthData(), today = _dateKey(new Date());
  const oc = countOutOfStock();
  const ghStatus = GITHUB_CONFIG.token ? `<span style="color:#22c55e">✅ Sincronizado</span>` : `<span style="color:#f59e0b">⚠️ Token não configurado</span>`;
  return `<div class="admin-today">
    <div class="admin-date-header"><div class="admin-date-icon">📅</div><div><div class="admin-date-label">Hoje — ${_formatDate(today)}</div><div class="admin-date-weekday">${_weekDay(today)}</div></div></div>
    <div class="github-status-bar">🌐 GitHub: ${ghStatus} &nbsp;|&nbsp; Atualização: a cada ${GITHUB_CONFIG.pollInterval/1000}s</div>
    <div class="admin-stats-grid"><div class="admin-stat-card stat-revenue"><div class="stat-icon">💰</div><div class="stat-info"><div class="stat-value" data-target="${d.totalRevenue}" data-format="currency">R$ 0,00</div><div class="stat-label">Faturamento Hoje</div></div></div><div class="admin-stat-card stat-orders"><div class="stat-icon">📦</div><div class="stat-info"><div class="stat-value" data-target="${d.totalOrders}" data-format="number">0</div><div class="stat-label">Pedidos Hoje</div></div></div><div class="admin-stat-card stat-items"><div class="stat-icon">🍽️</div><div class="stat-info"><div class="stat-value" data-target="${d.totalItems}" data-format="number">0</div><div class="stat-label">Itens Vendidos</div></div></div><div class="admin-stat-card stat-ticket"><div class="stat-icon">🎫</div><div class="stat-info"><div class="stat-value" data-target="${d.avgTicket}" data-format="currency">R$ 0,00</div><div class="stat-label">Ticket Médio</div></div></div></div>
    ${oc > 0 ? `<div class="admin-stock-alert" onclick="switchAdminView('stock')"><i class="fas fa-exclamation-triangle"></i> <strong>${oc}</strong> ${plural(oc,"item","itens")} em falta — <u>Gerenciar</u></div>` : ""}
    <div class="admin-period-cards"><div class="admin-period-card"><div class="period-header"><span class="period-icon">📊</span><span class="period-title">Últimos 7 dias</span></div><div class="period-stats"><div class="period-stat"><span class="period-stat-value">${fmt(w.totalRevenue)}</span><span class="period-stat-label">Faturamento</span></div><div class="period-stat"><span class="period-stat-value">${w.totalOrders}</span><span class="period-stat-label">Pedidos</span></div></div></div><div class="admin-period-card"><div class="period-header"><span class="period-icon">📈</span><span class="period-title">Este mês</span></div><div class="period-stats"><div class="period-stat"><span class="period-stat-value">${fmt(mo.totalRevenue)}</span><span class="period-stat-label">Faturamento</span></div><div class="period-stat"><span class="period-stat-value">${mo.totalOrders}</span><span class="period-stat-label">Pedidos</span></div></div></div></div>
    <div class="admin-section"><h3 class="admin-section-title"><i class="fas fa-credit-card"></i> Formas de Pagamento</h3>${_renderPaymentBar(d.paymentBreakdown, d.totalOrders)}</div>
    ${d.topProducts.length ? `<div class="admin-section"><h3 class="admin-section-title"><i class="fas fa-trophy"></i> Mais Vendidos</h3><div class="top-products-list">${d.topProducts.map(([n,q],i) => `<div class="top-product-item"><span class="top-product-rank">${["🥇","🥈","🥉"][i]||(i+1+"º")}</span><span class="top-product-name">${escapeHTML(n)}</span><span class="top-product-qty">${q}×</span></div>`).join("")}</div></div>` : ""}
    <div class="admin-section"><h3 class="admin-section-title"><i class="fas fa-list"></i> Pedidos <span class="admin-section-count">${d.totalOrders}</span></h3>${d.orders.length ? `<div class="admin-orders-list">${d.orders.sort((a,b) => b.timestamp-a.timestamp).map(o => _renderOrderCard(o)).join("")}</div>` : `<div class="admin-empty"><div class="admin-empty-icon">📭</div><p>Nenhum pedido hoje</p></div>`}</div>
  </div>`;
}

// ── View: Histórico ─────────────────────────────────────────
function _renderHistoryView() {
  const gr = getOrdersByDate(), dates = Object.keys(gr).sort((a,b) => b.localeCompare(a)), ta = AdminState.orders.reduce((s,o) => s+o.total,0);
  return `<div class="admin-history"><div class="admin-history-summary"><div class="history-summary-card"><span class="summary-icon">📊</span><div><div class="summary-value">${fmt(ta)}</div><div class="summary-label">Faturamento Total</div></div></div><div class="history-summary-card"><span class="summary-icon">📦</span><div><div class="summary-value">${AdminState.orders.length}</div><div class="summary-label">Total Pedidos</div></div></div><div class="history-summary-card"><span class="summary-icon">📅</span><div><div class="summary-value">${dates.length}</div><div class="summary-label">Dias com Vendas</div></div></div></div><div class="admin-section"><h3 class="admin-section-title"><i class="fas fa-calendar-alt"></i> Por Dia</h3>${dates.length ? `<div class="admin-daily-table"><div class="daily-table-header"><span>Data</span><span>Dia</span><span>Pedidos</span><span>Faturamento</span><span></span></div>${dates.map(d => { const day = gr[d], it = d === _dateKey(new Date()); return `<div class="daily-table-row ${it?"row-today":""}" onclick="viewDateDetails('${d}')"><span class="daily-date">${it?'<span class="today-badge">HOJE</span>':""}${_formatDate(d)}</span><span class="daily-weekday">${_weekDay(d)}</span><span class="daily-orders">${day.totalOrders}</span><span class="daily-revenue">${fmt(day.totalRevenue)}</span><span class="daily-arrow"><i class="fas fa-chevron-right"></i></span></div>`; }).join("")}</div>` : `<div class="admin-empty"><div class="admin-empty-icon">📭</div><p>Nenhum pedido</p></div>`}</div>${dates.length ? `<div class="admin-section"><h3 class="admin-section-title"><i class="fas fa-chart-bar"></i> Gráfico</h3><div class="revenue-chart">${_renderRevenueChart(gr, dates.slice(0,14))}</div></div>` : ""}</div>`;
}

// ── View: Detalhes ──────────────────────────────────────────
function _renderDateDetails(ds) {
  if (!ds) return "";
  const dayO = AdminState.orders.filter(o => o.date === ds).sort((a,b) => b.timestamp-a.timestamp);
  const tr = dayO.reduce((s,o) => s+o.total,0), ti = dayO.reduce((s,o) => s+o.items.reduce((si,i) => si+i.quantity,0),0);
  const avg = dayO.length > 0 ? tr/dayO.length : 0;
  const pc = {}; dayO.forEach(o => o.items.forEach(i => { pc[i.name] = (pc[i.name]||0)+i.quantity; }));
  const tp = Object.entries(pc).sort((a,b) => b[1]-a[1]);
  return `<div class="admin-details"><button class="admin-back-btn" onclick="switchAdminView('history')"><i class="fas fa-arrow-left"></i> Voltar</button><div class="admin-date-header"><div class="admin-date-icon">📅</div><div><div class="admin-date-label">${_formatDate(ds)}</div><div class="admin-date-weekday">${_weekDay(ds)}</div></div></div><div class="admin-stats-grid stats-small"><div class="admin-stat-card stat-revenue"><div class="stat-icon">💰</div><div class="stat-info"><div class="stat-value">${fmt(tr)}</div><div class="stat-label">Faturamento</div></div></div><div class="admin-stat-card stat-orders"><div class="stat-icon">📦</div><div class="stat-info"><div class="stat-value">${dayO.length}</div><div class="stat-label">Pedidos</div></div></div><div class="admin-stat-card stat-items"><div class="stat-icon">🍽️</div><div class="stat-info"><div class="stat-value">${ti}</div><div class="stat-label">Itens</div></div></div><div class="admin-stat-card stat-ticket"><div class="stat-icon">🎫</div><div class="stat-info"><div class="stat-value">${fmt(avg)}</div><div class="stat-label">Ticket Médio</div></div></div></div>${tp.length ? `<div class="admin-section"><h3 class="admin-section-title"><i class="fas fa-trophy"></i> Produtos</h3><div class="top-products-list">${tp.map(([n,q],i) => `<div class="top-product-item"><span class="top-product-rank">${["🥇","🥈","🥉"][i]||(i+1+"º")}</span><span class="top-product-name">${escapeHTML(n)}</span><span class="top-product-qty">${q}×</span></div>`).join("")}</div></div>` : ""}<div class="admin-section"><h3 class="admin-section-title"><i class="fas fa-list"></i> Pedidos <span class="admin-section-count">${dayO.length}</span></h3><div class="admin-orders-list">${dayO.length ? dayO.map(o => _renderOrderCard(o,true)).join("") : `<div class="admin-empty"><div class="admin-empty-icon">📭</div><p>Nenhum pedido</p></div>`}</div></div></div>`;
}

// ── View: Estoque ───────────────────────────────────────────
function _renderStockView() {
  const grouped = groupItems(MENU);
  let totalAvail = 0, totalOut = 0;
  MENU.forEach(p => {
    if (isProductOut(p.id)) { totalOut++; return; }
    totalAvail++;
    p.modifiers?.forEach((mod, mi) => mod.options.forEach((_, oi) => { if (isOptionOut(p.id, mi, oi)) totalOut++; else totalAvail++; }));
  });
  return `<div class="admin-stock">
    <div class="admin-stats-grid" style="margin-bottom:14px">
      <div class="admin-stat-card" style="border-left:3px solid #22c55e"><div class="stat-icon">✅</div><div class="stat-info"><div class="stat-value" style="color:#22c55e" id="stockAvailCount">${totalAvail}</div><div class="stat-label">Disponíveis</div></div></div>
      <div class="admin-stat-card" style="border-left:3px solid #ef4444"><div class="stat-icon">🚫</div><div class="stat-info"><div class="stat-value" style="color:#ef4444" id="stockOutCount">${totalOut}</div><div class="stat-label">Em Falta</div></div></div>
    </div>
    <div class="stock-quick-actions"><button class="stock-action-btn" onclick="stockClearAll()"><i class="fas fa-check-double"></i> Tudo disponível</button></div>
    <div class="stock-search-wrapper"><i class="fas fa-search"></i><input type="text" id="stockSearch" placeholder="Buscar produto ou sabor..." oninput="filterStockList(this.value)" autocomplete="off"></div>
    <div id="stockList">${ORDERED_CATS.filter(id => grouped[id]).map(catId => { const cat = CATEGORIES.find(c => c.id === catId); return `<div class="stock-category" data-cat="${catId}"><div class="stock-category-header"><span>${cat?.icon ?? "🍽️"} ${escapeHTML(cat?.name ?? catId)}</span></div><div class="stock-items">${grouped[catId].map(p => _renderStockProduct(p)).join("")}</div></div>`; }).join("")}</div>
  </div>`;
}

// ── View: Configuração GitHub ───────────────────────────────
function _renderGithubConfigView() {
  const hasToken = !!GITHUB_CONFIG.token;
  return `<div class="admin-github-config">
    <div class="github-config-header">
      <div class="github-config-icon"><i class="fab fa-github"></i></div>
      <div>
        <h3>Sincronização com GitHub</h3>
        <p>Configure para sincronizar estoque entre todos os dispositivos</p>
      </div>
    </div>

    <div class="github-status-card ${hasToken ? "status-ok" : "status-warn"}">
      <i class="fas ${hasToken ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
      <div>
        <strong>${hasToken ? "Configurado" : "Token não configurado"}</strong>
        <span>${hasToken ? `Repositório: ${GITHUB_CONFIG.repo}` : "O token é necessário para o admin atualizar o estoque"}</span>
      </div>
    </div>

    <div class="github-config-form">
      <div class="config-form-group">
        <label><i class="fab fa-github"></i> Repositório</label>
        <input type="text" id="ghRepo" value="${escapeHTML(GITHUB_CONFIG.repo)}" placeholder="usuario/imperio-estoque">
        <small>Repositório público criado para o estoque</small>
      </div>

      <div class="config-form-group">
        <label><i class="fas fa-key"></i> Token GitHub (Admin)</label>
        <div class="token-input-wrapper">
          <input type="password" id="ghToken" value="${escapeHTML(GITHUB_CONFIG.token)}" placeholder="ghp_..." autocomplete="off">
          <button class="btn-toggle-password" onclick="toggleTokenVisibility()" type="button">
            <i class="fas fa-eye" id="tokenEyeIcon"></i>
          </button>
        </div>
        <small>
          Token com permissão "repo" — 
          <a href="https://github.com/settings/tokens/new?description=imperio-lanches&scopes=repo" 
             target="_blank" rel="noopener" style="color:var(--primary)">
            Criar novo token ↗
          </a>
        </small>
      </div>

      <div class="config-form-group">
        <label><i class="fas fa-clock"></i> Intervalo de atualização</label>
        <select id="ghInterval">
          <option value="10000" ${GITHUB_CONFIG.pollInterval===10000?"selected":""}>10 segundos</option>
          <option value="15000" ${GITHUB_CONFIG.pollInterval===15000?"selected":""}>15 segundos</option>
          <option value="30000" ${GITHUB_CONFIG.pollInterval===30000?"selected":""}>30 segundos</option>
          <option value="60000" ${GITHUB_CONFIG.pollInterval===60000?"selected":""}>1 minuto</option>
        </select>
      </div>

      <div class="config-actions">
        <button class="config-btn-save" onclick="saveAndApplyGithubConfig()">
          <i class="fas fa-save"></i> Salvar e Aplicar
        </button>
        <button class="config-btn-test" onclick="testGithubConnection()">
          <i class="fas fa-wifi"></i> Testar Conexão
        </button>
        <button class="config-btn-push" onclick="forcePushStock()">
          <i class="fas fa-upload"></i> Enviar Estoque Agora
        </button>
      </div>

      <div id="ghTestResult" class="gh-test-result" style="display:none"></div>
    </div>

    <div class="github-config-steps">
      <h4>📋 Como configurar passo a passo:</h4>
      <ol>
        <li>Crie um repositório público no GitHub chamado <code>imperio-estoque</code></li>
        <li>Adicione um arquivo <code>estoque.json</code> com conteúdo: <code>{"products":[],"options":[]}</code></li>
        <li><a href="https://github.com/settings/tokens/new?description=imperio-lanches&scopes=repo" target="_blank" rel="noopener" style="color:var(--primary)">Crie um token de acesso ↗</a> com permissão <strong>repo</strong></li>
        <li>Cole o repositório e token acima e clique em "Salvar e Aplicar"</li>
        <li>Clique em "Testar Conexão" para confirmar</li>
      </ol>
    </div>
  </div>`;
}

// ── Funções da config GitHub ────────────────────────────────
function toggleTokenVisibility() {
  const input = document.getElementById("ghToken");
  const icon = document.getElementById("tokenEyeIcon");
  if (!input) return;
  input.type = input.type === "password" ? "text" : "password";
  icon?.classList.toggle("fa-eye", input.type === "password");
  icon?.classList.toggle("fa-eye-slash", input.type === "text");
}

function saveAndApplyGithubConfig() {
  const repo = document.getElementById("ghRepo")?.value?.trim();
  const token = document.getElementById("ghToken")?.value?.trim();
  const interval = parseInt(document.getElementById("ghInterval")?.value || "15000");

  if (!repo) { showToast("Campo obrigatório ⚠️", "Informe o repositório", "warn"); return; }

  GITHUB_CONFIG.repo = repo;
  GITHUB_CONFIG.token = token || "";
  GITHUB_CONFIG.pollInterval = interval;

  saveGithubConfig();
  stopGithubPolling();
  startGithubPolling();

  showToast("Configuração salva ✅", "GitHub sincronizando a cada " + interval/1000 + "s");
  renderAdminDashboard();
}

async function testGithubConnection() {
  const result = document.getElementById("ghTestResult"); if (!result) return;
  result.style.display = "block";
  result.className = "gh-test-result gh-testing";
  result.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Testando conexão...`;

  try {
    const repo = document.getElementById("ghRepo")?.value?.trim() || GITHUB_CONFIG.repo;
    const token = document.getElementById("ghToken")?.value?.trim() || GITHUB_CONFIG.token;
    const url = `https://raw.githubusercontent.com/${repo}/main/estoque.json?nocache=${Date.now()}`;
    const res = await fetch(url, { cache: "no-store" });

    if (res.ok) {
      result.className = "gh-test-result gh-success";
      result.innerHTML = `<i class="fas fa-check-circle"></i> Conexão OK! Arquivo encontrado. ${token ? "✅ Token configurado." : "⚠️ Sem token — clientes conseguem ler, mas admin não pode escrever."}`;
    } else if (res.status === 404) {
      result.className = "gh-test-result gh-error";
      result.innerHTML = `<i class="fas fa-times-circle"></i> Arquivo estoque.json não encontrado. Crie o arquivo no repositório.`;
    } else {
      result.className = "gh-test-result gh-error";
      result.innerHTML = `<i class="fas fa-times-circle"></i> Erro ${res.status}. Verifique o nome do repositório.`;
    }
  } catch (err) {
    result.className = "gh-test-result gh-error";
    result.innerHTML = `<i class="fas fa-times-circle"></i> Falha de conexão: ${err.message}`;
  }
}

async function forcePushStock() {
  showToast("Enviando... ⏳", "Salvando estoque no GitHub", "info");
  const ok = await pushStockToGithub();
  if (ok) showToast("Enviado! ✅", "Estoque salvo no GitHub com sucesso");
}

// ── Estoque — render produto ─────────────────────────────────
function _renderStockProduct(p) {
  const pOut = isProductOut(p.id);
  const hasOptions = p.modifiers?.some(m => m.options?.length > 0);
  let optOutCount = 0, optTotal = 0;
  if (hasOptions && !pOut) { p.modifiers.forEach((mod,mi) => mod.options.forEach((_,oi) => { optTotal++; if (isOptionOut(p.id,mi,oi)) optOutCount++; })); }
  const statusLabel = pOut
    ? '<span class="stock-status stock-status-out"><i class="fas fa-times-circle"></i> Esgotado</span>'
    : optOutCount > 0
      ? `<span class="stock-status stock-status-partial"><i class="fas fa-exclamation-circle"></i> ${optOutCount} em falta</span>`
      : '<span class="stock-status stock-status-ok"><i class="fas fa-check-circle"></i> Disponível</span>';
  let subItemsHTML = "";
  if (hasOptions) {
    const subItems = [];
    p.modifiers.forEach((mod,mi) => {
      mod.options.forEach((opt,oi) => {
        const oOut = pOut || isOptionOut(p.id,mi,oi);
        subItems.push(`<div class="stock-sub-item ${oOut&&!pOut?"stock-sub-out":""}" data-name="${normalizeSearch(opt.name)}"><span class="stock-sub-name">${escapeHTML(opt.name)}${opt.price>0?`<small class="stock-sub-price">+${fmt(opt.price)}</small>`:""}</span><label class="stock-toggle stock-toggle-sm"><input type="checkbox" ${oOut?"":"checked"} ${pOut?"disabled":""} onchange="handleOptionToggle(${p.id},${mi},${oi},this)"><span class="stock-toggle-slider"></span></label></div>`);
      });
    });
    subItemsHTML = `<div class="stock-sub-items" id="stockSub-${p.id}" style="display:none">${subItems.join("")}</div>`;
  }
  return `<div class="stock-product ${pOut?"stock-product-out":""}" data-id="${p.id}" data-name="${normalizeSearch(p.name)}"><div class="stock-product-header" onclick="${hasOptions?`toggleStockExpand(${p.id})`:""}"><div class="stock-product-info">${hasOptions?`<i class="fas fa-chevron-right stock-expand-icon" id="stockIcon-${p.id}"></i>`:`<span class="stock-expand-spacer"></span>`}<div><span class="stock-item-name">${escapeHTML(p.name)}</span><span class="stock-item-price">${fmt(p.price)}</span></div></div><div class="stock-product-right">${statusLabel}<label class="stock-toggle" onclick="event.stopPropagation()"><input type="checkbox" ${pOut?"":"checked"} onchange="handleProductToggle(${p.id},this)"><span class="stock-toggle-slider"></span></label></div></div>${subItemsHTML}</div>`;
}

function toggleStockExpand(productId) { const sub = document.getElementById(`stockSub-${productId}`); const icon = document.getElementById(`stockIcon-${productId}`); if (!sub) return; const isOpen = sub.style.display !== "none"; sub.style.display = isOpen ? "none" : "block"; icon?.classList.toggle("stock-expand-open", !isOpen); }

function handleProductToggle(productId, checkbox) {
  const isAvail = checkbox.checked;
  if (isAvail) { AdminState.outProducts.delete(productId); }
  else { AdminState.outProducts.add(productId); for (const key of AdminState.outOptions.keys()) { if (key.startsWith(`${productId}:`)) AdminState.outOptions.delete(key); } }
  saveStock();
  const product = checkbox.closest(".stock-product");
  if (product) { product.classList.toggle("stock-product-out", !isAvail); product.querySelectorAll(".stock-sub-item input").forEach(inp => { inp.disabled = !isAvail; inp.checked = isAvail ? true : false; inp.closest(".stock-sub-item")?.classList.remove("stock-sub-out"); }); }
  _updateStockCounts(); purgeOutOfStockFromCart(); renderMenu();

  // Envia para GitHub
  setTimeout(() => pushStockToGithub(), 100);

  const p = findProduct(productId); showToast(isAvail ? "Disponível ✅" : "Esgotado 🚫", `${p?.name ?? "Produto"} — ${isAvail ? "disponível" : "esgotado"}`, isAvail ? "success" : "warn");
}

function handleOptionToggle(productId, modIdx, optIdx, checkbox) {
  const isAvail = checkbox.checked;
  const key = optionKey(productId, modIdx, optIdx);
  if (isAvail) AdminState.outOptions.delete(key); else AdminState.outOptions.set(key, true);
  saveStock();
  const subItem = checkbox.closest(".stock-sub-item"); subItem?.classList.toggle("stock-sub-out", !isAvail);
  _updateProductStatusLabel(productId); _updateStockCounts(); purgeOutOfStockFromCart(); renderMenu();

  // Envia para GitHub
  setTimeout(() => pushStockToGithub(), 100);

  const p = findProduct(productId); const opt = p?.modifiers[modIdx]?.options[optIdx];
  showToast(isAvail ? "Disponível ✅" : "Em falta 🚫", `${p?.name ?? "Produto"} → ${opt?.name ?? "Opção"} — ${isAvail ? "disponível" : "em falta"}`, isAvail ? "success" : "warn");
}

function _updateProductStatusLabel(productId) {
  const product = document.querySelector(`.stock-product[data-id="${productId}"]`); if (!product) return;
  const p = findProduct(productId); if (!p) return;
  let optOutCount = 0; p.modifiers?.forEach((mod,mi) => mod.options.forEach((_,oi) => { if (isOptionOut(productId,mi,oi)) optOutCount++; }));
  const statusEl = product.querySelector(".stock-status"); if (!statusEl) return;
  if (optOutCount > 0) { statusEl.className = "stock-status stock-status-partial"; statusEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${optOutCount} em falta`; }
  else { statusEl.className = "stock-status stock-status-ok"; statusEl.innerHTML = `<i class="fas fa-check-circle"></i> Disponível`; }
}

function _updateStockCounts() {
  let ta = 0, to = 0;
  MENU.forEach(p => { if (isProductOut(p.id)) { to++; return; } ta++; p.modifiers?.forEach((mod,mi) => mod.options.forEach((_,oi) => { if (isOptionOut(p.id,mi,oi)) to++; else ta++; })); });
  const ac = document.getElementById("stockAvailCount"); const oc = document.getElementById("stockOutCount");
  if (ac) ac.textContent = ta; if (oc) oc.textContent = to;
}

async function stockClearAll() {
  if (!confirm("Marcar todos os produtos como disponíveis?")) return;
  AdminState.outProducts.clear(); AdminState.outOptions.clear(); saveStock();
  await pushStockToGithub();
  purgeOutOfStockFromCart(); renderMenu(); renderAdminDashboard();
  showToast("Estoque atualizado ✅", "Todos os produtos disponíveis");
}

function filterStockList(query) {
  const n = normalizeSearch(query);
  document.querySelectorAll(".stock-product").forEach(prod => {
    const prodName = prod.dataset.name || "";
    let prodMatch = !n || prodName.includes(n), anySubMatch = false;
    prod.querySelectorAll(".stock-sub-item").forEach(sub => { const sn = sub.dataset.name || ""; const m = !n || sn.includes(n) || prodMatch; sub.style.display = m ? "" : "none"; if (m) anySubMatch = true; });
    prod.style.display = (prodMatch || anySubMatch) ? "" : "none";
    if (n && anySubMatch && !prodMatch) { const sub = prod.querySelector(".stock-sub-items"); const icon = prod.querySelector(".stock-expand-icon"); if (sub) sub.style.display = "block"; icon?.classList.add("stock-expand-open"); }
  });
  document.querySelectorAll(".stock-category").forEach(cat => { const has = Array.from(cat.querySelectorAll(".stock-product")).some(p => p.style.display !== "none"); cat.style.display = has ? "" : "none"; });
}

// ── Componentes visuais admin ────────────────────────────────
function _renderOrderCard(o, detail = false) {
  const pl = PAYMENT_LABELS[o.payment] ?? o.payment, is = o.items.map(i => `${i.quantity}× ${escapeHTML(i.name)}`).join(", ");
  return `<div class="admin-order-card"><div class="order-card-header"><div class="order-id"><span class="order-id-label">#</span><span class="order-id-value">${escapeHTML(o.id.slice(-8))}</span></div><div class="order-time"><i class="fas fa-clock"></i> ${escapeHTML(o.time)}</div></div><div class="order-card-body"><div class="order-customer"><i class="fas fa-user"></i><span>${escapeHTML(o.customer.name)}</span></div>${detail?`<div class="order-address"><i class="fas fa-map-marker-alt"></i><span>${escapeHTML(o.address.street)}, ${escapeHTML(o.address.number)} — ${escapeHTML(o.address.neighborhood)}</span></div><div class="order-phone"><i class="fas fa-phone"></i><span>${escapeHTML(o.customer.phone)}</span></div>`:""}<div class="order-items-summary"><i class="fas fa-shopping-bag"></i><span>${is}</span></div>${detail?`<div class="order-items-detail">${o.items.map(i=>`<div class="order-item-line"><span>${i.quantity}× ${escapeHTML(i.name)}${i.modifiers?.length?`<em>(${escapeHTML(i.modifiers.join(", "))})</em>`:""}</span><span>${fmt(i.lineTotal)}</span></div>`).join("")}</div>`:""}</div><div class="order-card-footer"><span class="order-payment">${pl}</span><span class="order-total">${fmt(o.total)}</span></div></div>`;
}

function _renderPaymentBar(pb, total) { if (total === 0) return `<div class="payment-empty">Sem dados</div>`; const items = [{key:"pix",label:"PIX",icon:"✅",color:"#22c55e"},{key:"cartao",label:"Cartão",icon:"💳",color:"#3b82f6"},{key:"dinheiro",label:"Dinheiro",icon:"💵",color:"#f59e0b"}]; return `<div class="payment-bar-container"><div class="payment-bar">${items.map(i => { const c = pb[i.key]||0, p = total>0?c/total*100:0; return p>0?`<div class="payment-bar-segment" style="width:${p}%;background:${i.color}"></div>`:""; }).join("")}</div><div class="payment-legend">${items.map(i => `<div class="payment-legend-item"><span class="legend-dot" style="background:${i.color}"></span><span>${i.icon} ${i.label}: ${pb[i.key]||0}</span></div>`).join("")}</div></div>`; }
function _renderRevenueChart(gr, dates) { const mx = Math.max(...dates.map(d => gr[d]?.totalRevenue||0),1); return `<div class="revenue-bars">${[...dates].reverse().map(d => { const day = gr[d], p = day.totalRevenue/mx*100, it = d===_dateKey(new Date()); return `<div class="revenue-bar-item ${it?"bar-today":""}" onclick="viewDateDetails('${d}')"><div class="revenue-bar-value">${fmt(day.totalRevenue)}</div><div class="revenue-bar" style="height:${Math.max(p,5)}%"></div><div class="revenue-bar-label">${_formatDate(d).slice(0,5)}</div><div class="revenue-bar-orders">${day.totalOrders}p</div></div>`; }).join("")}</div>`; }
function _animateCounters() { document.querySelectorAll(".stat-value[data-target]").forEach(el => { const target = parseFloat(el.dataset.target)||0, format = el.dataset.format, duration = 1200, start = performance.now(); function update(now) { const elapsed = now-start, progress = Math.min(elapsed/duration,1), eased = 1-Math.pow(1-progress,3), current = target*eased; el.textContent = format==="currency"?fmt(current):Math.round(current).toString(); if (progress<1) requestAnimationFrame(update); } requestAnimationFrame(update); }); }

// ── Templates HTML ───────────────────────────────────────────
function _getOrCreateAdminModal() { let m = document.getElementById("adminModal"); if (!m) { m = document.createElement("div"); m.id = "adminModal"; m.className = "admin-modal"; m.setAttribute("role","dialog"); m.setAttribute("aria-modal","true"); m.setAttribute("aria-hidden","true"); document.body.appendChild(m); } return m; }
function _adminLoginHTML() { return `<div class="admin-login-container"><div class="admin-login-card"><button class="modal-close" onclick="closeAdmin()"><i class="fas fa-times"></i></button><div class="admin-login-header"><div class="admin-login-icon">👑</div><h2>Área Administrativa</h2><p>Insira a senha para acessar</p></div><div class="admin-login-body"><div class="input-group"><label for="adminPassword"><i class="fas fa-lock"></i> Senha</label><input type="password" id="adminPassword" placeholder="Senha..." onkeydown="adminLoginKeydown(event)" autocomplete="off"></div><button class="btn-primary-admin" onclick="authenticateAdmin()"><i class="fas fa-sign-in-alt"></i> Entrar</button></div></div></div>`; }

function _adminDashboardHTML() {
  return `<div class="admin-dashboard">
    <div class="admin-header">
      <h2 class="admin-title"><span>👑</span> Painel Admin</h2>
      <div class="admin-header-right">
        <button class="admin-btn-icon" onclick="switchAdminView('config')" title="GitHub Config"><i class="fab fa-github"></i></button>
        <button class="admin-btn-icon" onclick="logoutAdmin()" title="Sair"><i class="fas fa-sign-out-alt"></i></button>
        <button class="admin-btn-icon" onclick="closeAdmin()" title="Fechar"><i class="fas fa-times"></i></button>
      </div>
    </div>
    <div class="admin-nav">
      <button class="admin-nav-btn active" data-view="today" onclick="switchAdminView('today')"><i class="fas fa-home"></i> Hoje</button>
      <button class="admin-nav-btn" data-view="history" onclick="switchAdminView('history')"><i class="fas fa-calendar-alt"></i> Histórico</button>
      <button class="admin-nav-btn" data-view="stock" onclick="switchAdminView('stock')"><i class="fas fa-boxes"></i> Estoque</button>
    </div>
    <div id="adminContent" class="admin-content"></div>
  </div>`;
}

function _createAdminFooter() {
  const f = document.createElement("footer"); f.className = "admin-footer"; f.id = "adminFooter";
  f.innerHTML = `<div class="admin-footer-content"><div class="admin-footer-brand"><span class="footer-crown">👑</span><div class="footer-brand-text"><span class="footer-brand-name">${escapeHTML(CONFIG.storeName)}</span><span class="footer-brand-sub">Menu Digital v3.0</span></div></div><div class="admin-footer-divider"></div><button class="admin-footer-btn" onclick="openAdmin()"><i class="fas fa-lock"></i><span>Área Restrita</span></button><p class="admin-footer-copy">&copy; ${new Date().getFullYear()} ${escapeHTML(CONFIG.storeName)}</p></div>`;
  document.body.appendChild(f);
}

window.addEventListener("beforeunload", stopGithubPolling);