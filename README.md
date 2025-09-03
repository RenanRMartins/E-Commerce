# E-Commerce Refatorado com Princípios SOLID

Este projeto foi completamente refatorado seguindo os princípios SOLID e implementando Dependency Injection/Inversion of Control (DI/DIP) para criar uma arquitetura robusta e escalável.

## 🏗️ Arquitetura

O projeto agora segue uma arquitetura em camadas bem definida:

- **Camada de Apresentação**: Componentes React e hooks personalizados
- **Camada de Aplicação**: Serviços de negócio e validadores
- **Camada de Domínio**: Interfaces e contratos
- **Camada de Infraestrutura**: Repositories e serviços externos

## 🎯 Princípios SOLID Implementados

### 1. Single Responsibility Principle (SRP)
- Cada classe tem uma única responsabilidade
- `ProductService`: Apenas lógica de produtos
- `PaymentService`: Apenas operações de pagamento
- `OrderService`: Apenas operações de pedidos

### 2. Open/Closed Principle (OCP)
- Componentes extensíveis sem modificação
- `BaseProductCard`: Componente base reutilizável
- Interfaces permitem extensão

### 3. Liskov Substitution Principle (LSP)
- Implementações podem ser substituídas por suas interfaces
- `StripeProductRepository` pode ser substituído por qualquer implementação de `IProductRepository`

### 4. Interface Segregation Principle (ISP)
- Interfaces específicas e focadas
- `IProductService`, `IPaymentService`, `ICartService`

### 5. Dependency Inversion Principle (DIP)
- Dependências de abstrações, não implementações
- Container de injeção de dependência
- Injeção de dependência em todos os serviços

## 🚀 Funcionalidades

- ✅ Catálogo de produtos com scroll infinito
- ✅ Carrinho de compras persistente
- ✅ Sistema de checkout com Stripe
- ✅ Autenticação com Clerk
- ✅ Gerenciamento de pedidos
- ✅ Sistema de logging centralizado
- ✅ Tratamento de erros robusto
- ✅ Validação de dados
- ✅ Configuração flexível

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database**: Prisma + PostgreSQL
- **Payments**: Stripe
- **Authentication**: Clerk
- **Architecture**: SOLID + DI/DIP

## 📁 Estrutura do Projeto

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

## 🚀 Como Executar

### 1. Instalar Dependências
```bash
npm install --legacy-peer-deps
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` com:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Database Configuration
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Application Configuration
NODE_ENV=development
LOG_LEVEL=info
```

### 3. Executar o Projeto
```bash
npm run dev
```

### 4. Build para Produção
```bash
npm run build
```

## 🧪 Testes

O projeto foi estruturado para facilitar testes:

- **Testes Unitários**: Cada serviço pode ser testado isoladamente
- **Mocks**: Fácil mock de dependências através do container DI
- **Validação**: Sistema de validação robusto

## 📚 Documentação

- [Arquitetura Detalhada](./ARCHITECTURE.md)
- [Princípios SOLID](./ARCHITECTURE.md#princípios-solid-aplicados)
- [Padrões Implementados](./ARCHITECTURE.md#padrões-implementados)

## 🔧 Benefícios da Refatoração

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

## 🎨 Padrões de Design

- **Dependency Injection Container**: Gerenciamento centralizado de dependências
- **Repository Pattern**: Abstração para acesso a dados
- **Service Layer Pattern**: Encapsulamento da lógica de negócio
- **Error Handling Pattern**: Tratamento centralizado de erros
- **Configuration Pattern**: Centralização de configurações
- **Logging Pattern**: Sistema de logging estruturado

## 📈 Próximos Passos

- [ ] Implementar testes unitários
- [ ] Adicionar testes de integração
- [ ] Implementar cache Redis
- [ ] Adicionar monitoramento
- [ ] Implementar CI/CD
- [ ] Adicionar documentação da API

## 🤝 Contribuição

Este projeto segue as melhores práticas de desenvolvimento e está estruturado para facilitar contribuições. Veja o arquivo [ARCHITECTURE.md](./ARCHITECTURE.md) para entender melhor a arquitetura implementada.

---

**Desenvolvido seguindo princípios SOLID e melhores práticas de arquitetura de software.**
