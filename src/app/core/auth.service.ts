import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, AngularFirestore,
   AngularFirestoreCollection, AngularFirestoreDocument }
    from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}
