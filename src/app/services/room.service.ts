import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../models/Client";
import {Room} from "../models/Room";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private PATH_OF_API = environment.apiPath;
  constructor(
    private httpclient: HttpClient
  ) { }

  public findAllRooms(): Observable<Room[]> {
    return this.httpclient.get<Room[]>(this.PATH_OF_API + '/api/room/all');
  }
  public findRoomById(id: number): Observable<Room> {
    return this.httpclient.get<Room>(this.PATH_OF_API + '/api/room/findById/'+id);
  }
  public saveRoom(room: Room): Observable<Room> {
    return this.httpclient.post<Room>(this.PATH_OF_API + '/api/room/save', room);
  }
  public updateRoom(room: Room): Observable<Room> {
    return this.httpclient.put<Room>(this.PATH_OF_API + '/api/room/update', room);
  }

  public findRoomByAvailability(availability: Boolean): Observable<Room[]> {
    //java conflit
    return this.httpclient.get<Room[]>(this.PATH_OF_API + '/api/room/findByAvailability/'+availability);
  }
  public deleteRoom(id: number): Observable<void> {
    //java conflit
    return this.httpclient.delete<void>(this.PATH_OF_API + '/api/room/delete/'+id);
  }

}
