import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAnalyzeComponent } from './custom-analyze.component';

describe('CustomAnalyzeComponent', () => {
  let component: CustomAnalyzeComponent;
  let fixture: ComponentFixture<CustomAnalyzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomAnalyzeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAnalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
