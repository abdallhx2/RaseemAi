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
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-right flex items-center justify-end gap-2">
            <Eye className="w-5 h-5" />
            معاينة المخطط
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-[600px]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
              </div>
            ) : generatedSvg ? (
              <div className="relative group">
                <div className="relative h-[600px] border rounded-lg bg-background/50">
                  <div 
                    dangerouslySetInnerHTML={{ __html: generatedSvg }}
                    className="absolute inset-0 p-4 overflow-auto"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '100%',
                      minWidth: '100%'
                    }}
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-blue-500/0 to-purple-600/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[600px] border-2 border-dashed rounded-lg bg-muted/5 transition-all duration-300 hover:bg-muted/10 group">
                <FileImage className="w-12 h-12 text-muted-foreground mb-4 transition-transform duration-300 group-hover:scale-110" />
                <p className="text-muted-foreground">
                  لم يتم إنشاء أي مخطط بعد
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};