import { Component, OnInit } from '@angular/core';
import { User } from './interfaces/user';
import { ContactService } from './services/contact.service';
import jwt_decode from 'jwt-decode';
import { Contact } from './interfaces/contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'agenda-web-front';

  contacts: Contact[];
  tokenInfo: any;
  token: any;

  constructor(private contactSv: ContactService){
    this.token = localStorage.getItem("token");
    this.tokenInfo = this.getDecodedAccessToken(this.token); // decode token
    console.log(this.tokenInfo); // show decoded token object in console
  }

  ngOnInit(){
    this.contactSv.GetAllContacts(this.tokenInfo.id).subscribe(data => {
      this.contacts = data;
    })
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
}
