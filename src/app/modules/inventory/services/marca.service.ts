import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { INVENTORY_PATHS } from '../constants';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private URL = environment.apiUrl + INVENTORY_PATHS.BRAND;
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.URL, {
      params: {
        json: JSON.stringify({ tipo: 1 })
      }
    }).pipe(map((response: any) => response))
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
