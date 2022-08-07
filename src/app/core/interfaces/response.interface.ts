export interface Response {
  data: any[];
  meta?: { error: string };
}

export interface Meta {
  error: string;
}

export interface Options {
  name: string;
  code: string;
}
