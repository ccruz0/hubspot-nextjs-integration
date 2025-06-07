import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: 'Dummy contacts response',
    contacts: [],
  }) // 👈 solo una llave y un paréntesis
}
