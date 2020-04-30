import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';

import { Group } from '../../models/all.model';
import { MemberService } from '../member.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/dialogs/delete/dialog-delete.component';
import { DialogEditGroupComponent } from 'src/app/dialogs/edit-group/edit-group.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  hide = true;
  isLoading = true;
  groups: Group[] = [];
  groupForm: FormGroup;
  displayedColumns: string[] = ['groupId', 'groupName', 'groupLocation', 'groupDesc', 'action'];
  dataSource: MatTableDataSource<any>;
  private groupsSub: Subscription;

  constructor(
    public memberService: MemberService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) {
    this.groupForm = new FormGroup({
      groupId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      groupName: new FormControl('', [Validators.required]),
      groupLocation: new FormControl('', [Validators.required]),
      groupDesc: new FormControl()
    });
  }

  ngOnInit() {
    this.memberService.getGroups();
    this.groupsSub = this.memberService
    .getAllGroupStatusListener()
    .subscribe(results => {
      this.groups = results;
      this.dataSource = new MatTableDataSource<Group>(this.groups);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });

  }

  // Refresh the list of groups
  onRefreshGroup() {
    this.isLoading = true;
    this.memberService.getGroups();
    this.isLoading = false;
  }

  // Add a group
  onAddGroup(formDirective: FormGroupDirective) {
    if (this.groupForm.invalid) {
      return;
    }
    // console.log(this.groupForm.value);
    this.memberService.createGroup(
      this.groupForm.value.groupId,
      this.groupForm.value.groupName,
      this.groupForm.value.groupLocation,
      this.groupForm.value.groupDesc
    );
    formDirective.resetForm();
    this.groupForm.reset(); // clear values in form
  }

  // Edit the group
  onEdit(row) {
    const prevGroup = row.groupId;
    const dialogRef = this.dialog.open(DialogEditGroupComponent, {
      data: {
        title: 'Edit This Group.',
        val: row
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === false) {
        this.memberService.getGroups();
        return;
      }
      this.isLoading = true;
      this.memberService.updateGroup(res.val, prevGroup);
      this.isLoading = false;
    });
  }

  // Delete the group
  onDelete(row) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        title: `Are You Sure You Want To Delete Group: ${row.groupName}?`,
        val: row
      },
      disableClose: true
    });

    // delete the group by id
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.isLoading = true;
        this.memberService.deleteGroup(row.groupId)
        .subscribe(response => {
          this.snackbar.open(response.message.toString(), 'Okay', { duration: 5000 });
          this.memberService.getGroups();
          this.isLoading = false;
        });
      }
      return;
    });
  }

  // Filter the table
  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.groupsSub.unsubscribe();
  }
}
