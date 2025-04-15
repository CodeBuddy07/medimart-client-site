"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Pill, 
  ShoppingCart, 
  Users, 
  FileText, 
  Settings,
  ClipboardList
} from "lucide-react";
import { useGetMe } from "@/React-Query/Queries/authQueries";


export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: user } = useGetMe();

  const adminNavItems = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: "Overview",
    },
    {
      href: "/dashboard/medicines",
      icon: Pill,
      label: "Manage Medicines",
      subItems: [
        { href: "/dashboard/medicines/add", label: "Add Medicine" },
        { href: "/dashboard/medicines/inventory", label: "Inventory" }
      ]
    },
    {
      href: "/dashboard/orders",
      icon: ShoppingCart,
      label: "Manage Orders",
      subItems: [
        { href: "/dashboard/orders/prescriptions", label: "Prescription Orders" }
      ]
    },
    {
      href: "/dashboard/users",
      icon: Users,
      label: "Manage Users"
    },
    {
      href: "/dashboard/payments",
      icon: FileText,
      label: "Manage Payments"
    },
  ];

  const customerNavItems = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: "Overview",
    },
    {
      href: "/dashboard/orders",
      icon: ShoppingCart,
      label: "My Orders"
    },
    {
      href: "/dashboard/prescriptions",
      icon: ClipboardList,
      label: "My Prescriptions"
    },
    {
      href: "/dashboard/profile",
      icon: Settings,
      label: "Profile Settings",
      subItems: [
        { href: "/dashboard/profile/personal", label: "Personal Info" },
        { href: "/dashboard/profile/address", label: "Addresses" }
      ]
    },
  ];

  const navItems = user?.role === "admin" ? adminNavItems : customerNavItems;

  return (
    <div className="hidden border-r bg-muted/40 md:block w-64 fixed h-screen">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl">MediMart</span>
          </Link>
        </div>
        <div className="flex-1 p-2">
          <nav className="grid items-start gap-1">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.href && "bg-muted text-primary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
                
                {item.subItems && pathname.startsWith(item.href) && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-2 py-1 text-xs text-muted-foreground hover:text-primary",
                          pathname === subItem.href && "text-primary font-medium"
                        )}
                      >
                        • {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground capitalize">
                {user?.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}