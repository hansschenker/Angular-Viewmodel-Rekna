import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';
import { ReactiveComponent } from './reactive/reactive.component';

interface State {
  count: number;
  //movies: Movie[];
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends ReactiveComponent {

  value$ = new Subject<number>();
  state: State;

  constructor() {
    super();
    this.state = this.connect({
      count: this.value$.pipe(
        startWith(0),
        scan((count:number, next:number) => count + next, 0)
      )
    });
  }

 

}
