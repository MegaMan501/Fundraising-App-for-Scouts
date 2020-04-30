import { Component, OnInit, ViewChild, OnDestroy, OnChanges } from '@angular/core';
import { Group, Member, Scout } from '../models/all.model';
import { MemberService } from '../members/member.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard-leader',
  templateUrl: './dashboard-leader.component.html',
  styleUrls: ['./dashboard-leader.component.scss']
})
export class DashboardLeaderComponent implements OnInit, OnDestroy {
  @ViewChild('paginatorGroup') paginatorGroup: MatPaginator;
  @ViewChild('sortGroup', {read: MatSort, static: true}) sortGroup: MatSort;
  @ViewChild('paginatorLeader') paginatorLeader: MatPaginator;
  @ViewChild('sortLeader', {read: MatSort, static: true}) sortLeader: MatSort;
  @ViewChild('paginatorScout') paginatorScout: MatPaginator;
  @ViewChild('sortScout', {read: MatSort, static: true}) sortScout: MatSort;

  // auth
  userIsAuth = false;
  userIsAdmin = false;
  userIsLeader = false;
  private authListner: Subscription;
  private adminListner: Subscription;
  private leaderListner: Subscription;

  // Load status
  isLoadingGroup = true;
  isLoadingLeader = true;
  isLoadingScout = true;
  isTrpChartReady = false;

  // Groups
  groups: Group[] = [];
  displayedColumnsGroups: string[] = ['groupId', 'groupName', 'groupLocation', 'groupDesc'];
  dataSourceGroup: MatTableDataSource<any>;
  private groupsSub: Subscription;

  // Leaders
  leaders: Member[] = [];
  displayedColumnsLeader: string[] = ['userId', 'fullname', 'email'];
  dataSourceLeader: MatTableDataSource<any>;
  private leadersSub: Subscription;

