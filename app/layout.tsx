import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quét là xong - Hệ thống đặt món thông minh",
  description: "Giải pháp đặt món thông minh qua QR code cho nhà hàng",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* ✅ Đặt favicon đúng chỗ */}
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Toaster richColors position="top-center" />

      </body>
    </html>
  );
}
