import { container } from './ServiceContainer';
import { StripeProductRepository } from '../services/StripeProductRepository';
import { ProductService } from '../services/ProductService';
import { StripePaymentService } from '../services/StripePaymentService';
import { PrismaDatabaseService } from '../services/PrismaDatabaseService';
import { OrderService } from '../services/OrderService';
import { CartService } from '../services/CartService';
import { PaymentService } from '../services/PaymentService';
import { configService } from '../config/AppConfig';
import { logger } from '../logging/Logger';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

// Initialize external dependencies
const config = configService.getConfig();
const stripe = config.stripe.secretKey && config.stripe.secretKey !== 'sk_test_placeholder' ? new Stripe(config.stripe.secretKey, {}) : null;
const prisma = new PrismaClient();

// Configure container with all services
export function configureContainer(): void {
  logger.info('Configuring service container');
  
  try {
            if (stripe) {
          // Register repositories
          container.register('IProductRepository', new StripeProductRepository(stripe));

          // Register services
          container.register('IProductService', new ProductService(
            container.get('IProductRepository')
          ));

          container.register('IPaymentService', new StripePaymentService(stripe));

          container.register('IDatabaseService', new PrismaDatabaseService(prisma));

          container.register('IOrderService', new OrderService(
            container.get('IDatabaseService'),
            container.get('IPaymentService')
          ));

                        container.register('ICartService', new CartService());

              container.register('PaymentService', new PaymentService());

              logger.info('Service container configured successfully');
        } else {
          // Register mock services for development
          const { MockProductRepository } = require('../services/MockProductRepository');
          const { MockPaymentService } = require('../services/MockPaymentService');
          
          container.register('IProductRepository', new MockProductRepository());
          container.register('IProductService', new ProductService(
            container.get('IProductRepository')
          ));
          container.register('IPaymentService', new MockPaymentService());
          container.register('IDatabaseService', new PrismaDatabaseService(prisma));
          container.register('IOrderService', new OrderService(
            container.get('IDatabaseService'),
            container.get('IPaymentService')
          ));
                        container.register('ICartService', new CartService());

              container.register('PaymentService', new PaymentService());

              logger.info('Service container configured with mock services');
        }
  } catch (error) {
    logger.error('Error configuring service container', error);
    throw error;
  }
}

// Initialize container on module load
configureContainer();
