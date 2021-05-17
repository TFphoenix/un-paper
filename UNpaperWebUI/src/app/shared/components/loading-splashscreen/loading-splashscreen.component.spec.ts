import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSplashscreenComponent } from './loading-splashscreen.component';

describe('LoadingSplashscreenComponent', () => {
  let component: LoadingSplashscreenComponent;
  let fixture: ComponentFixture<LoadingSplashscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingSplashscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSplashscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
