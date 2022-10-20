import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import {AuthGuard} from "./_auth/auth.guard";
import {AuthInterceptor} from "./_auth/auth.interceptor";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from "@angular/material/dialog";
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import { ChambreComponent } from './chambre/chambre.component';
import { RoomDialogComponent } from './room-dialog/room-dialog.component';
import { RoleComponent } from './role/role.component';
import { RoleDialogComponent } from './role-dialog/role-dialog.component';
import {MatNativeDateModule} from "@angular/material/core";
import {DatePipe} from "@angular/common";
import {MatMenuModule} from '@angular/material/menu';
import { ServiceComponent } from './service/service.component';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';
import { ServiceReservationDialogComponent } from './service-reservation-dialog/service-reservation-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ClientComponent } from './client/client.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ClientDialogComponent } from './client-dialog/client-dialog.component';
import {CookieService} from "ngx-cookie-service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    UserComponent,
    AdminComponent,
    ForbiddenComponent,
    ReservationDialogComponent,
    ChambreComponent,
    RoomDialogComponent,
    RoleComponent,
    RoleDialogComponent,
    ServiceComponent,
    ServiceDialogComponent,
    ServiceReservationDialogComponent,
    ClientComponent,
    UtilisateurComponent,
    ChangePasswordComponent,
    ClientDialogComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatSidenavModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatMenuModule,
        MatCheckboxModule,
    ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MatDatepickerModule,
    DatePipe,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
