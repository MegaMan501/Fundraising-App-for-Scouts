import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MemberService } from '../members/member.service';
import { Group } from '../models/all.model';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean>;
  userIsAuth = false;
  userIsAdmin = false;
  userIsLeader = false;
  private authListner: Subscription;
  private adminListner: Subscription;
  private leaderListner: Subscription;

  gid: number;
  name: string;
  groups: Group[] = [];
  private gidListner: Subscription;
  private groupsSub: Subscription;

  constructor(
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private memberService: MemberService
  ) {}


  ngOnInit() {
    // Are we authenticated
    this.userIsAuth = this.authService.getIsAuth();
    this.userIsAdmin = this.authService.getIsAdmin();
    this.userIsLeader = this.authService.getIsLeader();

    // Listners
    this.authListner = this.authService
    .getAuthStatusListener()
    .subscribe(isAuth => {
      this.userIsAuth = isAuth;
    });
    this.adminListner = this.authService
    .getAdminStatusListener()
    .subscribe( isAdmin => {
      this.userIsAdmin = isAdmin;
    });
    this.leaderListner = this.authService
    .getLeaderStatusListener()
    .subscribe(isLeader => {
      this.userIsLeader = isLeader;
    });

    this.groupsSub = this.memberService
    .getAllGroupStatusListener()
    .subscribe(res => {
      this.groups = res;
      this.gid = this.memberService.getGroupId();
    });

    this.isHandset$ = this.breakpointObserver
    .observe(['(max-width: 600px)']) // previously: Breakpoints.Handset
    .pipe(
      map(result => result.matches), shareReplay()
    );
  }

  onLogout() {
    this.authService.logout();
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onSetting() {
    this.router.navigate(['/settings']);
  }

  onSelectGroup(id: number, name: string) {
    this.name = name;
    this.memberService.setGroupId(id);
    this.gid = this.memberService.getGroupId();
  }

  onLoadGroups() {
    this.memberService.getGroups();
  }

  ngOnDestroy() {
    this.authListner.unsubscribe();
    this.adminListner.unsubscribe();
    this.leaderListner.unsubscribe();
    this.groupsSub.unsubscribe();
    this.gidListner.unsubscribe();
  }
}
