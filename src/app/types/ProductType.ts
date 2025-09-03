export type ProductType = {
    unit_amount: number | null;
    id: string;
    price: number | null;
    name: string;
    quantity?: number;
    image: string;
    description: string | null;
    currency?: string;
}