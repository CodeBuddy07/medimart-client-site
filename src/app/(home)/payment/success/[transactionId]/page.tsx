'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PaymentSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
          <p className="text-gray-600 text-center mb-6">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <p className="text-sm text-gray-500 text-center">
            You will be redirected to the homepage in 5 seconds.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
