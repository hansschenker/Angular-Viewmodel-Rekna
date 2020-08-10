import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { User } from "../users.component";

@Component({
  selector: "user-list-item",
  templateUrl: "./user-list-item.component.html",
  styles: [],
})
export class UserListItemComponent implements OnInit {
  @Input() user: User;
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
