import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class DialogEditGroupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
