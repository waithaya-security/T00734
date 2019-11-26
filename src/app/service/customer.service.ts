import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerList: Customer[] = [];

  constructor(private http: HttpClient) { }

  getCostomer() {
    return this.http
      .get<Customer[]>('workshop-api/api/customer')
      .pipe(
        tap(response => {
          this.customerList = response;
        })
      );
  }
}
