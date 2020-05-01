// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// Rxjs
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
// Internal
import { Member, Group, Scout } from '../models/all.model';
import { environment as env } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

const BACKEND_URL = env.BACKEND_URL + 'member';

@Injectable({providedIn: 'root'})
export class MemberService {

  private leaders: Member[] = [];
  private scouts: Scout[] = [];
  private groups: Group[] = [];
  private gid: number;
  private gidStatusListner = new Subject<number>();
  private allLeaderStatusListner = new Subject<Member[]>();
  private allScoutStatusListner = new Subject<Scout[]>();
  private allGroupStatusListner = new Subject<Group[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  // Getters
  getReturnedLeaders() { return this.leaders; }
  getReturnedScouts() { return this.scouts; }
  getReturnedGroups() { return this.groups; }
  getAllLeaderStatusListener() { return this.allLeaderStatusListner.asObservable(); }
  getAllScoutStatusListener() { return this.allScoutStatusListner.asObservable(); }
  getAllGroupStatusListener() { return this.allGroupStatusListner.asObservable(); }

  // create a new leader
  createLeader(email: string, fullname: string, pass: string) {
    const data = { email, fullname, pass };

    this.http.post<{rows: any}>
    (BACKEND_URL + '/add-leader', data)
    .pipe(
      map((uLeaders) => {
        return {
          leaders: uLeaders.rows.map(e => {
            return {
              userId: e.user_id,
              fullname: e.full_name,
              email: e.email
            };
          }),
        };
      })
    ).subscribe(res => {
      // console.log(res);
      this.leaders = res.leaders;
      this.allLeaderStatusListner.next([...this.leaders]);
    }, err => {
      console.error(err);
    });
  }

  // get leaders
  getLeaders() {
    this.http.get<{rows: any}>(
        BACKEND_URL + '/all-leaders'
    ).pipe(
      map((leaderData) => {
        return {
          leaders: leaderData.rows.map(e => {
            return {
              userId: e.user_id,
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

  // update leader
  updateLeader(data: any) {
    this.http.put<{message: string}>(BACKEND_URL + '/leader/' + data.userId, data)
    .subscribe(res => {
      this.snackBar.open(res.message, 'Okay', { duration: 5000 });
    });
  }

  // delete a leader
  deleteLeader(userId: number) {
    return this.http.delete<{message: string}>(BACKEND_URL + '/leader/' + userId);
  }

  // create a new scout
  createScout(groupId: number, email: string, fullname: string, pass: string) {
    const authData = { groupId, email, fullname, pass };

    return this.http.post<{rows: any}>(BACKEND_URL + '/add-scout', authData)
      .pipe(
        map((scoutData) => {
          return {
            scout: scoutData.rows.map(e => {
              return {
                groupId: e.group_id,
                userId: e.user_id,
                fullname: e.full_name,
                email: e.email
              };
            })
          };
        })
      ).subscribe(res => {
        // console.log(res);
        this.scouts = res.scout;
        this.allScoutStatusListner.next([...this.scouts]);
      }, err => {
        console.log(err);
      });
  }

  // get scouts
  getScouts() {
    this.http.get<{rows: any}>(
        BACKEND_URL + '/all-scouts'
    ).pipe(
      map((scoutData) => {
        return {
          scouts: scoutData.rows.map(e => {
            return {
              groupId: e.group_id,
              userId: e.user_id,
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

  // update scout
  updateScout(data: any) {
    this.http.put<{message: string}>(BACKEND_URL + '/scout/' + data.userId, data).subscribe(res => {
      this.snackBar.open(res.message, 'Okay', { duration: 5000 });
    });
  }

  // delete a scout
  deleteScout(uid: number, gid: number) {
    return this.http.delete<{message: string}>(BACKEND_URL + '/scout/' + uid + '/' + gid);
  }

  // create a new group
  createGroup(
      groupId: number,
      group_name: string,
      location: string,
      group_desc: string
  ) {
    const data = { groupId, group_name, location, group_desc };

    this.http.post<{rows: any, message: string}>(BACKEND_URL + '/add-group', data)
      .pipe(
        map((uGroups) => {
          return {
            groups: uGroups.rows.map(e => {
              return {
                groupId: e.group_id,
                groupName: e.group_name,
                groupLocation: e.location,
                groupDesc: e.group_desc
              };
            }),
            message: uGroups.message
          };
        })
      )
      .subscribe(res => {
        // console.log(res);
        this.snackBar.open(res.message.toString(), 'Okay', { duration: 5000 });
        this.groups = res.groups;
        this.allGroupStatusListner.next([...this.groups]);
      }, err => {
        console.error(err);
      });
  }

  // get groups
  getGroups() {
    this.http.get<{rows: any}>(
        BACKEND_URL + '/all-groups'
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
      this.groups = modData.groups;
      this.allGroupStatusListner.next([...this.groups]);
    });
  }

  // delete the group
  deleteGroup(groupid: number) {
    return this.http.delete<{message: string}>(BACKEND_URL + '/group/' + groupid);
  }

  // update the group
  updateGroup(data: Group, prevGroup: number) {
    this.http.put<{message: string}>(BACKEND_URL + '/group/' + prevGroup, data)
    .subscribe(res => {
      this.snackBar.open(res.message, 'Okay', { duration: 5000 });
    });
  }

  // selected group
  setGroupId(id: number) {
    this.gid = id;
    this.gidStatusListner.next(this.gid);
  }

  // get group id
  getGroupId() { return this.gid; }
}
