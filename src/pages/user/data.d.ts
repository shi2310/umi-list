// User出参
export interface User {
  id: number;
  name: string;
  pwd: string;
  sex: number;
  create_time: string;
  status: boolean;
}

export interface FormValues {
  [name: string]: any;
}
