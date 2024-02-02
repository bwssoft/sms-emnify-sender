import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { SideBar } from "../ui/side-bar";
import { Navbar } from "../ui/nav-bar";
import Componente from "./profile/componente";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BW Send",
  description: "Generated by BWSoft",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className="h-full bg-white">
      <body className={`h-full ${inter.className}`}>
        <SideBar />
        <div className="lg:pl-64">
          <div className="flex items-center justify-between pr-7  border-b border-gray-200 bg-white">
            <Navbar />
            <Componente />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
