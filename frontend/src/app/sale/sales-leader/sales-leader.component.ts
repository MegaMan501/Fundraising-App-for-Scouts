import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SaleService } from '../sale.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { detailedSale } from '../../models/all.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-sales-leader',
  templateUrl: './sales-leader.component.html',
  styleUrls: ['./sales-leader.component.scss']
})
export class SalesLeaderComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoading = true;
  displayedColumns: string[] = ['groupId', 'scoutName', 'productName', 'quantity', 'price', 'saleDate'];
  sales: detailedSale[] = [];

  dataSource: MatTableDataSource<detailedSale>;
  private saleSub: Subscription;

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
      this.isLoading = false;
    });
  }

  onRefreshInventory() {
    this.isLoading = true;
    this.saleService.getGroupSales();
    this.isLoading = false;
  }

  onAddInventory(formDirective: FormGroupDirective) {

  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  onEdit(row) {

  }

  // Delete the product
  onDelete(row) {

  }

  ngOnDestroy() {
    this.saleSub.unsubscribe();
  }
}
