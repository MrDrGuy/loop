/*
*Document Author: Joey Queppet
*Updated: 11/15/2018 : Joey
*The Candidate class (model class).
*/

export class ModelCandidate {

  fName : string;
  private lName : string;
  private email : string;
  private phoneNumber : string;
  private socialMedia : string;
  private files : string;

  constructor(
    afname : string,
    alname : string,
    aemail : string,
    aphoneNumber : string,
    asocialMedia : string,
    afiles : string,
  ){
    this.fName = afname;
    this.lName = alname;
    this.email = aemail;
    this.phoneNumber = aphoneNumber;
    this.socialMedia = asocialMedia;
    this.files = afiles;
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
  getPhoneNumber(){
    return this.phoneNumber;
  }
  setPhoneNumber(value: string){
    this.phoneNumber = value;
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
