import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Customer } from './customer';
import { Observable } from 'rxjs/internal/Observable';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = 'http://localhost:8080/api/fef/v1/customer';

  constructor(private httpClient: HttpClient, private datePipe: DatePipe) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  createCustomer(customer: Customer): Observable<Object> {
    customer.birthdateCustomer = new Date("dd/MM/yyyy");
    return this.httpClient.post(`${this.url}` + '/insert', customer).pipe(
      map((response: any) => {
        if (response.birthDateCusto22mer) {
          response.birthDateCustomer = new Date(response.birthDateCustomer);
        }
        return response;
      })
    );
      }
}

