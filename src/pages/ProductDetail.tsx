import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ImageGallery from '@/components/products/ImageGallery';
import SpecsTable from '@/components/products/SpecsTable';
import RelatedEngines from '@/components/products/RelatedEngines';
import { useProduct, useRelatedProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Home, FileText, Youtube } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';
import { translateDynamic } from '@/lib/translate';

const ProductDetail = () => {
  const { t } = useTranslation();
  const { id: idOrSlug } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(idOrSlug || '');
  const { data: related } = useRelatedProducts(product);
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const getYouTubeEmbedUrl = (url: string | null) => {
    if (!url) return null;
    let videoId = '';
    try {
      if (url.includes('v=')) {
        videoId = url.split('v=')[1].split('&')[0];
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      } else if (url.includes('embed/')) {
        videoId = url.split('embed/')[1].split('?')[0];
      } else if (url.includes('shorts/')) {
        videoId = url.split('shorts/')[1].split('?')[0];
      }
    } catch (e) {
      return null;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : null;
  };

  if (isLoading) {
    return (
      <Layout title={t('products.loading')}>
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-10 w-1/3" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout title={t('products.no_products')}>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-foreground">{t('products.no_products')}</h2>
          <Button asChild className="mt-4"><Link to="/products">{t('products.view_all', { name: '' })}</Link></Button>
        </div>
      </Layout>
    );
  }

  const translatedName = translateDynamic(product.name);
  const metaDescription = `Buy ${translatedName} - ${product.engine_code ? `Engine Code: ${product.engine_code} - ` : ''}High quality auto parts at Engine Markets. Fast delivery.`;

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": translatedName,
    "image": product.images || [],
    "description": translateDynamic(product.description) || metaDescription,
    "sku": product.engine_code,
    "brand": {
      "@type": "Brand",
      "name": translateDynamic(product.brand)
    },
    "offers": {
      "@type": "Offer",
      "url": `https://enginemarkets.com/products/${product.slug || product.id}`,
      "priceCurrency": "USD",
      "price": product.price,
      "itemCondition": "https://schema.org/UsedCondition",
      "availability": product.availability ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <Layout title={translatedName} description={metaDescription} structuredData={structuredData}>
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary flex items-center gap-1"><Home className="h-3 w-3" /> {t('products.home')}</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary">{t('products.all_products')}</Link>
            <span>/</span>
            <span className="text-foreground font-semibold truncate">{translatedName}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <ImageGallery images={product.images || []} name={translatedName} />

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold uppercase text-primary tracking-wider">{translateDynamic(product.brand)} • {translateDynamic(product.fuel_type)}</p>
              <h1 className="text-2xl md:text-3xl font-black uppercase text-foreground mt-1">{translatedName}</h1>
              <p className="text-muted-foreground mt-2">{translateDynamic(product.description)}</p>
            </div>

            <div className="text-3xl font-black text-primary">
              ${Math.round(Number(product.price))}
            </div>

            {/* Compatibility */}
            {product.compatibility?.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">{t('products.compatibility')}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.compatibility.map(v => (
                    <span key={v} className="bg-muted text-foreground text-xs px-3 py-1 rounded-full font-medium">{translateDynamic(v)}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => addItem(product.id)}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase flex-1"
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> {t('products.add_to_basket')}
              </Button>
              <Button
                onClick={() => toggle(product.id)}
                variant="outline"
                size="lg"
                className={`flex-none ${isWishlisted(product.id) ? 'text-red-500 hover:text-red-600 border-red-200 bg-red-50' : ''}`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted(product.id) ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Specs Table */}
            <SpecsTable product={product} />

            <div className="pt-4 border-t border-border">
              <Button variant="link" className="text-primary font-bold p-0 uppercase text-xs tracking-widest gap-2">
                <FileText className="h-4 w-4" /> {t('products.request_quote')}
              </Button>
            </div>
          </div>
        </div>

        {/* Video Test Section */}
        {getYouTubeEmbedUrl(product.youtube_url) && (
          <div className="mt-12 pt-12 border-t border-border">
            <h2 className="text-xl font-black uppercase text-foreground mb-6 flex items-center gap-2">
              <Youtube className="h-6 w-6 text-red-600" />
              Video Test
            </h2>
            <div className="max-w-3xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg border border-border bg-black">
              <iframe
                width="100%"
                height="100%"
                src={getYouTubeEmbedUrl(product.youtube_url)!}
                title={`${translatedName} Video Test`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Related */}
        {related && related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-black uppercase text-foreground mb-6">{t('products.related_products')}</h2>
            <RelatedEngines engines={related} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
