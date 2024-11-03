"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Github, 
  Twitter, 
  Linkedin,
  Mail,
  Code2,
  Briefcase,
  GraduationCap
} from "lucide-react";

const experienceCards = [
  {
    icon: Code2,
    title: "خبرة تقنية",
    subtitle: "+5 سنوات من الخبرة",
    items: ["تطوير تطبيقات الويب", "تطوير واجهات المستخدم", "تطوير تطبيقات الجوال"]
  },
  {
    icon: Briefcase,
    title: "المشاريع",
    subtitle: "أحدث الأعمال",
    items: ["منشئ المخططات الذكي", "نظام تحليل الأستبيان", "منصة تنفيذ للخدمات العامة"]
  },
  {
    icon: GraduationCap,
    title: "التعليم",
    subtitle: "المؤهلات العلمية",
    items: ["بكالوريوس علوم حاسب", "شهادات تقنية معتمدة", "دورات تطوير متقدمة"]
  }
];

const skills = ["Next.js", "Dart", "TypeScript", "Flutter"];

export default function AboutPage() {
  return (
    <main className="min-h-screen py-10">
      <div className="container max-w-4xl mx-auto px-4">
        {/* القسم الرئيسي - الصورة والمعلومات */}
        <section className="mb-16">
          {/* الصورة الشخصية - دائماً في الأعلى على الجوال */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 animate-pulse" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/10" />
              <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-primary/20">
                <Image
                  src="/12.jpg"
                  alt="عبدالله الحسني"
                  fill
                  className="rounded-full object-cover transition-transform duration-300 hover:scale-110"
                  priority
                />
              </div>
            </div>
          </div>

          {/* المعلومات الشخصية */}
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                عبدالله الحسني
              </h1>
              <p className="text-lg text-muted-foreground">
                مطور واجهات ومهندس برمجيات
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className="text-sm hover:bg-primary/20 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              مطور برمجيات متخصص في تطوير واجهات المستخدم وبناء تجارب مستخدم استثنائية.
              أسعى دائماً لتطوير حلول مبتكرة وفعالة تجمع بين الأداء العالي والتصميم السلس.
            </p>

            <div className="flex justify-center gap-4">
              <Button variant="default" className="gap-2 transition-transform hover:scale-105">
                <Mail className="w-4 h-4" />
                تواصل معي
              </Button>
              <Button variant="outline" className="gap-2 transition-transform hover:scale-105">
                <Github className="w-4 h-4" />
                GitHub
              </Button>
            </div>
          </div>
        </section>

        {/* قسم الخبرات */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {experienceCards.map(({ icon: Icon, title, subtitle, items }, index) => (
            <Card
              key={index}
              className="p-6 space-y-4 bg-primary/10 border-primary/20 
                       transition-all duration-300 hover:scale-105 
                       hover:shadow-lg hover:bg-primary/90 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Icon className="w-6 h-6 text-primary transition-all duration-300 
                                 group-hover:text-white group-hover:rotate-12" />
                </div>
                <div>
                  <h3 className="font-bold group-hover:text-white">{title}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-white/90">
                    {subtitle}
                  </p>
                </div>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2 group-hover:text-white/90">
                {items.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </section>

        {/* وسائل التواصل */}
        <section>
          <Card className="p-6 bg-primary/5 hover:bg-primary/10 transition-colors">
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Mail, label: "البريد الإلكتروني" }
              ].map(({ icon: Icon, label }, index) => (
                <Button 
                  key={index}
                  variant="ghost" 
                  className="gap-2 transition-transform hover:scale-105"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}