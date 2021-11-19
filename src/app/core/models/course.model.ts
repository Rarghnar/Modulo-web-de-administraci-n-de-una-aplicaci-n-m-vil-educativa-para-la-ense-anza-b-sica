export interface Course {
  _id?: string;
  name: string;
  grade: Number;
  students?: string[];
  subjects?: string[];
  teacher?: string;
  createdAt?: Date;
  updatedAt?: Date;


  ////////////////////////
  axis?: string[];
};
