import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class LoaderService {
    private loader: Subject<boolean> = new Subject();

    showLoader() {
        this.loader.next(true);
    }

    hideLoader() {
        this.loader.next(false);
    }

    getLoader() {
        return this.loader;
    }
}