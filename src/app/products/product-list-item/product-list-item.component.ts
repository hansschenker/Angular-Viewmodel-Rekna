import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Product } from "../products.component";

@Component({
  selector: "product-list-item",
  templateUrl: "./product-list-item.component.html",
  styles: [],
})
export class ProductListItemComponent implements OnInit {
  @Input() item: Product;
  @Output() OnDeleted = new EventEmitter<Product>();
  @Output() OnSelected = new EventEmitter<Product>();
  constructor() {}

  ngOnInit(): void {}

  delete(item: Product) {
    this.OnDeleted.emit(item);
  }
  detail(item: Product) {
    this.OnSelected.emit(item);
  }
} // class
