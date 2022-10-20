import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {UserAuthService} from "../services/user-auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public message: string =''
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.userAuthService.isLoggedIn()) {
      var roles = this.userAuthService.getRoles()
      // @ts-ignore
      if(roles[0].name=='Admin') this.router.navigate(['/admin'])
      else this.router.navigate(['user'])
    }

  }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        //console.log(response.user.roles)
        this.userAuthService.setRoles(response.user.roles);
        //console.log(this.userAuthService.getRoles())
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setUsername(response.user.username);
        const role = response.user.roles[0].name;
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      (error) => {
        console.log(error);
        this.message='login ou mot de passe incorrect'
      }
    );
  }

}
