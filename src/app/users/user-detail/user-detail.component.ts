import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { User } from "../users.component";

@Component({
  selector: "user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"],
})
export class UserDetailComponent implements OnInit {
  @Output() OnDetailClose = new EventEmitter<User>();
  @Input() user: User;
  constructor() {}

  ngOnInit(): void {}
  detailClose(user: User) {
    this.OnDetailClose.emit(user);
  }
}
