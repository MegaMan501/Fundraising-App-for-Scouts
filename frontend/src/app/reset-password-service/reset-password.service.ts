//(Do get request processing here)
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const BACKEND_URL = 'http://localhost:45213/api/users';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  //Message returned from server

  //Observable from react js
  private passSentListener = new Subject<boolean>();

  //Observable from reactjs to determine if a token was valid or not
  private validTokenListener = new Subject<boolean>();

  

  constructor(private http: HttpClient, private router: Router) { }

  getPassSentListener() { return this.passSentListener.asObservable(); }

  //getValidTokenListener() { return this.validTokenListener.asObservable(); }
  
  verifyToken(token: string)
  {
    const reqData = { token };
    return this.http.post<{message: string}>(BACKEND_URL + '/check-reset-token', reqData)
      .subscribe(res => {
        console.log(res);
        var returnedMsg = res.message;
        console.log(res.message);
        //If the returned message was a 200 response, 
        //then just set the passSentListener to true
        this.passSentListener.next(true);
      }, err => {
         //Otherwise, replace the form with the error
         document.querySelector('.acard').innerHTML = 'Invalid or Expired Token!';
         console.error("Note: Attempting to modify the code and access the original form will result in another error message. We always do checking on the backend, after all :)");
         this.passSentListener.next(false);
      });
  }
  

  sendNewPass (confpassword: string, token:string)
  {
    //Putting email in brackets for POST request
    const reqData = { confpassword, token };
    //Making POST request to backend
    return this.http.post<{message: string}>(BACKEND_URL + '/reset-pass', reqData)
      //If the backend returns a successful HTTP message, then display what it sent
      .subscribe(res => {
        console.log(res);
        var returnedMsg = res.message;
        //State that the request was successful by replacing the email field and other content in the card with a success message
        document.querySelector('.acard').innerHTML = returnedMsg;
      }, err => {
        console.error('Password Reset Request: ', err);
        this.passSentListener.next(false);
      });
  }
}