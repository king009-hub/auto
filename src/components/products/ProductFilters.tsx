import { useState, useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FUEL_TYPES } from '@/lib/constants';
import { useCategories, useBrands } from '@/hooks/useProducts';
import type { ProductFilters as FiltersType } from '@/lib/types';
import { Filter, X, Loader2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { useTranslation } from 'react-i18next';
import { translateDynamic } from '@/lib/translate';

interface ProductFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  isMobile?: boolean;
}

const ProductFilters = ({ filters, onFiltersChange, isMobile }: ProductFiltersProps) => {
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

  const filterContent = (
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
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
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

  if (isMobile) {
    return (
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="lg:hidden flex items-center gap-2 font-bold uppercase text-xs tracking-widest border-[#cccccc] bg-[#f2f2f2]">
            <Filter className="h-3.5 w-3.5" />
            {t('products.characteristics')}
            {hasFilters && <span className="ml-1 w-2 h-2 rounded-full bg-primary" />}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto bg-card">
          <SheetHeader className="pb-4 border-b border-border mb-6">
            <SheetTitle className="text-left font-black uppercase tracking-tighter text-xl">
              {t('products.characteristics')}
            </SheetTitle>
          </SheetHeader>
          {filterContent}
          <div className="mt-8">
            <Button onClick={() => setMobileOpen(false)} className="w-full font-bold uppercase tracking-widest bg-primary">
              {t('products.view_all', { name: '' })}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      {filterContent}
    </div>
  );
};

export default ProductFilters;
