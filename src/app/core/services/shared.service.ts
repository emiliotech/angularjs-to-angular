import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerCedulaSRI, CustomerRucSRI } from '@core/models'; 
import { MAIN_PATHS } from '@core/constants'
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private URL_CONSULTAS = MAIN_PATHS.CONSULTAS;

  constructor(private http: HttpClient) { }

  checkCustomerSRIByRUC(identificacion: string): Observable<CustomerRucSRI> {
    return this.http.get(`${this.URL_CONSULTAS}GetRucSRI`, {
      params: {
        Ruc: identificacion
      }
    }).pipe(map((response: any) => response))
  }

  checkCustomerSRIByCedula(identificacion: string): Observable<CustomerCedulaSRI> {
    return this.http.get(`${this.URL_CONSULTAS}GetCedulaSri`, {
      params: {
        Ruc: identificacion
      }
    }).pipe(map((response: any) => response))
  }

}
