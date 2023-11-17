import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService, SubcategoryService } from '@modules/inventory/services';
import { hideLoader, showLoader } from '@core/utils';
import { CategorySelect } from '@modules/inventory/models';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isApiResponse } from '@core/models';
import { ToasterService } from '@core/services';

@Component({
  selector: 'app-subcategory-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './subcategory-modal.component.html', 
  encapsulation: ViewEncapsulation.None,
})

export class SubcategoryModalComponent {

  tipoRegistro = 1;
  @Input() params: any = {};


  private productSvc = inject(ProductService)
  private subFamiliaSvc = inject(SubcategoryService)
  private tS = inject(ToasterService)

  categories: Array<CategorySelect> = [];
  imageURL!: string;
  selectedImage!: File
  titleModal = 'Nueva Subcategoria';
  btnIcon = 'ti-save';
  btnText = 'Guardar';

  dataForm = new FormGroup({
    idFamilia: new FormControl<number>(0),
    idSubFamilia: new FormControl<number>(0),
    descripcion: new FormControl<string>('', Validators.required),
    siglas: new FormControl<string>('', Validators.required),
    montoObjetivo: new FormControl(0),
    estado: new FormControl(false),
  }); 
  constructor(private activeModal: NgbActiveModal) {}

  private getCategories() {
    const self = this;
    showLoader();
    this.productSvc.getDataForm().subscribe({
      next(response) {
        hideLoader();
        const { familias } = response;
        self.categories = familias;
      },
      error(err) {
        hideLoader();
        console.log(err)
      },
    })
  }

  ngOnInit() {
    this.getCategories();
    if (typeof this.params === 'object' && this.params.idSubFamilia > 0) {
      this.tipoRegistro = 2;
      this.titleModal = 'Editar Subcategoria';
      this.btnIcon = 'ti-pencil';
      this.btnText = 'Actualizar';
      this.dataForm.get('idFamilia')?.setValue(this.params.idFamilia)
      this.dataForm.get('idSubFamilia')?.setValue(this.params.idSubFamilia)
      this.dataForm.get('descripcion')?.setValue(this.params.descripcion)
      this.dataForm.get('siglas')?.setValue(this.params.siglas)
      this.dataForm.get('estado')?.setValue(this.params.estado)
      this.dataForm.get('montoObjetivo')?.setValue(this.params.montoObjetivo);
    }
  }

  generateCode() {
    let { descripcion, idSubFamilia } = this.dataForm.value;
    if (descripcion && !(idSubFamilia && idSubFamilia > 0)) {
      this.dataForm.get('siglas')?.setValue(descripcion?.slice(0, 3).toUpperCase())
    }
  }

  showPreview(event: Event): void {
    let element = (event.target as HTMLInputElement)
    if (element.files && element.files.length) {
      const file = element.files[0];
      this.selectedImage = file;
      // this.uploadForm.patchValue({
      //   avatar: file
      // });
      // this.uploadForm.get('avatar').updateValueAndValidity()
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(file)
    }
  }

  save() {
    try {
      const data = this.dataForm.value;
      let idSubFamilia = Number(data.idSubFamilia)
      if (!(idSubFamilia > 0)) {
        showLoader();
        this.subFamiliaSvc.post(this.selectedImage, data).subscribe({
          next: (value) => {
            this.successReponse(value)
          },
          error(err) {
            hideLoader();
            console.log(err)
          },
        })
      }

      if (idSubFamilia > 0) {
        showLoader();
        this.subFamiliaSvc.put(idSubFamilia, this.selectedImage, data)
          .subscribe({
            next: (value) => {
              this.successReponse(value)
            },
            error(err) {
              hideLoader();
              console.log(err)
            },
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  successReponse(response: unknown) {
    hideLoader();
    const self = this;
    if (isApiResponse(response)) {
      if (response.code === '0') {
        self.tS.toastr({
          type: 'warning',
          message: response.message
        })
      }
      if (response.code === '1') {
        self.tS.toastr({
          type: 'success',
          message: response.message
        })
        this.activeModal.close(response)
      }
    }
  }

  closeModal() {
    this.activeModal.close()
  }
}