  // Scouts
  scouts: Scout[] = [];
  displayedColumnsScout: string[] = ['userId', 'groupId', 'fullname', 'email'];
  dataSourceScout: MatTableDataSource<Member>;
  private scoutsSub: Subscription;
  public chartTypeTrp: string = 'doughnut';
  public chartDatasetsTrp: Array<any> = [{data: []}];
  public chartLabelsTrp: Array<any> = [];
  isScoutDataInit = false;
  public chartColorsTrp: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];
  public chartOptionsTrp: any = { responsive: true };

  // Inventory
  public chartType: string = 'bar';
  public chartDatasets: Array<any> = [
    { data: [65, 59, 57, 20, 56, 55, 40], label: ['Sold'] },
    { data: [96, 80, 120, 80, 60, 111, 101], label: ['Total'] },
  ];
  public chartLabels: Array<any> = ['Thin Mints', 'Caramel Delites', 'Peanut Butter', 'Smores', 'Chocolate Chip', 'Shortbread'];
  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'maroon',
        'dodgerblue',
        'goldenrod',
        'mediumseagreen',
        'purple',
        'darkorange'
      ],
      borderColor: [
        'maroon',
        'dodgerblue',
        'goldenrod',
        'mediumseagreen',
        'purple',
        'darkorange'
      ],
      borderWidth: 2,
    },
    {
      backgroundColor: [
        'red',
        'deepskyblue',
        'gold',
        'mediumspringgreen',
        'mediumpurple',
        'orange'
      ],
      borderColor: [
        'red',
        'deepskyblue',
        'gold',
        'mediumspringgreen',
        'mediumpurple',
        'orange'
      ],
      borderWidth: 2,
    },
  ];
  public chartOptions: any = {
    responsive: true,
      scales: {
        xAxes: [{
          stacked: true,
          gridLines: {
            color: 'rgba(100,100,100,0.0)'
          }
        }],
        yAxes: [{
          stacked: true,
          gridLines: {
            color: 'rgba(100,100,100,0.0)'
          }
        }
      ]
    }
  };

  // Sales
  public chartTypeSal: string = 'line';
  public chartDatasetsSal: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Items Sold' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Items Requested' }
  ];
  public chartLabelsSal: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public chartColorsSal: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];
  public chartOptionsSal: any = {
    responsive: true
  };

  // Events
  public chartTypeEvn: string = 'horizontalBar';
  public chartDatasetsEvn: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Attendence' }
  ];
  public chartLabelsEvn: Array<any> = ['January', 'Febuary', 'March', 'April', 'May', 'June'];
  public chartColorsEvn: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];
  public chartOptionsEvn: any = {
    responsive: true,
      scales: {
        xAxes: [{
          gridLines: {
            color: 'rgba(100,100,100,0.0)'
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'rgba(100,100,100,0.0)'
          }
        }
      ]
    }

  };

  constructor(
    public memberService: MemberService,
    public route: Router,
    public authService: AuthService
  ) {
    // Auth
    this.userIsAuth = this.authService.getIsAuth();
    this.userIsAdmin = this.authService.getIsAdmin();
    this.userIsLeader = this.authService.getIsLeader();
  }

  // Chart Listners
  public chartClickedTrp(e: any): void { }
  public chartHoveredTrp(e: any): void { }
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  public chartClickedSal(e: any): void { }
  public chartHoveredSal(e: any): void { }
  public chartClickedEvn(e: any): void { }
  public chartHoveredEvn(e: any): void { }

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

    // Groups
    this.memberService.getGroups();
    this.groupsSub = this.memberService
    .getAllGroupStatusListener()
    .subscribe(results => {
      this.groups = results;
      this.dataSourceGroup = new MatTableDataSource<Group>(this.groups);
      this.dataSourceGroup.paginator = this.paginatorGroup;
      this.dataSourceGroup.sort = this.sortGroup;
      this.isLoadingGroup = false;
    });

    // Leaders
    if (this.userIsAdmin) {
      this.memberService.getLeaders();
    }
    this.leadersSub = this.memberService
    .getAllLeaderStatusListener()
    .subscribe(results => {
      this.leaders = results;
      this.dataSourceLeader = new MatTableDataSource<Member>(this.leaders);
      this.dataSourceLeader.paginator = this.paginatorLeader;
      this.dataSourceLeader.sort = this.sortLeader;
      this.isLoadingLeader = false;
    });

    // Scouts
    this.memberService.getScouts();
    this.scoutsSub = this.memberService
    .getAllScoutStatusListener()
    .subscribe(results => {
      this.scouts = results;
      this.dataSourceScout = new MatTableDataSource<Scout>(this.scouts);
      this.dataSourceScout.paginator = this.paginatorScout;
      this.dataSourceScout.sort = this.sortScout;
      this.isLoadingScout = false;

      const scoutResults = this.scouts;
      const groupString = 'group ';
      const array = scoutResults
      .filter((e, i, a) => a.map(E => E.groupId)
      .indexOf(e.groupId) === i)
      .map(el => scoutResults.filter(EL => EL.groupId === el.groupId).length);

      // push the number of members from each group to chart data
      for (const res of array) {
        this.chartDatasetsTrp[0].data.push(res);
      }

      // get unique group ID
      const result = [... new Set(scoutResults.map(data => data.groupId))];

      // push unique group ID into chart legend
      for (const res of result) {
        this.chartLabelsTrp.push(groupString + res);
      }

      setTimeout(() => {
        this.isTrpChartReady = true;
      }, 500);
    });
  }

   // Refresh the list of groups
  onRefreshGroup() {
    this.isLoadingGroup = true;
    this.memberService.getGroups();
    this.isLoadingGroup = false;
  }

  // Refresh the list of leaders
  onRefreshLeader() {
    this.isLoadingLeader = true;
    this.memberService.getLeaders();
    this.isLoadingLeader = false;
  }

  // Refresh the list of scouts
  onRefreshScout() {
    this.isLoadingScout = true;
    this.memberService.getScouts();
    this.isLoadingScout = false;
  }

  // Filter the table
  filterGroup(value: string) {
    this.dataSourceGroup.filter = value.trim().toLowerCase();
  }

  // Filter the table
  filterLeader(value: string) {
    this.dataSourceLeader.filter = value.trim().toLowerCase();
  }

  // Filter the table
  filterScout(value: string) {
    this.dataSourceScout.filter = value.trim().toLowerCase();
  }

  routeToLeaders() {
    this.route.navigate(['/members-leaders']);
  }

  // RNG Color
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  ngOnDestroy() {
    // Auth
    this.authListner.unsubscribe();
    this.adminListner.unsubscribe();
    this.leaderListner.unsubscribe();
    // Members
    this.groupsSub.unsubscribe();
    this.leadersSub.unsubscribe();
    this.scoutsSub.unsubscribe();
  }
}
