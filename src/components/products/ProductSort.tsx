import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

interface ProductSortProps {
  value: string;
  onChange: (value: string) => void;
  total: number;
  page: number;
  perPage: number;
}

const ProductSort = ({ value, onChange, total, page, perPage }: ProductSortProps) => {
  const { t } = useTranslation();
  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-card border border-border p-3 rounded-lg">
      <p className="text-sm text-muted-foreground order-2 sm:order-1">
        {t('products.showing')} <span className="font-semibold text-foreground">{from}–{to}</span> {t('products.of')}{' '}
        <span className="font-semibold text-foreground">{total}</span> {t('products.results')}
      </p>
      <div className="w-full sm:w-auto order-1 sm:order-2">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full sm:w-[280px] bg-background border-border h-10">
            <SelectValue placeholder={t('products.sort_by')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{t('products.sort_newest')}</SelectItem>
            <SelectItem value="oldest">{t('products.sort_oldest')}</SelectItem>
            <SelectItem value="price_asc">{t('products.sort_price_asc')}</SelectItem>
            <SelectItem value="price_desc">{t('products.sort_price_desc')}</SelectItem>
            <SelectItem value="popularity">{t('products.sort_popularity')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductSort;
