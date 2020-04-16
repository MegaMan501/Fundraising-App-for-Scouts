import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { stringify } from 'querystring';


const BACKEND_URL = 'http://localhost:45213/api/users';

@Injectable({
  providedIn: 'root'
})
export class MemberLeaderService {

  constructor(private http:HttpClient, private router:Router) {
   }

   // insert new user info into user table
   createUser(name:string, email:string ){

    email = 'sdf@gmail.com'

    // regular scout user
    let leader_flag = 0;
    let admin_flag = 0;

    const data = {name, email, leader_flag, admin_flag};

    console.log(data);

    this.http.post(BACKEND_URL + "/createUser", data).subscribe(res => {
      return;
    })

   }


    // get all user info from user table
   getAllUser(){
      this.http.get<{rows}>(BACKEND_URL + "/getAllUser").subscribe(res =>{
        console.log(res.rows);
      });
   }


}
