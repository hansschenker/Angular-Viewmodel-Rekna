export enum ToastActionType {
  Add,
  Remove,
}

export interface ToastAction {
  type: ToastActionType;
  payload: any;
}
