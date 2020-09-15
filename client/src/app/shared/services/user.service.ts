import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { User, Message } from "../interfaces";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor(private _http: HttpClient) { }

    getAllUsers(search: string, date: string, sort: string, order: string, pageSize: number, page: number): Observable<UserApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("date", date);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this._http.get<UserApi>(`/api/users/getAllUsers`, { params: params });
    }

    getProfile(): Observable<User> {
        return this._http.get<User>('/api/users/getProfile');
    }

    changeEmail(user: User): Observable<User> {
        return this._http.patch<User>('/api/users/changeEmail', user);
    }

    editRole(id: number, user: User): Observable<User> {
        return this._http.patch<User>(`/api/users/editRole/${id}`, user);
    }

    changePassword(id: number, user: User): Observable<User> {
        return this._http.patch<User>(`/api/users/changePassword/${id}`, user);
    }

    avatar(avatar?: File): Observable<User> {
        const fd = new FormData();
        if (avatar) {
            fd.append('avatar', avatar, avatar.name);
        }
        return this._http.patch<User>('/api/users/avatar', fd);
    }

    resetPassword(user: User): Observable<User> {
        return this._http.patch<User>('/api/users/resetPassword/', user);
    }

    delete(id: number): Observable<Message> {
        return this._http.delete<Message>(`/api/users/delete/${id}`);
    }

}

export interface UserApi {
    count: number;
    rows: User[];
}