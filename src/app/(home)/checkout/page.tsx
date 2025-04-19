
import CheckoutForm from '@/components/checkout/CheckoutForm';

export default function CheckoutPage() {
    

    return (
        <div className="container mx-auto py-12 mt-20">
            <h1 className="text-2xl font-bold mb-8">Checkout</h1>
            <CheckoutForm />
        </div>
    );
}