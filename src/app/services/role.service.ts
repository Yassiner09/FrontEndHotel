import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Type} from "../models/Type";
import {Role} from "../models/Role";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private PATH_OF_API = environment.apiPath;
  constructor(
    private httpClient:HttpClient
  ) { }
  public findAllRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.PATH_OF_API + '/api/role/all');
  }

  public addRole(role: Role): Observable<Role>{
    return this.httpClient.post<Role>(this.PATH_OF_API + '/api/role/add', role);
  }

  public updateRole(type: Type): Observable<Type>{
    return this.httpClient.put<Type>(this.PATH_OF_API + '/api/role/update', type);
  }

  public deleteRole(idType: number): Observable<void>{
    return this.httpClient.delete<void>(this.PATH_OF_API + '/api/role/delete/' + idType);
  }
}
