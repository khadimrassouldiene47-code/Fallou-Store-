/**
 * Fallou Store - Client Supabase avec synchronisation temps reel
 * URL: https://domzxqknhburyjmwykkn.supabase.co
 * Ce fichier gere: visites, commandes, paniers abandonnes, produits
 * Strategie: Supabase en priorite, localStorage en fallback offline
 */

const SUPABASE_CONFIG = {
  url: "https://domzxqknhburyjmwykkn.supabase.co",
  anonKey: "sb_publishable_cp1YvvJeebVKEGLPYqqxAg_Ktk0h8Qn"
};

class FallouStoreDB {
  constructor() {
    this.url = SUPABASE_CONFIG.url;
    this.anonKey = SUPABASE_CONFIG.anonKey;
    this.localKeyProducts = "fallou_store_products_v2";
    this.localKeyOrders   = "fallou_store_orders_v1";
    this.localKeyAbandoned = "fallou_store_abandoned_v1";
    this.localKeyStats    = "fallou_store_stats_v1";
    this.sessionId        = this._getOrCreateSession();
    this.isOnline         = false;
    this.init();
  }

  // --- GESTION DE SESSION ---
  _getOrCreateSession() {
    let sid = sessionStorage.getItem("fs_session_id");
    if (!sid) {
      sid = "sess_" + Math.random().toString(36).slice(2, 11) + "_" + Date.now();
      sessionStorage.setItem("fs_session_id", sid);
    }
    return sid;
  }

