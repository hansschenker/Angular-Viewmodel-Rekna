import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ProductService } from "../../products/product.service";
import { ViewModel, VmFn } from "../../shared/viewmodel";
import { Product } from "../../products/products.component";
import { Observable, merge } from "rxjs";
import { map, scan } from "rxjs/operators";

interface ProductVm extends ViewModel<Product> {}

@Component({
  selector: "hs-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  vm$: Observable<ViewModel<Product>>;

  constructor(private svc: ProductService) {
    // laod products
    const productsVm$ = this.svc.products$.pipe(
      map((products) => (vm: ProductVm) => ({ ...vm, items: products }))
    );

    // get one product
    const productVm$ = this.svc
      .product$(1)
      .pipe(map((product) => (vm: ProductVm) => ({ ...vm, item: product })));

    this.vm$ = merge(productsVm$, productVm$).pipe(
      scan((oldVm: ProductVm, reduceVm: VmFn<Product>) => reduceVm(oldVm), {
        items: [],
      } as ProductVm)
    );
  } // constructor

  ngOnInit(): void {}
} // class
