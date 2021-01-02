import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../interfaces/auth';
import { AuthResponse } from '../interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string;
  url: string;

  constructor(private httpClient: HttpClient) {
    this.endpoint = "user/authenticate";
    this.url = environment.API_URL;
  }

  Authenticate(auth: Auth): Observable<AuthResponse>{
    const HEADERS = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<AuthResponse>(`${this.url}/${this.endpoint}`, auth, { headers: HEADERS})
  }
}
