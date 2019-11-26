import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderList: Order[] = [];

  constructor(private http: HttpClient) { }

  removeEmpty(obj) {
    Object.keys(obj).forEach(key => (obj[key] == null || obj[key] == '') && delete obj[key]);
  }

  getOrderBycondition(condition: any) {
    this.removeEmpty(condition);
    const params = new HttpParams({ fromObject: condition });
    return this.http
      .get<Order[]>('workshop-api/api/orders/queryOrderByCondition', {
        params
      })
      .pipe(
        tap(response => {
          this.orderList = response;
        })
      );
  }
}
