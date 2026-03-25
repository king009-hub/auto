import { Link } from 'react-router-dom';
import type { Product } from '@/lib/types';
import { translateDynamic } from '@/lib/translate';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useTranslation();
  return (
    <Link to={`/products/${product.slug || product.id}`} className="group block">
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-muted mb-3">
        <img
          src={product.images?.[0] || '/placeholder.svg'}
          alt={translateDynamic(product.name)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Info - minimal like reference */}
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-foreground uppercase tracking-wide line-clamp-1">
          {product.compatibility?.map(c => translateDynamic(c)).join(' - ') || translateDynamic(product.brand)}
        </p>
        <p className="text-sm font-semibold text-primary line-clamp-1">
          {product.engine_code}
        </p>
        <p className="text-base font-bold text-foreground">
          ${Math.round(Number(product.price))}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
