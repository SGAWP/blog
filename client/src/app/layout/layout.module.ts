import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { LayoutComponent } from "./layout.component";
import { AuthComponent } from './auth/auth.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        LayoutComponent,
        AuthComponent
    ]
})
export class LayoutModule { }