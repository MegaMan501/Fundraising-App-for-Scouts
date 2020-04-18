import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { SaleService } from '../sale/sale.service';
import { InventoryService } from '../inventory/inventory.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-sales-scout',
  templateUrl: './sales-scout.component.html',
  styleUrls: ['./sales-scout.component.scss']
})
export class SalesScoutComponent implements OnInit {

  saleForm: FormGroup;
  quantityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  productList = new Array();
  uid = localStorage.getItem('userId');
  displayedColumns: string[] = ['prod_name', 'quantity', 'price', 'sale_date'];
  dataSource = new MatTableDataSource<String>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(public saleService: SaleService, public inventoryService: InventoryService) {     
    this.saleForm = new FormGroup({
    name: new FormControl('', Validators.required),
    quantity: new FormControl('',Validators.required),
    date: new FormControl('',Validators.required)
  })}

  async ngOnInit(){
    await this.getInventory(1);
    await this.getSales(1);
    this.dataSource.sort = this.sort;
    return;
  }

  async onSale()
  {
    await this.addSale(1);
    this.getSales(1);
    return;
  }

  addSale(x)
  {
    var formatted = new DatePipe('en-US').transform(this.saleForm.value.date, 'yyyy-MM-dd');
    return new Promise( resolve => {
      this.saleService.addSale(this.saleForm.value.name, this.saleForm.value.quantity, formatted, this.uid);
      setTimeout(() => {resolve(x);}, 100);
    });
  }

  getSales(x)
  {
    return new Promise( resolve => {
      this.saleService.getSales(this.uid, this.dataSource);
      setTimeout(() => {resolve(x);}, 100);
    });
  }

  getInventory(x)
  {
    return new Promise( resolve => {
      this.inventoryService.getAllProducts(this.productList);
      setTimeout(() => {resolve(x);}, 100);
    });
  }
}
