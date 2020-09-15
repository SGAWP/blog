import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { RoutesRoutingModule } from './routes/routing.module';
import { TokenInterceptor } from "./shared/classes/token.interceptor";
import { LoaderService } from './shared/services/loader.service';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        LayoutModule,
        RoutesRoutingModule
    ],
    providers: [
        Title,
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: TokenInterceptor
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private router: Router, private _loader: LoaderService) {
        router.events.subscribe((event: Event) => {

            if (event instanceof NavigationStart) {
                this._loader.showLoader();
            }

            if (event instanceof NavigationEnd) {
                this._loader.hideLoader();
            }

            if (event instanceof NavigationError) {
                this._loader.hideLoader();
            }

        });
    }
}