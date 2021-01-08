import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(private authService: AuthService, public router: Router) {

    this.auth = {
      email: "",
      pass: "",
    };

    this.authtResponse = {
      token: ""
    };
   }

  ngOnInit(): void {
  }

  SingIn(){
    if(this.auth.email != "" && this.auth.pass != ""){
      this.authService.Authenticate(this.auth).subscribe((data) => {
        this.authtResponse = data;
        let token = this.authtResponse.token;

        if (token){
          localStorage.setItem("token", token);
          this.router.navigate(['/']);
        }
      }, (err) => {
        console.log("Usuario o contraseña no validos!");
      });
    }else{
      console.log("Todos los campos son requeridos!");
    }
  }
}
