export interface AppConfig {
  stripe: {
    secretKey: string;
    publishableKey: string;
  };
  database: {
    url: string;
    directUrl: string;
  };
  app: {
    environment: 'development' | 'production' | 'test';
    logLevel: 'debug' | 'info' | 'warn' | 'error';
  };
}

export class ConfigService {
  private static instance: ConfigService;
  private config: AppConfig;

  private constructor() {
    this.config = this.loadConfig();
  }

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  private loadConfig(): AppConfig {
    return {
      stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY || '',
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      },
      database: {
        url: process.env.POSTGRES_PRISMA_URL || '',
        directUrl: process.env.POSTGRES_URL_NON_POOLING || '',
      },
      app: {
        environment: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
        logLevel: (process.env.LOG_LEVEL as 'debug' | 'info' | 'warn' | 'error') || 'info',
      },
    };
  }

  public getConfig(): AppConfig {
    return { ...this.config };
  }

  public getStripeConfig() {
    return this.config.stripe;
  }

  public getDatabaseConfig() {
    return this.config.database;
  }

  public getAppConfig() {
    return this.config.app;
  }

  public isDevelopment(): boolean {
    return this.config.app.environment === 'development';
  }

  public isProduction(): boolean {
    return this.config.app.environment === 'production';
  }
}

export const configService = ConfigService.getInstance();
