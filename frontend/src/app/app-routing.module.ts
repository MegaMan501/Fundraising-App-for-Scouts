import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashboardLeaderComponent } from './dashboard-leader/dashboard-leader.component';
import { DashboardScoutComponent } from './dashboard-scout/dashboard-scout.component';
import { InventoryLeaderComponent } from './inventory/inventory-leader/inventory-leader.component';
import { SalesLeaderComponent } from './sale/sales-leader/sales-leader.component';
import { RequestsScoutComponent } from './requests-scout/requests-scout.component';
import { AuthGuard } from './auth/auth.guard';
import { EventsLeaderComponent } from './events-leader/events-leader.component';
import { SalesScoutComponent } from './sale/sales-scout/sales-scout.component';
import { GroupComponent } from './members/groups/groups.component';
import { LeaderComponent } from './members/leaders/leaders.component';
import { ScoutComponent } from './members/scouts/scouts.component';
import { MembersComponent } from './members/members.component';
import { NotificationsLeaderComponent } from './notifications-leader/notifications-leader.component';

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
    path: 'reset-password',
    component: ResetPasswordComponent
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
    path: 'members',
    component: MembersComponent,
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
    path: 'notifications-leader',
    component: NotificationsLeaderComponent,
    canActivate: [AuthGuard],
    data: { roles: [0, 1] }
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
