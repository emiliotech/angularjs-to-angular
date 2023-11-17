import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ModalService } from '@core/services';
import { MarcaModalComponent } from '../pages/marca-page/marca-modal';
import { ProductModalComponent, SubcategoryModalComponent } from '../pages';
import { MeasureModalComponent } from '../pages/medida-page/measure-modal';

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
    const modalRef = this.modalSvc.openModalCustom(ProductModalComponent, { size: 'xl' });
    modalRef.result.then(result => {
      if (this.resultModalHandler) {
        this.resultModalHandler(result);
      }
    })
  }
  constructor(private modalSvc: ModalService) { }
}


/**
 * Category
 */
@Directive({
  selector: '[appSubcategoryModal]',
  standalone: true
})
export class SubcategoryModalDirective {
  @Input() resultModalHandler!: Function;
  @Input() params = {};

  @HostListener('click') onClick() {
    const modalRef = this.modalSvc.openModalCustom(SubcategoryModalComponent);
    modalRef.componentInstance.params = this.params || {};
    modalRef.result.then(result => {
      if (this.resultModalHandler && typeof result === 'object') {
        this.resultModalHandler(result);
      }
    })
  }
  constructor(private modalSvc: ModalService, private el: ElementRef) { }
}

/**
 * Category
 */
@Directive({
  selector: '[appMeasureModal]',
  standalone: true
})
export class MeasureModalDirective {
  @Input() resultModalHandler!: Function;
  @Input() params = {};

  @HostListener('click') onClick() {
    const modalRef = this.modalSvc.openModalCustom(MeasureModalComponent);
    modalRef.componentInstance.params = this.params || {};
    modalRef.result.then(result => {
      if (this.resultModalHandler && typeof result === 'object') {
        this.resultModalHandler(result);
      }
    })
  }
  constructor(private modalSvc: ModalService, private el: ElementRef) { }
}