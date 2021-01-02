import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/interfaces/auth';
import { AuthResponse } from 'src/app/interfaces/auth-response';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  auth: Auth;
  authtResponse: AuthResponse;

  constructor(private authService: AuthService) {

    this.auth = {
      email: "",
      pass: "",
    };

    this.authtResponse = {
      email: "",
      token: ""
    };
   }

  ngOnInit(): void {
  }

  SingIn(){
    this.authService.Authenticate(this.auth).subscribe((data) => {
      this.authtResponse = data;

      if (this.authtResponse.token){
        localStorage.setItem("token", this.authtResponse.token);
      }
    }, (err) => {
      console.log(err);
    });
  }
}
