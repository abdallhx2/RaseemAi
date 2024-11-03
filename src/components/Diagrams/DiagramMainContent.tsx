/* eslint-disable react/display-name */
import React, { useEffect, useCallback, memo } from 'react';
import { FileCode2, Settings2, LayoutTemplate, Download, Wand2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { BasicInfo, DiagramSettings, DiagramType } from '@/utils/types';
import { diagramConfigs } from '@/utils/diagram-configs';
import { DiagramTips } from './diagram-tips';


type BasicInfoSetter = React.Dispatch<React.SetStateAction<BasicInfo>>;
type DiagramSettingsSetter = React.Dispatch<React.SetStateAction<DiagramSettings>>;

// تعريف Props للمكونات
interface DiagramMainContentProps {
  basicInfo: BasicInfo;
  setBasicInfo:BasicInfoSetter
  diagramSettings: DiagramSettings;
  setDiagramSettings: DiagramSettingsSetter;  // تحديث النوع
  selectedDiagramType: DiagramType;
  generatedSvg: string;
  loading: boolean;
  onGenerate: () => void;
  onDownload: () => void;
}

interface BasicInfoProps {
  basicInfo: BasicInfo;
  onBasicInfoChange: (field: keyof BasicInfo, value: string) => void;
}

interface DiagramSettingsProps {
  diagramSettings: DiagramSettings;
  onSettingsChange: (field: keyof DiagramSettings, value: unknown) => void;
  selectedDiagramType: DiagramType;
  config: typeof diagramConfigs[DiagramType];
}

// مكون المعلومات الأساسية
const BasicInfoContent = memo(({ basicInfo, onBasicInfoChange }: BasicInfoProps) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label className="text-right block">اسم النظام</Label>
        <Input
          name="systemName"
          value={basicInfo.systemName}
          onChange={(e) => onBasicInfoChange('systemName', e.target.value)}
          className="text-right"
          placeholder="مثال: نظام إدارة المكتبة"
          dir="rtl"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-right block">الإصدار</Label>
        <Input
          name="version"
          value={basicInfo.version}
          onChange={(e) => onBasicInfoChange('version', e.target.value)}
          className="text-right"
          placeholder="1.0.0"
          dir="rtl"
        />
      </div>
    </div>
    
    <div className="space-y-2">
      <Label className="text-right block">وصف النظام</Label>
      <Textarea
        name="systemDescription"
        value={basicInfo.systemDescription}
        onChange={(e) => onBasicInfoChange('systemDescription', e.target.value)}
        className="h-32 text-right resize-none"
        placeholder="اكتب وصفاً مختصراً للنظام..."
        dir="rtl"
      />
    </div>
  </div>
));

