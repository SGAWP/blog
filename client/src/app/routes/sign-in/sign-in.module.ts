import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SignInRoutingModule } from './sign-in.routing';
import { SignInComponent } from './sign-in.component';

@NgModule({
    imports: [
        SharedModule,
        SignInRoutingModule
    ],
    declarations: [
        SignInComponent
    ]
})
export class SignInModule { }