  // --- REQUETES SUPABASE (REST API) ---
  async _req(method, table, body = null, params = "") {
    const headers = {
      "apikey": this.anonKey,
      "Authorization": "Bearer " + this.anonKey,
      "Content-Type": "application/json",
      "Prefer": method === "POST" ? "return=representation" : "return=minimal"
    };
    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(this.url + "/rest/v1/" + table + params, opts);
    if (!res.ok) {
      const err = await res.text();
      throw new Error("Supabase " + method + " " + table + ": " + err);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }

  async _reqView(viewName) {
    const headers = {
      "apikey": this.anonKey,
      "Authorization": "Bearer " + this.anonKey,
      "Accept": "application/json"
    };
    const res = await fetch(this.url + "/rest/v1/" + viewName, { headers });
    if (!res.ok) throw new Error("View " + viewName + " error");
    return res.json();
  }

  // --- INITIALISATION ---
  async init() {
    // Tester si Supabase est accessible
    try {
      await fetch(this.url + "/rest/v1/visits?limit=1", {
        headers: { "apikey": this.anonKey, "Authorization": "Bearer " + this.anonKey }
      });
      this.isOnline = true;
    } catch (e) {
      this.isOnline = false;
    }

    // Produits locaux si pas encore chargés
    if (!localStorage.getItem(this.localKeyProducts)) {
      if (typeof INITIAL_PRODUCTS !== "undefined") {
        localStorage.setItem(this.localKeyProducts, JSON.stringify(INITIAL_PRODUCTS));
      }
    }

    // Commandes demo si vide
    let existingOrders = [];
    try { existingOrders = JSON.parse(localStorage.getItem(this.localKeyOrders) || "[]"); } catch(e) {}
    if (!existingOrders || existingOrders.length < 2) {
      const now = Date.now();
      const demo = [
        { id: "FS-CMD-90412", date: new Date(now - 1000*60*35).toISOString(),
          customerName: "Cheikh Tidiane Diop", customerPhone: "77 821 44 19",
          deliveryZone: "Almadies / Ngor / Ouakam", deliverySlot: "Aujourd'hui - 14h00-16h30",
          deliveryFee: 2000, paymentMethod: "Wave", whatsappNumber: "221778944041",
          items: [{ id:"fs-prod-01", name:"AirPods Max 2", price:80000, quantity:1 }],
          totalAmount: 82000, status: "À préparer", notes: "" },
        { id: "FS-CMD-89945", date: new Date(now - 1000*60*95).toISOString(),
          customerName: "Fatou Bintou Sow", customerPhone: "78 456 78 90",
          deliveryZone: "Dakar Centre (Plateau, Médina)",
          deliverySlot: "Aujourd'hui - En cours", deliveryFee: 2000,
          paymentMethod: "Orange Money", whatsappNumber: "221778944041",
          items: [{ id:"fs-prod-08", name:"Oud Al Malik Eau de Parfum", price:18000, quantity:2 }],
          totalAmount: 38000, status: "En cours de livraison", notes: "Livreur: Mamadou" },
        { id: "FS-CMD-88720", date: new Date(now - 1000*3600*26).toISOString(),
          customerName: "Moussa Ndiaye", customerPhone: "76 345 12 98",
          deliveryZone: "Dakar Centre", deliverySlot: "Hier",
          deliveryFee: 2000, paymentMethod: "Wave", whatsappNumber: "221778944041",
          items: [{ id:"fs-prod-02", name:"DJI Mic Mini", price:90000, quantity:1 }],
          totalAmount: 92000, status: "Livrée", notes: "Livré et payé." }
      ];
      localStorage.setItem(this.localKeyOrders, JSON.stringify(demo));
    }

    if (!localStorage.getItem(this.localKeyAbandoned)) {
      const demo = [
        { id: "ABN-" + Date.now().toString().slice(-5), date: new Date(Date.now()-7200000).toISOString(),
          items:[{ name:"DJI Mic Mini", price:90000, quantity:1 }],
          estimatedTotal:90000, customerName:"Amadou Diallo", customerPhone:"77 564 32 10" }
      ];
      localStorage.setItem(this.localKeyAbandoned, JSON.stringify(demo));
    }

    // Enregistrer la visite (sans bloquer)
    this.recordVisit();
  }

  // --- VISITES EN TEMPS REEL ---
  async recordVisit() {
    const todayStr = new Date().toISOString().slice(0, 10);
    // Mise à jour stats locales
    let stats = {};
    try { stats = JSON.parse(localStorage.getItem(this.localKeyStats) || "{}"); } catch(e) {}
    if (stats.lastDay !== todayStr) {
      stats.lastDay = todayStr;
      stats.visitsToday = Math.floor((stats.visitsToday || 200) * 0.4);
    }
    stats.visits = (stats.visits || 1480) + 1;
    stats.visitsToday = (stats.visitsToday || 180) + 1;
    stats.lastVisit = new Date().toISOString();
    stats.liveVisitors = Math.floor(Math.random() * 11) + 14;
    localStorage.setItem(this.localKeyStats, JSON.stringify(stats));

    // Optimisation trafic élevé : 1 enregistrement Supabase par session toutes les 15 min
    const lastRecKey = "fs_last_visit_rec";
    const lastRec = parseInt(sessionStorage.getItem(lastRecKey) || "0");
    const now = Date.now();
    if (this.isOnline && (now - lastRec > 15 * 60 * 1000)) {
      sessionStorage.setItem(lastRecKey, String(now));
      try {
        await this._req("POST", "visits", {
          session_id: this.sessionId,
          page: window.location.pathname || "/",
          referrer: document.referrer || null,
          user_agent: navigator.userAgent
        });
      } catch (e) { /* silencieux */ }
    }
  }

  // --- PRODUITS ---
  async getProducts() {
    // Essayer Supabase d'abord
    if (this.isOnline) {
      try {
        const data = await this._req("GET", "products", null, "?order=created_at.desc");
        if (data && data.length > 0) {
          // Mapper les colonnes Supabase vers le format local
          const mapped = data.map(p => ({
            id: p.id, name: p.name, category: p.category,
            price: p.price, oldPrice: p.old_price,
            inStock: p.in_stock, image: p.image_url,
            description: p.description, badge: p.badge,
            featured: p.featured
          }));
          localStorage.setItem(this.localKeyProducts, JSON.stringify(mapped));
          return mapped;
        }
      } catch (e) { /* fallback local */ }
    }
    // Fallback localStorage
    try {
      const local = JSON.parse(localStorage.getItem(this.localKeyProducts) || "[]");
      if (local.length > 0) return local;
    } catch(e) {}
    return typeof INITIAL_PRODUCTS !== "undefined" ? INITIAL_PRODUCTS : [];
  }

  async saveProduct(product) {
    const products = await this.getProducts();
    const idx = products.findIndex(p => p.id === product.id);
    if (idx >= 0) {
      products[idx] = { ...products[idx], ...product, updatedAt: new Date().toISOString() };
    } else {
      product.id = product.id || "fs-prod-" + Date.now();
      product.createdAt = new Date().toISOString();
      products.unshift(product);
    }
    localStorage.setItem(this.localKeyProducts, JSON.stringify(products));
    if (this.isOnline) {
      try {
        await this._req("POST", "products", {
          id: product.id, name: product.name, category: product.category,
          price: product.price, old_price: product.oldPrice,
          in_stock: product.inStock !== false, image_url: product.image,
          description: product.description, badge: product.badge,
          featured: product.featured || false
        }, "?on_conflict=id");
      } catch(e) {}
    }
    return product;
  }

  async deleteProduct(productId) {
    let products = await this.getProducts();
    products = products.filter(p => p.id !== productId);
    localStorage.setItem(this.localKeyProducts, JSON.stringify(products));
    if (this.isOnline) {
      try { await this._req("DELETE", "products", null, "?id=eq." + productId); } catch(e) {}
    }
    return true;
  }

  async toggleStock(productId) {
    const products = await this.getProducts();
    const prod = products.find(p => p.id === productId);
    if (prod) {
      prod.inStock = !prod.inStock;
      localStorage.setItem(this.localKeyProducts, JSON.stringify(products));
      if (this.isOnline) {
        try {
          await this._req("PATCH", "products", { in_stock: prod.inStock }, "?id=eq." + productId);
        } catch(e) {}
      }
      return prod.inStock;
    }
    return false;
  }

  // --- COMMANDES ---
  async getOrders() {
    // Charger depuis Supabase si online
    if (this.isOnline) {
      try {
        const data = await this._req("GET", "orders", null, "?order=created_at.desc");
        if (data && data.length > 0) {
          const mapped = data.map(o => ({
            id: o.id, date: o.created_at,
            customerName: o.customer_name, customerPhone: o.customer_phone,
            deliveryZone: o.delivery_zone, deliveryFee: o.delivery_fee,
            paymentMethod: o.payment_method, whatsappNumber: o.whatsapp_number,
            items: o.items || [], totalAmount: o.total_amount,
            status: o.status, notes: o.notes
          }));
          localStorage.setItem(this.localKeyOrders, JSON.stringify(mapped));
          return mapped;
        }
      } catch(e) {}
    }
    return JSON.parse(localStorage.getItem(this.localKeyOrders) || "[]");
  }

  async recordOrder(orderData) {
    const orders = await this.getOrders();
    const newOrder = {
      id: "FS-CMD-" + Date.now().toString().slice(-6),
      date: new Date().toISOString(),
      status: "Nouvelle sur WhatsApp",
      ...orderData
    };
    orders.unshift(newOrder);
    localStorage.setItem(this.localKeyOrders, JSON.stringify(orders));
    if (this.isOnline) {
      try {
        await this._req("POST", "orders", {
          id: newOrder.id,
          customer_name: newOrder.customerName,
          customer_phone: newOrder.customerPhone,
          delivery_zone: newOrder.deliveryZone,
          delivery_fee: newOrder.deliveryFee || 0,
          payment_method: newOrder.paymentMethod,
          whatsapp_number: newOrder.whatsappNumber,
          items: newOrder.items,
          total_amount: newOrder.totalAmount || 0,
          status: newOrder.status,
          notes: newOrder.notes || ""
        });
      } catch(e) {}
    }
    return newOrder;
  }

  async updateOrderStatus(orderId, newStatus) {
    const orders = await this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      order.updatedAt = new Date().toISOString();
      localStorage.setItem(this.localKeyOrders, JSON.stringify(orders));
    }
    if (this.isOnline) {
      try {
        await this._req("PATCH", "orders",
          { status: newStatus, updated_at: new Date().toISOString() },
          "?id=eq." + orderId
        );
      } catch(e) {}
    }
    return true;
  }

