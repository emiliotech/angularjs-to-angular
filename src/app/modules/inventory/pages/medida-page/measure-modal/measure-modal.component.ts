import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MeasureService } from '@modules/inventory/services';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-measure-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './measure-modal.component.html',
  styleUrl: './measure-modal.component.scss'
})
export class MeasureModalComponent {
  @Input() params = {
    idMedida: 0,
    descripcion: '',
    estado: false
  }
  private activeModal = inject(NgbActiveModal);
  private measureSvc = inject(MeasureService);

  titleModal = 'Nueva Medida';
  btnIcon = 'ti-save';
  btnText = 'Guardar';

  dataForm = new FormGroup({
    idMedida: new FormControl<number>(0),
    descripcion: new FormControl('', Validators.required),
    estado: new FormControl(false),
  });

  ngOnInit() {
    if (typeof this.params === 'object' && this.params.idMedida > 0) {
      this.titleModal = 'Editar Subcategoria';
      this.btnIcon = 'ti-pencil';
      this.btnText = 'Actualizar';
      this.dataForm.get('idMedida')?.setValue(this.params.idMedida)
      this.dataForm.get('descripcion')?.setValue(this.params.descripcion)
      this.dataForm.get('estado')?.setValue(this.params.estado)
    }
  }

  closeModal() {
    this.activeModal.close();
  }

}
