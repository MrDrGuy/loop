export class Candidates {

  private fname : string;
  private lname : string;
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
    this.fname = afname;
    this.lname = alname;
    this.email = aemail;
    this.phoneNumber = aphoneNumber;
    this.socialMedia = asocialMedia;
    this.files = afiles;
  }

//first name
  getFName(){
    return this.fname;
  }
  setFName(value: string){
    this.fname = value;
  }
//last name
  getLName(){
    return this.lname;
  }
  setLName(value: string){
    this.lname = value;
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
