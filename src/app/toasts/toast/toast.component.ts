import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ToastService } from "../toast.service";
import { Toast, ToastStatus } from "./toast";
import { ToastActionType } from "./toast.actions";

@Component({
  selector: "hs-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.css"],
})
export class ToastComponent implements OnInit {
  public state$: Observable<Toast[]> = this.toastService.store;

  ngOnInit(): void {
    this.add();
    // this.add();
    // this.add();
  }
  constructor(public toastService: ToastService) {}

  public add() {
    //this.toastService.enqueueInfo("It works!");
    // this.toastService.enqueueWarning("Oops!");
    // this.toastService.enqueueError("Uh oh!");
    // this.toastService.enqueueSuccess(":D");

    this.toastService.dispatch({
      type: ToastActionType.Add,
      payload: { message: "hi", status: ToastStatus.Info },
    });
  }

  public remove(payload: Toast) {
    this.toastService.dispatch({
      type: ToastActionType.Remove,
      payload,
    });
  }
  dispatchMessage() {
    this.toastService.dispatch({
      type: ToastActionType.Add,
      payload: { message: "hi again", status: ToastStatus.Info },
    });
  }
}
