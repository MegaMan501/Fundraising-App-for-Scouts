import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const BACKEND_URL = 'http://localhost:45213/api/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient, private router: Router) { }

  getAllProducts(data: String[])
  {
    this.http.get<{rows: String[]}>(BACKEND_URL + '/getAllProducts').subscribe(res => {
      for(var  i = 0; i < res.rows.length; i++)
      {
        data.push(res.rows[i]);
      }
      
      return;
    });
  }
}
