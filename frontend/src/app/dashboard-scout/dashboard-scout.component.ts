import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { InventoryService } from '../../app/inventory/inventory.service';
import { Sale } from '../../app/models/all.model';
import { SaleService } from '../../app/sale/sale.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard-scout',
  templateUrl: './dashboard-scout.component.html',
  styleUrls: ['./dashboard-scout.component.scss']
})
export class DashboardScoutComponent implements OnInit {

  constructor( private inventoryService: InventoryService,
    private saleService: SaleService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar) {
    }


  sales: Sale[] = [];
  productList = new Array();
  inventory= new Array();


  // subscription
  private inventorySub: Subscription;
  private saleSub: Subscription;



  // Sales chart
  public chartTypeSal: string = 'bar';
  public chartTitle: string = "";
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
    responsive: true,

    title: {
      display:true,
      text: 'Sale Report',
      fontSize: 30
    }
  };

  public chartClickedSal(e: any): void { }
  public chartHoveredSal(e: any): void { }







  ngOnInit() {

    this.saleService.getSales();
    this.saleSub = this.saleService
    .getAllSalesStatusListener()
    .subscribe(saleResult => {
      this.sales = saleResult;
      // this.dataSource = new MatTableDataSource<Sale>(this.sales);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      // this.isLoading = false;
      console.log(saleResult);
    });

    this.inventoryService.getInventory();
    this.inventorySub = this.inventoryService
    .getInventoryStatusListner()
    .subscribe(res => {

      this.inventory = Array.from(new Set(res.map(p => p.productId)));
      this.productList = Array.from(new Set(res.map(p => p.name)));

      // console.log(this.inventory)
      console.log(res)


    });
  }

  ngOnDestroy() {
    this.saleSub.unsubscribe();
    this.inventorySub.unsubscribe();
  }

  //

}
