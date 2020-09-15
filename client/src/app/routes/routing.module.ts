import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from "../shared/classes/role.guard";
import { AuthGuard } from "../shared/classes/auth.guard";
import { PreventLoggedInAccess } from "../shared/classes/prevent-logged-in.access";
import { LayoutComponent } from '../layout/layout.component';
import { AuthComponent } from '../layout/auth/auth.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'posts', pathMatch: 'full' },
            {
                path: "posts",
                loadChildren: () => import("./post/post.module").then(m => m.PostModule)
            },
            {
                path: "posts/:id",
                loadChildren: () => import("./post/article/article.module").then(m => m.ArticleModule)
            },
            {
                path: "categories",
                loadChildren: () => import("./category/category.module").then(m => m.CategoryModule)
            },
            {
                path: "categories/:id",
                loadChildren: () => import("./category/category-id/category-id.module").then(m => m.CategoryIdModule)
            },
            {
                path: "profile",
                loadChildren: () => import("./basic/basic.module").then(m => m.BasicModule)
            },
            {
                path: "administration",
                loadChildren: () => import("./administration/administration.module").then(m => m.AdministrationModule),
                data: { role_name: "Administrator" },
                canActivate: [RoleGuard]
            }
        ]
    },
    {
        path: 'auth',
        canActivate: [PreventLoggedInAccess],
        component: AuthComponent,
        children: [
            {
                path: 'sign-in',
                loadChildren: () => import("./sign-in/sign-in.module").then(m => m.SignInModule)
            },
            {
                path: 'sign-up',
                loadChildren: () => import("./sign-up/sign-up.module").then(m => m.SignUpModule)
            },
            {
                path: 'reset-password',
                loadChildren: () => import("./reset-password/reset-password.module").then(m => m.ResetPasswordModule)
            }
        ]
    },
    {
        path: "**",
        loadChildren: () => import("./not-found/not-found.module").then(m => m.NotFoundModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: false })
    ],
    exports: [RouterModule]
})
export class RoutesRoutingModule { }