import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsLeaderComponent } from './notifications-leader.component';

describe('NotificationsLeaderComponent', () => {
  let component: NotificationsLeaderComponent;
  let fixture: ComponentFixture<NotificationsLeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsLeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
