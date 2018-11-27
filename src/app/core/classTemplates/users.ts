/*
*Document Author: Joey Queppet
*Updated: 11/15/2018 : Joey
*The recruiter class (model class).
*/
export class Recruiter {

  private email: string;
  private userID: string;
  private fName: string;
  private lName: string;
  private positions: Array<string>;
  private positionsCount:number;

  constructor(
    newEmail: string,
    newUserID: string,
    newFName: string,
    newLName: string,
    newPositions: Array<string>,
    newPositionsCount: number
  ){
    this.email = newEmail;
    this.userID = newUserID;
    this.fName = newFName;
    this.lName = newLName;
    this.positions = newPositions;
    this.positionsCount = newPositionsCount;
  }

  getEmail(){return this.email}
  getUserID(){return this.userID}
  getFName(){return this.fName}
  getLName(){return this.lName}
  getPosition(){return this.positions}
  getPositionCount(){return this.positionsCount}

  setEmail(newEmail:string){this.email = newEmail;}
  setUserID(newUserID:string){this.userID = newUserID;}
  setFName(newFName:string){this.fName = newFName;}
  setLName(newLName:string){this.lName = newLName;}
  setPositions(newPositions:Array<string>){this.positions = newPositions;}
  setPositionsCount(newPositionsCount:number){this.positionsCount = newPositionsCount;}


}
