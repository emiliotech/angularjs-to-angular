import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidaPageComponent } from './medida-page.component';

describe('MedidaPageComponent', () => {
  let component: MedidaPageComponent;
  let fixture: ComponentFixture<MedidaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedidaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedidaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
