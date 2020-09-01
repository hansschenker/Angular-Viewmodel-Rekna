import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "hs-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"],
})
export class PaginationComponent implements OnInit {
  @Input() pageCount: number = 23;
  @Input() pageSize: number = 5;

  numbers = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
  ];
  pageSet: number = 1;
  pageSetCount = Math.floor(this.pageCount / this.pageSize) + 1;
  pageSetLast: number = this.pageSet * this.pageSize;
  pageSetItems: number[];

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
    let pageSet: number[] = [];
    this.numbers.forEach((n) => {
      if (n > this.pageSetLast - this.pageSize && n <= this.pageSetLast) {
        pageSet.push(n);
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
