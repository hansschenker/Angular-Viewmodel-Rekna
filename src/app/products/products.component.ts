import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
// rxjs
import { Observable, Subject, merge, combineLatest } from "rxjs";
import { scan, tap, map, combineAll } from "rxjs/operators";
// shared
import { ViewModel, Item, VmFn } from '../shared/viewmodel';
import { PaginationComponent } from "../shared/pagination/pagination.component";
import { ProductService } from './product.service';

export interface Product extends Item {
  year: number;
  color: string;
}

@Component({
  selector: "hs-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit, AfterViewInit {

  // get searchField and searchValue
  @ViewChild("searchValue") searchValue: ElementRef;

  // viewmodel holds state changes
  public vm$: Observable<ViewModel<Product>>;

  // handle state input
  public addState = new Subject<Product>();
  public deleteState = new Subject<Product>();
  public detailState = new Subject<Product>();
  public detailCloseState = new Subject();
  public searchItemState = new Subject<Product>();
  // todo pagination

  ngOnInit() {}
  ngAfterViewInit() {
    console.log("searchValue:", this.searchValue);
  }


  constructor(private http: HttpClient, private svc: ProductService) {

    type vmFn = VmFn<Product> 

    // merge all state changes into viewmodel
    this.vm$ = merge(
      this.dataChange$,
      this.addChange$,
      this.deleteChange$,
      this.detailChange$,
      this.closeDetailChange$,
      this.searchItemChange$
      // todo: Pagination
    ).pipe(
      scan(
        ( oldVm: ViewModel<Product>, reduceVm: vmFn) => reduceVm(oldVm),
        { items: [] } as ViewModel<Product>
      )
    );
  } // constructor

  // dataChange when products loaded
  // http.get<Product[]>(`api/products`)
  private dataChange$ = this.svc.products$.pipe(
    // tap((ps) => console.log("products:", ps)),
    map((products: Product[]) => (vm: ViewModel<Product>) => ({
      ...vm,
      items: products,
    }))
  );

  // add item
  private addChange$ = this.addState.pipe(
    tap((u) => console.log("add item:", u)), 
    tap(p => this.svc.addProduct(p).subscribe(d => console.log("json-server saved:", d))),
    map((item: Product) => (vm: ViewModel<Product>) => ({
      ...vm,
      items: [...vm.items, { ...item }],
    })),
  );
  // delete item
  private deleteChange$ = this.deleteState.pipe(
    map((item: Product) => (vm: ViewModel<Product>) => ({
      ...vm,
      items: vm.items.filter((p) => p !== item),
    }))
  );
  // show item details
  private detailChange$ = this.detailState.pipe(
    map((item: Product) => (vm: ViewModel<Product>) => ({
      ...vm,
      selectedItem: item,
    }))
  );

  // close item details
  private closeDetailChange$ = this.detailCloseState.pipe(
    map((_) => (vm: ViewModel<Product>) => ({ ...vm, selectedItem: null }))
  );

  // search item by name, color, year
  private searchItemChange$ = this.searchItemState.pipe(
    tap((o) => console.log("searchItem-change:", o)),
    map((item: Product) => (vm: ViewModel<Product>) => ({
      ...vm,
      searchItem: item,
      searchItems: vm.items.filter((itm) => {
        if (item.name.length > 0) {
          console.log("search name");
          item.color = "";
          item.year = 0;
          return itm.name === item.name;
        }
        if (item.year > 0) {
          console.log("search year");
          item.color = "";
          item.name = "";
          return itm.year.toString() === item.year.toString();
        }
        if (item.color.length > 0) {
          console.log("search color");
          item.year = 0;
          item.name = "";
          return itm.color === item.color;
        }
      }),
    }))
  );

  // todo: Pagination
  // ---------------------------------------------------------------------------------

  // handle user events -> next state
  handleAdd(item: Product) {
    console.log("Item added:", item);
    this.addState.next(item);
  }
  handleDelete(item: Product) {
    this.deleteState.next(item);
  }
  handleDetail(item: Product) {
    console.log("product-component-detail:", item);
    this.detailState.next(item);
  }
  handleDetailClose(item: Product) {
    this.detailCloseState.next(item);
  }

  handleSearchItem(searchItem: Product) {
    console.log("products-handleSearchItem:", searchItem);
    this.searchItemState.next(searchItem);
  }
} // class
