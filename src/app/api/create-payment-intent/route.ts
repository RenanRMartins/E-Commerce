import { auth } from "@clerk/nextjs/server";
import { stripe } from "@/app/lib/stripe";
import { ProductType } from "@/app/types/ProductType";
import { connect } from "http2";

const calculateOrderAmount = (items: ProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        return acc + item.price! * item.quantity!;
    }, 0);
    return totalPrice
}

export async function POST(req: Request) {
    const { userId } = await auth();
    const { items, payment_intent_id } = await req.json();

    
    if (!userId) {
        return new Response('Unauthorized', { status: 401 })
      }

    const costumerIdTemp = 'cus_R9u9znbUH9sQPg'; 
    const total = calculateOrderAmount(items);
    
    const order = {
        user: { connect: { id: userId } },
        amount: total,
        currency: 'brl',
        paymentIntentID: payment_intent_id,
        products: {
            create: items.map( (item: ProductType) => ({
                name: item.name,
                description: item.description,
                quantity: item.quantity,
                price: item.price,
                image: item.image,
            }))
        }
    }

    if (payment_intent_id) {
        
    } else {
        const paymentIntent = await stripe.paymentIntents.create 
    }

    console.log('items', items);
    console.log('payment_intent_id', payment_intent_id);
}