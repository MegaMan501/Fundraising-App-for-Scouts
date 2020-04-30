import { Component, OnInit, ViewChild, OnDestroy, QueryList } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

import { Member, Scout, Group } from '../models/all.model';
import { MemberService } from '../members/member.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription, Observable, Observer } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import * as Chart from 'chart.js';


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
  @ViewChild('ScoutSort', { read: MatSort, static: true }) ScoutSort : MatSort
  @ViewChild('GroupSort', { read: MatSort, static: true }) GroupSort : MatSort
  @ViewChild('LeaderSort', { read: MatSort, static: true }) LeaderSort : MatSort




  // constructor
  constructor(public memberService: MemberService, public dialog: MatDialog) {}

  // total Scout
  totalScout: number;
  // total Leader
  totalLeader: number;


  hide = true;
  scoutForm: FormGroup;

  displayedScoutColumns: string[] = ['userId', 'groupId', 'fullname', 'email'];
  displayedGroupColumns: string[] = ['groupId','groupName', 'groupLocation', 'groupDesc'];
  displayedLeaderColumns: string[] = ['userId', 'fullname', 'email'];

  dataScoutSource: MatTableDataSource<any>;
  dataGroupSource: MatTableDataSource<any>;
  dataLeaderSource: MatTableDataSource<any>;

  private scoutsSub: Subscription;
  private groupsSub: Subscription;
  private leadersSub: Subscription;

  scouts: Scout[] = [];
  groups: Group[] = [];
  leaders: Member[] = []



  public chartTypeTrp: string = 'pie';
  public chartTitle: string = "";
  public chartDatasetsTrp: Array<any> = [
    {
      data:[],
    }
  ];

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
      // get scouts
        this.memberService.getScouts();
        this.scoutsSub = this.memberService
        .getAllScoutStatusListener()
        .subscribe(scoutResults => {
        this.scouts = scoutResults;
        this.dataScoutSource = new MatTableDataSource<Scout>(this.scouts);
        this.dataScoutSource.paginator = this.ScoutPaginator;
        this.dataScoutSource.sort = this.ScoutSort;


        // filter out to see how many members in a single group
        let  array = scoutResults.filter((e, i, a) => a.map(E => E.groupId).indexOf(e.groupId) === i).map(el => scoutResults.filter(EL => EL.groupId === el.groupId).length);

        // push the number of members from each group to chart data
        for( let res of array) {
          this.chartDatasetsTrp[0].data.push(res)
        }

        var groupString = "group "

        // get unique group ID
        const result = [... new Set(scoutResults.map(data => data.groupId))];

        // push unique group ID into chart legend
        for(let res of result) {
            this.chartLabelsTrp.push(groupString + res)
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
      this.memberService.getLeaders();
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


  };

  ngOnDestroy(): void {
    this.scoutsSub.unsubscribe();
    this.groupsSub.unsubscribe();
    this.leadersSub.unsubscribe();
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
}
