import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderWithCart from "@/components/header/HeaderWithCart";
import ContactSidebar from "@/components/contact-sidebar";
import WhatsAppIcon from "@/components/whatsapp-icon";
import { ChatbotProvider } from "@/components/chatbot/ChatbotProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { CartProvider } from "@/components/cart/CartProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import Footer from "@/components/footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Achromic Point Consulting | Training and Consulting",
  description: "Achromic Point Consulting Private Limited is a consulting firm that provides services to businesses and organizations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body 
        className={`${poppins.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ReduxProvider>
          <AuthProvider>
            <CartProvider>
              <ChatbotProvider>
                <HeaderWithCart />
                {children}
                <Footer/>
                <ContactSidebar />
                <WhatsAppIcon />
              </ChatbotProvider>
            </CartProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
