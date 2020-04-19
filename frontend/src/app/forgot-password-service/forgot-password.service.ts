import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const BACKEND_URL = 'http://localhost:45213/api/users';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  //Message returned from server

  //Observable from react js
  private emailStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getEmailSentListener() { return this.emailStatusListener.asObservable(); }

  sendRequest (email: string)
  {
    //Putting email in brackets for POST request
    const reqData = { email };
    //Making POST request to backend
    return this.http.post<{message: string}>(BACKEND_URL + '/pass-reset-req', reqData)
      //If the backend returns a successful HTTP message, then display what it sent
      .subscribe(res => {
        console.log(res);
        var returnedMsg = res.message;
        //State that the request was successful by replacing the email field and other content in the card with a success message
        document.querySelector('.acard').innerHTML = returnedMsg;
      }, err => {
        console.error('Password Reset Request: ', err);
        this.emailStatusListener.next(false);
      });
  }


}