/*
*Document Author: Joey Queppet
*Created: 11/15/2018 : Joey
*This service controls data transfer, and update alerts between components.
*/


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModelPosition } from './classTemplates/Positions';
import { ModelCandidate } from './classTemplates/Candidates';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //-----------------------------These are the private BehaviorSubject variables,----------------------------
  //-----------------------------and their related observables.----------------------------------------------
  private currentPositionSource = new BehaviorSubject<ModelPosition>(new ModelPosition('','',['example'],0,'Please select a Position',''));
  currentPosition = this.currentPositionSource.asObservable();

  private currentPositionIDSource = new BehaviorSubject<string>('example');
  currentPositionID = this.currentPositionIDSource.asObservable();

  private userIDSource = new BehaviorSubject<string>('example');
  userID = this.userIDSource.asObservable();

  private positionCandidatesSource = new BehaviorSubject<Array<string>>(['','']);
  positionCandidates = this.positionCandidatesSource.asObservable();

  private updateMainMenuSource = new BehaviorSubject<string>('update');
  updateMainMenu = this.updateMainMenuSource.asObservable();

  private targetCandidateIDSource = new BehaviorSubject<string>('example');
  targetCandidateID = this.targetCandidateIDSource.asObservable();

  private newCandidateSource = new BehaviorSubject<ModelCandidate>(new ModelCandidate('','','','','','','',''));
  newCandidate = this.newCandidateSource.asObservable();
  //-----------------------Constructor-------------------------------------------
  constructor() { }

  //-----------------------------Methods to update local variables--------------------------------------------
  changeCurrentPosition(position:ModelPosition){
    console.log(this.currentPosition);
    this.currentPositionSource.next(position)
    console.log(this.currentPosition);
  }

  changeCurrentPositionID(positionID:string){
    this.currentPositionIDSource.next(positionID)
  }

  changeUserID(userID:string){
    this.userIDSource.next(userID)
  }

  changePositionCandidates(positionCandidates:Array<string>){
    this.positionCandidatesSource.next(positionCandidates)
  }

  /**
  *This method can be called from other components
  * to update the Main menu by updating a listener.
  *Used when new info is loaded into the main menu.
  */
  updateTheMainMenu(){
    this.updateMainMenuSource.next('update');
  }

  changeTargetCandidateID(candidateID:string){
    this.targetCandidateIDSource.next(candidateID);
  }

  addNewCandidate(candidate:ModelCandidate){
    this.newCandidateSource.next(candidate);
  }
}
