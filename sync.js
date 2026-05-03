/* ============================================================
   IMPÉRIO LANCHES — Sincronização em Tempo Real via Supabase
   ============================================================ */

(function () {

  // ── CONFIGURAÇÃO ─────────────────────────────────────────
  // Cole aqui os valores do seu projeto Supabase:
  const SUPABASE_URL = "https://vvsbzdonsayqdteuagui.supabase.co/rest/v1/"; // ← ALTERE
  const SUPABASE_KEY = "sb_secret_fk7zuEb9XnNoaC4yLwwwhA_bMJhWqRJ";           // ← ALTERE

  // ─────────────────────────────────────────────────────────

  const HEADERS = {
    "Content-Type":  "application/json",
    "apikey":        SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
  };

  const URL_ESTOQUE = `${SUPABASE_URL}/rest/v1/estoque?id=eq.1`;
  const URL_REALTIME = `${SUPABASE_URL}/realtime/v1`;

  let realtimeChannel = null;

  // ── LEITURA — busca estoque do Supabase ──────────────────
  async function buscarEstoque() {
    try {
      const res = await fetch(URL_ESTOQUE, {
        headers: { ...HEADERS, "Accept": "application/json" },
      });

      if (!res.ok) return;

      const rows = await res.json();
      if (!rows.length) return;

      const dados = rows[0];
      aplicarEstoque(dados.products || [], dados.options || []);

    } catch (e) {
      // silencioso
    }
  }

  // ── ESCRITA — envia estoque para Supabase ────────────────
  async function salvarEstoque() {
    try {
      await fetch(URL_ESTOQUE, {
        method: "PATCH",
        headers: { ...HEADERS, "Prefer": "return=minimal" },
        body: JSON.stringify({
          products:   [...AdminState.outProducts],
          options:    [...AdminState.outOptions.keys()],
          updated_at: new Date().toISOString(),
        }),
      });

      console.log("[Supabase] Estoque salvo ✓");

    } catch (e) {
      console.error("[Supabase] Erro ao salvar:", e);
    }
  }

  // ── APLICAR — atualiza estado local ─────────────────────
  function aplicarEstoque(products, options) {
    const novosProd = new Set(products);
    const novasOpc  = new Map(options.map(k => [k, true]));

    const mudouProd = JSON.stringify([...AdminState.outProducts].sort()) !==
                      JSON.stringify([...novosProd].sort());
    const mudouOpc  = JSON.stringify([...AdminState.outOptions.keys()].sort()) !==
                      JSON.stringify([...novasOpc.keys()].sort());

    if (!mudouProd && !mudouOpc) return;

    AdminState.outProducts = novosProd;
    AdminState.outOptions  = novasOpc;
    saveStock();

    purgeOutOfStockFromCart();
    renderMenu();

    // Atualiza admin se estiver na aba de estoque
    const adminModal = document.getElementById("adminModal");
    if (adminModal?.classList.contains("active") &&
        AdminState.currentView === "stock") {
      renderAdminDashboard();
    }

    console.log("[Supabase] Estoque aplicado ✓");
  }

  // ── TEMPO REAL — escuta mudanças instantâneas ────────────
  function iniciarTempoReal() {
    try {
      // Conecta ao WebSocket do Supabase
      const wsUrl = URL_REALTIME
        .replace("https://", "wss://")
        .replace("http://",  "ws://");

      const ws = new WebSocket(
        `${wsUrl}/websocket?apikey=${SUPABASE_KEY}&vsn=1.0.0`
      );

      ws.onopen = () => {
        console.log("[Supabase] Conectado em tempo real ✓");

        // Assina mudanças na tabela estoque
        ws.send(JSON.stringify({
          topic:   "realtime:public:estoque",
          event:   "phx_join",
          payload: {},
          ref:     "1",
        }));
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);

          // Quando a tabela for atualizada
          if (msg.event === "UPDATE" || msg.event === "postgres_changes") {
            const novo = msg.payload?.record || msg.payload?.new;
            if (novo) {
              console.log("[Supabase] Mudança detectada em tempo real!");
              aplicarEstoque(novo.products || [], novo.options || []);
            }
          }
        } catch { /* silencioso */ }
      };

      ws.onclose = () => {
        console.log("[Supabase] Conexão fechada, reconectando em 5s...");
        setTimeout(iniciarTempoReal, 5000); // Reconecta
      };

      ws.onerror = () => {
        ws.close();
      };

      realtimeChannel = ws;

    } catch (e) {
      console.error("[Supabase] Erro WebSocket:", e);
      // Fallback para polling se WebSocket falhar
      setInterval(buscarEstoque, 10_000);
    }
  }

  // ── CARRINHO — remove itens esgotados ───────────────────
  function purgeOutOfStockFromCart() {
    if (!State.cart?.length) return;

    const removidos = [];

    State.cart = State.cart.filter(item => {
      const produto = findProduct(item.productId);
      if (!produto)                            { removidos.push(item.name); return false; }
      if (isProductOut(item.productId))        { removidos.push(item.name); return false; }
      if (isProductEffectivelyOut(item.productId)) { removidos.push(item.name); return false; }

      if (item.modifiers?.length && produto.modifiers?.length) {
        for (let mi = 0; mi < produto.modifiers.length; mi++) {
          const mod = produto.modifiers[mi];
          for (let oi = 0; oi < mod.options.length; oi++) {
            if (
              item.modifiers.includes(mod.options[oi].name) &&
              isOptionOut(item.productId, mi, oi)
            ) {
              removidos.push(`${item.name} (${mod.options[oi].name})`);
              return false;
            }
          }
        }
      }

      return true;
    });

    if (!removidos.length) return;

    saveCart();
    updateCartUI();

    if (!State.cart.length) {
      const sb = document.getElementById("cartSidebar");
      if (sb?.classList.contains("active")) toggleCart();
      const co = document.getElementById("checkoutModal");
      if (co?.classList.contains("active")) closeCheckout();
    }

    const msg = removidos.length === 1
      ? `${removidos[0]} ficou indisponível`
      : `${removidos.slice(0,2).join(", ")}${removidos.length > 2 ? ` e mais ${removidos.length - 2}` : ""} — indisponíveis`;

    showToast(
      `${removidos.length === 1 ? "Item" : removidos.length + " itens"} removido${removidos.length > 1 ? "s" : ""} da sacola 🚫`,
      msg,
      "warn"
    );
  }

  // ── DEBOUNCE — evita envios em excesso ──────────────────
  let _debounceTimer = null;
  function salvarComDebounce() {
    clearTimeout(_debounceTimer);
    _debounceTimer = setTimeout(salvarEstoque, 600);
  }

  // ── INTERCEPTA FUNÇÕES DO ADMIN ─────────────────────────
  // Envia para Supabase sempre que admin altera estoque

  if (typeof handleProductToggle !== "undefined") {
    const _orig = handleProductToggle;
    window.handleProductToggle = function (id, chk) {
      _orig(id, chk);
      purgeOutOfStockFromCart();
      salvarComDebounce();
    };
  }

  if (typeof handleOptionToggle !== "undefined") {
    const _orig = handleOptionToggle;
    window.handleOptionToggle = function (id, mi, oi, chk) {
      _orig(id, mi, oi, chk);
      purgeOutOfStockFromCart();
      salvarComDebounce();
    };
  }

  if (typeof stockClearAll !== "undefined") {
    const _orig = stockClearAll;
    window.stockClearAll = function () {
      _orig();
      salvarComDebounce();
    };
  }

  if (typeof openCheckout !== "undefined") {
    const _orig = openCheckout;
    window.openCheckout = function () {
      buscarEstoque().then(() => {
        purgeOutOfStockFromCart();
        if (!State.cart?.length) {
          showToast("Sacola vazia 🛒", "Todos os itens ficaram indisponíveis", "warn");
          return;
        }
        _orig();
      });
    };
  }

  if (typeof sendToWhatsApp !== "undefined") {
    const _orig = sendToWhatsApp;
    window.sendToWhatsApp = function () {
      buscarEstoque().then(() => {
        purgeOutOfStockFromCart();
        if (!State.cart?.length) {
          showToast("Sacola vazia 🛒", "Todos os itens ficaram indisponíveis", "warn");
          closeCheckout();
          return;
        }
        _orig();
      });
    };
  }

  // ── INICIA ───────────────────────────────────────────────
  function init() {
    buscarEstoque();        // Lê estoque imediatamente
    iniciarTempoReal();     // Liga atualizações em tempo real
    purgeOutOfStockFromCart();

    // Polling como backup (caso WebSocket falhe)
    setInterval(buscarEstoque, 30_000);

    console.log("[Supabase] Sistema iniciado ✓");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();