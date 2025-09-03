import { ProductType } from "../../types/ProductType";

export class ProductValidator {
  static validateProduct(product: ProductType): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!product.id) {
      errors.push('ID do produto é obrigatório');
    }

    if (!product.name || product.name.trim().length === 0) {
      errors.push('Nome do produto é obrigatório');
    }

    if (!product.price || product.price <= 0) {
      errors.push('Preço do produto deve ser maior que zero');
    }

    if (product.quantity !== undefined && product.quantity < 0) {
      errors.push('Quantidade não pode ser negativa');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateCartItem(item: ProductType): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    const productValidation = this.validateProduct(item);
    errors.push(...productValidation.errors);

    if (item.quantity === undefined || item.quantity <= 0) {
      errors.push('Quantidade deve ser maior que zero');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
