// import { Component, OnInit } from '@angular/core';
import { Component, OnDestroy, OnInit, ɵmarkDirty as markDirty } from '@angular/core';
import { concat, from, Observable, ReplaySubject } from 'rxjs';
import { mergeMap, takeUntil, tap } from 'rxjs/operators';

const OnInitSubject = Symbol('OnInitSubject');
const OnDestroySubject = Symbol('OnDestroySubject');

type ObservableDictionary<T> = {
  [P in keyof T]: Observable<T[P]>;
};

@Component({
  template: ''
})

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit, OnDestroy {
  // component lifecycle hooks
  private [ OnInitSubject ] = new ReplaySubject<true>(1);
  private [ OnDestroySubject ] = new ReplaySubject<true>(1);

  connect<T>(sources: ObservableDictionary<T>): T {

    const sink = {} as T;

    const sourceKeys = Object.keys(sources) as (keyof T)[];
    console.log("sourceKeys:", sourceKeys);
    // updaate sink from sources
    const updateSink$ = from(sourceKeys).pipe(
      mergeMap(sourceKey => {
        return sources[ sourceKey ].pipe(
          tap(value => console.log(`${String(sourceKey)} = ${value}`)),
          tap((sinkValue => sink[ sourceKey ] = sinkValue))
        );
      })
    );

    // subscribe and unsubscribe
    concat(this.OnInit$, updateSink$).pipe(takeUntil(this.OnDestroy$)).subscribe(() => markDirty(this));
    return sink;
  }

  constructor() {
  }

  ngOnInit() {
    this[ OnInitSubject ].next(true);
    this[ OnInitSubject ].complete();
  }

  ngOnDestroy(): void {
    this[ OnDestroySubject ].next(true);
    this[ OnDestroySubject ].complete();
  }

  get OnInit$() {
    return this[ OnInitSubject ].asObservable();
  }

  get OnDestroy$() {
    return this[ OnDestroySubject ].asObservable();
  }

}
