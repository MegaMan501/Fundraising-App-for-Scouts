import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Member } from '../../models/all.model';
import { MatSort } from '@angular/material/sort';
import { MemberService } from '../member.service';

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
  displayedColumns: string[] = ['userId', 'fullname', 'email'];
  dataSource: MatTableDataSource<any>;
  private leadersSub: Subscription;


  constructor(public memberService: MemberService) {
    this.leaderForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  async ngOnInit() {
    await this.memberService.getLeaders();
    this.leadersSub = this.memberService
    .getAllLeaderStatusListener()
    .subscribe(results => {
      this.leaders = results;
      this.dataSource = new MatTableDataSource<Member>(this.leaders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log("Leaders:",this.leaders);
    });
  }

  onAddLeader(formDirective: FormGroupDirective) {
    if (this.leaderForm.invalid) {
      return;
    }
    console.log(this.leaderForm.value);
    this.memberService.createLeader(
      this.leaderForm.value.email,
      this.leaderForm.value.name,
      this.leaderForm.value.password);
    formDirective.resetForm();
    this.leaderForm.reset(); // clear values in form
  }

  ngOnDestroy() {
    this.leadersSub.unsubscribe();
  }
}
