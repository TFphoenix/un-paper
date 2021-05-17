import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchDocumentsComponent } from './batch-documents.component';

describe('BatchDocumentsComponent', () => {
  let component: BatchDocumentsComponent;
  let fixture: ComponentFixture<BatchDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
