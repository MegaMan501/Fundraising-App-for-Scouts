import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryLeaderComponent } from './inventory-leader.component';

describe('InventoryLeaderComponent', () => {
  let component: InventoryLeaderComponent;
  let fixture: ComponentFixture<InventoryLeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryLeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
