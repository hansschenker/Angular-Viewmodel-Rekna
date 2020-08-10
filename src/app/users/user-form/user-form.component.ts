import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../users.component";

@Component({
  selector: "user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"],
})
export class UserFormComponent implements OnInit {
  @Output() OnUserChanged = new EventEmitter<any>();
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
    });
  }

  // saveForm() {
  //   this.userChanged();
  // }
  userChanged() {
    console.log("user-form-userChanged");
    this.OnUserChanged.emit(this.userForm.value);
    this.userForm.reset();
  }
} // class
