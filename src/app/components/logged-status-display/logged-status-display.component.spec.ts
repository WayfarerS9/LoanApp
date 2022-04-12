import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedStatusDisplayComponent } from './logged-status-display.component';

describe('LoggedStatusDisplayComponent', () => {
  let component: LoggedStatusDisplayComponent;
  let fixture: ComponentFixture<LoggedStatusDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedStatusDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedStatusDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
