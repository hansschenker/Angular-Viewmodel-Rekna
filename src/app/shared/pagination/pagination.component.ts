import { Component, OnInit, Input } from "@angular/core";
import { Item } from "../viewmodel";

@Component({
  selector: "hs-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"],
})
export class PaginationComponent implements OnInit {
  @Input() pageCount: number = 20;
  @Input() pageSize: number = 5;
  @Input() items: Item[];
  // numbers = [
  //   1,
  //   2,
  //   3,
  //   4,
  //   5,
  //   6,
  //   7,
  //   8,
  //   9,
  //   10,
  //   11,
  //   12,
  //   13,
  //   14,
  //   15,
  //   16,
  //   17,
  //   18,
  //   19,
  //   20,
  //   21,
  //   22,
  //   23,
  // ];
  pageSet: number = 1;
  // calculate how many Page sets according to pageSiz and pageCount
  private _pageSetCount;
  public get pageSetCount() {
    let pageCount: number;
    const pageCountRound = Math.floor(this.pageCount / this.pageSize);
    const pageCountDiv = this.pageCount / this.pageSize;

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
  pageSetItems: Item[];

  constructor() {}

  ngOnInit(): void {
    this.pageSetItems = this.filteredPageSet();
  }
  firstPage() {
    this.pageSet = 1;
    this.setPageSetLast();
    this.pageSetItems = this.filteredPageSet();
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
    this.pageSetItems = this.filteredPageSet();
  }
  private setPageSetPrevious() {
    this.pageSet = this.pageSet >= 2 ? (this.pageSet -= 1) : this.pageSet;
    this.setPageSetLast();
    this.pageSetItems = this.filteredPageSet();
  }

  filteredPageSet() {
    let pageSet: Item[] = [];
    this.items.forEach((item, i) => {
      if (
        i + 1 > this.pageSetLast - this.pageSize &&
        i + 1 <= this.pageSetLast
      ) {
        pageSet.push(item);
      }
    });
    return pageSet;
  }
  previousPage() {
    this.setPageSetPrevious();
  }

  lastPage() {
    this.pageSet = this.pageSetCount;
    this.setPageSetLast();
    this.pageSetItems = this.filteredPageSet();
  }
}
