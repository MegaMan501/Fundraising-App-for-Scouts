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
import { AuthGuard } from './auth/auth.guard';
import { EventsLeaderComponent } from './events-leader/events-leader.component';
import { SalesScoutComponent } from './sales-scout/sales-scout.component';
import { GroupComponent } from './members/groups/groups.component';
import { LeaderComponent } from './members/leaders/leaders.component';
import { ScoutComponent } from './members/scouts/scouts.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'homepage',
    component: HomepageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'dashboard-leader',
    component: DashboardLeaderComponent,
    canActivate: [AuthGuard],
    data: { roles: [0, 1] }
  },
  {
    path: 'inventory-leader',
    component: InventoryLeaderComponent,
    canActivate: [AuthGuard],
    data: { roles: [0, 1] }
  },
  {
    path: 'members-leader',
    component: MembersLeaderComponent,
    canActivate: [AuthGuard],
    data: { roles: [0, 1] }
  },
  {
    path: 'members-groups',
    component: GroupComponent,
    canActivate: [AuthGuard],
    data: { roles: [0, 1] }
  },
  {
    path: 'members-leaders',
    component: LeaderComponent,
    canActivate: [AuthGuard],
    data: { roles: [0] }
  },
  {
    path: 'members-scouts',
    component: ScoutComponent,
    canActivate: [AuthGuard],
    data: { roles: [0, 1] }
  },
  {
    path: 'events-leader',
    component: EventsLeaderComponent,
    canActivate: [AuthGuard],
    data: { roles: [0, 1] }
  },
  {
    path: 'sales-leader',
    component: SalesLeaderComponent,
    canActivate: [AuthGuard],
    data: { roles: [0, 1] }
  },
  {
    path: 'request-leader',
    component: RequestsScoutComponent,
    canActivate: [AuthGuard],
    data: { roles: [0, 1] }
  },
  {
    path: 'dashboard-scout',
    component: DashboardScoutComponent,
    canActivate: [AuthGuard],
    data: { roles: [2] }
  },
  {
    path: 'request-scout',
    component: RequestsScoutComponent,
    canActivate: [AuthGuard],
    data: { roles: [2] }
  },
  {
    path: 'sales-scout',
    component: SalesScoutComponent,
    canActivate: [AuthGuard],
    data: { roles: [2] }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
