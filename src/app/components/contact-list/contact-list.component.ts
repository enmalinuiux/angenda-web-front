import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact/contact.service';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];
  tokenInfo: any;
  token: any;

  constructor(private contactSv: ContactService, private router: Router) { 
    this.token = localStorage.getItem("token");
    this.tokenInfo = this.getDecodedAccessToken(this.token); // decode token
    this.contacts = [];
  }

  ngOnInit(): void {
    if (this.tokenInfo != null || this.tokenInfo != undefined){
      this.contactSv.GetAllContacts(this.tokenInfo.id).subscribe((data) => {
        this.contacts = data;
      });
    }
  }

  GoTo(id: string)
  {
    this.router.navigate([`/contact/${id}`]);
  }

  Delete(contactId: string){
    Swal.fire({
      icon: "warning",
      title: "Estas seguro?!",
      text: "Se elimira para siempre!",
      showCancelButton: true,
      confirmButtonText: 'Si, borralo',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if(result.isConfirmed){
        this.contactSv.Delete(contactId, this.tokenInfo.id).subscribe((data) => {
          Swal.fire({
            icon: "success",
            title: "Borrado!",
          });
        }, (err) => {
          console.log(err);
        });
      }
    });
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
