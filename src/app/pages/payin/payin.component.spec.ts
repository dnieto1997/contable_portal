import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayinComponent } from './payin.component';

describe('PayinComponent', () => {
  let component: PayinComponent;
  let fixture: ComponentFixture<PayinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
