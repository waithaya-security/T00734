import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { OrderListComponent } from '../order-list/order-list.component';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    SearchComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    ReactiveFormsModule,
    RouterModule,
    ToastModule
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
