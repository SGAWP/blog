import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor(
    private router: Router,
    private location: Location
  ) { }

  backward() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(["/posts"]);
    }
  }

}