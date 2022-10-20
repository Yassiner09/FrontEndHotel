import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ReservationService} from "../services/reservation.service";
import {Reservation} from "../models/Reservation";
import {ClientService} from "../services/client.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ReservationDialogComponent} from "../reservation-dialog/reservation-dialog.component";
import {ServiceReservationDialogComponent} from "../service-reservation-dialog/service-reservation-dialog.component";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  //public reservations!: Reservation[];
  //public clients!: Client[];

  displayedColumns: string[] = ['idRes', 'date', 'time', 'duree','room.num','client.cin','facture.totalPrice','action'];
  dataSource!: MatTableDataSource<Reservation>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private clientService: ClientService,
    private userService: UserService,
    private reservationService: ReservationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAllReservations();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public findAllReservations(): void{
    this.reservationService.findAllReservations().subscribe(
      (response: Reservation[]) => {
        this.dataSource = new MatTableDataSource<Reservation>(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: any, filter) => {
          const dataStr =JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) != -1;
        }
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch(property) {
            case 'client.cin': return item.client.cin;
            case 'room.num': return item.room.num;
            case 'facture.totalPrice': return item.facture.totalPrice;
            default: // @ts-ignore
              return item[property];
          }
        };
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public editReservation(row: any) {
    this.dialog.open(ReservationDialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(value => {
      if(value==="updated"){
        this.findAllReservations();
      }
    })
  }

  public deleteReservation(id: number): void {
    this.reservationService.deleteReservation(id).subscribe(
      (response: void) => {
        console.log(response)
        this.findAllReservations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

    public editServiceReservation(row: any) {
      this.dialog.open(ServiceReservationDialogComponent,{
        width:'30%',
        data:row
      }).afterClosed().subscribe(value => {
        if(value==="updated"){
          this.findAllReservations();
        }
      })
    }

    public isAdmin(): Boolean{
      return this.userService.isAdmin();
    }
    public isUser(): Boolean{
      return this.userService.isUser();
    }


}
