import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Category } from "../../shared/interfaces";
import { CategoryService } from "../../shared/services/category.service";
import { MatPaginator } from "@angular/material/paginator";
import { ToastrService } from "ngx-toastr";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  title = "Categories";

  categories: Category[];

  loading: boolean = false;
  pageSizeOptions = [5, 10, 25, 50, 100];
  pageSize = 10;
  page = 1;
  totalItems = 0;
  isActive = true;
  search = "";

  ngUnsubscribe: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _categories: CategoryService,
    private router: Router,
    private _toast: ToastrService,
    private _title: Title
  ) {
    this._title.setTitle(`${this.title}`);

  }

  ngOnInit() {
    this.load();
  }

  applyFilter() {
    let searchFilter: any = {
      filterValue: this.search
    };
    this.categories.filter = searchFilter;
    if (this.page !== 1) {
      this.page = this.paginator.pageIndex = 0;
      this.pageLoad();
    } else {
      this.load();
    }
  }

  pageLoad() {
    if (this.page === 0) {
      this.page = this.paginator.pageIndex + 1;
      this.load();
    }
  }

  load() {
    const params = {
      search: this.search,
      pageSize: this.pageSize,
      page: this.page
    };
    this.loading = true;
    this.isActive = false;
    this.ngUnsubscribe = this._categories.getAllCategories(params).subscribe(category => {
      this.loading = false;
      this.isActive = true;
      this.categories = category.rows;
      this.totalItems = category.count;
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

  route(category: Category) {
    this.router.navigate(['/categories', category.category_id]);
  }

}
