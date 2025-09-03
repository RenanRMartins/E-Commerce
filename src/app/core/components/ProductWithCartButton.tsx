import { ProductType } from "../../types/ProductType";
import ProductImage from "../../components/ProductImage";
import AddCart from "../../components/AddCart";
import { BaseProductCard } from "./BaseProductCard";

interface ProductWithCartButtonProps {
  product: ProductType;
  className?: string;
}

export function ProductWithCartButton({ product, className }: ProductWithCartButtonProps) {
  return (
    <BaseProductCard product={product} className={className}>
      <ProductImage product={product} fill />
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <AddCart product={product} />
      </div>
    </BaseProductCard>
  );
}
