import { NextRequest, NextResponse } from 'next/server';
import { AppError, ErrorCode } from '../errors/AppError';
import { logger } from '../logging/Logger';

export function handleApiError(error: unknown, request: NextRequest): NextResponse {
  logger.error('API Error occurred', { 
    error, 
    url: request.url, 
    method: request.method 
  });

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: {
          code: error.code,
          message: error.message,
          statusCode: error.statusCode,
        }
      },
      { status: error.statusCode }
    );
  }

  // Handle known error types
  if (error instanceof Error) {
    // Check for specific error patterns
    if (error.message.includes('Unauthorized')) {
      return NextResponse.json(
        {
          error: {
            code: ErrorCode.UNAUTHORIZED,
            message: 'Não autorizado',
            statusCode: 401,
          }
        },
        { status: 401 }
      );
    }

    if (error.message.includes('Not found')) {
      return NextResponse.json(
        {
          error: {
            code: ErrorCode.NOT_FOUND,
            message: 'Recurso não encontrado',
            statusCode: 404,
          }
        },
        { status: 404 }
      );
    }
  }

  // Default internal server error
  return NextResponse.json(
    {
      error: {
        code: ErrorCode.INTERNAL_ERROR,
        message: 'Erro interno do servidor',
        statusCode: 500,
      }
    },
    { status: 500 }
  );
}

export function withErrorHandler(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      return await handler(request);
    } catch (error) {
      return handleApiError(error, request);
    }
  };
}
