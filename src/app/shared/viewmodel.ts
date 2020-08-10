export interface Item {
  id?: number;
  name: string;
}

export interface ViewModel<T> {
  items: T[];
  selectedItem?: T;
}
