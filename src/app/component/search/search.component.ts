import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;

  constructor(
    public productService: ProductService,
    public orderService: OrderService
  ) { }

  ngOnInit() {
    this.productService.getProduct().subscribe();
    this.searchForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      productId: new FormControl('')
    });
  }

  searchBtn() {
    let data = {
      firstName: this.searchForm.get('firstName').value,
      lastName: this.searchForm.get('lastName').value,
      email: this.searchForm.get('email').value,
      productId: this.searchForm.get('productId').value
    };
    data = { ...data, productId: data.productId.productId };
    this.orderService.getOrderBycondition(data).subscribe();
  }

  cancelBtn() {
    this.searchForm.patchValue({
      firstName: '',
      lastName: '',
      email: '',
      productId: ''
    });
    this.orderService.orderList = [];
  }

  onAdd() {
    this.orderService.orderSelected = null;
  }

}
