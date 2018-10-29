import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from '../login-page/login-page.component';
import {MainScreenComponent} from '../main-screen/main-screen.component';

const routes: Routes = [
  {path: 'login-page', component: LoginPageComponent},
  {path: 'main-screen', component: MainScreenComponent},
  {path: '', redirectTo: '/login-page', pathMatch : 'full'}
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
