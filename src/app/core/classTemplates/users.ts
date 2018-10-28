export class Recruiter {

  email: string;
  userID: string;
  firstName: string;
  lastName: string;
  candidates: Array<string>;
  positions: Array<string>;

  constructor(
    newEmail: string,
    newUserID: string,
    newFirstName: string,
    newLastName: string,
    newCandidates: Array<string>,
    newPositions: Array<string>,
  ){
    this.email = newEmail;
    this.userID = newUserID;
    this.firstName = newFirstName;
    this.lastName = newLastName;
    this.candidates = newCandidates;
    this.positions = newPositions;
  }

}
