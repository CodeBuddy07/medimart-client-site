'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useCartStore } from '@/app/stores/cart-store';
import { useCreateOrder } from '@/React-Query/Queries/orderQueries';
import { useGetMe } from '@/React-Query/Queries/authQueries';

const formSchema = z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required'),
    paymentMethod: z.enum(['cash-on-delivery', 'online']),
});

export default function CheckoutForm() {
    const { data: user } = useGetMe();
    const { cart, totalPrice, clearCart } = useCartStore();

    console.log("cart :", cart);
    const router = useRouter();
    const { mutate: createOrder, isPending } = useCreateOrder();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
            paymentMethod: 'online',
        },
    });


    function onSubmit(values: z.infer<typeof formSchema>) {
        const orderData = {
            user: user?.data?._id,
            items: cart.map(item => ({
                medicine: item._id,
                quantity: item.quantity,
                price: item.price,
                itemTotal: item.price * item.quantity,
            })),
            deliveryAddress: {
                street: values.street,
                city: values.city,
                state: values.state,
                postalCode: values.postalCode,
                country: values.country,
            },
            paymentMethod: values.paymentMethod,
            totalPrice,
        };

        createOrder(orderData, {
            onSuccess: (data) => {
                console.log("jjj:", data);
                if (data.data.paymentUrl) {
                    window.location.href = data.data.paymentUrl;
                } else {
                    clearCart();
                    toast.success('Order placed successfully!');
                    router.push('/orders');
                }
            },
            onError: (error) => {
                toast.error(error.message || 'Failed to place order');
            }
        });
    }

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-20">
            <Card>
                <CardHeader>
                    <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="street"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Street</FormLabel>
                                        <FormControl>
                                            <Input placeholder="123 Main St" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input placeholder="New York" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <Input placeholder="NY" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="postalCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Postal Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="10001" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Country</FormLabel>
                                            <FormControl>
                                                <Input placeholder="United States" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                           
                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? 'Processing...' : 'Place Order'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div key={item._id} className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-medium">{item.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {item.quantity} × ${item.price.toFixed(2)}
                                    </p>
                                </div>
                                <p className="font-medium">
                                    ${(item.quantity * item.price).toFixed(2)}
                                </p>
                            </div>
                        ))}
                        <div className="border-t pt-4">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}