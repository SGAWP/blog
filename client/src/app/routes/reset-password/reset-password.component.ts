import { Component, OnInit } from "@angular/core";
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { AuthService } from "../../shared/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  title = "Reset your password";
  form: FormGroup;
  loading: boolean = false;
  pwd = '';

  constructor(
    private _auth: AuthService,
    private _title: Title,
    private _toast: ToastrService
  ) {
    this._title.setTitle(`${this.title}`);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email])
    });
  }

  onResetPassword() {
    this.loading = true;
    this.form.disable();
    this._auth.resetPassword(this.form.value).subscribe(
      (res) => {
        this.form.enable();
        this.pwd = res.password
        this.loading = false;
      },
      error => {
        this.form.enable();
        this._toast.error(error.error.message);
        this.loading = false;
      }
    );
  }

  getEmailErrorMessage() {
    return this.form.controls.email.hasError("required") ? "Email is required." : "";
  }
}
