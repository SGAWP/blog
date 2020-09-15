import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from "ngx-toastr";
import { NgxMdModule } from 'ngx-md';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
    declarations: [
        SidenavComponent,
        FooterComponent,
        ToolbarComponent,
        ConfirmComponent,
        LoaderComponent
    ],
    imports: [
        MaterialModule,
        FlexLayoutModule,
        RouterModule,
        CommonModule,
        NgxMdModule.forRoot(),
        ToastrModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        MaterialModule,
        FlexLayoutModule,
        RouterModule,
        FormsModule,
        NgxMdModule,
        ReactiveFormsModule,
        CommonModule,
        SidenavComponent,
        FooterComponent,
        ToolbarComponent,
        LoaderComponent
    ],
    entryComponents: [
        ConfirmComponent
    ]
})
export class SharedModule { }