import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../shared/services/auth.service";
import { User } from "../../../shared/interfaces";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  user: User;

  constructor(
    public router: Router,
    private _auth: AuthService
  ) { }

  ngOnInit() {
    this.user = this._auth.decode();
  }

  onSignOut(event: Event) {
    event.preventDefault();
    this._auth.signOut();
    this.router.navigate(["/auth/sign-in"]);
  }

}
