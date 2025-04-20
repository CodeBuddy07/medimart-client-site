import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  console.log('✅ SSLCommerz Payment Success Data:', body)

  // You can process the data here (e.g., save to DB)

  // Redirect to frontend success page
  return NextResponse.redirect(new URL('/payment/success', req.url))
}

export async function GET() {
    return NextResponse.json({
      status: 'success',
      message: 'Payment success endpoint working properly!',
      note: 'This route is used by SSLCommerz to redirect after payment.',
    })
  }