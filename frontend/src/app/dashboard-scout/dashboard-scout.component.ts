import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard-scout',
  templateUrl: './dashboard-scout.component.html',
  styleUrls: ['./dashboard-scout.component.scss']
})
export class DashboardScoutComponent implements OnInit {

  displayedColumns: string[] = ['item', 'remaining', 'sold', 'quantity', 'cost', 'total'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor() { }

  public chartType = 'bar';
  searchText = '';

  public chartDatasets: Array<any> = [
    { data: [300, 170, 95, 81, 140], label: 'Sold' },
    { data: [120, 70, 42, 64, 98], label: 'Unsold Inventory' },
  ];

  public chartLabels: Array<any> = ['Oreo', 'Thin Mints', 'Chocolate Chip', 'Smores', 'Crackers'];

    public chartColors: Array<any> = [
      {
        backgroundColor: [
          'rgba(0,51,102,0.8)',
          'rgba(0,51,102,0.8)',
          'rgba(0,51,102,0.8)',
          'rgba(0,51,102,0.8)',
          'rgba(0,51,102,0.8)'
        ],
        borderColor: [
          'rgba(0,51,102,1)',
          'rgba(0,51,102,1)',
          'rgba(0,51,102,1)',
          'rgba(0,51,102,1)',
          'rgba(0,51,102,1)'
        ],
        borderWidth: 2,
      },
      {
        backgroundColor: [
          'rgba(255,255,102,0.8)',
          'rgba(255,255,102,0.8)',
          'rgba(255,255,102,0.8)',
          'rgba(255,255,102,0.8)',
          'rgba(255,255,102,0.8)'
        ],
        borderColor: [
          'rgba(255,255,102,1)',
          'rgba(255,255,102,1)',
          'rgba(255,255,102,1)',
          'rgba(255,255,102,1)',
          'rgba(255,255,102,1)'
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
      editField: string;

  validatingForm: FormGroup;


  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.validatingForm = new FormGroup({
      contactFormModalName: new FormControl('', Validators.required),
      contactFormModalEmail: new FormControl('', Validators.email),
      contactFormModalSubject: new FormControl('', Validators.required),
      contactFormModalMessage: new FormControl('', Validators.required)
    });
  }

  get contactFormModalName() {
    return this.validatingForm.get('contactFormModalName');
  }

  get contactFormModalEmail() {
    return this.validatingForm.get('contactFormModalEmail');
  }

  get contactFormModalSubject() {
    return this.validatingForm.get('contactFormModalSubject');
  }

  get contactFormModalMessage() {
    return this.validatingForm.get('contactFormModalMessage');
  }

  // chart
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}

export interface PeriodicElement {
  remaining: number;
  item: string;
  sold: number;
  quantity: number;
  cost: number;
  total: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {item: 'Oreo', remaining: 20, sold: 30, quantity: 50, cost: 3.99, total: 119.7},
  {item: 'Thin Mint', remaining: 12, sold: 26, quantity: 40, cost: 2.99, total: 90.2},
  {item: 'Smores', remaining: 32, sold: 29, quantity: 60, cost: 3.99, total: 119.7},
  {item: 'Crackers', remaining: 42, sold: 43, quantity: 90, cost: 3.99, total: 119.7},
  {item: 'Chocolate Chip', remaining: 31, sold: 31, quantity: 62, cost: 3.99, total: 119.7},
  {item: 'Crackers', remaining: 42, sold: 43, quantity: 90, cost: 3.99, total: 119.7},
  {item: 'Chocolate Chip', remaining: 31, sold: 31, quantity: 62, cost: 3.99, total: 119.7},
];
