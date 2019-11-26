import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/service/customer.service';
import { ProductService } from 'src/app/service/product.service';
import { OrderService } from 'src/app/service/order.service';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  addEditForm: FormGroup;

  constructor(
    public customerService: CustomerService,
    public productService: ProductService,
    public orderService: OrderService
  ) { }

  ngOnInit() {
    this.customerService.getCostomer().subscribe();
    this.productService.getProduct().subscribe();
    this.addEditForm = new FormGroup({
      orderDate: new FormControl('', Validators.required),
      productId: new FormControl('', Validators.required),
      customerId: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      total: new FormControl(''),
      status: new FormControl('')
    });
    const orderSelected = this.orderService.orderSelected;
    console.log('cus', this.addEditForm.get);
    const data = {
      orderDate: orderSelected.orderDate, amount: orderSelected.amount, total: orderSelected.total, status: orderSelected.status,
      productId: orderSelected.product, customerId: orderSelected.customer
    };
    console.log('data', data);
    if (orderSelected) {
      this.addEditForm.patchValue({
        ...data, orderDate: new Date(data.orderDate)
      });
    }
  }

  submitBtn() {

  }

  cancelBtn() {

  }

}
