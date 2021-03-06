/*
*Document Author: Joey Queppet
*Updated: 11/1/2018: Joey
*Updated: 11/13/2018: Joey
*Last Updated: 11/15/2018: Joey
*Document where the interfaces are kept.
 * Interfaces are used when getting or setting variables to angular Firestore
*/

export interface Username {
  username: string;
  recruiterEmail: string;
}

export interface User {
  uid: string;
  email: string;
  username?: string;
  fName?: string;
  lName?: string;
  positions? : Array<string>;
}

export interface Candidate {
  address: string;
  email: string;
  files?: string;
  fName: string;
  lName: string;
  phone: string;
  recruiter: string;
  social?: string;
}

export interface Position {
  description:string;
  recruiter:string;
  candidates: Array<string>;
  candidatesCount: number;
  title: string;
}

export interface Files {
  canidateID: string;
  recruiterID: string;
  coverLetterRef: string;
  coverLetterDL: string;
  resumeRef: string;
  resumeDL: string;
  interviewQsRef: string;
  interviewQsDL: string;
  referencesRef: string;
  referencesDL: string;
}
