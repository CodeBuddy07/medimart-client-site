import ShopContent from '@/components/medicines/shop-content'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'


export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="flex justify-center items-center">
        <Loader2
          className="animate-spin text-primary"
          size={24}
        />
      </div>}>
        <ShopContent  />
      </Suspense>
    </div>
  )
}