import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { Router } from '@angular/router';

/**
 * UserLoginFormComponent is a dialog form that allows existing users to log in.
 * 
 * It collects username and password, authenticates with the backend, and stores user information and token in localStorage upon success.
 */
@Component({
  selector: 'app-user-login-form',
  imports: [MatCardModule, MatFormField, MatInput, FormsModule, MatButtonModule],
  templateUrl: './user-login-form.html',
  styleUrl: './user-login-form.scss',
})

export class UserLoginFormComponent implements OnInit {
  /**
   * The user login data bound to the form inputs.
  */
  @Input() userDetails = { Username: '', Password: ''};

  /**
   * Creates an instance of UserLoginFormComponent.
   * @param userRegistrationService Service to communicate with backend API for login.
   * @param dialogRef Reference to the Material dialog, used to close the dialog.
   * @param snackBar Angular Material snack bar to show success or error messages.
   * @param router Angular Router to navigate after successful login.
  */
  constructor (
    public userRegistrationService: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Authenticates the user with the backend using the userDetails input.
   * 
   * On success:
   * - Stores the user info and token in localStorage
   * - Closes the dialog
   * - Shows a success snack bar
   * - Navigates to the 'movies' page
   * 
   * On error:
   * - Logs the response
   * - Shows an error snack bar
  */

  loginUser(): void {
    this.userRegistrationService.userLogin(this.userDetails).subscribe((response) => {
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);

      this.dialogRef.close();
      console.log(response);
      this.snackBar.open(response.message || 'Login successful!', 'OK', {
        duration: 2000
      });

      this.router.navigate(['movies']);
    }, (response) => {
      console.log(response);
      this.snackBar.open(response.error?.message || 'Login failed.', 'OK', {
        duration: 2000
      });
    });
  };
};


