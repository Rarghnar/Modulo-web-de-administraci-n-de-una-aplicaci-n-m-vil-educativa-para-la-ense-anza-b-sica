export interface Chapter {
  _id?: string;
  name: string;
  lessons: string[];
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
};
