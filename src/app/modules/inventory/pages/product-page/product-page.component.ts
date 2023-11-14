import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductAddUpdateDirective } from '@modules/inventory/directives';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ProductAddUpdateDirective],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {

}
