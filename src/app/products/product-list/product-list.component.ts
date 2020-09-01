import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Product } from "../products.component";

@Component({
  selector: "product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[];
  @Output() OnDelete = new EventEmitter<Product>();
  @Output() OnDetail = new EventEmitter<Product>();
  constructor() {}

  ngOnInit(): void {}

  delete(product: Product) {
    this.OnDelete.emit(product);
  }
  detail(product: Product) {
    console.log("product list-detail:", product);
    this.OnDetail.emit(product);
  }
} // class
