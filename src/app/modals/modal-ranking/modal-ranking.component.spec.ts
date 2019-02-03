import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRankingComponent } from './modal-ranking.component';

describe('ModalRankingComponent', () => {
  let component: ModalRankingComponent;
  let fixture: ComponentFixture<ModalRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
