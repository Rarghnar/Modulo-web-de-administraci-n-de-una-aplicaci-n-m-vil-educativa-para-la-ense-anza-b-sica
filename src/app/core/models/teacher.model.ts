export interface Teacher{
    _id?: string;
    names: string;
    lastNames: string;
    courses: string[];
    subjects?: string[];
    rut: string;
    email: string; 
    profession: string;
    updatedAt?: Date;
    createdAt?: Date;
  };
  