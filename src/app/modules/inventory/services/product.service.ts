import { HttpClient } from '@angular/common/http';
import { INVENTORY_PATHS } from './../constants/constants';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private URL = environment.apiUrl + INVENTORY_PATHS.PRODUCT
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.URL}Get`, {
      params: {
        json: JSON.stringify({ tipo: 1,pageIndex:1,pageSize:50 })
      }
    }).pipe(map((response: any) => response.payload))
  }

  search(txtSearch: string) {
    return this.http.get(this.URL, {
      params: {
        json: JSON.stringify({ tipo: 2, txtSearch })
      }
    }).pipe(map((response: any) => response.enterprises))
  }

  post(data: any) {
    return this.http.post(this.URL, data)
      .pipe(map(response => response))
  }

  put(id: number, data: any) {
    return this.http.put(`${this.URL}${id}`, data)
      .pipe(map(response => response))
  }
}
