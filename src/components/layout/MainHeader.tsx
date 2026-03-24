import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, ChevronRight, Loader2, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCategories, useBrands } from '@/hooks/useProducts';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslation } from 'react-i18next';
import { translateDynamic } from '@/lib/translate';

const MainHeader = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: brands, isLoading: brandsLoading } = useBrands();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-[#f2f2f2] border-b border-[#dddddd]">
      <div className="container mx-auto px-4">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between gap-8 h-[110px]">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center shrink-0 w-[240px]">
            <div className="relative w-full flex">
              <input
                type="text"
                placeholder={t('header.search_placeholder')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full border border-[#cccccc] bg-transparent h-[32px] px-3 text-[12px] italic focus:outline-none"
              />
              <button
                type="submit"
                className="h-[32px] w-[32px] flex items-center justify-center bg-[#2d5a00] hover:bg-[#244800] text-white shrink-0"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>

          {/* Logo - Flex centered */}
          <div className="flex-1 flex items-center justify-center min-w-0">
            <Link to="/" className="flex items-center justify-center h-full w-full">
              <img 
                src="/header.jpg" 
                alt="ENGINE MARKETS" 
                className="h-full w-[300px] object-contain"
              />
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Logo Badge Image */}
            <div className="flex items-center justify-center shrink-0">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="h-[85px] w-auto object-contain"
              />
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center px-7 py-2.5 bg-[#b38a2e] hover:bg-[#a07a29] text-white font-bold uppercase text-[14px] tracking-wide rounded-full shadow-sm"
            >
              {t('header.estimate')}
            </Link>

            <div className="flex flex-col items-end justify-center gap-1 text-[#333333] relative shrink-0 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-tight">{t('header.basket')}</span>
                <Link to="/cart" className="relative">
                  <div className="border-2 border-[#b38a2e] rounded-sm w-[36px] h-[36px] flex items-center justify-center bg-transparent">
                    <span className="text-[#b38a2e] text-[18px] font-bold">
                      {totalItems}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center justify-between">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="p-2 text-foreground">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 flex flex-col bg-[#f2f2f2]">
              <SheetHeader className="sr-only">
                <SheetTitle>Mobile Menu</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 border-b border-gray-300 bg-white flex items-center justify-between">
                  <form onSubmit={handleSearch} className="flex-1 flex items-center">
                    <div className="relative w-full flex">
                      <input
                        type="text"
                        placeholder={t('header.search_placeholder')}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full border border-[#cccccc] bg-white h-[34px] px-3 text-[13px] italic focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="h-[34px] w-[34px] flex items-center justify-center bg-[#2d5a00] text-white shrink-0"
                      >
                        <Search className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </div>

                <div className="p-0">
                  {categoriesLoading ? (
                    <div className="p-8 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-[#b38a2e]" /></div>
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {categories?.map((cat) => (
                        <AccordionItem key={cat.id} value={cat.id} className="border-b border-gray-300 bg-white">
                          <div className="flex items-center justify-between">
                            <Link
                              to={`/products?category=${cat.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex-1 px-4 py-4 text-[13px] font-black uppercase tracking-tight text-[#1a1a1a]"
                            >
                              {translateDynamic(cat.name)}
                            </Link>
                            <AccordionTrigger className="w-14 h-[52px] p-0 flex items-center justify-center hover:no-underline border-l border-gray-100 [&[data-state=open]>svg]:rotate-180">
                              {/* Chevron is handled by the component, but we can style it */}
                            </AccordionTrigger>
                          </div>
                          <AccordionContent className="p-0 bg-[#f9f9f9]">
                            <div className="flex flex-col">
                              {brands?.filter(brand => cat.brand_ids?.includes(brand.id)).map(brand => (
                                <Link
                                  key={brand.id}
                                  to={`/products?category=${cat.slug}&brand=${brand.name}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="px-8 py-3 text-[13px] text-[#333] border-b border-gray-200 hover:bg-white transition-colors flex items-center justify-between"
                                >
                                  {translateDynamic(brand.name)}
                                  <ChevronRight className="h-3 w-3 opacity-30" />
                                </Link>
                              ))}
                              <Link
                                to={`/products?category=${cat.slug}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-8 py-3 text-[13px] font-bold text-[#b38a2e] hover:bg-white transition-colors flex items-center justify-between"
                              >
                                {t('header.view_all', { name: translateDynamic(cat.name) })}
                                <ChevronRight className="h-4 w-4" />
                              </Link>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </div>

                <div className="p-4 space-y-6 mt-4">
                  <div className="flex items-center justify-center">
                    <img 
                      src="/logo.png" 
                      alt="Logo" 
                      className="h-[60px] w-auto object-contain"
                    />
                  </div>
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full py-3 bg-[#b38a2e] text-white font-black uppercase text-xs tracking-widest rounded-full"
                  >
                    {t('header.my_account')}
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center shrink-0">
            <img 
              src="/header.jpg" 
              alt="ENGINE MARKETS" 
              className="h-[60px] sm:h-[80px] w-[250px] sm:w-[300px] object-contain"
            />
          </Link>
          <Link to="/cart" className="relative p-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <span className="absolute top-0 right-0 border border-primary text-primary text-[10px] font-bold w-4 h-4 flex items-center justify-center bg-card">
              {totalItems}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
