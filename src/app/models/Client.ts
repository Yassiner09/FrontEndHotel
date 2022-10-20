import {Fidelity} from './Fidelity';

export interface Client{
  idClt:number,
  firstName:string,
  lastName:string,
  cin:string,
  nationality:string,
  cardNumber:string,
  fidelity:Fidelity
}
