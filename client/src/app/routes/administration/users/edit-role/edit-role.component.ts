import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { UserService } from '../../../../shared/services/user.service';
import { RoleService } from '../../../../shared/services/role.service';
import { Role } from "../../../../shared/interfaces";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {

  roles: Role[];

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _user: UserService,
    private _roles: RoleService,
    private _toast: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.load();
    this.initializeForm();
  }

  load() {
    this._roles.getAllRoles().subscribe(role => {
      this.roles = role;
    })
  }

  initializeForm() {
    if (this.data.action == "edit") {
      this.form = this.fb.group({
        roles_id: new FormControl(this.data.data.roles_id, Validators.required),
        user_id: new FormControl(this.data.data.user_id, Validators.required)
      });
    } else {
      this.form = new FormGroup({
        roles_id: new FormControl(null, Validators.required)
      });
    }
  }

  onSave() {
    this._user.editRole(this.form.value.user_id, this.form.value).subscribe(
      () => {
        this.dialogRef.close(true);
        this._toast.success("Data saved.");
      },
      error => {
        this.dialogRef.close(true);
        this._toast.error(error.error.message);
      }
    );
  }

}
