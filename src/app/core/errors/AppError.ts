export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  PAYMENT_ERROR = 'PAYMENT_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: ErrorCode,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }

  static validation(message: string): AppError {
    return new AppError(message, ErrorCode.VALIDATION_ERROR, 400);
  }

  static notFound(message: string): AppError {
    return new AppError(message, ErrorCode.NOT_FOUND, 404);
  }

  static unauthorized(message: string): AppError {
    return new AppError(message, ErrorCode.UNAUTHORIZED, 401);
  }

  static payment(message: string): AppError {
    return new AppError(message, ErrorCode.PAYMENT_ERROR, 402);
  }

  static database(message: string): AppError {
    return new AppError(message, ErrorCode.DATABASE_ERROR, 500);
  }

  static externalService(message: string): AppError {
    return new AppError(message, ErrorCode.EXTERNAL_SERVICE_ERROR, 502);
  }

  static internal(message: string): AppError {
    return new AppError(message, ErrorCode.INTERNAL_ERROR, 500);
  }
}
