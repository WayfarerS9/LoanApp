import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfLoansComponent } from './list-of-loans.component';

describe('ListOfLoansComponent', () => {
  let component: ListOfLoansComponent;
  let fixture: ComponentFixture<ListOfLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfLoansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
