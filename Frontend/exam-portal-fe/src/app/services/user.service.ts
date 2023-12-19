import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) { }

  // Add | Create | Register User
  public addUser(user: any) 
  {
    return this._httpClient.post(`${baseUrl}/api/users`, user);
  }
}
