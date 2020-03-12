import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardScoutComponent } from './dashboard-scout.component';

describe('DashboardScoutComponent', () => {
  let component: DashboardScoutComponent;
  let fixture: ComponentFixture<DashboardScoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardScoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardScoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
