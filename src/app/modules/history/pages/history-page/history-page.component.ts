import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { TrackService } from '@modules/tracks/services/track.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css'],
})
export class HistoryPageComponent implements OnInit {
  listResults$: TrackModel[] = []

  constructor(
    private searchService: SearchService,
    private trackService: TrackService
  ) {}

  ngOnInit(): void {
    this.trackService.getAllTracks$().subscribe((tracks: TrackModel[]) => {
      this.listResults$ = tracks;
    })
  }

  receiveData(event: string): void {
    this.searchService.searchTracks$(event).subscribe((tracks: TrackModel[]) => {
      const uniqueTracks = tracks.filter((track, index, self) =>
        index === self.findIndex(t => t.uid === track.uid)
      );
      this.listResults$ = uniqueTracks;
    })
  }
}
