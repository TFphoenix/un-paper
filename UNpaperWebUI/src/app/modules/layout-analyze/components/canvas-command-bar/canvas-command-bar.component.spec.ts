import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasCommandBarComponent } from './canvas-command-bar.component';

describe('CanvasCommandBarComponent', () => {
  let component: CanvasCommandBarComponent;
  let fixture: ComponentFixture<CanvasCommandBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasCommandBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasCommandBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
