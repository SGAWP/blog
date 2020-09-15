import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  title = "Administration";

  constructor(
    private _title: Title
  ) {
    this._title.setTitle(`${this.title}`);
  }

  ngOnInit(): void {
  }

}
