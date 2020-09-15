import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from "../../../shared/services/user.service";
import { User } from "../../../shared/interfaces";
import { ToastrService } from "ngx-toastr";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User;
  loading: boolean = false;
  form: FormGroup;
  avatar: File;
  avatarPreview = '';

  ngUnsubscribe: Subscription;

  @ViewChild('input') input: ElementRef;

  constructor(
    private _user: UserService,
    private _toast: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.ngUnsubscribe = this._user.getProfile().subscribe(user => {
      this.user = user;
      this.form = this.fb.group({
        email: new FormControl(this.user.email, [Validators.required, Validators.email])
      })
      this.avatarPreview = this.user.avatar;
      this.loading = false;
    }, error => {
      this._toast.error(error.error.message);
      this.loading = false;
    });
  }

  ngOnDestroy() {
    if (this.ngUnsubscribe !== undefined) {
      this.ngUnsubscribe.unsubscribe();
    }
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    this.avatar = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.avatarPreview = reader.result as string;
    }

    reader.readAsDataURL(file);

    this._user.avatar(this.avatar).subscribe(
      () => {
        this._toast.success("Avatar saved.");
      },
      error => {
        this._toast.error(error.error.message);
      }
    );
  }

  triggerClick() {
    this.input.nativeElement.click();
  }

  onSave() {
    this._user.changeEmail(this.form.value).subscribe(
      () => {
        this._toast.success("Email saved.");
      },
      error => {
        this._toast.error(error.error.message);
      }
    );
  }

}
