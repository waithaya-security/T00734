import { Customer } from './customer';
import { Product } from './product';

export interface Order {
    orderId: number;
    amount: number;
    total: number;
    orderDate: Date;
    status: string;
    costomer: Customer;
    product: Product;
}
