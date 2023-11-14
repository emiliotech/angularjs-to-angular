import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

type PropsModal = {
  size?: 'sm' | 'lg' | 'xl'
  backdropClass?: 'backdrop-custom-modal'
  fullscreen?: boolean
  centered?: boolean
  scrollable?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private ngbModal: NgbModal,
  ) { }

  openModalCustom(theComponent: any, { size, fullscreen, centered, scrollable }: Partial<PropsModal> = {}) {
    const modalRef = this.ngbModal.open(theComponent, {
      backdropClass: 'backdrop-custom-modal',
      size,
      fullscreen,
      centered,
      scrollable
    });

    return modalRef;
  } 

}
