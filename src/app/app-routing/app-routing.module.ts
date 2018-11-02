/*
*Document Author: Joey Queppet
*Last Updated: 11/1/2018
*
*This module exists to control routing.
*/
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from '../login-page/login-page.component';
import {MainScreenComponent} from '../main-screen/main-screen.component';


/**
 *Where the routes are listed for navigation.
 *The default route is currently set to the login page.
 */
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
