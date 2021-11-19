export interface Subscription {
  _id?: string;
  plan: string;
  user: string;
  discountPercentage?: number;
  startDate: Date;
  endDate: Date;
  state: string;
  updatedAt?: Date;
  createdAt?: Date;
};
