import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverLogoutComponent } from './popover-logout.component';

describe('PopoverLogoutComponent', () => {
  let component: PopoverLogoutComponent;
  let fixture: ComponentFixture<PopoverLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
