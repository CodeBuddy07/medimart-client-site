'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/SLIDE.webp"
          alt="Background"
          fill
          className="object-cover opacity-20 dark:opacity-10"
          priority
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              Your Health, Our Priority
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
              MediMart provides high-quality healthcare products and medical supplies for professionals and individuals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                Browse Products
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-gray-800">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md h-72 md:h-96">
              <Image
                src="/image.webp"
                alt="Medical Equipment"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}