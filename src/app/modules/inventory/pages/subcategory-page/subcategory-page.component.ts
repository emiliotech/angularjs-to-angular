import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubcategoryService } from '@modules/inventory/services';
import { ToasterService } from '@core/services';
import { hideLoader, showLoader } from '@core/utils';
import Swal from 'sweetalert2';
import { isApiResponse } from '@core/models';
import { SubCategoryRead } from '@modules/inventory/models';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SubcategoryModalDirective } from '@modules/inventory/directives';

@Component({
  selector: 'app-subcategory-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule, SubcategoryModalDirective],
  templateUrl: './subcategory-page.component.html',
  styleUrl: './subcategory-page.component.scss'
})
export class SubcategoryPageComponent {
  dataSearch = {
    pageIndex: 1,
    pageSize: 10,
    maxSize: 5
  };
  page = 1;

  totalRecords = 0;
  recordsQuantity = [10, 25, 50, 100, 200, 500];
  subCategories: Array<SubCategoryRead> = [];

  constructor(
    private subcategorySvc: SubcategoryService,
    private tS: ToasterService
  ) { }

  ngOnInit(): void {
    this.getSubcategories();
  }

  getSubcategories(): void {
    try {
      showLoader();
      this.subCategories = [];
      this.subcategorySvc.getAll(this.dataSearch).subscribe({
        next: (response) => {
          this.subCategories = response;
          if (this.subCategories.length > 0) {
            let data: any = this.subCategories[0];
            this.totalRecords = data && data.totalRecords;
            console.log(this.totalRecords)
          }
        },
        error(err) {
          hideLoader();
          console.log(err)
        },
        complete() {
          hideLoader()
        },
      })
    } catch (error) {
      hideLoader();
      console.log(error);
    }
  }

  pageChanged(): void {
    this.getSubcategories();
  }

  changePageSize(): void {
    this.dataSearch.pageIndex = 1;
    this.getSubcategories();
  }

  resultModalHandler = (params: any)=> { 
    if (typeof params === 'object') {
      this.changePageSize();
    }
  }

  exportTableToExcel(): void {
    // try {
    //   showLoader();
    //   const subFamiliasExport = this.subFamilias.map(item => ({
    //     codigo: item.codigo,
    //     descripcion: item.descripcion,
    //   }));
    //   this.commonService.exportTableToExcel({
    //     arr: subFamiliasExport,
    //     fileName: 'SubFamilias'
    //   });
    // } catch (error) {
    //   this.hideLoader();
    //   console.log(error);
    // }
  }

  async askToDelete(id: number) {
    try {
      const { isConfirmed } = await Swal.fire({
        icon: 'warning',
        html: `<small>¿Está seguro/a de eliminar esta subfamilia ahora?</small>`,
        showConfirmButton: true,
        confirmButtonText: 'Sí, eliminar',
        showCancelButton: true,
        cancelButtonText: 'No, cancelar',
        allowOutsideClick: false
      });

      if (isConfirmed) {
        showLoader();
        this.subcategorySvc.delete(id).subscribe({
          next: (response) => {
            if (isApiResponse(response)) {
              if (response.code === '0') {
                this.tS.toastr({
                  type: 'warning',
                  message: response.message
                })
              }
              if (response.code === '1') {
                this.tS.toastr({
                  type: 'success',
                  message: response.message
                })
                this.getSubcategories();
              }
            }
          },
          error(err) {
            hideLoader();
            console.log(err)
          },
          complete() {
            hideLoader()
          },
        })

      }
    } catch (error) {
      hideLoader();
      console.log(error);
    }
  }

}
