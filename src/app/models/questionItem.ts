
export interface QuestionItem {
  linkId: string;
  text: string;
  type: string;
  item?: QuestionItem[];
}