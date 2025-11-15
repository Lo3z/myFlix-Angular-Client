import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';

import { UserRegistrationService } from '../fetch-api-data';
import { MovieCardComponent } from '../movie-card/movie-card';
import { P } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MovieCardComponent,
    RouterModule,
  ],
  templateUrl: './profile-view.html',
  styleUrl: './profile-view.scss',
})

export class ProfileViewComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];

  constructor(
    public userRegistrationService: UserRegistrationService, 
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  // Load current user from localStorage
  loadUser(): void {
    const user = localStorage.getItem('currentUser');

    if (user) {
      this.user = JSON.parse(user);

      const movieIDs = this.user.Favorites || [];

      this.loadFavoriteMovies(movieIDs);
      console.log(user);
    }
  }

  loadFavoriteMovies(movieIDs: string[]): void {
    if (!movieIDs || movieIDs.length == 0) {
      this.favoriteMovies = [];
      return;
    }

    const movieObservables = movieIDs.map(_id => this.userRegistrationService.getMovie(_id));
    forkJoin(movieObservables).subscribe({
      next: (movies) => {
        this.favoriteMovies = movies;

        const currentUser = { ...this.user, Favorites: this.favoriteMovies.map(m => m._id) };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.user = currentUser;
      },
      error: (err) => {
        console.error('Failed to load favorite movies: ', err);
      }
    });
  }


  updateUser(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const username = user.Username;

    if (!username) {
    console.error("No username found");
    return;
    }

    const updatedUser = {
      Username: this.user.Username,
      Password: this.user.Password,
      Email: this.user.Email,
      Birthday: this.user.Birthday,
    };

    this.userRegistrationService.editUser(username, updatedUser).subscribe((result: any) => {
      // Update localStorage with new info
      localStorage.setItem('currentUser', JSON.stringify(result));
      this.snackBar.open('Account info successfully updated!');
    });
  }

  deleteUser(): void {
    if (!confirm('Are you sure you want to delete your account?')) return;

    this.userRegistrationService.deleteUser(this.user.Username).subscribe({
      next: (response) => {
        localStorage.clear();
        this.snackBar.open(response.message || 'Account deleted successfully.', 'OK', {
          duration: 2000
        });

        setTimeout(() => {
          this.router.navigate(['welcome']);
        }, 3000);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open(
          err.error?.message || 'Account deletion failed.', 'OK', {
          duration: 2000
        });
      }
    });
  }
}
