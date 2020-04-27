import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ResetPasswordService } from '../reset-password-service/reset-password.service';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import {Router, ActivatedRoute, Params} from '@angular/router';

//Custom error state that is returned when the passwords do not match. It will either return an error stating
//that the first password field did not have a password entered when it should have, or
//that the second password field does not match the first
//Source: https://stackblitz.com/edit/angular-yhbuqn-s5lmtv?file=app%2Finput-error-state-matcher-example.ts
//Original source: https://stackoverflow.com/questions/51605737/confirm-password-validation-in-angular-6 Answer:
//AJT82
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
      const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
  
      return (invalidCtrl || invalidParent);
    }
}

@Component({
  selector: 'app-resetpass',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  //Subscription to see if the server returns a message or not
  private resetStatusSub: Subscription;
  resetPasswordForm: FormGroup;
  isLoading = false;
  hide = true;
  version = environment.version;
  
  //private activatedRoute: ActivatedRoute;
  token: string;

  
  //formBuilder that will allow two field values to be sent
  //to check password function
  //Source: https://stackblitz.com/edit/angular-yhbuqn-s5lmtv?file=app%2Finput-error-state-matcher-example.ts
  //Original source: https://stackoverflow.com/questions/51605737/confirm-password-validation-in-angular-6 Answer:
  //AJT82
  constructor(private formBuilder: FormBuilder, public resetPasswordService: ResetPasswordService, private activatedRoute: ActivatedRoute) {
    this.resetPasswordForm = this.formBuilder.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit() {
    //Change to reset password service when ready
    //(also do password )

    //Gathering the query parameter
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
    });

    this.resetStatusSub = this.resetPasswordService.getPassSentListener().subscribe(
      forgotPasswordStatus => {
        this.isLoading = false;
      }
    );

    console.log(this.token);

    //Make post request after observable has been acquired
    this.resetPasswordService.verifyToken(this.token);
    

    //POST request using service
    //verifyToken()
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    //Change to reset password service when ready
    this.resetPasswordService.sendNewPass(this.resetPasswordForm.value.confirmPassword, this.token);
  }

  ngOnDestroy() {
    //Change to reset password service when ready
    this.resetStatusSub.unsubscribe();
  }
}
