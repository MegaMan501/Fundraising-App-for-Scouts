import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardLeaderComponent } from './dashboard-leader/dashboard-leader.component';
import { DashboardScoutComponent } from './dashboard-scout/dashboard-scout.component';
import { InventoryLeaderComponent } from './inventory-leader/inventory-leader.component';
import { MembersLeaderComponent } from './members-leader/members-leader.component';
import { SalesLeaderComponent } from './sales-leader/sales-leader.component';
import { RequestsScoutComponent } from './requests-scout/requests-scout.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'dashboard-leader', component: DashboardLeaderComponent},
  {path: 'dashboard-scout', component: DashboardScoutComponent},
  {path: 'inventory-leader', component: InventoryLeaderComponent},
  {path: 'members-leader', component: MembersLeaderComponent},
  {path: 'sales-leader', component: SalesLeaderComponent},
  {path: 'request-scout', component: RequestsScoutComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
