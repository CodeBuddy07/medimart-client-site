
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { XCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function PaymentFailedPage() {
  const searchParams = useSearchParams()
  const errorMessage = searchParams.get('message') || 
                       'Your payment could not be processed.'

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <XCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-gray-600 text-center mb-6">
            {errorMessage}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button asChild variant="outline" className="w-full">
              <Link href="/checkout">Return to Cart</Link>
            </Button>
          </div>

          <div className="w-full border-t border-gray-200 pt-4 mt-6">
            <p className="text-sm text-gray-500 text-center mb-2">
              Need help with your payment?
            </p>
            <Button asChild variant="link" className="text-blue-600">
              <Link href="/about">Contact Support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}