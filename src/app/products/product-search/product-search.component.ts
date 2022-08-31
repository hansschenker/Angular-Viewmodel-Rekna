import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
} from "@angular/core";
import { Product } from "../products.component";

@Component({
  selector: "product-search",
  templateUrl: "./product-search.component.html",
  styleUrls: ["./product-search.component.css"],
})
export class ProductSearchComponent implements OnInit, AfterViewInit {
  @Output() OnItemSearch = new EventEmitter<Partial<Product>>();
  item: Product;
  fields: string[];

  private fieldName: string;
  private fieldValue: string | number;

  searchItem: Product = {
    id: 0,
    name: "",
    color: "",
    year: 0,
  };

  constructor() {
    // init a product to able to Object.keys
    this.item = { name: "name", color: "green", year: 2002 };
    // set Search Fields in Select
    this.fields = Object.keys(this.item);
    this.fields.unshift("Select a field");

    console.log("search-fields:", this.fields);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {}
  handleSearchValue(search: HTMLInputElement) {
    let numberValue: number;
    let stringValue: string;

    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    if (numbers.includes(search.value)) {
      numberValue = parseInt(search.value, 10);
      this.fieldValue = numberValue;
    } else {
      this.fieldValue = search.value;
    }
    search.value = "";
    console.log("handleSearchValue:", this.fieldValue);
  }
  handleSearchField(searchFieldSelect: HTMLSelectElement) {
    this.fieldName = searchFieldSelect.value;
    searchFieldSelect.value = "Select a field";
    console.log("handleSearchField:", this.fieldName);
  }
  handleSearchItem() {
    this.searchItem[this.fieldName] = this.fieldValue;

    console.log("handleSearchItem", this.searchItem);
    this.OnItemSearch.emit(this.searchItem);
    this.searchItem.name = "";
    this.searchItem.color = "";
    this.searchItem.year = 0;
  }
} // clas
