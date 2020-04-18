import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Leader } from '../members/leader.model';
import { Scout } from '../members/scout.model';
import { Group } from '../members/group.model';
const BACKEND_URL = 'http://localhost:45213/api/users';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private userId: string;

  private leaders: Leader[] = [];
  private allLeaderStatusListner = new Subject<Leader[]>();
  private scouts: Scout[] = [];
  private allScoutStatusListner = new Subject<Scout[]>();
  private groups: Group[] = [];
  private allGroupStatusListner = new Subject<Group[]>();

  // Observables
  private role = -1; // admin: 0, leader: 1, scout: 2
  private isAuth = false;
  private isAdmin = false;
  private isLeader = false;
  private roleStatusListner = new Subject<number>();
  private authStatusListener = new Subject<boolean>();
  private adminStatusListener = new Subject<boolean>();
  private leaderStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

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

  getReturnedLeaders() { return this.leaders; }
  getReturnedScouts() { return this.scouts; }
  getReturnedGroups() { return this.groups; }
  getAllLeaderStatusListener() { return this.allLeaderStatusListner.asObservable(); }
  getAllScoutStatusListener() { return this.allScoutStatusListner.asObservable(); }
  getAllGroupStatusListener() { return this.allGroupStatusListner.asObservable(); }

  // create a new leader
  createLeader(email: string, fullname: string, pass: string) {
    const authData = { email, fullname, pass };

    return this.http.post(BACKEND_URL + '/addLeader', authData)
      .subscribe(res => {
        console.log(res);
        window.location.reload();
        this.router.navigate(['/members-leaders']);
      }, err => {
        this.authStatusListener.next(false);
      });
  }

  // get leaders
  getLeaders() {
    this.http.get<{rows: any}>(
        BACKEND_URL + '/leaders'
    ).pipe(
      map((leaderData) => {
        return {
          leaders: leaderData.rows.map(e => {
            return {
              userId: e.user_id,
              groupId: e.group_id,
              fullname: e.full_name,
              email: e.email
            };
          }),
        };
      })
    )
    .subscribe(modData => {
      // console.log(modData.leaders);
      this.leaders = modData.leaders;
      this.allLeaderStatusListner.next([...this.leaders]);
    });
  }

  // create a new scout
  createScout(email: string, fullname: string, pass: string) {
    const authData = { email, fullname, pass };

    return this.http.post(BACKEND_URL + '/addScout', authData)
      .subscribe(res => {
        console.log(res);
        window.location.reload();
        this.router.navigate(['/members-scouts']);
      }, err => {
        this.authStatusListener.next(false);
      });
  }

  // get scouts
  getScouts() {
    this.http.get<{rows: any}>(
        BACKEND_URL + '/scouts'
    ).pipe(
      map((scoutData) => {
        return {
          scouts: scoutData.rows.map(e => {
            return {
              userId: e.user_id,
              groupId: e.group_id,
              fullname: e.full_name,
              email: e.email
            };
          }),
        };
      })
    )
    .subscribe(modData => {
      // console.log(modData.scouts);
      this.scouts = modData.scouts;
      this.allScoutStatusListner.next([...this.scouts]);
    });
  }

  // create a new group
  createGroup(groupId: number, group_name: string, location: string, group_desc: string) {
    const authData = { groupId, group_name, location, group_desc };

    return this.http.post(BACKEND_URL + '/addGroup', authData)
      .subscribe(res => {
        console.log(res);
        window.location.reload();
        this.router.navigate(['/members-groups']);
      }, err => {
        this.authStatusListener.next(false);
      });
  }

  // get groups
  getGroups() {
    this.http.get<{rows: any}>(
        BACKEND_URL + '/groups'
    ).pipe(
      map((groupData) => {
        return {
          groups: groupData.rows.map(e => {
            return {
              groupId: e.group_id,
              groupName: e.group_name,
              groupLocation: e.location,
              groupDesc: e.group_desc
            };
          }),
        };
      })
    )
    .subscribe(modData => {
      // console.log(modData.groups);
      this.groups = modData.groups;
      this.allGroupStatusListner.next([...this.groups]);
    });
  }

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
    this.tokenTimer = setTimeout(() => {
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
