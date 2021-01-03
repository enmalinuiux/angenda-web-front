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

  // users: User[];

  constructor(private userSv: UserService){
  }

  ngOnInit(){
    //localStorage.setItem("token", undefined);
  }

  // addItem(newUser: User){
  //   this.users.push(newUser);
  // }
}
