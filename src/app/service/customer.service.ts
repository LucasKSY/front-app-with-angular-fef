import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Customer } from '../model/customer';
import { Observable } from 'rxjs/internal/Observable';
import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { map } from 'rxjs';
import { API_CONFIG } from '../config/api_config';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url : string = API_CONFIG.urlApi;

  constructor(private httpClient: HttpClient, private datePipe: DatePipe) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  createCustomer(customer: Customer): Observable<Customer[]> {
    return this.httpClient.post<Customer[]>(this.url + '/customer/insert', customer);
      }
}
