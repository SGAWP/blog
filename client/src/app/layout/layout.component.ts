import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  @ViewChild("sidenav") public sidenav;

  public screenWidth: number;

  public constructor() {
    this.screenWidth = window.innerWidth;

    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    }

  }

  sidebarToggle() {
    this.sidenav.toggle();
  }

}