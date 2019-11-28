import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/service/customer.service';
import { ProductService } from 'src/app/service/product.service';
import { OrderService } from 'src/app/service/order.service';
import { count, delay, map } from 'rxjs/operators';
import { Order } from 'src/app/models/order';
import { MessageService } from 'primeng/components/common/messageservice';
import { Product } from 'src/app/models/product';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  addEditForm: FormGroup;
  orderSelected: Order;
  today = new Date();
  amount: number;
  product: Product;
  data: any;
  customerList: Customer[];
  productList: Product[];
  constructor(
    public customerService: CustomerService,
    public productService: ProductService,
    public orderService: OrderService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.customerService.getCostomer().subscribe(customerList => {
      this.customerList = customerList.map(itemCustomerList => {
        return { customerId: itemCustomerList.customerId, fullName: itemCustomerList.fullName };
      });
    });
    this.productService.getProduct().subscribe(productList => {
      this.productList = productList.map(itemProductList => {
        return { productId: itemProductList.productId, productName: itemProductList.productName, price: itemProductList.price };
      });
    });
    this.addEditForm = new FormGroup({
      orderId: new FormControl(''),
      orderDate: new FormControl(this.today, Validators.required),
      productId: new FormControl('', Validators.required),
      customerId: new FormControl('', Validators.required),
      // amount: new FormControl('', Validators.required),
      // total: new FormControl(''),
      status: new FormControl(true)
    });
    if (this.orderService.orderId) {
      this.orderService.getOrderById().subscribe(val => {
        this.product = { productId: val.product.productId, productName: val.product.productName, price: val.product.price };
        this.amount = val.amount;
        this.data = {
          orderDate: val.orderDate,
          status: (val.status === 'Y' ? true : false),
          customerId: val.customer,
          orderId: val.orderId
        };
        this.addEditForm.patchValue({
          ...this.data, orderDate: new Date(this.data.orderDate),
          customerId: { customerId: this.data.customerId.customerId, fullName: this.data.customerId.fullName },
          productId: { productId: val.product.productId, productName: val.product.productName, price: val.product.price }
        });
      });
    }
  }

  submitBtn() {
    if (this.addEditForm.valid) {
      if (this.orderService.orderId) {
        let data = this.addEditForm.getRawValue();
        data = {
          orderId: data.orderId, orderDate: data.orderDate.toISOString(),
          product: { productId: this.product.productId }, customer: { customerId: data.customerId.customerId },
          amount: this.amount, status: (data.status === true ? 'Y' : 'N')
        };
        this.orderService.updateOrder(data).subscribe(val => {
          if (val['Message'] === 'Success') {
            this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Order Edited.' });
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Message', detail: 'Error, Can\'t Edit this Order.' });
          }
        });
      } else {
        let data = this.addEditForm.getRawValue();
        data = {
          orderId: data.orderId, orderDate: data.orderDate.toISOString(),
          product: { productId: this.product.productId }, customer: { customerId: data.customerId.customerId },
          amount: this.amount, status: (data.status === true ? 'Y' : 'N')
        };
        console.log('Add', data);
        this.orderService.createOrder(data).subscribe(val => {
          if (val['Message'] === 'Success') {
            this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Order Created.' });
            this.addEditForm.patchValue({
              orderId: '',
              orderDate: this.today,
              productId: '',
              customerId: '',
              amount: '',
              total: '',
              status: true
            });
            this.product = null;
            this.amount = null;
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Message', detail: 'Error, Can\'t Create Order.' });
          }
        });
      }
    }
  }

  cancelBtn() {
    if (this.orderSelected) {
      this.addEditForm.patchValue({
        productId: '',
        customerId: '',
        amount: '',
        total: '',
        status: true
      });
      this.product = null;
      this.amount = null;
    } else {
      this.addEditForm.patchValue({
        orderId: '',
        orderDate: this.today,
        productId: '',
        customerId: '',
        amount: '',
        total: '',
        status: true
      });
      this.product = null;
      this.amount = null;
    }
  }
}