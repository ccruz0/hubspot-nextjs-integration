import { NextResponse } from 'next/server';
import type { Request } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({
    message: 'Dummy deals response',
    deals: [],
  });
}
