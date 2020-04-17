import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';

@Component({
  selector: 'app-inventory-leader',
  templateUrl: './inventory-leader.component.html',
  styleUrls: ['./inventory-leader.component.scss']
})
export class InventoryLeaderComponent implements OnInit {

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
      inventoryList: Array<any> = [
        { id: 1, item: 'Oreo', cost: 2.50, price: 3.50, quantity: 420, description: 'Vegan - dairy free' },
        { id: 2, item: 'Thin Mints', cost: 1.99, price: 2.99, quantity: 240, description: 'Vegan - dairy free' },
        { id: 3, item: 'Chocolate Chip', cost: 3.99, price: 4.99, quantity: 137, description: 'Contains dairy - non-vegan' },
        { id: 4, item: 'Smores', cost: 4.99, price: 5.99, quantity: 145, description: 'Contains dairy - non-vegan' },
        { id: 5, item: 'Crackers', cost: 2.99, price: 3.99, quantity: 238, description: 'Contains dairy - non-vegan' },
      ];

      awaitinginventoryList: Array<any> = [
        { id: 6, item: 'Oreo', cost: 2.50, price: 3.50, quantity: 420, description: 'Vegan - dairy free' },
        { id: 7, item: 'Thin Mints', cost: 1.99, price: 2.99, quantity: 240, description: 'Vegan - dairy free' },
        { id: 8, item: 'Chocolate Chip', cost: 3.99, price: 4.99, quantity: 137, description: 'Contains dairy - non-vegan' },
        { id: 9, item: 'Smores', cost: 4.99, price: 5.99, quantity: 145, description: 'Contains dairy - non-vegan' },
        { id: 10, item: 'Crackers', cost: 2.99, price: 3.99, quantity: 238, description: 'Contains dairy - non-vegan' },
      ];

  groups = ['Group 1', 'Group2', 'Group3'];


  ngOnInit(): void {
  }

  // chart
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.inventoryList[id][property] = editField;
  }

  remove(id: any) {
    this.awaitinginventoryList.push(this.inventoryList[id]);
    this.inventoryList.splice(id, 1);
  }

  add() {
    if (this.awaitinginventoryList.length > 0) {
      const person = this.awaitinginventoryList[0];
      this.inventoryList.push(person);
      this.awaitinginventoryList.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  onSelect(inventory) {

  }

}
