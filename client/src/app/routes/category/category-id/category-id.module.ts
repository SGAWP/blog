import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CategoryIdRoutingModule } from './category-id.routing';
import { CategoryIdComponent } from './category-id.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
    imports: [
        SharedModule,
        CategoryIdRoutingModule
    ],
    declarations: [
        CategoryIdComponent,
        PostsComponent
    ]
})
export class CategoryIdModule { }