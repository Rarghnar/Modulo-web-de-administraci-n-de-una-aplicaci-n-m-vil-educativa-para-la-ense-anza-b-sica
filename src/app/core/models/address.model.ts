export interface Address{
  _id?: string;
  streetName: string;
  streetNumber: number;
  block?: string;
  apartmentNumber?: number;
  commune: string;
  updatedAt?: Date;
  createdAt?: Date;
};
