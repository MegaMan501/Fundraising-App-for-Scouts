import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';

import { Group } from '../../models/all.model';
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

  constructor(public authService: AuthService) {
    this.groupForm = new FormGroup({
      groupId: new FormControl('', [Validators.required]),
      groupName: new FormControl('', [Validators.required]),
      groupLocation: new FormControl('', [Validators.required]),
      groupDesc: new FormControl()
    });
  }

  ngOnInit() {
    this.authService.getGroups();
    this.groupsSub = this.authService
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
    this.authService.createGroup(
      this.groupForm.value.groupId,
      this.groupForm.value.groupName,
      this.groupForm.value.groupLocation,
      this.groupForm.value.groupDesc
    );
    formDirective.resetForm();
    this.groupForm.reset(); // clear values in form
  }

  ngOnDestroy(): void {
    this.groupsSub.unsubscribe();
  }
}
