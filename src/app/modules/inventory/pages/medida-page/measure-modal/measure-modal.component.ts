import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MeasureService } from '@modules/inventory/services';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { hideLoader, showLoader } from '@core/utils';
import { isApiResponse } from '@core/models';
import { ToasterService } from '@core/services';
@Component({
  selector: 'app-measure-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './measure-modal.component.html',
})
export class MeasureModalComponent {
  @Input() params = {
    idMedida: 0,
    descripcion: '',
    estado: false
  }
  private activeModal = inject(NgbActiveModal);
  private measureSvc = inject(MeasureService);
  private tS = inject(ToasterService);

  titleModal = 'Nueva Medida';
  btnIcon = 'ti-save';
  btnText = 'Guardar';
  tipoRegistro = 1;

  dataForm = new FormGroup({
    idMedida: new FormControl<number>(0),
    descripcion: new FormControl('', Validators.required),
    estado: new FormControl(false),
  });

  ngOnInit() {
    if (typeof this.params === 'object' && this.params.idMedida > 0) {
      this.tipoRegistro = 2;
      this.titleModal = 'Editar Medida';
      this.btnIcon = 'ti-pencil';
      this.btnText = 'Actualizar';
      this.dataForm.get('idMedida')?.setValue(this.params.idMedida)
      this.dataForm.get('descripcion')?.setValue(this.params.descripcion)
      this.dataForm.get('estado')?.setValue(this.params.estado)
    }
  }

  save() {
    try {
      let data = this.dataForm.value;

      if (data.idMedida && data.idMedida > 0) {
        showLoader();
        this.measureSvc.update(data.idMedida, data).subscribe({
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
                this.activeModal.close(response)
              }
            }
          }, error(err) {
            console.log(err)
          },
          complete() {
            hideLoader();
          },
        })
      } else if (!(data.idMedida && data.idMedida > 0)) {
        showLoader();
        this.measureSvc.save(data).subscribe({
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
                this.activeModal.close(response)
              }
            }
          }, error(err) {
            console.log(err)
          },
          complete() {
            hideLoader();
          },
        })
      }
    } catch (error) {
      console.log(error);
      hideLoader();
    }

  }

  closeModal() {
    this.activeModal.close();
  }

}
