import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/service/customer.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  addEditForm: FormGroup;

  constructor(
    public customerService: CustomerService,
    public productService: ProductService
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
  }

  submitBtn() {

  }

  cancelBtn() {

  }

}
