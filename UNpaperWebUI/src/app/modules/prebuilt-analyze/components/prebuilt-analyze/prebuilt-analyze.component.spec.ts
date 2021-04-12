import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebuiltAnalyzeComponent } from './prebuilt-analyze.component';

describe('PrebuiltAnalyzeComponent', () => {
  let component: PrebuiltAnalyzeComponent;
  let fixture: ComponentFixture<PrebuiltAnalyzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrebuiltAnalyzeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebuiltAnalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
