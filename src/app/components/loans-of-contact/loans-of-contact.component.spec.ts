import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansOfContactComponent } from './loans-of-contact.component';

describe('LoansOfContactComponent', () => {
  let component: LoansOfContactComponent;
  let fixture: ComponentFixture<LoansOfContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoansOfContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansOfContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
