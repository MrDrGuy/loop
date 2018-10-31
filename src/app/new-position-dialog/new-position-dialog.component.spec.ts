import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPositionDialogComponent } from './new-position-dialog.component';

describe('NewPositionDialogComponent', () => {
  let component: NewPositionDialogComponent;
  let fixture: ComponentFixture<NewPositionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPositionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPositionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
