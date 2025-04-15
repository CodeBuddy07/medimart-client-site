'use client';
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { ModeToggle } from "../ThemeToggler";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";


const Navbar = () => {

    return (
        <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-6">


                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src="/logo.jpg"
                        alt="MediMart Logo"
                        width={40}
                        height={40}
                        className="rounded-md"
                    />
                    <span className="text-xl font-bold text-blue-600">MediMart</span>
                </Link>



                <ul className="hidden md:flex space-x-6 font-semibold">
                    <li>
                        <Link href="/" className="text-gray-700 hover:text-blue-500 transition">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/products" className="text-gray-700 hover:text-blue-500 transition">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="text-gray-700 hover:text-blue-500 transition">
                            About
                        </Link>
                    </li>
                </ul>


                <div className="flex items-center space-x-4">
                    <Link href="/cart" className="relative">
                        <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600 transition" />
                        <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                            0
                        </span>
                    </Link>
                    <Link
                        href="/dashboard"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "group flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                            "hover:bg-gray-100 dark:hover:bg-gray-800",
                            "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400",
                        )}
                    >
                        Dashboard
                        <User className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </Link>

                    <ModeToggle />


                    <MobileMenu />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
