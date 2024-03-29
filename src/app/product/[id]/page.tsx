import Image from "next/image";
import Price from "@/app/_components/price";
import { api } from "@/trpc/server";

import type { Product } from "@prisma/client";

type request = {
  params: { id: string };
  searchParams: object;
};

const SingleProductPage = async (req: request) => {
  const product: Product | null = await api.product.getById.query(
    req.params.id,
  );
  const serialProduct = {
    ...product,
    price: product!.price.toNumber(),
  };

  return (
    <div className="flex h-screen flex-col justify-around p-4 text-red-500 md:flex-row md:items-center md:gap-8 lg:px-20 xl:px-40">
      {/* IMAGE CONTAINER */}
      {product!.img && (
        <div className="relative h-1/2 w-full md:h-[70%]">
          <Image src={product!.img} alt="" className="object-contain" fill />
        </div>
      )}
      {/* TEXT CONTAINER  */}
      <div className="flex h-1/2 flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">
          {product!.title}
        </h1>
        <p>{product!.desc}</p>
        <Price product={serialProduct} />
      </div>
    </div>
  );
};

export default SingleProductPage;
