import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { AdminService } from '@modules/admin/services/admin.service';

@Component({
  selector: 'app-play-list-admin',
  templateUrl: './play-list-admin.component.html',
  styleUrls: ['./play-list-admin.component.css']
})
export class PlayListAdminComponent implements OnInit{

  @Input() tracks:Array<TrackModel> = [];
  optionSort: { property: string | null, order: string } = { property: null, order: 'asc' };

  constructor(private adminService: AdminService) { }

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

  deleteTrack(track: any): void {
    const { uid } = track;
    this.adminService.deleteTrack$(uid).subscribe(
      (responseOk) => {
        console.log('Eliminado exitosamente', responseOk);
      },
      (error) => {
        console.log('Error al eliminar track', error);
      }
    );
  }
}
