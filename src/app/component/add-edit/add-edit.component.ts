import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/service/customer.service';
import { ProductService } from 'src/app/service/product.service';
import { OrderService } from 'src/app/service/order.service';
import { count } from 'rxjs/operators';
import { Order } from 'src/app/models/order';
import { MessageService } from 'primeng/components/common/messageservice';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  addEditForm: FormGroup;
  orderSelected: Order;
  today = new Date();
  total: number;
  price: number;
  amount: number;
  product: Product;

  constructor(
    public customerService: CustomerService,
    public productService: ProductService,
    public orderService: OrderService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.customerService.getCostomer().subscribe();
    this.productService.getProduct().subscribe();
    this.addEditForm = new FormGroup({
      orderId: new FormControl(''),
      orderDate: new FormControl(this.today, Validators.required),
      productId: new FormControl('', Validators.required),
      customerId: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      total: new FormControl(''),
      status: new FormControl(true)
    });
    this.orderSelected = this.orderService.orderSelected;
    if (this.orderSelected) {
      const data = {
        orderDate: this.orderSelected.orderDate, amount: this.orderSelected.amount, total: this.orderSelected.total,
        status: (this.orderSelected.status === 'Y' ? true : false), productId: this.orderSelected.product,
        customerId: this.orderSelected.customer, orderId: this.orderSelected.orderId
      };
      this.addEditForm.patchValue({
        ...data, orderDate: new Date(data.orderDate)
      });
    }
  }

  submitBtn() {
    if (this.addEditForm.valid) {
      if (this.orderSelected) {
        let data = this.addEditForm.getRawValue();
        data = {
          orderId: data.orderId, orderDate: data.orderDate.toISOString(),
          product: { productId: data.productId.productId }, customer: { customerId: data.customerId.customerId },
          amount: data.amount, status: (data.status === true ? 'Y' : 'N')
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
          orderDate: data.orderDate.toISOString(),
          product: { productId: data.productId.productId }, customer: { customerId: data.customerId.customerId },
          amount: data.amount, status: (data.status === true ? 'Y' : 'N')
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
        orderId: '',
        orderDate: '',
        productId: '',
        customerId: '',
        amount: '',
        total: '',
        status: true
      });
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
    }
  }
}
