import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '@modules/admin/services/admin.service';
import { TrackService } from '@modules/tracks/services/track.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  addForm: FormGroup = new FormGroup({});
  listResults$: Observable<any> = of([]);

  constructor(
    private trackService: TrackService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.listResults$ = this.trackService.getAllTracks$();

    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      album: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      cover: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      artist: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  sendAddForm(): void {
    const { name, album, cover, artist } = this.addForm.value;
    this.adminService.addNewTrack$(name, album, cover, artist).subscribe(
      (responseOk) => {
        this.listResults$ = this.trackService.getAllTracks$();
        console.log('Agregado exitosamente', responseOk);
        console.log('Data', this.listResults$)
      },
      (error) => {
        console.log('Error al agregar track', error);
      }
    );
  }
}
