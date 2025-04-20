"use client"

import AddToCartButton from '@/components/medicines/add-to-cart-button';
import ImageSlider from '@/components/medicines/image-slider';
import { Badge } from '@/components/ui/badge';
import { useGetMedicineById } from '@/React-Query/Queries/medicineQueries';
import { notFound } from 'next/navigation';

const MedicineDetailedPageContent = ({ id }: { id: string }) => {

    const { data: medicine, isLoading, error } = useGetMedicineById(id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    console.log(medicine, id);

    if (error || !medicine) {
        return notFound();
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Slider */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <ImageSlider images={medicine.images} />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {medicine.name}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            {medicine.category}
                        </p>
                    </div>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        ${medicine.price.toFixed(2)}
                    </p>
                </div>

                {medicine.requiredPrescription && (
                    <Badge className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700">
                        Prescription Required
                    </Badge>
                )}

                {medicine.stock <= 5 && medicine.stock > 0 && (
                    <Badge className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
                        Only {medicine.stock} left in stock
                    </Badge>
                )}

                {medicine.stock === 0 && (
                    <Badge className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700">
                        Out of Stock
                    </Badge>
                )}

                <div className="prose dark:prose-invert max-w-none">
                    <p>{medicine.description}</p>
                </div>

                <div className="pt-4">
                    <AddToCartButton medicine={medicine} />
                </div>
            </div>
        </div>
    );
};

export default MedicineDetailedPageContent;