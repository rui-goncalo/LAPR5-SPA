import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from "rxjs";
import {SignupService} from "./signup.service";
import {ISignup} from "../Models/isignup.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {

  baseURL: string = 'https://lei-nodejs-016.onrender.com/api/users/spa';
  base2URL: string = 'https://lei-nodejs-016.onrender.com/api/users/';
  errorMessage: string = "";

  constructor(private http: HttpClient, private router: Router) {
  }

  public extractData(res: any) {
    return res || {};
  }

  login(email: string, password: string) {

    let errorFlag = true;
    this.errorMessage = "Error! Email or password is not correct!";

    if (!this.checkEmail(email)) errorFlag = false;
    if (!this.checkPassword(password)) errorFlag = false;

    if (!errorFlag) console.log(this.errorMessage);
    return errorFlag;
  }

  checkEmail(email: string): boolean {
    //const regexEmail = new RegExp(/[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+/);

    if (email == null) {
      this.errorMessage += "Email can't be null\n";
      return false;
    }


    return true;
  }

  checkPassword(password: string): boolean {
    if (password == null) {
      this.errorMessage += "Password can't be null\n";
      return false;
    }

    /*if (password.length < 8) {
      this.errorMessage += "Password is not long enough\n";
      return false;
    }*/
    return true;
  }



  validateData(email: string, password: string, firstName: string, lastName: string, phoneNumber: string, role: number): boolean {

    let errorFlag = true;
    this.errorMessage = "there's no user";

    if (!this.checkEmail(email)) errorFlag = false;
    if (!this.checkPassword(password)) errorFlag = false;
    if (!this.checkFirstName(firstName)) errorFlag = false;
    if (!this.checkLastName(lastName)) errorFlag = false;
    if (!this.checkPhoneNumber(phoneNumber)) errorFlag = false;
    if (!this.checkRole(role)) errorFlag = false;

    if (!errorFlag) console.log(this.errorMessage);
    return errorFlag;
  }

  createUser(email: string, password: string, firstName: string, lastName: string, phoneNumber: string, role: number): Observable<any> {

    const body = {
      "email": email,
      "password": password,
      "firstName": firstName,
      "lastName": lastName,
      "phoneNumber": phoneNumber,
      "role": role
    };

    return this.http.post(this.base2URL, body).pipe(map(this.extractData));
  }

  checkFirstName(firstName: string): boolean {
    if (firstName == null) {
      this.errorMessage += "First name can't be null\n";
      return false;
    }

    return true;
  }

  checkLastName(lastName: string): boolean {
    if (lastName == null) {
      this.errorMessage += "Last name can't be null\n";
      return false;
    }

    return true;
  }

  checkPhoneNumber(phoneNumber: string): boolean {
    if (phoneNumber == null) {
      this.errorMessage += "Phone number can't be null\n";
      return false;
    }

    return true;
  }

  checkRole(role: number): boolean {
    if (role == null) {
      this.errorMessage += "User role can't be null\n";
      return false;
    }

    if (role < 1 || role > 5) {
      this.errorMessage += "Invalid user role\n";
      return false;
    }

    return true;
  }

  redirectToHome(): void {
    if (sessionStorage.getItem("token")) {
      document.location.href = '/sessions/private';
    }
  }

  redirectToLogin(): void {
    if (sessionStorage.getItem("token")) {
      document.location.href = '/login';
    }
  }

  getUser(email: string, password: string): Observable<any> {
    const params = "email=" + email + "&password=" + password;

    return this.http.get(this.baseURL + "?" + params).pipe(map(this.extractData));
  }

  createValidUser(email: string, password: string, firstName: string, lastName: string, phoneNumber: string, role: number): Observable<any> | null {
    if (!this.validateData(email, password, firstName, lastName, phoneNumber, role)) return null;

    return this.createUser(email, password, firstName, lastName, phoneNumber, role);
  }


  redirect(url: string): void {
    this.router.navigate([url]).then();
  }
}
