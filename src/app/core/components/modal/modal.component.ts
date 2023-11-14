import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    ` 
    
		`,
  ],
})
export class ModalComponent {
  @Input() name = '';

  constructor(public activeModal: NgbActiveModal) { }
}
