import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SaleService } from '../sale/sale.service';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard-scout',
  templateUrl: './dashboard-scout.component.html',
  styleUrls: ['./dashboard-scout.component.scss']
})
export class DashboardScoutComponent implements OnInit {

  saleForm: FormGroup;
  quantityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  uid = localStorage.getItem('userId');
  displayedColumns: string[] = ['product_id', 'quantity', 'price', 'sale_date'];
  dataSource = new MatTableDataSource<String>();

  constructor(public saleService: SaleService) {     
    this.saleForm = new FormGroup({
    name: new FormControl(''),
    quantity: new FormControl(''),
    date: new FormControl('')
  })}

  ngOnInit(): void {
    this.getSales();
  }

  async onSale()
  {
    //price, and productid have to be retrieved from the database before they can be added
    let temp = await this.addSale(1);
    this.getSales();
  }

  addSale(x)
  {
    var formatted = new DatePipe('en-US').transform(this.saleForm.value.date, 'yyyy-MM-dd');
    console.log(formatted);
    return new Promise( resolve => {
      this.saleService.addSale(this.saleForm.value.name, this.saleForm.value.quantity, formatted, this.uid);
      setTimeout(() => {resolve(x);}, 100);
    });
  }

  getSales()
  {
    this.saleService.getSales(this.uid, this.dataSource);
  }
}
