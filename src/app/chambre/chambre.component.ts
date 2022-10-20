import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {RoomService} from "../services/room.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {Room} from "../models/Room";
import {RoomDialogComponent} from "../room-dialog/room-dialog.component";

@Component({
  selector: 'app-chambre',
  templateUrl: './chambre.component.html',
  styleUrls: ['./chambre.component.css']
})
export class ChambreComponent implements OnInit {

  displayedColumns: string[] = ['num', 'floors', 'price','availability','phoneNumber','types.name','action'];
  dataSource!: MatTableDataSource<Room>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private roomService: RoomService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.findAllRooms();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(RoomDialogComponent, {
      width:'30%',
    }).afterClosed().subscribe(value => {
      if(value==="added"){
        this.findAllRooms();
      }
    })
  }


  public findAllRooms(): void{
    this.roomService.findAllRooms().subscribe(
      (response: Room[]) => {
        this.dataSource = new MatTableDataSource<Room>(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: any, filter) => {
          const dataStr =JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) != -1;
        }
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch(property) {
            case 'types.name': return item.types.name;
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

  public deleteRoom(id: number): void{
    this.roomService.deleteRoom(id).subscribe(
      (response: void) => {
        this.findAllRooms();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public editRoom(row: any) {
    this.dialog.open(RoomDialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(value => {
      if(value==="updated"){
        this.findAllRooms();
      }
    })
  }
}
