'use client'

import React from 'react';
import { Activity, Box, GitBranch, GitFork, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DiagramType } from '@/utils/types';

const diagramTypes = [
  { id: 'flowchart', name: 'مخطط التدفق', icon: Activity },
  { id: 'er', name: 'مخطط العلاقات', icon: Share2 },
  { id: 'class', name: 'مخطط الفئات', icon: Box },
  { id: 'sequence', name: 'مخطط التسلسل', icon: GitFork },
  { id: 'state', name: 'مخطط الحالة', icon: GitBranch }
];

interface DiagramSidebarProps {
  diagramType: DiagramType;
  setDiagramType: (type: DiagramType) => void;
}

export const DiagramSidebar: React.FC<DiagramSidebarProps> = ({
  diagramType,
  setDiagramType,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-right">نوع المخطط</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {diagramTypes.map((type) => (
          <Button
            key={type.id}
            variant={diagramType === type.id ? "secondary" : "ghost"}
            className="w-full justify-start gap-2 text-right"
            onClick={() => setDiagramType(type.id as DiagramType)}
          >
            <type.icon className="w-4 h-4" />
            <span>{type.name}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};