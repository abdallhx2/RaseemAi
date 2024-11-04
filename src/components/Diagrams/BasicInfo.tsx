'use client'

import React from 'react';
import { FileText, Tag, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BasicInfo } from '@/utils/types';

interface BasicInfoProps {
  basicInfo: BasicInfo;
  handleBasicInfoChange: (field: keyof BasicInfo, value: string) => void;
}

export const BasicInfoComponent: React.FC<BasicInfoProps> = ({
  basicInfo,
  handleBasicInfoChange
}) => {
  return (
    <div className="space-y-4 border-none shadow-none bg-transparent">
     <Card className="p-4 bg-transparent border-none shadow-none">
  <div className="space-y-2">
    <div className="flex items-center justify-start gap-2">
      <Tag className="w-4 h-4" />
      <Label htmlFor="systemName">اسم النظام</Label>
    </div>
    <Input
      id="systemName"
      type="text"
      value={basicInfo.systemName}
      onChange={(e) => handleBasicInfoChange('systemName', e.target.value)}
      placeholder="مثال: نظام إدارة المكتبة"
      className="text-right"
    />
  </div>
  .
  <div className="space-y-2">
    <div className="flex items-center justify-start gap-2">
      <FileText className="w-4 h-4" />
      <Label htmlFor="description">وصف النظام</Label>
    </div>
    <Textarea
      id="description"
      value={basicInfo.systemDescription}
      onChange={(e) => handleBasicInfoChange('systemDescription', e.target.value)}
      placeholder="اكتب وصفاً مختصراً للنظام..."
      className="min-h-[120px] text-right resize-none"
    />
  </div>
</Card>

    </div>
  );
};