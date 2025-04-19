'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'


const categories = [
  { value: 'Pain-Relief', label: 'Pain Relief' },
  { value: 'Vitamins', label: 'Vitamins' },
  { value: 'Antibiotics', label: 'Antibiotics' },
  { value: 'Allergy', label: 'Allergy' },
  { value: 'Digestive', label: 'Digestive Health' },
  { value: 'Respiratory', label: 'Respiratory' },
] as const;

export default function Filters() {
  const router = useRouter()
  const pathname = usePathname()
  const currentSearchParams = useSearchParams()

  const updateParams = useDebouncedCallback((params: Record<string, string>) => {
    const newParams = new URLSearchParams(currentSearchParams.toString())
    

    newParams.delete('page')

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })

    router.push(`${pathname}?${newParams.toString()}`)
  }, 500)

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Filters</h2>
      
      {/* Search Input */}
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Search
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search medicines..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={currentSearchParams.get('search') as string}
          onChange={(e) => updateParams({ search: e.target.value })}
        />
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={currentSearchParams.get('category') as string}
          onChange={(e) => updateParams({ category: e.target.value })}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={currentSearchParams.get('minPrice') as string}
            onChange={(e) => updateParams({ minPrice: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={currentSearchParams.get('maxPrice') as string}
            onChange={(e) => updateParams({ maxPrice: e.target.value })}
          />
        </div>
      </div>

      {/* Prescription Required */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            defaultChecked={currentSearchParams.get('requiredPrescription') === 'true'}
            onChange={(e) => updateParams({ requiredPrescription: e.target.checked ? 'true' : '' })}
          />
          <span className="ml-2 text-sm text-gray-700">Requires Prescription</span>
        </label>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => router.push(pathname)}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Reset Filters
      </button>
    </div>
  )
}