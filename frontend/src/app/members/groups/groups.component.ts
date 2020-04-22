import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
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
@Component({
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  hide = true;
  groups: Group[] = [];
  groupForm: FormGroup;
  displayedColumns: string[] = ['groupId', 'groupName', 'groupLocation', 'groupDesc', 'action'];
  dataSource: MatTableDataSource<any>;
  private groupsSub: Subscription;

  constructor(public memberService: MemberService, public dialog: MatDialog) {
    this.groupForm = new FormGroup({
      groupId: new FormControl('', [Validators.required]),
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
    });

  }

  onAddGroup(formDirective: FormGroupDirective) {
    if (this.groupForm.invalid) {
      return;
    }
    console.log(this.groupForm.value);
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
      // console.log(res.val);
      this.memberService.updateGroup(res.val, prevGroup);
    });
  }

  // Delete the group
  onDelete(row) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        title: 'Are You Sure You Want To Delete This Group?',
        val: row
      },
      disableClose: true
    });

    // delete the group by id
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.memberService.deleteGroup(row.groupId).subscribe(() => {
          this.memberService.getGroups();
        });
      }
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
