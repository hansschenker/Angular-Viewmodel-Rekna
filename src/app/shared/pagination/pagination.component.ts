import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Item } from "../viewmodel";
import { concat, Observable, of } from "rxjs";
import { concatMap } from "rxjs/operators";

@Component({
  selector: "hs-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"],
})
export class PaginationComponent implements OnInit {
  @Input()
  private _pageCount: number = 20;
  public get pageCount(): number {
    return this._pageCount;
  }
  public set pageCount(value: number) {
    this.pageCountChanged.emit(value);
    this._pageCount = value;
  }
  @Input()
  private _pageSize: number = 5;
  public get pageSize(): number {
    return this._pageSize;
  }
  public set pageSize(value: number) {
    this._pageSize = value;
  }
  @Input()
  private _pageItems: Item[];
  public get pageItems(): Item[] {
    return this._pageItems;
  }
  public set pageItems(value: Item[]) {
    this._pageItems = value;
    this.setPageSet(value);
  }
  // notify component container
  @Output() pageCountChanged = new EventEmitter<number>();
  @Output() pageSizeChanged = new EventEmitter<number>();
  @Output() pageItemsChanged = new EventEmitter<Item[]>();
  // pageItems of current pageSet with pageSize
  //public pageitems: Item[];

  pageSet: number = 1;
  // calculate Page sets
  private _pageSetCount;
  public get pageSetCount() {
    let pageCount: number;
    const pageCountRound = Math.floor(this.pageCount / this.pageSize);
    const pageCountDiv = this.pageCount / this.pageSize;

    // if there is a rest in division just add one pageset for the rest
    if (pageCountDiv > pageCountRound) {
      this._pageSetCount = pageCountRound + 1;
    } else {
      this._pageSetCount = pageCountRound;
    }
    return this._pageSetCount;
  }
  // public set pageSetCount(value) {
  //   this._pageSetCount = value;
  // }
  pageSetLast: number = this.pageSet * this.pageSize;
  pageSetItems: Observable<Item[]>;

  constructor() {}

  ngOnInit(): void {
    this.pageSetItems = this.setPageSet(this.pageItems);
  }

  firstPage() {
    this.pageSet = 1;
    this.setPageSetLast();
    this.pageSetItems = this.setPageSet(this.pageItems);
  }
  private setPageSetLast() {
    this.pageSetLast = this.pageSet * this.pageSize;
  }

  nextPage() {
    this.setPageSetNext();
  }
  private setPageSetNext() {
    this.pageSet =
      this.pageSet < this.pageSetCount ? (this.pageSet += 1) : this.pageSet;
    this.setPageSetLast();
    this.pageSetItems = this.setPageSet(this.pageItems);
    //this.pageItemsChanged.emit(this.pageSetItems);
  }
  private setPageSetPrevious() {
    this.pageSet = this.pageSet >= 2 ? (this.pageSet -= 1) : this.pageSet;
    this.setPageSetLast();
    this.pageSetItems = this.setPageSet(this.pageItems);
    //this.pageItemsChanged.emit(this.pageSetItems);
  }

  public setPageSet(items: Item[]): Observable<Item[]> {
    let pageSet: Item[] = [];
    items.forEach((item, i) => {
      if (
        i + 1 > this.pageSetLast - this.pageSize &&
        i + 1 <= this.pageSetLast
      ) {
        pageSet.push(item);
      }
    });
    this.pageItemsChanged.emit(pageSet);
    return of(pageSet);
  }
  previousPage() {
    this.setPageSetPrevious();
  }

  lastPage() {
    this.pageSet = this.pageSetCount;
    this.setPageSetLast();
    this.pageSetItems = this.setPageSet(this.pageItems);
  }
}
