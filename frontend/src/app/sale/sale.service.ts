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

  addSale(name: String, quantity: Number, date: String, uid: String)
  {
    const data = {name, quantity, date, uid};
    this.http.post(BACKEND_URL + '/addSale', data).subscribe(res => {
      return res;
    });
  }

  getSales(uid: String, datasource)
  {
    const data = {uid}
    this.http.post<{rows}>(BACKEND_URL + '/getSales', data).subscribe(res => {
      datasource.data = res.rows;

      return res.rows;
    });
  }
}
