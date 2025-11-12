import { Component, signal } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form';
import { UserLoginFormComponent } from './user-login-form/user-login-form';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatAnchor],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  title = 'myFlix-Angular-Client';

  constructor(public dialog: MatDialog) { }

  //Function that will open dialog when signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
