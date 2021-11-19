export interface Student {
  _id?: string;
  names: string;
  lastNames: string;
  email: string;
  rut: string;
  activityRecords?: string[];
  evaluationsRecords?: string[];
  course?: string | null;
  trophies?: string[];
  updatedAt?: Date;
  createdAt?: Date;


  /* username: string;
  phoneNumber: string;
  addresses?: string[];
  orders?: string[];
  favoritesProducts?: string[];
  reviews?: string[];
  refunds?: string[];
  purchases?: number;
  shoppingCart?: string;
  paymentMethod?: string;
  creditCards?: string[]; */
};
