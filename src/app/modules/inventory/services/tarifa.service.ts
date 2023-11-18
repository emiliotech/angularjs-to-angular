import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { INVENTORY_PATHS } from '../constants';
import { isApiResponse } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {
  private url = `${environment.apiUrl}${INVENTORY_PATHS.TARIFA}`;

  constructor(private httpClient: HttpClient) { }

  getAll(query: object): Observable<any> {
    return this.httpClient.get(this.url + 'Get', { params: { json: JSON.stringify(query) } })
      .pipe(map(response => {
        if (isApiResponse(response)) {
          if (response['code'] === "0") {
            throw response;
          }
          if (response['code'] === "1") {
            let tarifas = JSON.parse(response['payload']) || [];
            return tarifas.map((item: any) => ({
              idTarifa: item.idTarifa,
              descripcion: item.descripcion,
              codigo: item.codigo,
              predeterminada: item.predeterminada,
              estado: item.estado,
              ventaPorMayor: item.ventaPorMayor,
              totalRecords: item.totalRecords,
            }));
          }
        }
      }));
  }

  save(data: object): Observable<any> {
    return this.httpClient.post(this.url + 'Insert', data);
  }

  update(id: number, data: object): Observable<any> { 
    return this.httpClient.put(`${this.url}Update/${id}?json=${JSON.stringify(data) }`, {});
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.url + 'Delete/' + id);
  }
}
