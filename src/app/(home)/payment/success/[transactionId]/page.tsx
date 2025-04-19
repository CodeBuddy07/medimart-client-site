
'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useValidatePayment } from '@/React-Query/Queries/orderQueries'


export default function PaymentSuccessPage({
  params,
}: {
  params: { transactionId: string }
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const val_id = searchParams.get('val_id')
  const { 
    mutate: validatePayment, 
    isPending, 
    isError, 
    isSuccess, 
    data 
  } = useValidatePayment()

  useEffect(() => {
    if (!val_id) {
      router.push('/payment/failed')
      return
    }

    validatePayment({ 
      tran_id: params.transactionId, 
      val_id: val_id 
    })
  }, [params.transactionId, val_id, validatePayment, router])

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        <p className="mt-4 text-lg text-gray-700">Verifying your payment...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center">Payment Verification Failed</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <XCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-gray-600 text-center mb-6">
              We couldn&apos;t verify your payment. Please check your order history or contact support.
            </p>
            <Button asChild>
              <Link href="/orders">View Orders</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isSuccess && data?.order) {
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

            <div className="w-full border-t border-gray-200 pt-4 space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">{data.order._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-medium">{params.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-medium">৳{data.order.totalPrice?.toFixed(2)}</span>
              </div>
            </div>

            <Button asChild className="w-full">
              <Link href={`/orders/${data.order._id}`}>
                View Order Details
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <XCircle className="w-12 h-12 text-red-500" />
      <p className="mt-4 text-lg text-gray-700">Something went wrong</p>
      <Button asChild className="mt-4">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}