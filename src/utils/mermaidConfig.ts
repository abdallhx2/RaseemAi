// utils/mermaid-config.ts
import mermaid from 'mermaid';
import { DiagramSettings, MermaidTheme } from '@/utils/types';
import React, { useEffect } from 'react';

export const getThemeVariables = (theme: MermaidTheme, settings: DiagramSettings) => {
  const baseTheme = {
    fontFamily: 'Arial',
    fontSize: `${settings.fontSize}px`,
  };
  const themeColors = {
    default: {
      lineColor: '#2C3E50',      // أزرق داكن مائل للرمادي
      textColor: '#34495E',      // أزرق رمادي
      mainBkg: '#ECF0F1',        // رمادي فاتح مائل للأزرق
      nodeBorder: '#2C3E50',     
      nodeTextColor: '#2C3E50',  
    },
    dark: {
      lineColor: '#E0E0E0',      // رمادي فاتح
      textColor: '#F5F5F5',      // أبيض مائل للرمادي
      mainBkg: '#2C3440',        // رمادي داكن مائل للأزرق
      nodeBorder: '#E0E0E0',     
      nodeTextColor: '#F5F5F5',  
    },
    forest: {
      lineColor: '#2E7D32',      // أخضر غامق
      textColor: '#1B5E20',      // أخضر داكن
      mainBkg: '#E8F5E9',        // أخضر فاتح جداً
      nodeBorder: '#2E7D32',     
      nodeTextColor: '#1B5E20',  
    },
    neutral: {
      lineColor: '#757575',      // رمادي متوسط
      textColor: '#424242',      // رمادي داكن
      mainBkg: '#FAFAFA',        // رمادي فاتح جداً
      nodeBorder: '#757575',     
      nodeTextColor: '#424242',  
    },
    // سمات جديدة
    ocean: {
      lineColor: '#0277BD',      // أزرق محيطي غامق
      textColor: '#01579B',      // أزرق عميق
      mainBkg: '#E1F5FE',        // أزرق فاتح جداً
      nodeBorder: '#0277BD',
      nodeTextColor: '#01579B',
    },
    sunset: {
      lineColor: '#E64A19',      // برتقالي غروب
      textColor: '#BF360C',      // برتقالي محمر
      mainBkg: '#FBE9E7',        // برتقالي فاتح جداً
      nodeBorder: '#E64A19',
      nodeTextColor: '#BF360C',
    },
    purple: {
      lineColor: '#7B1FA2',      // بنفسجي غامق
      textColor: '#4A148C',      // بنفسجي داكن
      mainBkg: '#F3E5F5',        // بنفسجي فاتح جداً
      nodeBorder: '#7B1FA2',
      nodeTextColor: '#4A148C',
    },
    mint: {
      lineColor: '#00897B',      // نعناعي غامق
      textColor: '#004D40',      // نعناعي داكن
      mainBkg: '#E0F2F1',        // نعناعي فاتح جداً
      nodeBorder: '#00897B',
      nodeTextColor: '#004D40',
    },
    rose: {
      lineColor: '#C2185B',      // وردي غامق
      textColor: '#880E4F',      // وردي داكن
      mainBkg: '#FCE4EC',        // وردي فاتح جداً
      nodeBorder: '#C2185B',
      nodeTextColor: '#880E4F',
    },
    coffee: {
      lineColor: '#795548',      // بني غامق
      textColor: '#3E2723',      // بني داكن
      mainBkg: '#EFEBE9',        // بني فاتح جداً
      nodeBorder: '#795548',
      nodeTextColor: '#3E2723',
    },
    autumn: {
      lineColor: '#F57C00',      // برتقالي خريفي
      textColor: '#E65100',      // برتقالي محمر
      mainBkg: '#FFF3E0',        // برتقالي فاتح جداً
      nodeBorder: '#F57C00',
      nodeTextColor: '#E65100',
    },
    night: {
      lineColor: '#1A237E',      // كحلي غامق
      textColor: '#0D47A1',      // أزرق ليلي
      mainBkg: '#E8EAF6',        // أزرق فاتح جداً
      nodeBorder: '#1A237E',
      nodeTextColor: '#0D47A1',
    },
    olive: {
      lineColor: '#827717',      // زيتوني غامق
      textColor: '#3E4437',      // زيتوني داكن
      mainBkg: '#F9FBE7',        // زيتوني فاتح جداً
      nodeBorder: '#827717',
      nodeTextColor: '#3E4437',
    },
    tech: {
      lineColor: '#006064',      // سماوي تقني
      textColor: '#00363A',      // سماوي داكن
      mainBkg: '#E0F7FA',        // سماوي فاتح جداً
      nodeBorder: '#006064',
      nodeTextColor: '#00363A',
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
  { id: 'default' as MermaidTheme, name: 'افتراضي', description: 'سمة أساسية مع ألوان زرقاء هادئة' },
  { id: 'dark' as MermaidTheme, name: 'داكن', description: 'سمة داكنة للعرض الليلي' },
  { id: 'forest' as MermaidTheme, name: 'غابة', description: 'سمة خضراء منعشة مستوحاة من الطبيعة' },
  { id: 'neutral' as MermaidTheme, name: 'محايد', description: 'سمة رمادية متوازنة للمظهر الاحترافي' },
  { id: 'ocean' as MermaidTheme, name: 'محيط', description: 'سمة زرقاء هادئة مستوحاة من المحيط' },
  { id: 'sunset' as MermaidTheme, name: 'غروب', description: 'سمة برتقالية دافئة بألوان الغروب' },
  { id: 'purple' as MermaidTheme, name: 'بنفسجي', description: 'سمة بنفسجية أنيقة وعصرية' },
  { id: 'mint' as MermaidTheme, name: 'نعناعي', description: 'سمة خضراء منعشة بدرجات النعناع' },
  { id: 'rose' as MermaidTheme, name: 'وردي', description: 'سمة وردية ناعمة وجذابة' },
  { id: 'coffee' as MermaidTheme, name: 'قهوة', description: 'سمة بنية دافئة بدرجات القهوة' },
  { id: 'autumn' as MermaidTheme, name: 'خريف', description: 'سمة خريفية دافئة بألوان الطبيعة' },
  { id: 'night' as MermaidTheme, name: 'ليلي', description: 'سمة كحلية عميقة مستوحاة من الليل' },
  { id: 'olive' as MermaidTheme, name: 'زيتوني', description: 'سمة زيتونية طبيعية وهادئة' },
  { id: 'tech' as MermaidTheme, name: 'تقني', description: 'سمة تقنية عصرية بألوان مميزة' }
];