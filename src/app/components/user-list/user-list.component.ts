import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  // @Input() users: User[];

  users: User[];

  constructor(private userSv: UserService) { }

  ngOnInit(): void { 
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

  AddUser(){ }

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
        console.log(localStorage.getItem("token"))
        this.userSv.Delete(id).subscribe((data) => {
          Swal.fire({
            icon: "success",
            title: "Borrado!",
          });
          this.userSv.GetAll().subscribe((data) => {
            this.users = data;
          });
        }, (err) => {
          console.log(err);
        });
      }
    });
  }

}
