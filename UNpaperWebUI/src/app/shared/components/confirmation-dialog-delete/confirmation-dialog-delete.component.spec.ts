import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogDeleteComponent } from './confirmation-dialog-delete.component';

describe('ConfirmationDialogDeleteComponent', () => {
  let component: ConfirmationDialogDeleteComponent;
  let fixture: ComponentFixture<ConfirmationDialogDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDialogDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
