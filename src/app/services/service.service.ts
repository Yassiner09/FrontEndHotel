import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Room} from "../models/Room";
import {Service} from "../models/Service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private PATH_OF_API = environment.apiPath;
  constructor(
    private httpclient: HttpClient
  ) { }

  public findAllServices(): Observable<Service[]> {
    return this.httpclient.get<Service[]>(this.PATH_OF_API + '/api/service/all');
  }
  public findServiceById(id: number): Observable<Service> {
    return this.httpclient.get<Service>(this.PATH_OF_API + '/api/service/findById/'+id);
  }
  public saveService(service: Service): Observable<Service> {
    return this.httpclient.post<Service>(this.PATH_OF_API + '/api/service/save', service);
  }
  public updateService(service: Service): Observable<Service> {
    return this.httpclient.put<Service>(this.PATH_OF_API + '/api/service/update', service);
  }


  public deleteService(id: number): Observable<void> {
    //java conflit
    return this.httpclient.delete<void>(this.PATH_OF_API + '/api/service/delete/'+id);
  }
}
