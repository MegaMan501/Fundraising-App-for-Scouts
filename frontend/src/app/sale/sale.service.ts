// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// Rxjs
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

// Internal
import { Sale } from '../models/all.model';
import { environment as env } from '../../environments/environment';

const BACKEND_URL = env.BACKEND_URL + 'sales';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  sales: Sale[] = [];
  private allSalesStatusListner = new Subject<Sale[]>();

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  getReturnedGroups() { return this.sales; }
  getAllSalesStatusListener() { return this.allSalesStatusListner.asObservable(); }

  addSale(pid: String, quantity: Number, date: String)
  {
    const data = {pid, quantity, date};
    this.http.post<{rows: any}>(BACKEND_URL + '/add-sale', data)
    .pipe(
      map((saleData) => {
        return {
          sales: saleData.rows.map(s => {
            return {
              saleId: s.sale_id,
              productId: s.prod_name,
              quantity: s.quantity,
              price: s.price,
              saleDate: s.sale_date              
            };
          }),
        };
      })
    ).subscribe(res => {
      this.sales = res.sales;
      this.allSalesStatusListner.next([...this.sales]);
    }, err => {
      console.error(err);
    });
  }

  getSales()
  {
    this.http.get<{rows: any}>(
      BACKEND_URL + '/get-sales'
      ).pipe(
      map((saleData) => {
        return {
          sales: saleData.rows.map(s => {
            return {
              saleId: s.sale_id,
              productId: s.prod_name,
              quantity: s.quantity,
              price: s.price,
              saleDate: s.sale_date
            };
        }),
      };
    })
  )
  .subscribe(modData => {
    this.sales = modData.sales;
    this.allSalesStatusListner.next([...this.sales]);
  });
  }

  getGroupSales()
  {
    this.http.get<{rows: any}>(
      BACKEND_URL + '/group-sales'
      ).pipe(
      map((saleData) => {
        return {
          sales: saleData.rows.map(s => {
            return {
              groupId: s.group_id,
              userId: s.user_id,
              fullname: s.full_name,
              email: s.email
            };
        }),
      };
    })
  )
  .subscribe(modData => {
    // console.log(modData.scouts);
    this.sales = modData.sales;
    this.allSalesStatusListner.next([...this.sales]);
  });
  }

  updateSale(data: any)
  {
    this.http.put<{message: string}>(BACKEND_URL + '/update-sale/', data).subscribe(res => {
      this.snackBar.open(res.message, 'Okay', { duration: 5000 });
    });
  }

  deleteSale(id: number) {
    return this.http.delete<{message: string}>(BACKEND_URL + '/delete-sale/' + id);
  }
}
