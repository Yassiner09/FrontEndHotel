import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private PATH_OF_API = environment.apiPath;

  private requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  // @ts-ignore
  public login(loginData) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/api/user/forUser', {
      responseType: 'text',
    });
  }



  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/api/user/forAdmin', {
      responseType: 'text',
    });
  }

  public findByUsername(username: string):Observable<User> {
    return this.httpclient.get<User>(this.PATH_OF_API + '/api/user/findByUsername/' + username);
  }
  public changePassword(username:string,password: string,newPassword:string): Observable<void> {
    return this.httpclient.post<void>(this.PATH_OF_API + '/api/user/' +username+ '/changePassword/' +password +'/'+ newPassword,null);
  }

  // @ts-ignore
  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].name === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }

  public isAdmin(): Boolean {
    if(this.roleMatch(['Admin'])){
      return true;
    }
    return false;
  }

  public isUser() {
    if(this.roleMatch(['User'])){
      return true;
    }
    return false;
  }
}
