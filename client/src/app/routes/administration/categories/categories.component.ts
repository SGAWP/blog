import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Category } from "../../../shared/interfaces";
import { CategoryService } from "../../../shared/services/category.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator, } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Subscription } from 'rxjs';
import { AddCategoryComponent } from "./add-category/add-category.component";
import { EditCategoryComponent } from "./edit-category/edit-category.component";
import { ConfirmComponent } from "../../../shared/components/confirm/confirm.component";

const COLS = [
  { value: "category_name", displayName: 'Name' }
];

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, AfterViewInit, OnDestroy {

  loading: boolean = false;
  allCols = COLS;
  pageSizeOptions = [5, 10, 25, 50, 100];
  pageSize = 10;
  page = 1;
  totalItems = 0;
  search = "";
  displayedColumns: any[];
  isActive = true;

  ngUnsubscribe: Subscription;

  public dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _categories: CategoryService,
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
    if (this.page !== 1) {
      this.page = this.paginator.pageIndex = 0;
      this.pageLoad()
    } else {
      this.load()
    }
  }

  pageLoad() {
    if (this.page === 0) {
      this.page = this.paginator.pageIndex + 1;
      this.load();
    }
  }

  load() {
    this.loading = true;
    this.isActive = false;
    this.ngUnsubscribe = this._categories.getAllSprCategories(this.search, this.sort.active, this.sort.direction, this.pageSize, this.page).subscribe(data => {
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

  add() {
    let dialogRef = this.dialog.open(AddCategoryComponent, {
      width: "500px",
      data: { title: "Add category", action: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  edit(row: Category) {
    let dialogRef = this.dialog.open(EditCategoryComponent, {
      width: "500px",
      data: { title: "Edit category", action: "edit", data: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  delete(row: Category) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Confirm deletion",
        message: `Are you sure you want to delete category ${row.category_name}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._categories.delete(row.category_id).subscribe(
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
