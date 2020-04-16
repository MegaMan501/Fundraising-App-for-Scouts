import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesScoutComponent } from './sales-scout.component';

describe('SalesScoutComponent', () => {
  let component: SalesScoutComponent;
  let fixture: ComponentFixture<SalesScoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesScoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesScoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
