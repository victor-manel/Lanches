/* ============================================================
   IMPÉRIO LANCHES — Sincronização via GitHub
   sync.js v1.0
   ============================================================
   Cole este arquivo separado e inclua no HTML:
   <script src="sync.js"></script>
   DEPOIS do <script src="app.js"></script>
   ============================================================ */

"use strict";

(function () {

  /* ──────────────────────────────────────────────────────────
     CONFIGURAÇÃO
     Edite apenas estas variáveis:
     ────────────────────────────────────────────────────────── */
  const CFG = {
    repo:   "victor-manel/imperio-estoque",  // ← ALTERE
    branch: "main",
    file:   "estoque.json",
    token:  "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",              // ← cole o ghp_... aqui
    poll:   15_000,          // ms entre verificações dos clientes
  };

  /* ──────────────────────────────────────────────────────────
     URLS
     ────────────────────────────────────────────────────────── */
  function rawUrl()  {
    return `https://raw.githubusercontent.com/${CFG.repo}/${CFG.branch}/${CFG.file}?_=${Date.now()}`;
  }
  function apiUrl()  {
    return `https://api.github.com/repos/${CFG.repo}/contents/${CFG.file}`;
  }

  /* ──────────────────────────────────────────────────────────
     ESTADO INTERNO
     ────────────────────────────────────────────────────────── */
  let _pollTimer     = null;
  let _localPollTimer = null;
  let _lastRemoteSnap = "";
  let _lastLocalSnap  = "";
  let _isSyncing      = false;
  let _indicator      = null;

  /* ──────────────────────────────────────────────────────────
     HELPERS
     ────────────────────────────────────────────────────────── */
  function log(...args)  { console.log("[Sync]", ...args); }
  function warn(...args) { console.warn("[Sync]", ...args); }

  function getLocalSnap() {
    try { return localStorage.getItem(ADMIN_CONFIG.stockKey) || ""; }
    catch { return ""; }
  }

  function stockToObject() {
    return {
      products:   [...AdminState.outProducts],
      options:    [...AdminState.outOptions.keys()],
      updated_at: new Date().toISOString(),
    };
  }

  function applyRemoteData(data) {
    const newProducts = new Set(data.products || []);
    const newOptions  = new Map((data.options || []).map(k => [k, true]));

    const changed =
      JSON.stringify([...AdminState.outProducts].sort()) !== JSON.stringify([...newProducts].sort()) ||
      JSON.stringify([...AdminState.outOptions.keys()].sort()) !== JSON.stringify([...newOptions.keys()].sort());

    if (!changed) return false;

    AdminState.outProducts = newProducts;
    AdminState.outOptions  = newOptions;
    saveStock();
    return true;
  }

  /* ──────────────────────────────────────────────────────────
     INDICADOR VISUAL
     ────────────────────────────────────────────────────────── */
  function createIndicator() {
    if (_indicator) return;
    _indicator = document.createElement("div");
    _indicator.id = "syncIndicator";
    _indicator.className = "connection-indicator online";
    _indicator.title = "Sincronização com GitHub";
    document.body.appendChild(_indicator);
  }

  function setIndicator(state) {
    if (!_indicator) return;
    _indicator.className = `connection-indicator ${state}`;
  }

  /* ──────────────────────────────────────────────────────────
     LEITURA DO GITHUB (clientes)
     ────────────────────────────────────────────────────────── */
  async function fetchFromGitHub() {
    if (_isSyncing) return;

    try {
      const res = await fetch(rawUrl(), { cache: "no-store" });

      if (!res.ok) {
        warn(`Fetch falhou: HTTP ${res.status}`);
        setIndicator("offline");
        return;
      }

      const data = await res.json();
      const snap = JSON.stringify(data);

      setIndicator("online");

      if (snap === _lastRemoteSnap) return; // nada mudou
      _lastRemoteSnap = snap;

      const changed = applyRemoteData(data);
      if (!changed) return;

      log("Estoque remoto aplicado");

      // Atualiza UI
      purgeOutOfStockFromCart();
      renderMenu();

      // Modal aberto — fecha se produto esgotou
      const modal = document.getElementById("productModal");
      if (modal?.classList.contains("active") && State.modal.product) {
        if (isProductEffectivelyOut(State.modal.product.id)) {
          closeProductModal();
          showToast("Produto esgotou 😔", State.modal.product.name + " ficou indisponível", "warn");
        } else {
          renderModifiers(State.modal.product);
          updateModalPrice();
        }
      }

      // Admin: atualiza aba de estoque
      const adminModal = document.getElementById("adminModal");
      if (adminModal?.classList.contains("active") && AdminState.currentView === "stock") {
        renderAdminDashboard();
      }

    } catch (err) {
      warn("Erro ao buscar GitHub:", err.message);
      setIndicator("offline");
    }
  }

  /* ──────────────────────────────────────────────────────────
     ESCRITA NO GITHUB (admin)
     ────────────────────────────────────────────────────────── */
  async function pushToGitHub() {
    if (!CFG.token) {
      warn("Token não configurado — use a tela de configuração no admin");
      return false;
    }

    _isSyncing = true;
    setIndicator("offline"); // pisca durante envio

    try {
      // 1. Pega SHA atual do arquivo
      const getRes = await fetch(apiUrl(), {
        headers: {
          Authorization: `token ${CFG.token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (!getRes.ok) throw new Error(`GET falhou: ${getRes.status}`);

      const fileData = await getRes.json();
      const sha      = fileData.sha;

      // 2. Codifica conteúdo em base64
      const content     = JSON.stringify(stockToObject(), null, 2);
      const encoded     = btoa(unescape(encodeURIComponent(content)));
      const commitMsg   = `estoque: ${new Date().toLocaleString("pt-BR")}`;

      // 3. Envia
      const putRes = await fetch(apiUrl(), {
        method: "PUT",
        headers: {
          Authorization: `token ${CFG.token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: commitMsg, content: encoded, sha, branch: CFG.branch }),
      });

      if (!putRes.ok) {
        const err = await putRes.json().catch(() => ({}));
        throw new Error(`PUT falhou: ${putRes.status} — ${err.message || ""}`);
      }

      // Atualiza snapshot local para não re-detectar como mudança
      _lastRemoteSnap = JSON.stringify(stockToObject());
      _lastLocalSnap  = getLocalSnap();

      log("Estoque enviado para GitHub ✓");
      setIndicator("online");
      return true;

    } catch (err) {
      warn("Erro ao enviar:", err.message);
      setIndicator("offline");
      showToast("Erro ao salvar 🌐", err.message, "error");
      return false;

    } finally {
      _isSyncing = false;
    }
  }

  /* ──────────────────────────────────────────────────────────
     POLLING LOCAL (mesma aba / outras abas pelo localStorage)
     ────────────────────────────────────────────────────────── */
  function startLocalPolling() {
    _lastLocalSnap = getLocalSnap();
    if (_localPollTimer) clearInterval(_localPollTimer);

    _localPollTimer = setInterval(() => {
      const now = getLocalSnap();
      if (now !== _lastLocalSnap) {
        _lastLocalSnap = now;
        loadStock();
        purgeOutOfStockFromCart();
        renderMenu();
      }
    }, 3_000);
  }

  /* ──────────────────────────────────────────────────────────
     POLLING REMOTO (GitHub)
     ────────────────────────────────────────────────────────── */
  function startRemotePolling() {
    fetchFromGitHub(); // imediato
    if (_pollTimer) clearInterval(_pollTimer);
    _pollTimer = setInterval(fetchFromGitHub, CFG.poll);
  }

  /* ──────────────────────────────────────────────────────────
     STORAGE EVENT (outras abas — instantâneo)
     ────────────────────────────────────────────────────────── */
  window.addEventListener("storage", (e) => {
    if (e.key !== ADMIN_CONFIG.stockKey) return;
    log("storage event — recarregando estoque");
    loadStock();
    purgeOutOfStockFromCart();
    renderMenu();
  });

  /* ──────────────────────────────────────────────────────────
     VISIBILIDADE / FOCO
     ────────────────────────────────────────────────────────── */
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") fetchFromGitHub();
  });
  window.addEventListener("focus", fetchFromGitHub);

  /* ──────────────────────────────────────────────────────────
     LIMPEZA DO CARRINHO (reutiliza a do app.js ou define aqui)
     ────────────────────────────────────────────────────────── */
  function purgeOutOfStockFromCart() {
    if (!State.cart.length) return;

    const removed = [];

    State.cart = State.cart.filter(item => {
      const product = findProduct(item.productId);
      if (!product) { removed.push(item.name); return false; }
      if (isProductOut(item.productId))            { removed.push(item.name); return false; }
      if (isProductEffectivelyOut(item.productId)) { removed.push(item.name); return false; }

      if (item.modifiers?.length && product.modifiers?.length) {
        for (let mi = 0; mi < product.modifiers.length; mi++) {
          const mod = product.modifiers[mi];
          for (let oi = 0; oi < mod.options.length; oi++) {
            if (item.modifiers.includes(mod.options[oi].name) && isOptionOut(item.productId, mi, oi)) {
              removed.push(`${item.name} (${mod.options[oi].name})`);
              return false;
            }
          }
        }
      }
      return true;
    });

    if (!removed.length) return;

    saveCart();
    updateCartUI();

    // Fecha sidebar/checkout se ficou vazio
    if (!State.cart.length) {
      const sb = document.getElementById("cartSidebar");
      if (sb?.classList.contains("active")) toggleCart();
      const co = document.getElementById("checkoutModal");
      if (co?.classList.contains("active")) closeCheckout();
    }

    const msg = removed.length === 1
      ? `${removed[0]} ficou indisponível`
      : `${removed.slice(0,2).join(", ")}${removed.length > 2 ? ` e mais ${removed.length-2}` : ""} — indisponíveis`;

    showToast(`${removed.length === 1 ? "Item" : removed.length + " itens"} removido${removed.length > 1 ? "s" : ""} 🚫`, msg, "warn");
    log("Removidos do carrinho:", removed);
  }

  /* ──────────────────────────────────────────────────────────
     INTERCEPTA FUNÇÕES DE ESTOQUE DO APP.JS
     Para enviar ao GitHub toda vez que admin altera
     ────────────────────────────────────────────────────────── */
  let _pushTimeout = null;

  function schedulePush() {
    // Debounce: espera 800ms após última alteração para enviar
    clearTimeout(_pushTimeout);
    _pushTimeout = setTimeout(() => {
      pushToGitHub().then(ok => {
        if (!ok) {
          showToast(
            "Salvo localmente ⚠️",
            "Não foi possível salvar no GitHub. Configure o token.",
            "warn"
          );
        }
      });
    }, 800);
  }

  // Intercepta handleProductToggle
  if (typeof handleProductToggle !== "undefined") {
    const orig = handleProductToggle;
    window.handleProductToggle = function (productId, checkbox) {
      orig(productId, checkbox);
      purgeOutOfStockFromCart();
      schedulePush();
    };
  }

  // Intercepta handleOptionToggle
  if (typeof handleOptionToggle !== "undefined") {
    const orig = handleOptionToggle;
    window.handleOptionToggle = function (productId, modIdx, optIdx, checkbox) {
      orig(productId, modIdx, optIdx, checkbox);
      purgeOutOfStockFromCart();
      schedulePush();
    };
  }

  // Intercepta stockClearAll
  if (typeof stockClearAll !== "undefined") {
    const orig = stockClearAll;
    window.stockClearAll = function () {
      orig();
      schedulePush();
    };
  }

  // Intercepta openCheckout
  if (typeof openCheckout !== "undefined") {
    const orig = openCheckout;
    window.openCheckout = function () {
      loadStock();
      purgeOutOfStockFromCart();
      if (!State.cart.length) {
        showToast("Sacola vazia 🛒", "Todos os itens ficaram indisponíveis", "warn");
        return;
      }
      orig();
    };
  }

  // Intercepta sendToWhatsApp
  if (typeof sendToWhatsApp !== "undefined") {
    const orig = sendToWhatsApp;
    window.sendToWhatsApp = function () {
      loadStock();
      purgeOutOfStockFromCart();
      if (!State.cart.length) {
        showToast("Sacola vazia 🛒", "Todos os itens ficaram indisponíveis", "warn");
        closeCheckout();
        return;
      }
      orig();
    };
  }

  /* ──────────────────────────────────────────────────────────
     TELA DE CONFIGURAÇÃO NO ADMIN
     ────────────────────────────────────────────────────────── */
  window.openGitHubConfig = function () {
    const adminContent = document.getElementById("adminContent");
    if (!adminContent) return;

    // Remove seção anterior se existir
    document.getElementById("githubConfigSection")?.remove();

    const section = document.createElement("div");
    section.id = "githubConfigSection";
    section.className = "github-config-section";
    section.innerHTML = `
      <h3><i class="fab fa-github"></i> Configuração GitHub</h3>
      <p>Para sincronizar o estoque entre todos os dispositivos, preencha os dados abaixo.</p>

      <label>Repositório (usuario/nome-do-repo)</label>
      <input type="text" id="cfgRepo" value="${escapeHTML(CFG.repo)}"
             placeholder="seu-usuario/imperio-estoque">

      <label>Branch</label>
      <input type="text" id="cfgBranch" value="${escapeHTML(CFG.branch)}"
             placeholder="main">

      <label>Arquivo JSON</label>
      <input type="text" id="cfgFile" value="${escapeHTML(CFG.file)}"
             placeholder="estoque.json">

      <label>Token GitHub (ghp_...)</label>
      <input type="password" id="cfgToken" value="${escapeHTML(CFG.token)}"
             placeholder="ghp_xxxxxxxxxxxxxx">
      <p style="margin:-8px 0 12px;font-size:11px">
        <a href="https://github.com/settings/tokens/new?scopes=repo&description=Imperio+Estoque"
           target="_blank" rel="noopener"
           style="color:var(--primary)">
          <i class="fas fa-external-link-alt"></i> Criar token (permissão: repo)
        </a>
      </p>

      <label>Intervalo de verificação (segundos)</label>
      <input type="number" id="cfgPoll" value="${CFG.poll / 1000}" min="5" max="60">

      <button class="btn-primary-admin" onclick="saveGitHubConfig()" style="margin-bottom:8px">
        <i class="fas fa-save"></i> Salvar e Testar
      </button>

      <div class="github-status-box" id="githubStatusBox">
        <i class="fas fa-circle-notch fa-spin github-status-loading"></i>
        <span>Verificando conexão...</span>
      </div>`;

    adminContent.prepend(section);
    setTimeout(checkGitHubStatus, 300);
  };

  window.saveGitHubConfig = function () {
    CFG.repo   = document.getElementById("cfgRepo")?.value.trim()   || CFG.repo;
    CFG.branch = document.getElementById("cfgBranch")?.value.trim() || CFG.branch;
    CFG.file   = document.getElementById("cfgFile")?.value.trim()   || CFG.file;
    CFG.token  = document.getElementById("cfgToken")?.value.trim()  || "";
    CFG.poll   = (parseInt(document.getElementById("cfgPoll")?.value) || 15) * 1000;

    // Persiste
    try {
      localStorage.setItem("github_sync_cfg", JSON.stringify({
        repo: CFG.repo, branch: CFG.branch, file: CFG.file,
        token: CFG.token, poll: CFG.poll,
      }));
    } catch {}

    // Reinicia
    if (_pollTimer) clearInterval(_pollTimer);
    startRemotePolling();

    showToast("Configuração salva ✅", "GitHub configurado com sucesso", "success");
    setTimeout(checkGitHubStatus, 500);
  };

  async function checkGitHubStatus() {
    const box = document.getElementById("githubStatusBox");
    if (!box) return;

    box.innerHTML = `<i class="fas fa-circle-notch fa-spin github-status-loading"></i><span>Verificando...</span>`;

    try {
      const res = await fetch(rawUrl(), { cache: "no-store" });
      if (res.ok) {
        box.innerHTML = `<i class="fas fa-check-circle github-status-online"></i><span style="color:var(--success)">Conectado! Arquivo encontrado.</span>`;
      } else {
        box.innerHTML = `<i class="fas fa-times-circle github-status-offline"></i><span style="color:var(--error)">Erro ${res.status}: verifique o repositório.</span>`;
      }
    } catch (e) {
      box.innerHTML = `<i class="fas fa-times-circle github-status-offline"></i><span style="color:var(--error)">Sem conexão: ${e.message}</span>`;
    }
  }

  /* ──────────────────────────────────────────────────────────
     CARREGA CONFIGURAÇÃO SALVA
     ────────────────────────────────────────────────────────── */
  (function loadSavedConfig() {
    try {
      const saved = JSON.parse(localStorage.getItem("github_sync_cfg") || "{}");
      if (saved.repo)   CFG.repo   = saved.repo;
      if (saved.branch) CFG.branch = saved.branch;
      if (saved.file)   CFG.file   = saved.file;
      if (saved.token)  CFG.token  = saved.token;
      if (saved.poll)   CFG.poll   = saved.poll;
    } catch {}
  })();

  /* ──────────────────────────────────────────────────────────
     INICIA TUDO
     ────────────────────────────────────────────────────────── */
  function init() {
    createIndicator();
    startLocalPolling();
    startRemotePolling();
    purgeOutOfStockFromCart();
    log(`Ativo — GitHub: ${CFG.repo} — poll: ${CFG.poll/1000}s`);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("beforeunload", () => {
    clearInterval(_pollTimer);
    clearInterval(_localPollTimer);
  });

})();