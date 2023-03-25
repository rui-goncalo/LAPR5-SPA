import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginURL = 'https://lei-nodejs-016.onrender.com/api/trucks/';
  constructor() { }
}
