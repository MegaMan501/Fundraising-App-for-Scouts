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

  constructor(private http: HttpClient, private router: Router) { }

  getPassSentListener() { return this.passSentListener.asObservable(); }

  sendNewPass (password: string, confpassword: string)
  {
    //Putting email in brackets for POST request
    const reqData = { password, confpassword };
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