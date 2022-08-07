export interface Session {
  id: number;
  name: string;
  completed: boolean;
  lessons: Lesson[];
}

export interface SessionDto {
  id: number;
  name: string;
  completed: boolean;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  name: string;
  trimester: number;
  completed: boolean;
}

export interface LessonDto {
  id: number;
  name: string;
  trimester: number;
  completed: boolean;
}

export interface Meta {
  error: string;
}
