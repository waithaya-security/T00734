import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: Product[] = [];

  constructor(private http: HttpClient) { }

  getProduct() {
    return this.http
      .get<Product[]>('workshop-api/api/product')
      .pipe(
        tap(response => {
          this.productList = response;
        })
      );
  }
}
