import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../../../../shared/services/category.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _category: CategoryService,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == 'add') {
      this.form = new FormGroup({
        category_name: new FormControl("", Validators.required)
      })
    }
  }

  onSave() {
    this._category.add(this.form.value).subscribe(
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

  getCategoryErrorMessage() {
    return this.form.controls.category_name.hasError('required') ? "Category is required." : '';
  }

}