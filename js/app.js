/**
 * Fallou Store (FS) - Logique Frontend Principale
 * Panier d'achat, tunnel WhatsApp, Modales, Vente Flash, Recherche
 */

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialisation de l'état
  let products = await window.fallouDB.getProducts();
  let currentCategory = 'all';
  let searchQuery = '';
  let activeTab = 'all';
  let cart = JSON.parse(localStorage.getItem('fs_cart_items') || '[]');
  let selectedProduct = null;
  let activeVariant = null;

  // Éléments du DOM
  const productGrid = document.getElementById('fsProductGrid');
  const cartDrawer = document.getElementById('fsCartDrawer');
  const cartOverlay = document.getElementById('fsCartOverlay');
  const cartItemsContainer = document.getElementById('fsCartItems');
  const cartSubtotalEl = document.getElementById('fsCartSubtotal');
  const cartTotalEl = document.getElementById('fsCartTotal');
  const cartBadgeCountEls = document.querySelectorAll('.cart-count-badge');
  const searchInput = document.getElementById('fsSearchInput');
  const toastEl = document.getElementById('fsToast');
  const toastMsg = document.getElementById('fsToastMsg');

  // Modale Produit
  const pdpModal = document.getElementById('fsPdpModal');
  const pdpModalBody = document.getElementById('fsPdpModalBody');

  // Modale WhatsApp Checkout
  const waModal = document.getElementById('fsWaModal');
  const waOrderForm = document.getElementById('fsWaOrderForm');
  const waItemsSummary = document.getElementById('fsWaItemsSummary');
  const waDeliverySelect = document.getElementById('fsWaDeliveryZone');
  const waTotalAmountEl = document.getElementById('fsWaTotalAmount');

  // Modale Vidéo Boutique
  const videoModal = document.getElementById('fsVideoModal');
  const storeVideoPlayer = document.getElementById('fsStoreVideoPlayer');

  // Modale Confirmation / Remerciement
  const confirmModal = document.getElementById('fsConfirmModal');

  // Formatage FCFA
  const formatFCFA = (amount) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  // Toast Notification
  const showToast = (message) => {
    if (!toastEl) return;
    toastMsg.textContent = message;
    toastEl.classList.add('show');
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3200);
  };

  // --- 2. AFFICHAGE DES PRODUITS ---
  const renderProducts = () => {
    if (!productGrid) return;

    let filtered = products.filter(p => {
      const matchCat = currentCategory === 'all' || p.category === currentCategory;
      const matchSearch = searchQuery === '' || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.categoryLabel && p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()));
      
      let matchTab = true;
      if (activeTab === 'bestseller') matchTab = p.badge === 'Bestseller' || p.rating >= 4.9;
      if (activeTab === 'promo') matchTab = p.oldPrice > p.price;
      if (activeTab === 'nouveau') matchTab = p.badge === 'Tendance' || p.badge === 'Exclusivité';

      return matchCat && matchSearch && matchTab;
    });

    if (filtered.length === 0) {
      productGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: #64748b;">
          <svg style="width: 48px; height: 48px; margin-bottom: 1rem; opacity: 0.5;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <h3 style="font-size: 1.1rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem;">Aucun produit trouvé</h3>
          <p style="font-size: 0.9rem;">Essayez d'autres mots-clés ou réinitialisez les filtres de catégories.</p>
        </div>
      `;
      return;
    }

    productGrid.innerHTML = filtered.map(p => {
      const isOutOfStock = !p.inStock;
      const badgeHtml = isOutOfStock 
        ? `<span class="fs-card-badge out-of-stock">Rupture</span>`
        : (p.badge ? `<span class="fs-card-badge ${p.badge === 'Bestseller' ? 'gold' : ''}">${p.badge}</span>` : '');

      return `
        <article class="fs-card" data-id="${p.id}">
          <div class="fs-card-thumb-wrap" onclick="window.fsApp.openPdp('${p.id}')">
            ${badgeHtml}
            <img class="fs-card-img" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='${p.localImage || 'photo_10_2026-09-23_10-36-58.jpg'}'">
            <div class="fs-card-quickview">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              Aperçu rapide
            </div>
          </div>
          <div class="fs-card-body">
            <div class="fs-card-meta">
              <span>${p.categoryLabel || 'Produit'}</span>
              <div class="fs-card-rating">
                <span>★</span> ${p.rating.toFixed(1)} <span style="color:#94a3b8; font-weight:normal;">(${p.reviewCount || 12})</span>
              </div>
            </div>
            <h3 class="fs-card-title" title="${p.name}">${p.name}</h3>
            <div class="fs-card-pricing">
              <span class="fs-price-current">${formatFCFA(p.price)}</span>
              ${p.oldPrice ? `<span class="fs-price-old">${formatFCFA(p.oldPrice)}</span>` : ''}
            </div>
            <div class="fs-card-actions">
              ${isOutOfStock ? `
                <button class="fs-btn-add-cart" style="grid-column: 1 / -1; opacity: 0.6; cursor: not-allowed;" disabled>
                  Rupture temporaire
                </button>
              ` : `
                <button class="fs-btn-add-cart" onclick="window.fsApp.addToCart('${p.id}')">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                  </svg>
                  Ajouter
                </button>
                <button class="fs-btn-direct-wa" onclick="window.fsApp.quickWhatsAppBuy('${p.id}')" title="Commander vite sur WhatsApp">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </button>
              `}
            </div>
          </div>
        </article>
      `;
    }).join('');
  };

  // --- 3. GESTION DU PANIER ---
  const saveCart = () => {
    localStorage.setItem('fs_cart_items', JSON.stringify(cart));
    updateCartUI();
  };

  const updateCartUI = () => {
    // Calcul du total d'articles
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadgeCountEls.forEach(badge => {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'flex' : 'none';
    });

    // Sous-total
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartSubtotalEl) cartSubtotalEl.textContent = formatFCFA(subtotal);
    if (cartTotalEl) cartTotalEl.textContent = formatFCFA(subtotal);

    // Contenu du drawer
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: #64748b;">
          <svg style="width: 54px; height: 54px; margin-bottom: 1rem; opacity: 0.4;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <h4 style="font-weight: 700; color: #0f172a; margin-bottom: 0.35rem;">Votre panier est vide</h4>
          <p style="font-size: 0.85rem;">Parcourez notre catalogue et profitez de la livraison rapide à Dakar !</p>
        </div>
      `;
      return;
    }

    cartItemsContainer.innerHTML = cart.map((item, index) => `
      <div class="fs-cart-item">
        <img class="fs-cart-item-img" src="${item.image}" alt="${item.name}">
        <div class="fs-cart-item-info">
          <div class="fs-cart-item-title">${item.name}</div>
          ${item.variant ? `<div class="fs-cart-item-variant">Variante : ${item.variant}</div>` : ''}
          <div class="fs-cart-item-price">${formatFCFA(item.price)}</div>
          <div class="fs-qty-controls">
            <button class="fs-qty-btn" onclick="window.fsApp.changeQuantity(${index}, -1)">-</button>
            <span class="fs-qty-val">${item.quantity}</span>
            <button class="fs-qty-btn" onclick="window.fsApp.changeQuantity(${index}, 1)">+</button>
            <button style="margin-left: auto; color: #ef4444; font-size: 0.78rem; font-weight: 600;" onclick="window.fsApp.removeFromCart(${index})">Supprimer</button>
          </div>
        </div>
      </div>
    `).join('');
  };

  const addToCart = (productId, variant = null, quantity = 1) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    if (!prod.inStock) {
      showToast("Désolé, cet article est actuellement en rupture de stock.");
      return;
    }

    const itemKey = variant ? `${prod.id}__${variant}` : prod.id;
    const existing = cart.find(i => i.key === itemKey);

    if (existing) {
      existing.quantity += quantity;
    } else {
      let itemImage = prod.image;
      if (variant && prod.variants) {
        const vObj = prod.variants.find(v => v.name === variant);
        if (vObj && vObj.image) itemImage = vObj.image;
      }
      cart.push({
        key: itemKey,
        id: prod.id,
        name: prod.name,
        price: prod.price,
        image: itemImage,
        variant: variant,
        quantity: quantity
      });
    }

    saveCart();
    showToast(`"${prod.name}" a été ajouté à votre panier`);
    openCartDrawer();
  };

  const openCartDrawer = () => {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.add('active');
      cartOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeCartDrawer = () => {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.remove('active');
      cartOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // --- 4. MODALE PRODUIT DÉTAILLÉ (PDP) ---
  const openPdp = (productId) => {
    selectedProduct = products.find(p => p.id === productId);
    if (!selectedProduct || !pdpModal || !pdpModalBody) return;

    activeVariant = (selectedProduct.variants && selectedProduct.variants.length > 0) 
      ? selectedProduct.variants[0].name 
      : null;

    const galleryImages = selectedProduct.gallery && selectedProduct.gallery.length > 0 
      ? selectedProduct.gallery 
      : [selectedProduct.image];

    pdpModalBody.innerHTML = `
      <div class="fs-modal-pdp">
        <div class="fs-pdp-gallery">
          <div class="fs-pdp-main-img-wrap">
            <img id="pdpMainImage" class="fs-pdp-main-img" src="${galleryImages[0]}" alt="${selectedProduct.name}">
          </div>
          <div class="fs-pdp-thumbs">
            ${galleryImages.map((img, i) => `
              <img class="fs-pdp-thumb ${i === 0 ? 'active' : ''}" src="${img}" alt="" onclick="window.fsApp.switchPdpImage(this, '${img}')">
            `).join('')}
          </div>
        </div>
        <div class="fs-pdp-details">
          <div style="font-size: 0.8rem; text-transform: uppercase; color: #94a3b8; font-weight: 700;">
            ${selectedProduct.categoryLabel} ${selectedProduct.subCategory ? `• ${selectedProduct.subCategory}` : ''}
          </div>
          <h2 class="fs-pdp-title">${selectedProduct.name}</h2>
          <p class="fs-pdp-tagline">${selectedProduct.tagline || ''}</p>
          
          <div class="fs-pdp-price-box">
            <span style="font-family: var(--fs-font-display); font-size: 1.7rem; font-weight: 800; color: #0f172a;">
              ${formatFCFA(selectedProduct.price)}
            </span>
            ${selectedProduct.oldPrice ? `<span style="font-size: 1.1rem; color: #94a3b8; text-decoration: line-through;">${formatFCFA(selectedProduct.oldPrice)}</span>` : ''}
            <span style="margin-left: auto; font-size: 0.82rem; font-weight: 700; color: ${selectedProduct.inStock ? '#10b981' : '#ef4444'};">
              ${selectedProduct.inStock ? '● En Stock Immédiat' : '● Rupture de Stock'}
            </span>
          </div>

          ${selectedProduct.variants && selectedProduct.variants.length > 0 ? `
            <div class="fs-pdp-variants-wrap">
              <span class="fs-variants-label">Choisissez une déclinaison : <b id="variantSelectedLabel">${activeVariant}</b></span>
              <div class="fs-variants-chips">
                ${selectedProduct.variants.map((v, i) => `
                  <button type="button" class="fs-variant-btn ${i === 0 ? 'active' : ''}" onclick="window.fsApp.selectVariant('${v.name}', '${v.image || ''}')">
                    ${v.name}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <p class="fs-pdp-desc">${selectedProduct.description || ''}</p>

          ${selectedProduct.specs && selectedProduct.specs.length > 0 ? `
            <ul class="fs-pdp-specs">
              ${selectedProduct.specs.map(spec => `<li>${spec}</li>`).join('')}
            </ul>
          ` : ''}

          <div style="display: flex; gap: 0.75rem; margin-top: auto;">
            ${selectedProduct.inStock ? `
              <button class="fs-btn-primary" style="flex: 1; justify-content: center;" onclick="window.fsApp.addToCart('${selectedProduct.id}', window.fsApp.getActiveVariant()); window.fsApp.closePdp();">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                Ajouter au Panier
              </button>
              <button class="fs-btn-direct-wa" style="padding: 0 1.25rem; font-weight: 700; font-size: 0.95rem; gap: 0.5rem;" onclick="window.fsApp.quickWhatsAppBuy('${selectedProduct.id}', window.fsApp.getActiveVariant()); window.fsApp.closePdp();">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                WhatsApp Direct
              </button>
            ` : `
              <button class="fs-btn-primary" style="flex: 1; opacity: 0.5; cursor: not-allowed;" disabled>Rupture Temporaire</button>
            `}
          </div>
        </div>
      </div>
    `;

    pdpModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closePdp = () => {
    if (pdpModal) {
      pdpModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // --- 5. COMMANDE SUR WHATSAPP & MODALE CHECKOUT ---
  const openWhatsAppCheckout = () => {
    if (cart.length === 0) {
      showToast("Veuillez d'abord ajouter au moins un produit à votre panier.");
      return;
    }
    closeCartDrawer();

    // Remplir le récapitulatif
    if (waItemsSummary) {
      waItemsSummary.innerHTML = cart.map(item => `
        <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 0.4rem; padding-bottom: 0.4rem; border-bottom: 1px dashed #e2e8f0;">
          <span>${item.quantity}x <b>${item.name}</b> ${item.variant ? `(${item.variant})` : ''}</span>
          <b>${formatFCFA(item.price * item.quantity)}</b>
        </div>
      `).join('');
    }

    // Calcul du total avec frais de livraison sélectionnés
    updateCheckoutTotal();

    if (waModal) {
      waModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const updateCheckoutTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const selectedZoneId = waDeliverySelect ? waDeliverySelect.value : 'dakar-centre';
    const zone = STORE_CONFIG.deliveryZones.find(z => z.id === selectedZoneId) || STORE_CONFIG.deliveryZones[0];
    const total = subtotal + zone.price;

    if (waTotalAmountEl) {
      waTotalAmountEl.textContent = formatFCFA(total);
    }
    return { subtotal, zone, total };
  };

  const closeWhatsAppCheckout = () => {
    // Si l'utilisateur quitte sans commander mais avait rempli des infos, traquer le panier abandonné
    const customerName = document.getElementById('fsWaName')?.value;
    const customerPhone = document.getElementById('fsWaPhone')?.value;
    if (cart.length > 0 && customerPhone) {
      window.fallouDB.recordAbandonedCart({
        customerName,
        customerPhone,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        step: "Quitté avant WhatsApp"
      });
    }

    if (waModal) {
      waModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Traitement et redirection WhatsApp
  if (waOrderForm) {
    waOrderForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('fsWaName').value.trim();
      const phone = document.getElementById('fsWaPhone').value.trim();
      const address = document.getElementById('fsWaAddress').value.trim();
      const chosenCommercialNumber = document.querySelector('input[name="waNumber"]:checked')?.value || STORE_CONFIG.whatsappNumbers[0].number;
      const paymentMethod = document.querySelector('input[name="waPayment"]:checked')?.value || 'Wave';

      const { subtotal, zone, total } = updateCheckoutTotal();

      // Enregistrer la commande dans la base locale et Supabase
      const savedOrder = await window.fallouDB.recordOrder({
        customerName: name,
        customerPhone: phone,
        deliveryAddress: address,
        deliveryZone: zone.name,
        deliveryFee: zone.price,
        paymentMethod: paymentMethod,
        whatsappNumber: chosenCommercialNumber,
        items: cart,
        subtotal: subtotal,
        totalAmount: total
      });

      // Construction du message WhatsApp optimisé avec émojis
      let message = `*NOUVELLE COMMANDE SUR FALLOU STORE* 🛍️\n`;
      message += `------------------------------------\n`;
      message += `*Réf:* ${savedOrder.id}\n`;
      message += `*Nom du client:* ${name}\n`;
      message += `*Téléphone:* ${phone}\n`;
      message += `*Adresse:* ${address}\n`;
      message += `*Zone de livraison:* ${zone.name}\n`;
      message += `*Mode de paiement:* ${paymentMethod}\n`;
      message += `------------------------------------\n`;
      message += `*ARTICLES COMMANDÉS :*\n`;
      
      cart.forEach((item, index) => {
        message += `${index + 1}. ${item.quantity}x *${item.name}*`;
        if (item.variant) message += ` (Senteur/Modèle : ${item.variant})`;
        message += ` - ${formatFCFA(item.price * item.quantity)}\n`;
      });

      message += `------------------------------------\n`;
      message += `*Sous-total:* ${formatFCFA(subtotal)}\n`;
      message += `*Frais de livraison:* ${formatFCFA(zone.price)}\n`;
      message += `*TOTAL À PAYER:* *${formatFCFA(total)}*\n\n`;
      message += `_Commande effectuée depuis le site officiel www.falloustore.com_`;

      const encodedMsg = encodeURIComponent(message);
      const waUrl = `https://wa.me/${chosenCommercialNumber}?text=${encodedMsg}`;

      // Vider le panier
      cart = [];
      saveCart();
      closeWhatsAppCheckout();

      // Afficher modale de confirmation avec redirection
      if (confirmModal) {
        document.getElementById('confirmOrderId').textContent = savedOrder.id;
        document.getElementById('confirmWaBtn').href = waUrl;
        confirmModal.classList.add('active');
      }

      // Tenter ouverture automatique
      window.open(waUrl, '_blank');
    });
  }

  // Achat direct WhatsApp pour un seul produit
  const quickWhatsAppBuy = (productId, variant = null) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    cart = [{
      key: prod.id,
      id: prod.id,
      name: prod.name,
      price: prod.price,
      image: prod.image,
      variant: variant,
      quantity: 1
    }];
    saveCart();
    openWhatsAppCheckout();
  };

  // --- 6. VENTE FLASH COUNTDOWN (NovaTrend Style) ---
  const initCountdown = () => {
    const daysEl = document.getElementById('timerDays');
    const hoursEl = document.getElementById('timerHours');
    const minutesEl = document.getElementById('timerMinutes');
    const secondsEl = document.getElementById('timerSeconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    // Définir une date cible à minuit
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);
    targetDate.setHours(23, 59, 59, 0);

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;

      if (diff <= 0) {
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      daysEl.textContent = d < 10 ? '0' + d : d;
      hoursEl.textContent = h < 10 ? '0' + h : h;
      minutesEl.textContent = m < 10 ? '0' + m : m;
      secondsEl.textContent = s < 10 ? '0' + s : s;
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  };

  // --- 7. MODALE VIDÉO PROMO ---
  const openVideoModal = () => {
    if (videoModal && storeVideoPlayer) {
      videoModal.classList.add('active');
      storeVideoPlayer.play().catch(() => {});
      document.body.style.overflow = 'hidden';
    }
  };

  const closeVideoModal = () => {
    if (videoModal && storeVideoPlayer) {
      videoModal.classList.remove('active');
      storeVideoPlayer.pause();
      document.body.style.overflow = '';
    }
  };

  // --- 8. FAQ ACCORDÉON ---
  const faqItems = document.querySelectorAll('.fs-faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.fs-faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // --- 9. ÉCOUTEURS D'ÉVÉNEMENTS RECHERCHE ET CATÉGORIES ---
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderProducts();
    });
  }

  // Filtrage par catégories (chips)
  const catChips = document.querySelectorAll('.fs-cat-chip');
  catChips.forEach(chip => {
    chip.addEventListener('click', () => {
      catChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.getAttribute('data-category') || 'all';
      renderProducts();
      // Scroll léger vers la grille
      const grid = document.getElementById('catalogSection');
      if (grid) grid.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Onglets (Tous, Bestsellers, etc.)
  const tabBtns = document.querySelectorAll('.fs-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTab = btn.getAttribute('data-tab') || 'all';
      renderProducts();
    });
  });

  if (waDeliverySelect) {
    waDeliverySelect.addEventListener('change', updateCheckoutTotal);
  }

  // Exposition des fonctions globales sous window.fsApp
  window.fsApp = {
    addToCart,
    openCartDrawer,
    closeCartDrawer,
    removeFromCart: (index) => {
      cart.splice(index, 1);
      saveCart();
    },
    changeQuantity: (index, delta) => {
      if (cart[index]) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
          cart.splice(index, 1);
        }
        saveCart();
      }
    },
    openPdp,
    closePdp,
    switchPdpImage: (thumbEl, imgUrl) => {
      const main = document.getElementById('pdpMainImage');
      if (main) main.src = imgUrl;
      document.querySelectorAll('.fs-pdp-thumb').forEach(t => t.classList.remove('active'));
      if (thumbEl) thumbEl.classList.add('active');
    },
    selectVariant: (variantName, variantImg) => {
      activeVariant = variantName;
      const lbl = document.getElementById('variantSelectedLabel');
      if (lbl) lbl.textContent = variantName;
      document.querySelectorAll('.fs-variant-btn').forEach(b => {
        b.classList.toggle('active', b.textContent.trim() === variantName);
      });
      if (variantImg) {
        const main = document.getElementById('pdpMainImage');
        if (main) main.src = variantImg;
      }
    },
    getActiveVariant: () => activeVariant,
    quickWhatsAppBuy,
    openWhatsAppCheckout,
    closeWhatsAppCheckout,
    openVideoModal,
    closeVideoModal,
    closeConfirmModal: () => {
      if (confirmModal) confirmModal.classList.remove('active');
    },
    filterCategory: (cat) => {
      const chip = document.querySelector(`.fs-cat-chip[data-category="${cat}"]`);
      if (chip) chip.click();
    },
    refreshCatalog: async () => {
      products = await window.fallouDB.getProducts();
      renderProducts();
    }
  };

  // Initialisations au chargement
  renderProducts();
  updateCartUI();
  initCountdown();
});
