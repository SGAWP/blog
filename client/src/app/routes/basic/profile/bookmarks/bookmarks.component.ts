import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Bookmark } from "../../../../shared/interfaces";
import { BookmarkService } from "../../../../shared/services/bookmark.service";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { ToastrService } from "ngx-toastr";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit, OnDestroy {

  bookmarks: Bookmark[];

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
    private _bookmarks: BookmarkService,
    private router: Router,
    public dialog: MatDialog,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.load();
  }

  applyFilter() {
    let searchFilter: any = {
      filterValue: this.search
    };
    this.bookmarks.filter = searchFilter;
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
    this.ngUnsubscribe = this._bookmarks.getAllBookmarks(params).subscribe(bookmark => {
      this.loading = false;
      this.isActive = true;
      this.bookmarks = bookmark.rows;
      this.totalItems = bookmark.count;
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

  route(bookmark: Bookmark) {
    this.router.navigate(['/posts', bookmark.posts_id]);
  }

}
