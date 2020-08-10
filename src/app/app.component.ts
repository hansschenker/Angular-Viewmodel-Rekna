import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, scan, tap } from "rxjs/operators";
import { Observable, merge, Subject } from "rxjs";
import { ViewModel, Item } from "./shared/viewmodel";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  name = "Angular";
  userChanged(user) {
    console.log("userChanged:", user);
  }
} // clsss
