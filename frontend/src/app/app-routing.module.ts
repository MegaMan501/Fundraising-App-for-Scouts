import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { DashboardLeaderComponent } from './dashboard-leader/dashboard-leader.component';
import { DashboardScoutComponent } from './dashboard-scout/dashboard-scout.component';
import { InventoryLeaderComponent } from './inventory-leader/inventory-leader.component';
import { MembersLeaderComponent } from './members-leader/members-leader.component';
import { SalesLeaderComponent } from './sales-leader/sales-leader.component';
import { RequestsScoutComponent } from './requests-scout/requests-scout.component';
import { AuthGuard } from './auth/auth.guard';
import { EventsLeaderComponent } from './events-leader/events-leader.component';
import { SalesScoutComponent } from './sales-scout/sales-scout.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard-leader', component: DashboardLeaderComponent, canActivate: [AuthGuard]},
  {path: 'inventory-leader', component: InventoryLeaderComponent, canActivate: [AuthGuard]},
  {path: 'members-leader', component: MembersLeaderComponent, canActivate: [AuthGuard]},
  {path: 'events-leader', component: EventsLeaderComponent, canActivate: [AuthGuard]},
  {path: 'sales-leader', component: SalesLeaderComponent, canActivate: [AuthGuard]},
  {path: 'request-leader', component: RequestsScoutComponent, canActivate: [AuthGuard]},
  {path: 'dashboard-scout', component: DashboardScoutComponent, canActivate: [AuthGuard]},
  {path: 'request-scout', component: RequestsScoutComponent, canActivate: [AuthGuard]},
  {path: 'sales-scout', component: SalesScoutComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
