import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subcategory-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subcategory-modal.component.html',
  styleUrl: './subcategory-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SubcategoryModalComponent {
  constructor(private activeModal: NgbActiveModal) { }

  resultModalHandler() {

  }
  closeModal() {
    this.activeModal.close()
  }
}
