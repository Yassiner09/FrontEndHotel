import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {Client} from "../models/Client";
import {ClientService} from "../services/client.service";
import {FidelityService} from "../services/fidelity.service";
import {Fidelity} from "../models/Fidelity";

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.css']
})
export class ClientDialogComponent implements OnInit {
  public champ='Ajouter';
  public clientForm!: FormGroup;
  public clients!: Client[];
  public fidelities!: Fidelity[];

  constructor(
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogReference: MatDialogRef<ClientDialogComponent>,
    private clientService: ClientService,
    private fidelityService: FidelityService,
  ) { }

  ngOnInit(): void {
    this.findAllClients();
    this.findAllFidelities();
    this.clientForm=this.formBuilder.group({
        idClt: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        cin: ['', Validators.required],
        nationality: ['', Validators.required],
        cardNumber: ['', Validators.required],
        fidelity: ['', Validators.required],
      }
    );
    console.log(this.editData);
    if(this.editData){
      this.champ='Modifier';
      this.clientForm.controls['idClt'].setValue(this.editData.idClt)
      this.clientForm.controls['firstName'].setValue(this.editData.firstName)
      this.clientForm.controls['lastName'].setValue(this.editData.lastName)
      this.clientForm.controls['cin'].setValue(this.editData.cin)
      this.clientForm.controls['nationality'].setValue(this.editData.nationality)
      this.clientForm.controls['cardNumber'].setValue(this.editData.cardNumber)
      this.clientForm.controls['fidelity'].setValue(this.editData.fidelity)
    }
  }



  public findAllClients(): void{
    this.clientService.findAllClients().subscribe(
      (response: Client[]) => {
        this.clients = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public findAllFidelities(): void{
    this.fidelityService.findAllfidelities().subscribe(
      (response: any) => {
        this.fidelities = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public addOrUpdateClient() {
    if(this.editData){
      if(this.clientForm.valid){
        this.clientService.updateClient(this.clientForm.value).subscribe(
          (response: any) => {
            //alert('client modifiée avec succès !');
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
       console.log(this.clientForm.value);
        this.clientService.addClient(this.clientForm.value).subscribe(
          (response: any) => {
            //alert('client ajoutée avec succès !');
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
