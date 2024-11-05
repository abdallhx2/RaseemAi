'use client'

import React from 'react';
import { Settings2, ArrowUpDown, LineChart, Tag, Maximize, Palette, TextQuote } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DiagramSettings as DiagramSettingsType, DiagramType, MermaidTheme } from '@/utils/types';
import { diagramConfigs } from '@/utils/diagram-configs';

interface DiagramSettingsProps {
  diagramSettings: DiagramSettingsType;
  handleSettingsChange: (field: keyof DiagramSettingsType, value: unknown) => void;
  selectedDiagramType: DiagramType;
  theme: MermaidTheme;
  setTheme: (theme: MermaidTheme) => void;
}

export const DiagramSettings: React.FC<DiagramSettingsProps> = ({
  diagramSettings,
  handleSettingsChange,
  selectedDiagramType,
  theme,
  setTheme
}) => {
  const config = diagramConfigs[selectedDiagramType];

  return (
    <div className="space-y-4">
      {/* المظهر العام */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-right flex items-center justify-end gap-2">
            <Palette className="w-5 h-5" />
            المظهر العام
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-end gap-2">
              <Label className="text-right">السمة</Label>
              <Palette className="w-4 h-4" />
            </div>
            <Select
              value={theme}
              onValueChange={(value: MermaidTheme) => setTheme(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر السمة" />
              </SelectTrigger>
             <SelectContent>
  {/* السمات الأساسية */}
  <SelectGroup>
    <SelectLabel>السمات الأساسية</SelectLabel>
    <SelectItem value="default">افتراضي</SelectItem>
    <SelectItem value="dark">داكن</SelectItem>
    <SelectItem value="neutral">محايد</SelectItem>
  </SelectGroup>

  {/* سمات الطبيعة */}
  <SelectGroup>
    <SelectLabel>سمات الطبيعة</SelectLabel>
    <SelectItem value="forest">غابة</SelectItem>
    <SelectItem value="ocean">محيط</SelectItem>
    <SelectItem value="sunset">غروب</SelectItem>
    <SelectItem value="mint">نعناعي</SelectItem>
    <SelectItem value="olive">زيتوني</SelectItem>
    <SelectItem value="autumn">خريف</SelectItem>
  </SelectGroup>

  {/* سمات ملونة */}
  <SelectGroup>
    <SelectLabel>سمات ملونة</SelectLabel>
    <SelectItem value="purple">بنفسجي</SelectItem>
    <SelectItem value="rose">وردي</SelectItem>
    <SelectItem value="coffee">قهوة</SelectItem>
    <SelectItem value="night">ليلي</SelectItem>
    <SelectItem value="tech">تقني</SelectItem>
  </SelectGroup>
</SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {diagramSettings.fontSize}px
              </span>
              <div className="flex items-center gap-2">
                <Label className="text-right">حجم الخط</Label>
                <TextQuote className="w-4 h-4" />
              </div>
            </div>
            <Slider
              value={[diagramSettings.fontSize]}
              onValueChange={(value) => handleSettingsChange('fontSize', value[0])}
              min={12}
              max={24}
              step={1}
            />
          </div>
        </CardContent>
      </Card>

      {/* اتجاه المخطط */}
      {config.settings.showDirection && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-right flex items-center justify-end gap-2">
              <ArrowUpDown className="w-5 h-5" />
              اتجاه المخطط
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={diagramSettings.direction}
              onValueChange={(value) => handleSettingsChange('direction', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الاتجاه" />
              </SelectTrigger>
              <SelectContent>
                {config.supportedDirections.map((direction) => (
                  <SelectItem key={direction} value={direction}>
                    {direction === 'TB' ? 'أعلى لأسفل' :
                     direction === 'LR' ? 'يسار ليمين' :
                     direction === 'RL' ? 'يمين ليسار' : 'أسفل لأعلى'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {/* نمط الخطوط */}
      {config.settings.showCurve && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-right flex items-center justify-end gap-2">
              <LineChart className="w-5 h-5" />
              نمط الخطوط
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={diagramSettings.curve}
              onValueChange={(value) => handleSettingsChange('curve', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر النمط" />
              </SelectTrigger>
              <SelectContent>
                {config.supportedCurves.map((curve) => (
                  <SelectItem key={curve} value={curve}>
                    {curve === 'linear' ? 'مستقيم' :
                     curve === 'basis' ? 'منحني' : 'متدرج'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {/* إعدادات إضافية */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-right flex items-center justify-end gap-2">
            <Settings2 className="w-5 h-5" />
            إعدادات إضافية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {config.settings.showLabels && (
            <div className="flex items-center justify-between">
              <Switch
                checked={diagramSettings.showLabels}
                onCheckedChange={(checked) => handleSettingsChange('showLabels', checked)}
              />
              <div className="flex items-center gap-2">
                <Label>إظهار التسميات</Label>
                <Tag className="w-4 h-4" />
              </div>
            </div>
          )}
          {config.settings.showMaxWidth && (
            <div className="flex items-center justify-between">
              <Switch
                checked={diagramSettings.useMaxWidth}
                onCheckedChange={(checked) => handleSettingsChange('useMaxWidth', checked)}
              />
              <div className="flex items-center gap-2">
                <Label>العرض الأقصى</Label>
                <Maximize className="w-4 h-4" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};