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
<<<<<<< HEAD
import { ViewModel, Item } from "../shared/viewmodel";
=======
import { ViewModel, Item, VmFn } from '../shared/viewmodel';
import { PaginationComponent } from "../shared/pagination/pagination.component";
import { ProductService } from './product.service';
>>>>>>> 48b91ac44ed14b3598a44b91f0ce837bcd81f037

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

<<<<<<< HEAD
  // record all user actions
  public addState = new Subject<Partial<ViewModel<Product>>>();
  public deleteState = new Subject<Partial<ViewModel<Product>>>();
  public detailState = new Subject<Partial<ViewModel<Product>>>();
=======
  // handle state input
  public addState = new Subject<Product>();
  public deleteState = new Subject<Product>();
  public detailState = new Subject<Product>();
>>>>>>> 48b91ac44ed14b3598a44b91f0ce837bcd81f037
  public detailCloseState = new Subject();
  public searchState = new Subject<Partial<ViewModel<Product>>>();
  public paginationState = new Subject<Partial<ViewModel<Product>>>();

  ngOnInit() {}
  ngAfterViewInit() {
    console.log("searchValue:", this.searchValue);
  }


  constructor(private http: HttpClient, private svc: ProductService) {

    type vmFn = VmFn<Product> 

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
      scan(
        ( oldVm: ViewModel<Product>, reduceVm: vmFn) => reduceVm(oldVm),
        { items: [] } as ViewModel<Product>
      )
    );
  } // constructor

<<<<<<< HEAD
  // load data
  private itemsChange$ = this.http.get<Product[]>(`api/products`).pipe(
=======
  // dataChange when products loaded
  // http.get<Product[]>(`api/products`)
  private dataChange$ = this.svc.products$.pipe(
    // tap((ps) => console.log("products:", ps)),
>>>>>>> 48b91ac44ed14b3598a44b91f0ce837bcd81f037
    map((products: Product[]) => (vm: ViewModel<Product>) => ({
      ...vm,
      items: products,
    }))
  );
<<<<<<< HEAD
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
=======

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
>>>>>>> 48b91ac44ed14b3598a44b91f0ce837bcd81f037
  private deleteChange$ = this.deleteState.pipe(
    map((vm: ViewModel<Product>) => (vm: ViewModel<Product>) => ({
      ...vm,
      items: vm.items.filter((p) => p !== vm.item),
    }))
  );
<<<<<<< HEAD
  // notify show detail
  private selectedChange$ = this.detailState.pipe(
    map((vm: ViewModel<Product>) => (vm: ViewModel<Product>) => ({
=======
  // show item details
  private detailChange$ = this.detailState.pipe(
    map((item: Product) => (vm: ViewModel<Product>) => ({
>>>>>>> 48b91ac44ed14b3598a44b91f0ce837bcd81f037
      ...vm,
      selectedItem: vm.selectedItem,
    }))
  );
<<<<<<< HEAD
  // notify close detail
  private selectedClose$ = this.detailCloseState.pipe(
    map((_) => (vm: ViewModel<Product>) => ({ ...vm, selectedItem: null }))
  );

  // notify search
  private searchChange$ = this.searchState.pipe(
=======

  // close item details
  private closeDetailChange$ = this.detailCloseState.pipe(
    map((_) => (vm: ViewModel<Product>) => ({ ...vm, selectedItem: null }))
  );

  // search item by name, color, year
  private searchItemChange$ = this.searchItemState.pipe(
>>>>>>> 48b91ac44ed14b3598a44b91f0ce837bcd81f037
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

<<<<<<< HEAD
  // handle add notifiction
=======
  // handle user events -> next state
>>>>>>> 48b91ac44ed14b3598a44b91f0ce837bcd81f037
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
