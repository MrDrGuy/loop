/*
*Document Author: Joey Queppet
*Updated: 11/15/2018 : Joey
*The Postion class (model class).
*/
export class ModelPosition{
  description:string;
  recruiter:string;
  candidates: Array<string>;
  candidatesCount: number;
  title: string;
  positionID: string;

  constructor(
    aDescription:string,
    aRecruiter:string,
    aCandidates: Array<string>,
    aCandidatesCount: number,
    aTitle: string,
    aPositionID: string
  ){
    this.description = aDescription;
    this.recruiter = aRecruiter;
    this.candidates = aCandidates;
    this.candidatesCount = aCandidatesCount;
    this.title = aTitle;
    this.positionID = aPositionID;
  }

  getDescription(){
    return this.description;
  }

  getRecruiter(){
    return this.recruiter;
  }

  getCandidates(){
    return this.candidates;
  }

  getCandidatesCount(){
    return this.candidatesCount;
  }

  getTitle(){
    return this.title;
  }

  getPositionID(){
    return this.positionID;
  }

}
