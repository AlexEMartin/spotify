import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayListAdminComponent } from './play-list-admin.component';

describe('PlayListAdminComponent', () => {
  let component: PlayListAdminComponent;
  let fixture: ComponentFixture<PlayListAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayListAdminComponent]
    });
    fixture = TestBed.createComponent(PlayListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
