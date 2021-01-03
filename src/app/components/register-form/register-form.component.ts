import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { promise } from 'protractor';
import { Auth } from 'src/app/interfaces/auth';
import { AuthResponse } from 'src/app/interfaces/auth-response';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  // @Output() userRegistered = new EventEmitter<User>();

  bUsers: User[];
  user: User;
  date: string;
  passToConfirm: string;
  isBusiness: boolean;

  constructor(private authService: AuthService, private userSv: UserService) {

    this.date = ""
    this.passToConfirm = ""
    this.isBusiness = false;
    this.bUsers = new Array<User>();
    
    this.user = {
      name: "",
      lastName: "",
      pass: "",
      email: "",
      business: null,
      birth: new Date("0000-00-00"),
      userType: 0,
      addressStreet: "",
      addressCity: "",
      addressCountry: ""
    }
  }

  ngOnInit(): void {
    

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })
      
    this.getUsersBusiness();
  }

  getUsersBusiness(){
    this.userSv.GetAll().subscribe((data)=>{
      data.forEach(user => {
        if(user.userType == 1) this.bUsers.push(user);
      });
    })
  }

  getBUserId(name: string): string {
    let bU = this.bUsers.find(u => u.name == name);
    return bU.id;
  }

  async IsEmailTaked(email: string): Promise<boolean>{
    let getUser: User;

    await this.userSv.GetAll().subscribe((data) => {
      getUser = data.find(u => u.email == email);
    });

    console.log(getUser);

    if (getUser){
      return true;
    }

    return false;
  }

  SingUp(){
    if(this.passToConfirm == this.user.pass){
      if(this.isBusiness)
        this.user.userType = 1;
      else{
        if(this.user.business != null)
          this.user.business = this.getBUserId(this.user.business);
      }

      this.user.birth = new Date(this.date);

      console.log(this.user.business);
      
      if (this.IsEmailTaked(this.user.email)){
        this.authService.RegisterNewUser(this.user).subscribe((data) => {
          if(data != undefined){
            let auth: Auth = {
              email: this.user.email,
              pass: this.user.pass
            };
            this.authService.Authenticate(auth).subscribe((data) => {
              let authtResponse: AuthResponse = data;
              let token = authtResponse.token;
        
              if (token){
                console.log(token)
                localStorage.setItem("token", token);
              }
            }, (err) => {
              console.log(err);
            });
          }
        }, (err) => {
          console.log(err);
        });
      }
      else 
      {
        console.log("Este usuario esta tomado");
      }
    }
    else
      console.log("Las contraseñas no coinsiden!");
  }
}
