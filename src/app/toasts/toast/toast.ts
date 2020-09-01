export interface Toast {
  id: number;
  message: string;
}

export enum ToastStatus {
  Success,
  Error,
  Warning,
  Info,
}
