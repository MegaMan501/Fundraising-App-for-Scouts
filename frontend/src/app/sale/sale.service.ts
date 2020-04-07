import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const BACKEND_URL = 'http://localhost:45213/api/sales';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient, private router: Router) { }

  addSale(name: String, quantity: Number, date: Date, uid: String)
  {
    const data = {name, quantity, date, uid};
    this.http.post(BACKEND_URL + '/addSale', data).subscribe(res => {
      console.log(res);
    });
  }
}
