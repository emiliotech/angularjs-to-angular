import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from "@angular/material/table"
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator"
import { ProductAddUpdateDirective } from '@modules/inventory/directives';
import { ProductService } from '@modules/inventory/services';
import { hideLoader, showLoader } from '@core/utils';
import { MatSort } from '@angular/material/sort';

type Product = {
  position: number
  idArticulo:number
  idMedida: number
  code_unique: string
  codigo: string
  descripcion: string
  precioCosto: number
  estado: boolean
  stock: number
  observaciones: string
  subFamilia: string
  medida: string
  marca: string
  modelo: string
  tipoIva: string
  tipoArticulo: string
  style: string
  precioSinSubsidio: number
  stockMinimo: number
  totalRecords: number
  s3ObjectKey: string
  s3ObjectUrl: string
}
@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, ProductAddUpdateDirective],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent { 

  displayedColumns: string[] = ['op', 'position', 's3ObjectUrl', 'codigo', 'descripcion', 'medida', 'subFamilia', 'stock', 'estado'];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productSvc: ProductService) { };

  ngOnInit() {
    const self = this;
    showLoader()
    this.productSvc.getAll().subscribe({
      next(response) {
        let results:Array<Product> = JSON.parse(response)[0]
        let products = results.map((product, index)=>{
          return {
            ...product,
            position: index+1
          }
        }) ; 
        console.log(products)
        self.dataSource = new MatTableDataSource(products);
        self.dataSource.paginator = self.paginator;
        self.dataSource.sort = self.sort;
      },
      complete() {
        hideLoader();
      },
      error() {
        hideLoader();
      }
    })
  }
}
