import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

import { Group } from '../models/all.model';
import { MemberService } from '../members/member.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})



export class MembersComponent implements OnInit{

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  hide = true;
  groups: Group[] = [];

  displayedColumns: string[] = ['groupId', 'groupName', 'groupLocation', 'groupDesc'];
  dataSource: MatTableDataSource<any>;
  private groupsSub: Subscription;


  charOptions: {};

  Highcharts = Highcharts;

  constructor(public memberService: MemberService, public dialog: MatDialog) {}

  ngOnInit() {
    this.charOptions =  {
      chart: {
          type: 'area'
      },
      title: {
          text: 'New Scout In Each Month'
      },
      subtitle: {
          text: ''
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'August', 'Sep','Oct','Nov','Dec'],
        tickmarkPlacement: 'on',
        title: {
            text: 'Months'
        }
    },
    yAxis: {
      title: {
          text: 'Users'
      }
    },
      tooltip: {
          split: true,
          valueSuffix: ' new scouts'
      },
      credits: {
          enabled: false
      },
      exporting: {
        enabled: true
      },
      series: [{
          name: 'Group 1',
          data: [1, 2, 10]
      }, {
          name: 'Group 2',
          data: [2, 3, 5]
      }, {
          name: 'Group 3',
          data: [3,4]
      }, {
          name: 'Group 4',
          data: [4,5]
      }, {
          name: 'Group 5',
          data: [5,6, 0, 3, 4]
      }]
  };
    HC_exporting(Highcharts);

    this.memberService.getGroups();
    this.groupsSub = this.memberService
    .getAllGroupStatusListener()
    .subscribe(results => {
      this.groups = results;
      this.dataSource = new MatTableDataSource<Group>(this.groups);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }



      // Filter the table
  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
