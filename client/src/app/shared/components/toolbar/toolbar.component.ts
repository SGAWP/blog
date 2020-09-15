import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../shared/services/auth.service";
import { User } from "../../../shared/interfaces";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {

  user: User;

  @Output('toggleSidebar') toggleSidebar = new EventEmitter();

  constructor(
    public router: Router,
    private _auth: AuthService
  ) { }

  ngOnInit() {
    this.user = this._auth.decode();
  }

  sideMenuToggle(event) {
    event.preventDefault();
    this.toggleSidebar.emit();
  }

  onSignOut(event: Event) {
    event.preventDefault();
    this._auth.signOut();
    this.router.navigate(["/auth/sign-in"]);
  }

}