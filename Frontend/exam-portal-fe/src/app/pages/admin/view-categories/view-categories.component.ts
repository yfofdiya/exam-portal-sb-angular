import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  constructor(private _categoryService: CategoryService, private _snack: MatSnackBar, private _loginService: LoginService) {}

  categories: any;

  isConfirmed: any;
  
  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe(
      (data: any) => {
          this.categories = data;
      },
      (error) => {
        this._snack.open("Something went wrong while fetching categories", 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }

  public deleteCategory(cid: any) {
    this.isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (this.isConfirmed) {
      this._categoryService.deleteCategory(cid).subscribe(
        (data) => {
          this.categories = this.categories.filter((category: any) => category.cid != cid);
          this._snack.open("Category is deleted", 'ok', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
        },
        (error) => {
          this._snack.open("Something went wrong while deleting quiz", 'ok', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
        }
      );
    }
  }
}
