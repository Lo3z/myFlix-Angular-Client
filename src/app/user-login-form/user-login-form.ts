import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  imports: [MatCardModule, MatFormField, MatInput, FormsModule, MatButtonModule],
  templateUrl: './user-login-form.html',
  styleUrl: './user-login-form.scss',
})

export class UserLoginFormComponent implements OnInit {
  @Input() userDetails = { Username: '', Password: ''};

  constructor (
    public userRegistrationService: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
  }

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


