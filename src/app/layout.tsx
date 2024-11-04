import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { NavigationBar } from "@/components/navigation-bar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Background } from "@/components/Background";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
export const metadata: Metadata = {
  title: "Raseem",
  description: "أداة ذكية لإنشاء المخططات باستخدام الذكاء الاصطناعي",
  icons: {
    icon: '/favicon.svg' 
  
    
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Background />
          <NavigationBar />

          <main className="flex-1 py-4 relative">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>

          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}