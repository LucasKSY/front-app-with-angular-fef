import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service'; 
import { Customer } from '../model/customer';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent{

success: boolean = false;
errors!: String[];

  customer: Customer = {
    idCustomer: '',
    firstNameCustomer: '',
    lastNameCustomer: '',
    birthdateCustomer: '',
    dateCreatedCustomer: '',
    monthlyIncomeCustomer: '',
    cpfCustomer: '',
    emailCustomer:'',
    passwordCustomer: '',
    statusCustomer: true
  };
  submitted = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  saveCustomer() {
    const datePipe = new DatePipe('en-US');
    this.customer.birthdateCustomer = datePipe.transform(
      this.customer.birthdateCustomer, 'dd/MM/yyyy');
    
    this.customerService.createCustomer(this.customer).subscribe({next: response => {
      this.success = true;
      this.errors = [];    
    }, error: ex => {
      if (ex.error.errors) {
        this.errors = ex.error.errors;
        this.success = false;
        ex.error.errors.forEach((element:any) => {         
        });
      } else {
          this.success = false;
          this.errors = ex.error.errors;        
      }
    }})
  }
  }
