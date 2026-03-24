import { useState, useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FUEL_TYPES } from '@/lib/constants';
import { useCategories, useBrands } from '@/hooks/useProducts';
import type { ProductFilters as FiltersType } from '@/lib/types';
import { Filter, X, Loader2 } from 'lucide-react';

import { useTranslation } from 'react-i18next';
import { translateDynamic } from '@/lib/translate';

interface ProductFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
}

const ProductFilters = ({ filters, onFiltersChange }: ProductFiltersProps) => {
  const { t } = useTranslation();
  const [priceRange, setPriceRange] = useState([filters.price_min || 0, filters.price_max || 5000]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: brands, isLoading: brandsLoading } = useBrands();

  const filteredBrands = useMemo(() => {
    if (!brands) return [];
    if (!filters.category_id || !categories) return brands;
    
    const selectedCategory = categories.find(c => c.id === filters.category_id);
    if (!selectedCategory || !(selectedCategory as any).brand_ids) return brands;
    
    return brands.filter(brand => (selectedCategory as any).brand_ids.includes(brand.id));
  }, [brands, filters.category_id, categories]);

  const toggleCategory = (categoryId: string) => {
    // Current filtering in Products.tsx uses category slug in URL, 
    // but the filter object uses category_id.
    onFiltersChange({ ...filters, category_id: filters.category_id === categoryId ? undefined : categoryId, page: 1 });
  };

  const toggleBrand = (brand: string) => {
    const current = filters.brand || [];
    const updated = current.includes(brand) ? current.filter(b => b !== brand) : [...current, brand];
    onFiltersChange({ ...filters, brand: updated.length ? updated : undefined, page: 1 });
  };

  const toggleFuelType = (fuel: string) => {
    const current = filters.fuel_type || [];
    const updated = current.includes(fuel) ? current.filter(f => f !== fuel) : [...current, fuel];
    onFiltersChange({ ...filters, fuel_type: updated.length ? updated : undefined, page: 1 });
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    onFiltersChange({ ...filters, price_min: values[0], price_max: values[1], page: 1 });
  };

  const handleEngineCode = (code: string) => {
    onFiltersChange({ ...filters, engine_code: code || undefined, page: 1 });
  };

  const clearAll = () => {
    setPriceRange([0, 5000]);
    onFiltersChange({ sort: filters.sort, page: 1 });
  };

  const hasFilters = filters.brand?.length || filters.fuel_type?.length || filters.engine_code || filters.price_min || filters.price_max || filters.category_id;

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm uppercase tracking-wider text-foreground">{t('products.characteristics')}</h3>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-primary hover:underline">{t('cart.remove')}</button>
        )}
      </div>

      {/* Fuel Type */}
      <div>
        <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">{t('products.fuel_type')}</h4>
        <div className="space-y-2">
          {FUEL_TYPES.map(fuel => (
            <label key={fuel} className="flex items-center gap-2 cursor-pointer text-sm">
              <Checkbox
                checked={filters.fuel_type?.includes(fuel) || false}
                onCheckedChange={() => toggleFuelType(fuel)}
              />
              {translateDynamic(fuel)}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">
          {t('products.price')}: ${priceRange[0]} - ${priceRange[1]}
        </h4>
        <Slider
          min={0}
          max={5000}
          step={50}
          value={priceRange}
          onValueChange={handlePriceChange}
          className="mt-2"
        />
      </div>

      {/* Brand */}
      <div>
        <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">{t('products.brand')}</h4>
        <div className="space-y-2">
          {brandsLoading ? (
            <div className="flex items-center text-xs text-muted-foreground italic">
              <Loader2 className="h-3 w-3 animate-spin mr-2" />
              {t('products.loading')}
            </div>
          ) : (
            filteredBrands?.map(brand => (
              <label key={brand.id} className="flex items-center gap-2 cursor-pointer text-sm">
                <Checkbox
                  checked={filters.brand?.includes(brand.name) || false}
                  onCheckedChange={() => toggleBrand(brand.name)}
                />
                {translateDynamic(brand.name)}
              </label>
            ))
          )}
        </div>
      </div>

      {/* Engine Code */}
      <div>
        <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">{t('products.engine_code')}</h4>
        <Input
          placeholder="e.g. K9K"
          value={filters.engine_code || ''}
          onChange={e => handleEngineCode(e.target.value)}
          className="bg-background"
        />
      </div>

      {/* Availability */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <Checkbox
            checked={filters.availability === true}
            onCheckedChange={(checked) => onFiltersChange({ ...filters, availability: checked ? true : undefined, page: 1 })}
          />
          {t('products.in_stock')}
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar - hidden on mobile/tablet */}
      <div className="hidden lg:block bg-card border border-border rounded-lg p-5">
        {content}
      </div>
    </>
  );
};

export default ProductFilters;
