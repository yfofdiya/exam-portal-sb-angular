import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _httpClient: HttpClient) { }

  // Generate Token
  public generateToken(loginData: any) {
    return this._httpClient.post(`${baseUrl}/generate-token`, loginData);
  }

  // Get Current Logged In User Details
  public getCurrentUserDetails() {
    return this._httpClient.get(`${baseUrl}/current-user`);
  }


  // Store token to Local Storage
  public storeToken(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  // Check user is logged in or not
  public isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token == '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  // Get token from Local Storage
  public getToken() {
    return localStorage.getItem('token');
  }

  // Set user details to local Storage
  public storeUserDetails(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Get User Details from Local Storage
  public getUserDetails() {
    let user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    } else {
      this.logout();
      return null;
    }
  }

  // Logout
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // Get User Athorities
  public getUserRole() {
    let user = this.getUserDetails();
    if (user == null) {
      return;
    }
    return user.authorities[0].authority;
  }
}
