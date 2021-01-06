import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Auth } from 'src/app/interfaces/auth';
import { AuthResponse } from 'src/app/interfaces/auth-response';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  auth: Auth;
  authtResponse: AuthResponse;
  subscription: Subscription;

  constructor(private authService: AuthService) {

    this.auth = {
      email: "",
      pass: "",
    };

    this.authtResponse = {
      token: ""
    };
   }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  SingIn(){
    if(this.auth.email != "" && this.auth.pass != ""){
      this.subscription = this.authService.Authenticate(this.auth).subscribe((data) => {
        this.authtResponse = data;
        let token = this.authtResponse.token;

        if (token){
          localStorage.setItem("token", token);
        }
      }, (err) => {
        console.log("Usuario o contraseña no validos!");
      });
    }else{
      console.log("Todos los campos son requeridos!");
    }
  }
}
