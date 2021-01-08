import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];
  tokenInfo: any;
  token: any;

  constructor(private contactSv: ContactService) { 
    this.token = localStorage.getItem("token");
    this.tokenInfo = this.getDecodedAccessToken(this.token); // decode token
    console.log(this.tokenInfo); // show decoded token object in console
  }

  ngOnInit(): void {
    if (this.tokenInfo != null || this.tokenInfo != undefined){
      this.contactSv.GetAllContacts(this.tokenInfo.id).subscribe((data) => {
        this.contacts = data;
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

}
