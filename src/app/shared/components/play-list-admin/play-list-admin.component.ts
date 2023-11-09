import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-play-list-admin',
  templateUrl: './play-list-admin.component.html',
  styleUrls: ['./play-list-admin.component.css']
})
export class PlayListAdminComponent implements OnInit{

  @Input() tracks:Array<TrackModel> = [];
  optionSort: { property: string | null, order: string } = { property: null, order: 'asc' };

  constructor() { }

  ngOnInit(): void {
  }

  changeSort(property: string): void {
    const { order } = this.optionSort
    this.optionSort = {
      property,
      order: order === 'asc' ? 'desc' : 'asc'
    }
    console.log(this.optionSort);

  }
}
