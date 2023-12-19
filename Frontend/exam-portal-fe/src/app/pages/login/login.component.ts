import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _loginService: LoginService, private _snack: MatSnackBar, private _router: Router) { }

  loginData = {
    userName: '',
    password: ''
  };

  login() {
    if (this.loginData.userName.trim() == '' || this.loginData.userName == null) {
      this._snack.open("Username is required", 'ok', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }
    this._loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        // Do if token is generated
        // 1. Store Token to Local Storage
        this._loginService.storeToken(data.token);
        // 2. Get Current Logged In User
        this._loginService.getCurrentUserDetails().subscribe(
          (user: any) => {
            // Store Current Logged In User to Local Storage
            this._loginService.storeUserDetails(user);
            // Based on authrity redirect to perticular page, Admin or Normal
            if(this._loginService.getUserRole() == 'ADMIN') {
              // Redirect to Admin Dashboard
              // window.location.href='/admin-dashboard';
              this._router.navigate(['admin-dashboard']);
            } else if (this._loginService.getUserRole() == 'NORMAL') {
              // Redirect to User Dashboard
              // window.location.href='/user-dashboard';
              this._router.navigate(['user-dashboard']);
            } else {
              // Logout
              this._loginService.logout();
            }
          },
          (error) => {
            this._snack.open("Error occured white fetching current logged in user", 'ok', {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
          }
        );
      },
      (error) => {
        this._snack.open("Invalid Credentials", 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }
}
