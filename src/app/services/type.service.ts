import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Type} from "../models/Type";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private PATH_OF_API = environment.apiPath;
  constructor(
    private httpClient:HttpClient
  ) { }
  public findAllTypes(): Observable<Type[]> {
    return this.httpClient.get<Type[]>(this.PATH_OF_API + '/api/type/all');
  }

  public addType(type: Type): Observable<Type>{
    return this.httpClient.post<Type>(this.PATH_OF_API + '/api/type/add', type);
  }

  public updateType(type: Type): Observable<Type>{
    return this.httpClient.put<Type>(this.PATH_OF_API + '/api/type/update', type);
  }

  public deleteType(idType: number): Observable<void>{
    return this.httpClient.delete<void>(this.PATH_OF_API + '/api/type/delete/' + idType);
  }

}
