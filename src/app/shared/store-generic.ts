import { BehaviorSubject, Subject, Observable, of } from "rxjs";
import { map, distinctUntilKeyChanged, scan } from "rxjs/operators";

export class Store<T> {
  private _store: BehaviorSubject<T>;
  private _stateUpdate = new Subject<T>();

  constructor(initialState: T) {
    this._store = new BehaviorSubject(initialState);
    this._stateUpdate
      .pipe(
        scan((current: T, updated: T) => {
          return { ...current, ...updated };
        }, initialState)
      )
      .subscribe(this._store);
  }

  selectState(key: keyof T) {
    return this._store.pipe(
      distinctUntilKeyChanged(key),
      map((state) => state[key])
    );
  }
  getState() {
    return this._stateUpdate.source;
  }
  /*
   * Update state with new object to merge.
   */
  updateState(newState: T) {
    this._stateUpdate.next(newState);
  }

  /*
   * Subscribe to any store state changes.
   */
  stateChanges() {
    return this._store.asObservable();
  }
}
