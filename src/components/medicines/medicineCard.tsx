'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { useCartStore } from '@/app/stores/cart-store';


interface MedicineCardProps {
  medicine: IMedicine;
}

export default function MedicineCard({ medicine }: MedicineCardProps) {
  const { addToCart, mounted } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!mounted) return;
    
    addToCart(medicine);
    

    setAdded(true);
    

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300">
      <div className="relative pt-[75%] bg-gray-100 dark:bg-gray-800">
        <Image
          src={medicine.images[0]?.url || "/api/placeholder/320/240"}
          alt={medicine.name}
          fill
          className="object-contain p-4"
        />
        {medicine.requiredPrescription && (
          <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700">
            Prescription
          </Badge>
        )}
        {medicine.stock <= 5 && medicine.stock > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
            Low Stock
          </Badge>
        )}
        {medicine.stock === 0 && (
          <Badge className="absolute top-2 left-2 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700">
            Out of Stock
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{medicine.name}</h3>
        <Badge variant="outline" className="mt-2 text-sm">
          {medicine.category}
        </Badge>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{medicine.description}</p>
        <p className="mt-2 font-bold text-blue-600 dark:text-blue-400">${medicine.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className={`w-full transition-all duration-300 ${
            added 
              ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800" 
              : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          } text-white`}
          disabled={!mounted || medicine.stock === 0 || medicine.requiredPrescription}
          onClick={handleAddToCart}
        >
          {added ? (
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Added to Cart
            </span>
          ) : (
            <>
              {medicine.requiredPrescription ? "Needs Prescription" : medicine.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}