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
    this.userSv.GetAll().subscribe((data) => {
      this.users = data;
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: this.users[0].id
      })
      console.log(data)
    }, (err) => {
      console.log(err)
    })
  }
}
