import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  loader: boolean = false;

  constructor(private _loader: LoaderService) {
    _loader.getLoader().subscribe((status) => { this.loader = status })
  }

}