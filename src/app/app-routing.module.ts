import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {AuthGuard} from "./_auth/auth.guard";
import {AdminComponent} from "./admin/admin.component";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {ChambreComponent} from "./chambre/chambre.component";
import {RoleComponent} from "./role/role.component";
import {ServiceComponent} from "./service/service.component";
import {ClientComponent} from "./client/client.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'admin', component: AdminComponent ,  canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'chambre', component: ChambreComponent ,  canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'role', component: RoleComponent ,  canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'service', component: ServiceComponent ,  canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'client', component: ClientComponent ,  canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'password', component: ChangePasswordComponent ,  canActivate:[AuthGuard], data:{roles:['Admin']} },
];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)],
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
