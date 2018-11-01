/*
*Document Author: Joey Queppet
*Last Updated: 11/1/2018
*
*This service controls routing throughout the application.
 * I've implemented some auth logic into this, auth.guard can probabbly be deleted.
*/
export class appErrors {

  static authError1:string = 'No one is logged in. Please login before using the application.';
  static authError2:string = 'This username is taken. Please choose another.';
  static authError3:string = 'Your passwords do not match.';





  constructor(){}
}
