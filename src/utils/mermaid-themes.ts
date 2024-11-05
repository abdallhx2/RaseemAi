// // themes/mermaid-themes.ts
// import { MermaidTheme } from '@/utils/types';

// export interface ThemeColors {
//   lineColor: string;
//   textColor: string;
//   mainBkg: string;
//   nodeBorder: string;
//   nodeTextColor: string;
// }

// export const themeColors: Record<MermaidTheme, ThemeColors> = {
//     default: {
//         lineColor: '#2C3E50',
//         textColor: '#34495E',
//         mainBkg: '#ECF0F1',
//         nodeBorder: '#2C3E50',
//         nodeTextColor: '#2C3E50',
//     },
//     dark: {
//         lineColor: '#E0E0E0',
//         textColor: '#F5F5F5',
//         mainBkg: '#2C3440',
//         nodeBorder: '#E0E0E0',
//         nodeTextColor: '#F5F5F5',
//     },
//     forest: {
//         lineColor: '#2E7D32',      // أخضر غامق
//         textColor: '#1B5E20',      // أخضر داكن
//         mainBkg: '#E8F5E9',        // أخضر فاتح جداً
//         nodeBorder: '#2E7D32',     
//         nodeTextColor: '#1B5E20',  
//       },
//       neutral: {
//         lineColor: '#757575',      // رمادي متوسط
//         textColor: '#424242',      // رمادي داكن
//         mainBkg: '#FAFAFA',        // رمادي فاتح جداً
//         nodeBorder: '#757575',     
//         nodeTextColor: '#424242',  
//       },
//       // سمات جديدة
//       ocean: {
//         lineColor: '#0277BD',      // أزرق محيطي غامق
//         textColor: '#01579B',      // أزرق عميق
//         mainBkg: '#E1F5FE',        // أزرق فاتح جداً
//         nodeBorder: '#0277BD',
//         nodeTextColor: '#01579B',
//       },
//       sunset: {
//         lineColor: '#E64A19',      // برتقالي غروب
//         textColor: '#BF360C',      // برتقالي محمر
//         mainBkg: '#FBE9E7',        // برتقالي فاتح جداً
//         nodeBorder: '#E64A19',
//         nodeTextColor: '#BF360C',
//       },
//       purple: {
//         lineColor: '#7B1FA2',      // بنفسجي غامق
//         textColor: '#4A148C',      // بنفسجي داكن
//         mainBkg: '#F3E5F5',        // بنفسجي فاتح جداً
//         nodeBorder: '#7B1FA2',
//         nodeTextColor: '#4A148C',
//       },
//       mint: {
//         lineColor: '#00897B',      // نعناعي غامق
//         textColor: '#004D40',      // نعناعي داكن
//         mainBkg: '#E0F2F1',        // نعناعي فاتح جداً
//         nodeBorder: '#00897B',
//         nodeTextColor: '#004D40',
//       },
//       rose: {
//         lineColor: '#C2185B',      // وردي غامق
//         textColor: '#880E4F',      // وردي داكن
//         mainBkg: '#FCE4EC',        // وردي فاتح جداً
//         nodeBorder: '#C2185B',
//         nodeTextColor: '#880E4F',
//       },
//       coffee: {
//         lineColor: '#795548',      // بني غامق
//         textColor: '#3E2723',      // بني داكن
//         mainBkg: '#EFEBE9',        // بني فاتح جداً
//         nodeBorder: '#795548',
//         nodeTextColor: '#3E2723',
//       },
//       autumn: {
//         lineColor: '#F57C00',      // برتقالي خريفي
//         textColor: '#E65100',      // برتقالي محمر
//         mainBkg: '#FFF3E0',        // برتقالي فاتح جداً
//         nodeBorder: '#F57C00',
//         nodeTextColor: '#E65100',
//       },
//       night: {
//         lineColor: '#1A237E',      // كحلي غامق
//         textColor: '#0D47A1',      // أزرق ليلي
//         mainBkg: '#E8EAF6',        // أزرق فاتح جداً
//         nodeBorder: '#1A237E',
//         nodeTextColor: '#0D47A1',
//       },
//       olive: {
//         lineColor: '#827717',      // زيتوني غامق
//         textColor: '#3E4437',      // زيتوني داكن
//         mainBkg: '#F9FBE7',        // زيتوني فاتح جداً
//         nodeBorder: '#827717',
//         nodeTextColor: '#3E4437',
//       },
//       tech: {
//         lineColor: '#006064',      // سماوي تقني
//         textColor: '#00363A',      // سماوي داكن
//         mainBkg: '#E0F7FA',        // سماوي فاتح جداً
//         nodeBorder: '#006064',
//         nodeTextColor: '#00363A',
//       }
// };

// export const themesConfig = [
//   { id: 'default' as MermaidTheme, name: 'افتراضي', description: 'سمة أساسية مع ألوان زرقاء هادئة' },
//   { id: 'dark' as MermaidTheme, name: 'داكن', description: 'سمة داكنة للعرض الليلي' },
//   // ... (باقي تكوينات الثيمات)
// ];

// // export const themes = [
// //     { id: 'default' as MermaidTheme, name: 'افتراضي', description: 'سمة أساسية مع ألوان زرقاء هادئة' },
// //     { id: 'dark' as MermaidTheme, name: 'داكن', description: 'سمة داكنة للعرض الليلي' },
// //     { id: 'forest' as MermaidTheme, name: 'غابة', description: 'سمة خضراء منعشة مستوحاة من الطبيعة' },
// //     { id: 'neutral' as MermaidTheme, name: 'محايد', description: 'سمة رمادية متوازنة للمظهر الاحترافي' },
// //     { id: 'ocean' as MermaidTheme, name: 'محيط', description: 'سمة زرقاء هادئة مستوحاة من المحيط' },
// //     { id: 'sunset' as MermaidTheme, name: 'غروب', description: 'سمة برتقالية دافئة بألوان الغروب' },
// //     { id: 'purple' as MermaidTheme, name: 'بنفسجي', description: 'سمة بنفسجية أنيقة وعصرية' },
// //     { id: 'mint' as MermaidTheme, name: 'نعناعي', description: 'سمة خضراء منعشة بدرجات النعناع' },
// //     { id: 'rose' as MermaidTheme, name: 'وردي', description: 'سمة وردية ناعمة وجذابة' },
// //     { id: 'coffee' as MermaidTheme, name: 'قهوة', description: 'سمة بنية دافئة بدرجات القهوة' },
// //     { id: 'autumn' as MermaidTheme, name: 'خريف', description: 'سمة خريفية دافئة بألوان الطبيعة' },
// //     { id: 'night' as MermaidTheme, name: 'ليلي', description: 'سمة كحلية عميقة مستوحاة من الليل' },
// //     { id: 'olive' as MermaidTheme, name: 'زيتوني', description: 'سمة زيتونية طبيعية وهادئة' },
// //     { id: 'tech' as MermaidTheme, name: 'تقني', description: 'سمة تقنية عصرية بألوان مميزة' }
// //   ];