/*
*Document Author: Joey Queppet
*Last Updated: 11/1/2018
*
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
  candidates? : Array<string>;
  positions? : Array<string>;
}
