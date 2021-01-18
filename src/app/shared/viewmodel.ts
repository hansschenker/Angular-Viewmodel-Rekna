import { Observable } from "rxjs";
export interface Item {
  id?: number;
  name: string;
}

export interface Pagination {
  pageCount: number;
  pageSize: number;
  pageItems: Observable<Item[]>;
}
// export interface SearchItem<T> {
//   fieldAndValue: [keyof T, string];
// }
export interface ViewModel<T> {
  item: T;
  items: T[];
  searchItem?: T;
  searchItems?: T[];
  selectedItem?: T;
  pageItems: T[];
}

<<<<<<< HEAD
export type ItemProps<T> = { [key in keyof T]: T[key] };
export const propof = <T>(name: keyof T) => name;

// firstName = propof<Person>("firstName");

// const convertArrayToObject = (array, key) => {
//   const initialObject = {};
//   return array.reduce((obj, item) => {
//     return {
//       ...obj,
//       [item[key]]: item,
//     };
//   }, initialObject);
// };

// convertArrayToObject(
//   [
//     { id: 111, name: 'John', age: 29 },
//     { id: 112, name: 'Sarah', age: 25 },
//     { id: 122, name: 'Kate', age: 22 },
//     { id: 123, name: 'Tom', age: 21 },
//     { id: 125, name: 'Emma', age: 24 },
//   ],
//   'id',
// ),
// );
// returns
// {
// 111:{ id: 111, name: 'John', age: 29 },
// 112:{ id: 112, name: 'Sarah', age: 25 },
// 122:{ id: 122, name: 'Kate', age: 22 },
// 123:{ id: 123, name: 'Tom', age: 21 },
// 125:{ id: 125, name: 'Emma', age: 24 }
// }
=======

export type VmFn<T> = (vm: ViewModel<T>) => ViewModel<T>;

export type TypeProps<T> = { [key in keyof T]: T[key] };
export const propof = <T>(name: keyof T) => name;

>>>>>>> 48b91ac44ed14b3598a44b91f0ce837bcd81f037
