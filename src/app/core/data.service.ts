/*
*Document Author: Joey Queppet
*Created: 11/15/2018 : Joey
*This service controls data transfer between components.
*/


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModelPosition } from './classTemplates/Positions';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //-----------------------------These are the private BehaviorSubject variables,----------------------------
  //-----------------------------and their related observables.----------------------------------------------
  private currentPositionSource = new BehaviorSubject<ModelPosition>(new ModelPosition('','',['example'],0,''));
  currentPosition = this.currentPositionSource.asObservable();

  private currentPositionIDSource = new BehaviorSubject<string>('example');
  currentPositionID = this.currentPositionIDSource.asObservable();

  private userIDSource = new BehaviorSubject<string>('example');
  userID = this.userIDSource.asObservable();

  private positionCandidatesSource = new BehaviorSubject<Array<string>>(['','']);
  positionCandidates = this.positionCandidatesSource.asObservable();

  private updateMainMenuSource = new BehaviorSubject<string>('update');
  updateMainMenu = this.updateMainMenuSource.asObservable();
  //-----------------------Constructor-------------------------------------------
  constructor() { }

  //-----------------------------Methods--------------------------------------------
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

  updateTheMainMenu(){
    this.updateMainMenuSource.next('update');
  }
}
