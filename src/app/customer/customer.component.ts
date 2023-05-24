import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/customer';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  displayedColumns: string[] = ['idCustomer', 'firstNameCustomer', 'lastNameCustomer', 'cpfCustomer', 'birthdateCustomer', 'dateCreatedCustomer', 'monthlyIncomeCustomer', 'emailCustomer', 'statusCustomer','acoes'];
  ELEMENT_DATA: Customer[] = [];
  dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);
  success: boolean = false;
  errors!: String[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  customer: Customer = {
    idCustomer: '',
    firstNameCustomer: '',
    lastNameCustomer: '',
    birthdateCustomer: '',
    dateCreatedCustomer: '',
    monthlyIncomeCustomer: '',
    cpfCustomer: '',
    emailCustomer: '',
    passwordCustomer: '',
    statusCustomer: true
  };
  submitted = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.listCustomer();
  }

  saveCustomer() {
    const datePipe = new DatePipe('en-US');
    this.customer.birthdateCustomer = datePipe.transform(
      this.customer.birthdateCustomer, 'dd/MM/yyyy');

    this.customerService.createCustomer(this.customer).subscribe({
      next: response => {
        this.success = true;
        this.errors = [];
      }, error: ex => {
        if (ex.error.errors) {
          this.errors = ex.error.errors;
          this.success = false;
          ex.error.errors.forEach((element: any) => {
          });
        } else {
          this.success = false;
          this.errors = ex.error.errors;
        }
      }
    })
    this.listCustomer();
  }

  listCustomer() {
    this.customerService.list().subscribe((response: any) => {
      this.ELEMENT_DATA = response.result as Customer[];
      this.dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteCustomer(customer: Customer) {
    this.customerService.delete(customer.idCustomer).subscribe((response: any) => {
      this.ELEMENT_DATA = response.result as Customer[];
        this.listCustomer();
    });
  }
}
