export interface Response {
  data: any[];
  meta?: { error: any };
}

export interface Options {
  name: string;
  code: string;
}
