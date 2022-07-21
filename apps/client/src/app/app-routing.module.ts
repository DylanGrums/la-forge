import { AuthContainerComponent } from './Core/Modules/Auth/Components/auth-container/auth-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Core/Modules/Auth/Components/login/login.component';
import { RegisterComponent } from './Core/Modules/Auth/Components/register/register.component';
import { AuthGuard } from './Shared/Guards/auth-guard';
import { DefaultLayoutComponent } from './Core/Layout/default-layout/default-layout.component';
import { HomeComponent } from './Core/Modules/Dashboard/Components/home/home.component';


const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent, children: [
      { path: '', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path: '', component: AuthContainerComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
