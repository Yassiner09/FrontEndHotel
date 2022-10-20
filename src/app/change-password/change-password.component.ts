import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../services/user.service";
import {UserAuthService} from "../services/user-auth.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public message: string | undefined
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
  ) { }

  ngOnInit(): void {
  }

  public changePassword(form: NgForm) {
    //console.log(form.value);
    if(form.value.nouveauMdp==form.value.verifierNouveauMdp){
      this.userService.changePassword(this.userAuthService.getUsername(),form.value.mdpA,form.value.nouveauMdp).subscribe(
        (response: any) => {
          alert('mot de passe changé avec succès');
          this.message = undefined;
          form.reset();
        },
        (error: HttpErrorResponse) => {
          //alert(error);
          this.message='mots de passe différents'
        }
      )
    }
    else{
      this.message='mots de passe différents'
    }

  }

}
