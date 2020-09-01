import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Product } from "../products.component";

@Component({
  selector: "product-list-item",
  templateUrl: "./product-list-item.component.html",
  styles: [],
})
export class ProductListItemComponent implements OnInit {
  @Input() product: Product;
  @Output() OnDelete = new EventEmitter<Product>();
  @Output() OnDetail = new EventEmitter<Product>();
  constructor() {}

  ngOnInit(): void {}

  delete(product: Product) {
    this.OnDelete.emit(product);
  }
  detail(product: Product) {
    this.OnDetail.emit(product);
  }
} // class
