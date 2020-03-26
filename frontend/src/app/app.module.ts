import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { DashboardLeaderComponent } from './dashboard-leader/dashboard-leader.component';
import { InventoryLeaderComponent } from './inventory-leader/inventory-leader.component';
import { MembersLeaderComponent } from './members-leader/members-leader.component';
import { EventsLeaderComponent } from './events-leader/events-leader.component';
import { SalesLeaderComponent } from './sales-leader/sales-leader.component';
import { DashboardScoutComponent } from './dashboard-scout/dashboard-scout.component';
import { RequestsScoutComponent } from './requests-scout/requests-scout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from './error/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomepageComponent,
    LoginComponent,
    DashboardLeaderComponent,
    InventoryLeaderComponent,
    MembersLeaderComponent,
    EventsLeaderComponent,
    SalesLeaderComponent,
    DashboardScoutComponent,
    RequestsScoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
