import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeStartingComponent } from './before-starting.component';

describe('BeforeStartingComponent', () => {
  let component: BeforeStartingComponent;
  let fixture: ComponentFixture<BeforeStartingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeforeStartingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeStartingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
