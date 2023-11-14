import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-marca-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marca-modal.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MarcaModalComponent {

  constructor(private activeModal: NgbActiveModal) { }

  resultModalHandler(){

  }
  closeModal(){
    this.activeModal.close()
  }
}
