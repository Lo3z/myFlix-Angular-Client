import { Component, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data';
import { MatCard, MatCardSubtitle, MatCardTitle, MatCardHeader, MatCardActions } from '@angular/material/card';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { MovieInfoDialogComponent } from '../movie-info-dialog/movie-info-dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [MatCard, MatCardTitle, MatCardSubtitle, CommonModule, MatCardHeader, MatCardActions, MatAnchor, MatIcon, RouterModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})

export class MovieCardComponent {
  @Input() movie: any;
  movies = new BehaviorSubject<any[]>([])
  userFavorites: string[] = [];
  constructor(
    public userRegistrationService: UserRegistrationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (!this.movie) {
      this.getMovies();
    }
    this.loadFavorites();
  }

  getMovies(): void {
    this.userRegistrationService.getAllMovies().subscribe((resp: any) => {
      console.log(this.movies);
      this.movies.next(resp)
    });
  }

  loadFavorites(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user && user.Favorites) {
      this.userFavorites = [...user.Favorites];
    }
  }

  isFavorite(movie: any): boolean {
    return this.userFavorites.includes(movie._id);
  }

  toggleFavorite(movie: any): void {
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    const username = user.Username;
    const movieID = movie._id || movie.id;
    console.log('user: ', user);

    if (!username || !movieID) {
      console.error('Missing username or movieID');
      return;
    }

    if (this.isFavorite(movie)) {
      this.userRegistrationService.removeFavorites(username, movieID).subscribe(() => {
        this.userFavorites = this.userFavorites.filter(id => id !== movie._id);
        this.updateLocalUser();
      });
    } else {
      this.userRegistrationService.addFavorites(username, movieID).subscribe(() => {
        this.userFavorites.push(movie._id);
        this.updateLocalUser();
      });
    }
  }

  updateLocalUser(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    user.Favorites = this.userFavorites;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  openGenreDialog(movie: any) {
    this.dialog.open(MovieInfoDialogComponent, {
      width: '350px',
      data: {
        title: `${movie.Genre.Name} Genre`,
        text: movie.Genre.Description
      }
    });
  }

  openDirectorDialog(movie: any) {
    this.dialog.open(MovieInfoDialogComponent, {
      width: '350px',
      data: {
        title: `${movie.Director.Name}`,
        text: movie.Director.Bio
      }
    });
  }

  openSynopsisDialog(movie: any) {
    this.dialog.open(MovieInfoDialogComponent, {
      width: '350px',
      data: {
        title: `${movie.Title || movie.Name} - Synopsis`,
        text: movie.Description
      }
    });
  }
}
