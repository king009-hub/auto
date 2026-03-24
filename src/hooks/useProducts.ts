import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product, ProductFilters, Category, Brand } from '@/lib/types';
import { withTimeout } from '@/lib/supabase-utils';

const ITEMS_PER_PAGE = 12;

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      console.log('[useProducts] Fetching with filters:', JSON.stringify(filters));
      try {
        let query = supabase.from('products').select('*', { count: 'exact' });

        if (filters.brand?.length) {
          query = query.in('brand', filters.brand);
        }
        if (filters.fuel_type?.length) {
          query = query.in('fuel_type', filters.fuel_type);
        }
        if (filters.engine_code) {
          query = query.ilike('engine_code', `%${filters.engine_code}%`);
        }
        if (filters.price_min !== undefined) {
          query = query.gte('price', filters.price_min);
        }
        if (filters.price_max !== undefined) {
          query = query.lte('price', filters.price_max);
        }
        if (filters.availability !== undefined) {
          query = query.eq('availability', filters.availability);
        }
        if (filters.category_id) {
          query = query.eq('category_id', filters.category_id);
        }
        if (filters.search) {
          query = query.or(`name.ilike.%${filters.search}%,engine_code.ilike.%${filters.search}%,brand.ilike.%${filters.search}%`);
        }

        switch (filters.sort) {
          case 'price_asc': query = query.order('price', { ascending: true }); break;
          case 'price_desc': query = query.order('price', { ascending: false }); break;
          case 'name': query = query.order('name', { ascending: true }); break;
          default: query = query.order('created_at', { ascending: false });
        }

        const page = filters.page || 1;
        const perPage = filters.per_page || ITEMS_PER_PAGE;
        const from = (page - 1) * perPage;
        const to = from + perPage - 1;
        query = query.range(from, to);

        console.log(`[useProducts] Executing query range ${from}-${to}`);
        const startTime = Date.now();
        const { data, error, count } = await withTimeout(query, 10000);
        const duration = Date.now() - startTime;

        if (error) {
          console.error('[useProducts] Supabase error:', error.message, error.details);
          throw error;
        }
        
        console.log(`[useProducts] Success: ${data?.length} products found in ${duration}ms, total count ${count}`);
        if (data && data.length > 0) {
          console.log('[useProducts] Sample data first 2:', data.slice(0, 2).map(p => ({ id: p.id, name: p.name, brand: p.brand })));
        } else {
          console.log('[useProducts] No products returned for filters:', JSON.stringify(filters));
        }
        return { products: (data as Product[]) || [], total: count || 0 };
      } catch (err: any) {
        console.error('[useProducts] Unexpected error:', err.message || err);
        throw err;
      }
    },
    retry: 1,
    staleTime: 30000,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      console.log('[useProduct] Fetching product by id:', id);
      try {
        const { data, error } = await withTimeout(supabase.from('products').select('*').eq('id', id).maybeSingle(), 10000);
        if (error) {
          console.error('[useProduct] Supabase error:', error.message);
          throw error;
        }
        console.log('[useProduct] Success:', data?.id);
        return data as Product;
      } catch (err: any) {
        console.error('[useProduct] Unexpected error:', err.message || err);
        throw err;
      }
    },
    enabled: !!id,
    retry: 1,
    staleTime: 30000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('[useCategories] Fetching...');
      try {
        const startTime = Date.now();
        
        // Parallelize fetching categories and associations
        const [catResult, assocResult] = await Promise.all([
          withTimeout(supabase.from('categories').select('*').order('sort_order'), 10000),
          withTimeout(supabase.from('category_brands').select('category_id, brand_id'), 10000)
        ]);
        
        if (catResult.error) {
          console.error('[useCategories] Supabase error:', catResult.error.message);
          throw catResult.error;
        }

        if (assocResult.error) {
          console.error('[useCategories] Associations error:', assocResult.error.message);
          throw assocResult.error;
        }

        const categories = catResult.data;
        const associations = assocResult.data;

        const duration = Date.now() - startTime;
        console.log(`[useCategories] Success: ${categories?.length} items in ${duration}ms`);
        
        return categories.map(cat => ({
          ...cat,
          brand_ids: associations
            .filter(a => a.category_id === cat.id)
            .map(a => a.brand_id)
        })) as (Category & { brand_ids: string[] })[];
      } catch (err: any) {
        console.error('[useCategories] Unexpected error:', err.message || err);
        throw err;
      }
    },
    staleTime: 60000 * 60, // 1 hour (rarely changes)
  });
}

export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      console.log('[useBrands] Fetching...');
      try {
        const startTime = Date.now();
        const { data, error } = await withTimeout(
          supabase.from('brands').select('*').order('sort_order'),
          10000
        );
        if (error) {
          console.error('[useBrands] Supabase error:', error.message);
          throw error;
        }
        const duration = Date.now() - startTime;
        console.log(`[useBrands] Success: ${data?.length} items in ${duration}ms`);
        return data as Brand[];
      } catch (err: any) {
        console.error('[useBrands] Unexpected error:', err.message || err);
        throw err;
      }
    },
    staleTime: 60000 * 60, // 1 hour
  });
}

export function useCategoryBrands(categoryId?: string) {
  return useQuery({
    queryKey: ['category-brands', categoryId],
    queryFn: async () => {
      console.log('Fetching category brands for:', categoryId);
      if (!categoryId) return [];
      try {
        const { data, error } = await supabase
          .from('category_brands')
          .select('brand_id')
          .eq('category_id', categoryId);
        if (error) {
          console.error('Supabase error fetching category brands:', error);
          throw error;
        }
        console.log('Successfully fetched category brands:', data?.length);
        return data.map(item => item.brand_id);
      } catch (err) {
        console.error('Unexpected error in useCategoryBrands:', err);
        throw err;
      }
    },
    enabled: !!categoryId,
    staleTime: 60000,
  });
}

export function useRelatedProducts(product: Product | undefined) {
  return useQuery({
    queryKey: ['related-products', product?.id],
    queryFn: async () => {
      console.log('Fetching related products for:', product?.id);
      if (!product) return [];
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .neq('id', product.id)
          .eq('brand', product.brand)
          .limit(4);
        if (error) {
          console.error('Supabase error fetching related products:', error);
          throw error;
        }
        console.log('Successfully fetched related products:', data?.length);
        return data as Product[];
      } catch (err) {
        console.error('Unexpected error in useRelatedProducts:', err);
        throw err;
      }
    },
    enabled: !!product,
    staleTime: 60000,
  });
}
