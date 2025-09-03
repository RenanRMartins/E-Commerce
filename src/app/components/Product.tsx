import { ProductType } from "../types/ProductType";
import ProductImage from "./ProductImage";
import Link from "next/link";
import { BaseProductCard } from "../core/components/BaseProductCard";

type ProductProps = {
    product: ProductType
}

export default function Product({ product }: ProductProps) {
    return (
        <Link href={`/product/${product.id}`}>
            <BaseProductCard product={product}>
                <ProductImage product={product} />
            </BaseProductCard>
        </Link>
    );
}