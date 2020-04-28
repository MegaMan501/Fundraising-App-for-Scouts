import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.scss']
})
export class DialogEditInventoryComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
