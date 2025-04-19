export default function AboutPage() {
    return (
      <div className="container mx-auto px-4 py-12 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">About MediCare Pharmacy</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              At MediCare Pharmacy, we are committed to providing high-quality medicines and healthcare products to our community. Our mission is to make healthcare accessible, affordable, and convenient for everyone.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3 text-blue-800">Our Story</h2>
              <p className="text-gray-700">
                Founded in 2010, MediCare Pharmacy started as a small neighborhood pharmacy. Over the years, we&apos;ve grown into a trusted healthcare provider, serving thousands of customers with care and professionalism.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3 text-blue-800">Our Team</h2>
              <p className="text-gray-700">
                Our team consists of licensed pharmacists and healthcare professionals dedicated to your well-being. We provide personalized consultations and ensure you receive the right medications.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Why Choose Us?</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Wide selection of genuine medicines</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Competitive prices</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Professional healthcare advice</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Convenient online ordering</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Fast and reliable delivery</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }