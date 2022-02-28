import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {

  constructor() { }

  thingThatReturnsObservable(parameter:number):Observable<number>{
    return of(parameter+4);
  }
}
