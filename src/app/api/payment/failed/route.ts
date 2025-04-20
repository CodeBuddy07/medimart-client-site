import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  console.log('✅ SSLCommerz Payment failed Data:', body)

  // You can process the data here (e.g., save to DB)

  // Redirect to frontend success page
  return NextResponse.redirect(new URL('/payment/failed', req.url))
}

export async function GET() {
    return NextResponse.json({
      status: 'success',
      message: 'Payment failed endpoint working properly!',
      note: 'This route is used by SSLCommerz to redirect after payment.',
    })
  }