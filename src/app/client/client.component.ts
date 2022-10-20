import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {Client} from "../models/Client";
import {ClientService} from "../services/client.service";
import {ClientDialogComponent} from "../client-dialog/client-dialog.component";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  displayedColumns: string[] = ['idClt', 'firstName', 'lastName', 'cin','nationality','cardNumber','fidelity','action'];
  dataSource!: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private clientService: ClientService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAllClient();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(ClientDialogComponent, {
      width:'30%',
    }).afterClosed().subscribe(value => {
      if(value==="added"){
        this.findAllClient();
      }
    })
  }


  public findAllClient(): void{
    this.clientService.findAllClients().subscribe(
      (response: Client[]) => {
        this.dataSource = new MatTableDataSource<Client>(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: any, filter) => {
          const dataStr =JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) != -1;
        }
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch(property) {
            case 'fidelity.name': return item.fidelity.name;
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

  public editClient(row: any) {
    this.dialog.open(ClientDialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(value => {
      if(value==="updated"){
        this.findAllClient();
      }
    })
  }

  public deleteClient(client: Client): void{
    this.clientService.deleteClient(client).subscribe(
      (response: void) => {
        console.log(response)
        this.findAllClient();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
