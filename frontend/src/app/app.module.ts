/* Angular */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

/* Angular Material */
import { LayoutModule } from '@angular/cdk/layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

/* External Modules */
import { ChartsModule } from 'ng2-charts';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HighchartsChartModule } from 'highcharts-angular';

/* Angular Components */
import { MainNavComponent } from './main-nav/main-nav.component';
import { HomepageComponent } from './homepage/homepage.component';
// Auth
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

// Dashboard
import { DashboardLeaderComponent } from './dashboard-leader/dashboard-leader.component';
import { DashboardScoutComponent } from './dashboard-scout/dashboard-scout.component';
// Members Components
import { MembersComponent } from './members/members.component';
import { GroupComponent } from './members/groups/groups.component';
import { LeaderComponent } from './members/leaders/leaders.component';
import { ScoutComponent } from './members/scouts/scouts.component';
// Events
import { EventsLeaderComponent } from './events-leader/events-leader.component';
// Sales
import { SalesLeaderComponent } from './sale/sales-leader/sales-leader.component';
import { SalesScoutComponent } from './sale/sales-scout/sales-scout.component';
// Inventory
import { InventoryLeaderComponent } from './inventory/inventory-leader/inventory-leader.component';
// Requests
import { RequestsScoutComponent } from './requests-scout/requests-scout.component';

// Sevices
import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorComponent } from './dialogs/error/error.component';
import { ErrorInterceptor } from './dialogs/error/error.interceptor';
import { DialogDeleteComponent } from './dialogs/delete/dialog-delete.component';
import { DialogEditGroupComponent } from './dialogs/edit-group/edit-group.component';
import { DialogEditLeaderComponent } from './dialogs/edit-leader/edit-leader.component';
import { DialogEditScoutComponent } from './dialogs/edit-scout/edit-scout.component';
import { DialogEditInventoryComponent } from './dialogs/edit-inventory/edit-inventory.component';
import { DialogLogoutComponent } from './dialogs/dialog-logout/dialog-logout.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomepageComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardLeaderComponent,
    DashboardScoutComponent,
    GroupComponent,
    MembersComponent,
    LeaderComponent,
    ScoutComponent,
    InventoryLeaderComponent,
    EventsLeaderComponent,
    SalesLeaderComponent,
    SalesScoutComponent,
    RequestsScoutComponent,
    DialogDeleteComponent,
    DialogEditGroupComponent,
    DialogEditLeaderComponent,
    DialogEditScoutComponent,
    DialogEditInventoryComponent,
    ErrorComponent,
    DialogLogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    ChartsModule,
    MDBBootstrapModule.forRoot(),
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatSidenavModule,
    MatBadgeModule,
    MatIconModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    HighchartsChartModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    MatDatepickerModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ErrorComponent,
    DialogDeleteComponent,
    DialogEditGroupComponent,
    DialogEditLeaderComponent,
    DialogEditScoutComponent,
    DialogEditInventoryComponent
  ]
})
export class AppModule { }
