export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  section: string;
}

export interface User {
  id: string;
  name: string;
  role: 'student' | 'teacher';
  section?: string;
}

export interface QuizResult {
  userId: string;
  score: number;
  timeSpent: number;
  answers: Record<string, string>;
  date: string;
}