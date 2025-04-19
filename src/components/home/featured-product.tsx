'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useGetAllMedicines } from '@/React-Query/Queries/medicineQueries';
import { Loader2 } from 'lucide-react';
import MedicineCard from '../medicines/medicineCard';


export default function FeaturedProducts() {

  const { data: medicines, isPending } = useGetAllMedicines({ 
    limit: 4,
    page: 1
  });

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Medical Products</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our selection of high-quality medical equipment and supplies chosen by healthcare professionals.
          </p>
        </div>
        
        {/* Loading indicator */}
        {isPending && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
          </div>
        )}
        
        {/* Products grid */}
        {!isPending && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {medicines?.data && medicines.data.length > 0 ? (
                medicines.data.map((medicine:IMedicine) => (
                  <MedicineCard key={medicine._id} medicine={medicine} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-700 dark:text-gray-300">No products found.</p>
                </div>
              )}
            </div>
            
            {/* Shop more button */}
            <div className="flex justify-center mt-12">
              <Link href="/shop">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                  Shop More Products
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}