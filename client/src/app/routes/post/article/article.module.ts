import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ArticleRoutingModule } from './article.routing';
import { ArticleComponent } from './article.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
    imports: [
        SharedModule,
        ArticleRoutingModule
    ],
    declarations: [
        ArticleComponent,
        CommentsComponent
    ]
})
export class ArticleModule { }