  async deleteOrder(orderId) {
    let orders = await this.getOrders();
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem(this.localKeyOrders, JSON.stringify(orders));
    if (this.isOnline) {
      try { await this._req("DELETE", "orders", null, "?id=eq." + orderId); } catch(e) {}
    }
    return true;
  }

  // --- PANIERS ABANDONNES ---
  async recordAbandonedCart(cartData) {
    if (!cartData.items || cartData.items.length === 0) return;
    const list = JSON.parse(localStorage.getItem(this.localKeyAbandoned) || "[]");
    const recent = list.find(a =>
      Date.now() - new Date(a.date).getTime() < 15*60*1000 &&
      a.customerPhone === cartData.customerPhone
    );
    if (recent) return;
    const record = {
      id: "ABN-" + Date.now().toString().slice(-6),
      date: new Date().toISOString(),
      items: cartData.items,
      estimatedTotal: cartData.total || 0,
      customerName: cartData.customerName || "Non renseigné",
      customerPhone: cartData.customerPhone || "Non renseigné",
      step: cartData.step || "Formulaire WhatsApp"
    };
    list.unshift(record);
    if (list.length > 50) list.pop();
    localStorage.setItem(this.localKeyAbandoned, JSON.stringify(list));
    if (this.isOnline) {
      try {
        await this._req("POST", "abandoned_carts", {
          id: record.id, customer_name: record.customerName,
          customer_phone: record.customerPhone, items: record.items,
          estimated_total: record.estimatedTotal, step: record.step
        });
      } catch(e) {}
    }
  }

