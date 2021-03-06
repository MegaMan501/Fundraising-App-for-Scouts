import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment as env } from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { DialogLogoutComponent } from '../dialogs/dialog-logout/dialog-logout.component';

const BACKEND_URL = env.BACKEND_URL + 'users';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private userId: string;

  // Observables
  private role = -1; // admin: 0, leader: 1, scout: 2
  private isAuth = false;
  private isAdmin = false;
  private isLeader = false;
  private roleStatusListner = new Subject<number>();
  private authStatusListener = new Subject<boolean>();
  private adminStatusListener = new Subject<boolean>();
  private leaderStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {}

  getToken() { return this.token; }
  getIsAuth() { return this.isAuth; }
  getUserId() { return this.userId; }
  getRole() { return this.role; }
  getIsAdmin() { return this.isAdmin; }
  getIsLeader() { return this.isLeader; }
  getRoleStatusListener() { return this.roleStatusListner.asObservable(); }
  getAuthStatusListener() { return this.authStatusListener.asObservable(); }
  getAdminStatusListener() { return this.adminStatusListener.asObservable(); }
  getLeaderStatusListener() { return this.leaderStatusListener.asObservable(); }

  // user login
  login(email: string, password: string) {
    const authData = { email, password };
    this.http.post<{
        token: string,
        expiresIn: number,
        userId: string,
        admin_flag: boolean,
        leader: boolean
       }>(
      BACKEND_URL + '/login', authData
    ).subscribe(res => {
      // console.log(res);
      const token = res.token;
      this.token = token;
      if (token) {
        const expiresInDuration = res.expiresIn;
        // console.log('Expires Duration: ', expiresInDuration);
        this.setAuthTimer(expiresInDuration);
        this.isAuth = true;
        this.userId = res.userId;
        this.authStatusListener.next(true);
        if (res.admin_flag) {
          this.isAdmin = true;
          this.adminStatusListener.next(true);
          this.role = 0;
          this.roleStatusListner.next(0);
        }
        if (res.leader) {
          this.isLeader = true;
          this.leaderStatusListener.next(true);
          this.role = 1;
          this.roleStatusListner.next(1);
        }
        if (!res.admin_flag && !res.leader) {
          this.role = 2;
          this.roleStatusListner.next(2);
        }
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        // console.log('Expires Date in: ', expirationDate);
        this.saveAuthData(token, expirationDate, this.userId, res.admin_flag, res.leader);
        res.admin_flag || res.leader
          ? this.router.navigate(['/dashboard-leader'])
          : this.router.navigate(['/dashboard-scout']);
      }
    }, err => {
      console.error('Login: ', err);
      this.authStatusListener.next(false);
      this.adminStatusListener.next(false);
      this.leaderStatusListener.next(false);
      this.roleStatusListner.next(-1);
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    // console.log(authInformation);

    if (!authInformation) { return; }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuth = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);

      if (authInformation.admin_flag) {
        this.isAdmin = true;
        this.adminStatusListener.next(true);
        this.role = 0;
        this.roleStatusListner.next(0);
        this.isLeader = false;
        this.leaderStatusListener.next(false);
      } else if (authInformation.leader) {
        this.isLeader = true;
        this.leaderStatusListener.next(true);
        this.role = 1;
        this.roleStatusListner.next(1);
        this.isAdmin = false;
        this.adminStatusListener.next(false);
      } else {
        this.isLeader = false;
        this.leaderStatusListener.next(false);
        this.isAdmin = false;
        this.adminStatusListener.next(false);
        this.role = 2;
        this.roleStatusListner.next(2);
      }
    }
  }

  logout() {
    this.token = null;
    this.isAuth = false;
    this.isAdmin = false;
    this.isLeader = false;
    this.role = -1;
    this.authStatusListener.next(false);
    this.adminStatusListener.next(false);
    this.leaderStatusListener.next(false);
    this.roleStatusListner.next(-1);

    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    let dialogRef;
    // Logout dialog
    setTimeout(() => {
      dialogRef = this.dialog.open(DialogLogoutComponent, {
        data: { title: 'Logout', timeout: '60sec'}
      });
    }, (duration - 60) * 1000);

    this.tokenTimer = setTimeout(() => {
      dialogRef.close();
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    admin_flag: boolean,
    leader: boolean)
  {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('admin_flag', (admin_flag ? 'true' : 'false'));
    localStorage.setItem('leader', (leader ? 'true' : 'false'));
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('admin_flag');
    localStorage.removeItem('leader');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const admin_flag = localStorage.getItem('admin_flag');
    const leader = localStorage.getItem('leader');

    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId,
      admin_flag: JSON.parse(admin_flag),
      leader: JSON.parse(leader)
    };
  }
}
