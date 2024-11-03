// src/configs/diagram-configs.ts
import { Activity, Box, GitBranch, GitFork, Share2 } from 'lucide-react';
import { DiagramType, DiagramTypeOption, DiagramSettings } from '@/utils/types';

export const diagramConfigs: Record<DiagramType, DiagramTypeOption> = {
  flowchart: {
    id: 'flowchart',
    name: 'مخطط التدفق',
    description: 'مخطط لتوضيح تدفق العمليات والقرارات',
    icon: Activity,
    supportedDirections: ['TB', 'LR', 'RL', 'BT'],
    supportedCurves: ['linear', 'basis', 'step'],
    settings: {
      showDirection: true,
      showCurve: true,
      showLabels: true,
      showMaxWidth: true,
      showSpacing: true,
      showRankSpacing: true
    }
  },
  er: {
    id: 'er',
    name: 'مخطط العلاقات',
    description: 'مخطط لتوضيح العلاقات بين الكيانات',
    icon: Share2,
    supportedDirections: ['TB', 'LR'],
    supportedCurves: ['linear', 'step'],
    settings: {
      showDirection: true,
      showCurve: false,
      showLabels: true,
      showMaxWidth: true,
      showSpacing: false,
      showRankSpacing: false
    }
  },
  sequence: {
    id: 'sequence',
    name: 'مخطط التسلسل',
    description: 'مخطط لتوضيح تسلسل العمليات والتفاعلات',
    icon: GitFork,
    supportedDirections: ['TB'],
    supportedCurves: ['linear'],
    settings: {
      showDirection: false,
      showCurve: false,
      showLabels: true,
      showMaxWidth: true,
      showSpacing: false,
      showRankSpacing: false
    }
  },
  class: {
    id: 'class',
    name: 'مخطط الفئات',
    description: 'مخطط لتوضيح العلاقات بين الفئات',
    icon: Box,
    supportedDirections: ['TB', 'LR'],
    supportedCurves: ['linear', 'step'],
    settings: {
      showDirection: true,
      showCurve: false,
      showLabels: true,
      showMaxWidth: true,
      showSpacing: true,
      showRankSpacing: false
    }
  },
  state: {
    id: 'state',
    name: 'مخطط الحالة',
    description: 'مخطط لتوضيح حالات النظام والانتقالات',
    icon: GitBranch,
    supportedDirections: ['TB', 'LR', 'RL', 'BT'],
    supportedCurves: ['linear', 'basis', 'step'],
    settings: {
      showDirection: true,
      showCurve: true,
      showLabels: true,
      showMaxWidth: true,
      showSpacing: true,
      showRankSpacing: true
    }
  }
};

export const defaultDiagramSettings: DiagramSettings = {
  direction: 'TB',
  fontSize: 14,
  padding: 8,
  useMaxWidth: true,
  showLabels: true,
  style: 'default',
  entitySpacing: 30,
  rankSpacing: 50,
  curve: 'linear',
  defaultLinkColor: '#666'
};