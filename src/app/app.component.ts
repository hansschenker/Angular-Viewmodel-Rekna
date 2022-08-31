import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';
import { ReactiveComponent } from './reactive/reactive.component';

type ObservableDictionary<T> = {
  [P in keyof T]: Observable<T[P]>;
};

  interface MovieState {
    title: string;
    count: number;
  }

 const a :ObservableDictionary<MovieState> = {
    title: of('The Shawshank Redemption'),
    count: of(1)
 }
 a.count.pipe(startWith(0)).subscribe(console.log);

interface State {
  count: number;
  count2: number;
  //movies: Movie[];
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends ReactiveComponent {

  value$ = new Subject<State>();
  state: State;

  constructor() {
    super();
    this.state = this.connect({
      count: this.value$.pipe(
        startWith(0),
        scan((count:number, next:number) => count + next, 0)
      
        ),
        count2: this.value$.pipe(
          startWith(0),
          scan((count:number, next:number) => count + next*2, 0)
        )
    });
  }

 log(){
  alert("Button clicked")
 }

}
