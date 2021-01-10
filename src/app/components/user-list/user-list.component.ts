import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact/contact.service';
import { UserContact } from 'src/app/interfaces/user-contact';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  // @Input() users: User[];

  token: any;
  tokenInfo: any;
  users: User[];
  contact: UserContact;

  constructor(private userSv: UserService, private contactSv: ContactService) { }

  ngOnInit(): void { 
    this.token = localStorage.getItem("token");
    this.tokenInfo = this.getDecodedAccessToken(this.token); // decode token
    this.GetUsers();
  }

  GetUsers(){
    this.userSv.GetAll().subscribe((data) => {
      this.users = data;
      this.users.forEach(user => {
        if(user.userType == 0 && user.business != null){
          this.userSv.GetById(user.business).subscribe((bUser) => {
            user.business = bUser.name;
          });
        }
      });
    }, (err) => {
      console.log(err);
    });
  }

  addAsContact(contact: User){
    this.contact = {
      contactId: contact.id,
      userId: this.tokenInfo.id,
      scheduledDate: new Date(),
      nickName: "",
      isBlocked: 0,
    }

    this.contactSv.Create(this.contact).subscribe((data) => {
      console.log(data);
    });
  }

  EditUser(){ }

  Delete(id: string){
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
        this.userSv.Delete(id).subscribe((data) => {
          Swal.fire({
            icon: "success",
            title: "Borrado!",
          });
          this.GetUsers();
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
