import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthdashboardComponent } from './healthdashboard.component';

describe('HealthdashboardComponent', () => {
  let component: HealthdashboardComponent;
  let fixture: ComponentFixture<HealthdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
