import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-registration-form',
  imports: [MatCardModule, MatFormField, MatInput, FormsModule, MatButtonModule],
  templateUrl: './user-registration-form.html',
  styleUrl: './user-registration-form.scss',
})

export class UserRegistrationFormComponent implements OnInit {
  
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

constructor (
  public UserRegistrationService: UserRegistrationService,
  public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
  public snackBar: MatSnackBar) { }

ngOnInit(): void {}

// Send form inputs to backend
registerUser(): void {
  this.UserRegistrationService.userRegistration(this.userData).subscribe((response) => {
    // Logic for successful user registration
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
