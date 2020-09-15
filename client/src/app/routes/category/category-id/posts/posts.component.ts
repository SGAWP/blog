import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from "../../../../shared/interfaces";
import { PostService } from "../../../../shared/services/post.service";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { ToastrService } from "ngx-toastr";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: Post[];

  loading: boolean = false;
  pageSizeOptions = [5, 10, 25, 50, 100];
  pageSize = 10;
  page = 1;
  totalItems = 0;
  isActive = true;
  search = "";

  ngUnsubscribe: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input('categories_id') categories_id: number;

  constructor(
    private _posts: PostService,
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
    this.posts.filter = searchFilter;
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
    this.loading = true;
    this.isActive = false;
    this.ngUnsubscribe = this._posts.getAllPostsCategories(this.categories_id, this.search, this.pageSize, this.page).subscribe(post => {
      this.loading = false;
      this.isActive = true;
      this.posts = post.rows;
      this.totalItems = post.count;
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

  route(post: Post) {
    this.router.navigate(['/posts', post.post_id]);
  }

}
