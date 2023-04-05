import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingledialogcardComponent } from './singledialogcard.component';

describe('SingledialogcardComponent', () => {
  let component: SingledialogcardComponent;
  let fixture: ComponentFixture<SingledialogcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingledialogcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingledialogcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
