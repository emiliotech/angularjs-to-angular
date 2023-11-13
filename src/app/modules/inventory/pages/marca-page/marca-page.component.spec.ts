import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaPageComponent } from './marca-page.component';

describe('MarcaPageComponent', () => {
  let component: MarcaPageComponent;
  let fixture: ComponentFixture<MarcaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarcaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
