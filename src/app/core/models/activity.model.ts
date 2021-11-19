export interface Activity {
  _id?: string;
  name: string;
  instructions: string[];
  score: number;
  date?: Date;
  description: string;
  time?: number;
  state?: string;
  videoURL?: string;
  quantity: number;
  activityType: string;
  createdAt?: Date;
  updatedAt?: Date;
};
