import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';


const BACKEND_URL = 'http://localhost:45213/api/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient, private router: Router) { }

  addProduct(data)
  {
    this.http.post(BACKEND_URL + '/addProduct', data).pipe(take(1)).subscribe(res => {});
    return;
  }

  deleteProduct(product_id)
  {
    //currently this deletes, but eventually it will set a retired flag
    const data = {product_id}
    this.http.post(BACKEND_URL + '/deleteProduct', data).pipe(take(1)).subscribe(res => {});
    return;
  }

  getGroupProducts(data)
  {
    this.http.get<{rows}>(BACKEND_URL + '/getGroupProducts').pipe(take(1)).subscribe(res => {

      data.splice(0, data.length);

      for(var i = 0 ; i < res.rows.length; i++)
      {
        data.push(res.rows[i])
      }
    });
    return;
  }

  getAllProducts(data: String[])
  {
    this.http.get<{rows: String[]}>(BACKEND_URL + '/getAllProducts').pipe(take(1)).subscribe(res => {
      for(var  i = 0; i < res.rows.length; i++)
      {
        data.push(res.rows[i]);
      }
      
      return;
    });
  }

  updateProduct(newRecordData)
  {
    this.http.post(BACKEND_URL + '/updateProduct', newRecordData).pipe(take(1)).subscribe(res => {});
    return;
  }
}