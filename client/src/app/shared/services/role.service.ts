import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Role } from "../interfaces";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class RoleService {
    constructor(private _http: HttpClient) { }

    getAllRoles(): Observable<Role[]> {
        return this._http.get<Role[]>('/api/roles/getAllRoles');
    }
}