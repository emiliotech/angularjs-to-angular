import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasureService } from '@modules/inventory/services';
import { MeasureRead } from '@modules/inventory/models';
import { hideLoader, showLoader } from '@core/utils';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { isApiResponse } from '@core/models';
import { ToasterService } from '@core/services';
import { MeasureModalDirective } from '@modules/inventory/directives';

@Component({
  selector: 'app-medida-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule, MeasureModalDirective],
  templateUrl: './medida-page.component.html',
  styleUrl: './medida-page.component.scss'
})
export class MedidaPageComponent {
  measureSvc = inject(MeasureService);
  tS = inject(ToasterService);
  dataSearch = {
    pageIndex: 1,
    pageSize: 10,
    maxSize: 5
  };
  page = 1;

  totalRecords = 0;
  recordsQuantity = [10, 25, 50, 100, 200, 500];
  measures: Array<MeasureRead> = [];

  getMeasures(){
    try {
      showLoader();
      this.measureSvc.getAll(this.dataSearch).subscribe({
        next: (value) =>{
          this.measures = value;
          this.totalRecords = this.measures.length > 0 ? this.measures[0].totalRecords : 0; 
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
      console.log(error)
    }
  }

  ngOnInit(){
    this.getMeasures()
  }

  pageChanged(): void {
    this.getMeasures();
  }

  changePageSize(): void {
    this.dataSearch.pageIndex = 1;
    this.getMeasures();
  }

  askToDelete(id:number) {
    try {
      Swal.fire({
        icon: 'warning',
        html: `<small>Esta seguro/a de eliminar esta Medida ahora?</small>`,
        showConfirmButton: true,
        confirmButtonText: 'Si, eliminar',
        showCancelButton: true,
        cancelButtonText: 'No, cancelar',
        allowOutsideClick: false
      }).then(result => {
        if (result.isConfirmed) {
          showLoader();
          this.measureSvc.delete(id).subscribe({
            next:(response) =>{
                if(isApiResponse(response)){
                  if(response.code==="0"){
                    this.tS.toastr({
                      type: 'warning',
                      message: response.message
                    })
                  }
                  if(response.code==="1"){
                    this.tS.toastr({
                      type: 'success',
                      message: response.message
                    })
                    this.getMeasures();
                  }
                }
            },error(err) {
                hideLoader();
                console.log(err)
            },
          })  
        }
      })
    } catch (error) {
      hideLoader();
      console.log(error)
    }
  }
}
