import { Component, OnInit } from "@angular/core";
import { AuthService } from "./shared/services/auth.service";

@Component({
  selector: "app-root",
  template: "<app-loader></app-loader><router-outlet></router-outlet>"
})
export class AppComponent implements OnInit {
  constructor(
    private _auth: AuthService
  ) { }

  ngOnInit() {
    const potentialToken = localStorage.getItem("auth-token");
    if (potentialToken !== null) {
      this._auth.setToken(potentialToken);
    }
  }
}