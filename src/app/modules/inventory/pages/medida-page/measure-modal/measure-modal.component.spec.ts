import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureModalComponent } from './measure-modal.component';

describe('MeasureModalComponent', () => {
  let component: MeasureModalComponent;
  let fixture: ComponentFixture<MeasureModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasureModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeasureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
