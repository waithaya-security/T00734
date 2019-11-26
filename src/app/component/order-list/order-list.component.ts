import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(
    public orderService: OrderService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {

  }

  onEdit(e) {
    this.orderService.orderSelected = e;
    this.router.navigate(['/add']);
  }

  onDel(id, index) {
    this.orderService.delRespont = '';
    this.orderService.delOrder(id).subscribe(val => {
      if (val['Message'] === 'Success') {
        this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Data Deleted.' });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Message', detail: 'Error, Can\'t Delete.' });
      }
    });
    this.orderService.orderList.splice(index,1);
  }

}
