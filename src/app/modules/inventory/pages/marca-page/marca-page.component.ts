import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { MarcaAddUpdateDirective } from '@modules/inventory/directives';

@Component({
  selector: 'app-marca-page',
  standalone: true,
  imports: [CommonModule, MarcaAddUpdateDirective],
  templateUrl: './marca-page.component.html',
  styleUrl: './marca-page.component.scss'
})
export class MarcaPageComponent { 

  resultModalHandler() {
    console.log('Button clicked result modal marca!');
  } 
}
