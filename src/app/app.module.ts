import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//other component data
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
//angularfire and firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';


const appRoutes: Routes = [
  {path: 'login-page-component', component: LoginPageComponent},
  {path: 'main-screen-component', component: MainScreenComponent},
  {path: '', redirectTo: '/login-page-component', pathMatch : 'full'}
]


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainScreenComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    MatToolbarModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
    /*
    AngularFirestoreCollection,
    AngularFirestoreDocument
    */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
