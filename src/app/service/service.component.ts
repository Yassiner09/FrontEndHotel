import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {ServiceService} from "../services/service.service";
import {Service} from "../models/Service";
import {ServiceDialogComponent} from "../service-dialog/service-dialog.component";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'price','action'];
  dataSource!: MatTableDataSource<Service>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private serviceService: ServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAllServices();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(ServiceDialogComponent, {
      width:'30%',
    }).afterClosed().subscribe(value => {
      if(value==="added"){
        this.findAllServices();
      }
    })
  }

  public findAllServices(): void{
    this.serviceService.findAllServices().subscribe(
      (response: Service[]) => {
        this.dataSource = new MatTableDataSource<Service>(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteService(id: number): void{
    this.serviceService.deleteService(id).subscribe(
      (response: void) => {
        console.log(response)
        this.findAllServices();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public editService(row: any) {
    this.dialog.open(ServiceDialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(value => {
      if(value==="updated"){
        this.findAllServices();
      }
    })
  }

}
