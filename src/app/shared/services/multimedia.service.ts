import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  myObservable1$: BehaviorSubject<any> = new BehaviorSubject('✅');

  constructor() { }


}
