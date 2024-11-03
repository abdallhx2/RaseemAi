import { Anthropic } from '@anthropic-ai/sdk';

import { DiagramType, DiagramSettings, BasicInfo } from './types';

const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true
});
export const DIAGRAM_TEMPLATES = {
  er: `erDiagram
    %% Library Management System Example
    BOOK ||--o{ BORROWING : "is borrowed"
    MEMBER ||--o{ BORROWING : "borrows"
    BOOK {
        string ISBN
        string title
        string author
        date publishDate
        int copies
    }
    MEMBER {
        int id
        string name
        string email
        date joinDate
    }
    BORROWING {
        date borrowDate
        date dueDate
        date returnDate
    }`,
  
  flowchart: `flowchart TB
    %% New User Registration Process
    Start([Start]) --> CheckEmail{Email exists?}
    CheckEmail -->|Yes| ShowError[Display error message]
    CheckEmail -->|No| ValidateData{Validate data}
    ValidateData -->|Valid| SaveUser[Save user]
    ValidateData -->|Invalid| ShowValidationError[Show validation errors]
    SaveUser --> SendEmail[Send welcome email]
    SendEmail --> Finish([End])
    ShowError --> Finish
    ShowValidationError --> Finish`,
  
  sequence: `sequenceDiagram
    %% Login Process
    actor User as User
    participant Auth as Authentication System
    participant DB as Database
    
    User->>+Auth: Enter credentials
    Auth->>+DB: Verify credentials
    DB-->>-Auth: Verification result
    alt valid credentials
        Auth-->>User: Login successful
    else invalid credentials
        Auth-->>User: Login failed
    end`,
  
  class: `classDiagram
    %% School Management System
    class School {
        +String name
        +String address
        +addClass()
        +addTeacher()
    }
    class Class {
        +String classNumber
        +int capacity
        +addStudent()
        +assignTeacher()
    }
    class Teacher {
        +String name
        +String specialization
        +teachSubject()
    }
    class Student {
        +String name
        +int idNumber
        +enrollSubject()
    }
    School "1" *-- "many" Class
    Class "1" o-- "many" Student
    Teacher "1" --> "many" Class`,
    
  state: `stateDiagram-v2
    %% E-commerce Order States
    [*] --> New
    New --> Processing: Order confirmed
    Processing --> Shipped: Product shipped
    Shipped --> Delivered: Customer received
    Delivered --> [*]
    
    Processing --> Cancelled: Cancel request
    Shipped --> Returned: Return request
    Cancelled --> [*]
    Returned --> RefundProcessed: Return received
    RefundProcessed --> [*]`
};


// إعداد قالب المخطط بناءً على نوع المخطط ومعلومات النظام
const prepareTemplatePrompt = (
  diagramType: DiagramType, 
  basicInfo: BasicInfo
): string => {
  const baseTemplate = DIAGRAM_TEMPLATES[diagramType];
  return `Here's a template for reference:
${baseTemplate}

Please create a similar ${diagramType} diagram for the system "${basicInfo.systemName}" 
considering its description and requirements. Use Arabic text where appropriate.`;
};

// تحليل وصف النظام لاستخراج الكيانات والعلاقات الرئيسية
const analyzeSystemDescription = (description: string): string => {
  return `Based on the system description:
"${description}"

Please identify and include these aspects in the diagram:
1. Main entities/components mentioned
2. Key relationships and interactions
3. Important processes and workflows
4. States and transitions (if applicable)
5. Any specific business rules or constraints mentioned`;
};


export const generateDiagram = async (
    basicInfo: BasicInfo,
    diagramType: DiagramType,
    settings: DiagramSettings
   ): Promise<string> => {
    try {
      const prompt = `Create concise ${diagramType} Mermaid diagram for system "${basicInfo.systemName}":
   ${basicInfo.systemDescription}
   Direction: ${settings.direction}
   Style: ${settings.style}
   Use Just English text, comments.
   Example template:
   ${DIAGRAM_TEMPLATES[diagramType]}
   Return only Mermaid code, max 20 lines.`;
   
      const msg = await anthropic.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 300, // تقليل الحد الأقصى للـ tokens
        temperature: 0.4, // زيادة الإبداع لتوليد مخططات مختصرة
        messages: [{ role: 'user', content: prompt }]
      });
   
      const response = msg.content[0].type === 'text' ? msg.content[0].text.trim() : '';
      return response.replace(/```(?:mermaid)?\n?([\s\S]*?)```/g, '$1').trim() || response;
    } catch (error) {
      throw new Error('فشل في توليد المخطط');
    }
   };


export const validateSettings = (settings: DiagramSettings): boolean => {
    // التحقق من الخصائص المطلوبة بشكل صريح
    return (
      settings.direction !== undefined &&
      settings.fontSize !== undefined &&
      settings.style !== undefined &&
      settings.showLabels !== undefined &&
      settings.useMaxWidth !== undefined
    );
  };
  

  export const validateSettingsSimple = (settings: DiagramSettings): boolean => {
    const { direction, fontSize, style } = settings;
    return (
      direction !== undefined &&
      fontSize !== undefined &&
      style !== undefined
    );
  };
  
  
  // دالة مساعدة للتحقق من صحة المعلومات الأساسية
  export const validateBasicInfo = (info: BasicInfo): boolean => {
    return Boolean(info.systemName && info.systemDescription);
  };