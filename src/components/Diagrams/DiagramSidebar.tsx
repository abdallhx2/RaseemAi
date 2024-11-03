import React from 'react';
import { Activity, Box, GitBranch, GitFork, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DiagramType, DiagramSettings, MermaidTheme } from '@/utils/types';

const diagramTypes = [
  {
    id: 'flowchart',
    name: 'مخطط التدفق',
    icon: <Activity className="w-4 h-4" />,
  },
  {
    id: 'er',
    name: 'مخطط العلاقات',
    icon: <Share2 className="w-4 h-4" />,
  },
  {
    id: 'class',
    name: 'مخطط الفئات',
    icon: <Box className="w-4 h-4" />,
  },
  {
    id: 'sequence',
    name: 'مخطط التسلسل',
    icon: <GitFork className="w-4 h-4" />,
  },
  {
    id: 'state',
    name: 'مخطط الحالة',
    icon: <GitBranch className="w-4 h-4" />,
  }
];

interface DiagramSidebarProps {
  diagramType: DiagramType;
  setDiagramType: (type: DiagramType) => void;
  theme: MermaidTheme;  // تحديث النوع هنا
  setTheme: (theme: MermaidTheme) => void;  // تحديث النوع هنا
  diagramSettings: DiagramSettings;
  setDiagramSettings: (settings: DiagramSettings) => void;
}

export const DiagramSidebar = ({
  diagramType,
  setDiagramType,
  theme,
  setTheme,
  diagramSettings,
  setDiagramSettings,
}: DiagramSidebarProps) => {
  return (
    <aside className="col-span-3 space-y-6">
      <Card className="bg-card hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-right">نوع المخطط</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {diagramTypes.map((type) => (
            <Button
              key={type.id}
              variant={diagramType === type.id ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 text-right hover:bg-accent/50"
              onClick={() => setDiagramType(type.id as DiagramType)}
            >
              {type.icon}
              <span>{type.name}</span>
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-right">المظهر العام</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-right block">السمة</Label>
            <Select
              value={theme}
              onValueChange={(value: MermaidTheme) => setTheme(value)}
            >
              <SelectTrigger className="bg-background hover:bg-accent/50">
                <SelectValue placeholder="اختر السمة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">افتراضي</SelectItem>
                <SelectItem value="dark">داكن</SelectItem>
                <SelectItem value="forest">غابة</SelectItem>
                <SelectItem value="neutral">محايد</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{diagramSettings.fontSize}px</span>
              <Label className="text-right">حجم الخط</Label>
            </div>
            <Slider
              value={[diagramSettings.fontSize]}
              onValueChange={(value) => setDiagramSettings({
                ...diagramSettings,
                fontSize: value[0]
              })}
              min={12}
              max={24}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>12px</span>
              <span>24px</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};