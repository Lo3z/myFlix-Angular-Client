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

/**
 * MovieCardComponent displays a single movie in card format.
 * 
 * It supports:
 * - Displaying movie information.
 * - Opening dialogs for genre, director, and synopsis.
 * - Adding/removing movies from the user's favorites.
*/
@Component({
  selector: 'app-movie-card',
  imports: [MatCard, MatCardTitle, MatCardSubtitle, CommonModule, MatCardHeader, MatCardActions, MatAnchor, MatIcon, RouterModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})

export class MovieCardComponent {
  /**
   * Optional filter array to filter displayed movies.
  */
  @Input() filter?: any[];

  /**
   * The movie data to display in this card.
   */
  @Input() movie: any;

  /**
   * Observable holding all movies when fetching from API.
  */
  movies = new BehaviorSubject<any[]>([])

  /**
   * Array of movie IDs that are the user's favorites.
  */
  userFavorites: string[] = [];

  /**
   * Creates an instance of MovieCardComponent.
   * @param userRegistrationService Service for fetching data from the API.
   * @param dialog Angular Material dialog service to open info dialogs.
  */
  constructor(
    public userRegistrationService: UserRegistrationService,
    private dialog: MatDialog
  ) { }

  /**
   * Loads movies if not provided and initializes favorites from localStorage.
  */
  ngOnInit(): void {
    if (!this.movie) {
      this.getMovies();
    }
    this.loadFavorites();
  }

  /**
   * Fetches all movies from the backend API and updates the `movies` observable.
  */
  getMovies(): void {
    this.userRegistrationService.getAllMovies().subscribe((resp: any) => {
      console.log(this.movies);
      this.movies.next(resp)
    });
  }

  /**
   * Loads the current user's favorite movies array from localStorage into `userFavorites`.
  */
  loadFavorites(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user && user.Favorites) {
      this.userFavorites = [...user.Favorites];
    }
  }

  /**
   * Checks if a movie is in the user's favorites.
   * @param movie Movie object to check.
   * @returns true if the movie is a favorite.
  */
  isFavorite(movie: any): boolean {
    return this.userFavorites.includes(movie._id);
  }

  /**
   * Handles toggling a movie in the user's favorites when user clicks the favorite icon in the UI.
   * Updates localStorage and sends API requests to add or remove the movie.
   * Handles errors and restores previous state if API fails.
   * @param movie Movie object to toggle
  */
  toggleFavorite(movie: any): void {
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    const username = user.Username;
    console.log('user: ', user);

    if (!username || !movie._id) {
      console.error('Missing username or movieID');
      return;
    }

    const isFav = this.userFavorites.includes(movie._id);

    if (isFav) {
      this.userFavorites = this.userFavorites.filter(_id => _id !==movie._id);
    } else {
      this.userFavorites = [...this.userFavorites, movie._id];
    }
    this.updateLocalUser();

    const updateFavorite = isFav
      ? this.userRegistrationService.removeFavorites(username, movie._id)
      : this.userRegistrationService.addFavorites(username, movie._id);
    
    updateFavorite.subscribe({
      error: () => {
        console.error("failed to update favorite");

        if (isFav) {
          this.userFavorites.push(movie._id);
        } else {
          this.userFavorites = this.userFavorites.filter(_id => _id !==movie._id)
        }
        this.updateLocalUser();
      }
    });
  }

  
  /**
   * Updates the current user's localStorage entry with the latest favorites.
  */
  updateLocalUser(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    user.Favorites = this.userFavorites;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  /**
   * Opens a dialog showing the genre details of the given movie.
   * @param movie Movie object
  */
  openGenreDialog(movie: any) {
    this.dialog.open(MovieInfoDialogComponent, {
      width: '350px',
      data: {
        title: `${movie.Genre.Name} Genre`,
        text: movie.Genre.Description
      }
    });
  }

  /**
   * Opens a dialog showing the director details of the given movie.
   * @param movie Movie object
  */
  openDirectorDialog(movie: any) {
    this.dialog.open(MovieInfoDialogComponent, {
      width: '350px',
      data: {
        title: `${movie.Director.Name}`,
        text: movie.Director.Bio
      }
    });
  }

  /**
   * Opens a dialog showing the synopsis of the given movie.
   * @param movie Movie object
  */
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
