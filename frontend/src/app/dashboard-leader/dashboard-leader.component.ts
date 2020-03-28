import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-leader',
  templateUrl: './dashboard-leader.component.html',
  styleUrls: ['./dashboard-leader.component.scss']
})
export class DashboardLeaderComponent implements OnInit {
  panelOpenState = false;

  constructor() { }


  public chartType: string = 'bar';

public chartDatasets: Array<any> = [
  { data: [65, 59, 57, 20, 56, 55, 40], label: 'Sold' },
  { data: [96, 80, 120, 80, 60, 111, 101], label: 'Total' },
];

public chartLabels: Array<any> = ['Thin Mints', 'Caramel Delites', 'Peanut Butter', 'Smores', 'Chocolate Chip', 'Shortbread'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132)',
        'rgba(54, 162, 235)',
        'rgba(255, 206, 86)',
        'rgba(75, 192, 192)',
        'rgba(153, 102, 255)',
        'rgba(255, 159, 64)'
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
    },
    {
      backgroundColor: [
        'rgba(255, 125, 158, 0.2)',
        'rgba(3, 111, 184, 0.2)',
        'rgba(255, 255, 137, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(126, 243, 243, 0.2)',
        'rgba(255, 210, 115, 0.2)'
      ],
      borderColor: [
        'rgba(255, 125, 158)',
        'rgba(3, 111, 184)',
        'rgba(255, 255, 137)',
        'rgba(75, 192, 192)',
        'rgba(126, 243, 243)',
        'rgba(255, 210, 115)'
      ],
      borderWidth: 2,
    },
    ];

    public chartOptions: any = {
      responsive: true,
        scales: {
          xAxes: [{
            stacked: true
            }],
          yAxes: [
          {
            stacked: true
          }
        ]
      }
    };
    public chartClicked(e: any): void { }
    public chartHovered(e: any): void { }

  ngOnInit(): void {
  }

}
