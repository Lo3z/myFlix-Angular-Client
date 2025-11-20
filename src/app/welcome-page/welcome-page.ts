import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

/**
 * WelcomePageComponent is the landing page of the application.
 * It provides buttons to open user registaration and login dialogs.
*/

@Component({
  selector: 'app-welcome-page',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.scss',
})

export class WelcomePageComponent implements OnInit {

  /**
   * Creates an instance of WelcomePageComponent.
   * @param dialog Angular Material dialog service used to open dialogs
  */
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }

  /**
   * Handles opening the user registration dialog, where user can enter their account info to register for account. 
  */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Handles opening the user login dialog, where user can enter Username and Password to log in.
  */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
