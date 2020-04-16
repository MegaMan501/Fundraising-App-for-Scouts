import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { stringify } from 'querystring';


const BACKEND_URL = 'http://localhost:45213/api/users';



export interface memberModel {
  name:string,
  email:string
}


@Injectable({
  providedIn: 'root'
})

export class MemberLeaderService {

  constructor(
    private http:HttpClient,
    private router:Router,

    ) {}




   // insert new user info into user table
   addUser(name: string, email:string){

    name = name;
    email = email;

    // regular scout user


    const data = {name, email};

    this.http.post(BACKEND_URL + "/addUser", data).subscribe(res => {
      return;
    })

   }


    // GET all user info from user table
   getUser(){
       this.http.get<{rows}>(BACKEND_URL + "/getUser").subscribe(res => {
        console.log(res.rows)

   })

  }
}
