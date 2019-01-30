import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverFotoComponent } from './popover-foto.component';

describe('PopoverFotoComponent', () => {
  let component: PopoverFotoComponent;
  let fixture: ComponentFixture<PopoverFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverFotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
