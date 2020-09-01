import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, scan, tap } from "rxjs/operators";
import { Observable, merge, Subject } from "rxjs";
import { ViewModel, Item, TypeProps } from "./shared/viewmodel";
// import { ObservableStore } from "./shared/store";
import { Store } from "./shared/store-generic";
interface UserState {
  user: string;
  isAuthenticated: boolean;
}
const initialLinkState: LinkState = {
  url: "google.ch",
  title: "google site",
};
interface LinkState {
  url: string;
  title: string;
}

// const nameof = <T>(name: keyof T) => name;

// interface Person {
//   firstName: string;
//   lastName: string;
// }

// const person: Person = { firstName: "Hans", lastName: "Schenker" };
// enum personKeys {
//   firstName,
//   lastName,
// }
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  // firstName = nameof<Person>("firstName");
  // lastName = nameof<Person>("lastName");

  // person: Person = { firstName: "Hans", lastName: "Schenker" };
  // keys = Object.keys(person);
  name = "Angular";

  store: Store<LinkState>;
  changes$;

  constructor() {
    this.store = new Store(initialLinkState);
    console.log("link-store:", this.store);
    // console.log("person firstname:", person[this.firstName]);
  }
  ngOnInit() {
    this.store.selectState("url").subscribe((n) => (this.name = n.toString()));
    this.changes$ = this.store.stateChanges();

    this.store.updateState({ url: "netxpert.ch", title: "Hans Online" });
    /*
     * Update a property with new value.
     */

    // this.store.updateState({
    //   user: "kari",
    //   isAuthenticated: false,
    // });
    // this.store.updateState({
    //   user: "Leo",
    //   isAuthenticated: false,
    // });
    // this.store.updateState({
    //   user: "Hans",
    //   isAuthenticated: true,
    // });

    /*
     * Selected state above (user) only emits when value has changed
     * for the requested property.
     */
  }
  // userList = document.getElementById("users");
  // renderUser = (user) => {
  //   const li = `<li>${user}</li>`;
  //   this.userList.innerHTML += li;
  // };
  /*
   * Select a slice of state from store.
   */

  userChanged(user) {
    console.log("userChanged:", user);
  }
} // clsss
