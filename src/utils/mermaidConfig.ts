// utils/mermaid-config.ts
import mermaid from 'mermaid';
import { DiagramSettings, MermaidTheme } from '@/utils/types';

export const getThemeVariables = (theme: MermaidTheme, settings: DiagramSettings) => {
  const baseTheme = {
    fontFamily: 'Arial',
    fontSize: `${settings.fontSize}px`,
  };

  const themeColors = {
    default: {
      lineColor: '#000000',
      textColor: '#000000',
      mainBkg: '#ffffff',
      nodeBorder: '#000000',
      nodeTextColor: '#000000',
    },
    dark: {
      lineColor: '#ffffff',
      textColor: '#ffffff',
      mainBkg: '#1a1a1a',
      nodeBorder: '#ffffff',
      nodeTextColor: '#ffffff',
    },
    forest: {
      lineColor: '#193c3e',
      textColor: '#193c3e',
      mainBkg: '#cfe8e4',
      nodeBorder: '#193c3e',
      nodeTextColor: '#193c3e',
    },
    neutral: {
      lineColor: '#666666',
      textColor: '#333333',
      mainBkg: '#f5f5f5',
      nodeBorder: '#666666',
      nodeTextColor: '#333333',
    }
  };

  const colors = themeColors[theme];

  return {
    ...baseTheme,
    ...colors,
    clusterBkg: colors.mainBkg,
    edgeLabelBackground: colors.mainBkg,
    labelTextColor: colors.textColor,
    labelBoxBorderColor: colors.nodeBorder,
    labelBoxBkgColor: colors.mainBkg,
    sequenceNumberColor: colors.textColor,
    actorBorder: colors.nodeBorder,
    actorTextColor: colors.textColor,
    actorLineColor: colors.lineColor,
    signalColor: colors.lineColor,
    signalTextColor: colors.textColor,
    labelColor: colors.textColor,
    noteBkgColor: colors.mainBkg,
    noteBorderColor: colors.nodeBorder,
    noteTextColor: colors.textColor,
    activationBorderColor: colors.nodeBorder,
    activationBkgColor: colors.mainBkg,
    sequenceDiagramTitleColor: colors.textColor,
    messageFontWeight: 'normal'
  };
};

export const initializeMermaid = (theme: MermaidTheme, settings: DiagramSettings) => {
  const themeVariables = getThemeVariables(theme, settings);
  
  mermaid.initialize({
    startOnLoad: true,
    theme: theme,
    securityLevel: 'loose',
    er: { 
      diagramPadding: settings.padding,
      entityPadding: settings.entitySpacing,
    },
    flowchart: {
      padding: settings.padding,
      nodeSpacing: settings.entitySpacing,
      rankSpacing: settings.rankSpacing,
      useMaxWidth: settings.useMaxWidth,},
    sequence: {
      diagramMarginX: settings.padding,
      diagramMarginY: settings.padding,
      actorMargin: settings.entitySpacing,
      messageMargin: settings.rankSpacing,
    },
    themeVariables
  });
};

export const renderMermaidDiagram = async (
  code: string,
  theme: MermaidTheme,
  settings: DiagramSettings
): Promise<string | null> => {
  try {
    // تحديث الإعدادات قبل التصيير
    initializeMermaid(theme, settings);

    const cleanedCode = code.trim()
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/[^\x00-\x7F]/g, function(ch) {
        return '&#' + ch.charCodeAt(0) + ';';
      });

    await mermaid.parse(cleanedCode);
    const { svg } = await mermaid.render('mermaid-diagram', cleanedCode);
    return svg;
  } catch (error) {
    console.error('Error rendering diagram:', error);
    return null;
  }
};

export const themes = [
  { id: 'default' as MermaidTheme, name: 'افتراضي', description: 'سمة أساسية مع ألوان محايدة' },
  { id: 'dark' as MermaidTheme, name: 'داكن', description: 'سمة داكنة للعرض الليلي' },
  { id: 'forest' as MermaidTheme, name: 'غابة', description: 'سمة خضراء منعشة' },
  { id: 'neutral' as MermaidTheme, name: 'محايد', description: 'سمة رمادية متوازنة' }
];