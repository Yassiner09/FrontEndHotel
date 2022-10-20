import {Time} from "@angular/common";
import {Room} from "./Room";

export interface ReservationDTO{
  idRes: number,
  room: Room,
  date: Date,
  time: Time,
  duree: number
}
