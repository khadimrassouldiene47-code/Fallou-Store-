-- ============================================================
-- FALLOU STORE - Schema Supabase pour statistiques reelles
-- Executer dans : Supabase > SQL Editor
-- ============================================================

-- 1. TABLE VISITES (analytics de frequentation)
CREATE TABLE IF NOT EXISTS public.visits (
  id          BIGSERIAL PRIMARY KEY,
  session_id  TEXT NOT NULL,
  page        TEXT DEFAULT '/',
  referrer    TEXT,
  user_agent  TEXT,
  country     TEXT DEFAULT 'SN',
  city        TEXT DEFAULT 'Dakar',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_visits_created_at ON public.visits(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visits_session ON public.visits(session_id);

-- 2. TABLE COMMANDES
CREATE TABLE IF NOT EXISTS public.orders (
  id              TEXT PRIMARY KEY,
  customer_name   TEXT,
  customer_phone  TEXT,
  delivery_zone   TEXT,
  delivery_fee    INTEGER DEFAULT 0,
  payment_method  TEXT,
  whatsapp_number TEXT,
  items           JSONB,
  total_amount    INTEGER DEFAULT 0,
  status          TEXT DEFAULT 'Nouvelle sur WhatsApp',
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

-- 3. TABLE PANIERS ABANDONNES
CREATE TABLE IF NOT EXISTS public.abandoned_carts (
  id              TEXT PRIMARY KEY,
  customer_name   TEXT DEFAULT 'Anonyme',
  customer_phone  TEXT DEFAULT 'Non renseigne',
  items           JSONB,
  estimated_total INTEGER DEFAULT 0,
  step            TEXT DEFAULT 'Formulaire',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_abandoned_created_at ON public.abandoned_carts(created_at DESC);

-- 4. TABLE PRODUITS
CREATE TABLE IF NOT EXISTS public.products (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  category     TEXT,
  price        INTEGER DEFAULT 0,
  old_price    INTEGER,
  in_stock     BOOLEAN DEFAULT TRUE,
  image_url    TEXT,
  description  TEXT,
  badge        TEXT,
  featured     BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- RLS (Row Level Security) - Acces public pour le snippet Odoo
-- ============================================================
ALTER TABLE public.visits          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.abandoned_carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products        ENABLE ROW LEVEL SECURITY;

CREATE POLICY "visits_insert_public"   ON public.visits          FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "visits_select_public"   ON public.visits          FOR SELECT TO anon USING (true);
CREATE POLICY "orders_insert_public"   ON public.orders          FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "orders_select_public"   ON public.orders          FOR SELECT TO anon USING (true);
CREATE POLICY "orders_update_public"   ON public.orders          FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "orders_delete_public"   ON public.orders          FOR DELETE TO anon USING (true);
CREATE POLICY "abandoned_insert"       ON public.abandoned_carts FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "abandoned_select"       ON public.abandoned_carts FOR SELECT TO anon USING (true);
CREATE POLICY "products_select_public" ON public.products        FOR SELECT TO anon USING (true);
CREATE POLICY "products_insert_public" ON public.products        FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "products_update_public" ON public.products        FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "products_delete_public" ON public.products        FOR DELETE TO anon USING (true);

-- ============================================================
-- VUE ANALYTICS TEMPS REEL
-- ============================================================
CREATE OR REPLACE VIEW public.analytics_summary AS
SELECT
  (SELECT COUNT(*) FROM public.visits)                                           AS total_visits,
  (SELECT COUNT(*) FROM public.visits WHERE created_at >= CURRENT_DATE)          AS visits_today,
  (SELECT COUNT(DISTINCT session_id) FROM public.visits
   WHERE created_at >= NOW() - INTERVAL '5 minutes')                             AS live_visitors,
  (SELECT COUNT(*) FROM public.orders)                                           AS total_orders,
  (SELECT COALESCE(SUM(total_amount), 0) FROM public.orders
   WHERE status = 'Livree')                                                       AS revenue_delivered,
  (SELECT COALESCE(SUM(total_amount), 0) FROM public.orders
   WHERE status NOT IN ('Livree', 'Annulee'))                                    AS revenue_pending,
  (SELECT COUNT(*) FROM public.abandoned_carts)                                  AS abandoned_count,
  (SELECT COUNT(*) FROM public.products WHERE in_stock = TRUE)                   AS products_in_stock,
  (SELECT COUNT(*) FROM public.products WHERE in_stock = FALSE)                  AS products_out_of_stock;

-- ============================================================
-- REALTIME : Activer les canaux temps reel
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.visits;
ALTER PUBLICATION supabase_realtime ADD TABLE public.abandoned_carts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
