import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AdministrationRoutingModule } from './administration.routing';
import { AdministrationComponent } from './administration.component';
import { UsersComponent } from './users/users.component';
import { EditRoleComponent } from './users/edit-role/edit-role.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';

@NgModule({
    imports: [
        SharedModule,
        AdministrationRoutingModule
    ],
    declarations: [
        AdministrationComponent,
        UsersComponent,
        EditRoleComponent,
        ChangePasswordComponent,
        CategoriesComponent,
        AddCategoryComponent,
        EditCategoryComponent
    ],
    entryComponents: [
        EditRoleComponent,
        ChangePasswordComponent,
        AddCategoryComponent,
        EditCategoryComponent
    ]
})
export class AdministrationModule { }