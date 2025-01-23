import { Metadata } from 'next';

interface ProductPageProps {
  params: { id: string };
}

// `generateMetadata` must await `params`
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return {
    title: `Product ${id}`,
    description: `Details for product ${id}.`,
  };
}

// Dynamic page component
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <div>
      <h1>Product ID: {id}</h1>
      <p>This is a dynamic product page for product {id}.</p>
    </div>
  );
}
