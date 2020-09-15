import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentService } from '../../../../shared/services/comment.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { Comment, User } from '../../../../shared/interfaces';
import { ToastrService } from "ngx-toastr";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {

  comments: Comment[];
  user: User;
  pageSize = 10;
  page = 1;
  totalItems = 0;
  isActive = true;

  form: FormGroup;

  ngUnsubscribe: Subscription;

  @Input('posts_id') posts_id: number;

  constructor(
    private _auth: AuthService,
    private _comments: CommentService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.user = this._auth.decode();
    this.initializeForm();
    this.load();
  }

  initializeForm() {
      this.form = new FormGroup({
        posts_id: new FormControl(this.posts_id, Validators.required),
        comment: new FormControl("", Validators.required)
      })
  }

  load() {
    this.isActive = false;
    this.ngUnsubscribe =   this._comments.getAllComments(this.posts_id, this.pageSize, this.page).subscribe(comment => {
      this.isActive = true;
      this.comments = comment.rows;
      this.totalItems = comment.count;
    }, error => {
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

  onSave() {
    this._comments.add(this.form.value).subscribe(
      () => {
        this.form.get('comment').setValue('');
        this.load();
      },
      error => {
        this.load();
        this._toast.error(error.error.message);
      }
    )
  }

  delete(comment: Comment) {
    this._comments.delete(comment.comment_id).subscribe(
      () => {
        this.load();
      },
      error => {
        this._toast.error(error.error.message);
      }
    );
  }

  getCommentErrorMessage() {
    return this.form.controls.comment.hasError("required") ? "Comment is required." : "";
  }

}
