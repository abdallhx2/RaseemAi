"use client";

import { useMemo, useEffect, useState } from 'react';
import { BarChart, LineChart, PieChart, TrendingUp, Database, FileSpreadsheet, ChartBar, GanttChartSquare, ScatterChart, Binary, Network, GitGraph } from 'lucide-react';

export function Background() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [shapes, setShapes] = useState([]);

  const analysisIcons = useMemo(() => ([
    { Component: BarChart, color: "text-primary", label: "تحليل شريطي" },
    { Component: LineChart, color: "text-info", label: "تحليل خطي" },
    { Component: PieChart, color: "text-accent", label: "تحليل دائري" },
    { Component: Database, color: "text-primary", label: "قواعد البيانات" },
    { Component: TrendingUp, color: "text-success", label: "تحليل الاتجاهات" },
    { Component: FileSpreadsheet, color: "text-info", label: "جداول البيانات" },
    { Component: ChartBar, color: "text-accent", label: "إحصائيات" },
    { Component: GanttChartSquare, color: "text-success", label: "مخطط جانت" },
    { Component: ScatterChart, color: "text-primary", label: "مخطط التشتت" },
    { Component: Binary, color: "text-info", label: "تحليل رقمي" },
    { Component: Network, color: "text-accent", label: "تحليل الشبكات" },
    { Component: GitGraph, color: "text-success", label: "تحليل المسارات" }
  ]), []);

  const generateShapes = useMemo(() => (
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      ...analysisIcons[i % analysisIcons.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 24 + Math.random() * 16,
      rotation: Math.random() * 360
    }))
  ), [analysisIcons]);

  useEffect(() => {
    setShapes(generateShapes);
  }, [generateShapes]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow" 
             style={{ background: `hsl(var(--primary) / 0.1)` }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
             style={{ background: `hsl(var(--accent) / 0.1)` }} />
      </div>

      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`absolute transition-all duration-1000 ease-out ${shape.color} opacity-20 hover:opacity-60 group`}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            transform: `translate(${(mousePosition.x - 50) * 0.05}px, ${(mousePosition.y - 50) * 0.05}px) rotate(${shape.rotation}deg)`
          }}
        >
          <div className="relative">
            <shape.Component size={shape.size} className="transform hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
            <span
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-xs"
              style={{
                background: `hsl(var(--card))`,
                color: `hsl(var(--card-foreground))`
              }}
            >
              {shape.label}
            </span>
          </div>
        </div>
      ))}

      <div
        className="absolute inset-0 opacity-30 transition-all duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary) / 0.2) 0%, transparent 45%)`
        }}
      />

      <div
        className="fixed inset-0 -z-10 backdrop-blur-[1px]"
        style={{
          background: `hsl(var(--background) / 0.05)`
        }}
      />
    </div>
  );
}