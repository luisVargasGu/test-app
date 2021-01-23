
export interface QuestionnaireResponse {
    resourceType: string;
    identifier: string;
    basedOn?: string;
    status: string;
    subject?: any;
    encounter?: string;
    authored: Date;
    author: any;
    source: any;
    item: any[];
}

