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
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-right flex items-center justify-end gap-2">
            <FileText className="w-5 h-5" />
            معلومات النظام
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-end gap-2">
              <Label htmlFor="systemName">اسم النظام</Label>
              <Tag className="w-4 h-4" />
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
         
          <div className="space-y-2">
            <div className="flex items-center justify-end gap-2">
              <Label htmlFor="description">وصف النظام</Label>
              <FileText className="w-4 h-4" />
            </div>
            <Textarea
              id="description"
              value={basicInfo.systemDescription}
              onChange={(e) => handleBasicInfoChange('systemDescription', e.target.value)}
              placeholder="اكتب وصفاً مختصراً للنظام..."
              className="min-h-[120px] text-right resize-none"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};