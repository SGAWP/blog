import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PostRoutingModule } from './post.routing';
import { PostComponent } from './post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';

@NgModule({
    imports: [
        SharedModule,
        PostRoutingModule
    ],
    declarations: [
        PostComponent,
        AddPostComponent,
        EditPostComponent
    ],
    entryComponents: [
        AddPostComponent,
        EditPostComponent
    ]
})
export class PostModule { }