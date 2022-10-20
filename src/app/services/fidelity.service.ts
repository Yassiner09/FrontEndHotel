import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../models/Client";
import {Fidelity} from "../models/Fidelity";

@Injectable({
  providedIn: 'root'
})
export class FidelityService {

  private PATH_OF_API = environment.apiPath;
  constructor(
    private httpclient: HttpClient,
  ) {}
  public findAllfidelities(): Observable<Fidelity[]> {
    return this.httpclient.get<Fidelity[]>(this.PATH_OF_API + '/api/fidelity/all');
  }

}
