/*
*Document Author: Joey Queppet
*Updated: 11/15/2018 : Joey
*The Candidate class (model class).
*/

export class ModelCandidate {

  fName : string;
  lName : string;
  email : string;
  recruiter: string;
  phone : string;
  socialMedia : string;
  files : string;
  candidateID: string;

  constructor(
    afname : string,
    alname : string,
    aemail : string,
    arecruiter: string,
    aphone : string,
    asocialMedia : string,
    afiles : string,
    aCandidateID:string
  ){
    this.fName = afname;
    this.lName = alname;
    this.email = aemail;
    this.recruiter = arecruiter;
    this.phone = aphone;
    this.socialMedia = asocialMedia;
    this.files = afiles;
    this.candidateID = aCandidateID;
  }

//first name
  getFName(){
    return this.fName;
  }
  setFName(value: string){
    this.fName = value;
  }
//last name
  getLName(){
    return this.lName;
  }
  setLName(value: string){
    this.lName = value;
  }
//email
  getEmail(){
    return this.email;
  }
  setEmail(value: string){
    this.email = value;
  }
//phone number
  getPhone(){
    return this.phone;
  }
  setPhoneNumber(value: string){
    this.phone = value;
  }
//social media
  getSocialMedia(){
    return this.socialMedia;
  }
  setSocialMedia(value: string){
    this.socialMedia = value;
  }
//string reference to a files doc ID in afs.
  getFiles(){
    return this.files;
  }
  setFiles(value: string){
    this.files = value;
  }

}
