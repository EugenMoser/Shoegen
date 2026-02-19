interface ProductInfoProps {
  shoe: {
    brand: string;
    description: string;
    price: number;
    currency: string;
  };
}

export default function ProductInfo({
  shoe,
}: ProductInfoProps): React.JSX.Element {
  return (
    <>
      <p>Brand: {shoe.brand}</p>
      <p>Description: {shoe.description}</p>
      <p>
        {shoe.currency} {shoe.price.toFixed(2)}
      </p>
    </>
  );
}
