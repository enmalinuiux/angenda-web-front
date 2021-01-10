import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { Auth } from 'src/app/interfaces/auth';
import { AuthResponse } from 'src/app/interfaces/auth-response';
import { BUser } from 'src/app/interfaces/b-user';
import { City } from 'src/app/interfaces/city';
import { Country } from 'src/app/interfaces/country';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  bUsers: BUser[];
  user: User;
  date: string;
  pass: string;
  passToConfirm: string;
  isBusiness: boolean;
  index: number;

  countries: Country[];
  cities: City[] = [];

  constructor(private authService: AuthService, private userSv: UserService, public router: Router) {

    this.date = "";
    this.pass = ""
    this.passToConfirm = "";
    this.isBusiness = false;
    this.bUsers = new Array<BUser>();
    this.index = null;
    
    this.user = {
      name: "",
      lastName: "",
      email: "",
      pass: "",
      business: null,
      birth: null,
      userType: 0,
      addressStreet: "",
      addressCity: "",
      addressCountry: ""
    }

    this.countries = [
      {
        country: "Republica Dominicana",
        cities: [
          {
            city: "Santo Domingo"
          },
          {
            city: "Bonao"
          },
          {
            city: "San Jose de Ocoa"
          },
          {
            city: "Nagua"
          },
          {
            city: "Bani"
          }
        ]
      },
      {
        country: "Colombia",
        cities: [
          {
            city: "Medellin"
          },
          {
            city: "Bogota"
          },
          {
            city: "Cali"
          },
          {
            city: "Barranquilla"
          },
          {
            city: "Cartajena"
          }
        ]
      },
      {
        country: "Venezuela",
        cities: [
          {
            city: "Caracas"
          },
          {
            city: "Maracaibo"
          },
          {
            city: "Maracay"
          },
          {
            city: "Valencia"
          },
          {
            city: "Merida"
          }
        ]
      }
    ]
  }

  ngOnInit(): void {      
    this.getUsersBusiness();
  }

  getUsersBusiness(){
    this.userSv.GetBUsers().subscribe((data)=>{
      this.bUsers = data;
    })
  }

  getBUserId(name: string): string {
    let bU = this.bUsers.find(u => u.name == name);
    return bU.id;
  }

  getCountry() {
    this.cities = this.countries[this.index].cities;
    this.user.addressCountry = this.countries[this.index].country;
  }

  // IsEmailTaked(email: string): boolean{
  //   let getUser: User;

  //   this.userSv.GetAll().subscribe((data) => {
  //     getUser = data.find(u => u.email == email);
  //   });

  //   console.log(getUser);

  //   if (getUser){
  //     return true;
  //   }

  //   return false;
  // }

  SingUp(){
    if(this.passToConfirm == this.pass){
      this.user.pass = this.pass;

      if(this.isBusiness)
        this.user.userType = 1;

      else{
        if(this.user.business != undefined || this.user.business != null)
          this.user.business = this.getBUserId(this.user.business);
      }

      this.user.birth = new Date(this.date);
      
      this.authService.RegisterNewUser(this.user).subscribe((data) => {
        if(data != undefined || data != null){
          
          let auth: Auth = {
            email: this.user.email,
            pass: this.pass
          };

          this.authService.Authenticate(auth).subscribe((data) => {
            let authtResponse: AuthResponse = data;
            let token = authtResponse.token;
      
            if (token){
              console.log(token)
              localStorage.setItem("token", token);
              this.router.navigate(['/']);
            }
          }, (err) => {
            console.log(err);
          });
        }
      }, (err) => {
        console.log("Este email ya fue registrado");
      });
    }
    else
      console.log("Las contraseñas no coinsiden!");
  }
}
