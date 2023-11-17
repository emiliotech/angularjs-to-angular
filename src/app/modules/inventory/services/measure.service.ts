import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { INVENTORY_PATHS } from '../constants';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasureService {
  private url = `${environment.apiUrl}${INVENTORY_PATHS.MEASURE}`;

  constructor(private httpClient: HttpClient) { }

  getAll(query: any): Observable<any[]> {
    return this.httpClient
      .get<any>(`${this.url}Get`, { params: { json: JSON.stringify(query) } })
      .pipe(map((response) => {
        if (response.code === '0') {
          throw response;
        }
        if (response.code === '1') {
          let medidas = JSON.parse(response.payload) || [];
          return medidas.map((item:any) => ({
            idMedida: item.idMedida,
            descripcion: item.descripcion,
            estado: item.estado,
            codigo: item.codigo,
            totalRecords: item.totalRecords,
          }));
        }
      }));
  }

  save(data: any): Observable<any> {
    return this.httpClient.post(`${this.url}Insert`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${this.url}Update/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}Delete/${id}`);
  }
}
