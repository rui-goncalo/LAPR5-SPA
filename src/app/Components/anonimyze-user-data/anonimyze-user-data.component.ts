import { Component, OnInit } from '@angular/core';
import {SignupService} from "../../Services/signup.service";
import {NgForm} from "@angular/forms";
import { ISignup } from 'src/app/Models/isignup.model';

@Component({
  selector: 'app-anonimyze-user-data',
  templateUrl: './anonimyze-user-data.component.html',
  styleUrls: ['./anonimyze-user-data.component.css']
})
export class AnonimyzeUserDataComponent implements OnInit {

  public successMessage = '';
  public errorMessage = '';
  public defaultStr = 'default';
  public defaultInt = 0;
  public userAnonimyzed: boolean | undefined;

  users : ISignup[] =[];
  //userTemp : ISignup | undefined;
  public userTemp : any;

  constructor(private signupService: SignupService) { }

  ngOnInit(): void {

    this.signupService.getAllUsers().subscribe((data:any) => {
      this.users = data;
    })

  }

  onAnonimyzeClicked(userId: string){
    console.log(userId);
    this.signupService.getUserById(userId).subscribe((data:any) => {
      this.userTemp = data;
      console.log(this.userTemp);
      //if(this.userTemp != undefined)
      this.signupService.editUser({
        email: this.userTemp.email,
        password: this.userTemp.password,
        firstName: this.defaultStr,
        lastName: this.defaultStr,
        phoneNumber: this.defaultStr,
        role: this.defaultInt
      }).subscribe((data:any) => {
        this.userAnonimyzed = true;
        this.successMessage = "User anonimyzed";
        this.refresh()
      }, (error: {message:string}) => {
        this.userAnonimyzed = false;
        this.errorMessage = "User not found";
      })

    })
  }
 

  refresh(): void {
    window.location.reload();
  }

}
