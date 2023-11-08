import { Component, OnInit } from '@angular/core';
import { SearchService } from '@modules/history/services/search.service';
import { TrackService } from '@modules/tracks/services/track.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css'],
})
export class HistoryPageComponent implements OnInit {
  listResults$: Observable<any> = of([]);

  constructor(
    private searchService: SearchService,
    private trackService: TrackService
  ) {}

  ngOnInit(): void {
    this.listResults$ = this.trackService.getAllTracks$();
  }

  receiveData(event: string): void {
    if (event.length >= 3) {
      this.listResults$ = this.searchService.serchTracks$(event);
    } else if (event.length === 0) {
      this.listResults$ = this.trackService.getAllTracks$();
    }
  }
}
