import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDialogCardComponent } from './three-dialog-card.component';

describe('ThreeDialogCardComponent', () => {
  let component: ThreeDialogCardComponent;
  let fixture: ComponentFixture<ThreeDialogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeDialogCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeDialogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
