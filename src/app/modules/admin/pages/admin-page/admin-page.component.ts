import { Component, OnInit } from '@angular/core';
import { TrackService } from '@modules/tracks/services/track.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  listResults$: Observable<any> = of([]);

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    this.listResults$ = this.trackService.getAllTracks$();
  }

}
