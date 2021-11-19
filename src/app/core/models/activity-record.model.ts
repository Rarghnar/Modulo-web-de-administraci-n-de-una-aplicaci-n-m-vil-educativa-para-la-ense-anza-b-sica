export interface ActivityRecord {
    _id?: string;
    type: string;
    entity: string
    progress: number;
    total: number;
    state: string;
    updatedAt?: Date;
    createdAt?: Date;
};
  