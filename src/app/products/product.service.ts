import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "./products.component";
import { throwError, Observable } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}
  
  products$: Observable<Product[]> = this.http
    .get<Product[]>("/api/products")
    .pipe(catchError((err) => throwError(err)));

  addProduct(product: Product): Observable<Product> {
    console.log("service add product:", product)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
       // Authorization: 'my-auth-token'
      })
    };

    return this.http.post<Product>("/api/products", product, httpOptions).pipe(
      tap (p => console.log("Product Added", p, httpOptions)),
      catchError( err => throwError(err))
    )       //.subscribe ( d => console.log("data saved", d))
  } // addProduct


} //  class
