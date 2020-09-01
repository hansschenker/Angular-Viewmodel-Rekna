import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "./products.component";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}
  products$ = this.http
    .get<Product[]>("/api/users")
    .pipe(catchError((err) => throwError(err)));
}
