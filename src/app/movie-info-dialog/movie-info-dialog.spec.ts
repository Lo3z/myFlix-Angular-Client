import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieInfoDialog } from './movie-info-dialog';

describe('MovieInfoDialog', () => {
  let component: MovieInfoDialog;
  let fixture: ComponentFixture<MovieInfoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieInfoDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieInfoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
