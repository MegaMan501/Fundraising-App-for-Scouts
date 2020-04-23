import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Member } from '../../models/all.model';
import { MatSort } from '@angular/material/sort';
import { MemberService } from '../member.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from 'src/app/dialogs/delete/dialog-delete.component';
import { DialogEditLeaderComponent } from 'src/app/dialogs/edit-leader/edit-leader.component';

@Component({
  templateUrl: './leaders.component.html',
  styleUrls: ['./leaders.component.scss']
})
export class LeaderComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  hide = true;
  leaders: Member[] = [];
  leaderForm: FormGroup;
  displayedColumns: string[] = ['userId', 'fullname', 'email', 'action'];
  dataSource: MatTableDataSource<any>;
  private leadersSub: Subscription;

  constructor(public memberService: MemberService, public dialog: MatDialog) {
    this.leaderForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.memberService.getLeaders();
    this.leadersSub = this.memberService
    .getAllLeaderStatusListener()
    .subscribe(results => {
      this.leaders = results;
      this.dataSource = new MatTableDataSource<Member>(this.leaders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onAddLeader(formDirective: FormGroupDirective) {
    if (this.leaderForm.invalid) {
      return;
    }
    // console.log(this.leaderForm.value);
    this.memberService.createLeader(
      this.leaderForm.value.email,
      this.leaderForm.value.name,
      this.leaderForm.value.password);
    formDirective.resetForm();
    this.leaderForm.reset(); // clear values in form
    this.memberService.getLeaders();
  }

  // edit a leader
  onEdit(row) {
    console.log(row);
    const dialogRef = this.dialog.open(DialogEditLeaderComponent, {
      data: {
        title: 'Edit This Group',
        val: row
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === false) {
        this.memberService.getLeaders();
        return;
      }
      this.memberService.updateLeader(res.val);
    });
  }

  // delete a leader
  onDelete(row) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        title: 'Are You Sure You Want to Delete This Leader?',
        val: row
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        // console.log(res);
        this.memberService.deleteLeader(row.userId).subscribe(() => {
          this.memberService.getLeaders(); // get updated list of leaders
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
    this.leadersSub.unsubscribe();
  }
}
