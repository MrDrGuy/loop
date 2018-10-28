export class Files {

  candidateID: string;
  recruiterID: string;
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
    newRecruiterID: string,
    newCoverLetterRef: string,
    newCoverLetterDL: string,
    newResumeRef: string,
    newResumeDL: string,
    newInterviewQsRef: string,
    newInterviewQsDL: string,
    newReferencesRef: string,
    newReferencesDL: string,
  ){
    this.candidateID = newCanidateID;
    this.recruiterID = newRecruiterID;
    this.coverLetterRef = newCoverLetterRef;
    this.coverLetterDL = newCoverLetterDL;
    this.resumeRef = newResumeRef;
    this.resumeDL = newResumeDL;
    this.interviewQsRef = newInterviewQsRef;
    this.interviewQsDL = newInterviewQsDL;
    this.referencesRef = newReferencesRef;
    this.referencesDL = newReferencesDL;
  }

//canidate gets/sets
  getCandidate(){
    return this.candidateID;
  }
  setcandidate(id: string){
    this.candidateID = id;
  }

//recruiters gets/sets
  getRecruiter(){
    return this.recruiterID;
  }
  setRecruiter(id: string){
    this.recruiterID = id;
  }

//coverLetter gets/sets
  getCoverLetterRef(){
    return this.coverLetterRef;
  }
  getCoverLetterDL(){
    return this.coverLetterDL;
  }
  setCoverLetterRef(url: string){
    this.coverLetterRef = url;
  }
  setCoverLetterDL(url: string){
    this.coverLetterDL = url;
  }

//resume gets/sets
  getResumeRef(){
    return this.resumeRef;
  }
  getResumeDL(){
    return this.resumeDL;
  }
  setResumeRef(url: string){
    this.resumeRef = url;
  }
  setResumeDL(url: string){
    this.resumeDL = url;
  }

//interviewQs gets/sets
  getInterviewQsRef(){
    return this.interviewQsRef;
  }
  getInterviewQsDL(){
    return this.interviewQsDL;
  }
  setInterviewQsRef(url: string){
    this.interviewQsRef = url;
  }
  setInterviewQsDL(url: string){
    this.interviewQsDL = url;
  }

//references gets/sets
  getReferencesRef(){
    return this.referencesRef;
  }
  getReferencesDL(){
    return this.referencesDL;
  }
  setReferencesRef(url: string){
    this.referencesRef = url;
  }
  setReferencesDL(url: string){
    this.referencesDL = url;
  }

}
