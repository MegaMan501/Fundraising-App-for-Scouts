import { Component, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';
import { Member } from '../../models/all.model';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './scouts.component.html',
  styleUrls: ['./scouts.component.scss']
})
export class ScoutComponent {
  hide = true;
  scoutForm: FormGroup;
  displayedColumns: string[] = ['userId', 'fullname', 'email'];
  scouts: Member[] = [];
  dataSource = new MatTableDataSource<Member>(this.scouts);
  private scoutsSub: Subscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public authService: AuthService) {
    this.scoutForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.authService.getScouts();
    this.scoutsSub = this.authService.getAllScoutStatusListener()
    .subscribe(results => {
      this.scouts = results;
    });
    // console.log("Scouts:",this.scouts);
  }

  onAddLeader() {
    if (this.scoutForm.invalid) {
      return;
    }
    console.log(this.scoutForm.value);
    this.authService.createScout(
      this.scoutForm.value.email,
      this.scoutForm.value.name,
      this.scoutForm.value.password);
    this.scoutForm.reset(); // clear values in form
  }
}
