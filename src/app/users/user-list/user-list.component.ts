import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { User } from "../users.component";

@Component({
  selector: "user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  @Input() users: User[];
  @Output() OnUserDelete = new EventEmitter<User>();
  @Output() OnUserDetail = new EventEmitter<User>();
  constructor() {}

  ngOnInit(): void {}

  delete(user: User) {
    this.OnUserDelete.emit(user);
  }
  detail(user: User) {
    this.OnUserDetail.emit(user);
  }
} // class
