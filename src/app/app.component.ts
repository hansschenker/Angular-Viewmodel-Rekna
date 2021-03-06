import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// rxjs
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

// angular material
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
} // clsss
