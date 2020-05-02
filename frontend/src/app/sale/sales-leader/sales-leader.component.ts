import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SaleService } from '../sale.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { detailedSale } from '../../models/all.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-sales-leader',
  templateUrl: './sales-leader.component.html',
  styleUrls: ['./sales-leader.component.scss']
})
export class SalesLeaderComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  totalSales = 0;
  isLoading = true;
  displayedColumns: string[] = ['groupId', 'scoutName', 'productName', 'quantity', 'price', 'saleDate'];
  sales: detailedSale[] = [];
  dataSource: MatTableDataSource<detailedSale>;
  private saleSub: Subscription;

  // pie chart
  public saleChartLabels: Array<any> = [];
  public saleChartData: Array<any> = [ {data: [], label: 'Total Sales'} ];
  public saleChartType: ChartType = 'pie';
  public saleChartLegend = true;
  public saleChartOptions: any = { responsive: true, legend: { position: 'bottom'} };
  public saleChartColors: Array<any> = [ { backgroundColor: [], borderWidth: 0.1 } ];

  constructor(
    private saleService: SaleService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.saleService.getGroupSales();
    this.saleSub = this.saleService
    .getAllDSalesStatusListener()
    .subscribe(res => {
      this.sales = res;
      this.dataSource = new MatTableDataSource<detailedSale>(this.sales);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      const products: string[] = [];
      const prodQty: number[] = [];

      this.sales.forEach(s => {
        if (!products.includes(s.productName)) {
          products.push(s.productName);
          prodQty.push(s.quantity);
          this.saleChartColors[0].backgroundColor.push(this.getRandomColor());
          this.totalSales += s.quantity * s.price;
        } else {
          prodQty[products.indexOf(s.productName)] += s.quantity;
          this.totalSales += s.quantity * s.price;
        }
      });

      this.saleChartData[0].data = prodQty;
      this.saleChartLabels = products;
      this.isLoading = false;
    });
  }

  onRefreshInventory() {
    this.isLoading = true;
    this.saleService.getGroupSales();
    this.isLoading = false;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
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
    this.saleSub.unsubscribe();
  }
}
