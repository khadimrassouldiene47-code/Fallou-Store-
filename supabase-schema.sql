-- ====================================================================
-- FALLOU STORE (FS) - SCHEMA SUPABASE & POLITIQUES RLS
-- Projet : https://domzxqknhburyjmwykkn.supabase.co
-- ====================================================================

-- 1. Table des Produits
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    old_price NUMERIC,
    badge TEXT,
    in_stock BOOLEAN DEFAULT true,
    image_url TEXT,
    gallery TEXT[],
    tagline TEXT,
    description TEXT,
    specs TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table des Commandes (Leads WhatsApp)
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    delivery_zone TEXT,
    delivery_address TEXT,
    payment_method TEXT,
    whatsapp_number TEXT,
    items JSONB NOT NULL,
    subtotal NUMERIC,
    delivery_fee NUMERIC,
    total_amount NUMERIC NOT NULL,
    status TEXT DEFAULT 'Nouvelle sur WhatsApp',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table des Paniers Abandonnés
CREATE TABLE IF NOT EXISTS public.abandoned_carts (
    id TEXT PRIMARY KEY,
    customer_name TEXT,
    customer_phone TEXT,
    items JSONB NOT NULL,
    estimated_total NUMERIC,
    step TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table des Statistiques / Configuration
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- SÉCURITÉ : ACTIVER ROW LEVEL SECURITY (RLS)
-- ====================================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.abandoned_carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique
CREATE POLICY "Lecture publique des produits"
ON public.products FOR SELECT
USING (true);

-- Politiques d'insertion publique pour les commandes & paniers
CREATE POLICY "Insertion publique des commandes WhatsApp"
ON public.orders FOR INSERT
WITH CHECK (true);

CREATE POLICY "Insertion publique des paniers abandonnés"
ON public.abandoned_carts FOR INSERT
WITH CHECK (true);

-- Politiques de gestion pour la clé de service ou utilisateur authentifié
CREATE POLICY "Gestion complète des produits"
ON public.products FOR ALL
USING (true)
WITH CHECK (true);

CREATE POLICY "Gestion complète des commandes"
ON public.orders FOR ALL
USING (true)
WITH CHECK (true);
