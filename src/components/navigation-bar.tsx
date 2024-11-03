"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, User, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function NavigationBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-[1200px] mx-auto h-14 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* الشعار والعنوان */}
        <Link 
          href="/" 
          className="flex items-center gap-2 lg:gap-3 hover:opacity-80 transition-opacity"
        >
          <Activity className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block text-lg">رسيم</span>
        </Link>

        {/* الأزرار */}
        <div className="flex items-center gap-3">
      
        <Link href="/about">
  <Button 
      variant="outline"

    size="icon"
    className="hover:opacity-80 transition-opacity"
  >

    <User className="h-[1.2rem] w-[1.2rem]rotate-90 scale-100 transition-all" />
  </Button>
</Link>
          {/* مبدل السمة */}
          <ThemeToggle />


        </div>
      </div>
    </header>
  );
}