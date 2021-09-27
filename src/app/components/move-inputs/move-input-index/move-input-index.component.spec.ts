import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveInputIndexComponent } from './move-input-index.component';

describe('MoveInputIndexComponent', () => {
  let component: MoveInputIndexComponent;
  let fixture: ComponentFixture<MoveInputIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveInputIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveInputIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
