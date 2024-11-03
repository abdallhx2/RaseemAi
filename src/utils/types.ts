import { LucideIcon } from 'lucide-react';

// src/types/types.ts

export type DiagramType = 'flowchart' | 'er' | 'sequence' | 'class' | 'state';
export type DiagramDirection = 'TB' | 'LR' | 'RL' | 'BT';
export type CurveStyle = 'linear' | 'basis' | 'step';
export type Theme = 'default' | 'dark' | 'forest' | 'neutral';

export interface DiagramTypeSettings {
  showDirection: boolean;
  showCurve: boolean;
  showLabels: boolean;
  showMaxWidth: boolean;
  showSpacing: boolean;
  showRankSpacing: boolean;
}

export interface DiagramTypeOption {
  id: DiagramType;
  name: string;
  description: string;
  icon: LucideIcon;
  supportedDirections: DiagramDirection[];
  supportedCurves: CurveStyle[];
  settings: DiagramTypeSettings;
}

export interface BasicInfo {
  systemName: string;
  systemDescription: string;
  version: string;
}

export interface DiagramSettings {
  direction: DiagramDirection;
  fontSize: number;
  padding: number;
  useMaxWidth: boolean;
  showLabels: boolean;
  style: 'default' | 'detailed';
  entitySpacing: number;
  rankSpacing: number;
  curve: CurveStyle;
  defaultLinkColor: string;
}
// السمات المتاحة
export type MermaidTheme = 'default' | 'dark' | 'forest' | 'neutral';


export interface MermaidConfig {
  theme: MermaidTheme;
  securityLevel: 'loose' | 'strict';
  startOnLoad: boolean;
  er?: {
    diagramPadding: number;
  };
  themeVariables: {
    fontFamily: string;
    fontSize: string;
    lineColor: string;
    textColor: string;
    mainBkg: string;
    clusterBkg: string;
    nodeTextColor: string;
    nodeBorder: string;
    edgeLabelBackground: string;
    labelTextColor: string;
    labelBoxBorderColor: string;
    labelBoxBkgColor: string;
    sequenceNumberColor: string;
    actorBorder: string;
    actorTextColor: string;
    actorLineColor: string;
    signalColor: string;
    signalTextColor: string;
    labelColor: string;
    noteBkgColor: string;
    noteBorderColor: string;
    noteTextColor: string;
    activationBorderColor: string;
    activationBkgColor: string;
    sequenceDiagramTitleColor: string;
    messageFontWeight: string;
  };
}