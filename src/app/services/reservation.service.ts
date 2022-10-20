import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reservation} from "../models/Reservation";
import {ReservationDTO} from "../models/reservationDTO";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private PATH_OF_API = environment.apiPath;
  constructor(
    private httpClient:HttpClient
  ) { }
  public findAllReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(this.PATH_OF_API + '/api/reservation/all');
  }

  public addReservation(reservation: Reservation): Observable<Reservation>{
    return this.httpClient.post<Reservation>(this.PATH_OF_API + '/api/reservation/add', reservation);
  }

  public updateReservation(reservation: ReservationDTO): Observable<any>{
    return this.httpClient.put<any>(this.PATH_OF_API + '/api/reservation/update/' + reservation.idRes+'/'+reservation.room.roomId+'/'+reservation.date+'/'+reservation.time+'/'+reservation.duree,null);
  }

  public deleteReservation(idRes: number): Observable<void>{
    return this.httpClient.delete<void>(this.PATH_OF_API + '/api/reservation/delete/' + idRes);
  }

  public addServiceToReservation(idRes:number,idService:number): Observable<void>{
    return this.httpClient.put<void>(this.PATH_OF_API + '/api/reservation/' + idRes+'/service/'+idService,null);
  }
}
