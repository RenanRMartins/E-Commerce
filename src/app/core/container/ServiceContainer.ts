// Import types for type checking only

export type ServiceIdentifier = 
  | 'IProductService'
  | 'IProductRepository'
  | 'IPaymentService'
  | 'IOrderService'
  | 'ICartService'
  | 'IDatabaseService';

export class ServiceContainer {
  private static instance: ServiceContainer;
  private services = new Map<ServiceIdentifier, unknown>();

  private constructor() {}

  public static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  public register<T>(identifier: ServiceIdentifier, implementation: T): void {
    this.services.set(identifier, implementation);
  }

  public get<T>(identifier: ServiceIdentifier): T {
    const service = this.services.get(identifier);
    if (!service) {
      throw new Error(`Service ${identifier} not found. Make sure it's registered.`);
    }
    return service as T;
  }

  public isRegistered(identifier: ServiceIdentifier): boolean {
    return this.services.has(identifier);
  }

  public clear(): void {
    this.services.clear();
  }
}

// Singleton instance
export const container = ServiceContainer.getInstance();
