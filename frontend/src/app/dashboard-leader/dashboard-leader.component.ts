import { Component, OnInit } from '@angular/core';

export interface Troop {
  position: number;
  name: string;
  groupid: number;
  members: number;
}

export interface Members {
  position: number;
  name: string;
  groupid: number;
}

const TROOP_DATA: Troop[] = [
  {position: 1,   name: 'Hydrogen',   groupid: 702311, members: 30},
  {position: 2,   name: 'Helium',     groupid: 202841, members: 20},
  {position: 3,   name: 'Lithium',    groupid: 432341, members: 20},
  {position: 4,   name: 'Beryllium',  groupid: 202341, members: 20},
  {position: 5,   name: 'Boron',      groupid: 192331, members: 20},
];

const MEMBERS_DATA: Members[] = [
  {position: 1,   name: 'Allie Summers',  groupid: 702311},
  {position: 2,   name: 'Taylor Smith',   groupid: 202841},
  {position: 3,   name: 'Jessica Byron',  groupid: 432341},
  {position: 4,   name: 'Sabrina Homes',  groupid: 202341},
  {position: 5,   name: 'Samatha Harris', groupid: 192331},
];

@Component({
  selector: 'app-dashboard-leader',
  templateUrl: './dashboard-leader.component.html',
  styleUrls: ['./dashboard-leader.component.scss']
})
export class DashboardLeaderComponent implements OnInit {
  panelOpenState = false;

  constructor() { }

  displayedColumns: string[] = ['position', 'name', 'groupid', 'members'];
  dataSource = TROOP_DATA;
  displayedColumnsMembers: string[] = ['position', 'name', 'groupid'];
  dataSourceMembers = MEMBERS_DATA;

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
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


  public chartTypeTrp: string = 'doughnut';

  public chartDatasetsTrp: Array<any> = [
    { data: [30, 50, 32, 40, 20], label: 'My First dataset' }
  ];

  public chartLabelsTrp: Array<any> = ['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5'];

  public chartColorsTrp: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];
  public chartOptionsTrp: any = { responsive: true };
  public chartClickedTrp(e: any): void { }
  public chartHoveredTrp(e: any): void { }



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
  public chartClickedSal(e: any): void { }
  public chartHoveredSal(e: any): void { }

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
  public chartClickedEvn(e: any): void { }
  public chartHoveredEvn(e: any): void { }
  ngOnInit(): void {
  }
}
