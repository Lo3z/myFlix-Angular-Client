import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-movie-info-dialog',
  imports: [CommonModule, MatDialogModule, MatAnchor],
  templateUrl: './movie-info-dialog.html',
  styleUrl: './movie-info-dialog.scss',
})
export class MovieInfoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
