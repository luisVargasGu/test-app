
export interface Resource {
    birthDate: string;
    gender: string | { text: string };
    id: string;
    meta: { versionId: string, lastUpdated: Date };
    name?: { family: string[], given: string[], suffix?: string[], text?: string, use?: string }[];
    resourceType: string;
    text: { status: string, div: string; };
    active: boolean;
}