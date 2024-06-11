import { AUTO_LANG, SUPPORTED_LANG } from "./constants";

export type Language = keyof typeof SUPPORTED_LANG;
export type AutoLang = typeof AUTO_LANG;
export type fromLanguage = Language | AutoLang;

export interface State {
  fromLanguage: fromLanguage;
  toLanguage: Language;
  fromText: string;
  result: string;
  loading: boolean;
}

export type Action =
  | { type: "INTERCHANGE_LANG" }
  | { type: "SET_FROM_LANG"; payload: fromLanguage }
  | { type: "SET_TO_LANG"; payload: Language }
  | { type: "SET_FROM_TEXT"; payload: string }
  | { type: "SET_RESULT"; payload: string };

export enum SectionType {
  From = "from",
  To = "to",
}
