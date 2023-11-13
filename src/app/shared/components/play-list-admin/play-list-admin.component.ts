import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TrackModel } from '@core/models/tracks.model';
import { AdminService } from '@modules/admin/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-play-list-admin',
  templateUrl: './play-list-admin.component.html',
  styleUrls: ['./play-list-admin.component.css'],
})
export class PlayListAdminComponent implements OnInit {
  @Input() tracks: Array<TrackModel> = [];
  optionSort: { property: string | null; order: string } = {
    property: null,
    order: 'asc',
  };
  editForm: FormGroup = new FormGroup({});

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {}

  changeSort(property: string): void {
    const { order } = this.optionSort;
    this.optionSort = {
      property,
      order: order === 'asc' ? 'desc' : 'asc',
    };
    console.log(this.optionSort);
  }

  deleteTrack(track: any): void {
    const { uid } = track;
    Swal.fire({
      title: "Seguro que deseas eliminar esta cancion?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Conservar",
      denyButtonText: `Eliminar`
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        this.adminService.deleteTrack$(uid).subscribe(
          (responseOk) => {
            console.log('Eliminado exitosamente', responseOk);
            const filter = this.tracks.filter((track) => track.uid !== uid);
            this.tracks = filter;
          },
          (error) => {
            console.log('Error al eliminar track', error);
          }
        );
        Swal.fire("Track Eliminada", "", "info");
      }
    });
    
  }

  editTrackName(track: TrackModel, name: string): void {
    console.log(track);
    if (name.length < 3) {
      alert('Inserta nombre con al menos 3 letras.');
    } else {
      this.adminService.editTrack$(name, track.uid.toString()).subscribe(
        (responseOk) => {
          console.log('Track editada', responseOk);
          track.name = name;
        },
        (error) => {
          console.log('Error al editar track', error);
        }
      );
    }
  }
}
