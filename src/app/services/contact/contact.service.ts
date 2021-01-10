import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorResponse } from '../../interfaces/error-response';
import { Contact } from '../../interfaces/contact';
import { Router } from '@angular/router';
import { UserContact } from 'src/app/interfaces/user-contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  endpoint: string;
  url: string;
  token: string;
  errorResponse: ErrorResponse;
  HEADERS: HttpHeaders;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.endpoint = "contact";
    this.url = environment.API_URL;
    this.token = localStorage.getItem("token");
    this.HEADERS = new HttpHeaders({'Content-Type': 'application/json'}).set("Authorization", `Bearer ${this.token}`);
  }  

  GetAllContacts(id: string): Observable<Contact[]>{
    return this.httpClient.get<Contact[]>(`${this.url}/${this.endpoint}/${id}`, { headers: this.HEADERS }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  GetById(contactId: string, userId: string): Observable<Contact>{
    return this.httpClient.get<Contact>(`${this.url}/${this.endpoint}/${userId}/${contactId}`, { headers: this.HEADERS }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  Create(contact: UserContact): Observable<Contact>{
    return this.httpClient.post<Contact>(`${this.url}/${this.endpoint}`, contact, { headers: this.HEADERS }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  Update(contact: UserContact): Observable<Contact>{
    return this.httpClient.put<Contact>(`${this.url}/${this.endpoint}/${contact.userId}/${contact.contactId},`, contact, { headers: this.HEADERS }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  Delete(contactId: string, userId: string): Observable<Contact>{
    return this.httpClient.delete<Contact>(`${this.url}/${this.endpoint}/${userId}/${contactId}`, { headers: this.HEADERS }).pipe(
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