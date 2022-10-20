import {Type} from './Type';

export interface Room{
  roomId:number,
  num:number,
  floors:number,
  availability:boolean,
  price:number,
  types:Type,
  phoneNumber:string
}
