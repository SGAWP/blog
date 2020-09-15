import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from "ngx-toastr";
import { CategoryService } from "../../../shared/services/category.service";
import { Category } from "../../../shared/interfaces";

@Component({
  selector: 'app-category-id',
  templateUrl: './category-id.component.html',
  styleUrls: ['./category-id.component.scss']
})
export class CategoryIdComponent implements OnInit {

  title = "Category";

  category: Category;

  constructor(
    private _category: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _toast: ToastrService,
    private _title: Title
  ) {
    this._title.setTitle(`${this.title}`);
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              return this._category.getCategoryById(params['id']);
            }
            return of(null);
          }
        )
      )
      .subscribe(
        (category: Category) => {
          this.category = category;
        },
        error => {
          this._toast.error(error.error.message);
        }
      )
  }

  backward() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(["/categories"]);
    }
  }

}
