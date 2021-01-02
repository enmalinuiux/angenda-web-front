import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Output() userRegistered = new EventEmitter<User>();

  bUsers: User[];
  user: User;
  date: string;
  passToConfirm: string;
  isBusiness: boolean;

  constructor(private authService: AuthService, private userSv: UserService) {

    this.date = ""
    this.passToConfirm = ""
    this.isBusiness = false;
    this.bUsers = [];
    
    this.user = {
      name: "",
      lastName: "",
      pass: "",
      email: "",
      business: "",
      birth: new Date("0000-00-00"),
      userType: 0,
      addressStreet: "",
      addressCity: "",
      addressCountry: ""
    }
  }

  ngOnInit(): void {
    this.getUsersBusiness();
  }

  getUsersBusiness(){
    this.userSv.GetAll().subscribe((data)=>{
      data.forEach(user => {
        if(user.userType == 1) this.bUsers.push(user);
      });
    })
  }

  getBUserId(name: string):string {
    let bU = this.bUsers.find(u => u.name == name);
    return bU.id;
  }

  SingUp(){
    if(this.passToConfirm == this.user.pass){
      if(this.isBusiness)
        this.user.userType = 1;

      this.user.birth = new Date(this.date);

      console.log(this.user.business);

      this.user.business = this.getBUserId(this.user.business);
      
      this.authService.RegisterNewUser(this.user).subscribe((data) => {
        this.userRegistered.emit(data);
      }, (err) => {
        console.log(err);
      });
    }
    else
      console.log("Las contraseñas no coinsiden!");
  }
}
