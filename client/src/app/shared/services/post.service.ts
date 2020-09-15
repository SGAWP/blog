import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Post, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class PostService {
    constructor(private _http: HttpClient) { }

    getAllPosts(params: any = {}): Observable<PostApi> {
        return this._http.get<PostApi>('/api/posts/getAllPosts', { params: new HttpParams({ fromObject: params }) });
    }

    getUserPosts(params: any = {}): Observable<PostApi> {
        return this._http.get<PostApi>('/api/posts/getUserPosts', { params: new HttpParams({ fromObject: params }) });
    }

    getPostById(id: number): Observable<Post> {
        return this._http.get<Post>(`/api/posts/getPostById/${id}`);
    }

    getAllPostsCategories(categories_id: number, search: string, pageSize: number, page: number): Observable<PostApi> {
        let params = new HttpParams();

        params = params.append("categories_id", categories_id.toString());
        params = params.append("search", search);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this._http.get<PostApi>('/api/posts/getAllPostsCategories', { params: params });
    }

    add(title: string, description: string, content: string, categories_id: number, image?: File): Observable<Post> {
        const fd = new FormData();
        if (image) {
            fd.append('image', image, image.name);
        }
        fd.append('title', title);
        fd.append('description', description);
        fd.append('content', content);
        fd.append('categories_id', categories_id.toString());

        return this._http.post<Post>('/api/posts/add', fd);

    }

    update(id: number, post: Post): Observable<Post> {
        return this._http.patch<Post>(`/api/posts/update/${id}`, post);
    }

    delete(id: number): Observable<Message> {
        return this._http.delete<Message>(`/api/posts/delete/${id}`);
    }

}

export interface PostApi {
    count: number;
    rows: Post[];
}