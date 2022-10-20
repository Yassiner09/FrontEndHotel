import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from "../models/Client";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private PATH_OF_API = environment.apiPath;
  constructor(
    private httpclient: HttpClient,
  ) {}
  public findAllClients(): Observable<Client[]> {
    return this.httpclient.get<Client[]>(this.PATH_OF_API + '/api/client/all');
  }
  public addClient(client: Client): Observable<Client> {
    return this.httpclient.post<Client>(this.PATH_OF_API + '/api/client/save', client);
  }
  public updateClient(client: Client): Observable<Client> {
    return this.httpclient.put<Client>(this.PATH_OF_API + '/api/client/update', client);
  }

  public deleteClient(client: Client): Observable<void> {
    return this.httpclient.delete<void>(this.PATH_OF_API + '/api/client/delete/' + client.idClt);
  }

}
