import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProductInfo } from '../models/productInfo';
import { apiUrl, reportUrl } from '../../environments/environment';
import { ProductInOrder } from '../models/ProductInOrder';
import { catchError, map, tap } from 'rxjs/operators';
import { ProductListResponse } from '../response/ProductListResponse'

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productUrl = `${apiUrl}/product`;
    private productUrl1 = `${reportUrl}/productall`;
    private categoryUrl = `${apiUrl}/category`;

    constructor(private http: HttpClient) {
    }

    getAllInPage(page: number, size: number): Observable<any> {
        const url = `${this.productUrl}?page=${page}&size=${size}`;
        return this.http.get(url)
            .pipe(
        )
    }

    getAll(): Observable<ProductInfo[]> {
        const url = `${this.productUrl1}`;
        return this.http.get<ProductListResponse>(url).pipe(
            tap(_ => {

            }),
            map(cart => cart.productList),
            catchError(_ => of([]))
        );;

    }

    getCategoryInPage(categoryType: number, page: number, size: number): Observable<any> {
        const url = `${this.categoryUrl}/${categoryType}?page=${page}&size=${size}`;
        return this.http.get(url).pipe(
        );
    }

    getDetail(id: String): Observable<ProductInfo> {
        const url = `${this.productUrl}/${id}`;
        return this.http.get<ProductInfo>(url).pipe(
            catchError(_ => {
                console.log("Get Detail Failed");
                return of(new ProductInfo());
            })
        );
    }

    update(productInfo: ProductInfo): Observable<ProductInfo> {
        const url = `${apiUrl}/seller/product/${productInfo.productId}/edit`;
        return this.http.put<ProductInfo>(url, productInfo);
    }

    create(productInfo: ProductInfo): Observable<ProductInfo> {
        const url = `${apiUrl}/seller/product/new`;
        return this.http.post<ProductInfo>(url, productInfo);
    }

    delelte(productInfo: ProductInfo): Observable<any> {
        const url = `${apiUrl}/seller/product/${productInfo.productId}/delete`;
        return this.http.delete(url);
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error);
            return of(result as T);
        };
    }

    public getHeaders(): HttpHeaders {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': `application/json`
        });
        return headers;
    }

    upload(file): any {
        const UPLOAD_URL = "http://localhost:8080/api/csv/upload";

        const headers = this.getHeaders();
        const formData = new FormData();
        formData.append("file", file, file.name);
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = (e) => {

            if (xhr.status === 200) {
                console.log('SUCCESS', xhr.responseText);
            } else {
                console.warn('request_error');
            }
        };

        xhr.open('POST', 'http://localhost:8080/api/csv/upload', true);
        xhr.send(formData);
        return xhr;
    }

}
