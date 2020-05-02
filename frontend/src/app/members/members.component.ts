import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Member, Scout, Group } from '../models/all.model';
import { MemberService } from '../members/member.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, OnDestroy{
  // viewchild
  @ViewChild('ScoutPaginator') ScoutPaginator: MatPaginator;
  @ViewChild('GroupPaginator') GroupPaginator: MatPaginator;
  @ViewChild('LeaderPaginator') LeaderPaginator: MatPaginator;

  // @ViewChild(MatSort) sort = new QueryList<MatSort>();
  @ViewChild('ScoutSort', { read: MatSort, static: true }) ScoutSort: MatSort;
  @ViewChild('GroupSort', { read: MatSort, static: true }) GroupSort: MatSort;
  @ViewChild('LeaderSort', { read: MatSort, static: true }) LeaderSort: MatSort;

  userIsAuth = false;
  userIsAdmin = false;
  userIsLeader = false;
  private authListner: Subscription;
  private adminListner: Subscription;
  private leaderListner: Subscription;

  // constructor
  constructor(
     public memberService: MemberService,
     public dialog: MatDialog,
     public authService: AuthService
  ) {
    // Auth
    this.userIsAuth = this.authService.getIsAuth();
    this.userIsAdmin = this.authService.getIsAdmin();
    this.userIsLeader = this.authService.getIsLeader();
  }

  // total Scout
  totalScout: number;
  // total Leader
  totalLeader: number;

  hide = true;
  scoutForm: FormGroup;

  displayedScoutColumns: string[] = ['userId', 'groupId', 'fullname', 'email'];
  displayedGroupColumns: string[] = ['groupId', 'groupName', 'groupLocation', 'groupDesc'];
  displayedLeaderColumns: string[] = ['userId', 'fullname', 'email'];

  dataScoutSource: MatTableDataSource<any>;
  dataGroupSource: MatTableDataSource<any>;
  dataLeaderSource: MatTableDataSource<any>;

  private scoutsSub: Subscription;
  private groupsSub: Subscription;
  private leadersSub: Subscription;

  scouts: Scout[] = [];
  groups: Group[] = [];
  leaders: Member[] = [];

  public chartTypeTrp = 'pie';
  public chartTitle = '';
  public chartDatasetsTrp: Array<any> = [{ data: [] }];

  public chartLabelsTrp: Array<any> = [];
  public chartColorsTrp: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#675'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#B24323'],
      borderWidth: 2,
    }
  ];

  public chartOptionsTrp: any = {
    responsive: true,

    title: {
      display: true,
      text: 'Group Members',
      fontSize: 35,
  }

  };
  public chartClickedTrp(e: any): void { }
  public chartHoveredTrp(e: any): void { }

  ngOnInit() {

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
      // get scouts
    this.memberService.getScouts();
    this.scoutsSub = this.memberService
    .getAllScoutStatusListener()
    .subscribe(results => {
      this.scouts = results;
      this.dataScoutSource = new MatTableDataSource<Scout>(this.scouts);
      this.dataScoutSource.paginator = this.ScoutPaginator;
      this.dataScoutSource.sort = this.ScoutSort;

      const scoutResults = this.scouts;
      // filter out to see how many members in a single group
      const array = scoutResults
        .filter((e, i, a) => a.map(E => E.groupId)
        .indexOf(e.groupId) === i)
        .map(el => scoutResults.filter(EL => EL.groupId === el.groupId).length);

      // push the number of members from each group to chart data
      for (const res of array) {
        this.chartDatasetsTrp[0].data.push(res);
      }
      const groupString = 'group ';

      // get unique group ID
      const result = [... new Set(scoutResults.map(data => data.groupId))];

      // push unique group ID into chart legend
      for(const res of result) {
        this.chartLabelsTrp.push(groupString + res);
      }
      // get total scouts

      this.totalScout = scoutResults.length;
    }); // end of getScout


    // getGroup
    this.memberService.getGroups();
    this.groupsSub = this.memberService
    .getAllGroupStatusListener()
    .subscribe(groupResults => {
      this.groups = groupResults;
      this.dataGroupSource = new MatTableDataSource<Group>(this.groups);
      this.dataGroupSource.paginator = this.GroupPaginator;
      this.dataGroupSource.sort = this.GroupSort;
    }); // end of getGroup

    // get leader
    if (this.userIsAdmin) {
      this.memberService.getLeaders();
    }
    this.leadersSub = this.memberService
    .getAllLeaderStatusListener()
    .subscribe(leaderResults => {
      this.leaders = leaderResults;
      this.dataLeaderSource = new MatTableDataSource<Member>(this.leaders);
      this.dataLeaderSource.paginator = this.LeaderPaginator;
      this.dataLeaderSource.sort = this.LeaderSort;
      // get total scouts
      this.totalLeader = leaderResults.length;
    }); // end of getLeaders()
  }

  // Filter the scout table
  filterScout(value: string) {
    this.dataScoutSource.filter = value.trim().toLowerCase();
  }

  // Filter the group table
  filterGroup(value: string) {
    this.dataGroupSource.filter = value.trim().toLowerCase();
  }

  // Filter the leader table
  filterLeader(value: string) {
    this.dataLeaderSource.filter = value.trim().toLowerCase();
  }

  ngOnDestroy() {
    // Auth
    this.authListner.unsubscribe();
    this.adminListner.unsubscribe();
    this.leaderListner.unsubscribe();
    this.scoutsSub.unsubscribe();
    this.groupsSub.unsubscribe();
    this.leadersSub.unsubscribe();
 }


}
