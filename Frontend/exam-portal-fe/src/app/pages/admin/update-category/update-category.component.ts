import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _categoryService: CategoryService,
    private _snack: MatSnackBar,
    private _router: Router
  ) {}

  cid = 0;

  category: any;

  ngOnInit(): void {
    this.cid = this._route.snapshot.params['cid'];

    this._categoryService.getCategoryById(this.cid).subscribe(
      (data) => {
        this.category = data;
      },
      (error) => {
        this._snack.open("Something went wrong while fetching category details for id" + this.cid, 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }

  public updateCategory() {
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
    this._categoryService.updateCategory(this.category).subscribe(
      (data) => {
        this._snack.open("Category is updated", 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
        this._router.navigate(['/admin-dashboard/categories'])
      },
      (error) => {
        this._snack.open("Something went wrong while updating category", 'ok', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    );
  }
}
