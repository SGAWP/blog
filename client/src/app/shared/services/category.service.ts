import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category, Message } from "../interfaces";

@Injectable({
    providedIn: "root"
})
export class CategoryService {
    constructor(private _http: HttpClient) { }

    getAllSprCategories(search: string, sort: string, order: string, pageSize: number, page: number): Observable<CategoryApi> {
        let params = new HttpParams();
        params = params.append("search", search);
        params = params.append("sort", sort);
        params = params.append("order", order);
        params = params.append("pageSize", pageSize.toString());
        params = params.append("page", page.toString());

        return this._http.get<CategoryApi>('/api/categories/getAllSprCategories', { params: params });
    }

    getAllCategories(params: any = {}): Observable<CategoryApi> {
        return this._http.get<CategoryApi>('/api/categories/getAllCategories', { params: new HttpParams({ fromObject: params }) });
    }

    getSelectCategories(): Observable<Category[]> {
        return this._http.get<Category[]>('/api/categories/getSelectCategories');
    }

    getCategoryById(id: number): Observable<Category> {
        return this._http.get<Category>(`/api/categories/getCategoryById/${id}`);
    }

    add(category: Category): Observable<Category> {
        return this._http.post<Category>('/api/categories/add', category);
    }

    update(id: number, category: Category): Observable<Category> {
        return this._http.patch<Category>(`/api/categories/update/${id}`, category);
    }

    delete(id: number): Observable<Message> {
        return this._http.delete<Message>(`/api/categories/delete/${id}`);
    }

}

export interface CategoryApi {
    count: number;
    rows: Category[];
}