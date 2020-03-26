import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {
  userIsAuth = false;
  userIsAdmin = false;
  userIsLeader = false;
  private authListner: Subscription;
  private adminListner: Subscription;
  private leaderListner: Subscription;

  constructor(private authService: AuthService, private breakpointObserver: BreakpointObserver) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
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
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authListner.unsubscribe();
    this.adminListner.unsubscribe();
    this.leaderListner.unsubscribe();
  }
}
