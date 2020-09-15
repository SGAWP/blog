import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PostService } from '../../../shared/services/post.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Category } from '../../../shared/interfaces';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  categories: Category[];

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _post: PostService,
    private fb: FormBuilder,
    private _categories: CategoryService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.load();
  }

  load() {
    this._categories.getSelectCategories().subscribe(category => {
      this.categories = category;
    })
  }

  initializeForm() {
    if (this.data.action == "edit") {
      this.form = this.fb.group({
        title: new FormControl(this.data.data.title, Validators.required),
        description: new FormControl(this.data.data.description, Validators.required),
        categories_id: new FormControl(this.data.data.categories_id, Validators.required),
        content: new FormControl(this.data.data.content, Validators.required),
        post_id: new FormControl(this.data.data.post_id, Validators.required)
      });
    } else {
      this.form = new FormGroup({
        title: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
        categories_id: new FormControl("", Validators.required),
        content: new FormControl("", Validators.required)
      });
    }
  }
  onSave() {
    this._post.update(this.form.value.post_id, this.form.value).subscribe(
      () => {
        this.dialogRef.close(true);
        this._toast.success("Data saved.");
      },
      error => {
        this.dialogRef.close(true);
        this._toast.error(error.error.message);
      }
    )
  }

  link() {
    let url = "https://dimpu.github.io/ngx-md";
    window.open(url, '_blank');
  }

  getTitleErrorMessage() {
    return this.form.controls.title.hasError("required") ? "Title is required." : "";
  }

  getDescriptionErrorMessage() {
    return this.form.controls.description.hasError("required") ? "Description is required." : "";
  }

  getContentErrorMessage() {
    return this.form.controls.content.hasError("required") ? "Content is required." : "";
  }

}