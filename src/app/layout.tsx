import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import './assets/css/styles.css'
import './assets/css/colors.css'

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://snowrealestate.com'),
  title: "Snow Real Estate | Luxury Properties & Investment in Dubai",
  description: "Snow Real Estate is a premier luxury brokerage in Dubai, specializing in exclusive properties, prime locations, and high-yield investments. Discover your dream home today.",
  keywords: "Dubai Real Estate, Luxury Properties Dubai, Snow Real Estate, Dubai Marina, Palm Jumeirah, Downtown Dubai, Real Estate Brokerage Dubai",
  openGraph: {
    title: "Snow Real Estate | Luxury Properties & Investment in Dubai",
    description: "Discover exclusive luxury properties in Dubai with Snow Real Estate. Expert guidance for buyers and investors.",
    url: "https://snowrealestate.com",
    siteName: "Snow Real Estate",
    images: [
      {
        url: "/image/logo/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snow Real Estate | Luxury Properties in Dubai",
    description: "Discover exclusive luxury properties in Dubai with Snow Real Estate.",
    images: ["/image/logo/logo.png"],
  },
  icons: {
    icon: "/image/logo/logo.png",
    apple: "/image/logo/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="blue-skin">
        {children}
      </body>
    </html>
  );
}
