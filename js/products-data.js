/**
 * Fallou Store (FS) - Données Initiales du Catalogue Produits
 * Électronique, Parfums, Accessoires, Gadgets
 * Prix en FCFA (XOF)
 */

const INITIAL_PRODUCTS = [
  {
    id: "fs-prod-01",
    name: "AirPods Max 2",
    category: "electronique",
    categoryLabel: "Électronique",
    subCategory: "Audio & Écouteurs",
    price: 80000,
    oldPrice: 110000,
    badge: "Bestseller",
    rating: 4.9,
    reviewCount: 48,
    inStock: true,
    featured: true,
    image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790161813/airpods-max-2-2_zv0del.webp",
    localImage: "photo_1_2026-09-23_10-36-58.jpg",
    gallery: [
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790161813/airpods-max-2-2_zv0del.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790161810/photo_1_2026-09-23_10-36-58_qcwdqe.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790161782/bento_1_airpod_max_midnight__4jy1tkqh9qay_xlarge_acdicd.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790161778/bento_2_airpod_max_midnight__c4h88dvygxkm_xlarge_ndxbxg.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790161774/photo_2026-09-23_10-15-44_ggkoxb.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790161770/bento_4_airpod_max_midnight__d38igje6phm6_xlarge_v82vc1.jpg"
    ],
    tagline: "Un son précis. Une science exacte.",
    description: "Boostés par la puce H2, les AirPods Max 2 livrent un son haute-fidélité impressionnant, encore plus détaillé. Grâce au nouvel amplificateur à gamme dynamique élevée, le transducteur conçu sur mesure dispose d’une marge dynamique encore plus grande pour offrir des basses plus riches, des voix plus naturelles et une localisation précise des instruments sur une scène sonore plus vaste.",
    specs: [
      "Puce Apple H2 haute fidélité",
      "Réduction active du bruit avancée",
      "Audio spatial personnalisé avec suivi dynamique de la tête",
      "Autonomie jusqu'à 20 heures d'écoute",
      "Coussinets en maille respirante ultra confort"
    ]
  },
  {
    id: "fs-prod-02",
    name: "DJI Mic Mini (2 TX + 1 RX)",
    category: "electronique",
    categoryLabel: "Électronique",
    subCategory: "Vlogging & Audio Pro",
    price: 90000,
    oldPrice: 120000,
    badge: "Tendance",
    rating: 5.0,
    reviewCount: 36,
    inStock: true,
    featured: true,
    image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790167860/DJI-Mic-Mini-2-TX-1-RX-Boitier-de-Recharge-Adaptateur-pour-Iphone-Lightning-Ultra-leger-Audio-de-HQ-48-h-dUtilisation-Annulation-du-Bruit-Limite-Auto--800x800_y3xvdw.jpg",
    localImage: "photo_3_2026-09-23_10-36-58.jpg",
    gallery: [
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790167860/DJI-Mic-Mini-2-TX-1-RX-Boitier-de-Recharge-Adaptateur-pour-Iphone-Lightning-Ultra-leger-Audio-de-HQ-48-h-dUtilisation-Annulation-du-Bruit-Limite-Auto--800x800_y3xvdw.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790167865/dji-mic-mini--2-tx---1-rx--p-image-269543-grande_jpg_hs2nje.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790167857/dji-mic-mini--2-tx---1-rx--p-image-268974-grande_jpg_tjmifd.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790167852/dji-mic-mini--2-tx---1-rx--p-image-268967-grande_jpg_z3pyan.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790167848/dji-mic-mini--2-tx---1-rx--p-image-268973-grande_jpg_mkxtnz.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790167785/photo_3_2026-09-23_10-36-58_bun8lg.jpg"
    ],
    tagline: "Le microphone sans fil ultra-léger pour créateurs de contenu.",
    description: "Découvrez le DJI Mic Mini (2 TX + 1 RX) de DJI, le microphone sans fil ultra-léger qui révolutionne vos enregistrements audio avec une qualité exceptionnelle. Seulement 10g par émetteur, portée de 400m, autonomie globale de 48h avec le boîtier de recharge. Deux niveaux d'annulation de bruit et limiteur automatique anti-écrêtage.",
    specs: [
      "2 émetteurs (TX) + 1 récepteur (RX) + Boîtier",
      "Poids plume : 10g seulement par micro",
      "Portée record de transmission jusqu'à 400m",
      "Annulation de bruit 2 niveaux & limiteur audio auto",
      "Autonomie 11.5h (système) / jusqu'à 48h avec boîtier",
      "Compatibilité smartphones (Lightning / Type-C) et boîtiers DSLR"
    ]
  },
  {
    id: "fs-prod-03",
    name: "Lumière d'appoint LED portable U40 40W",
    category: "gadgets",
    categoryLabel: "Gadgets",
    subCategory: "Éclairage Studio & TikTok",
    price: 25000,
    oldPrice: 35000,
    badge: "Promo",
    rating: 4.8,
    reviewCount: 29,
    inStock: true,
    featured: false,
    image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790168948/619d5Hbs04L._AC_SL1500__hzuax7.jpg",
    localImage: "photo_3_2026-09-23_10-36-58.jpg",
    gallery: [
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790168948/619d5Hbs04L._AC_SL1500__hzuax7.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790168961/Hdb601c5593784d30bda75ea53865c1deg_nh7waz.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790168955/H8abf5da7fa1d47a2928cc61cab79e57d8_zkz44l.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790168941/H5c3fdb163d87401e8a16ee1d1643a2c73_xvcleb.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790169047/photo_3_2026-09-23_10-36-58_oilbne.jpg"
    ],
    tagline: "Éclairage professionnel portable 40W bicolore 2500~9000K.",
    description: "Lampe LED compacte 40W haute puissance avec ventilateur de refroidissement intégré. Batterie 4000mAh longue durée, température de couleur réglable de 2500K à 9000K, indice de rendu des couleurs CRI/TLCI ≥ 95. Idéal pour YouTube, TikTok, vlogging et studio photo à domicile.",
    specs: [
      "Puissance 40W avec ventilateur silencieux",
      "Température bicolore ajustable 2500K - 9000K",
      "Batterie intégrée 4000mAh rechargeable Type-C",
      "Poids ultra-léger 215g pour montage caméra/smartphone",
      "CRI/TLCI ≥ 95 pour des couleurs éclatantes et fidèles"
    ]
  },
  {
    id: "fs-prod-04",
    name: "SONGZEN S4 PRO Wireless Gaming Headset",
    category: "electronique",
    categoryLabel: "Électronique",
    subCategory: "Gaming & Audio",
    price: 35000,
    oldPrice: 48000,
    badge: "Populaire",
    rating: 4.7,
    reviewCount: 42,
    inStock: true,
    featured: false,
    image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790170580/s-pdpxl_3_2_7e3a149b-0826-4c76-ba09-b0cad56f8926_vfe8vo.webp",
    localImage: "photo_12_2026-09-23_10-36-58.jpg",
    gallery: [
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790170580/s-pdpxl_3_2_7e3a149b-0826-4c76-ba09-b0cad56f8926_vfe8vo.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790170602/s-pdpxl_1_2_e48a2a69-4ba1-42d0-abf4-351cb5a301ae_yjlzcp.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790170597/s-pdpxl_2_3_5bd5866b-cbf5-4d77-aa33-4212ca8b4407_rbsked.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790170592/s-pdpxl_4_2_ee90e204-bc84-4482-830e-8a339bee72a0_xx56z3.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790170586/s-pdpxl_5_19c9d094-e364-43e6-a181-ee163d327805_ehcx6o.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790170574/s-pdpxl3_638ecb34-ab3f-4995-b353-e5c81039f75f_xke7ee.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790170557/photo_12_2026-09-23_10-36-58_pbo7k0.jpg"
    ],
    tagline: "Casque gamer sans fil 2.4GHz avec son surround 7.1 et RGB.",
    description: "Casque de jeu sans fil SONGZEN S4 PRO avec son surround immersif, éclairage d'ambiance RGB dynamique, microphone antibruit amovible et autonomie record de 36 heures. Connexion sans fil ultra-rapide 2.4GHz à latence zéro pour PC, PS4, PS5 et smartphones.",
    specs: [
      "Connexion sans fil 2.4GHz ultra-faible latence + Bluetooth",
      "Son Surround 3D immersif pour repérer les pas d'ennemis",
      "Microphone antibruit détachable haute sensibilité",
      "Batterie longue durée 36 heures d'autonomie",
      "Éclairage RGB stylé et arceau rembourré ergonomique"
    ]
  },
  {
    id: "fs-prod-05",
    name: "Tablette AirTab i17 Pro Max 24 Go RAM / 1 To Stockage 5G",
    category: "electronique",
    categoryLabel: "Électronique",
    subCategory: "Tablettes & Ordinateurs",
    price: 60000,
    oldPrice: 85000,
    badge: "Pack Complet",
    rating: 4.8,
    reviewCount: 31,
    inStock: true,
    featured: true,
    image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790171163/WhatsApp-Image-2026-07-02-at-13.21.24_y3d8js.jpg",
    localImage: "photo_7_2026-09-23_10-36-58.jpg",
    gallery: [
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790171163/WhatsApp-Image-2026-07-02-at-13.21.24_y3d8js.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790171169/1_4_xtuqam.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790171175/H26c4b0237703426aa39a651f685e7a30O_hqumx6.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790171181/photo_7_2026-09-23_10-36-58_w61rqv.jpg"
    ],
    tagline: "Le Mini-PC portable ultime avec kit clavier & souris.",
    description: "Dans un monde où la mobilité et la performance sont devenues essentielles, la Tablette AirTab i17 Pro Max s’impose comme une véritable révolution technologique. Elle combine une mémoire vive de 24 Go RAM, un stockage colossal de 1 To, connectivité cellulaire 5G et le système Android 15. Livrée avec son pack complet : clavier Bluetooth, souris et housse de protection.",
    specs: [
      "Écran HD immersif 10.1 pouces éclatant",
      "24 Go de RAM ultra fluide + 1 To de stockage",
      "Connectivité Double SIM 5G / 4G LTE + Wi-Fi",
      "Système d'exploitation Android 15 dernière génération",
      "Pack complet inclus : Clavier sans fil, souris et stylet"
    ]
  },
  {
    id: "fs-prod-06",
    name: "DJI Osmo Pocket 4 Caméra Vlog de Poche",
    category: "electronique",
    categoryLabel: "Électronique",
    subCategory: "Caméras & Stabilisateurs",
    price: 350000,
    oldPrice: 420000,
    badge: "Haut de Gamme",
    rating: 5.0,
    reviewCount: 22,
    inStock: true,
    featured: true,
    image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790172046/photo_4_2026-09-23_10-36-58_c3uxvb.jpg",
    localImage: "photo_4_2026-09-23_10-36-58.jpg",
    gallery: [
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790172046/photo_4_2026-09-23_10-36-58_c3uxvb.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790172062/61OQ8oC7nmL._AC_SL1500__r7ywdk.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790172147/71-Rlo_uTFL._AC_SL1500__hhgojb.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790172151/51qsbb6U0yL._AC_SL1500__yivtaq.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790172157/719nvoD_nbL._AC_SL1500__mwunzr.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790172163/71leCF4g2VL._AC_SL1500__cvhpli.jpg"
    ],
    tagline: "Système révolutionnaire à double caméra & stabilisation 3 axes.",
    description: "La caméra de poche qui voit plus loin grâce à son système révolutionnaire à double capteur : capteur principal 1 pouce + téléobjectif avec zoom optique 3x. Vidéo cinématique 4K jusqu'à 240 i/s, photos 37 MP, suivi intelligent Smart Follow 8.0 et 103 Go de stockage interne.",
    specs: [
      "Capteur principal 1 pouce + Téléobjectif zoom optique 3x",
      "Enregistrement vidéo 4K cinématique jusqu'à 240 images/s",
      "Photographies haute résolution 37 Mégapixels",
      "Stabilisation mécanique professionnelle sur 3 axes",
      "Suivi intelligent de sujet Smart Follow 8.0",
      "103 Go de mémoire interne + slot microSD",
      "Combo Vlog complet prêt pour la création nomade"
    ]
  },
  {
    id: "fs-prod-07",
    name: "Smart Watch Série 11",
    category: "accessoires",
    categoryLabel: "Accessoires",
    subCategory: "Montres Connectées",
    price: 25000,
    oldPrice: 40000,
    badge: "Bestseller",
    rating: 4.8,
    reviewCount: 54,
    inStock: true,
    featured: true,
    image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790176360/D_NQ_NP_944703-MLM111099021995_052026-O_d29yoy.webp",
    localImage: "photo_5_2026-09-23_10-36-58.jpg",
    gallery: [
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790176360/D_NQ_NP_944703-MLM111099021995_052026-O_d29yoy.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790176336/dateoy_h26_pro_smart_watch-600x600_p247gj.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790176342/IMG_3224-600x600_djxwba.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790176348/images_36_zk1e9y.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790176354/H11f0baed663d4427ba515cc0df3f8d70y_zqscno.avif",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790176367/IMG_3225-600x600_hqw1na.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790176373/Sdc4d42757a594856ad89ce854f3b17d12-600x600_arvhvf.png",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790176381/Watch11-600x600_raxpbc.png",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790176555/photo_5_2026-09-23_10-36-58_k20ab2.jpg"
    ],
    tagline: "Élégance, santé et connectivité complète à votre poignet.",
    description: "Montre connectée haut de gamme Série 11 avec grand écran tactile borderless 46mm. Réception et émission d'appels Bluetooth, affichage des notifications SMS et WhatsApp, suivi du rythme cardiaque et sommeil, fonds d'écran personnalisables à volonté.",
    specs: [
      "Écran HD bord à bord 46mm ultra lumineux",
      "Autonomie confortable de 2 à 3 jours en usage continu",
      "Mémoire interne 4 Go pour musiques et photos",
      "Haut-parleur & micro HD pour appels téléphoniques directs",
      "Synchronisation notifications : Appels, SMS, WhatsApp, Facebook",
      "Capteurs santé complets (Rythme cardiaque, SpO2, Podomètre)"
    ]
  },
  {
    id: "fs-prod-08",
    name: "Oud Al Malik Eau de Parfum 50 ml",
    category: "parfums",
    categoryLabel: "Parfums",
    subCategory: "Parfums Orientaux",
    price: 18000,
    oldPrice: 25000,
    badge: "5 Déclinaisons",
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    featured: true,
    hasVariants: true,
    variantName: "Déclinaison / Senteur",
    variants: [
      { name: "Casanova", image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790177488/ef4cb301-6c52-423c-a384-ea1a32a41bc6_njphqw.png" },
      { name: "Aura", image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790177804/photo_13_2026-09-23_10-36-58_bqnqok.jpg" },
      { name: "Royal Intence", image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790179188/photo_19_2026-09-23_10-36-58_h9lwjw.jpg" },
      { name: "Pink Baby", image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790179131/photo_18_2026-09-23_10-36-58_tyuqgk.jpg" },
      { name: "Oud Al Malik Original", image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790179238/photo_20_2026-09-23_10-36-58_leqjia.jpg" }
    ],
    image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790177488/ef4cb301-6c52-423c-a384-ea1a32a41bc6_njphqw.png",
    localImage: "photo_13_2026-09-23_10-36-58.jpg",
    gallery: [
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790177488/ef4cb301-6c52-423c-a384-ea1a32a41bc6_njphqw.png",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790177492/6154f47c-668a-4d79-b879-2400496a1d7c_igilxh.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790177804/photo_13_2026-09-23_10-36-58_bqnqok.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790179188/photo_19_2026-09-23_10-36-58_h9lwjw.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790179131/photo_18_2026-09-23_10-36-58_tyuqgk.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790179238/photo_20_2026-09-23_10-36-58_leqjia.jpg"
    ],
    tagline: "Élégance, prestige et caractère oriental raffiné.",
    description: "Découvrez Oud Al Malik Eau de Parfum 50 ml, une fragrance à l’univers oriental, élégant et sophistiqué. Disponible en 5 déclinaisons uniques (Casanova, Aura, Royal Intence, Pink Baby et Oud Al Malik Original). Son format pratique et son identité raffinée en font un parfum idéal pour les cérémonies, sorties et cadeaux de prestige.",
    specs: [
      "Volume : 50 ml Eau de Parfum concentrée",
      "Disponible en 5 déclinaisons de senteurs exclusives",
      "Tenue longue durée sur vêtements et peau (jusqu'à 24h)",
      "Flacon luxueux gravé avec vaporisateur de précision"
    ]
  },
  {
    id: "fs-prod-09",
    name: "Passion Oud - Inspired by Oud Maracuja Crivelli",
    category: "parfums",
    categoryLabel: "Parfums",
    subCategory: "Parfums de Niche",
    price: 15000,
    oldPrice: 22000,
    badge: "Coup de Cœur",
    rating: 5.0,
    reviewCount: 38,
    inStock: true,
    featured: true,
    image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790179712/PASSIONOUDEAUDEPARFUM-BuyParfumbySkyCosmetics_zhsb9g.webp",
    localImage: "photo_17_2026-09-23_10-36-58.jpg",
    gallery: [
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790179712/PASSIONOUDEAUDEPARFUM-BuyParfumbySkyCosmetics_zhsb9g.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790179736/photo_17_2026-09-23_10-36-58_zqajqy.jpg"
    ],
    tagline: "Un accord radieux bergamote, fruits exotiques et bois ambré.",
    description: "Passion OUD est un parfum audacieux et sensuel qui capture l'essence du luxe moderne. Il s'ouvre sur un accord radieux de bergamote, de gingembre et de poire, créant une première impression vibrante et lumineuse. Son cœur révèle un accord riche et ambré de bois de cachemire. Enfin, le parfum s'attarde sur des notes de caramel, musc, patchouli et daim pour un sillage irrésistible.",
    specs: [
      "Notes de tête : Bergamote, gingembre pétillant, poire fraîche",
      "Notes de cœur : Bois de cachemire ambré, touches florales",
      "Notes de fond : Caramel gourmand, musc velouté, patchouli, daim noble",
      "Inspiration haute parfumerie de niche"
    ]
  },
  {
    id: "fs-prod-10",
    name: "Taraf Arabian Oud Eau de Parfum Unisexe 100 ml",
    category: "parfums",
    categoryLabel: "Parfums",
    subCategory: "Luxe & Prestige",
    price: 140000,
    oldPrice: 165000,
    badge: "Luxe Royal",
    rating: 5.0,
    reviewCount: 19,
    inStock: true,
    featured: true,
    image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790179907/img_2890-666x669_xaqptl.jpg",
    localImage: "photo_22_2026-09-23_10-36-58.jpg",
    gallery: [
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790179907/img_2890-666x669_xaqptl.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790179902/img_3629_k1eqg0.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790179891/photo_22_2026-09-23_10-36-58_uy6pix.jpg"
    ],
    tagline: "Un état de luxe absolu qui sublime votre présence.",
    description: "Une légende de parfum séduisante racontant l'harmonie florale de romarin et de thym rafraîchissant. Des notes fraîches de bergamote bouillonnent dès le premier instant pour réveiller vos sens. Les couches de cuirs foncés évoquent un mystère noble et confèrent une allure formelle spectaculaire.",
    specs: [
      "Contenance : 100 ml flacon signature Arabian Oud",
      "Notes de tête : Sauge aromatique, bergamote d'Italie",
      "Notes de cœur : Rose bulgare précieuse, romarin noble",
      "Notes de fond : Cuir sombre d'exception, ambre chaud, bois de cèdre",
      "Livraison sécurisée avec emballage haute protection à Dakar"
    ]
  },
  {
    id: "fs-prod-11",
    name: "Arabian Oud Madawi Gold Edition",
    category: "parfums",
    categoryLabel: "Parfums",
    subCategory: "Édition Limitée",
    price: 130000,
    oldPrice: 155000,
    badge: "Édition Or",
    rating: 5.0,
    reviewCount: 27,
    inStock: true,
    featured: true,
    image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180202/madawi-gold-edition___240829_1_dwx7au.webp",
    localImage: "photo_9_2026-09-23_10-36-58.jpg",
    gallery: [
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180202/madawi-gold-edition___240829_1_dwx7au.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180195/madawi-gold-edition___240829_qnz2un.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180186/photo_9_2026-09-23_10-36-58_xwjosz.jpg"
    ],
    tagline: "L'éclat de l'or immortalisé dans une fragrance légendaire.",
    description: "Créé pour célébrer le prestige d'Arabian Oud, Madawi Gold Edition est un parfum oriental et gourmand sans équivalent. Cardamome épicée, ananas juteux apportant fraîcheur, fève tonka suave et vanille sensuelle qui enlace votre peau d'un voile soyeux inoubliable.",
    specs: [
      "Parfum oriental gourmand - Unisexe",
      "Notes de tête : Cardamome aromatique, épices fines",
      "Notes de cœur : Ananas juteux, fève tonka torréfiée",
      "Notes de fond : Vanille de Madagascar, musc précieux",
      "Flacon collector or massif laqué"
    ]
  },
  {
    id: "fs-prod-12",
    name: "Just 4 You Eau de Parfum",
    category: "parfums",
    categoryLabel: "Parfums",
    subCategory: "Parfums Homme & Unisexe",
    price: 15000,
    oldPrice: 20000,
    badge: "Tendance",
    rating: 4.8,
    reviewCount: 35,
    inStock: true,
    featured: false,
    image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180443/Just_4_You_-_Buy_Parfum_by_SkyCosmetics_-_Graphics_b8v4w5.webp",
    localImage: "photo_14_2026-09-23_10-36-58.jpg",
    gallery: [
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180443/Just_4_You_-_Buy_Parfum_by_SkyCosmetics_-_Graphics_b8v4w5.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180448/Just_4_You_-_Buy_Parfum_by_SkyCosmetics_-_Graphics_2_aobdph.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180454/Just4YoubySkyCosmetics-WhiteBackground2_gmiimp.jpg",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180459/Just4YoubySkyCosmetics-WhiteBackground1_vepvri.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180464/Just4YoubySkyCosmetics-WhiteBackground4_zwhzco.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180471/photo_14_2026-09-23_10-36-58_atld5u.jpg"
    ],
    tagline: "Fraîcheur vive d'agrumes relevée de gingembre et poivre rose.",
    description: "Just 4 You est un parfum vibrant et affirmé. Explosion d'énergie mêlant pamplemousse, citron et menthe fraîche, rehaussée de poivre rose. Cœur de gingembre, muscade et jasmin sur fond terreux et noble de vétiver, santal et musc blanc.",
    specs: [
      "Volume : 100 ml",
      "Notes de tête : Pamplemousse, citron jaune, menthe givrée, baies roses",
      "Notes de cœur : Gingembre chaud, muscade, jasmin pur",
      "Notes de fond : Vétiver boisé, santal d'Orient, ambre, musc blanc"
    ]
  },
  {
    id: "fs-prod-13",
    name: "Memories Noble Eau de Parfum",
    category: "parfums",
    categoryLabel: "Parfums",
    subCategory: "Collection Privée",
    price: 25000,
    oldPrice: 35000,
    badge: "Signature",
    rating: 4.9,
    reviewCount: 23,
    inStock: true,
    featured: false,
    image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180696/MemmoriesNoblebySkyCosmetics-WhiteBackground4_vs39c3.webp",
    localImage: "photo_16_2026-09-23_10-36-58.jpg",
    gallery: [
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180696/MemmoriesNoblebySkyCosmetics-WhiteBackground4_vs39c3.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180692/MemmoriesNoblebySkyCosmetics-Creative2_mdysm8.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180702/MemmoriesNoblebySkyCosmetics-WhiteBackground3_egl7kr.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180708/MemmoriesNoblebySkyCosmetics-WhiteBackground2_tgqezl.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180735/MemmoriesNoblebySkyCosmetics-WhiteBackground1_c5qufp.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180682/photo_16_2026-09-23_10-36-58_ljuybi.jpg"
    ],
    tagline: "Une signature olfactive majestueuse gravée dans les mémoires.",
    description: "Memories Noble est une création somptueuse aux effluves chaleureuses et ambrées. Conçu pour les hommes et femmes qui recherchent distinction, prestance et un sillage remarquable du matin jusqu'au soir.",
    specs: [
      "Volume : 100 ml Eau de Parfum",
      "Sillage ambré, boisé et délicatement épicé",
      "Présentation luxe avec packaging coffret noir et doré"
    ]
  },
  {
    id: "fs-prod-14",
    name: "Choice Eau de Parfum",
    category: "parfums",
    categoryLabel: "Parfums",
    subCategory: "Parfums Modernes",
    price: 15000,
    oldPrice: 22000,
    badge: "Populaire",
    rating: 4.8,
    reviewCount: 40,
    inStock: true,
    featured: false,
    image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180940/Choice_-_Buy_Parfum_by_SkyCosmetics_-_Graphics_d83cyj.webp",
    localImage: "photo_21_2026-09-23_10-36-58.jpg",
    gallery: [
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180940/Choice_-_Buy_Parfum_by_SkyCosmetics_-_Graphics_d83cyj.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180945/Choice_-_Buy_Parfum_by_SkyCosmetics_-_White_Bg_nitwof.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180951/ChoicebySkyCosmetics-WhiteBackground1_v4ksay.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180956/ChoicebySkyCosmetics-WhiteBackground4_s78vkl.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180962/ChoicebySkyCosmetics-WhiteBackground2_rmn4ey.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180967/ChoicebySkyCosmetics-WhiteBackground3_rtyyad.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790180985/photo_21_2026-09-23_10-36-58_xmagcg.jpg"
    ],
    tagline: "Pomme croquante, bergamote, caramel gourmand et ambre gris.",
    description: "Choice est un parfum vibrant et moderne qui incarne la confiance et le charme. Il s'ouvre sur une explosion de pomme, bergamote, mandarine et citron, rehaussée de lavande et cardamome. Cœur de caramel, rose et violette qui se fond dans un sillage ambre gris, musc et patchouli.",
    specs: [
      "Notes de tête : Pomme verte, bergamote, mandarine, lavande",
      "Notes de cœur : Caramel onctueux, rose, violette, bois doux",
      "Notes de fond : Ambre gris précieux, musc blanc, patchouli, fève tonka",
      "Flacon moderne 100 ml"
    ]
  },
  {
    id: "fs-prod-15",
    name: "Memories Royal Eau de Parfum",
    category: "parfums",
    categoryLabel: "Parfums",
    subCategory: "Collection Royale",
    price: 25000,
    oldPrice: 35000,
    badge: "Prestige",
    rating: 4.9,
    reviewCount: 33,
    inStock: true,
    featured: false,
    image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790181226/MemmoriesRoyalbySkyCosmetics-WhiteBackground3_k8tejz.webp",
    localImage: "photo_8_2026-09-23_10-36-58.jpg",
    gallery: [
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790181226/MemmoriesRoyalbySkyCosmetics-WhiteBackground3_k8tejz.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790181210/MemmoriesRoyalbySkyCosmetics-Creative_rpdiq2.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790181219/MemmoriesRoyalbySkyCosmetics-WhiteBackground4_zq1lgf.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790181232/MemmoriesRoyalbySkyCosmetics-WhiteBackground1_eqhff8.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790181252/MemmoriesRoyalbySkyCosmetics-Creative2_sotwpp.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790181272/MemmoriesRoyalbySkyCosmetics-WhiteBackground2_vqnm7e.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790181199/photo_8_2026-09-23_10-36-58_f8qwrr.jpg"
    ],
    tagline: "L'opulence royale capturée dans un sillage inoubliable.",
    description: "Une fragrance impériale qui séduit par sa complexité et sa tenue exceptionnelle. Harmonie d'accords floraux et boisés d'une grande rareté, dédiée aux amateurs de parfumerie d'exception.",
    specs: [
      "Volume : 100 ml vaporisateur de luxe",
      "Longue tenue certifiée jusqu'à 24h+",
      "Flacon aux finitions or noble"
    ]
  },
  {
    id: "fs-prod-16",
    name: "Al Fareed Eau de Parfum 50 ml - Arabian Oud",
    category: "parfums",
    categoryLabel: "Parfums",
    subCategory: "Haute Parfumerie",
    price: 140000,
    oldPrice: 170000,
    badge: "Exclusivité",
    rating: 5.0,
    reviewCount: 17,
    inStock: true,
    featured: true,
    image: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790181519/27c8be22-e805-4da5-b436-d093341049da-1000x1000-lzb5NQCQRGKUT16AKSXaEKSuq33BWrVtUn9LJjG3_acnxbz.webp",
    localImage: "photo_11_2026-09-23_10-36-58.jpg",
    gallery: [
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790181519/27c8be22-e805-4da5-b436-d093341049da-1000x1000-lzb5NQCQRGKUT16AKSXaEKSuq33BWrVtUn9LJjG3_acnxbz.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790181526/5cbd16c6-4f5a-4f37-9357-5aeaa6209194-1000x1000-u1WI69reb9lHm19aJGFoEEIaXMnr07dKMtBYoVHb_shlpz3.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790181540/d239c551-28a0-4160-83c9-c4dc6bcec431-1000x1000-ZE460EVnQhYZGdZYQzkczMaM52NsKXeH3WJELCaM_s59rb0.webp",
      "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790181582/photo_11_2026-09-23_10-36-58_w9xvuh.jpg"
    ],
    tagline: "Patchouli exclusif, ambre authentique et oud rare.",
    description: "Al Fareed incarne le sommet du raffinement oriental. Un parfum unique de patchouli exclusif, avec son sillage boisé luxueux et sa touche épicée chaleureuse, entrelacé avec l'arôme somptueux d'ambre authentique et de oud rare. Une création qui magnifie votre charisme.",
    specs: [
      "Flacon haute couture 50 ml",
      "Ingrédients : Patchouli précieux, ambre brut d'Orient, essence d'oud rare",
      "Sillage et persistance spectaculaires",
      "Pièce maîtresse des collections Arabian Oud"
    ]
  }
];

// Données d'information de l'entreprise
const STORE_CONFIG = {
  brandName: "Fallou Store",
  brandInitials: "FS",
  tagline: "Électronique | Parfums | Accessoires | Gadgets",
  domain: "www.falloustore.com",
  logoUrl: "https://res.cloudinary.com/dpw81ymi6/image/upload/v1790161836/photo_10_2026-09-23_10-36-58_ufgwp6.jpg",
  localLogoUrl: "photo_10_2026-09-23_10-36-58.jpg",
  promoVideoUrl: "https://res.cloudinary.com/dpw81ymi6/video/upload/v1790179358/video_2026-09-23_10-36-58_abtuya.mp4",
  adminEmail: "Falluetsesvideos@gmail.com",
  contactEmail: "Falluetsesvideos@gmail.com",
  adminDefaultPasswordHash: "8e50d690825214e6b4b034b1c08a0f2be0b3fb9b0c54f4a36d77e45403e1529f",
  whatsappNumbers: [
    { label: "Commercial 1 (Principal)", number: "221778944041", display: "+221 77 894 40 41" },
    { label: "Commercial 2 (Service Client)", number: "221710544141", display: "+221 71 054 41 41" }
  ],
  deliveryZones: [
    { id: "dakar-centre", name: "Dakar Centre (Plateau, Médina, Fann, Point E)", price: 2000, time: "Moins de 4h" },
    { id: "dakar-almadies", name: "Almadies / Ngor / Ouakam / Yoff / Mermoz", price: 2000, time: "Moins de 4h" },
    { id: "banlieue", name: "Banlieue (Guédiawaye, Pikine, Parcelles, Keur Massar)", price: 2500, time: "Livraison dans la journée" },
    { id: "rufisque", name: "Rufisque / Diamniadio / Bargny", price: 3000, time: "24h maximum" },
    { id: "regions", name: "Régions du Sénégal (Thiès, Mbour, Saint-Louis, Touba, etc.)", price: 4000, time: "24h à 48h (Colis Express)" },
    { id: "boutique", name: "Retrait Gratuit en Boutique Dakar", price: 0, time: "Immédiat" }
  ],
  paymentMethods: [
    { id: "wave", name: "Wave", badge: "Instantané 0% frais", icon: "wave" },
    { id: "om", name: "Orange Money", badge: "Rapide & Sécurisé", icon: "om" },
    { id: "cash", name: "Paiement à la Livraison", badge: "Espèces à Dakar", icon: "cash" },
    { id: "card", name: "Carte Bancaire Visa / Mastercard", badge: "International", icon: "card" }
  ],
  developerCredit: {
    text: "Développé avec excellence par Bambatechnologies.com",
    url: "https://bambatechnologies.com"
  }
};
