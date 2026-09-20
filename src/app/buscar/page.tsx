import { Layout } from '@/components/layout';
import { ShopCatalog } from '@/components/shop/ShopCatalog';
import { getCatalogProducts } from '@/lib/catalog';

export const dynamic = 'force-dynamic';
export default async function SearchPage() {
  const products = await getCatalogProducts();
  return (
    <Layout>
      <section className="container px-4 py-16">
        <h1 className="mb-10 text-4xl font-bold">Buscar en Irons</h1>
        <ShopCatalog products={products} />
      </section>
    </Layout>
  );
}
