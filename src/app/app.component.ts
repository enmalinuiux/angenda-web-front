import { Component, OnInit } from '@angular/core';
import { User } from './interfaces/user';
import { ContactService } from './services/contact.service';
import jwt_decode from 'jwt-decode';
import { Contact } from './interfaces/contact';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angenda v0.0.1';

  user: User;
  contacts: Contact[];
  tokenInfo: any;
  token: any;

  constructor(private contactSv: ContactService, private userSv: UserService, private authSv: AuthService){
    this.token = localStorage.getItem("token");
    this.tokenInfo = this.getDecodedAccessToken(this.token); // decode token
    console.log(this.tokenInfo); // show decoded token object in console
  }

  ngOnInit(){
    if (this.tokenInfo != null || this.tokenInfo != undefined){
      this.contactSv.GetAllContacts(this.tokenInfo.id).subscribe((data) => {
        this.contacts = data;
      });

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