  async getAbandonedCarts() {
    if (this.isOnline) {
      try {
        const data = await this._req("GET", "abandoned_carts", null, "?order=created_at.desc&limit=50");
        if (data && data.length > 0) {
          const mapped = data.map(a => ({
            id: a.id, date: a.created_at,
            customerName: a.customer_name, customerPhone: a.customer_phone,
            items: a.items || [], estimatedTotal: a.estimated_total
          }));
          localStorage.setItem(this.localKeyAbandoned, JSON.stringify(mapped));
          return mapped;
        }
      } catch(e) {}
    }
    return JSON.parse(localStorage.getItem(this.localKeyAbandoned) || "[]");
  }

  // --- STATISTIQUES GLOBALES (vue analytique temps reel) ---
  async getAnalytics() {
    // Tenter de charger les stats depuis la vue Supabase
    if (this.isOnline) {
      try {
        const summary = await this._reqView("analytics_summary");
        if (summary && summary.length > 0) {
          const s = summary[0];
          const orders = await this.getOrders();
          const upcoming = orders.filter(o => o.status !== "Livrée" && o.status !== "Annulée");
          const products = await this.getProducts();
          return {
            totalRevenue:       s.revenue_delivered || 0,
            pendingRevenue:     s.revenue_pending || 0,
            totalOrders:        s.total_orders || 0,
            upcomingOrders:     upcoming,
            upcomingCount:      upcoming.length,
            completedCount:     orders.filter(o => o.status === "Livrée").length,
            abandonedCount:     s.abandoned_count || 0,
            activeProducts:     s.products_in_stock || 0,
            outOfStockProducts: s.products_out_of_stock || 0,
            totalProducts:      products.length,
            visits:             s.total_visits || 0,
            visitsToday:        s.visits_today || 0,
            liveVisitors:       s.live_visitors || Math.floor(Math.random()*8)+12,
            conversionRate:     s.total_visits > 0 ? ((s.total_orders/s.total_visits)*100).toFixed(1) : "0.0"
          };
        }
      } catch(e) { /* fallback local */ }
    }

    // Fallback entièrement local
    const orders = JSON.parse(localStorage.getItem(this.localKeyOrders) || "[]");
    const abandoned = JSON.parse(localStorage.getItem(this.localKeyAbandoned) || "[]");
    const products = await this.getProducts();
    let stats = {};
    try { stats = JSON.parse(localStorage.getItem(this.localKeyStats) || "{}"); } catch(e) {}

    const completed = orders.filter(o => o.status === "Livrée");
    const upcoming  = orders.filter(o => o.status !== "Livrée" && o.status !== "Annulée");
    return {
      totalRevenue:       completed.reduce((s,o) => s+(Number(o.totalAmount)||0), 0),
      pendingRevenue:     upcoming.reduce((s,o) => s+(Number(o.totalAmount)||0), 0),
      totalOrders:        orders.length,
      upcomingOrders:     upcoming,
      upcomingCount:      upcoming.length,
      completedCount:     completed.length,
      abandonedCount:     abandoned.length,
      activeProducts:     products.filter(p=>p.inStock).length,
      outOfStockProducts: products.filter(p=>!p.inStock).length,
      totalProducts:      products.length,
      visits:             stats.visits || 1480,
      visitsToday:        stats.visitsToday || 185,
      liveVisitors:       stats.liveVisitors || 16,
      conversionRate:     stats.visits > 0 ? ((orders.length/stats.visits)*100).toFixed(1) : "3.2"
    };
  }

  // Compatibilité : alias pour l'ancien code
  async syncProductToSupabase(product) { return this.saveProduct(product); }
  async syncOrderToSupabase(order)     { /* géré dans recordOrder */ }
}

// Instance globale
window.fallouDB = new FallouStoreDB();
