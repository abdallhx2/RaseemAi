'use client'

import React from 'react';
import { Download, FileImage, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PreviewProps {
  loading: boolean;
  generatedSvg: string | null;
  onDownload: (type: string) => void;
}

export const Preview: React.FC<PreviewProps> = ({ loading, generatedSvg, onDownload }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-right flex items-center justify-end gap-2">
            <Eye className="w-5 h-5" />
            معاينة المخطط
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-[505px] w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
              </div>
            ) : generatedSvg ? (
              <div className="relative">
               

                {/* منطقة العرض */}
                
                <div className="relative w-full h-[505px] border rounded-lg bg-background/50">
                  <div 
                    dangerouslySetInnerHTML={{ __html: generatedSvg }}
                    className="absolute inset-0 p-4 overflow-auto flex items-center justify-center"
                    style={{
                      width: '100%',
                      height: '100%',
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[505px] border-2 border-dashed rounded-lg bg-muted/5">
                <FileImage className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">لم يتم إنشاء أي مخطط بعد</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};