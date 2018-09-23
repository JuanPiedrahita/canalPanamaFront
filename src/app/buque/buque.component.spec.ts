import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuqueComponent } from './buque.component';

describe('BuqueComponent', () => {
  let component: BuqueComponent;
  let fixture: ComponentFixture<BuqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
