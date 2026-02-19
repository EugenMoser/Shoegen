import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  name?: string;
}

export default function ProductImageGallery({
  images,
  name,
}: ProductImageGalleryProps): React.JSX.Element {
  return (
    <>
      <h1>Product Image Gallery</h1>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Bild von ${name || "Produkt"}`}
          width={300}
          height={300}
        />
      ))}
    </>
  );
}
