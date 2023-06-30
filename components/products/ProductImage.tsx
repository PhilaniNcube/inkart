"use client"
 import Image from 'next/image'
import { useState } from 'react';

type ComponentProp = {
  images: {
    src: string;
    position: string;
    is_default: boolean;
    variant_id: number;
    variant_ids: number[];
    is_selected_for_publishing: boolean;
  }[];
  title: string;
};

const ProductImage = ({ images, title }: ComponentProp) => {

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="realtive isolate w-full aspect-square overflow-hidden flex"
    >
      <Image
        src={images[0].src}
        alt={title}
        width={500}
        height={500}
        className="object-cover w-full absolute inset-0"
      />
      <Image
        src={images[3].src}
        alt={title}
        width={500}
        height={500}
        className="object-cover w-full absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
};
export default ProductImage;
