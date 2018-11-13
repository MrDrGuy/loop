export class ModelPosition{
  description:string;
  recruiter:string;
  candidates: Array<string>;
  candidatesCount: number;

  constructor(
    aDescription:string,
    aRecruiter:string,
    aCandidates: Array<string>,
    aCandidatesCount: number
  ){
    this.description = aDescription;
    this.recruiter = aRecruiter;
    this.candidates = aCandidates;
    this.candidatesCount = aCandidatesCount;
  }

}
