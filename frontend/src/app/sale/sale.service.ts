import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const BACKEND_URL = 'http://localhost:3306/api/sales';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient, private router: Router) { }

  addSale(name: String)
  {
    const data = {name};
    this.http.post(BACKEND_URL + '/addsale', data).subscribe(res => {
      
    });
    console.log("h");
  }
}
