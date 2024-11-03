"use client"

import { useEffect } from "react";

export function Background() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) / 50;
      const moveY = (clientY - centerY) / 50;

      document.documentElement.style.setProperty('--move-x', `${moveX}px`);
      document.documentElement.style.setProperty('--move-y', `${moveY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* خلفية متحركة مع الماوس */}
      <div 
        className="fixed inset-0 -z-10 bg-background transition-transform duration-300"
        style={{ transform: 'translate(var(--move-x, 0), var(--move-y, 0))' }}
      >
        {/* شبكة المخططات */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.primary/10)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.primary/10)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* العناصر الهندسية المتحركة */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-pulse delay-300" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-info/5 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        {/* نقاط متحركة */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/40 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 5}s infinite ease-in-out ${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* تراكب لتخفيف الخلفية */}
      <div className="fixed inset-0 -z-10 bg-background/50" />
    </>
  );
}