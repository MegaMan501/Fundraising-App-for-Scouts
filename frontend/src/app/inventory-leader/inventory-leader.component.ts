import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { InventoryService } from '../inventory/inventory.service'

@Component({
  selector: 'app-inventory-leader',
  templateUrl: './inventory-leader.component.html',
  styleUrls: ['./inventory-leader.component.scss']
})
export class InventoryLeaderComponent implements OnInit {

  constructor(private inventoryService: InventoryService) { }

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
      inventoryList = new Array(); 
      awaitinginventoryList = new Array();

  groups = ['Group 1', 'Group2', 'Group3'];


  async ngOnInit(){
    await this.getInventory(1)
    this.awaitinginventoryList = this.inventoryList
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
    return;
  }

  async remove(id: any) {
    try {
      await this.deleteInventory(1, id);
      await this.getInventory(1);
      return;
    }
    catch(err){
      console.log(err);
    }
  }

  add() {
    if (this.awaitinginventoryList.length > 0) {
      const item = {product_id: -1, prod_name: "Insert name", description: "Insert description", weight: 0, cost: 0, sales_price:0};
      this.inventoryList.push(item);
    }

    return;
  }

  async update(id: any) {
    let item = this.inventoryList[id]
    console.log(this.inventoryList[id].product_id);
    if(item.product_id == -1)
    {
      await this.addInventory(1, id);
      await this.getInventory(1);
      this.awaitinginventoryList = this.inventoryList;
      
    }
    else
    {
      this.inventoryService.updateProduct(this.inventoryList[id])
    }

    return;
  }


  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
    return;
  }

  onSelect(inventory) {

  }

  addInventory(x, id)
  {
    return new Promise( resolve => {
      this.inventoryService.addProduct(this.inventoryList[id])
      setTimeout(() => {resolve();}, x);
    });
  }

  deleteInventory(x, id)
  {
    return new Promise( resolve => {
      this.inventoryService.deleteProduct(this.inventoryList[id].product_id);
      setTimeout(() => {resolve();}, x);
    });
  }

  getInventory(x)
  {
    return new Promise( resolve => {
      this.inventoryService.getGroupProducts(this.inventoryList);
      setTimeout(() => {resolve();}, x);
    });
  }
}
