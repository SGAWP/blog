import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Bookmark, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class BookmarkService {
    constructor(private _http: HttpClient) { }

    getBookmarkByPostsIdAndUsersId(posts_id: number): Observable<Bookmark> {
        let params = new HttpParams();
        params = params.append("posts_id", posts_id.toString());

        return this._http.get<Bookmark>('/api/bookmarks/getBookmarkByPostsIdAndUsersId', { params: params });
    }

    getAllBookmarks(params: any = {}): Observable<BookmarkApi> {
        return this._http.get<BookmarkApi>('/api/bookmarks/getAllBookmarks', { params: new HttpParams({ fromObject: params }) });
    }

    add(bookmark: Bookmark): Observable<Bookmark> {
        return this._http.post<Bookmark>('/api/bookmarks/add', bookmark);
    }

    delete(id: number): Observable<Message> {
        return this._http.delete<Message>(`/api/bookmarks/delete/${id}`);
    }

}

export interface BookmarkApi {
    count: number;
    rows: Bookmark[];
}