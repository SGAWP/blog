import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  title = "Profile";

  constructor(
    private _title: Title
  ) {
    this._title.setTitle(`${this.title}`);
  }

  ngOnInit(): void {
  }

}
