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
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';

/* External Modules */
import { ChartsModule } from 'ng2-charts';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

/* Angular Components */
import { MainNavComponent } from './main-nav/main-nav.component';
import { HomepageComponent } from './homepage/homepage.component';
// Auth
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component'

// Dashboard
import { DashboardLeaderComponent } from './dashboard-leader/dashboard-leader.component';
import { DashboardScoutComponent } from './dashboard-scout/dashboard-scout.component';
// Members Components
import { MembersLeaderComponent } from './members-leader/members-leader.component';
import { GroupComponent } from './members/groups/groups.component';
import { LeaderComponent } from './members/leaders/leaders.component';
import { ScoutComponent } from './members/scouts/scouts.component';
// Events
import { EventsLeaderComponent } from './events-leader/events-leader.component';
// Sales
import { SalesLeaderComponent } from './sales-leader/sales-leader.component';
import { SalesScoutComponent } from './sales-scout/sales-scout.component';
// Inventory
import { InventoryLeaderComponent } from './inventory-leader/inventory-leader.component';
// Requests
import { RequestsScoutComponent } from './requests-scout/requests-scout.component';

// Sevices
import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from './error/error.interceptor';

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
    MembersLeaderComponent,
    GroupComponent,
    LeaderComponent,
    ScoutComponent,
    InventoryLeaderComponent,
    EventsLeaderComponent,
    SalesLeaderComponent,
    SalesScoutComponent,
    RequestsScoutComponent
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
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSortModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    MatDatepickerModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
