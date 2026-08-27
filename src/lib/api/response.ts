import { NextResponse } from 'next/server';

/**
 * Standard API response helpers
 */

export function apiSuccess(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function apiCreated(data: unknown) {
  return NextResponse.json(data, { status: 201 });
}

export function apiError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export function apiBadRequest(message: string) {
  return apiError(message, 400);
}

export function apiNotFound(message = 'Resource not found') {
  return apiError(message, 404);
}
