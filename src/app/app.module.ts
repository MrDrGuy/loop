import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//other component data
import { AppComponent } from './app.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AcceptDialogComponent } from './accept-dialog/accept-dialog.component';
import { RejectDialogComponent } from './reject-dialog/reject-dialog.component';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule} from './app-routing/app-routing.module';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { FormsModule } from '@angular/forms';

//angularfire and firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NewPositionDialogComponent } from './new-position-dialog/new-position-dialog.component';
import { NewCandidateDialogComponent } from './new-candidate-dialog/new-candidate-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    LoginPageComponent,
    AcceptDialogComponent,
    RejectDialogComponent,
    UploadDialogComponent,
    NewPositionDialogComponent,
    NewCandidateDialogComponent,

  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    AngularFileUploaderModule
  ],
  entryComponents: [
    AcceptDialogComponent,
    RejectDialogComponent,
    UploadDialogComponent,
    NewPositionDialogComponent,
    NewCandidateDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
