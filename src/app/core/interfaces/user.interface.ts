export interface User {
  id: number;
  name: string;
  token: string;
  language: string;
  course: string;
}

export interface ConfigDto {
  language: string;
  course: string;
}
