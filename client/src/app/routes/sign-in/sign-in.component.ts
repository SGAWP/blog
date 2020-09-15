import { Component, OnInit } from "@angular/core";
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  title = "Sign In";
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private _auth: AuthService,
    private router: Router,
    private _title: Title,
    private _toast: ToastrService
  ) {
    this._title.setTitle(`${this.title}`);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    });
  }

  onSignIn() {
    this.loading = true;
    this.form.disable();
    this._auth.signIn(this.form.value).subscribe(
      () => {
        this.router.navigate(["/posts"]);
        this.loading = false;
      },
      error => {
        this.form.enable();
        this._toast.error(error.error.message);
        this.loading = false;
      }
    );
  }

  getUsernameErrorMessage() {
    return this.form.controls.username.hasError("required") ? "Usernmae is required." : "";
  }

  getPasswordErrorMessage() {
    return this.form.controls.password.hasError("required") ? "Password is required." :
      this.form.controls.password.hasError("minlength") ? "Password must contain at least 6 characters." : "";
  }

}
