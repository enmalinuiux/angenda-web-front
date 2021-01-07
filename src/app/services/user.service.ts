import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorResponse } from '../interfaces/error-response';
import { BUser } from '../interfaces/b-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint: string;
  url: string;
  token: string;
  errorResponse: ErrorResponse;
  HEADERS: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.endpoint = "user";
    this.url = environment.API_URL;
    this.token = localStorage.getItem("token");
    this.HEADERS = new HttpHeaders({'Content-Type': 'application/json'}).set("Authorization", `Bearer ${this.token}`);
  }  

  GetAll(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.url}/${this.endpoint}`, { headers: this.HEADERS }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  GetBUsers(): Observable<BUser[]>{
    return this.httpClient.get<BUser[]>(`${this.url}/${this.endpoint}/business-users`, { headers: this.HEADERS }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  GetById(id: string): Observable<User>{
    return this.httpClient.get<User>(`${this.url}/${this.endpoint}/${id}`, { headers: this.HEADERS }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  Put(user: User){
    return this.httpClient.put(`${this.url}/${this.endpoint}/${user.id}`, user, { headers: this.HEADERS }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  Delete(id: string) {
    return this.httpClient.delete(`${this.url}/${this.endpoint}/${id}`, { headers: this.HEADERS }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    this.errorResponse = {
      status: error.status,
      message: error.error.message
    }
    window.alert(this.errorResponse.message);
    return throwError(error);
  }
}
