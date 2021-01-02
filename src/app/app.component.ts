import { Component, OnInit } from '@angular/core';
import { User } from './interfaces/user';
import { UserService } from './services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'agenda-web-front';

  users: User[];

  constructor(private userSv: UserService){
  }

  ngOnInit(){
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

  addItem(newUser: User){
    this.users.push(newUser);
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
        this.userSv.Delete(id).subscribe(() => {
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
}
