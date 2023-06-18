import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataFormComponent } from './add-data-form.component';

describe('AddDataFormComponent', () => {
  let component: AddDataFormComponent;
  let fixture: ComponentFixture<AddDataFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDataFormComponent]
    });
    fixture = TestBed.createComponent(AddDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
