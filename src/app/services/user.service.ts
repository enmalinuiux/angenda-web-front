import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint: string;
  url: string;
  token: string;

  constructor(private httpClient: HttpClient) {
    this.endpoint = "user";
    this.url = environment.API_URL;
    this.token = localStorage.getItem("token");
  }  

  GetAll(): Observable<User[]>{
    const HEADERS = new HttpHeaders({'Content-Type': 'application/json'}).set("Authorization", `Bearer ${this.token}`);
    return this.httpClient.get<User[]>(`${this.url}/${this.endpoint}`, { headers: HEADERS})
  }

  GetById(id: string): Observable<User>{
    const HEADERS = new HttpHeaders({'Content-Type': 'application/json'}).set("Authorization", `Bearer ${this.token}`);
    return this.httpClient.get<User>(`${this.url}/${this.endpoint}/${id}`, { headers: HEADERS})
  }

  Post(user: User): Observable<User>{
    const HEADERS = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<User>(`${this.url}/${this.endpoint}`, user, { headers: HEADERS})
  }

  Put(user: User): Observable<User>{
    const HEADERS = new HttpHeaders({'Content-Type': 'application/json'}).set("Authorization", `Bearer ${this.token}`);
    return this.httpClient.put<User>(`${this.url}/${this.endpoint}/${user.id}`, user, { headers: HEADERS})
  }

  Delete(id: string): Observable<User>{
    const HEADERS = new HttpHeaders({'Content-Type': 'application/json'}).set("Authorization", `Bearer ${this.token}`);
    return this.httpClient.delete<User>(`${this.url}/${this.endpoint}/${id}`, { headers: HEADERS})
  }
}
