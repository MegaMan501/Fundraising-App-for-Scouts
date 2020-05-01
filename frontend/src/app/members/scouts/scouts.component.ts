import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Member, Scout, Group } from '../../models/all.model';
import { Subscription } from 'rxjs';
import { MemberService } from '../member.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/dialogs/delete/dialog-delete.component';
import { DialogEditScoutComponent } from 'src/app/dialogs/edit-scout/edit-scout.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './scouts.component.html',
  styleUrls: ['./scouts.component.scss']
})
export class ScoutComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort; MatSort;
  hide = true;
  isLoading = true;
  prevGroup: number;
  scoutForm: FormGroup;
  displayedColumns: string[] = ['userId', 'groupId', 'fullname', 'email', 'action'];
  scouts: Scout[] = [];
  groups: Group[] = [];
  dataSource: MatTableDataSource<Member>;
  private scoutsSub: Subscription;
  private groupsSub: Subscription;

  constructor(
    public membersService: MemberService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.scoutForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      group: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    // get scouts
    this.membersService.getScouts();
    this.scoutsSub = this.membersService
    .getAllScoutStatusListener()
    .subscribe(results => {
      this.scouts = results;
      this.dataSource = new MatTableDataSource<Scout>(this.scouts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });

    // get the groups
    this.membersService.getGroups();
    this.groupsSub = this.membersService
    .getAllGroupStatusListener()
    .subscribe(res => {
      this.groups = res;
    });
  }

  onRefreshScout() {
    this.isLoading = true;
    this.membersService.getScouts();
    this.isLoading = false;
  }

  onAddScout(formDirective: FormGroupDirective) {
    if (this.scoutForm.invalid) {
      return;
    }
    console.log(this.scoutForm.value);
    this.membersService.createScout(
      this.scoutForm.value.group,
      this.scoutForm.value.email,
      this.scoutForm.value.name,
      this.scoutForm.value.password);
    formDirective.resetForm();  // reset the form
    this.scoutForm.reset(); // clear values in form
  }

  onEdit(row) {
    this.prevGroup = row.groupId;
    const dialogRef = this.dialog.open(DialogEditScoutComponent, {
      data: {
        title: `Are You Sure You Want to Edit This Scout (${row.fullname})?`,
        val: row,
        groups: this.groups
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === false) {
        this.membersService.getScouts();
        return;
      }
      const data = {
        userId: res.val.userId,
        groupId: res.val.groupId,
        prevGroup: this.prevGroup,
        fullname: res.val.fullname,
        email: res.val.email,
        pass: res.val.pass ? res.val.pass : ''
      };
      this.isLoading = true;
      this.membersService.updateScout(data);
      this.isLoading = false;
    });
  }

  onDelete(row) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        title: 'Are You Sure You Want to Delete This Scout?',
        val: row
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.isLoading = true;
        this.membersService.deleteScout(row.userId, row.groupId)
        .subscribe(response => {
          this.snackBar.open(response.message.toString(), 'Okay', { duration: 5000 });
          this.membersService.getScouts();
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

  ngOnDestroy() {
    this.scoutsSub.unsubscribe();
    this.groupsSub.unsubscribe();
  }
}
