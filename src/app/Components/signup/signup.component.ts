import {Component, OnInit} from '@angular/core';
import {SignupService} from "../../Services/signup.service";
import {NgForm} from "@angular/forms";
import {AuthorizationService} from "../../Services/authorization.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  public successMessage = 'User created successfully!';
  public errorMessage = 'Error while creating User.';
  public userCreated: boolean | undefined;

  public arr: any;
  public lengthArr: any;
  public roleChoice: any;

  email: any;
  password: any;
  firstName: any;
  lastName: any;
  phoneNumber: any;
  role: number = 1;

  blockInput: boolean = false;
  blockSignup: boolean = false;

  chooseRole(e: any) {
    console.log(e.target.value);
    this.roleChoice = e.target.value;
  }

  constructor(private signupService: SignupService, public autService: AuthorizationService) { }

  ngOnInit(): void {

    this.autService.redirectToHome();

    const googleUser = JSON.parse(sessionStorage.getItem("google-user")!);
    if (googleUser) {
      this.blockInput = true;
      this.email = googleUser.email;
      this.password = "010101010101"
      this.firstName = googleUser.firstName;
      this.lastName = googleUser.lastName;
      this.phoneNumber = "912626240";
    }
  }

  signup(): void {
    this.autService.createValidUser(this.email, this.password, this.firstName, this.lastName, this.phoneNumber, this.role)?.subscribe(obj => {
      sessionStorage.setItem("token", JSON.stringify(obj.userDTO));
      this.autService.redirectToHome();
    });
  }


  createAccount(form: NgForm) {

    this.arr = this.signupService.getAllUsers().subscribe((data: any) => {
      this.arr = data;

      if (this.roleChoice == "Gestor de Logística") {
        this.roleChoice = 1;
      } else if (this.roleChoice == "Gestor de Armazéns") {
        this.roleChoice = 2;
      } else if(this.roleChoice == "Gestor de Planeamento") {
        this.roleChoice = 3;
      }

      this.signupService.createAccount({
        email: form.value.email,
        password: form.value.password,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        phoneNumber: form.value.phoneNumber,
        role: this.roleChoice,

      }).subscribe((data: any) => {
        this.userCreated = true
        this.successMessage = "User created successfully!"
        this.refresh()
      }, (error: { message: string; }) => {
        this.userCreated = false;
        // @ts-ignore
        this.errorMessage = "Error while creating User\n"
          + "firstname: " + form.value.firstName
          + "lastname: " + form.value.lastName
          + "password: " + form.value.password
          + "email: " + form.value.email
          + "Role: " + this.roleChoice;
      });
    });
  }


  refresh(): void {
    window.location.reload();
  }
}
