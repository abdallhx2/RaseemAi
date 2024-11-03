/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState } from 'react';
import { DiagramSidebar } from '../components/Diagrams/DiagramSidebar';
import { DiagramMainContent } from '../components/Diagrams/DiagramMainContent';
import { toast } from '@/hooks/use-toast';
import { generateDiagram } from '@/utils/claudeService';
import { renderMermaidDiagram } from '@/utils/mermaidConfig';
import { BasicInfo, DiagramSettings, DiagramType, MermaidTheme } from '@/utils/types';
import { Wand2, FileCode2, Settings2, Sparkles, Boxes, CircuitBoard, Network } from 'lucide-react';

const DiagramBuilder = () => {
  // State Management
  const [diagramType, setDiagramType] = useState<DiagramType>('flowchart');
  const [theme, setTheme] = useState<MermaidTheme>('default');
  const [loading, setLoading] = useState(false);
  const [generatedSvg, setGeneratedSvg] = useState('');
  
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    systemName: '',
    systemDescription: '',
    version: '1.0',
  });

  const [diagramSettings, setDiagramSettings] = useState<DiagramSettings>({
    direction: 'TB',
    fontSize: 14,
    padding: 15,
    useMaxWidth: true,
    showLabels: true,
    style: 'default',
    entitySpacing: 40,
    rankSpacing: 50,
    curve: 'linear',
    defaultLinkColor: '#000000',
  });

  // Handlers
  const handleGenerateDiagram = async () => {
    setLoading(true);
    try {
      if (!basicInfo.systemName || !basicInfo.systemDescription) {
        throw new Error('الرجاء إدخال اسم النظام ووصفه');
      }

      const mermaidCode = await generateDiagram(basicInfo, diagramType, diagramSettings);
      const svg = await renderMermaidDiagram(mermaidCode, theme, diagramSettings);
      if (!svg) throw new Error('فشل في إنشاء المخطط');

      setGeneratedSvg(svg);
      toast({
        title: "تم إنشاء المخطط بنجاح ✨",
        description: "يمكنك الآن تحميل المخطط أو تعديل الإعدادات",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'فشل في إنشاء المخطط';
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedSvg) return;
    try {
      const element = document.createElement('a');
      const file = new Blob([generatedSvg], { type: 'image/svg+xml' });
      element.href = URL.createObjectURL(file);
      element.download = `${basicInfo.systemName || 'diagram'}.svg`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      toast({
        title: "تم تحميل المخطط ✅",
        description: "تم حفظ المخطط بصيغة SVG",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطأ في التحميل",
        description: "فشل في تحميل المخطط",
      });
    }
  };


  return (
    <div className="">
    {/* أيقونات الخلفية */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* الأيقونات اليمنى */}
      <div className="absolute left-10 top-20">
        <FileCode2 className="w-8 h-8 text-primary/20 animate-pulse" />
      </div>
      <div className="absolute left-32 top-40">
        <CircuitBoard className="w-6 h-6 text-accent/20 animate-pulse delay-300" />
      </div>
      <div className="absolute left-20 top-60">
        <Network className="w-10 h-10 text-info/20 animate-pulse delay-500" />
      </div>

      {/* الأيقونات اليسرى */}
      <div className="absolute right-12 top-24">
        <Settings2 className="w-7 h-7 text-primary/20 animate-pulse delay-200" />
      </div>
      <div className="absolute right-28 top-48">
        <Boxes className="w-5 h-5 text-accent/20 animate-pulse delay-400" />
      </div>
      <div className="absolute right-16 top-72">
        <Wand2 className="w-9 h-9 text-info/20 animate-pulse delay-600" />
      </div>
    </div>

    <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6 relative">
      {/* رأس الصفحة مع تأثيرات الحركة */}
      <header className="mb-16 text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-in
                      bg-gradient-to-r from-primary via-accent to-info bg-clip-text text-transparent">
          مولد المخططات
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto relative animate-slide-in">
          قم بإنشاء مخططات احترافية باستخدام رسيم
          <Sparkles className="w-5 h-5 text-warning absolute -top-2 -right-6 animate-bounce" />
        </p>
      </header>

      {/* المحتوى الرئيسي مع تأثيرات الحركة */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-scale-in">
        {/* القائمة الجانبية */}
        <aside className="order-2 lg:order-1 lg:col-span-4">
          <div className="lg:sticky lg:top-8 space-y-6">
            <div className="glass-effect card-float rounded-xl overflow-hidden">
              <DiagramSidebar
                diagramType={diagramType}
                setDiagramType={setDiagramType}
                theme={theme}
                setTheme={setTheme}
                diagramSettings={diagramSettings}
                setDiagramSettings={setDiagramSettings}
              />
            </div>
          </div>
        </aside>

        {/* المحتوى الرئيسي */}
        <main className="order-1 lg:order-2 lg:col-span-8">
          <div className="glass-effect card-float rounded-xl overflow-hidden">
            <DiagramMainContent
              basicInfo={basicInfo}
              setBasicInfo={setBasicInfo}
              diagramSettings={diagramSettings}
              setDiagramSettings={setDiagramSettings}
              selectedDiagramType={diagramType}
              generatedSvg={generatedSvg}
              loading={loading}
              onGenerate={handleGenerateDiagram}
              onDownload={handleDownload}
            />
          </div>
        </main>
      </div>
    </div>
  </div>
);
};

export default DiagramBuilder;