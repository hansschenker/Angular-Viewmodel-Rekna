import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, scan, tap } from "rxjs/operators";
import { Observable, merge, Subject } from "rxjs";
import { ViewModel, Item } from "./shared/viewmodel";

interface User extends Item {
  username?: string;
}

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  name = "Angular";

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
      items: [...vm.items, { id: 9, name: user }],
    }))
  );
  private deleteChange$ = this.deleteState.pipe(
    map((user) => (vm: ViewModel<User>) => ({
      ...vm,
      items: vm.items.filter((u) => u !== user),
    }))
  );

  private detailChange$ = this.detailState.pipe(
    map((selectedItem) => (vm: ViewModel<User>) => ({ ...vm, selectedItem }))
  );
  private closeDetailChange$ = this.detailCloseState.pipe(
    map((_) => (vm: ViewModel<User>) => ({ ...vm, selectedItem: null }))
  );
}
