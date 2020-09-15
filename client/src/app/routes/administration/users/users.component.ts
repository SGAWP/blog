import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { User } from "../../../shared/interfaces";
import { UserService } from "../../../shared/services/user.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator, } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Subscription } from 'rxjs';
import { EditRoleComponent } from "./edit-role/edit-role.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ConfirmComponent } from "../../../shared/components/confirm/confirm.component";

import * as _moment from 'moment';
const moment = _moment;

const COLS = [
  { value: "username", displayName: 'Username' },
  { value: "email", displayName: 'Email' },
  { value: "role_name", displayName: 'Role' },
  { value: "createdAt", displayName: 'Created Date' }
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {

  loading: boolean = false;
  allCols = COLS;
  pageSizeOptions = [5, 10, 25, 50, 100];
  pageSize = 10;
  page = 1;
  totalItems = 0;
  search = "";
  date = "";
  displayedColumns: any[];
  isActive = true;

  ngUnsubscribe: Subscription;

  public dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _users: UserService,
    public dialog: MatDialog,
    private _toast: ToastrService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.displayedColumns = this.allCols.map(col => col.value);
  }

  ngAfterViewInit() {
    this.load();
    this.cdr.detectChanges();
  }

  applyFilter() {
    this.dataSource.filter = this.search ? this.search.trim().toLowerCase() : '';
    this.dataSource.filter = this.date ? this.date.trim().toLowerCase() : '';
    if (this.page !== 1) {
      this.page = this.paginator.pageIndex = 0;
      this.pageLoad()
    } else {
      this.load()
    }
  }

  onSelectDate(event): void {
    this.date = moment(event).format('YYYY-MM-DD');
  }

  pageLoad() {
    if (this.page === 0) {
      this.page = this.paginator.pageIndex + 1;
      this.load();
    }
  }

  clear(): void {
    this.search = "";
    this.date = "";
    this.applyFilter();
  }

  load() {
    this.loading = true;
    this.isActive = false;
    this.ngUnsubscribe = this._users.getAllUsers(this.search, this.date, this.sort.active, this.sort.direction, this.pageSize, this.page).subscribe(data => {
      this.loading = false;
      this.isActive = true;
      this.dataSource = new MatTableDataSource(data.rows);
      this.totalItems = data.count;
      this.dataSource.sort = this.sort;
    }, error => {
      this.loading = false;
      this.isActive = true;
      this._toast.error(error.error.message);
    })
  }

  onPaginateChange(event) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.load();
  }

  ngOnDestroy() {
    if (this.ngUnsubscribe !== undefined) {
      this.ngUnsubscribe.unsubscribe();
    }
  }

  editRole(row: User) {
    let dialogRef = this.dialog.open(EditRoleComponent, {
      width: "500px",
      data: { title: "Assign user role", action: "edit", data: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  changePassword(row: User) {
    let dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: "500px",
      data: { title: "Change Password", action: "edit", data: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  delete(row: User) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Confirm deletion",
        message: `Are you sure you want to delete user ${row.username}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._users.delete(row.user_id).subscribe(
          response => this._toast.success(response.message),
          error => {
            this._toast.error(error.error.message);
          },
          () => {
            this.load();
          }
        );
      }
    });
  }

}
