import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Home/Navbar/Navbar";
import Footer from "@/components/Home/Footer/Footer";
import ClientLayout from "./client-layout";
import Providers from "@/redux/provider";
import { store } from "@/redux/store";
import { Toaster } from "sonner";
import Loading from "@/components/Loading/Loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hardal Catering",
  description:
    "Hardal Catering, Catering für Ihre Veranstaltung in der Region Hamburg und Umgebung",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full h-full`}>
        <Providers store={store}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <ClientLayout>
                {children}
                <Toaster richColors position="top-right" />
              </ClientLayout>
            </main>
            <Footer />
          </div>
          <Loading />
        </Providers>
      </body>
    </html>
  );
}
