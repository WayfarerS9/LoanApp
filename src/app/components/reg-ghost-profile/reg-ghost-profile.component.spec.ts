import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegGhostProfileComponent } from './reg-ghost-profile.component';

describe('RegGhostProfileComponent', () => {
  let component: RegGhostProfileComponent;
  let fixture: ComponentFixture<RegGhostProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegGhostProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegGhostProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
