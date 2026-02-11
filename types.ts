
export interface Lesson {
  id: string;
  date: string;
  time: string;
  subject: string;
  instructor: string;
  location: string;
  description?: string;
}

export enum SubjectColor {
  METEO = 'bg-blue-100 text-blue-700 border-blue-200',
  AERO = 'bg-orange-100 text-orange-700 border-orange-200',
  CONNAISSANCE = 'bg-green-100 text-green-700 border-green-200',
  NAVIGATION = 'bg-purple-100 text-purple-700 border-purple-200',
  HISTOIRE = 'bg-amber-100 text-amber-700 border-amber-200',
  DEFAULT = 'bg-slate-100 text-slate-700 border-slate-200'
}

export type BIALessonCategory = 'Météorologie' | 'Aérodynamique' | 'Connaissance des aéronefs' | 'Navigation' | 'Histoire' | string;

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  school: string;
  level: string;
}
