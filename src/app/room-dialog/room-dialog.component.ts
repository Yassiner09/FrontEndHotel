import { Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Room} from "../models/Room";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoomService} from "../services/room.service";
import {HttpErrorResponse} from "@angular/common/http";
import {TypeService} from "../services/type.service";
import {Type} from "../models/Type";


@Component({
  selector: 'app-room-dialog',
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.css']
})
export class RoomDialogComponent implements OnInit {
  public champ='Ajouter';
  public types!: Type[];
  public roomForm!: FormGroup;
  public rooms!: Room[];
  public checked=false;

  constructor(
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogReference: MatDialogRef<RoomDialogComponent>,
    private roomService: RoomService,
    private typeService: TypeService,
  ) {}

  ngOnInit(): void {
    this.findAllTypes();
    this.findAllRooms();
    this.roomForm=this.formBuilder.group({
        roomId: ['', Validators.required],
        num: ['', Validators.required],
        floors: ['', Validators.required],
        price: ['', Validators.required],
        availability: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        types: ['', Validators.required]
      }
    );
    if(this.editData){
      this.champ = 'Modifier'
      this.roomForm.controls['roomId'].setValue(this.editData.roomId)
      this.roomForm.controls['num'].setValue(this.editData.num)
      this.roomForm.controls['floors'].setValue(this.editData.floors)
      this.roomForm.controls['price'].setValue(this.editData.price)
      this.roomForm.controls['availability'].setValue(this.editData.availability)
      this.roomForm.controls['phoneNumber'].setValue(this.editData.phoneNumber)
      this.roomForm.controls['types'].setValue(this.editData.types)
    }
  }



  public findAllRooms(): void{
    this.roomService.findAllRooms().subscribe(
      (response: Room[]) => {
        this.rooms = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public findAllTypes(): void{
    this.typeService.findAllTypes().subscribe(
      (response: Type[]) => {
        this.types = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public addOrUpdateRoom() {
    if(this.editData){
      if(this.roomForm.valid){
        this.roomService.updateRoom(this.roomForm.value).subscribe(
          (response: any) => {
            //alert('chambre modifiée avec succès !');
            this.dialogReference.close('updated');
            //this.findAllRooms();
            //window.location.reload();
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
          }
        );
      }
    }
    else{
      console.log(this.roomForm.value);
      this.roomService.saveRoom(this.roomForm.value).subscribe(
        (response: any) => {
          //alert('chambre ajoutée avec succès !');
          this.dialogReference.close('added');
          //this.findAllRooms();
          //window.location.reload();
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
    }

  }
  public closeDialog(){
    this.dialogReference.close('closed')
  }


}
