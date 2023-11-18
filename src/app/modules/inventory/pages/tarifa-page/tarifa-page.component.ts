import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarifaService } from '@modules/inventory/services';
import { hideLoader, showLoader } from '@core/utils';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isApiResponse } from '@core/models';
import { ToasterService } from '@core/services';

type Tarifa = {
  idTarifa: number
  descripcion: string
  codigo: string
  predeterminada: boolean
  estado: boolean
  ventaPorMayor: boolean
  totalRecords: number
}

@Component({
  selector: 'app-tarifa-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarifa-page.component.html',
})
export class TarifaPageComponent {
  data: any = {};

  tarifas: Tarifa[] = [];
  dataSearch = {
    pageIndex: 1,
    pageSize: 5
  };
  totalRecords = 0;
  @ViewChild('tarifaModal') tarifaModal!: ElementRef;

  dataForm = new FormGroup({
    idTarifa: new FormControl(0),
    descripcion: new FormControl('', Validators.required),
    codigo: new FormControl('', Validators.required),
    ventaPorMayor: new FormControl(false)
  })

  private modalService = inject(NgbModal);
  private tarifaSvc = inject(TarifaService);
  private tS = inject(ToasterService); 

  ngOnInit() {
    this.getTarifas();
  }

  getTarifas() {
    showLoader();
    this.tarifaSvc.getAll(this.dataSearch).subscribe({
      next: (response) => {
        this.tarifas = response;
        this.totalRecords = this.tarifas.length > 0 ? this.tarifas[0].totalRecords : 0;
      },
      error(err) {
        console.log(err)
      },
      complete() {
        hideLoader();
      },
    });
  }

  open(data: Tarifa) {
    this.dataForm.get('idTarifa')?.setValue(data.idTarifa)
    this.dataForm.get('descripcion')?.setValue(data.descripcion)
    this.dataForm.get('codigo')?.setValue(data.codigo)
    this.dataForm.get('ventaPorMayor')?.setValue(data.ventaPorMayor)
    this.modalService.open(this.tarifaModal, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'backdrop-custom-modal',
    })
  }
  save() {
    try {
      let data = this.dataForm.value;
      let id = Number(data.idTarifa);
      showLoader();
      this.tarifaSvc.update(id, data).subscribe({
        next: (response) => {
          if (isApiResponse(response)) {
            if (response.code === "0") {
              this.tS.toastr({
                type: 'warning',
                message: response.message
              })
            }
            if (response.code === "1") {
              this.tS.toastr({
                type: 'success',
                message: response.message
              }) 
              this.getTarifas();
            }
          }
        },
        error(err) {
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
}
