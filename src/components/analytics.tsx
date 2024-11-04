import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, BarChart2, Download } from 'lucide-react';

const StatsWidget = () => {
  // في حالة حقيقية، ستأتي هذه البيانات من Props أو API
  const stats = [
    {
      title: "إجمالي الزوار",
      value: "12,458",
      icon: Users,
      trendUp: true
    },
    {
      title: "المخططات المنشأة",
      value: "2,854",
      icon: BarChart2,
      trendUp: true
    },
    {
      title: "عمليات التحميل",
      value: "1,435",
      icon: Download,
      trendUp: true
    }
  ];

  return (
    <Card className="transition-all duration-300 hover:shadow-lg border-border max-w-md mx-auto">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex-1">
              <div className="flex items-center gap-1 mb-1">
               
                  <stat.icon className="w-5 h-5 text-primary" />
               
                <span className="text-sm text-muted-foreground">
                  {stat.title}
                </span>
              </div>
              
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {stat.value}
                </span>
               
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsWidget;