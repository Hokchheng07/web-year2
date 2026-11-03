"use client";
// TODO(use) step 1: add `import { use } from "react";`
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, Star, StarHalf } from "lucide-react";
import type { ControllerRenderProps } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { use } from "react";

type StockStatusCode = "IN_STOCK" | "OUT_OF_STOCK";

interface StockInfo {
  stockStatusCode?: StockStatusCode;
  stockQuantity?: number;
}

type option = {
  id: string;
  label: string;
  stockInfo: StockInfo;
  color?: string;
  value: string;
};

interface Hinges {
  label: string;
  id: string;
  name: FieldName;
  options?: option[];
  min?: number;
  max?: number;
}

interface ReviewsProps {
  rate: number;
}

interface PriceProps {
  regular: number;
  sale?: number;
  currency: string;
}

interface ProductInfoProps {
  info?: Array<{
    label: string;
    value: string;
  }>;
}

const formSchema = z.object({
  color: z.string(),
  quantity: z.number().min(1),
  size: z.string(),
});

type FormType = z.infer<typeof formSchema>;
type FieldName = keyof FormType;

type SizeOptionProps = option;

interface RadioGroupProps {
  options?: Array<option>;
  field: ControllerRenderProps<FormType>;
}

interface ProductFormProps {
  hinges?: Partial<Record<FieldName, Hinges>>;
  selected: FormType;
}

const MAX_STARS = 5;

// static data: dummyjson has no sizes or detail table, so these stay fixed
const PRODUCT_DETAILS: {
  size: string;
  color: string;
  hinges: Partial<Record<FieldName, Hinges>>;
} = {
  size: "m",
  color: "default",
  hinges: {
    size: {
      label: "Size",
      id: "size",
      name: "size",
      options: [
        { id: "size-s", label: "S", value: "s", stockInfo: { stockStatusCode: "IN_STOCK" } },
        { id: "size-m", label: "M", value: "m", stockInfo: { stockStatusCode: "IN_STOCK" } },
        { id: "size-l", label: "L", value: "l", stockInfo: { stockStatusCode: "IN_STOCK" } },
        { id: "size-xl", label: "XL", value: "xl", stockInfo: { stockStatusCode: "OUT_OF_STOCK" } },
      ],
    },
  },
};

const PRODUCT_INFO = [
  { label: "Material", value: "100% Premium Denim" },
  { label: "Style", value: "Puffer Jacket" },
  { label: "Season", value: "All Season" },
  { label: "Care", value: "Machine Washable" },
  { label: "Origin", value: "Made in Italy" },
  { label: "Fit", value: "Regular Fit" },
];

export interface ProductDetailResponse {
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  rating: number;
}

const ProductDetail = ({ product }: { product : Promise<ProductDetailResponse>}) => {
  
  const {title,description,thumbnail,price,rating } = use(product);
  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
            <Image
              src={thumbnail}
              alt={title}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-8"
            />
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                    {title}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <Reviews rate={rating} />
                    <Badge variant="secondary">
                      <CircleCheck />
                      In Stock
                    </Badge>
                  </div>
                </div>
                <Price regular={price} currency="USD" />
              </div>

              <p className="text-muted-foreground">
                {description}
              </p>
            </div>

            <ProductForm
              hinges={PRODUCT_DETAILS.hinges}
              selected={{
                size: PRODUCT_DETAILS.size,
                color: PRODUCT_DETAILS.color,
                quantity: 1,
              }}
            />

            <Button size="lg" className="w-full">
              Buy Now
            </Button>

            <ProductInfo info={PRODUCT_INFO} />
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductInfo = ({ info }: ProductInfoProps) => {
  if (!info) return;

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Product Details</h2>
      <dl>
        {info.map((item, index) => (
          <div
            key={`product-detail-1-info-${index}`}
            className="flex items-center justify-between border-b py-3 last:border-b-0"
          >
            <dt className="text-sm font-medium text-muted-foreground">
              {item.label}
            </dt>
            <dd className="text-sm font-medium">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

const Reviews = ({ rate }: ReviewsProps) => {
  const renderStars = () => {
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.5;
    const emptyStars = MAX_STARS - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`product-detail-1-star-full-${i}`}
          className="size-4 fill-yellow-500 stroke-yellow-500"
        />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="product-detail-1-half-star" className="relative size-4">
          <StarHalf className="absolute top-0 right-0 size-full fill-yellow-500 stroke-yellow-500" />
          <StarHalf className="absolute top-0 left-0 size-full -scale-x-100 fill-black/15 stroke-black/15 dark:invert" />
        </div>,
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`product-detail-1-star-empty-${i}`}
          className="size-4 fill-black/15 stroke-black/15 dark:invert"
        />,
      );
    }

    return stars;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">{renderStars()}</div>
      <p className="text-base leading-none font-medium whitespace-nowrap text-muted-foreground">
        {rate.toFixed(1)}
      </p>
    </div>
  );
};

const ProductForm = ({ hinges, selected }: ProductFormProps) => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: selected?.color,
      size: selected?.size,
      quantity: selected?.quantity,
    },
  });

  function onSubmit(values: FormType) {
    console.log(values);
  }

  const sizeHinges = hinges?.size;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {sizeHinges && (
        <Controller
          control={form.control}
          name={sizeHinges.name}
          render={({ field }) => (
            <fieldset className="space-y-3">
              <legend className="text-base font-semibold">
                {sizeHinges.label}
              </legend>
              <SizeRadioGroup field={field} options={sizeHinges.options} />
            </fieldset>
          )}
        />
      )}
    </form>
  );
};

const Price = ({ regular, sale, currency }: PriceProps) => {
  if (!regular || !currency) return;

  const formatCurrency = (
    value: number,
    currency: string = "USD",
    locale: string = "en-US",
  ) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(value);
  };

  return (
    <div className="flex items-center gap-2">
      {sale && (
        <span className="text-right text-2xl font-bold text-primary">
          {formatCurrency(sale, currency)}
        </span>
      )}
      <span
        className={`text-right text-2xl font-bold ${
          sale ? "text-muted-foreground line-through" : "text-foreground"
        }`}
      >
        {formatCurrency(regular, currency)}
      </span>
    </div>
  );
};

const SizeRadioGroup = ({ options, field }: RadioGroupProps) => {
  if (!options) return;

  return (
    <RadioGroup
      name={field.name}
      value={`${field.value}`}
      onValueChange={(value) => {
        if (value != field.value && value) {
          field.onChange(value);
        }
      }}
      className="flex flex-wrap gap-3"
    >
      {options.map((item) => (
        <SizeOption
          key={item.id}
          stockInfo={item.stockInfo}
          id={item.id}
          label={item.label}
          value={item.value}
        />
      ))}
    </RadioGroup>
  );
};

const SizeOption = ({ id, label, stockInfo, value }: SizeOptionProps) => {
  const isOutOfStock = stockInfo.stockStatusCode === "OUT_OF_STOCK";

  return (
    <label
      htmlFor={id}
      className="relative flex h-10 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-md border text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground has-data-checked:bg-primary has-data-checked:text-primary-foreground has-data-disabled:pointer-events-none has-data-disabled:opacity-50"
    >
      <RadioGroupItem
        id={id}
        className="absolute size-px overflow-hidden opacity-0"
        value={value}
        disabled={isOutOfStock}
      />
      <span className="uppercase">{label}</span>
      {isOutOfStock && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-px w-full rotate-45 bg-border"></div>
        </div>
      )}
    </label>
  );
};

export { ProductDetail };
