import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersLeaderComponent } from './members-leader.component';

describe('MembersLeaderComponent', () => {
  let component: MembersLeaderComponent;
  let fixture: ComponentFixture<MembersLeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersLeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
