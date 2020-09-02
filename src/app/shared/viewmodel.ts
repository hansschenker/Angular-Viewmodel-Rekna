export interface Item {
  id?: number;
  name: string;
}

// export interface SearchItem<T> {
//   fieldAndValue: [keyof T, string];
// }
export interface ViewModel<T> {
  items: T[];
  searchItem?: T;
  searchItems?: T[];
  selectedItem?: T;
}

export type TypeProps<T> = { [key in keyof T]: T[key] };
export const propof = <T>(name: keyof T) => name;
// firstName = propof<Person>("firstName");
