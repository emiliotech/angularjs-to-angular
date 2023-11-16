import { HttpClient } from '@angular/common/http';
import { INVENTORY_PATHS } from './../constants/constants';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private URL = `${environment.apiUrl}${INVENTORY_PATHS.PRODUCT}`;
  constructor(private http: HttpClient) { }

  getDataForm(): Observable<any> {
    return this.http.get(`${this.URL}Get`, {
      params: {
        json: JSON.stringify({ tipo: 5 })
      }
    }).pipe(
      map((response: any) => {
        if (response.code === "0") {
          throw response;
        }
        if (response.code === "1") {
          let mainData = JSON.parse(response.payload);
          let tempEstabs = mainData[0];
          let decimal = mainData[1][0];
          let familias = mainData[3];
          let subFamilias = mainData[2];
          let medidas = mainData[4];
          let modelos = mainData[5];
          let marcas = mainData[6];
          let tiposArticulo = mainData[7];
          let tarifasImpuesto = mainData[8];
          let tiposICE = mainData[9];
          let tarifas = mainData[10];
          let etiquetas = mainData[11];

          // let userData = JSON.parse(localStorage.getItem("userData"));
          let permission = {
            isUpdatePrice: true
          }
          // if (userData) {
          //   let jsonDataPermission = userData.permissions.find(dt => dt.codModule === 'AR');
          //   if (jsonDataPermission) {
          //     let result = JSON.parse(jsonDataPermission.permission);
          //     permission.isUpdatePrice = result.precio.update;
          //   }
          // }
          const establecimientos = tempEstabs.reduce((acc: any, item: any) => {
            const existingItem = acc.find((el: any) => el.idEstablecimiento === item.idEstablecimiento && el.codEstab === item.codEstab);

            if (!existingItem) {
              acc.push({
                idEstablecimiento: item.idEstablecimiento,
                nombreComercial: item.nombreComercial,
                codEstab: item.codEstab,
                defaultEstab: item.defaultEstab,
                bodegas: [{
                  idEstablecimiento: item.idEstablecimiento,
                  idBodega: item.idBodega,
                  bodega: item.bodega,
                  defaultBodega: item.defaultBodega,
                }]
              });
            } else {
              existingItem.bodegas.push({
                idEstablecimiento: item.idEstablecimiento,
                idBodega: item.idBodega,
                bodega: item.bodega,
                defaultBodega: item.defaultBodega,
              });
            }
            return acc;
          }, []);

          return {
            establecimientos,
            decimal,
            familias,
            subFamilias,
            medidas,
            modelos,
            marcas,
            tiposArticulo,
            tarifasImpuesto,
            tiposICE,
            tarifas,
            etiquetas,
            permission
          }
        }
        return {}
      }))
  }

  getAll() {
    return this.http.get(`${this.URL}Get`, {
      params: {
        json: JSON.stringify({ tipo: 1, pageIndex: 1, pageSize: 50 })
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
