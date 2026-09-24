/**
 * Fallou Store - Contrôleur du Dashboard Administrateur
 * Inclut: Boîtes de dialogue personnalisées, Gestion des commandes à venir & Fréquentation temps réel
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginOverlay = document.getElementById('adminLoginOverlay');
  const mainContent = document.getElementById('adminMainContent');
  const loginForm = document.getElementById('adminLoginForm');
  const addModal = document.getElementById('adminAddModal');
  const addProductForm = document.getElementById('adminAddProductForm');

  let currentOrdersFilter = 'all';
  let cachedOrders = [];

  // Formatage FCFA
  const formatFCFA = (amount) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  // =========================================================================
  // BOÎTE DE DIALOGUE PERSONNALISÉE (Remplace confirm())
  // =========================================================================
  window.fsConfirm = ({
    title = "Confirmer la suppression",
    message = "Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.",
    itemName = "",
    confirmText = "Supprimer définitivement",
    cancelText = "Annuler"
  }) => {
    return new Promise((resolve) => {
      let modal = document.getElementById('fsConfirmDialog');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'fsConfirmDialog';
        modal.className = 'fs-confirm-dialog-backdrop';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.innerHTML = `
          <div class="fs-confirm-dialog-card">
            <div class="fs-confirm-dialog-icon">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 class="fs-confirm-dialog-title" id="fsConfirmTitle"></h3>
            <p class="fs-confirm-dialog-desc" id="fsConfirmMsg"></p>
            <div id="fsConfirmItemWrap"></div>
            <div class="fs-confirm-dialog-actions">
              <button type="button" class="fs-confirm-btn-cancel" id="fsConfirmCancelBtn">Annuler</button>
              <button type="button" class="fs-confirm-btn-danger" id="fsConfirmOkBtn">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                <span id="fsConfirmOkText">Supprimer</span>
              </button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
      }

      document.getElementById('fsConfirmTitle').textContent = title;
      document.getElementById('fsConfirmMsg').textContent = message;

      const itemWrap = document.getElementById('fsConfirmItemWrap');
      if (itemName) {
        itemWrap.innerHTML = `<span class="fs-confirm-dialog-item-tag">📦 ${itemName}</span>`;
        itemWrap.style.display = 'block';
      } else {
        itemWrap.style.display = 'none';
      }

      const cancelBtn = document.getElementById('fsConfirmCancelBtn');
      const okBtn = document.getElementById('fsConfirmOkBtn');
      const okTextSpan = document.getElementById('fsConfirmOkText');

      if (cancelBtn) cancelBtn.textContent = cancelText;
      if (okTextSpan) okTextSpan.textContent = confirmText;

      const closeDialog = (result) => {
        modal.classList.remove('active');
        cancelBtn.onclick = null;
        okBtn.onclick = null;
        document.removeEventListener('keydown', handleKey);
        resolve(result);
      };

      const handleKey = (e) => {
        if (e.key === 'Escape') closeDialog(false);
      };

      cancelBtn.onclick = () => closeDialog(false);
      okBtn.onclick = () => closeDialog(true);
      modal.onclick = (e) => {
        if (e.target === modal) closeDialog(false);
      };

      document.addEventListener('keydown', handleKey);

      requestAnimationFrame(() => {
        modal.classList.add('active');
        if (cancelBtn) cancelBtn.focus();
      });
    });
  };

  // Toast notification
  window.showAdminToast = (message) => {
    let toast = document.getElementById('adminToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'adminToast';
      toast.className = 'fs-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  };

  // 1. Authentification
  const checkAuth = () => {
    const isAuthed = sessionStorage.getItem('fs_admin_logged') === 'true';
    if (isAuthed) {
      if (loginOverlay) loginOverlay.style.display = 'none';
      if (mainContent) mainContent.style.display = 'block';
      loadDashboardData();
      startLiveTrafficSimulation();
    } else {
      if (loginOverlay) loginOverlay.style.display = 'flex';
      if (mainContent) mainContent.style.display = 'none';
    }
  };

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const pass = document.getElementById('loginPassword').value.trim();

      const validEmails = ['falluetsesvideos@gmail.com', 'contact@falloustore.com'];
      if (validEmails.includes(email.toLowerCase()) && pass === 'FallouAdmin2026!') {
        sessionStorage.setItem('fs_admin_logged', 'true');
        checkAuth();
      } else {
        alert("Identifiants incorrects. Identifiant : Falluetsesvideos@gmail.com | Mot de passe : FallouAdmin2026!");
      }
    });
  }

  const togglePassBtn = document.getElementById('togglePasswordBtn');
  if (togglePassBtn) {
    togglePassBtn.addEventListener('click', () => {
      const passInput = document.getElementById('loginPassword');
      if (passInput) {
        const isPass = passInput.type === 'password';
        passInput.type = isPass ? 'text' : 'password';
        togglePassBtn.innerHTML = isPass 
          ? `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/></svg>`
          : `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>`;
      }
    });
  }

  window.adminLogout = () => {
    sessionStorage.removeItem('fs_admin_logged');
    checkAuth();
  };

  // 2. Navigation par Onglets
  window.switchAdminTab = (tabId) => {
    document.querySelectorAll('.admin-tab-pane').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.admin-nav-tab').forEach(b => b.classList.remove('active'));

    const targetPane = document.getElementById(tabId);
    if (targetPane) targetPane.style.display = 'block';

    const targetBtn = document.querySelector(`.admin-nav-tab[data-tab="${tabId}"]`);
    if (targetBtn) targetBtn.classList.add('active');
  };

  // 3. Chargement des données et KPIs en direct
  const loadDashboardData = async () => {
    const analytics = await window.fallouDB.getAnalytics();
    const products = await window.fallouDB.getProducts();
    const orders = await window.fallouDB.getOrders();
    const abandoned = await window.fallouDB.getAbandonedCarts();

    cachedOrders = orders;

    // Remplir les KPIs Globaux
    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setTxt('kpiRevenue', formatFCFA(analytics.totalRevenue));
    setTxt('kpiDeliveredCount', `${analytics.completedCount} commandes livrées avec succès`);
    setTxt('kpiUpcomingRevenue', formatFCFA(analytics.pendingRevenue));
    setTxt('kpiUpcomingCount', `${analytics.upcomingCount} commandes à préparer / livrer`);

    setTxt('kpiVisitsToday', `${analytics.visitsToday} visites aujourd'hui`);
    setTxt('kpiVisitsTotal', `Total : ${new Intl.NumberFormat('fr-FR').format(analytics.visits)} visites enregistrées`);
    setTxt('kpiConversion', `${analytics.conversionRate}%`);
    setTxt('kpiOrdersTotal', `${analytics.totalOrders} commandes sur ${analytics.visitsToday} visites`);

    setTxt('kpiStockStatus', `${analytics.activeProducts} / ${analytics.totalProducts}`);
    setTxt('kpiOutOfStockCount', `${analytics.outOfStockProducts} en rupture de stock`);
    setTxt('kpiAbandonedCount', analytics.abandonedCount);

    // Live Indicators
    setTxt('liveVisitorsCount', analytics.liveVisitors);
    setTxt('trafficLiveCount', analytics.liveVisitors);
    setTxt('trafficTodayCount', analytics.visitsToday);
    setTxt('trafficTotalCount', new Intl.NumberFormat('fr-FR').format(analytics.visits));

    // Remplir les tables
    renderUpcomingOrdersTable(analytics.upcomingOrders);
    renderOrdersTable('overviewOrdersTable', orders.slice(0, 5));
    renderOrdersTable('allOrdersTable', filterOrdersList(orders, currentOrdersFilter));
    renderProductsTable(products);
    renderAbandonedTable(abandoned);
  };

  // 4. Fréquentation en direct & fluctuations réalistes
  let liveTrafficInterval = null;
  const startLiveTrafficSimulation = () => {
    if (liveTrafficInterval) clearInterval(liveTrafficInterval);
    liveTrafficInterval = setInterval(() => {
      const liveBadge = document.getElementById('liveVisitorsCount');
      const trafficLive = document.getElementById('trafficLiveCount');
      if (liveBadge) {
        let current = parseInt(liveBadge.textContent) || 16;
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
        current = Math.max(9, Math.min(26, current + change));
        liveBadge.textContent = current;
        if (trafficLive) trafficLive.textContent = current;
      }
    }, 6000);
  };

  // Rendu Cards Mobiles
  const renderOrdersCards = (containerId, orders, isUpcoming = false) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!orders || orders.length === 0) {
      container.innerHTML = `<div style="text-align: center; color: #64748b; padding: 1.5rem; background: #141721; border-radius: 12px; font-size: 0.82rem;">Aucune commande trouvée.</div>`;
      return;
    }

    container.innerHTML = orders.map(o => {
      const itemsText = o.items ? o.items.map(i => `${i.quantity}x ${i.name}`).join(', ') : 'Articles';
      const formattedDate = new Date(o.date).toLocaleDateString('fr-FR', {
        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
      });
      const cleanPhone = (o.customerPhone || '').replace(/\s+/g, '');
      const waLink = `https://wa.me/221${cleanPhone}?text=${encodeURIComponent('Bonjour ' + (o.customerName || '') + ', concernant votre commande Fallou Store ' + o.id + ' : ')}`;

      return `
        <div class="fs-order-card-m">
          <div class="fs-order-card-m-head">
            <div>
              <span class="fs-order-card-m-ref">${o.id}</span>
              <div class="fs-order-card-m-date">📅 ${formattedDate}</div>
            </div>
            <span class="badge-order-status ${getStatusBadgeClass(o.status)}">
              ${o.status || 'À préparer'}
            </span>
          </div>

          <div class="fs-order-card-m-client">👤 ${o.customerName || 'Client'}</div>
          <div style="margin: 4px 0 8px;">
            <a href="${waLink}" target="_blank" class="fs-order-card-m-phone" style="display: inline-flex; align-items: center; gap: 4px; text-decoration: none;">
              💬 ${o.customerPhone || 'Contacter WhatsApp'}
            </a>
          </div>

          <div class="fs-order-card-m-items">
            📦 <b style="color: #cbd5e1;">Articles :</b> ${itemsText}
          </div>

          <div style="font-size: 0.78rem; color: #94a3b8; margin-bottom: 0.5rem;">
            📍 <b style="color: #cbd5e1;">Zone :</b> ${o.deliveryZone || 'Dakar'}
            ${o.deliverySlot ? `<span style="color: #fbbf24; margin-left: 6px;">⏰ ${o.deliverySlot}</span>` : ''}
          </div>

          <div class="fs-order-card-m-footer">
            <div>
              <span style="font-size: 0.72rem; color: #64748b; display: block;">Montant</span>
              <span class="fs-order-card-m-amount">${formatFCFA(o.totalAmount || 0)}</span>
            </div>
            <div style="display: flex; gap: 0.4rem; align-items: center;">
              <select class="fs-form-control" style="padding: 0.35rem 0.5rem; font-size: 0.76rem; background: #0b0c10; color: #fff; border-color: #334155; width: auto;" onchange="changeOrderStatus('${o.id}', this.value)">
                <option value="À préparer" ${o.status === 'À préparer' ? 'selected' : ''}>🟡 À préparer</option>
                <option value="En cours de livraison" ${o.status === 'En cours de livraison' ? 'selected' : ''}>🚚 En cours</option>
                <option value="Livrée" ${o.status === 'Livrée' ? 'selected' : ''}>✅ Livrée</option>
                <option value="Annulée" ${o.status === 'Annulée' ? 'selected' : ''}>❌ Annulée</option>
              </select>
              ${!isUpcoming ? `
              <button onclick="confirmDeleteOrder('${o.id}')" title="Supprimer" style="color: #ef4444; background: rgba(239, 68, 68, 0.12); border: none; padding: 0.4rem 0.6rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 700;">
                🗑️
              </button>` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  };

  // 5. Rendu du Tableau des Commandes à Venir (Prioritaires)
  const renderUpcomingOrdersTable = (upcoming) => {
    renderOrdersCards('upcomingOrdersMobile', upcoming, true);
    const tbody = document.getElementById('upcomingOrdersTableBody');
    if (!tbody) return;

    if (!upcoming || upcoming.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #64748b; padding: 2rem;">Toutes les commandes ont été livrées ! Aucune livraison en attente.</td></tr>`;
      return;
    }

    tbody.innerHTML = upcoming.map(o => {
      const itemsText = o.items ? o.items.map(i => `${i.quantity}x ${i.name}`).join(', ') : 'Articles';
      return `
        <tr>
          <td><b style="color: var(--fs-gold);">${o.id}</b></td>
          <td>
            <b style="color: #fff;">${o.customerName || 'Client'}</b><br>
            <a href="https://wa.me/221${(o.customerPhone||'').replace(/\s+/g,'')}?text=${encodeURIComponent('Bonjour ' + (o.customerName||'') + ', concernant votre commande Fallou Store ' + o.id + ' : ')}" target="_blank" style="color: #25d366; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
              💬 ${o.customerPhone || 'WhatsApp'}
            </a>
          </td>
          <td style="max-width: 250px; font-size: 0.84rem; color: #cbd5e1;">${itemsText}</td>
          <td>
            <div style="font-weight: 600; color: #fff;">${o.deliveryZone || 'Dakar'}</div>
            <small style="color: #fbbf24;">⏰ ${o.deliverySlot || "Aujourd'hui"}</small>
          </td>
          <td style="font-weight: 800; color: var(--fs-gold-light);">${formatFCFA(o.totalAmount || 0)}</td>
          <td>
            <span class="badge-order-status ${getStatusBadgeClass(o.status)}">
              ${o.status || 'À préparer'}
            </span>
          </td>
          <td>
            <select class="fs-form-control" style="padding: 0.35rem 0.5rem; font-size: 0.78rem; background: #0b0c10; color: #fff; border-color: #334155; width: auto;" onchange="changeOrderStatus('${o.id}', this.value)">
              <option value="À préparer" ${o.status === 'À préparer' ? 'selected' : ''}>🟡 À préparer</option>
              <option value="En cours de livraison" ${o.status === 'En cours de livraison' ? 'selected' : ''}>🚚 En cours</option>
              <option value="Livrée" ${o.status === 'Livrée' ? 'selected' : ''}>✅ Livrée</option>
              <option value="Annulée" ${o.status === 'Annulée' ? 'selected' : ''}>❌ Annulée</option>
            </select>
          </td>
        </tr>
      `;
    }).join('');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Livrée': return 'status-done';
      case 'En cours de livraison': return 'status-delivery';
      case 'Annulée': return 'status-cancelled';
      default: return 'status-prep';
    }
  };

  // 6. Rendu de la table Commandes Historique
  const renderOrdersTable = (tableId, orders) => {
    const mobileMap = {
      'overviewOrdersTable': 'overviewOrdersMobile',
      'allOrdersTable': 'allOrdersMobile'
    };
    if (mobileMap[tableId]) {
      renderOrdersCards(mobileMap[tableId], orders);
    }

    const tbody = document.getElementById(tableId);
    if (!tbody) return;

    if (!orders || orders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: #64748b; padding: 2rem;">Aucune commande trouvée pour ce filtre.</td></tr>`;
      return;
    }

    tbody.innerHTML = orders.map(o => {
      const itemsText = o.items ? o.items.map(i => `${i.quantity}x ${i.name}`).join(', ') : 'Articles';
      const formattedDate = new Date(o.date).toLocaleDateString('fr-FR', {
        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
      });

      return `
        <tr>
          <td><b style="color: var(--fs-gold);">${o.id}</b></td>
          <td style="font-size: 0.78rem; color: #94a3b8;">${formattedDate}</td>
          <td>
            <b style="color: #fff;">${o.customerName || 'Client'}</b><br>
            <a href="https://wa.me/221${(o.customerPhone||'').replace(/\s+/g,'')}" target="_blank" style="color: #38bdf8; font-size: 0.8rem;">
              ${o.customerPhone || 'Numéro'}
            </a>
          </td>
          <td style="max-width: 250px; font-size: 0.82rem;">${itemsText}</td>
          <td style="font-size: 0.82rem;">${o.deliveryZone || 'Dakar'}</td>
          <td style="font-weight: 800; color: #fff;">${formatFCFA(o.totalAmount || 0)}</td>
          <td>
            <span class="badge-order-status ${getStatusBadgeClass(o.status)}">
              ${o.status || 'À préparer'}
            </span>
          </td>
          <td>
            <select class="fs-form-control" style="padding: 0.3rem 0.5rem; font-size: 0.78rem; background: #0b0c10; color: #fff; border-color: #334155; width: auto;" onchange="changeOrderStatus('${o.id}', this.value)">
              <option value="À préparer" ${o.status === 'À préparer' ? 'selected' : ''}>🟡 À préparer</option>
              <option value="En cours de livraison" ${o.status === 'En cours de livraison' ? 'selected' : ''}>🚚 En cours</option>
              <option value="Livrée" ${o.status === 'Livrée' ? 'selected' : ''}>✅ Livrée</option>
              <option value="Annulée" ${o.status === 'Annulée' ? 'selected' : ''}>❌ Annulée</option>
            </select>
          </td>
          <td>
            <button onclick="confirmDeleteOrder('${o.id}')" style="color: #ef4444; background: rgba(239, 68, 68, 0.1); border: none; padding: 0.35rem 0.65rem; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 0.78rem;">
              Supprimer
            </button>
          </td>
        </tr>
      `;
    }).join('');
  };

  // Filtrer les commandes
  window.filterOrdersByStatus = (status) => {
    currentOrdersFilter = status;
    const filtered = filterOrdersList(cachedOrders, status);
    renderOrdersTable('allOrdersTable', filtered);
  };

  const filterOrdersList = (orders, status) => {
    if (status === 'pending') {
      return orders.filter(o => o.status !== 'Livrée' && o.status !== 'Annulée');
    } else if (status === 'done') {
      return orders.filter(o => o.status === 'Livrée');
    }
    return orders;
  };

  // Changement de statut d'une commande
  window.changeOrderStatus = async (orderId, newStatus) => {
    await window.fallouDB.updateOrderStatus(orderId, newStatus);
    window.showAdminToast(`Statut de la commande ${orderId} mis à jour : ${newStatus}`);
    loadDashboardData();
  };

  // Suppression d'une commande avec VRAIE BOÎTE DE DIALOGUE
  window.confirmDeleteOrder = async (orderId) => {
    const confirmed = await window.fsConfirm({
      title: "Supprimer cette commande ?",
      message: "Cette commande sera définitivement effacée de votre base de données et n'apparaîtra plus dans les statistiques.",
      itemName: "Commande Réf: " + orderId,
      confirmText: "Oui, supprimer la commande",
      cancelText: "Annuler"
    });

    if (confirmed) {
      await window.fallouDB.deleteOrder(orderId);
      window.showAdminToast(`Commande ${orderId} supprimée.`);
      loadDashboardData();
    }
  };

  // 7. Rendu de la table Produits avec suppression via vraie boîte de dialogue
  const renderProductsTable = (products) => {
    const tbody = document.getElementById('adminProductsTable');
    if (!tbody) return;

    tbody.innerHTML = products.map(p => `
      <tr>
        <td>
          <img src="${p.image}" alt="" style="width: 44px; height: 44px; border-radius: 8px; object-fit: cover; background: #1e222d;">
        </td>
        <td style="font-weight: 700; color: #fff;">${p.name}</td>
        <td><span style="text-transform: capitalize; color: #94a3b8;">${p.categoryLabel || p.category}</span></td>
        <td style="font-weight: 800; color: var(--fs-gold-light);">${formatFCFA(p.price)}</td>
        <td>
          <span class="badge-status ${p.inStock ? 'badge-in-stock' : 'badge-out-stock'}">
            ${p.inStock ? '✓ En Stock' : '✗ Rupture'}
          </span>
        </td>
        <td>
          <label class="switch" title="Changer l'état du stock">
            <input type="checkbox" ${p.inStock ? 'checked' : ''} onchange="toggleProductStock('${p.id}')">
            <span class="slider"></span>
          </label>
        </td>
        <td>
          <button onclick="confirmDeleteProduct('${p.id}', '${p.name.replace(/'/g, "\\'")}')" style="color: #ef4444; font-weight: 700; font-size: 0.8rem; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); padding: 0.4rem 0.75rem; border-radius: 6px; cursor: pointer; transition: all 0.2s ease;">
            Supprimer
          </button>
        </td>
      </tr>
    `).join('');
  };

  // Bascule de stock
  window.toggleProductStock = async (id) => {
    const newStock = await window.fallouDB.toggleStock(id);
    window.showAdminToast(newStock ? "Produit marqué en stock" : "Produit marqué en rupture");
    loadDashboardData();
  };

  // Suppression d'un produit avec la NOUVELLE BOÎTE DE DIALOGUE PERSONNALISÉE
  window.confirmDeleteProduct = async (id, name) => {
    const confirmed = await window.fsConfirm({
      title: "Retirer ce produit du catalogue ?",
      message: "Ce produit ne sera plus affiché sur la boutique publique Fallou Store et les clients ne pourront plus le commander.",
      itemName: name,
      confirmText: "Oui, retirer du catalogue",
      cancelText: "Garder le produit"
    });

    if (confirmed) {
      await window.fallouDB.deleteProduct(id);
      window.showAdminToast(`Le produit "${name}" a été retiré.`);
      loadDashboardData();
    }
  };

  // 8. Rendu Paniers Abandonnés
  const renderAbandonedTable = (abandoned) => {
    const tbody = document.getElementById('abandonedTable');
    if (!tbody) return;

    if (!abandoned || abandoned.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #64748b; padding: 2rem;">Aucun panier abandonné récent détecté.</td></tr>`;
      return;
    }

    tbody.innerHTML = abandoned.map(a => {
      const itemsList = a.items ? a.items.map(i => `${i.quantity || 1}x ${i.name}`).join(', ') : 'Panier';
      const formattedDate = new Date(a.date).toLocaleDateString('fr-FR', {
        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
      });

      const relanceMsg = encodeURIComponent(`Bonjour ${a.customerName || ''}, nous avons remarqué que vous n'avez pas finalisé votre commande sur Fallou Store. Avez-vous besoin d'une assistance ou d'un conseil ? Nous sommes à votre écoute !`);
      const phoneClean = (a.customerPhone || '').replace(/\s+/g, '');
      const waRelanceUrl = `https://wa.me/221${phoneClean}?text=${relanceMsg}`;

      return `
        <tr>
          <td style="font-size: 0.78rem; color: #94a3b8;">${formattedDate}</td>
          <td style="font-weight: 700; color: #fff;">
            ${a.customerName} <br>
            <small style="color: #94a3b8;">${a.customerPhone}</small>
          </td>
          <td style="max-width: 320px; font-size: 0.82rem;">${itemsList}</td>
          <td style="font-weight: 800; color: var(--fs-gold-light);">${formatFCFA(a.estimatedTotal)}</td>
          <td>
            ${a.customerPhone && a.customerPhone !== 'Non renseigné' ? `
              <a href="${waRelanceUrl}" target="_blank" class="fs-btn-direct-wa" style="display: inline-flex; padding: 0.4rem 0.8rem; font-size: 0.78rem; font-weight: 700;">
                Relancer WhatsApp
              </a>
            ` : `<span style="color: #64748b; font-size: 0.8rem;">Sans numéro</span>`}
          </td>
        </tr>
      `;
    }).join('');
  };

  // 9. Modale Ajout de Produit
  window.openAddProductModal = () => {
    if (addModal) addModal.classList.add('active');
  };
  window.closeAddProductModal = () => {
    if (addModal) addModal.classList.remove('active');
  };

  if (addProductForm) {
    addProductForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('newProdName').value.trim();
      const cat = document.getElementById('newProdCat').value;
      const price = Number(document.getElementById('newProdPrice').value);
      const img = document.getElementById('newProdImage').value.trim();
      const desc = document.getElementById('newProdDesc').value.trim();

      const catLabels = {
        electronique: "Électronique",
        parfums: "Parfums",
        accessoires: "Accessoires",
        gadgets: "Gadgets"
      };

      const newProduct = {
        name,
        category: cat,
        categoryLabel: catLabels[cat] || "Électronique",
        price,
        oldPrice: Math.round(price * 1.25),
        badge: "Nouveau",
        rating: 5.0,
        reviewCount: 1,
        inStock: true,
        image: img,
        gallery: [img],
        tagline: "Nouveauté Fallou Store",
        description: desc || "Article de qualité supérieure sélectionné par Fallou Store.",
        specs: ["Garantie Fallou Store", "Livraison Express disponible à Dakar"]
      };

      await window.fallouDB.saveProduct(newProduct);
      closeAddProductModal();
      addProductForm.reset();
      loadDashboardData();
      window.showAdminToast(`Le produit "${name}" a été ajouté avec succès !`);
    });
  }

  // Vérifier auth au démarrage
  checkAuth();
});
