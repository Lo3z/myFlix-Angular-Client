import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatAnchor } from "@angular/material/button";

/**
 * MovieInfoDialogComponent is a dialog that displays detailed information about a movie.
 * 
 * The movie data is passed to the component via the `MAT_DIALOG_DATA` injection token.
*/

@Component({
  selector: 'app-movie-info-dialog',
  imports: [CommonModule, MatDialogModule, MatAnchor],
  templateUrl: './movie-info-dialog.html',
  styleUrl: './movie-info-dialog.scss',
})
export class MovieInfoDialogComponent {
   /**
   * Creates an instance of MovieInfoDialogComponent.
   * @param data Movie data injected via MAT_DIALOG_DATA
  */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
