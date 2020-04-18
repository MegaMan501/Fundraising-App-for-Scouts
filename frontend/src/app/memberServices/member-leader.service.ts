import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { catchError } from 'rxjs/operators';


const BACKEND_URL = 'http://localhost:45213/api/users';



export interface memberModel {
  name:string,
  email:string
}

export interface user {
  user_id: number,
  // group_id: number,
  full_name: string,
  email: string
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
   addUser(name:string, email:string){

    name = name;
    email = email;

    // regular scout user
    const data = {name, email};

    this.http.post(BACKEND_URL + "/addUser", data).subscribe(res => {
      return;
    })
   }


   // GET all user info from user table
   getUser(): Observable<user[]>{
      return this.http.get<user[]>(BACKEND_URL + "/getUser")
 }

  // DELETE user from the user table
    deleteUser(id: number): Observable<any> {
       return this.http.delete(BACKEND_URL + `"/deleteUser/${id}"`)

    }

}






