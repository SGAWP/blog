import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { User } from "../interfaces";
import decode from "jwt-decode";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    token = null;

    constructor(private _http: HttpClient) { }

    signIn(user: User): Observable<{ token: string }> {
        return this._http.post<{ token: string }>('/api/auth/signIn', user).pipe(tap(({ token }) => {
            localStorage.setItem("auth-token", token);
            this.setToken(token);
        }));
    }

    signUp(user: User): Observable<User> {
        return this._http.post<User>('/api/auth/signUp', user);
    }

    resetPassword(user: User): Observable<User> {
        return this._http.patch<User>('/api/auth/resetPassword', user);
    }

    setToken(token: string) {
        this.token = token;
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    getToken(): string {
        return this.token;
    }

    decode() {
        return decode(localStorage.getItem("auth-token"));
    }

    signOut() {
        this.setToken(null);
        localStorage.clear();
    }

}