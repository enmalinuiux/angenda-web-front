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
    // this.user = {
    //   id: "26b28326-cca7-449b-b0b6-003f1c043ef9",
    //   name: 'Yo2',
    //   lastName: "Medrano Mendez",
    //   pass: "Aguacate",
    //   email: "alexmm011@gmail.com",
    //   business: null,
    //   birth: new Date("2021-01-01"),
    //   userType: 0,
    //   addressStreet: "Calle Duverge #84",
    //   addressCity: "San Jose de Ocoa",
    //   addressCountry: "Republica Dominicana"
    // }
  }

  ngOnInit(){
    this.GetUsers();
  }

  GetUsers(){
    this.userSv.GetAll().subscribe((data) => {
      this.users = data;
    }, (err) => {
      console.log(err);
    })
  }

  AddUser(){ }

  EditUser(){ }

  Delete(id){
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
