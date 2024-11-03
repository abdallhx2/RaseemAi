import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, AlertCircle, CheckCircle2 } from "lucide-react";

const tips = [
  {
    icon: Lightbulb,
    title: "وصف دقيق",
    description: "اكتب وصفاً تفصيلياً للنظام يشمل جميع المكونات والعلاقات المهمة"
  },
  {
    icon: CheckCircle2,
    title: "اختيار النوع",
    description: "اختر نوع المخطط المناسب لطبيعة النظام والمعلومات التي تريد توضيحها"
  },
  {
    icon: AlertCircle,
    title: "إعدادات متقدمة",
    description: "اضبط الإعدادات المتقدمة لتحسين مظهر وتنظيم المخطط"
  }
];

export function DiagramTips() {
  return (
    <div className="mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tips.map(({ icon: Icon, title, description }, index) => (
          <Card 
            key={index}
            className="bg-primary/10 dark:bg-primary/5 
                     border-primary/20 dark:border-primary/10 
                     transition-all duration-300
                     hover:scale-105 hover:shadow-lg 
                     hover:bg-primary hover:border-primary
                     dark:hover:bg-primary dark:hover:border-primary
                     cursor-pointer group"
          >
            <CardContent className="p-4 flex items-start gap-3">
              <Icon className="h-5 w-5 text-primary dark:text-primary/80 
                             transition-all duration-300 
                             group-hover:text-background dark:group-hover:text-background 
                             group-hover:rotate-12" />
              <div>
                <h4 className="font-bold mb-1 
                              text-foreground dark:text-foreground
                              transition-colors duration-300
                              group-hover:text-background dark:group-hover:text-background">
                  {title}
                </h4>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground
                             transition-colors duration-300
                             group-hover:text-background/90 dark:group-hover:text-background/90">
                  {description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}