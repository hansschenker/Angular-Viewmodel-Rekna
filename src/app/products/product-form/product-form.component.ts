import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Product } from "../products.component";

@Component({
  selector: "product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent implements OnInit {
  @Output() OnItemAdded = new EventEmitter<Product>();
  itemForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.itemForm = this.fb.group({
      // item field
      name: ["", Validators.required],
      // product fields
      color: ["", Validators.required],
    });
  }

  itemAdded() {
    console.log("item-form-userChanged:", this.itemForm.value);
    this.OnItemAdded.emit(this.itemForm.value);
    this.itemForm.reset();
  }
}
