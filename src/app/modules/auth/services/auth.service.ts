import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = environment.apiUrl + "Account/" 

  constructor(private http: HttpClient, private router:Router) { }
 

  // Sign-in
  signIn(user: object) { 
    return this.http
      .post<any>(`${this.URL}login`, user) 
  }

  getToken() {
    return localStorage.getItem('currentUser');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('currentUser');
    return authToken !== null ? true : false;
  }

  doLogout() {
    Object.keys(localStorage).forEach(function (key) {
      localStorage.removeItem(key);
    })
    this.router.navigate(['/', 'auth'])
  }

}
