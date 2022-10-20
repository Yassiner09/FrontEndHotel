import { Injectable } from '@angular/core';
import {Role} from "../models/Role";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private cookieService : CookieService) {}

  public setRoles(roles: Role[]) {
    localStorage.setItem('roles', JSON.stringify(roles));
    //this.cookieService.set('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    // @ts-ignore
    //return JSON.parse(this.cookieService.get('roles'));
    return JSON.parse(localStorage.getItem('roles'));
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
    //this.cookieService.set('jwtToken', jwtToken);
  }

  public getToken(): string {
    // @ts-ignore
    return localStorage.getItem('jwtToken');
    //return this.cookieService.get('jwtToken');
  }

  public setUsername(username: string) {
    localStorage.setItem('username', username);
    //this.cookieService.set('username', username);
  }

  public getUsername(): string {
    // @ts-ignore
    return localStorage.getItem('username');
    //return this.cookieService.get('username');
  }

  public clear() {
    localStorage.clear();
    //this.cookieService.deleteAll();
  }

  public isLoggedIn(): Boolean {
    return (this.getRoles() && this.getToken())!=null;
  }
}
