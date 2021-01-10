import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Angenda v0.0.1';
  user: User;
  tokenInfo: any;
  token: any;

  constructor(private userSv: UserService, private authSv: AuthService, public router: Router){
    this.token = localStorage.getItem("token");
    this.tokenInfo = this.getDecodedAccessToken(this.token); // decode token
  }

  ngOnInit(){
    if (this.tokenInfo != null || this.tokenInfo != undefined){
      this.userSv.GetById(this.tokenInfo.id).subscribe((data) => {
        this.user = data;
      });
    }
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
  
  SignOut(){
    this.authSv.LogOut();
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined)
      this.router.navigate(['signin']);
  }

}
