'use client';

import Link from "next/link";
import { Loader2, LogOut, Package, Settings, User } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { ModeToggle } from "../ThemeToggler";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CartIcon from "./cartIcon";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useGetMe, useLogout } from "@/React-Query/Queries/authQueries";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const Navbar = () => {

    const router = useRouter();
    const { data: user } = useGetMe(false);
    const { mutate: logOut, isPending } = useLogout();
    const handleLogout = () => {
        logOut();
    };

    const pathname = usePathname()

    const links = [
        { href: '/', label: 'Home' },
        { href: '/shop', label: 'Products' },
        { href: '/about', label: 'About' },
    ]

    return (
        <nav className="w-full fixed top-0 left-0 z-50 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg transition-colors duration-300">
            <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-6">

                
                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src="/logo.jpg"
                        alt="MediMart Logo"
                        width={40}
                        height={40}
                        className="rounded-md"
                    />
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">MediMart</span>
                </Link>

                
                <ul className="hidden md:flex space-x-6 font-semibold">
                    {links.map(({ href, label }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className={clsx(
                                    'transition',
                                    'hover:text-blue-500 dark:hover:text-blue-400',
                                    pathname === href
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-gray-700 dark:text-gray-200'
                                )}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right Side Icons */}
                <div className="flex items-center space-x-4">

                    <CartIcon />

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage hidden={user == undefined} src={user?.profileImage?.url} alt={user?.name} />
                                        <AvatarFallback>
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-56 dark:bg-gray-800 dark:text-gray-100" align="end" forceMount>
                                <DropdownMenuItem
                                    hidden={user?.role === 'admin'}
                                    className="flex items-center gap-2"
                                    onClick={() => router.push('/profile')}
                                >
                                    <User className="h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    hidden={user?.role === 'admin'}
                                    className="flex items-center gap-2"
                                    onClick={() => router.push('/orders')}
                                >
                                    <Package className="h-4 w-4" />
                                    <span>Orders</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    hidden={user?.role !== 'admin'}
                                    className="flex items-center gap-2"
                                    onClick={() => router.push('/admin')}
                                >
                                    <Settings className="h-4 w-4" />
                                    <span>Dashboard</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    className="flex items-center gap-2 text-red-600 dark:text-red-400"
                                    onClick={handleLogout}
                                    disabled={isPending}
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                    {isPending && <Loader2 className="animate-spin h-4 w-4" />}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button variant="outline" size="sm" onClick={() => router.push('/log-in')}>
                            Log In
                        </Button>
                    )}

                    <ModeToggle />
                    <MobileMenu />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
