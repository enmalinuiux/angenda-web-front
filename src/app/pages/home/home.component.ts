import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Angenda v0.0.1';
  user: User;
  tokenInfo: any;
  token: any;

  constructor(private userSv: UserService, private authSv: AuthService){
    this.token = localStorage.getItem("token");
    this.tokenInfo = this.getDecodedAccessToken(this.token); // decode token
    console.log(this.tokenInfo); // show decoded token object in console
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
  }

}
