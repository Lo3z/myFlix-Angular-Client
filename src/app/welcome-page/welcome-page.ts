import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome-page',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.scss',
})

export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }

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
