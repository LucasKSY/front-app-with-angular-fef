import { Component } from '@angular/core';
import { Customer } from './model/customer';
import { CustomerService } from './service/customer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "";
  customer = {} as Customer;
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}
  
  saveCar(form: NgForm) {

      this.customerService.createCustomer(this.customer).subscribe(() => {});
    }
  }
