import { log } from 'console';

import {
  Shoe,
  ShoeSize,
} from '../../types';
import { mapSizeRecord } from '../../utils/mapShoeSize';
import ProductAttributes from './ProductAttributes';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import SizeSelector from './SizeSelector';

interface ProductDetailProps {
  shoe: Shoe;
}

export default function ProductDetail({
  shoe,
}: ProductDetailProps): React.JSX.Element {
  const images: string[] = shoe.images.map((image: string) => image) || [];
  const sizeOptions =
    shoe.sizes.map((size) => ({ size: size.size, stock: size.stock })) ||
    [];

  return (
    <>
      <ProductImageGallery
        images={images}
        name={shoe.name}
      />
      <ProductInfo shoe={shoe} />
      <ProductAttributes shoe={shoe} />
      <SizeSelector sizeOptions={sizeOptions} />
    </>
  );
}
