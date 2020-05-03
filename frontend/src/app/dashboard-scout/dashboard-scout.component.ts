import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { InventoryService } from '../../app/inventory/inventory.service';
import { Sale, Inventory} from '../../app/models/all.model';
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

  userIsAuth = false;
  private authListner: Subscription;
  private adminListner: Subscription;
  private leaderListner: Subscription;

  constructor( private inventoryService: InventoryService,
    private saleService: SaleService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public authService: AuthService,
    ) {
      localStorage.getAuthData

    }

  // auth
  // localStorage.getItem('userId');



  isLoading = true;


  sales: Sale[] = [];
  inventory: Inventory[] = [];



  // current item scout has
  currentItem = new Array();
  // get sale from each day
  currentSale = new Array();
  totalSale : number;

  // get current quantity for chart
  currentQuantity = new Array();

  // get total cookies
  quantityArr = new Array();
  totalCookies: number;

  // get sale on each day
  daySale = new Array();
  quantitySale = new Array();




  // subscription
  private inventorySub: Subscription;
  private saleSub: Subscription;



  // Sales chart

  public chartTypeSal: string = 'bar';
  public chartDatasetsSal: Array<any> =
  [
    {data: [], label: 'Cookies Sold'},
    {data: [], label: 'Total Sale $'},

  ];
  public chartLabelsSal: Array<any> = [];
  public chartOptionsSal: any = {
    responsive: true,
    title: {
      display:true,
      text: 'Sale Report',
      fontSize: 30
    },

    legend: { position: 'left'},
    scales: {
      xAxes: [{
        stacked: false,
        gridLines: {
          // color: 'rgba(100,100,100,0.0)'
        }
      }],
      yAxes: [{
        stacked: false,
          gridLines: {
          //  color: 'rgba(100,100,100,0.0)'
          }
        }
      ]
    }
  };

  public chartClickedSal(e: any): void { }
  public chartHoveredSal(e: any): void { }



  public chartTypeEvent: string = 'line';
  public chartDatasetsEvent: Array<any> = [{ data: [], label: 'Items Sold' }];
  public chartLabelsEvent: Array<any> = [];
  public chartColorsEvent: Array<any> = [ { backgroundColor: 'rgba(105, 0, 132, .2)'}];
  public chartOptionsEvent: any = {
    title: {
      display:true,
      text: 'Sale Event',
      fontSize: 30
    },
    responsive: true,
    legend: { position: 'left'},
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          // color: 'rgba(100,100,100,0.0)'
        }
      }],
      yAxes: [{
        stacked: true,
          gridLines: {
          //  color: 'rgba(100,100,100,0.0)'
          }
        }
      ]
    }
  };

  public chartClickedEvent(e: any): void { }
  public chartHoveredEvent(e: any): void { }





  ngOnInit() {

    this.saleService.getSales();
    this.saleSub = this.saleService
    .getAllSalesStatusListener()
    .subscribe(saleResult => {
      this.sales = saleResult;
      // this.dataSource = new MatTableDataSource<Sale>(this.sales);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      this.isLoading = false;


      // get total Sale
      this.currentSale = [... new Set(saleResult.map(p => p.quantity * p.price))]
      this.totalSale = this.currentSale.reduce(function(a,b){
        return a + b;
      }, 0)

      // import to chart
      var cookieHolder = {};

      // filter out the quantity
      saleResult.forEach(function(d) {
        if (cookieHolder.hasOwnProperty(d.productName)) {
          cookieHolder[d.productName] = cookieHolder[d.productName] + d.quantity;
        } else {
          cookieHolder[d.productName] = d.quantity;
        }
      });


      // filter out the price
      var priceHolder = {};
      saleResult.forEach(function(p){
          priceHolder[p.productName] =  p.price
      })


      // new obj quantity
      var obj = [];
      var arr1 = [];
      for (var prop in cookieHolder) {
        obj.push({ productName: prop, quantity: cookieHolder[prop] });
        arr1.push(cookieHolder[prop])
      }



      // new array for price
      var arr2 = [];
      for(var prop in priceHolder) {
        arr2.push(priceHolder[prop]);
      }


      // get item that the scout has
      this.currentItem = Array.from(new Set(obj.map(p => p.productName)));
      // get total quantity of each item
      this.chartLabelsSal = this.currentItem
      for(let res of obj) {
          this.chartDatasetsSal[0].data.push(res.quantity)
      }

      // get total sale of each item

      arr1.forEach((num1, index) => {
        var num2 = arr2[index]
        var total = num1 * num2;
        this.chartDatasetsSal[1].data.push(total);
      })


      // get sale of each day
      this.daySale = [... new Set(saleResult.map(p => p.saleDate))]
      this.quantitySale = [... new Set(saleResult.map(p=> p.quantity))]

      for(let res of this.daySale) {
        this.chartLabelsEvent.push(res)
      }

      for(let res of this.quantitySale) {
        this.chartDatasetsEvent[0].data.push(res)
      }

    });









    this.inventoryService.getInventory();
    this.inventorySub = this.inventoryService
    .getInventoryStatusListner()
    .subscribe(res => {
        this.inventory = res;
      this.quantityArr = Array.from(new Set(res.map(p => p.quantity)));
      this.totalCookies = this.quantityArr.reduce(function(a,b){
        return a + b;
      }, 0)





    });
  }

  ngOnDestroy() {
    this.saleSub.unsubscribe();
    this.inventorySub.unsubscribe();
  }

  //

}
