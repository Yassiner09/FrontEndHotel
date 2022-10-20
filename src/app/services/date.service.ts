import { Injectable } from '@angular/core';
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(
    private datepipe: DatePipe
  ) { }

  public dateTransform(date: Date){
    return this.datepipe.transform(date,'yyyy-MM-dd')
  }
}
