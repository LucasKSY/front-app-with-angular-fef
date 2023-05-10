import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service'; 
import { Customer } from '../customer';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer: Customer = new Customer();
  submitted = false;

  constructor(private customerService: CustomerService,
    private router: Router) { }

  ngOnInit() {
  }

  save() {
    this.customerService
    .createCustomer(this.customer).subscribe(data => {
      console.log(data)
      this.customer = new Customer();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() {
    alert(this.customer.firstNameCustomer)
    this.submitted = true;
    this.save();   
  }



  gotoList() {
    this.router.navigate(['/employees']);
  }
}
