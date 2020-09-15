import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryIdComponent } from './category-id.component';

const routes: Routes = [
    {
        path: "",
        component: CategoryIdComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryIdRoutingModule { }