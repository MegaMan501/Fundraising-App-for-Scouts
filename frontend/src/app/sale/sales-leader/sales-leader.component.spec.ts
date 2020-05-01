import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLeaderComponent } from './sales-leader.component';

describe('SalesLeaderComponent', () => {
  let component: SalesLeaderComponent;
  let fixture: ComponentFixture<SalesLeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesLeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
