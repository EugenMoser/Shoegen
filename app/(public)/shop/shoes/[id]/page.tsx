import { log } from "console";

import { getShoeById } from "@/modules/shoes/actions/getShoe";
import ProductDetail from "@/modules/shoes/components/product-details/ProductDetail";
import { Shoe } from "@/modules/shoes/types";

interface ShoeDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ShoeDetailsPage({
  params,
}: ShoeDetailsPageProps): Promise<React.JSX.Element> {
  const { id } = await params;
  const shoeResult = await getShoeById(id);

  if (!shoeResult.success) {
    return <div>Error: {shoeResult.error}</div>;
  }

  const shoe: Shoe = shoeResult.data!;
  return (
    <>
      <h1>{shoe.name}</h1>
      <ProductDetail shoe={shoe} />
    </>
  );
}
