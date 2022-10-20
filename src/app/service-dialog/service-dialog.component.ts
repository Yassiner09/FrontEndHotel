import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {ServiceService} from "../services/service.service";
import {Service} from "../models/Service";

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.css']
})
export class ServiceDialogComponent implements OnInit {

  public champ='Ajouter';
  public serviceForm!: FormGroup;
  public services!: Service[];

  constructor(
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogReference: MatDialogRef<ServiceDialogComponent>,
    private serviceService: ServiceService,
  ) {}

  ngOnInit(): void {
    this.findAllServices();
    this.serviceForm=this.formBuilder.group({
        idService: ['', Validators.required],
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
      }

    );
    //console.log(this.editData);
    if(this.editData){
      this.champ = 'Modifier'
      this.serviceForm.controls['idService'].setValue(this.editData.idService)
      this.serviceForm.controls['name'].setValue(this.editData.name)
      this.serviceForm.controls['description'].setValue(this.editData.description)
      this.serviceForm.controls['price'].setValue(this.editData.price)
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


  public addOrUpdateService() {
    if(this.editData){
      if(this.serviceForm.valid){
        this.serviceService.updateService(this.serviceForm.value).subscribe(
          (response: any) => {
            //alert('service modifié avec succès !');
            this.dialogReference.close('updated');
            //this.findAllServices();
            //window.location.reload();
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
          }
        );
      }
    }
    else {
        this.serviceService.saveService(this.serviceForm.value).subscribe(
          (response: any) => {
            //alert('service ajouté avec succès !');
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
