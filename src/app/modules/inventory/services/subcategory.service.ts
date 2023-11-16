import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { INVENTORY_PATHS } from '../constants';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private url = `${environment.apiUrl}${INVENTORY_PATHS.SUBCATEGORY}`;


  constructor(private httpClient: HttpClient) { }

  getAll(query: object): Observable<any> {
    return this.httpClient.get(this.url + 'Get', {
      params: {
        json: JSON.stringify(query)
      }
    }).pipe(
      map((response: any) => {
        if (response.code === '0') {
          throw response;
        }
        if (response.code === '1') {
          let subFamilias = JSON.parse(response.payload) || [];
          return subFamilias.map((item: any) => ({
            idSubFamilia: item.idSubFamilia,
            idFamilia: item.idFamilia,
            descripcion: item.descripcion,
            estado: item.estado,
            siglas: item.siglas,
            codigo: item.codigo,
            s3ObjectUrl: item.s3ObjectUrl,
            s3ObjectKey: item.s3ObjectKey,
            montoObjetivo: item.montoObjetivo,
            nombreFamilia: item.nombreFamilia,
            totalRecords: item.totalRecords,
          }));
        }
      }),
    );
  }

  post(file: File, data: object): Observable<any> {
    return this.httpClient.post(this.url + 'Post', file, {
      params: {
        json: JSON.stringify(data)
      }
    });
  }

  put(id: number, file: File, data: object): Observable<any> {
    return this.httpClient.post(`${this.url}Put/${id}`, file, { params: { json: JSON.stringify(data) } });
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.url + id);
  } 
  
}
