export interface IEvent extends Document {
  _id: string;
  name: string;
  eventType?: string;
  start: Date;
  end: Date;
  host: string;
  participants: string[];
  inviteCode: string;
  feedback: IField[];
}

export interface IField {
  // Will have an array of fields
  _id: string;
  name: string;
  description: string;
  fieldType: FieldTypes;
  constraints: {
    range?: number[];
    limit?: number;
  }; // This will contain specific constraints for the type of field
  data?: {
    average?: number;
    wordFreq?: { word: string; freq: number };
    timeSeries?: { _id: string; value: number; date: Date }[];
    num: number; // This will store the number of data points added
  }; // This will contain the feedback data for this type of field
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

export type FieldTypes = "mood" | "rating" | "slider" | "text";
