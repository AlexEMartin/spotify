import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() callbackData: EventEmitter<any> = new EventEmitter()
  private searchSubject = new Subject<string>();

  src: string = ''

  constructor() {
    this.searchSubject.pipe(
      debounceTime(500)
    ).subscribe((debouncedTerm: string) => {
      if (debouncedTerm.length >= 3) { 
        this.callbackData.emit(debouncedTerm); 
      }
    });
  }

  ngOnInit(): void {
  }

  callSearch(term: any): void {
    this.searchSubject.next(term);
  }

}
