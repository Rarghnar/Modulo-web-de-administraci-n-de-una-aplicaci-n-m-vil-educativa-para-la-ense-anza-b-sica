export interface Question {
  _id?: string;
  content: string;
  alternatives: string[];
  imageAnwser?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
