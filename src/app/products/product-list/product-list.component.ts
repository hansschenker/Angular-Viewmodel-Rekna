import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Product } from "../products.component";

@Component({
  selector: "product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  @Input() items: Product[];
  @Output() OnDelete = new EventEmitter<Product>();
  @Output() OnDetail = new EventEmitter<Product>();
  constructor() {}

  ngOnInit(): void {}

  delete(item: Product) {
    this.OnDelete.emit(item);
  }
  detail(item: Product) {
    console.log("item list-detail:", item);
    this.OnDetail.emit(item);
  }
} // class
