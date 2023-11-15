import { Component, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SubcategoryModalDirective } from '@modules/inventory/directives';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TabulatorFull as Tabulator } from 'tabulator-tables';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, NgbNavModule, MatCheckboxModule, SubcategoryModalDirective],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProductModalComponent {

  tableData: any[] = [
    { id: 1, name: "Oli Bob", age: "12", col: "red", dob: "" },
    { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
    { id: 3, name: "Christine Lobowski", age: "42", col: "green", dob: "22/05/1982" },
    { id: 4, name: "Brendon Philips", age: "125", col: "orange", dob: "01/08/1980" },
    { id: 5, name: "Margret Marmajuke", age: "16", col: "yellow", dob: "31/01/1999" },
  ];
  columnNames: any[] = [
    { title: "Tarifa", field: "name", headerSort: false, width: 150, headerHozAlign: "center" },
    { title: "Tipo Iva", field: "age", headerSort: false, width: 130, headerHozAlign: "center" },
    { title: "Precio Venta", headerSort: false, field: "col", width: 130, headerHozAlign: "center" },
    { title: "% Utilidad", headerSort: false, field: "dob", sorter: "date", width: 130, headerHozAlign: "center" },
    { title: "Utilidad", headerSort: false, field: "dob", sorter: "date", width: 130, headerHozAlign: "center" },
    { title: "Estado", headerSort: false, field: "dob", sorter: "date", width: 150, headerHozAlign: "center" },
  ];
  // list properties you want to set per implementation here...

  tab = document.createElement('div');

  constructor(private activeModal: NgbActiveModal) { }

  resultModalHandler() {

  }

  ngOnInit(changes: SimpleChanges): void {
    this.drawTable();
  }

  private drawTable(): void {
    new Tabulator(this.tab, {
      data: this.tableData, 
      reactiveData: true, //enable data reactivity
      columns: this.columnNames,
      layout: 'fitData', 
    });
    const el = document.getElementById('my-tabular-table');
    console.log(el)
    if(el){
      el.appendChild(this.tab);
    }
  }

  closeModal() {
    this.activeModal.close()
  }

}
