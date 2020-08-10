import { Component, OnInit } from "@angular/core";
import { Observable, Subject, merge } from "rxjs";
import { ViewModel, Item } from "../shared/viewmodel";
import { HttpClient } from "@angular/common/http";
import { scan, tap, map } from "rxjs/operators";

export interface User extends Item {
  username?: string;
  email?: string;
}

@Component({
  selector: "hs-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent {
  public vm$: Observable<ViewModel<User>>;
  public addState = new Subject<User>();
  public deleteState = new Subject<User>();
  public detailState = new Subject<User>();
  public detailCloseState = new Subject();

  constructor(private http: HttpClient) {
    this.vm$ = merge(
      this.usersChange$,
      this.addChange$,
      this.deleteChange$,
      this.detailChange$,
      this.closeDetailChange$
    ).pipe(
      scan(
        (
          oldVm: ViewModel<User>,
          mutateFn: (vm: ViewModel<User>) => ViewModel<User>
        ) => mutateFn(oldVm),
        { items: [] } as ViewModel<User>
      )
    );
  }

  private usersChange$ = this.http
    .get<User[]>(`https://jsonplaceholder.typicode.com/users`)
    .pipe(map((users) => (vm: ViewModel<User>) => ({ ...vm, items: users })));

  private addChange$ = this.addState.pipe(
    tap((u) => console.log("add user:", u)),
    map((user) => (vm: ViewModel<User>) => ({
      ...vm,
      items: [...vm.items, { id: 9, name: user.name, email: user.email }],
    }))
  );
  private deleteChange$ = this.deleteState.pipe(
    map((user) => (vm: ViewModel<User>) => ({
      ...vm,
      items: vm.items.filter((u) => u !== user),
    }))
  );

  private detailChange$ = this.detailState.pipe(
    tap((u) => console.log("userChange$:", u)),
    map((user) => (vm: ViewModel<User>) => ({ ...vm, selectedItem: user }))
  );
  private closeDetailChange$ = this.detailCloseState.pipe(
    map((_) => (vm: ViewModel<User>) => ({ ...vm, selectedItem: null }))
  );
  userChanged(user: User) {
    console.log("userChanged:", user);
    this.addState.next(user);
  }
  detailClose(user: User) {
    this.detailCloseState.next(user);
  }
  delete(user: User) {
    this.deleteState.next(user);
  }
  detail(user: User) {
    console.log("users-component-detail:", user);
    this.detailState.next(user);
  }
} // class
