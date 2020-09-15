import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from '../../../../shared/services/category.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _category: CategoryService,
    private fb: FormBuilder,
    private _toast: ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    if (this.data.action == "edit") {
      this.form = this.fb.group({
        category_name: new FormControl(this.data.data.category_name, Validators.required),
        category_id: new FormControl(this.data.data.category_id, Validators.required)
      });
    } else {
      this.form = new FormGroup({
        category_name: new FormControl("", Validators.required)
      });
    }
  }

  onSave() {
    this._category.update(this.form.value.category_id, this.form.value).subscribe(
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