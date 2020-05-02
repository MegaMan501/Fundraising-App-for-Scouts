import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroupDirective, Validators, NgForm, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AccountSettingsService } from './account-settings-service/account-settings.service';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';


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
  selector: 'app-accountsettings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  private accountSettingsSub: Subscription;
  private nameResult: Subscription;
  private roleResult: Subscription;
  settingsForm: FormGroup;
  isLoading = false;
  hide = true;
  //email: string;
  name: string;
  role: string;
  message: string;

  //version = environment.version;

  //Conditional validator for password and confirm password if one of them is not null
  //Source: https://www.codementor.io/@jimohhadi/angular-validators-with-conditional-validation-in-reactive-forms-pj5z7gsq5#setting-validation-for-user-category
  //setPasswordValidators() {



  //}
  constructor(private formBuilder: FormBuilder, public accountSettingsService: AccountSettingsService) {
    this.settingsForm = this.formBuilder.group({
      //email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      //No Validator.required, since a user may choose not to change their password
      password: new FormControl(''),
      //Insert confirm password here
      confirmPassword : new FormControl('')
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit() {
    this.accountSettingsService.getUserDetails();

    this.nameResult = this.accountSettingsService.getnameListener().subscribe(
      results => {
        this.name = results;
        this.settingsForm.patchValue({name: results});
      }
    );

    this.roleResult = this.accountSettingsService.getroleListener().subscribe(
      results => {
        this.role = results;
      }
    )

    this.accountSettingsSub = this.accountSettingsService.getaccountSettingsListener().subscribe(
      results => {
        this.isLoading = false;
      }
    );
    
  }

  onSubmit() {
    if (this.settingsForm.invalid) {
      return;
    }
    this.isLoading = true;

    //Submit the changes here (follow edit scout stuff to see how passwords were covered in code and in stored procedure)

    //this.authService.login(this.settingsForm.value.email, this.settingsForm.value.password);
    this.accountSettingsService.sendChanges(this.settingsForm.value.name, this.settingsForm.value.confirmPassword)
  }

  ngOnDestroy() {
    //Change to a different observable
    this.accountSettingsSub.unsubscribe();
  }

}