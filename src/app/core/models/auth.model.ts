export interface Auth {
  _id?: string;
  email: string;
  authenticated: string;
  entity: string;
  password?: string;
  token?: string;
  updatedAt?: Date;
  createdAt?: Date;
};