
import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';
import { ReactiveComponent } from './reactive/reactive.component';
import { HttpClient } from "@angular/common/http";
// rxjs
import { map, shareReplay } from "rxjs/operators";

// angular material
//import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
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

  value$ = new Subject<number>();
  value2$ = new Subject<number>();
  state: State;

  constructor() {
    super();
    this.state = this.connect({
      count: this.value$.pipe(
        startWith( 5 ),
        scan((ps:number, ns:number) => ( ps + ns ))

        ),
        count2: this.value2$.pipe(
          startWith(5 ),
          scan((ps:number, ns:number) => ( ps + ns ))
 
          )
    });
  }

 log(){
  alert("Button clicked")
 }

}


