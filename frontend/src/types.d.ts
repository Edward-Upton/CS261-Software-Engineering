export interface IUser {
  _id: string;
  email: string;
}

export interface IEvent {
  _id: string;
  name: string;
  eventType: string;
  start: Date;
  end: Date;
  host: string | IUser;
  participants: string[] | IUser[];
  inviteCode: string;
  feedback: IField[];
}

export type FieldTypes = "mood" | "rating" | "slider" | "text";

export interface IField {
  _id: string;
  name: string;
  description: string;
  fieldType: FieldTypes;
  constraints: {
    range?: number[];
    limit?: number;
    timeSeriesStep: number;
  };
  data: {
    average?: number;
    adjFreq?: { word: string; freq: number }[];
    keyPhrases?: { phrase: string; date: Date }[];
    timeSeries?: { _id: string; value: number; date: Date }[];
    num: number;
  };
}

export interface INewField {
  // Will have an array of fields
  name: string;
  description: string;
  fieldType: FieldTypes;
  constraints: {
    range?: number[];
    limit?: number;
  }; // This will contain specific constraints for the type of field
}
