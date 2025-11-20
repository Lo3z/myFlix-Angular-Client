import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
import { MatButtonModule } from '@angular/material/button';

/**
 * UserRegistrationFormComponent is a dialog form that allows new users to register.
 * 
 * It collects user information such as username, password, email, and birthday,and sends it to the backend using the UserRegistrationService.
*/

@Component({
  selector: 'app-user-registration-form',
  imports: [MatCardModule, MatFormField, MatInput, FormsModule, MatButtonModule],
  templateUrl: './user-registration-form.html',
  styleUrl: './user-registration-form.scss',
})

export class UserRegistrationFormComponent implements OnInit {
  
  /**
   * The user registration data bound to the form inputs.
  */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

/**
 * Creates an instance of UserRegistrationFormComponent.
 * @param UserRegistrationService Service to communicate with backend API for user registration.
 * @param dialogRef Reference to the Material dialog, used to close the dialog.
 * @param snackBar Angular Material snack bar to show success or error messages.
*/
constructor (
  public UserRegistrationService: UserRegistrationService,
  public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
  public snackBar: MatSnackBar) { }

ngOnInit(): void {}

/**
 * Sends the registration form data to the backend via the UserRegistrationService.
 * 
 * On success, closes the dialog and shows a success snack bar. On error, logs the response and shows an error snack bar.
*/
registerUser(): void {
  this.UserRegistrationService.userRegistration(this.userData).subscribe((response) => {
    this.dialogRef.close();
    console.log(response);
    this.snackBar.open(response.message || 'Registration successful!', 'OK', {
      duration: 2000
    });
  }, (response) => {
    console.log(response);
    this.snackBar.open(response.error?.message || 'Registration failed.', 'OK', {
      duration: 2000
    });
  });
}

}