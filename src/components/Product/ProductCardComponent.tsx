import { cn } from "cn";

import { Price, PriceValue } from "@/components/Product/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export interface Product {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  price: number;
}


const ProductCardComponent = ({id, thumbnail, title, description, price }: Product) => {
  return (
    <Link href={`/products/${id}`} className="block h-full">
      <Card className="h-full overflow-hidden p-0 transition-shadow hover:shadow-lg">
        <CardHeader className="relative block p-0">
          <AspectRatio ratio={1.268115942} className="overflow-hidden">
            <Image
              src={thumbnail}
              alt={title}
              width={200}
              height={200}
              className="block size-full object-cover object-center"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="flex h-full flex-col gap-4 pb-6">
          <CardTitle className="text-xl font-semibold">
            {title}
          </CardTitle>
          <CardDescription className="font-medium text-muted-foreground">
            {description}
          </CardDescription>
          <div className="mt-auto">
            <Price onSale={false} className="text-lg font-semibold">
              <PriceValue
                price={price}
                currency="USD"
                variant="regular"
              />
            </Price>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export { ProductCardComponent };
