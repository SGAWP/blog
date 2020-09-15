import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from "../../shared/interfaces";
import { PostService } from "../../shared/services/post.service";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { ToastrService } from "ngx-toastr";
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { AddPostComponent } from "./add-post/add-post.component";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  title = "Articles";

  posts: Post[];

  loading: boolean = false;
  pageSizeOptions = [5, 10, 25, 50, 100];
  pageSize = 10;
  page = 1;
  totalItems = 0;
  isActive = true;
  search = "";
  breakpoint: number;

  ngUnsubscribe: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _posts: PostService,
    private router: Router,
    public dialog: MatDialog,
    private _toast: ToastrService,
    private _title: Title
  ) {
    this._title.setTitle(`${this.title}`);
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 960) ? 1 : 5;
    this.load();
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 960) ? 1 : 5;
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
    const params = {
      search: this.search,
      pageSize: this.pageSize,
      page: this.page
    };
    this.loading = true;
    this.isActive = false;
    this.ngUnsubscribe = this._posts.getAllPosts(params).subscribe(post => {
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

  add() {
    let dialogRef = this.dialog.open(AddPostComponent, {
      width: "900px",
      data: { title: "Add New Article", action: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  route(post: Post) {
    this.router.navigate(['/posts', post.post_id]);
  }

}
