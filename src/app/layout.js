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
import Particles from "@/components/Particles";

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
                <div className="flex">
                  <div>
                    <Aside />
                  </div>
                  <div className="flex-1">
                    <Dnav />
                    <div className="my-3 px-8">{children}</div>
                  </div>
                </div>
              </>
            ) : (
              <div className={sans.className}>
                <Nav />
                <Particles />
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
