"use client";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Open_Sans, Merienda } from "next/font/google";
import Context from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { QueryClientProvider, QueryClient } from "react-query";
import Dnav from "@/components/Dnav";
import Aside from "@/components/Aside";

const sans = Open_Sans({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const queryClient = new QueryClient();
  var pathname = usePathname();
  var privateRoutes = pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.css"
          integrity="sha512-tx5+1LWHez1QiaXlAyDwzdBTfDjX07GMapQoFTS74wkcPMsI3So0KYmFe6EHZjI8+eSG0ljBlAQc3PQ5BTaZtQ=="
        />
      </head>
      <body suppressHydrationWarning={true}>
        <QueryClientProvider client={queryClient}>
          <Context>
            {privateRoutes ? (
              <>
                <div className="max-h-screen flex flex-col h-screen bg-[#ffffff] overflow-hidden">
                  <div className="w-full">
                    <Dnav />
                  </div>
                  <div className="flex flex-1">
                    <Aside />
                    <div className="overflow-y-auto max-h-[90vh] max-w-[100vw] overflow-x-auto flex-1 bg-[#eee] rounded-2xl shadow-[inset_0px_0px_10px_rgba(56,56,56,0.2)] p-4">
                      {children}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className={sans.className}>
                <Nav />
                {children}
                <Footer />
              </div>
            )}
          </Context>
        </QueryClientProvider>
      </body>
    </html>
  );
}
