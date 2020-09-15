import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from "../../shared/interfaces";
import { ToastrService } from "ngx-toastr";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  title = "Sign Up";
  user: User;
  form: FormGroup;
  loading: boolean = false;

  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private _toast: ToastrService,
    private router: Router,
    private _title: Title,
    private _auth: AuthService
  ) {
    this._title.setTitle(`${this.title}`);
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      username: new FormControl("", [Validators.required]),
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
  }

  onSignUp() {
    this.loading = true;
    this.form.disable();
    this._auth.signUp(this.form.value).subscribe(
      () => {
        this.loading = false;
        this._toast.success("The account was created successfully.");
        this.router.navigate(["/auth/sign-in"]);
      },
      error => {
        this.loading = false;
        this.form.enable();
        this._toast.error(error.error.message);
      }
    )
  }

  getUsernameErrorMessage() {
    return this.form.controls.username.hasError('required') ? "Username is required." : "";
  }

  getEmailErrorMessage() {
    return this.form.controls.email.hasError("required") ? "Email is required." : "";
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
