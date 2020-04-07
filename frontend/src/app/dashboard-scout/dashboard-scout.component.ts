import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SaleService } from '../sale/sale.service';

@Component({
  selector: 'app-dashboard-scout',
  templateUrl: './dashboard-scout.component.html',
  styleUrls: ['./dashboard-scout.component.scss']
})
export class DashboardScoutComponent implements OnInit {

  saleForm: FormGroup;
  quantityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  uid = localStorage.getItem('userId');

  constructor(public saleService: SaleService ) {     
    this.saleForm = new FormGroup({
    name: new FormControl(''),
    quantity: new FormControl(''),
    date: new FormControl('')
  });
  }

  ngOnInit(): void {
  }

  onSale()
  {
    //price, and productid have to be retrieved from the database before they can be added
    this.saleService.addSale(this.saleForm.value.name, this.saleForm.value.quantity, this.saleForm.value.date, this.uid);
  }

}
