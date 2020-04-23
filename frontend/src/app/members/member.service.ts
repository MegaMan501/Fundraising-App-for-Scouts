// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// Rxjs
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
// Internal
import { Member, Group } from '../models/all.model';
import { environment as env } from '../../environments/environment';

const BACKEND_URL = env.BACKEND_URL + 'member';

@Injectable({providedIn: 'root'})
export class MemberService {

  private leaders: Member[] = [];
  private scouts: Member[] = [];
  private groups: Group[] = [];
  private allLeaderStatusListner = new Subject<Member[]>();
  private allScoutStatusListner = new Subject<Member[]>();
  private allGroupStatusListner = new Subject<Group[]>();

  constructor(private http: HttpClient, private router: Router) {}

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
    this.http.put(BACKEND_URL + '/leader/' + data.userId, data)
    .subscribe(res => {
      console.log(res);
    });
  }

  deleteLeader(userId: number) {
    return this.http.delete(BACKEND_URL + '/leader/' + userId);
  }

  // create a new scout
  createScout(email: string, fullname: string, pass: string) {
    const authData = { email, fullname, pass };

    return this.http.post<{rows: any}>(BACKEND_URL + '/add-scout', authData)
      .pipe(
        map((scoutData) => {
          return {
            scout: scoutData.rows.map(e => {
              return {
                userId: e.user_id,
                fullname: e.full_name,
                email: e.email
              };
            })
          };
        })
      ).subscribe(res => {
        console.log(res);
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

  deleteScout() {}

  // create a new group
  createGroup(
      groupId: number,
      group_name: string,
      location: string,
      group_desc: string
  ) {
    const data = { groupId, group_name, location, group_desc };

    this.http.post<{rows: any}>(BACKEND_URL + '/add-group', data)
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
          };
        })
      )
      .subscribe(res => {
        // console.log(res);
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
      console.log(modData.groups);
      this.groups = modData.groups;
      this.allGroupStatusListner.next([...this.groups]);
    });
  }

  // delete the group
  deleteGroup(groupid: number) {
    return this.http.delete(BACKEND_URL + '/group/' + groupid);
  }

  // update the group
  updateGroup(data: Group, prevGroup: number) {
    // console.log(data, prevGroup);
    this.http.put(BACKEND_URL + '/group/' + prevGroup, data)
    .subscribe(res => {
      console.log(res);
    });
  }
}
