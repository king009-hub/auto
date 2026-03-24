import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useCategories, useBrands } from '@/hooks/useProducts';
import { useTranslation } from 'react-i18next';
import { translateDynamic } from '@/lib/translate';

const NavBar = () => {
  const { t } = useTranslation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: brands, isLoading: brandsLoading } = useBrands();

  return (
    <nav className="bg-[#f2f2f2] sticky top-0 z-50 hidden md:block border-b border-[#dddddd]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-start gap-0">
          {categoriesLoading ? (
            <div className="flex items-center px-3 py-3 text-[11px] font-bold tracking-wider text-gray-500 uppercase">
              <Loader2 className="h-3 w-3 animate-spin mr-2" />
              {t('products.loading')}
            </div>
          ) : (
            categories?.map(cat => (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => setHoveredItem(cat.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  to={`/products?category=${cat.slug}`}
                  className="flex items-center gap-1 px-5 py-3 text-[12px] font-black tracking-tighter text-[#1a1a1a] hover:bg-gray-200 transition-colors uppercase whitespace-nowrap border-r border-[#cccccc] last:border-r-0"
                >
                  {translateDynamic(cat.name)}
                  <ChevronDown className="h-3 w-3 opacity-60 ml-1" />
                </Link>
                {hoveredItem === cat.id && (
                  (() => {
                    const catBrands = brands?.filter(brand => cat.brand_ids?.includes(brand.id)) || [];
                    const colCount = Math.max(1, Math.ceil(catBrands.length / 8));
                    const widthClass = colCount === 1 ? 'min-w-[200px]' : 
                                     colCount === 2 ? 'min-w-[400px]' : 
                                     colCount === 3 ? 'min-w-[600px]' : 'min-w-[800px]';
                    const gridClass = colCount === 1 ? 'grid-cols-1' : 
                                    colCount === 2 ? 'grid-cols-2' : 
                                    colCount === 3 ? 'grid-cols-3' : 'grid-cols-4';

                    return (
                      <div className={`absolute top-full left-0 bg-card border border-border shadow-xl z-50 ${widthClass}`}>
                        <div className="py-1">
                          {brandsLoading ? (
                            <div className="px-4 py-2 text-sm text-muted-foreground italic flex items-center">
                              <Loader2 className="h-3 w-3 animate-spin mr-2" />
                              {t('products.loading')}
                            </div>
                          ) : (
                            <>
                              {catBrands.length === 0 ? (
                                <div className="px-4 py-2 text-xs text-muted-foreground italic">{t('products.no_products')}</div>
                              ) : (
                                <div className={`grid ${gridClass} gap-x-2`}>
                                  {catBrands.map(brand => (
                                    <Link
                                      key={brand.id}
                                      to={`/products?category=${cat.slug}&brand=${brand.name}`}
                                      className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
                                    >
                                      {translateDynamic(brand.name)}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                          <div className="border-t border-border mt-1 pt-1">
                            <Link
                              to={`/products?category=${cat.slug}`}
                              className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              {t('header.view_all', { name: '' })} →
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })()
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
