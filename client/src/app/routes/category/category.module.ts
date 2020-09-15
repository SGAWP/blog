import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CategoryRoutingModule } from './category.routes';
import { CategoryComponent } from './category.component';

@NgModule({
    imports: [
        SharedModule,
        CategoryRoutingModule
    ],
    declarations: [
        CategoryComponent,
    ]
})
export class CategoryModule { }