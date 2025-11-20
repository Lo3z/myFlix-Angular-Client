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

/**
 * ProfileViewComponent displays and manages the current user's profile.
 * 
 * Allows users to view and update their account information and delete their account.
*/

@Component({
  selector: 'app-profile-view',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    // MovieCardComponent,
  ],
  templateUrl: './profile-view.html',
  styleUrl: './profile-view.scss',
})

export class ProfileViewComponent implements OnInit {
  /**
   * Current user object loaded from localStorage.
  */
  user: any = {};
  // favoriteMovies: any[] = [];

  /**
   * Creates an instance of ProfileViewComponent.
   * @param userRegistrationService Service for user API operations
   * @param snackBar Angular Material snack bar for notifications
   * @param router Angular Router for navigation
  */
  constructor(
    public userRegistrationService: UserRegistrationService, 
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Loads the current user from localStorage.
  */
  ngOnInit(): void {
    this.loadUser();
    console.log("user loaded from localStorage: ", this.user);
  }

  /**
   * Handles loading the current user from localStorage. Sets the `user` property if user data exists.
  */
  loadUser(): void {
    const user = localStorage.getItem('currentUser');

    if (user) {
      this.user = JSON.parse(user);
      console.log(user);
      // const movieIDs = this.user.Favorites || [];
      // this.loadFavoriteMovies(movieIDs);
    }
  }

  // loadFavoriteMovies(movieIDs: string[]): void {
  //   if (!movieIDs || movieIDs.length == 0) {
  //     this.favoriteMovies = [];
  //   }
  //   else{

  //     this.userRegistrationService.getAllMovies().subscribe({
  //       next: (movies) => {
  //         this.favoriteMovies = movies.filter((m: { _id: string; }) => movieIDs.includes(m._id));
  //       }
  //     });
  //   }
  // }

  /**
   * Updates the current user's information on the backend.
   * 
   * Sends the updated `user` object to the API, updates localStorage, and shows a success snack bar.
  */
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
      Favorites: this.user.Favorites,
    };

    console.log("updatedUser being sent: ", updatedUser);
    this.userRegistrationService.editUser(username, updatedUser).subscribe((result: any) => {
      // Update localStorage with new info
      localStorage.setItem('currentUser', JSON.stringify(result));
      this.snackBar.open('Account info successfully updated!');
    });
  }

  /**
   * Deletes the current user's account.
   * 
   * Prompts for confirmation. On success, clears localStorage, shows a snack bar, and navigates back to the welcome page. 
   * On error, logs the error and shows a snack bar.
  */
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
