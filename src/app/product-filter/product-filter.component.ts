import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "hs-product-filter",
  templateUrl: "./product-filter.component.html",
  styleUrls: ["./product-filter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFilterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
