import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsLeaderComponent } from './events-leader.component';

describe('EventsLeaderComponent', () => {
  let component: EventsLeaderComponent;
  let fixture: ComponentFixture<EventsLeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsLeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
