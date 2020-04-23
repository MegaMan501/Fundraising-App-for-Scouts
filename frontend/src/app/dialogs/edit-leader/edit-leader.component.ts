import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './edit-leader.component.html',
  styleUrls: ['./edit-leader.component.scss']
})
export class DialogEditLeaderComponent {
  hide = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
