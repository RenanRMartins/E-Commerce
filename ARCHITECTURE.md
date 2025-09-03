# Arquitetura do E-Commerce

## Visão Geral

Este projeto foi refatorado seguindo os princípios SOLID e implementando Dependency Injection/Inversion of Control (DI/DIP) para criar uma arquitetura robusta e escalável.

## Princípios SOLID Aplicados

### 1. Single Responsibility Principle (SRP)
- **ProductService**: Responsável apenas pela lógica de negócio de produtos
- **PaymentService**: Responsável apenas por operações de pagamento
- **OrderService**: Responsável apenas por operações de pedidos
- **CartService**: Responsável apenas pela lógica do carrinho
- **Logger**: Responsável apenas por logging
- **ConfigService**: Responsável apenas por configurações

### 2. Open/Closed Principle (OCP)
- **BaseProductCard**: Componente base que pode ser estendido sem modificação
- **ProductWithCartButton**: Extensão do BaseProductCard
- **Interfaces**: Permitem extensão sem modificação das implementações

### 3. Liskov Substitution Principle (LSP)
- Todas as implementações podem ser substituídas por suas interfaces
- **StripeProductRepository** pode ser substituído por qualquer implementação de **IProductRepository**

### 4. Interface Segregation Principle (ISP)
- Interfaces específicas e focadas:
  - **IProductService**: Apenas operações de produtos
  - **IPaymentService**: Apenas operações de pagamento
  - **ICartService**: Apenas operações do carrinho

### 5. Dependency Inversion Principle (DIP)
- Dependências de abstrações, não de implementações concretas
- **ServiceContainer**: Gerencia todas as dependências
- Injeção de dependência em todos os serviços

## Estrutura de Pastas

```
src/app/
├── core/                    # Camada de infraestrutura
│   ├── interfaces/         # Contratos/Abstrações
│   ├── services/           # Implementações dos serviços
│   ├── container/          # Container de DI
│   ├── config/             # Configurações
│   ├── logging/            # Sistema de logging
│   ├── errors/             # Tratamento de erros
│   ├── middleware/         # Middlewares
│   ├── validators/         # Validadores
│   └── components/         # Componentes base
├── components/             # Componentes da UI
├── hooks/                  # Hooks personalizados
├── types/                  # Tipos TypeScript
└── lib/                    # Utilitários
```

## Camadas da Arquitetura

### 1. Camada de Apresentação (UI)
- Componentes React
- Hooks personalizados
- Store Zustand

### 2. Camada de Aplicação
- Services (ProductService, PaymentService, etc.)
- Validators
- Error Handlers

### 3. Camada de Domínio
- Interfaces/Contratos
- Entidades de domínio
- Regras de negócio

### 4. Camada de Infraestrutura
- Repositories (StripeProductRepository, PrismaDatabaseService)
- External Services (Stripe, Prisma)
- Configuration

## Padrões Implementados

### 1. Dependency Injection Container
- **ServiceContainer**: Gerencia todas as dependências
- Singleton pattern para configuração
- Registro automático de serviços

### 2. Repository Pattern
- **IProductRepository**: Abstração para acesso a dados de produtos
- **StripeProductRepository**: Implementação específica para Stripe

### 3. Service Layer Pattern
- Camada de serviços que encapsula a lógica de negócio
- Separação clara entre apresentação e lógica

### 4. Error Handling Pattern
- **AppError**: Classe base para erros da aplicação
- **ErrorHandler**: Middleware para tratamento centralizado de erros

### 5. Configuration Pattern
- **ConfigService**: Centraliza todas as configurações
- Singleton para acesso global

### 6. Logging Pattern
- **Logger**: Sistema de logging centralizado
- Diferentes níveis de log
- Formatação consistente

## Benefícios da Refatoração

### 1. Testabilidade
- Fácil mock de dependências
- Testes unitários isolados
- Injeção de dependências facilita testes

### 2. Manutenibilidade
- Código organizado em camadas
- Responsabilidades bem definidas
- Fácil localização de funcionalidades

### 3. Escalabilidade
- Fácil adição de novos serviços
- Extensibilidade sem modificação
- Configuração flexível

### 4. Reutilização
- Componentes base reutilizáveis
- Serviços independentes
- Interfaces padronizadas

### 5. Flexibilidade
- Troca de implementações sem impacto
- Configuração por ambiente
- Logging configurável

## Como Usar

### 1. Adicionar Novo Serviço
```typescript
// 1. Criar interface
interface INewService {
  doSomething(): Promise<void>;
}

// 2. Implementar serviço
class NewService implements INewService {
  constructor(private dependency: IDependency) {}
  
  async doSomething(): Promise<void> {
    // implementação
  }
}

// 3. Registrar no container
container.register('INewService', new NewService(dependency));
```

### 2. Usar em Componentes
```typescript
import { container } from '@/app/core/container/ServiceContainer';

const MyComponent = () => {
  const service = container.get<INewService>('INewService');
  // usar serviço
};
```

### 3. Tratamento de Erros
```typescript
try {
  await service.doSomething();
} catch (error) {
  if (error instanceof AppError) {
    // tratar erro específico
  }
}
```

## Configuração

### Variáveis de Ambiente
```env
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...
LOG_LEVEL=info
NODE_ENV=development
```

### Logging
```typescript
import { logger } from '@/app/core/logging/Logger';

logger.info('Mensagem informativa');
logger.error('Erro ocorreu', error);
```

Esta arquitetura garante que o código seja profissional, escalável e fácil de manter, seguindo as melhores práticas de desenvolvimento de software.
