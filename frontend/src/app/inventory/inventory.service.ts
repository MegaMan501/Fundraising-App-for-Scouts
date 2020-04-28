import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment as env } from '../../environments/environment';
import { Inventory } from '../models/all.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

const BACKEND_URL = env.BACKEND_URL + 'inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private inventory: Inventory[] = [];
  private inventoryStatusListner = new Subject<Inventory[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // Getters
  getReturnedInventory() { return this.inventory; }
  getInventoryStatusListner() { return this.inventoryStatusListner.asObservable(); }

  // CRUD for the inventory
  getInventory() {
    this.http.get<{rows: any}>(
      BACKEND_URL + '/products'
    ).pipe(
      map((prodData) => {
        return {
          products: prodData.rows.map(e => {
            return {
              productId: e.product_id,
              desc: e.description,
              name: e.prod_name,
              cost: e.cost,
              weight: e.weight,
              salePrice: e.sales_price,
              quantity: e.quantity,
              groupId: e.group_id
            };
          })
        };
      })
    ).subscribe(modData => {
      this.inventory = modData.products;
      // console.log(modData);
      this.inventoryStatusListner.next([...this.inventory]);
    });
  }

  getAllInventory(id: number) {
    console.log(id);
  }

  createInventory(
    groupId: number,
    name: string,
    desc: string,
    weight: number,
    cost: number,
    quantity: number,
    salePrice: number
  ) {
    const data = { groupId, name, desc, weight, cost, quantity, salePrice };

    return this.http.post<{rows: any}>(BACKEND_URL + '/products-add', data)
      .pipe(
        map((inventoryData) => {
          return {
            inventory: inventoryData.rows.map(e => {
              return {
                productId: e.product_id,
                desc: e.description,
                name: e.prod_name,
                cost: e.cost,
                weight: e.weight,
                salePrice: e.sales_price,
                quantity: e.quantity,
                groupId: e.group_id
              };
            })
          };
        })
      ).subscribe(res => {
        this.inventory = res.inventory;
        this.inventoryStatusListner.next([...this.inventory]);
      }, err => {
        console.log(err);
      });
  }

  updateInventory(data: any) {
    // console.log(data);
    this.http.put<{message: string}>(BACKEND_URL + '/products/' + data.productId, data).subscribe(res => {
      // console.log(res.message);
      this.snackBar.open(res.message, 'Okay', { duration: 5000 });
    });
  }

  deleteInventory(id: number) {
    // console.log(id);
    return this.http.delete<{message: string}>(BACKEND_URL + '/products/' + id);
  }
}
