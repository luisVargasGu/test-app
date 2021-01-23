import { QuestionItem } from "./questionItem";

export interface Questionare {
    resourceType: string;
    id: string;
    url: string;
    status: string;
    subjectType: string[];
    date: string;
    item: QuestionItem[];
}

