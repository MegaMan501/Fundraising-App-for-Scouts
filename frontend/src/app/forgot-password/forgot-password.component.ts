import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ForgotPasswordService } from '../forgot-password-service/forgot-password.service';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  //Subscription to see if the server returns a message or not
  private emailStatusSub: Subscription;
  emailForm: FormGroup;
  isLoading = false;
  hide = true;
  version = environment.version;

  constructor(public forgotPasswordService: ForgotPasswordService) {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit() {
    this.emailStatusSub = this.forgotPasswordService.getEmailSentListener().subscribe(
      emailStatus => {
        this.isLoading = false;
      }
    );
  }

  //User puts in an email and clicks Send Request button
  onSendRequest() {
    if (this.emailForm.invalid) {
      return;
    }
    this.isLoading = true;
    //Do forgot-password service sendRequest here
    this.forgotPasswordService.sendRequest(this.emailForm.value.email);
  }

  ngOnDestroy() {
    this.emailStatusSub.unsubscribe();
  }
}