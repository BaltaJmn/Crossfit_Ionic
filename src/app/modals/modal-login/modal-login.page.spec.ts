import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoginPage } from './modal-login.page';

describe('ModalLoginPage', () => {
  let component: ModalLoginPage;
  let fixture: ComponentFixture<ModalLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
