import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BasicRoutingModule } from './basic.routing';
import { BasicComponent } from './basic.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './profile/reset-password/reset-password.component';
import { PostsComponent } from './profile/posts/posts.component';
import { BookmarksComponent } from './profile/bookmarks/bookmarks.component';

@NgModule({
    imports: [
        SharedModule,
        BasicRoutingModule
    ],
    declarations: [
        BasicComponent,
        ProfileComponent,
        ResetPasswordComponent,
        PostsComponent,
        BookmarksComponent
    ]
})
export class BasicModule { }