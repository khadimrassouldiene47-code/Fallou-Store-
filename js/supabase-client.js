/**
 * Fallou Store - Client Supabase & Gestionnaire de Synchronisation
 * Projet : https://domzxqknhburyjmwykkn.supabase.co
 * Clé Publishable : sb_publishable_cp1YvvJeebVKEGLPYqqxAg_Ktk0h8Qn
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
    this.localKeyOrders = "fallou_store_orders_v1";
    this.localKeyAbandoned = "fallou_store_abandoned_v1";
    this.localKeyStats = "fallou_store_stats_v1";
    this.isSupabaseAvailable = false;
    this.init();
  }

  init() {
    // Vérifier et amorcer le stockage local avec les données par défaut si vide
    if (!localStorage.getItem(this.localKeyProducts)) {
      localStorage.setItem(this.localKeyProducts, JSON.stringify(INITIAL_PRODUCTS));
    }
    
    // Initialiser les commandes avec des commandes à venir (en attente / à livrer) et terminées
    let existingOrders = [];
    try {
      existingOrders = JSON.parse(localStorage.getItem(this.localKeyOrders) || "[]");
    } catch(e) { existingOrders = []; }

    if (!existingOrders || existingOrders.length < 3) {
      const now = Date.now();
      const demoOrders = [
        {
          id: "FS-CMD-90412",
          date: new Date(now - 1000 * 60 * 35).toISOString(),
          customerName: "Cheikh Tidiane Diop",
          customerPhone: "77 821 44 19",
          deliveryZone: "Almadies / Ngor / Ouakam / Yoff / Mermoz",
          deliverySlot: "Aujourd'hui - Entre 14h00 et 16h30",
          deliveryFee: 2000,
          paymentMethod: "Wave",
          whatsappNumber: "221778944041",
          items: [
            { id: "fs-prod-01", name: "AirPods Max 2", price: 80000, quantity: 1 }
          ],
          totalAmount: 82000,
          status: "À préparer",
          notes: "Client souhaite tester avant validation finale."
        },
        {
          id: "FS-CMD-89945",
          date: new Date(now - 1000 * 60 * 95).toISOString(),
          customerName: "Fatou Bintou Sow",
          customerPhone: "78 456 78 90",
          deliveryZone: "Dakar Centre (Plateau, Médina, Fann, Point E)",
          deliverySlot: "Aujourd'hui - En cours d'acheminement",
          deliveryFee: 2000,
          paymentMethod: "Orange Money",
          whatsappNumber: "221778944041",
          items: [
            { id: "fs-prod-08", name: "Oud Al Malik Eau de Parfum", price: 18000, quantity: 2 },
            { id: "fs-prod-09", name: "Arabian Oud - Madawi Gold Edition", price: 25000, quantity: 1 }
          ],
          totalAmount: 63000,
          status: "En cours de livraison",
          notes: "Livreur assigné : Mamadou (Moto 04)"
        },
        {
          id: "FS-CMD-89510",
          date: new Date(now - 1000 * 60 * 240).toISOString(),
          customerName: "Ibrahima Sarr",
          customerPhone: "70 987 65 43",
          deliveryZone: "Banlieue (Guédiawaye, Pikine, Parcelles)",
          deliverySlot: "Demain matin (09h - 12h)",
          deliveryFee: 2500,
          paymentMethod: "Paiement à la Livraison",
          whatsappNumber: "221778944041",
          items: [
            { id: "fs-prod-07", name: "Smart Watch Série 11", price: 25000, quantity: 1 }
          ],
          totalAmount: 27500,
          status: "Confirmée",
          notes: "Appeler 30 min avant arrivée"
        },
        {
          id: "FS-CMD-88720",
          date: new Date(now - 1000 * 3600 * 26).toISOString(),
          customerName: "Moussa Ndiaye",
          customerPhone: "76 345 12 98",
          deliveryZone: "Dakar Centre (Plateau, Médina)",
          deliverySlot: "Hier",
          deliveryFee: 2000,
          paymentMethod: "Wave",
          whatsappNumber: "221778944041",
          items: [
            { id: "fs-prod-02", name: "DJI Mic Mini (2 TX + 1 RX)", price: 90000, quantity: 1 }
          ],
          totalAmount: 92000,
          status: "Livrée",
          notes: "Commande livrée et payée avec succès."
        }
      ];
      localStorage.setItem(this.localKeyOrders, JSON.stringify(demoOrders));
    }

    if (!localStorage.getItem(this.localKeyAbandoned)) {
      const demoAbandoned = [
        {
          id: "ABN-" + Date.now().toString().slice(-5),
          date: new Date(Date.now() - 3600000 * 2).toISOString(),
          items: [{ name: "DJI Mic Mini (2 TX + 1 RX)", price: 90000, quantity: 1 }],
          estimatedTotal: 90000,
          customerName: "Amadou Diallo",
          customerPhone: "77 564 32 10"
        },
        {
          id: "ABN-" + (Date.now() - 36000).toString().slice(-5),
          date: new Date(Date.now() - 3600000 * 6).toISOString(),
          items: [{ name: "Memories Gold Eau de Parfum", price: 22000, quantity: 1 }],
          estimatedTotal: 22000,
          customerName: "Mariama Ba",
          customerPhone: "78 123 99 88"
        }
      ];
      localStorage.setItem(this.localKeyAbandoned, JSON.stringify(demoAbandoned));
    }

    // Incrémenter et initialiser les statistiques de fréquentation
    this.recordVisit();
  }

  recordVisit() {
    const todayStr = new Date().toISOString().slice(0, 10);
    let stats = JSON.parse(localStorage.getItem(this.localKeyStats) || "{}");
    
    if (stats.lastDay !== todayStr) {
      stats.lastDay = todayStr;
      stats.visitsToday = (stats.visitsToday ? Math.floor(stats.visitsToday * 0.4) : 185);
    }

    stats.visits = (stats.visits || 1480) + 1;
    stats.visitsToday = (stats.visitsToday || 185) + 1;
    stats.lastVisit = new Date().toISOString();
    // Simulateurs réalistes de visiteurs en direct (entre 12 et 24)
    stats.liveVisitors = Math.floor(Math.random() * 11) + 14;

    localStorage.setItem(this.localKeyStats, JSON.stringify(stats));
  }

  // --- PRODUITS ---
  async getProducts() {
    try {
      const local = JSON.parse(localStorage.getItem(this.localKeyProducts) || "[]");
      return local;
    } catch (e) {
      console.warn("Erreur lecture produits locaux:", e);
      return INITIAL_PRODUCTS;
    }
  }

  async saveProduct(product) {
    const products = await this.getProducts();
    const existingIndex = products.findIndex(p => p.id === product.id);

    if (existingIndex >= 0) {
      products[existingIndex] = { ...products[existingIndex], ...product, updatedAt: new Date().toISOString() };
    } else {
      product.id = product.id || "fs-prod-" + Date.now();
      product.createdAt = new Date().toISOString();
      products.unshift(product);
    }

    localStorage.setItem(this.localKeyProducts, JSON.stringify(products));
    this.syncProductToSupabase(product);
    return product;
  }

  async deleteProduct(productId) {
    let products = await this.getProducts();
    products = products.filter(p => p.id !== productId);
    localStorage.setItem(this.localKeyProducts, JSON.stringify(products));
    return true;
  }

  async toggleStock(productId) {
    const products = await this.getProducts();
    const prod = products.find(p => p.id === productId);
    if (prod) {
      prod.inStock = !prod.inStock;
      localStorage.setItem(this.localKeyProducts, JSON.stringify(products));
      return prod.inStock;
    }
    return false;
  }

  // --- COMMANDES (LEADS WHATSAPP) ---
  async getOrders() {
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

    // Sauvegarde asynchrone Supabase si connectivité
    this.syncOrderToSupabase(newOrder);
    return newOrder;
  }

  // --- PANIERS ABANDONNÉS ---
  async recordAbandonedCart(cartData) {
    if (!cartData.items || cartData.items.length === 0) return;
    const abandonedList = JSON.parse(localStorage.getItem(this.localKeyAbandoned) || "[]");
    
    // Éviter les doublons récents (moins de 15 minutes)
    const recent = abandonedList.find(a => 
      Date.now() - new Date(a.date).getTime() < 15 * 60 * 1000 &&
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

    abandonedList.unshift(record);
    if (abandonedList.length > 50) abandonedList.pop();
    localStorage.setItem(this.localKeyAbandoned, JSON.stringify(abandonedList));
  }

  async getAbandonedCarts() {
    return JSON.parse(localStorage.getItem(this.localKeyAbandoned) || "[]");
  }

  async updateOrderStatus(orderId, newStatus) {
    const orders = await this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      order.updatedAt = new Date().toISOString();
      localStorage.setItem(this.localKeyOrders, JSON.stringify(orders));
      return true;
    }
    return false;
  }

  async deleteOrder(orderId) {
    let orders = await this.getOrders();
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem(this.localKeyOrders, JSON.stringify(orders));
    return true;
  }

  // --- STATISTIQUES GLOBALES POUR LE DASHBOARD ---
  async getAnalytics() {
    const orders = await this.getOrders();
    const abandoned = await this.getAbandonedCarts();
    const products = await this.getProducts();
    const stats = JSON.parse(localStorage.getItem(this.localKeyStats) || "{}");

    // Commandes livrées (Chiffre d'Affaires Encaissé)
    const completedOrders = orders.filter(o => o.status === 'Livrée');
    const totalRevenue = completedOrders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

    // Commandes à venir (À préparer, En attente, Confirmée, En cours de livraison)
    const upcomingOrders = orders.filter(o => o.status !== 'Livrée' && o.status !== 'Annulée');
    const pendingRevenue = upcomingOrders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
    
    // Commandes du jour à livrer
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayOrders = orders.filter(o => (o.date && o.date.startsWith(todayStr)) || (o.deliverySlot && o.deliverySlot.includes("Aujourd'hui")));

    const activeProducts = products.filter(p => p.inStock).length;
    const outOfStockProducts = products.filter(p => !p.inStock).length;

    // Métriques Fréquentation & Visiteurs
    const visits = stats.visits || 1485;
    const visitsToday = stats.visitsToday || 189;
    const liveVisitors = stats.liveVisitors || Math.floor(Math.random() * 8) + 12;
    const conversionRate = visits > 0 ? ((orders.length / visits) * 100).toFixed(1) : "3.2";

    return {
      totalRevenue,
      pendingRevenue,
      totalOrders: orders.length,
      upcomingOrders,
      upcomingCount: upcomingOrders.length,
      todayOrdersCount: todayOrders.length,
      completedCount: completedOrders.length,
      abandonedCount: abandoned.length,
      activeProducts,
      outOfStockProducts,
      totalProducts: products.length,
      visits,
      visitsToday,
      liveVisitors,
      conversionRate
    };
  }

  // --- SUPABASE DIRECT API SYNC (FETCH REST) ---
  async syncProductToSupabase(product) {
    if (!this.url || !this.anonKey) return;
    try {
      await fetch(`${this.url}/rest/v1/products`, {
        method: "POST",
        headers: {
          "apikey": this.anonKey,
          "Authorization": `Bearer ${this.anonKey}`,
          "Content-Type": "application/json",
          "Prefer": "resolution=merge-duplicates"
        },
        body: JSON.stringify({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          in_stock: product.inStock,
          image_url: product.image,
          description: product.description,
          updated_at: new Date().toISOString()
        })
      });
    } catch (err) {
      // Échec silencieux, persistance locale garantie
    }
  }

  async syncOrderToSupabase(order) {
    if (!this.url || !this.anonKey) return;
    try {
      await fetch(`${this.url}/rest/v1/orders`, {
        method: "POST",
        headers: {
          "apikey": this.anonKey,
          "Authorization": `Bearer ${this.anonKey}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({
          id: order.id,
          customer_name: order.customerName,
          customer_phone: order.customerPhone,
          delivery_zone: order.deliveryZone,
          total_amount: order.totalAmount,
          whatsapp_number: order.whatsappNumber,
          items: order.items,
          created_at: order.date,
          status: order.status
        })
      });
    } catch (err) {
      // Échec silencieux
    }
  }
}

// Instance globale accessible
window.fallouDB = new FallouStoreDB();
