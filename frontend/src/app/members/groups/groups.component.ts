import { Component, ViewChild } from "@angular/core";
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Group } from '../group.model';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupComponent {
  hide = true;
  groupForm: FormGroup;
  displayedColumns: string[] = ['groupId', 'groupName', 'groupLocation', 'groupDesc'];
  groups: Group[] = [];
  dataSource = new MatTableDataSource<Group>(this.groups);
  private groupsSub: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public authService: AuthService) {
    this.groupForm = new FormGroup({
      groupId: new FormControl('', [Validators.required]),
      groupName: new FormControl('', [Validators.required]),
      groupLocation: new FormControl('', [Validators.required]),
      groupDesc: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.authService.getGroups();
    this.groupsSub = this.authService.getAllGroupStatusListener()
    .subscribe(results => {
      this.groups = results;
    });
    // console.log("Groups:",this.groups);
  }

  onAddGroup() {
    if (this.groupForm.invalid) {
      return;
    }
    console.log(this.groupForm.value);
    this.authService.createGroup(
      this.groupForm.value.groupId,
      this.groupForm.value.groupName,
      this.groupForm.value.groupLocation,
      this.groupForm.value.groupDesc
    );
    this.groupForm.reset(); // clear values in form
  }
}
