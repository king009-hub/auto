-- Junction table for Category <-> Brand association
CREATE TABLE public.category_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE NOT NULL,
  brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (category_id, brand_id)
);

-- Enable RLS
ALTER TABLE public.category_brands ENABLE ROW LEVEL SECURITY;

-- Read policy (Anyone can read)
CREATE POLICY "Anyone can read category_brands" ON public.category_brands FOR SELECT USING (true);

-- Admin policies
CREATE POLICY "Admins can insert category_brands" ON public.category_brands FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update category_brands" ON public.category_brands FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete category_brands" ON public.category_brands FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Optional: Initial seed for existing brands to categories
-- This is just an example. We can let the user manually configure this in the admin panel.
