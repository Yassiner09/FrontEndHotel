import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {Role} from "../models/Role";
import {RoleService} from "../services/role.service";

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.css']
})
export class RoleDialogComponent implements OnInit {
  public champ='Ajouter';
  public roleForm!: FormGroup;
  public roles!: Role[];

  constructor(
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogReference: MatDialogRef<RoleDialogComponent>,
    private roleService: RoleService,
  ) {}

  ngOnInit(): void {
    this.findAllRoles();
    this.roleForm=this.formBuilder.group({
        idRole: ['', Validators.required],
        name: ['', Validators.required]
      }
    );
    if(this.editData){
      this.champ='Modifier';
      this.roleForm.controls['idRole'].setValue(this.editData.idRole)
      this.roleForm.controls['name'].setValue(this.editData.name)
    }
  }



  public findAllRoles(): void{
    this.roleService.findAllRoles().subscribe(
      (response: Role[]) => {
        this.roles = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public addOrUpdateRole() {
    if(this.editData){
      if(this.roleForm.valid){
        this.roleService.updateRole(this.roleForm.value).subscribe(
          (response: any) => {
            this.dialogReference.close('updated');
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    }
    else{
        this.roleService.addRole(this.roleForm.value).subscribe(
          (response: any) => {
            this.dialogReference.close('added');
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );

    }

  }
  public closeDialog() {
    this.dialogReference.close('closed');
  }

}
