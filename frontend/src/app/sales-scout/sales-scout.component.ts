import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { SaleService } from '../sale/sale.service';
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
  uid = localStorage.getItem('userId');
  displayedColumns: string[] = ['prod_name', 'quantity', 'price', 'sale_date'];
  dataSource = new MatTableDataSource<String>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(public saleService: SaleService) {     
    this.saleForm = new FormGroup({
    name: new FormControl(''),
    quantity: new FormControl(''),
    date: new FormControl('')
  })}

  async ngOnInit(){
    await this.getSales(1);
    this.dataSource.sort = this.sort;
    return;
  }

  async onSale()
  {
    //price, and productid have to be retrieved from the database before they can be added
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
}
