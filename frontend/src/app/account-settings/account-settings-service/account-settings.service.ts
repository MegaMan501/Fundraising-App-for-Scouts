import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const BACKEND_URL = 'http://localhost:45213/api/users';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {
//Message returned from server

  //Observables from react js
  private accountSettingsListener = new Subject<boolean>();
  private nameListener = new Subject<string>();
  private roleListener = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) { }

  getaccountSettingsListener() { return this.accountSettingsListener.asObservable(); }
  getnameListener() { return this.nameListener.asObservable(); }
  getroleListener() { return this.roleListener.asObservable(); }

  //getValidTokenListener() { return this.validTokenListener.asObservable(); }
  

  getUserDetails() {
    //Add email field in {} if we want ability to change email
    return this.http.get<{name: string, role:string}>(BACKEND_URL + '/get-user-info')
      .subscribe(res => {
        console.log(res);
        var results = [res.name, res.role];
        //name = res.name;
        //DEBUGGING: Displaying the value for name gathered from the get response
        console.log('Current value for name: ' + res.name);
        //role = res.role;
        //If the returned message was a 200 response, 
        //then just set the passSentListener to true
        this.accountSettingsListener.next(true);
        this.nameListener.next(res.name);
        this.roleListener.next(res.role);
      }, err => {
         //Otherwise, replace the form with the error
         document.querySelector('.acard').innerHTML = 'Authentication or DB Error!';
         console.error("Authentication or other Error!");
         this.accountSettingsListener.next(false);
      });
  }

  sendChanges(name:String, confirmPassword: String) {
      //Putting email in brackets for POST request
      const reqData = { name, confirmPassword };
      //Making POST request to backend
      return this.http.post<{message: string}>(BACKEND_URL + '/update-user', reqData)
        //If the backend returns a successful HTTP message, then display what it sent
        .subscribe(res => {
          console.log(res);
          var returnedMsg = res.message;
          //State that the request was successful by replacing the email field and other content in the card with a success message
          document.querySelector('.acard').innerHTML = returnedMsg;
        }, err => {
          console.error('Error updating user!: ', err);
          this.accountSettingsListener.next(false);
        });
  }
}