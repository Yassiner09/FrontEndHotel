import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoomService} from "../services/room.service";
import {Room} from "../models/Room";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {ReservationService} from "../services/reservation.service";
import {Reservation} from "../models/Reservation";
import {DatePipe} from "@angular/common";
import {DateService} from "../services/date.service";

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.css']
})
export class ReservationDialogComponent implements OnInit {
  public btnAndHeader='Ajouter';
  public reservationForm!: FormGroup;
  public reservations!: Reservation[];
  public roomsAvailable!: Room[];
  constructor(
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogReference: MatDialogRef<ReservationDialogComponent>,
    private reservationService: ReservationService,
    private roomService: RoomService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.findAllAvailableRooms();
    this.findAllReservations();
    this.reservationForm=this.formBuilder.group({
        idRes: ['', Validators.required],
        date: ['', Validators.required],
        time: ['', Validators.required],
        duree: ['', Validators.required],
        room: ['', Validators.required]
      }
    )
    if(this.editData){
      this.btnAndHeader='Modifier'
      this.reservationForm.controls['idRes'].setValue(this.editData.idRes)
      this.reservationForm.controls['date'].setValue(this.editData.date)
      this.reservationForm.controls['time'].setValue(this.editData.time)
      this.reservationForm.controls['duree'].setValue(this.editData.duree)
      this.reservationForm.controls['room'].setValue(this.editData.room)
    }
  }



  public findAllAvailableRooms(): void{
    this.roomService.findRoomByAvailability(true).subscribe(
      (response: Room[]) => {
        this.roomsAvailable = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public findAllReservations(): void{
    this.reservationService.findAllReservations().subscribe(
      (response: Reservation[]) => {
        this.reservations = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public addOrUpdateReservation() {
    if (this.editData) {
      if (this.reservationForm.valid) {
        this.reservationForm.value.date=this.dateService.dateTransform(this.reservationForm.value.date)
        var heure = this.reservationForm.value.time.toString()
        this.reservationForm.value.time=heure.substring(0,5)
        this.reservationService.updateReservation(this.reservationForm.value).subscribe(
          (response: any) => {
            //alert('réservation modifiée avec succès !');
            this.findAllReservations();
            this.dialogReference.close('updated');
            //this.findAllReservations();
            //window.location.reload();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    }
    else{
      this.reservationService.addReservation(this.reservationForm.value).subscribe(
        (response: any) => {
          alert('réservation ajoutée avec succès !');
          this.findAllReservations();
          this.dialogReference.close('added');
          //window.location.reload()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public closeDialog(){
    this.dialogReference.close('closed')
  }

}
