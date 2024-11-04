'use client'

import React, { useCallback, useState } from 'react';
import { DiagramSidebar } from '@/components/Diagrams/sidebar';
import { DiagramSettings } from '@/components/Diagrams/diagram-settings';
import { toast } from '@/hooks/use-toast';
import { generateDiagram } from '@/utils/claudeService';
import { renderMermaidDiagram } from '@/utils/mermaidConfig';
import { BasicInfo, DiagramSettings as DiagramSettingsType, DiagramType, MermaidTheme } from '@/utils/types';
import { Wand2, Code2, Settings2, Download } from 'lucide-react';
import { Preview } from '@/components/Diagrams/perview';
import { Button } from '@/components/ui/button';
import { BasicInfoComponent } from '@/components/Diagrams/BasicInfo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import StatsWidget from '@/components/analytics';

export default function DiagramPage() {
  const [diagramType, setDiagramType] = useState<DiagramType>('flowchart');
  const [theme, setTheme] = useState<MermaidTheme>('default');
  const [loading, setLoading] = useState(false);
  const [generatedSvg, setGeneratedSvg] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    systemName: '',
    systemDescription: '',
    version: '1.0',
  });

  const [diagramSettings, setDiagramSettings] = useState<DiagramSettingsType>({
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

  const handleBasicInfoChange = useCallback((field: keyof BasicInfo, value: string) => {
    setBasicInfo(prevInfo => ({
      ...prevInfo,
      [field]: value
    }));
  }, []);

  const handleSettingsChange = useCallback((field: keyof DiagramSettingsType, value: unknown) => {
    setDiagramSettings(prevSettings => ({
      ...prevSettings,
      [field]: value
    }));
  }, []);


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
        title: "تم إنشاء المخطط بنجاح",
        description: "يمكنك الآن تحميل المخطط أو تعديل الإعدادات",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: error instanceof Error ? error.message : 'فشل في إنشاء المخطط',
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
        title: "تم تحميل المخطط",
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
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text  ">
            رسيم مولد المخططات 
          </h1>
          <p className="text-muted-foreground">
            قم بإنشاء مخططات احترافية بسهولة باستخدام الذكاء الاصطناعي
          </p>
        </div>

        {/* <div className="mb-8">
        <StatsWidget />
      </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Right */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Basic Info Card */}
            <Card className="transition-all duration-300 hover:shadow-lg border-border bg-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4 text-lg font-semibold ">
                  <Code2 className="w-5 h-5" />
                  معلومات أساسية
                </div>
                <BasicInfoComponent
                  basicInfo={basicInfo}
                  handleBasicInfoChange={handleBasicInfoChange}
                />
              </CardContent>
            </Card>

            {/* Diagram Type Card */}
            <Card className="transition-all duration-300 hover:shadow-lg border-border bg-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold ">نوع المخطط</h3>
                </div>
                <div className="border-t border-border pt-4">
                  <DiagramSidebar
                    diagramType={diagramType}
                    setDiagramType={setDiagramType}
                  />
                </div>
              </CardContent>
            </Card>

          
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-6">
            <Card className="transition-all duration-300 border-border bg-card">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="relative group">
                    <Preview
                      loading={loading}
                      generatedSvg={generatedSvg}
                      onDownload={handleDownload}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={handleGenerateDiagram}
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-primary-foreground transition-all duration-300 hover:scale-105"
                    >
                      <Wand2 className="w-5 h-5 ml-2" />
                      {loading ? 'جاري الإنشاء...' : 'إنشاء المخطط'}
                    </Button>
                    {generatedSvg && (
                      <Button
                        onClick={handleDownload}
                        className="bg-gradient-to-r from-success to-success-hover hover:from-success-hover hover:to-success text-success-foreground transition-all duration-300 hover:scale-105"
                      >
                        <Download className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>

          {/* Sidebar Left */}
          <aside className="lg:col-span-3">
            <Card className="sticky top-4 transition-all duration-300 hover:shadow-lg border-border bg-card">
              <CardContent className="p-4">
                <Accordion type="single" collapsible defaultValue="settings">
                  <AccordionItem value="settings" className="border-none">
                    <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                      <Settings2 className="w-5 h-5 ml-2" />
                      إعدادات المخطط
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <DiagramSettings
                        diagramSettings={diagramSettings}
                        handleSettingsChange={handleSettingsChange}
                        selectedDiagramType={diagramType}
                        theme={theme}
                        setTheme={setTheme}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}