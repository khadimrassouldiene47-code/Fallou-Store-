# Fallou Store (FS) — E-Commerce & Admin Dashboard

Site e-commerce premium pour la boutique officielle **Fallou Store** à Dakar, Sénégal.
Comprend le catalogue interactif, les fiches produits détaillées, les variantes, les commandes directes sur WhatsApp, le panier d'achat, le tableau de bord administrateur avec statistiques en direct et le snippet intégré pour Odoo.

## 🚀 Fonctionnalités
- **Boutique en ligne complète** : Électronique, Parfums orientaux de luxe, Accessoires & Gadgets.
- **Tunnel WhatsApp direct** : Génération automatique des messages formatés et transmission aux commerciaux.
- **Dashboard Administrateur** :
  - Suivi des commandes & livraisons à venir.
  - Statistiques de fréquentation en temps réel (visiteurs en direct, répartition mobile vs desktop, géographie).
  - Gestion des stocks et du catalogue.
  - Suivi des paniers abandonnés avec bouton de relance WhatsApp.
  - Boîtes de dialogue personnalisées anti-erreur (`fsConfirm`).
- **Snippet Odoo Tout-en-un** (`odoo-snippet.html`) : Autonome, sans erreur 404, embarque le site et l'admin dans un seul bloc HTML.

## 🔑 Identifiants d'Accès Administrateur
- **URL** : `/admin.html` ou `/connexion` ou `/login`
- **Email** : `Falluetsesvideos@gmail.com` (ou `contact@falloustore.com`)
- **Mot de passe** : `FallouAdmin2026!`

## ⚙️ Configuration Supabase (Base de données)
Le site est configuré avec Supabase et dispose d'une synchronisation locale automatique en cas d'indisponibilité réseau :
- **Supabase URL** : `https://domzxqknhburyjmwykkn.supabase.co`
- **Supabase Anon / Publishable Key** : `sb_publishable_cp1YvvJeebVKEGLPYqqxAg_Ktk0h8Qn`

## ☁️ Déploiement Vercel
Ce projet est prêt pour un déploiement instantané sur Vercel :
- **Framework Preset** : `Other` (Static HTML)
- **Root Directory** : `./`
- **Build Command** : Aucun (laisser vide)
- **Output Directory** : Aucun (laisser vide)
- Fichier de configuration de routage inclus : `vercel.json`
