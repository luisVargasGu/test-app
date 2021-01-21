import { Entry } from "./entry";

export interface SearchResponse {
    entry: Entry[];
    id: string;
    link: { relation: string, url: string }[];
    timestamp?: Date;
    meta: { versionId?: string, lastUpdated: Date };
    resourceType: string;
    type: string;
}