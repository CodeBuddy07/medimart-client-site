'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useGetAllMedicines } from '@/React-Query/Queries/medicineQueries'
import Filters from './medicine-filter'
import MedicineCard from './medicineCard'
import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function ShopContent() {
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const loadingRef = useRef(false)
    const searchParams = useSearchParams();


    const search = searchParams.get('search') as string | undefined
    const category = searchParams.get('category') as string | undefined
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined
    const requiredPrescription = searchParams.get('requiredPrescription') === 'true' ? true : undefined

    const { data: medicines, isPending, isFetching } = useGetAllMedicines({
        search,
        category,
        minPrice,
        maxPrice,
        requiredPrescription,
        page,
        limit: 12,
    });

    console.log(search, category, minPrice, maxPrice, requiredPrescription, page);


    const [ref, inView] = useInView({
        threshold: 0,
        triggerOnce: false,
    })

    const loadMore = useCallback(() => {
        if (!isFetching && hasMore && !loadingRef.current) {
            loadingRef.current = true
            setPage((prev) => prev + 1)
        }
    }, [isFetching, hasMore])

    useEffect(() => {
        if (inView && hasMore) {
            loadMore()
        }
    }, [inView, hasMore, loadMore])

    useEffect(() => {
        if (medicines?.data && medicines?.data.length < (page * 12)) {
            setHasMore(false)
        } else {
            setHasMore(true)
        }
        loadingRef.current = false
    }, [medicines, page])


    useEffect(() => {
        setPage(1)
        setHasMore(true)
    }, [search, category, minPrice, maxPrice, requiredPrescription])

    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Filters Section */}
                <div className="md:w-1/4">
                    <Filters />
                </div>

                {/* Products Section */}
                <div className="md:w-3/4 min-h-screen">
                    {isPending && page === 1 ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="flex justify-center items-center">
                                <Loader2
                                    className="animate-spin text-primary"
                                    size={24}
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            {medicines?.data && medicines.data?.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {medicines.data?.map((medicine: IMedicine) => (
                                            <MedicineCard key={medicine._id} medicine={medicine} />
                                        ))}
                                    </div>

                                    {hasMore && (
                                        <div ref={ref} className="flex justify-center mt-8">
                                            <div className="flex justify-center items-center">
                                                <Loader2
                                                    className="animate-spin text-primary"
                                                    size={24}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-medium text-gray-700">No medicines found</h3>
                                    <p className="mt-2 text-gray-500">
                                        Try adjusting your search or filter criteria
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}