export interface iQuestion {
  // whatever value we care about
  boolean?: boolean;
  number?: number;
  string?: string;

  // Human readable name
  label: string;
  // Discriminator for type of question
  type: string; // These match JSON types: boolean string number
  uuid: string; // this is used to unique-ify different fields so that html labels can be procedurally generated
}

export interface iQuestionCollection {
  name: string;
  questions: iQuestion[];
}
