import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "MediMart",
  description: "Buy medicines and healthcare products online with MediMart. Fast delivery, trusted brands, and affordable prices.",
};

export default function HomeLayout({ children }: Readonly<{children: React.ReactNode}>) {
    return (
      <>
        <Navbar />
        <main>{children}</main>
      </>
    )
  }