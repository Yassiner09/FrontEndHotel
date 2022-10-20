import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {Role} from "../models/Role";
import {RoleService} from "../services/role.service";
import {RoleDialogComponent} from "../role-dialog/role-dialog.component";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  displayedColumns: string[] = ['name','action'];
  dataSource!: MatTableDataSource<Role>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private roleService: RoleService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAllRoles();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(RoleDialogComponent, {
      width:'30%',
    }).afterClosed().subscribe(value => {
      if(value==="added"){
        this.findAllRoles();
      }
    })
  }

  public findAllRoles(): void{
    this.roleService.findAllRoles().subscribe(
      (response: Role[]) => {
        this.dataSource = new MatTableDataSource<Role>(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteRole(id: number): void{
    this.roleService.deleteRole(id).subscribe(
      (response: void) => {
        //console.log(response)
        this.findAllRoles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public editRole(row: any) {
    this.dialog.open(RoleDialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(value => {
      if(value==="updated"){
        this.findAllRoles();
      }
    })
  }

}
