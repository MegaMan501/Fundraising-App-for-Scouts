import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLeaderComponent } from './dashboard-leader.component';

describe('DashboardLeaderComponent', () => {
  let component: DashboardLeaderComponent;
  let fixture: ComponentFixture<DashboardLeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
