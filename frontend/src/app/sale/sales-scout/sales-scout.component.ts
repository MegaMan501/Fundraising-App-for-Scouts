import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { InventoryService } from '../../inventory/inventory.service';
import { SaleService } from '../sale.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sale } from '../../models/all.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/dialogs/delete/dialog-delete.component';
import { DialogEditInventoryComponent } from 'src/app/dialogs/edit-inventory/edit-inventory.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sales-scout',
  templateUrl: './sales-scout.component.html',
  styleUrls: ['./sales-scout.component.scss']
})
export class SalesScoutComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoading = true;

  saleForm: FormGroup;
  productList = new Array();
  selectedProduct: number;

  displayedColumns: string[] = ['productName', 'quantity', 'price', 'saleDate', 'action'];
  dataSource = new MatTableDataSource<Sale>();

  sales: Sale[] = [];
  inventory = new Array();
  private inventorySub: Subscription;
  private saleSub: Subscription;

  constructor(
    private inventoryService: InventoryService,
    private saleService: SaleService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) {
    this.saleForm = new FormGroup({
      product: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      date: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(){
    this.saleService.getSales();
    this.saleSub = this.saleService
    .getAllSalesStatusListener()
    .subscribe(res => {
      this.sales = res;
      this.dataSource = new MatTableDataSource<Sale>(this.sales);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });

    this.inventoryService.getInventory();
    this.inventorySub = this.inventoryService
    .getInventoryStatusListner()
    .subscribe(res => {
      this.inventory = Array.from(new Set(res.map(p => p.productId)));
      this.productList = Array.from(new Set(res.map(p => p.name)));
    });
  }

  onAddSale(formDirective: FormGroupDirective) {
    this.saleService.addSale(
      this.inventory[this.selectedProduct],
      formDirective.value.quantity,
      formDirective.value.date.toISOString().slice(0, 19).replace('T', ' ')
      );

      formDirective.resetForm();
      this.saleForm.reset();
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  onEdit(row) {

  }

  // Delete the product
  onDelete(row) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        title: 'Are You Sure You Want to Delete this Product?',
        val: row
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.isLoading = true;
        this.saleService.deleteSale(row.saleId).subscribe(msg => {
          this.snackbar.open(msg.message.toString(), 'Okay', { duration: 5000 });
          this.saleService.getSales();
          this.isLoading = false;
        });
      }
      return;
    });
  }

  onRefreshSale(){

  }

  ngOnDestroy() {
    this.inventorySub.unsubscribe();
    this.saleSub.unsubscribe();
  }
}
