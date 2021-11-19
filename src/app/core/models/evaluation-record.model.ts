export interface EvaluationRecord {
    _id?: string;
    evaluation: string;
    answers: any[];
    mark: number;
    progress: number;
    totalQuestions: number;
    state: string;
    updatedAt?: Date;
    createdAt?: Date;
};
  