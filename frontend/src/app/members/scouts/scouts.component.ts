import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Member } from '../../models/all.model';
import { Subscription } from 'rxjs';
import { MemberService } from '../member.service';
import { MatSort } from '@angular/material/sort';

@Component({
  templateUrl: './scouts.component.html',
  styleUrls: ['./scouts.component.scss']
})
export class ScoutComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort; MatSort;
  hide = true;
  scoutForm: FormGroup;
  displayedColumns: string[] = ['userId', 'fullname', 'email'];
  scouts: Member[] = [];
  dataSource: MatTableDataSource<Member>;
  private scoutsSub: Subscription;

  constructor(public membersService: MemberService) {
    this.scoutForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.membersService.getScouts();
    this.scoutsSub = this.membersService
    .getAllScoutStatusListener()
    .subscribe(results => {
      this.scouts = results;
      this.dataSource = new MatTableDataSource<Member>(this.scouts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("Scouts:",this.scouts);
    });
  }

  onAddLeader(formDirective: FormGroupDirective) {
    if (this.scoutForm.invalid) {
      return;
    }
    console.log(this.scoutForm.value);
    this.membersService.createScout(
      this.scoutForm.value.email,
      this.scoutForm.value.name,
      this.scoutForm.value.password);
    formDirective.resetForm();  // reset the form
    this.scoutForm.reset(); // clear values in form
  }

  ngOnDestroy() {
    this.scoutsSub.unsubscribe();
  }
}
