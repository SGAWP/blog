import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../../../../shared/services/user.service';
import { ToastrService } from "ngx-toastr";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private _toast: ToastrService,
    private _user: UserService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
  }

  onSave() {
    this._user.resetPassword(this.form.value)
      .subscribe(
        () => {
          this._toast.success("Password saved.");
        },
        error => {
          this._toast.error(error.error.message);
        }
      );
  }

  getPasswordErrorMessage() {
    return this.form.controls.password.hasError("required") ? "Password is required." :
      this.form.controls.password.hasError("minlength") ? "Password must contain at least 6 characters." : "";
  }

  getPasswordConfirmErrorMessage() {
    return this.form.controls.confirmPassword.hasError("required") ? "Password and confirm password don't match." :
      this.form.hasError("notSame") ? "Password and confirm password don't match." : "";
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

}