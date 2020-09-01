import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Product } from "../products.component";

@Component({
  selector: "product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent implements OnInit {
  @Output() OnProductChanged = new EventEmitter<any>();
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.productForm = this.fb.group({
      // item field
      name: ["", Validators.required],
      // product fields
      color: ["", Validators.required],
    });
  }

  productChanged() {
    console.log("product-form-userChanged:", this.productForm.value);
    this.OnProductChanged.emit(this.productForm.value);
    this.productForm.reset();
  }
}
