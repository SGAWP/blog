import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ResetPasswordRoutingModule } from './reset-password.routing';
import { ResetPasswordComponent } from './reset-password.component';

@NgModule({
    imports: [
        SharedModule,
        ResetPasswordRoutingModule
    ],
    declarations: [
        ResetPasswordComponent
    ]
})
export class ResetPasswordModule { }