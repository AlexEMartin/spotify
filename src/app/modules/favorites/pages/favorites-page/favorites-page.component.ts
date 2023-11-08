import { Component, OnInit } from '@angular/core';
import { TrackService } from '@modules/tracks/services/track.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit{

  listResults$: Observable<any> = of([]);

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    this.listResults$ = this.trackService.getAllTracks$();
  }
}
