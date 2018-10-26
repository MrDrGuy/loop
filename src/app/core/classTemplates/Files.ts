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
  get getCandidate(){
    return this.candidateID;
  }
  set setcandidate(id: string){
    this.candidateID = id;
  }

//recruiters gets/sets
  get getRecruiter(){
    return this.recruiterID;
  }
  set setRecruiter(id: string){
    this.recruiterID = id;
  }

//coverLetter gets/sets
  get getCoverLetterRef(){
    return this.coverLetterRef;
  }
  get getCoverLetterDL(){
    return this.coverLetterDL;
  }
  set setCoverLetterRef(url: string){
    this.coverLetterRef = url;
  }
  set setCoverLetterDL(url: string){
    this.coverLetterDL = url;
  }

//resume gets/sets
  get getResumeRef(){
    return this.resumeRef;
  }
  get getResumeDL(){
    return this.resumeDL;
  }
  set setResumeRef(url: string){
    this.resumeRef = url;
  }
  set setResumeDL(url: string){
    this.resumeDL = url;
  }

//interviewQs gets/sets
  get getInterviewQsRef(){
    return this.interviewQsRef;
  }
  get getInterviewQsDL(){
    return this.interviewQsDL;
  }
  set setInterviewQsRef(url: string){
    this.interviewQsRef = url;
  }
  set setInterviewQsDL(url: string){
    this.interviewQsDL = url;
  }

//references gets/sets
  get getReferencesRef(){
    return this.referencesRef;
  }
  get getReferencesDL(){
    return this.referencesDL;
  }
  set setReferencesRef(url: string){
    this.referencesRef = url;
  }
  set setReferencesDL(url: string){
    this.referencesDL = url;
  }

}
