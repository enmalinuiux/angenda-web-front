import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact.service';
import jwt_decode from 'jwt-decode';

@Component({
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.scss']
})
export class ContactDataComponent implements OnInit {

  title = 'Contact data';
  contact: Contact;
  tokenInfo: any;
  token: any;

  constructor(private contactSv: ContactService, private route: ActivatedRoute, public router: Router){
    this.token = localStorage.getItem("token");
    this.tokenInfo = this.getDecodedAccessToken(this.token);

    let contactId = this.route.snapshot.paramMap.get('id');
    let userId = this.tokenInfo.id;
    
    this.contactSv.GetById(contactId,userId).subscribe((data) => {
      this.contact = data;
    },(err) => {
      this.router.navigate(['/']);
    });
  }

  ngOnInit(): void {
        
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
