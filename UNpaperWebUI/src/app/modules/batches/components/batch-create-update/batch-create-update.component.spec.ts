import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchCreateUpdateComponent } from './batch-create-update.component';

describe('BatchCreateUpdateComponent', () => {
  let component: BatchCreateUpdateComponent;
  let fixture: ComponentFixture<BatchCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
