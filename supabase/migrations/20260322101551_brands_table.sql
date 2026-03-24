-- Brands table
CREATE TABLE public.brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- Read policy (Anyone can read)
CREATE POLICY "Anyone can read brands" ON public.brands FOR SELECT USING (true);

-- Admin policies
CREATE POLICY "Admins can insert brands" ON public.brands FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update brands" ON public.brands FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete brands" ON public.brands FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Seed current brands
INSERT INTO public.brands (name, slug, sort_order) VALUES
  ('Renault', 'renault', 1),
  ('Nissan', 'nissan', 2),
  ('Mercedes', 'mercedes', 3),
  ('Volvo', 'volvo', 4),
  ('Jeep', 'jeep', 5)
ON CONFLICT (slug) DO NOTHING;
