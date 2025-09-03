import { auth } from "@clerk/nextjs/server";
import { container } from "@/app/core/container/ServiceContainer";
import "@/app/core/container/containerConfig";
import { IPaymentService } from "@/app/core/interfaces/IPaymentService";
import { IOrderService } from "@/app/core/interfaces/IPaymentService";
import { withErrorHandler } from "@/app/core/middleware/ErrorHandler";
import { AppError } from "@/app/core/errors/AppError";
import { ProductValidator } from "@/app/core/validators/ProductValidator";
import { ProductType } from "@/app/types/ProductType";
import { NextRequest, NextResponse } from "next/server";

async function createPaymentIntentHandler(req: NextRequest) {
    const { userId } = await auth();
    const { items, payment_intent_id }: { items: ProductType[]; payment_intent_id?: string } = await req.json();

    if (!userId) {
        throw AppError.unauthorized('Usuário não autenticado');
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
        throw AppError.validation('Itens do carrinho são obrigatórios');
    }

    // Validate cart items
    for (const item of items) {
        const validation = ProductValidator.validateCartItem(item);
        if (!validation.isValid) {
            throw AppError.validation(`Item inválido: ${validation.errors.join(', ')}`);
        }
    }

    const paymentService = container.get<IPaymentService>('IPaymentService');
    const orderService = container.get<IOrderService>('IOrderService');

    if (payment_intent_id) {
        // Update existing payment intent and order
        await orderService.updateOrder(payment_intent_id, items);
        const updatedPaymentIntent = await paymentService.retrievePaymentIntent(payment_intent_id);
        
        return NextResponse.json({ paymentIntent: updatedPaymentIntent }, { status: 200 });
    } else {
        // Create new payment intent and order
        const paymentIntent = await paymentService.createPaymentIntent(items);
        await orderService.createOrder(userId, items, paymentIntent.id);
        
        return NextResponse.json({ paymentIntent }, { status: 200 });
    }
}

export const POST = withErrorHandler(createPaymentIntentHandler);