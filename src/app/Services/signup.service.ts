import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ISignup} from "../Models/isignup.model";
import {Observable} from "rxjs";
import {AuthorizationService} from "./authorization.service";

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  signupURL = 'https://lei-nodejs-016.onrender.com/api/auth/signup/';
  signupURL1 = 'https://lei-nodejs-016.onrender.com/api/users/'
  signupURL2 = 'https://lei-nodejs-016.onrender.com/api/users/all'
  signupURL3 = 'https://lei-nodejs-016.onrender.com/api/users/spa'
  //userURL = 'http://localhost:3000/api/users';
  constructor(private http: HttpClient, private autService: AuthorizationService) { }


  createAccount(signup : ISignup): Observable<ISignup> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<ISignup>(this.signupURL1, signup, { headers });
  }

  getAllUsers() {
    return this.http.get<ISignup[]>(this.signupURL2);
  }

  getUserById(userId : string){
    return this.http.get<ISignup>(this.signupURL1+ "?email=" + userId);
  }

  editUser(user: ISignup) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<ISignup>(this.signupURL1, user, { headers });
  }

}
