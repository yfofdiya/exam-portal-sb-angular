import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  constructor(
    private _categoryService: CategoryService, 
    private _snack: MatSnackBar, 
    private _loginService: LoginService,
    private _router: Router
    ) {}

  categories: any;

  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        this._snack.open("Something went wrong while fetching all categories", 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    )
  }

  public logout() {
    this._loginService.logout();
    this._router.navigate(['login']);
    window.location.reload();
  }
}