// مكون إعدادات المخطط
const DiagramSettingsContent = memo(({ 
  diagramSettings, 
  onSettingsChange,
  config 
}: DiagramSettingsProps) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {config.settings.showDirection && (
        <div className="space-y-2">
          <Label className="text-right block">اتجاه المخطط</Label>
          <Select
            value={diagramSettings.direction}
            onValueChange={(value) => onSettingsChange('direction', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر الاتجاه" />
            </SelectTrigger>
            <SelectContent>
              {config.supportedDirections.map((direction) => (
                <SelectItem key={direction} value={direction}>
                  {direction === 'TB' ? 'أعلى لأسفل' :
                   direction === 'LR' ? 'يسار ليمين' :
                   direction === 'RL' ? 'يمين ليسار' :
                   'أسفل لأعلى'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      {config.settings.showCurve && (
        <div className="space-y-2">
          <Label className="text-right block">نمط الخطوط</Label>
          <Select
            value={diagramSettings.curve}
            onValueChange={(value) => onSettingsChange('curve', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر النمط" />
            </SelectTrigger>
            <SelectContent>
              {config.supportedCurves.map((curve) => (
                <SelectItem key={curve} value={curve}>
                  {curve === 'linear' ? 'مستقيم' :
                   curve === 'basis' ? 'منحني' :
                   'متدرج'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>

    {(config.settings.showLabels || config.settings.showMaxWidth) && (
      <Card className="border-border/30">
        <CardContent className="p-4 space-y-4">
          {config.settings.showLabels && (
            <div className="flex items-center justify-between">
              <Label className="text-right">إظهار التسميات</Label>
              <Switch
                checked={diagramSettings.showLabels}
                onCheckedChange={(checked) => onSettingsChange('showLabels', checked)}
              />
            </div>
          )}
          {config.settings.showMaxWidth && (
            <div className="flex items-center justify-between">
              <Label className="text-right">استخدام العرض الأقصى</Label>
              <Switch
                checked={diagramSettings.useMaxWidth}
                onCheckedChange={(checked) => onSettingsChange('useMaxWidth', checked)}
              />
            </div>
          )}
        </CardContent>
      </Card>
    )}

    {(config.settings.showSpacing || config.settings.showRankSpacing) && (
      <Card className="border-border/30">
        <CardContent className="p-4 space-y-4">
          {config.settings.showSpacing && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {diagramSettings.entitySpacing}px
                </span>
                <Label className="text-right">المسافة بين العناصر</Label>
              </div>
              <Slider
                value={[diagramSettings.entitySpacing]}
                onValueChange={(value) => onSettingsChange('entitySpacing', value[0])}
                min={20}
                max={100}
                step={5}
              />
            </div>
          )}

          {config.settings.showRankSpacing && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {diagramSettings.rankSpacing}px
                </span>
                <Label className="text-right">المسافة بين المستويات</Label>
              </div>
              <Slider
                value={[diagramSettings.rankSpacing]}
                onValueChange={(value) => onSettingsChange('rankSpacing', value[0])}
                min={30}
                max={120}
                step={5}
              />
            </div>
          )}
        </CardContent>
      </Card>
    )}
  </div>
));

// المكون الرئيسي
export const DiagramMainContent: React.FC<DiagramMainContentProps> = ({
  basicInfo,
  setBasicInfo,
  diagramSettings,
  setDiagramSettings,
  selectedDiagramType,
  generatedSvg,
  loading,
  onGenerate,
  onDownload,
}) => {
  // معالجة تغيير المعلومات الأساسية
  const handleBasicInfoChange = useCallback((field: keyof BasicInfo, value: string) => {
    const updatedInfo = {
      ...basicInfo,
      [field]: value
    };
    setBasicInfo(updatedInfo);
  }, [basicInfo, setBasicInfo]);

  // معالجة تغيير الإعدادات
  const handleSettingsChange = useCallback((field: keyof DiagramSettings, value: unknown) => {
    const updatedSettings = {
      ...diagramSettings,
      [field]: value
    };
    setDiagramSettings(updatedSettings);
  }, [diagramSettings, setDiagramSettings]);

  // تحديث الإعدادات عند تغيير نوع المخطط
  useEffect(() => {
    const config = diagramConfigs[selectedDiagramType];
    let needsUpdate = false;
    const updatedSettings = { ...diagramSettings };

    // تحديث الاتجاه فقط إذا كان غير مدعوم في النوع الجديد
    if (!config.supportedDirections.includes(diagramSettings.direction)) {
      updatedSettings.direction = config.supportedDirections[0];
      needsUpdate = true;
    }

    // تحديث نمط المنحنى فقط إذا كان غير مدعوم في النوع الجديد
    if (!config.supportedCurves.includes(diagramSettings.curve)) {
      updatedSettings.curve = config.supportedCurves[0];
      needsUpdate = true;
    }

    // تحديث المسافات فقط إذا كانت غير مدعومة
    if (!config.settings.showSpacing && diagramSettings.entitySpacing !== 30) {
      updatedSettings.entitySpacing = 30;
      needsUpdate = true;
    }

    if (!config.settings.showRankSpacing && diagramSettings.rankSpacing !== 50) {
      updatedSettings.rankSpacing = 50;
      needsUpdate = true;
    }

    // تطبيق التحديثات فقط إذا كانت هناك تغييرات فعلية
    if (needsUpdate) {
      setDiagramSettings(updatedSettings);
    }
  }, [diagramSettings, selectedDiagramType, setDiagramSettings]); // تبعية فقط لنوع المخطط المحدد

  const config = diagramConfigs[selectedDiagramType];

  // باقي الكود للعرض...
  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-border/50">
        <CardContent className="p-0">
          <Tabs defaultValue="basic" dir="rtl">
            <TabsList className="w-full justify-start p-0 bg-transparent border-b h-auto">
              {[
                { id: 'basic', label: 'المعلومات الأساسية', icon: FileCode2 },
                { id: 'settings', label: 'إعدادات المخطط', icon: Settings2 },
                { id: 'preview', label: 'معاينة', icon: LayoutTemplate }
              ].map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3"
                >
                  <tab.icon className="w-4 h-4 ml-2" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="p-6">
              <TabsContent value="basic">
                <BasicInfoContent 
                  basicInfo={basicInfo}
                  onBasicInfoChange={handleBasicInfoChange}
                />
              </TabsContent>

              <TabsContent value="settings">
                <DiagramSettingsContent 
                  diagramSettings={diagramSettings}
                  onSettingsChange={handleSettingsChange}
                  selectedDiagramType={selectedDiagramType}
                  config={config}
                />
              </TabsContent>

              <TabsContent value="preview">
                <div className="bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between p-4 border-b">
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={onDownload}
                      disabled={!generatedSvg}
                    >
                      <Download className="w-4 h-4" />
                      تحميل المخطط
                    </Button>
                    <h3 className="font-medium">معاينة المخطط</h3>
                  </div>
                  <div className="p-4">
                    {generatedSvg ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: generatedSvg }}
                        className="flex justify-center overflow-auto max-h-[600px]"
                      />
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        قم بإنشاء المخطط لعرض المعاينة
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <DiagramTips />

      <Button
        onClick={onGenerate}
        disabled={loading}
        className="w-full h-12 gap-2"
      >
        <Wand2 className="w-5 h-5" />
        {loading ? 'جاري الإنشاء...' : 'إنشاء المخطط'}
      </Button>
    </div>
  );
};