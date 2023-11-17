import { Component, ElementRef, Input, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbNavChangeEvent, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SubcategoryModalDirective } from '@modules/inventory/directives';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { ProductService } from '@modules/inventory/services';
import { PricingCalculateUtil, hideLoader, roundNumber, showLoader } from '@core/utils';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TAX_RATE_CODE } from '@core/constants';
import { ToasterService } from '@core/services';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbNavModule, MatCheckboxModule, SubcategoryModalDirective],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProductModalComponent {
  @Input() params: any = {}
  activeTab = 1;
  testData = {
    name: 'subfamilia',
    idSubFamilia: 0
  }
  tableData: any[] = [];
  columnNames: any[] = [
    { title: "Tarifa", field: "tarifa", headerSort: false, width: 150, headerHozAlign: "center" },
    { title: "Tipo Iva", field: "porcentajeIva", headerSort: false, width: 130, headerHozAlign: "center" },
    {
      title: "Precio Venta",
      headerSort: false,
      field: "precioVenta",
      editor: "input",
      width: 130,
      headerHozAlign: "center",
      cellEdited: (cell: any) => this.operationColumnPVP(cell),
    },
    {
      title: "Precio IVA",
      headerSort: false,
      field: "precioConIva",
      editor: "input",
      width: 100,
      headerHozAlign: "center",
      cellEdited:(cell:any)=> this.operationColumnPVP(cell),
    },
    {
      title: "% Utilidad",
      headerSort: false,
      field: "porcentajeUtilidad", editor: "input",
      sorter: "date", width: 130, headerHozAlign: "center",
      cellEdited: (cell: any) => this.operationColumnPVP(cell),
    },
    {
      title: "Utilidad", headerSort: false, field: "ganancia", sorter: "date", width: 130, headerHozAlign: "center", 
    },
    { title: "Estado", headerSort: false, field: "predeterminadaText", sorter: "date", width: 150, headerHozAlign: "center" },
  ];
  // list properties you want to set per implementation here... 
  @ViewChild('tabularTablePVP') myTabularTable!: ElementRef;

  subFamilias: any[] = [];
  tipoArticulos: any[] = [];
  medidas: any[] = []
  establecimientos: any[] = [];
  etiquetaActividades: any[] = [];
  tarifas: any[] = []

  marcas: any[] = []
  modelos: any[] = []

  decimal = {
    nroPrecio: 2
  };

  tipoIces: any[] = []
  tipoIvas: any[] = []
  articlePermission = {}
  bodegas: any = [];
  dataUbicacion = {
    idEstablecimiento: 0,
    idBodega: 0
  }

  uniqueCategories: any[] = []
  groupedArrayCategories: any[] = []

  dataForm = new FormGroup({
    idSubFamilia: new FormControl<number>(0),
    idTipoArticulo: new FormControl<number>(0),
    idMedida: new FormControl<number>(0),
    idTipoIva: new FormControl<number>(0),
    idEtiqueta: new FormControl<number>(0),
    descripcion: new FormControl<string>('', Validators.required),
    codigo: new FormControl<string>('', Validators.required),
    codigoBarra: new FormControl('', Validators.required),
    codigoAuxiliar: new FormControl('', Validators.required),
    precioCosto: new FormControl(0, Validators.required),
    precioSinSubsidio: new FormControl(0, Validators.required),
    datosAdicionales: new FormControl(false, Validators.required),
    llevaInventario: new FormControl(false, Validators.required),
    productoFraccionable: new FormControl(false, Validators.required),
    estado: new FormControl(false),
  });
  tabulatorPVP: any;

  constructor(
    private activeModal: NgbActiveModal,
    private productSvc: ProductService,
    private tS: ToasterService
  ) { 
    
  }

  ngOnInit() {
    showLoader();
    this.productSvc.getDataForm().subscribe({
      next: (response) => {
        let {
          establecimientos,
          decimal,
          subFamilias,
          medidas,
          modelos,
          marcas,
          tiposArticulo,
          tarifasImpuesto,
          tiposICE,
          tarifas,
          etiquetas,
          permission,
        } = response;

        this.establecimientos = establecimientos;
        if (this.establecimientos.length > 0) {
          let dataEstab = this.establecimientos.find(
            (estab: any) => estab.defaultEstab === true
          );
          this.bodegas = dataEstab.bodegas;
          this.dataUbicacion.idEstablecimiento = dataEstab.idEstablecimiento;
          if (this.bodegas.length > 0) {
            let dataBodega = this.bodegas.find(
              (bodega: any) => bodega.defaultBodega === true
            );
            this.dataUbicacion.idBodega = dataBodega.idBodega;
          }
        }

        //SubFamilias
        this.subFamilias = subFamilias;

        // Tipo Articulo
        this.tipoArticulos = tiposArticulo;
        if (this.tipoArticulos.length > 0) {
          this.dataForm.get('idTipoArticulo')?.setValue(this.tipoArticulos[0].idTipoArticulo)
        }

        //Medida
        this.medidas = medidas;
        if (this.medidas.length > 0) {
          this.dataForm.get('idMedida')?.setValue(this.medidas[0].idMedida)
        }
        //Etiqueta Actividades
        this.etiquetaActividades = etiquetas;

        //Aplicacion de Permisos
        this.articlePermission = permission;

        this.tarifas = tarifas;

        this.marcas = marcas;
        this.modelos = modelos;

        this.decimal = decimal;

        this.tipoIces = tiposICE;
        this.tipoIvas = tarifasImpuesto;
        let dataIVA = this.tipoIvas.find(
          (item) => item.codigoPorcentaje.toString() === TAX_RATE_CODE.TWELVE_PERCENT
        );
        this.dataForm.get('idTipoIva')?.setValue(dataIVA.idTipoIva)
        // $scope.data.idTipoIva = dataIVA.idTipoIva;
        this.setCodigoSecuencialArticulo();
        this.setGridTarifa();
        this.groupedCategory()
      },
      error(err) {
        hideLoader();
        console.log(err)
      },
      complete() {
        hideLoader();
      },
    })
  }

  setCodigoSecuencialArticulo() {
    if (this.subFamilias.length === 0 || (this.params && this.params.isImport)) return;

    const { codigo, idSubFamilia } = this.subFamilias[0];
    this.dataForm.get('idSubFamilia')?.setValue(idSubFamilia);
    this.setCodigo(codigo);
  }

  setCodigo(codigo: string) {
    this.dataForm.get('codigo')?.setValue(codigo);
    this.dataForm.get('codigoAuxiliar')?.setValue("AUX-" + codigo);
    this.dataForm.get('codigoBarra')?.setValue(codigo);
  }

  setGridTarifa() {
    let dataIVA = this.tipoIvas.find((item) => item.codigoPorcentaje.toString() === TAX_RATE_CODE.TWELVE_PERCENT);
    this.tableData = this.tarifas.map((item) => {
      item.tarifa = item.descripcion;
      item.precioVenta = 0;
      item.precioConIva = 0;
      item.porcentajeUtilidad = 0;
      item.porcentajeIva = dataIVA.porcentaje;
      item.predeterminadaText = item.predeterminada === true ? "Predeterminada" : "";
      item.ganancia = 0;
      return item;
    });
    this.drawTable();

  }

  groupedCategory() {
    this.uniqueCategories = [...new Set(this.subFamilias.map(item => item.familia))];
    this.groupedArrayCategories = this.uniqueCategories.map(i => ({
      category: i,
      subCategories: this.subFamilias.filter(d => d.familia === i)
    }))
    console.log(this.groupedArrayCategories)
  }

  operationColumnPVP(cell: any){
    console.log(this)
    const newData = cell.getData();
    const oldValue = Number(cell.getOldValue())
    const newValue = Number(cell.getValue())
    const field: 'precioVenta' | 'precioConIva' | 'porcentajeUtilidad' = cell.getColumn().getField();
    newData[field] = newValue;
    console.log(newValue)
    console.log(oldValue)
    let precioConIva = 0;
    let precioVenta = 0;
    let porcentajeUtilidad = 0;
    let ganancia = 0;
    let precioCosto = Number(this.dataForm.value.precioCosto)

    if(oldValue===newValue) return
    //Validacion de Campos
    if (
      [null, undefined, "", 0].includes(precioCosto) ||
      isNaN(precioCosto)
    ) {
      this.tS.toastr({
        type: 'warning',
        message: "Ingrese el Precio de Costo"
      })
      return;
    }

    if (field === "precioVenta") {
      
      if (isNaN(newValue)) {
        newData.precioVenta = oldValue;
      }
      if (newData.precioVenta > 0) {
        if (newData.precioVenta < precioCosto) {
          newData[field] = oldValue;
        }
      }
    }

    if (field === "precioConIva") {
      if (isNaN(newValue)) {
        newData.precioConIva = oldValue;
      }

      if (newData.precioConIva > 0) {
        if (newData.precioConIva < precioCosto) {
          newData.precioConIva = oldValue;
        }
      }
    }

    if (
      (field === "porcentajeUtilidad" && newValue === undefined) ||
      newValue === null
    ) {
      newData.porcentajeUtilidad = oldValue;
    }

    //Calculos
    switch (field) {
      case "precioVenta":
        precioConIva = PricingCalculateUtil.calculatePriceWithVat(
          newData.precioVenta,
          newData.porcentajeIva
        );
        porcentajeUtilidad = PricingCalculateUtil.getValuePercentageUtility(
          newData.precioVenta,
          precioCosto
        );

        newData.precioVenta = roundNumber(
          newData.precioVenta,
          this.decimal.nroPrecio
        );
        newData.precioConIva = roundNumber(
          precioConIva,
          this.decimal.nroPrecio
        );
        newData.porcentajeUtilidad = roundNumber(
          porcentajeUtilidad,
          5
        );

        break;

      case "precioConIva":
        precioVenta = PricingCalculateUtil.calculatePriceSale(
          newData.precioConIva,
          newData.porcentajeIva
        );
        porcentajeUtilidad = PricingCalculateUtil.getValuePercentageUtility(
          precioVenta,
          precioCosto
        );

        newData.precioConIva = roundNumber(
          newData.precioConIva,
          this.decimal.nroPrecio
        );
        newData.precioVenta = roundNumber(
          precioVenta,
          this.decimal.nroPrecio
        );
        newData.porcentajeUtilidad = roundNumber(
          porcentajeUtilidad,
          5
        );

        break;
      case "porcentajeUtilidad":
        precioVenta = PricingCalculateUtil.calculatePriceSaleOfValuePercentageUtility(
          precioCosto,
          newData.porcentajeUtilidad
        );
        precioConIva = PricingCalculateUtil.calculatePriceWithVat(
          precioVenta,
          newData.porcentajeIva
        );

        newData.precioVenta = roundNumber(precioVenta, this.decimal.nroPrecio);
        newData.precioConIva = roundNumber(
          precioConIva,
          this.decimal.nroPrecio
        );
        break;
    }

    //alexis ramirez
    ganancia = newData.precioVenta - precioCosto;
    newData.ganancia = roundNumber(ganancia, 5);

    //this.tabulatorPVP.updateData([newData]);
    //this.tabulatorPVP.updateOrAddData([newData]);
  }

  resultModalHandler() {

  }

  ngAfterViewInit(changes: SimpleChanges): void {
    // this.drawTable();
  }


  drawTable(): void {
    // new Tabulator(this.tab, {
    //   data: this.tableData, 
    //   reactiveData: true, //enable data reactivity
    //   columns: this.columnNames,
    //   layout: 'fitData', 
    // });
    // const el = this.el.nativeElement()
    // console.log(el)
    // if(el){
    //   el.appendChild(this.tab);
    // }

    this.tabulatorPVP = new Tabulator(this.myTabularTable.nativeElement, {
      data: this.tableData,
      reactiveData: true, // habilita reactividad en los datos
      columns: this.columnNames,
      keybindings: {
        navPrev: "ArrowUp",    // Navigate to the previous row
        navNext: "ArrowDown",  // Navigate to the next row
        navLeft: "ArrowLeft",  // Navigate to the previous cell in the row
        navRight: "ArrowRight" // Navigate to the next cell in the row
      }, 
      layout: 'fitData', 
    }) 


  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    console.log(changeEvent)
    if (changeEvent.nextId === 1) {
      //changeEvent.preventDefault();
      setTimeout(() => {
        this.drawTable();
      })
    }
  }

  save() {

  }

  closeModal() {
    this.activeModal.close()
  }

}
