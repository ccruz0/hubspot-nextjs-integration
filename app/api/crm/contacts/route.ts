import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  return NextResponse.json({
    message: 'Dummy contacts response',
    contacts: [],
  })
}
fix: replace NextApiRequest with App Router Request
