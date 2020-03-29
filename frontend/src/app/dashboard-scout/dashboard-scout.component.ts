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

  constructor(public saleService: SaleService ) {     
    this.saleForm = new FormGroup({
    name: new FormControl(''),});
  }

  ngOnInit(): void {
  }

  onSale()
  {
    this.saleService.addSale(this.saleForm.value.name);
  }

}
