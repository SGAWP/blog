import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../../../shared/services/post.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Category } from '../../../shared/interfaces';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  categories: Category[];
  image: File;
  imagePreview = '';

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _post: PostService,
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
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        title: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
        categories_id: new FormControl("", Validators.required),
        content: new FormControl("", Validators.required)
      })
    }
  }
  onSave() {
    this._post.add(this.form.value.title, this.form.value.description, this.form.value.content, this.form.value.categories_id, this.image).subscribe(
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

  onFileSelect(event) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }

    reader.readAsDataURL(file);
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