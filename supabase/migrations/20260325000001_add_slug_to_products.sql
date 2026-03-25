-- Add slug column to products
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Function to generate slug from text
CREATE OR REPLACE FUNCTION public.slugify(text TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(regexp_replace(text, '[^a-zA-Z0-9]+', '-', 'g'), '^-+|-+$', '', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Update existing products with slugs
UPDATE public.products 
SET slug = public.slugify(name || '-' || engine_code || '-' || id::text)
WHERE slug IS NULL;

-- Trigger to automatically generate slug on insert/update if not provided
CREATE OR REPLACE FUNCTION public.handle_product_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := public.slugify(NEW.name || '-' || NEW.engine_code || '-' || NEW.id::text);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_product_upsert_slug
  BEFORE INSERT OR UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.handle_product_slug();
