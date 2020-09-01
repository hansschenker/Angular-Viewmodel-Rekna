import { Injectable } from "@angular/core";
import { Subject, Observable, of, concat } from "rxjs";
import { map, mergeMap, scan, delay, tap } from "rxjs/operators";
import { Toast, ToastStatus } from "./toast/toast";
import { ToastActionType, ToastAction } from "./toast/toast.actions";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  get store() {
    return this.toastChange$;
  }

  private toastState: Subject<ToastAction> = new Subject<ToastAction>();

  private toastChange$: Observable<Toast[]> = this.toastState.pipe(
    map((action: ToastAction) =>
      !action.payload.id ? this.addId(action) : action
    ),
    mergeMap((action: ToastAction) =>
      action.type !== ToastActionType.Remove
        ? this.addAutoExpire(action)
        : of(action)
    ),
    scan(this.reducer, [])
  );

  private addId(d: ToastAction): ToastAction {
    return {
      type: d.type,
      payload: { ...d.payload, id: this.generateId() },
    };
  }

  private generateId(): string {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  private addAutoExpire(d: ToastAction) {
    const signal$ = of(d);
    const hide$ = of({ type: ToastActionType.Remove, payload: d.payload }).pipe(
      delay(5000)
    );
    return concat(signal$, hide$);
  }

  private reducer(state: Toast[] = [], action: ToastAction): Toast[] {
    switch (action.type) {
      case ToastActionType.Add: {
        return [action.payload, ...state];
      }
      case ToastActionType.Remove: {
        return state.filter((toast: Toast) => toast.id !== action.payload.id);
      }
      default: {
        return state;
      }
    }
  }

  constructor() {}

  public dispatch(action: ToastAction) {
    this.toastState.next(action);
  }

  // public enqueueSuccess(message: string): void {
  //   this.toastState.next({
  //     type: ToastActionType.Add,
  //     payload: {
  //       message,
  //       status: ToastStatus.Success,
  //     },
  //   });
  // }

  // public enqueueError(message: string): void {
  //   this.toastState.next({
  //     type: ToastActionType.Add,
  //     payload: {
  //       message,
  //       status: ToastStatus.Error,
  //     },
  //   });
  // }

  // public enqueueInfo(message: string): void {
  //   console.log("service-info:", message);

  //   this.toastState.next({
  //     type: ToastActionType.Add,
  //     payload: {
  //       message,
  //       status: ToastStatus.Info,
  //     },
  //   });
  //   this.toastChange$.subscribe((m) => console.log("service-info-change:", m));
  // }

  // public enqueueWarning(message: string): void {
  //   this.toastState.next({
  //     type: ToastActionType.Add,
  //     payload: {
  //       message,
  //       status: ToastStatus.Warning,
  //     },
  //   });
  // }

  // public enqueueHide(payload: Toast): void {
  //   this.toastState.next({
  //     type: ToastActionType.Remove,
  //     payload,
  //   });
  // }
} // class
