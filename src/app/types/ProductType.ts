export type ProductType = {
    unit_amount: any;
    id: string;
    price: number | null;
    name: string;
    quantity?: number | 1;
    image: string;
    description: string | null;
    currency?: string;
}