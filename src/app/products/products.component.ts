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

import { ViewModel, Item, VmFn } from "../shared/viewmodel";
import { ProductService } from "./product.service";

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
  //pagination: Pagination = { pageSize: 5, pageCount: 5, pageItems: [] };
  //pageSize = 2; // pagination

  // record all user actions
  public addState = new Subject<Partial<ViewModel<Product>>>();
  public deleteState = new Subject<Partial<ViewModel<Product>>>();
  public detailState = new Subject<Partial<ViewModel<Product>>>();

  public detailCloseState = new Subject();
  public searchState = new Subject<Partial<ViewModel<Product>>>();
  public paginationState = new Subject<Partial<ViewModel<Product>>>();

  ngOnInit() {}
  ngAfterViewInit() {
    console.log("searchValue:", this.searchValue);
  }

  constructor(private http: HttpClient, private svc: ProductService) {
    type vmFn = VmFn<Product>;

    // merge all state changes into viewmodel
    this.vm$ = merge(
      this.itemsChange$,
      this.addChange$,
      this.deleteChange$,
      this.selectedChange$,
      this.selectedClose$,
      this.searchChange$,
      this.paginationChange$
    ).pipe(
      scan((oldVm: ViewModel<Product>, reduceVm: vmFn) => reduceVm(oldVm), {
        items: [],
      } as ViewModel<Product>)
    );
  } // constructor

  // load data
  private itemsChange$ = this.http.get<Product[]>(`api/products`).pipe(
    map((products: Product[]) => (vm: ViewModel<Product>) => ({
      ...vm,
      items: products,
    }))
  );
  // notify add
  private addChange$ = this.addState.pipe(
    tap((u) => console.log("add item:", u)),
    map((vm: ViewModel<Product>) => (vm: ViewModel<Product>) => ({
      ...vm,
      items: [...vm.items, { ...vm.item }],
    }))
  );
  // notify pagination change
  private paginationChange$ = this.paginationState.pipe(
    map((product) => (vm: ViewModel<Product>) => ({
      ...vm,
      pageItems: { pargeItems: vm.items },
    }))
  );
  // notify delete

  private deleteChange$ = this.deleteState.pipe(
    map((vm: ViewModel<Product>) => (vm: ViewModel<Product>) => ({
      ...vm,
      items: vm.items.filter((p) => p !== vm.item),
    }))
  );
  // notify show detail
  private selectedChange$ = this.detailState.pipe(
    map((vm: ViewModel<Product>) => (vm: ViewModel<Product>) => ({
      ...vm,
      selectedItem: vm.selectedItem,
    }))
  );
  // notify close detail
  private selectedClose$ = this.detailCloseState.pipe(
    map((_) => (vm: ViewModel<Product>) => ({ ...vm, selectedItem: null }))
  );

  // notify search
  private searchChange$ = this.searchState.pipe(
    tap((o) => console.log("searchItem-change:", o)),
    map((vm: ViewModel<Product>) => (vm: ViewModel<Product>) => ({
      ...vm,
      searchItem: vm.searchItem,
      searchItems: vm.items.filter((itm) => {
        if (vm.searchItem.name.length > 0) {
          console.log("search name");
          vm.searchItem.color = "";
          vm.searchItem.year = 0;
          return itm.name === vm.searchItem.name;
        }
        if (vm.searchItem.year > 0) {
          console.log("search year");
          vm.searchItem.color = "";
          vm.searchItem.name = "";
          return itm.year.toString() === vm.searchItem.year.toString();
        }
        if (vm.searchItem.color.length > 0) {
          console.log("search color");
          vm.searchItem.year = 0;
          vm.searchItem.name = "";
          return itm.color === vm.searchItem.color;
        }
      }),
    }))
  );

  // todo: Pagination
  // ---------------------------------------------------------------------------------
  handleAdd(item: Product) {
    console.log("Item added:", item);
    this.addState.next({ item });
  }
  handleDelete(item: Product) {
    this.deleteState.next({ item });
  }
  handleDetail(item: Product) {
    console.log("product-component-detail:", item);
    this.detailState.next({ item });
  }
  handleDetailClose(item: Product) {
    this.detailCloseState.next(item);
  }

  handleSearchItem(searchItem: Product) {
    console.log("products-handleSearchItem:", searchItem);
    this.searchState.next({ searchItem });
  }
  handlePageItemsChange(pageItems: Product[]) {
    this.paginationState.next({ pageItems });
    console.log("PageItems:", pageItems);
  }
} // class
