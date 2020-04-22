import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './edit-scout.component.html',
  styleUrls: ['./edit-scout.component.scss']
})
export class DialogEditScoutComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
