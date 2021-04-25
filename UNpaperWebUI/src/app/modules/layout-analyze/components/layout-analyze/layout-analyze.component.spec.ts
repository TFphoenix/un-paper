import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAnalyzeComponent } from './layout-analyze.component';

describe('LayoutAnalyzeComponent', () => {
  let component: LayoutAnalyzeComponent;
  let fixture: ComponentFixture<LayoutAnalyzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutAnalyzeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutAnalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
