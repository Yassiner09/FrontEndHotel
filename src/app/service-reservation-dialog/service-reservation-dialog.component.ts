import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Service} from "../models/Service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ServiceService} from "../services/service.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ReservationService} from "../services/reservation.service";

@Component({
  selector: 'app-service-reservation-dialog',
  templateUrl: './service-reservation-dialog.component.html',
  styleUrls: ['./service-reservation-dialog.component.css']
})
export class ServiceReservationDialogComponent implements OnInit {

  public champ='Ajouter';
  public serviceForm!: FormGroup;
  public services!: Service[];

  constructor(
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogReference: MatDialogRef<ServiceReservationDialogComponent>,
    private serviceService: ServiceService,
    private reservationService: ReservationService,
  ) {}

  ngOnInit(): void {
    this.findAllServices();
    this.serviceForm=this.formBuilder.group({
        idRes: ['', Validators.required],
        service: ['', Validators.required],
      }
    );
    console.log(this.editData);
    if(this.editData){
      this.serviceForm.controls['idRes'].setValue(this.editData.idRes)
      this.serviceForm.controls['service'].setValue(this.editData.service)
    }
  }



  public findAllServices(): void{
    this.serviceService.findAllServices().subscribe(
      (response: Service[]) => {
        this.services = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public addServiceToReservation() {
    if(this.editData){
      if(this.serviceForm.valid){
        this.reservationService.addServiceToReservation(this.serviceForm.value.idRes,this.serviceForm.value.service).subscribe(
          (response: any) => {
            console.log('service ajouté à la reservation avec succès !');
            this.dialogReference.close('updated');
            //this.findAllServices();
            //window.location.reload();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    }

  }
  public closeDialog(){
    this.dialogReference.close('closed')
  }

}
