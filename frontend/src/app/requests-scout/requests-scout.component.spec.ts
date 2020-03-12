import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsScoutComponent } from './requests-scout.component';

describe('RequestsScoutComponent', () => {
  let component: RequestsScoutComponent;
  let fixture: ComponentFixture<RequestsScoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsScoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsScoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
