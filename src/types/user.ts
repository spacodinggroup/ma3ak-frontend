export enum UserRole {
  STUDENT = 'student',
  BUSINESS = 'business',
  FOUNDER = 'founder',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  requests: number;
  streak: number;
  lastActiveAt?: Date;
  createdAt: Date;
  disabled: boolean;
}

export interface RoleConfig {
  id: UserRole;
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

export const ROLE_CONFIGS: RoleConfig[] = [
  {
    id: UserRole.STUDENT,
    title: 'Student',
    description: 'AI study assistant for learning, exams, and academic success',
    icon: '🎓',
    color: 'role-student',
    features: [
      'Study planning & scheduling',
      'Lesson explanations',
      'Exam preparation',
      'Flashcards & quizzes',
      'PDF summarization',
    ],
  },
  {
    id: UserRole.BUSINESS,
    title: 'Business Owner',
    description: 'AI advisor for marketing, sales, and business growth',
    icon: '💼',
    color: 'role-business',
    features: [
      'Marketing strategy',
      'Content generation',
      'Sales funnel advice',
      'Market analysis',
      'Financial insights',
    ],
  },
  {
    id: UserRole.FOUNDER,
    title: 'Startup Founder',
    description: 'AI co-founder for ideation, MVP, and scaling your startup',
    icon: '🚀',
    color: 'role-founder',
    features: [
      'Idea validation',
      'MVP roadmap',
      'Tech stack planning',
      'Pitch deck help',
      'Investor Q&A prep',
    ],
  },
];
