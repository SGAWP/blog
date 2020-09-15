import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from "../../../shared/services/post.service";
import { BookmarkService } from "../../../shared/services/bookmark.service";
import { AuthService } from '../../../shared/services/auth.service';
import { Post, Bookmark, User } from "../../../shared/interfaces";
import { EditPostComponent } from "../edit-post/edit-post.component";
import { ConfirmComponent } from "../../../shared/components/confirm/confirm.component";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  title = "Article";

  post: Post;
  user: User;
  bookmark: Bookmark;

  form: FormGroup;

  constructor(
    private _auth: AuthService,
    private _post: PostService,
    public dialog: MatDialog,
    private _bookmark: BookmarkService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _toast: ToastrService,
    private _title: Title
  ) {
    this._title.setTitle(`${this.title}`);
  }

  ngOnInit() {
    this.user = this._auth.decode();
    this.load();
    this.form = new FormGroup({
      posts_id: new FormControl("", Validators.required)
    })
  }

  load() {
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              return this._post.getPostById(params['id']);
            }
            return of(null);
          }
        )
      )
      .subscribe(
        (post: Post) => {
          this.post = post;
          this.form.patchValue({
            posts_id: this.post.post_id
          })
          this._bookmark.getBookmarkByPostsIdAndUsersId(this.post.post_id).subscribe(bookmark => {
            this.bookmark = bookmark;
          })
        },
        error => {
          this._toast.error(error.error.message);
        }
      )
  }

  onSave() {
    this._bookmark.add(this.form.value).subscribe(
      () => {
        this.load();
      },
      error => {
        this._toast.error(error.error.message);
        this.load();
      }
    )
  }

  backward() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(["/posts"]);
    }
  }


  edit(post: Post) {
    let dialogRef = this.dialog.open(EditPostComponent, {
      width: "900px",
      data: { title: "Edit Article", action: "edit", data: post }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load();
      }
    });
  }

  delete(post: Post) {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: "Confirm deletion",
        message: `Are you sure you want to delete post ${post.title}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._post.delete(post.post_id).subscribe(
          response => this._toast.success(response.message),
          error => {
            this._toast.error(error.error.message);
          },
          () => {
            this.router.navigate(["/posts"]);
          }
        );
      }
    });
  }

  deleteBookmark(bookmark: Bookmark) {
    this._bookmark.delete(bookmark.bookmark_id).subscribe(
      () => {
        this.load();
      },
      error => {
        this._toast.error(error.error.message);
      }
    );
  }

}
