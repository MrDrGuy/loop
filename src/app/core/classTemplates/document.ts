export class Document {

  canidateID: string;
  recruiterID: stirng;
  coverLetterRef: string;
  coverLetterDL: string;
  resumeRef: string;
  resumeDL: string;
  interviewQsRef: string;
  interviewQsDL: string;
  referencesRef: string;
  referencesDL: string;

  constructor(
    newCanidateID: string,
    newRecruiterID: stirng,
    newCoverLetterRef: string,
    newCoverLetterDL: string,
    newResumeRef: string,
    newResumeDL: string,
    newInterviewQsRef: string,
    newInterviewQsDL: string,
    newReferencesRef: string,
    newReferencesDL: string,
  ){
    this.canidateID = newCandidateID;
    this.recruiterID = newRecruiterID;
    this.coverLetterRef = newCoverLetterRef;
    
  }

}
