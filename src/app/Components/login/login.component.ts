import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthorizationService} from "../../Services/authorization.service";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {SignupService} from "../../Services/signup.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public email: any;
  public password: any;

  constructor(private fb: FormBuilder, private autService: AuthorizationService, private socialAuth: SocialAuthService,) {
  }

  ngOnInit() {
    this.autService.redirectToHome();

    this.socialAuth.signOut();

    this.socialAuth.authState.subscribe((user) => {
      if (user.idToken) {
        sessionStorage.setItem("google-user", JSON.stringify(user));
        this.login(user.email, "010101010101");
        this.autService.redirect('/signup')
      }
    });
  }

  login(email: string, password: string): void {
    console.log(email + password)
    debugger
    this.autService.getUser(email, password)?.subscribe(obj => {
      sessionStorage.setItem("token", JSON.stringify(obj));
      document.location.href = "/sessions/private";
    });
  }
}

