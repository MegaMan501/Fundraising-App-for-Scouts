import { Component, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Member } from '../../models/all.model';

@Component({
  templateUrl: './leaders.component.html',
  styleUrls: ['./leaders.component.scss']
})
export class LeaderComponent {
  hide = true;
  leaders: Member[] = [];
  leaderForm: FormGroup;
  displayedColumns: string[] = ['userId', 'fullname', 'email'];
  dataSource = new MatTableDataSource<Member>(this.leaders);
  private leadersSub: Subscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public authService: AuthService) {
    this.leaderForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.authService.getLeaders();
    this.leadersSub = this.authService.getAllLeaderStatusListener()
    .subscribe(results => {
      this.leaders = results;
    });
    // console.log("Leaders:",this.leaders);
  }

  onAddLeader() {
    if (this.leaderForm.invalid) {
      return;
    }
    console.log(this.leaderForm.value);
    this.authService.createLeader(
      this.leaderForm.value.email,
      this.leaderForm.value.name,
      this.leaderForm.value.password);
    this.leaderForm.reset(); // clear values in form
  }
}
