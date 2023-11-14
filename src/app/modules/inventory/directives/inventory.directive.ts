import { Directive, HostListener, Input } from '@angular/core';
import { ModalService } from '@core/services';
import { MarcaModalComponent } from '../pages/marca-page/marca-modal';
import { ProductModalComponent } from '../pages';

@Directive({
  selector: '[appMarcaAddUpdate]',
  standalone: true
})
export class MarcaAddUpdateDirective {
  @Input() resultModalHandler!: Function;
  @HostListener('click') onClick() { 
    const modalRef = this.modalSvc.openModalCustom(MarcaModalComponent);
    modalRef.result.then(result => {
      if (this.resultModalHandler) {
        this.resultModalHandler(result);
      }
    })
  }
  constructor(private modalSvc: ModalService) { } 
}

@Directive({
  selector: '[appProductAddUpdate]',
  standalone: true
})
export class ProductAddUpdateDirective {
  @Input() resultModalHandler!: Function;
  @HostListener('click') onClick() {
    const modalRef = this.modalSvc.openModalCustom(ProductModalComponent, {size:'xl'});
    modalRef.result.then(result => {
      if (this.resultModalHandler) {
        this.resultModalHandler(result);
      }
    })
  }
  constructor(private modalSvc: ModalService) { }
}
