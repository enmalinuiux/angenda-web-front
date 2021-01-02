import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  END_POINT: string = "user";
  url = environment.API_URL;

  GetAll(): Observable<User[]>{
    const Headers = new HttpHeaders({'Content-Type': 'application/json'}).set("Authorization", "Bearer " + localStorage.getItem("token"));
    return this.httpClient.get<User[]>(`${this.url}/${this.END_POINT}`, { headers: Headers})
  }

  GetById(id): Observable<User>{
    const Headers = new HttpHeaders({'Content-Type': 'application/json'}).set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlZWFiNzEyLWEwZDItNGM3Mi05YzVhLWMzZDM3NTFlODhkOSIsIm5iZiI6MTYwOTQ3NTk2OSwiZXhwIjoxNjEwMDgwNzY4LCJpYXQiOjE2MDk0NzU5Njl9.CRsWC7ccsMP3QtaM-PfUm_EYRPDdCuebXctstiEgb-Q");
    return this.httpClient.get<User>(`${this.url}/${this.END_POINT}/${id}`, { headers: Headers})
  }

  Post(user: User): Observable<User>{
    const Headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<User>(`${this.url}/${this.END_POINT}`, user, { headers: Headers})
  }

  Put(user: User): Observable<User>{
    const Headers = new HttpHeaders({'Content-Type': 'application/json'}).set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlZWFiNzEyLWEwZDItNGM3Mi05YzVhLWMzZDM3NTFlODhkOSIsIm5iZiI6MTYwOTQ3NTk2OSwiZXhwIjoxNjEwMDgwNzY4LCJpYXQiOjE2MDk0NzU5Njl9.CRsWC7ccsMP3QtaM-PfUm_EYRPDdCuebXctstiEgb-Q");
    return this.httpClient.put<User>(`${this.url}/${this.END_POINT}/${user.id}`, user, { headers: Headers})
  }

  Delete(id): Observable<User>{
    const Headers = new HttpHeaders({'Content-Type': 'application/json'}).set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlZWFiNzEyLWEwZDItNGM3Mi05YzVhLWMzZDM3NTFlODhkOSIsIm5iZiI6MTYwOTQ3NTk2OSwiZXhwIjoxNjEwMDgwNzY4LCJpYXQiOjE2MDk0NzU5Njl9.CRsWC7ccsMP3QtaM-PfUm_EYRPDdCuebXctstiEgb-Q");
    return this.httpClient.delete<User>(`${this.url}/${this.END_POINT}/${id}`, { headers: Headers})
  }
}
