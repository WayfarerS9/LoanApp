import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearDebtsComponent } from './clear-debts.component';

describe('ClearDebtsComponent', () => {
  let component: ClearDebtsComponent;
  let fixture: ComponentFixture<ClearDebtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearDebtsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearDebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
