export interface Plan { 
  _id?: string;
  name: string;
  commissionSale: number;
  monthlyPublications: string;
  bannerAdvising: boolean;
  additionalService: string[];
  price?: number;
  updatedAt?: Date;
  createdAt?: Date;
};
