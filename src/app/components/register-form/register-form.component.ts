import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Output() userRegistered = new EventEmitter<User>();

  user: User;
  date: string;

  constructor(private authService: AuthService) {

    this.date = ""
    
    this.user = {
      name: "",
      lastName: "",
      pass: "",
      email: "",
      business: "",
      birth: new Date(this.date),
      userType: 0,
      addressStreet: "",
      addressCity: "",
      addressCountry: ""
    }
  }

  ngOnInit(): void {
  }

  SingUp(){
    this.authService.RegisterNewUser(this.user).subscribe((data) => {
      this.userRegistered.emit(data);
    }, (err) => {
      console.log(err);
    });
  }
}
