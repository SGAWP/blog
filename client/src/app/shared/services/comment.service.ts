import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Comment, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class CommentService {
    constructor(private _http: HttpClient) { }

    getAllComments(posts_id: number,  pageSize: number, page: number): Observable<CommentApi> {
        let params = new HttpParams();

        params = params.append("posts_id", posts_id.toString());
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this._http.get<CommentApi>('/api/comments/getAllComments', { params: params });
    }

    add(comment: Comment): Observable<Comment> {
        return this._http.post<Comment>('/api/comments/add', comment);
    }

    delete(id: number): Observable<Message> {
        return this._http.delete<Message>(`/api/comments/delete/${id}`);
    }

}

export interface CommentApi {
    count: number;
    rows: Comment[];
}