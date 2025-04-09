import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Monitor sales, manage products, and track orders efficiently on the MediMart dashboard.",
};

export default function DashboardLayout({ children }: Readonly<{children: React.ReactNode}>) {
    return (
      <>
        <main>{children}</main>
      </>
    )
  }