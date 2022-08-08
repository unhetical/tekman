export interface Session {
  id: number;
  name: string;
  completed: boolean;
  lessons: Lesson[];
  done?: number;
}

export interface SessionDto extends Session {
  // Sólo añadir los campos a enviar sin extender.
}

export interface Lesson {
  id: number;
  name: string;
  trimester: number;
  completed: boolean;
  random: boolean;
}

export interface LessonDto extends Lesson {
  // Sólo añadir los campos a enviar sin extender.
}
