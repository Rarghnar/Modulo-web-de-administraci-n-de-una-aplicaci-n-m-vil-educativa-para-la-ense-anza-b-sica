export interface Lesson {
  _id?: string;
  name: string;
  content: any[];
  evaluation: string;
  unit: string;
  trophy: string;
  createdAt?: Date;
  updatedAt?: Date;
};
