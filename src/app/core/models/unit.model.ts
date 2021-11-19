export interface Unit {
    _id?: string;
    name: string;
    lessons: string[];
    description:string;
    trophy: string;
    updatedAt?: Date;
    createdAt?: Date;
}