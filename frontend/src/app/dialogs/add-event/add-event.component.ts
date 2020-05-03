import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class DialogAddEventComponent {
  event = {} as any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  isEmpty() {
    return Object.keys(this.event).length === 0 ? true : false;
  }
}
