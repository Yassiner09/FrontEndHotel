import {Time} from '@angular/common';
import {Client} from './Client';
import {Room} from './Room';
import {Service} from './Service';
import {Facture} from './Facture';
import {User} from './User';

export interface Reservation{
  idRes:number,
  date:Date,
  time:Time,
  duree:number,
  client:Client,
  room:Room,
  services:Service[],
  facture:Facture,
  user:User
}
