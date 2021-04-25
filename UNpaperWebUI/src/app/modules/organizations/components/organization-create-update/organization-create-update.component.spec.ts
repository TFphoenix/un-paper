import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationCreateUpdateComponent } from './organization-create-update.component';

describe('OrganizationCreateUpdateComponent', () => {
  let component: OrganizationCreateUpdateComponent;
  let fixture: ComponentFixture<OrganizationCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
