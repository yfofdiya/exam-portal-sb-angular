import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  category = {
    title: '',
    description: ''
  }

  constructor(private _snack: MatSnackBar, private _categoryService: CategoryService) { }

  public addCategory() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this._snack.open("Title is required", 'ok', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }
    if (this.category.description.trim() == '' || this.category.description == null) {
      this._snack.open("Description is required", 'ok', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end'
      });
      return;
    }
    this._categoryService.addCategory(this.category).subscribe(
      (data) => {
        this.category.title = '';
        this.category.description = '';
        this._snack.open("Category is added", 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      },
      (error) => {
        this._snack.open("Something went wrong while adding category", 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }

}
