import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { Product } from "../products.component";

@Component({
  selector: "product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
  @Output() OnDetailClose = new EventEmitter<Product>();
  @Input() product: Product;
  constructor() {}

  ngOnInit(): void {}

  detailClose(product: Product) {
    this.OnDetailClose.emit(product);
  }
}
