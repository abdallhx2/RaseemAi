"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-4 py-6 px-4 sm:px-6 lg:px-8 md:flex-row md:justify-between md:py-4">
        {/* حقوق النشر */}
        <div className="text-center text-sm text-muted-foreground md:text-right">
          <p className="flex items-center justify-center md:justify-start gap-1">
            تم تطويره بـ
            <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
            من قبل عبدالله الشريف
          </p>
        </div>

        {/* الروابط */}
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
         
         
          <Link 
            href="/about" 
            className="hover:text-foreground transition-colors hover:underline"
          >
            تواصل معي
          </Link>
        </nav>
      </div>
    </footer>
  );
}