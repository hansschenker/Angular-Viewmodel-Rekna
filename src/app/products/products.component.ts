import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { Observable, Subject, merge, combineLatest } from "rxjs";
import { ViewModel, Item, SearchItem } from "../shared/viewmodel";
import { HttpClient } from "@angular/common/http";
import { scan, tap, map, combineAll } from "rxjs/operators";

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

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
  // user viewmodel to which user subscrbes via async
  public vm$: Observable<ViewModel<Product>>;

  // handle user actions which change state
  public addState = new Subject<Product>();
  public deleteState = new Subject<Product>();
  public detailState = new Subject<Product>();
  public detailCloseState = new Subject();
  // public filterValueState = new Subject<string>();
  // public filterFieldState = new Subject<string>();
  public searchItemState = new Subject<Product>();
  // public searchItemsState = new Subject<Product>();

  ngOnInit() {}
  ngAfterViewInit() {
    console.log("searchValue:", this.searchValue);
  }

  // merge FieldValue and FieldName
  // searchFieldAndValue$ = combineLatest(
  //   this.filterFieldState,
  //   this.filterValueState
  // );
  // init vm in constructor
  constructor(private http: HttpClient) {
    // merge all state changes into viewmodel
    this.vm$ = merge(
      this.dataChange$,
      this.addChange$,
      this.deleteChange$,
      this.detailChange$,
      this.closeDetailChange$,
      this.searchItemChange$
      // this.searchItemsChange$
    ).pipe(
      scan(
        (
          oldVm: ViewModel<Product>,
          mutateVm: (vm: ViewModel<Product>) => ViewModel<Product>
        ) => mutateVm(oldVm),
        { items: [] } as ViewModel<Product>
      )
    );
  } // constructor

  // map vm state
  private dataChange$ = this.http.get<Product[]>(`api/products`).pipe(
    // tap((ps) => console.log("products:", ps)),
    map((products: Product[]) => (vm: ViewModel<Product>) => ({
      ...vm,
      items: products,
    }))
  );

  private addChange$ = this.addState.pipe(
    tap((u) => console.log("add item:", u)),
    map((product) => (vm: ViewModel<Product>) => ({
      ...vm,
      items: [
        ...vm.items,
        { id: product.id, name: product.name, color: product.color },
      ],
    }))
  );
  private deleteChange$ = this.deleteState.pipe(
    map((item) => (vm: ViewModel<Product>) => ({
      ...vm,
      items: vm.items.filter((p) => p !== item),
    }))
  );

  private detailChange$ = this.detailState.pipe(
    map((product) => (vm: ViewModel<Product>) => ({
      ...vm,
      selectedItem: product,
    }))
  );

  private closeDetailChange$ = this.detailCloseState.pipe(
    map((_) => (vm: ViewModel<Product>) => ({ ...vm, selectedItem: null }))
  );

  // private filteredFieldChange$ = this.filterFieldState.pipe(
  //   tap((f) => console.log("field-name:", f))
  // );

  // private filteredValueChange$ = this.filterValueState.pipe(
  //   tap((ps) => console.log("search-filter:", ps))
  // );

  private searchItemChange$ = this.searchItemState.pipe(
    tap((o) => console.log("searchItem-change:", o)),
    map((item) => (vm: ViewModel<Product>) => ({
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

  // private searchItemsChange$ = this.searchItemState.pipe(
  //   tap((itms) => console.log("searchItemssss-change:", itms)),
  //   map((item) => (vm: ViewModel<Product>) => ({
  //     ...vm,
  //     searchItems: vm.items.filter((itm) => {
  //       console.log("items:", vm.items);
  //       console.log("searchItem:", vm.searchItem);
  //       itm.name === vm.searchItem.name;
  //     }),
  //   })),
  //   tap((vm) => console.log("searchItems-vm:", vm))
  // );

  // private searchItemStateChange$ = this.searchItemState.pipe(
  //   tap((p) => console.log("searchItemChange:", p)),
  //   map((searchItem: Product) => (vm: ViewModel<Product>) => ({
  //     ...vm,
  //     searchItem: searchItem,
  //   }))
  // );
  // handle events
  handleAdd(product: Product) {
    console.log("Product changed:", product);
    this.addState.next(product);
  }
  handleDelete(product: Product) {
    this.deleteState.next(product);
  }
  handleDetail(product: Product) {
    console.log("product-component-detail:", product);
    this.detailState.next(product);
  }
  handleDetailClose(product: Product) {
    this.detailCloseState.next(product);
  }
  // handleSearch(value: string) {
  //   this.filterValueState.next(value);
  // }
  // handleSearchField(key: string, value: string | number) {
  //   this.filterFieldState.next(key);
  // }
  handleSearchItem(searchItem: Product) {
    console.log("products-handleSearchItem:", searchItem);
    this.searchItemState.next(searchItem);
  }
  // handleSearchItems(searchItem: Product) {
  //   console.log("handleSearchItem:", searchItem);
  //   this.searchItemsState.next(searchItem);
  // }
} // class
